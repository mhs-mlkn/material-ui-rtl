import React, { Component } from "react";
import merge from "lodash/merge";
import get from "lodash/get";
import { withSnackbar, WithSnackbarProps } from "notistack";
import { withTheme, Theme } from "@material-ui/core/styles";
import { displayErrMsg, parseToJSON } from "utility";
import { withBreakPoint, TBreakPoint } from "components/Layout";
import { DeleteButton } from "components/Button";
import Chart, { getOptions, getData } from "components/Chart";
import Scalar, { IconMenu } from "components/Scalar";
import Table from "components/Table";
import ReportCard from "components/ReportCard";
import { Modal } from "components/Modal";
import {
  ReportService,
  ExecError,
  Settings,
  ThemeMenu,
  AutoRefresh,
  Filters,
  SaveButton,
  TReportInstance,
  TReportData,
  TReportExecParams,
  TReportFilter,
  TReportType,
  TChartTheme,
  TReportIcons,
  TReportMenuAction
} from "components/Report";

type propsType = {
  instance: TReportInstance;
  onDelete: (instanceId: number) => void;
} & WithSnackbarProps & { bp: TBreakPoint } & { theme: Theme };

type stateType = {
  loading: boolean;
  error: boolean;
  data: TReportData | undefined;
  isRunning: boolean;
  interval: number;
  theme: TChartTheme;
  options: object;
  icon: TReportIcons;
  openFilters: boolean;
  filters: TReportFilter[];
};

class Report extends Component<propsType, stateType> {
  state = {
    loading: false,
    error: false,
    data: undefined,
    interval: 0,
    isRunning: true,
    theme: get(this.props.instance, "config.theme", "default"),
    options: this.getOptions(),
    icon: get(this.props.instance, "config.icon", "info"),
    openFilters: false,
    filters: [{ id: "21", value: "21" }]
  };

  tempOptions: object = {};

  componentDidMount() {
    const { report } = this.props.instance;
    const config = parseToJSON(report.config, {});
    const interval = get(config, "refreshInterval", 0);
    this.setState({ interval });
    if (report.type !== "TABLE") {
      this.execReport();
    }
  }

  componentDidUpdate(prevProps: propsType, prevState: stateType) {
    const { instance } = this.props;
    const { data, options } = this.state;
    const isChart = ["SCALAR", "TABLE"].indexOf(instance.report.type) === -1;

    if (isChart && !!data && !prevState.data) {
      this.setState({
        options: merge(
          getOptions(instance),
          options,
          getData(instance, data || { cols: [], rows: [], totalCount: 0 })
        )
      });
    }
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error: true });
    console.error(`Report ErrorBoundary> (${this.props.instance.id}) `, error);
  }

  execReport = (params?: TReportExecParams, showLoading?: boolean) => {
    const loading = showLoading === undefined ? true : showLoading;
    this.setState({ loading, error: false });
    const { id: instanceId } = this.props.instance;
    ReportService.execute(instanceId, params)
      .then(data => this.setState({ data }))
      .catch(() => this.setState({ error: true }))
      .finally(() => this.setState({ loading: false }));
  };

  toggleOpenFilters = () => {
    this.setState(state => ({ openFilters: !state.openFilters }));
  };

  handleRetry = () => {
    const { instance, bp, theme } = this.props;
    const isTable = instance.report.type === "TABLE";
    const type = theme.palette.type;
    instance.config.options[type][bp] = this.tempOptions;
    this.execReport({ loadFromCache: false, size: isTable ? 10 : 0 });
  };

  handleThemeChange = (theme: TChartTheme) => {
    const { instance } = this.props;
    instance.config.theme = theme;
    this.setState({ theme });
  };

  handleOptionChange = (options: object) => {
    const { instance, bp, theme } = this.props;
    const type = theme.palette.type;
    this.tempOptions = get(instance, `config.options.${type}.${bp}`, {});
    instance.config.options[type][bp] = options;
    this.setState({ options });
  };

  handleIconChange = (icon: TReportIcons) => {
    this.props.instance.config.icon = icon;
    this.setState({ icon });
  };

  handleFiltersChange = (filters: TReportFilter[]) => {
    this.setState({ filters }, () => console.log(filters));
    this.toggleOpenFilters();
  };

  handleDelete = () => {
    const { id: instanceId } = this.props.instance;
    ReportService.delete(instanceId)
      .then(() => this.props.onDelete(instanceId))
      .catch(displayErrMsg(this.props.enqueueSnackbar));
  };

  getOptions() {
    const { instance, bp, theme } = this.props;
    const type = theme.palette.type;
    return get(instance, `config.options.${type}.${bp}`, {});
  }

  handleMenuItemClick = (key: TReportMenuAction) => {
    switch (key) {
      case "TOGGLE_AUTO_REFRESH":
        return this.setState(state => ({ isRunning: !state.isRunning }));

      case "REFRESH_REPORT":
        return this.execReport({ loadFromCache: false });

      case "OPEN_FILTERS":
        return this.setState({ openFilters: true });

      default:
        break;
    }
  };

  renderActions = (type: TReportType) => {
    const { instance } = this.props;
    const { theme, options, icon } = this.state;
    switch (type) {
      case "SCALAR":
        return (
          <>
            <ThemeMenu theme={theme} onChange={this.handleThemeChange} />
            <Settings json={options} onChange={this.handleOptionChange} />
            <IconMenu icon={icon} onChange={this.handleIconChange} />
            <DeleteButton onDelete={this.handleDelete} size="small" />
            <SaveButton instanceId={instance.id} />
          </>
        );

      case "TABLE":
        return (
          <>
            <DeleteButton onDelete={this.handleDelete} size="small" />
          </>
        );

      default:
        return (
          <>
            <ThemeMenu theme={theme} onChange={this.handleThemeChange} />
            <Settings json={options} onChange={this.handleOptionChange} />
            <DeleteButton onDelete={this.handleDelete} size="small" />
            <SaveButton instanceId={instance.id} />
          </>
        );
    }
  };

  render() {
    const {
      data,
      isRunning,
      interval,
      options,
      theme,
      icon,
      openFilters,
      filters,
      loading,
      error
    } = this.state;
    const { instance } = this.props;

    if (error) {
      return (
        <ReportCard>
          <ExecError onRetry={this.handleRetry} onDelete={this.handleDelete} />
        </ReportCard>
      );
    }

    return (
      <ReportCard
        autoRefresh={interval > 0}
        isRunning={isRunning}
        onMenuItemClick={this.handleMenuItemClick}
        actions={this.renderActions(instance.report.type)}
      >
        <Modal
          open={openFilters}
          onClose={this.toggleOpenFilters}
          maxWidth="md"
          keepMounted={false}
          actions={<></>}
        >
          <Filters
            instance={instance}
            initials={filters}
            onClose={this.toggleOpenFilters}
            onFiltersChange={this.handleFiltersChange}
          />
        </Modal>
        <AutoRefresh
          isRunning={isRunning}
          interval={interval}
          execReport={this.execReport}
        />
        {instance.report.type === "SCALAR" ? (
          <Scalar
            instance={instance}
            options={options}
            theme={theme}
            icon={icon}
            data={data}
            loading={loading}
          />
        ) : instance.report.type === "TABLE" ? (
          <Table
            instance={instance}
            data={data}
            loading={loading}
            execReport={this.execReport}
          />
        ) : (
          <Chart
            // instance={instance}
            // data={data}
            options={options}
            theme={theme}
            loading={loading}
          />
        )}
      </ReportCard>
    );
  }
}

const WithTheme = withTheme(Report);
const WithBreakPoint = withBreakPoint(WithTheme);
export default withSnackbar(WithBreakPoint);
