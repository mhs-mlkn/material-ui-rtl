import React, { Component } from "react";
import get from "lodash/get";
import keyBy from "lodash/keyBy";
import merge from "lodash/merge";
import omit from "lodash/omit";
import has from "lodash/has";
import { Moment } from "moment-jalaali";
import { withSnackbar, WithSnackbarProps } from "notistack";
import { withTheme, Theme } from "@material-ui/core/styles";
import { displayErrMsg, parseToJSON } from "utility";
import { withBreakPoint, TBreakPoint } from "components/Layout";
import { DeleteButton } from "components/Button";
import Chart, { chartOptions, chartData } from "components/Chart";
import Scalar, { IconMenu } from "components/Scalar";
import Table from "components/Table";
import ReportCard from "components/ReportCard";
import { Modal } from "components/Modal";
import {
  ReportService,
  ExecError,
  NoData,
  Settings,
  ThemeMenu,
  AutoRefresh,
  Filters,
  Export,
  Embed,
  SaveButton,
  TReportInstance,
  TReportData,
  TReportExecParams,
  TReportFilter,
  TReportType,
  TChartTheme,
  TReportIcons,
  TReportMenuAction,
  TQueryFilter,
  TQueryParam
} from "components/Report";
import { Subscriber, Categories } from "components/PubSub";

type propsType = {
  instanceId: number;
  onDelete: (instanceId: number) => void;
} & WithSnackbarProps & { bp: TBreakPoint } & { theme: Theme };

type stateType = {
  instance: TReportInstance;
  loading: boolean;
  error: boolean;
  data: TReportData | undefined;
  interval: number;
  isRunning: boolean;
  theme: TChartTheme;
  options: object;
  icon: TReportIcons;
  openFilters: boolean;
  openExport: boolean;
  openEmbed: boolean;
  filterVOS: TReportFilter[];
  parentParams: TQueryParam[];
  isDrillDown: boolean;
};

class Report extends Component<propsType, stateType> {
  state: stateType = {
    instance: ReportService.get(this.props.instanceId),
    loading: false,
    error: false,
    data: undefined,
    interval: 0,
    isRunning: true,
    theme: "default",
    options: {},
    icon: "info",
    openFilters: false,
    openExport: false,
    openEmbed: false,
    filterVOS: [] as TReportFilter[],
    parentParams: [],
    isDrillDown: false
  };

  tempOptions: object = {};
  reportFilters: { [key: string]: TQueryFilter } = {};
  adminConfig = {
    refreshInterval: 0,
    theme: "default",
    icon: "info",
    options: {}
  };

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps: propsType, prevState: stateType) {
    const { instance, theme } = this.state;
    const isChart = ["SCALAR", "TABLE"].indexOf(instance.report.type) === -1;

    if (isChart) {
      if (
        prevProps.theme.palette.type !== this.props.theme.palette.type ||
        theme !== prevState.theme
        // || !isEqual(options, prevState.options)
      ) {
        this.updateOptions();
      }
    }
  }

  initialize() {
    const { instance } = this.state;
    const { report } = instance;
    const config = parseToJSON(report.config, { refreshInterval: 0 });
    const interval = get(config, "refreshInterval", 0);
    const theme = get(instance, "config.theme");
    const icon = get(instance, "config.icon");
    const options = this.getOptions();
    this.setState({ interval, theme, icon, options });

    const { queryFilters } = report.query;
    this.reportFilters = keyBy(queryFilters, "id");

    if (report.type !== "TABLE") {
      this.execReport();
    }
  }

  execReport = (params?: TReportExecParams, showLoading?: boolean) => {
    const { instance, parentParams } = this.state;
    const loading = showLoading === undefined ? true : showLoading;
    const isTable = instance.report.type === "TABLE";
    this.setState({ loading, error: false });
    const filterVOS = this.processFilters();
    const _params = {
      size: isTable ? 10 : 0,
      filterVOS,
      parentParams,
      ...params
    };
    ReportService.execute(instance.id, _params)
      .then(data => this.setState({ data }, () => this.updateOptions()))
      .catch(() => this.setState({ error: true }))
      .finally(() => this.setState({ loading: false }));
  };

  updateOptions = () => {
    const noData = { cols: [], rows: [], totalCount: 0 };
    const { instance, data, options } = this.state;
    this.setState({
      options: merge(
        {},
        chartOptions(instance, options),
        chartData(instance, data || noData),
        this.getOptions()
      )
    });
  };

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error: true });
    console.error(`Report ErrorBoundary> (${this.state.instance.id}) `, error);
  }

  processFilters() {
    return this.state.filterVOS.map(filter => {
      const reportFilter = this.reportFilters[filter.id];
      const filterType = reportFilter.type;
      let value = filter.value;
      if (filterType === "DATE") {
        value = (value as Moment).format("YYYY-MM-DD");
      } else if (filterType === "DATE_STRING") {
        value = (value as Moment).format("jYYYY-jMM-jDD");
      }
      return { ...filter, value };
    });
  }

  toggleFiltersModal = () => {
    this.setState(state => ({ openFilters: !state.openFilters }));
  };

  toggleExportModal = () => {
    this.setState(state => ({ openExport: !state.openExport }));
  };

  toggleEmbedModal = () => {
    this.setState(state => ({ openEmbed: !state.openEmbed }));
  };

  handleRetry = () => {
    const { bp, theme } = this.props;
    const { instance } = this.state;
    const type = theme.palette.type;
    instance.config.options[type][bp] = this.tempOptions;
    this.setState(
      {
        filterVOS: [] as TReportFilter[],
        options: this.getOptions()
      },
      () => this.execReport({ loadFromCache: false })
    );
  };

  handleThemeChange = (theme: TChartTheme) => {
    const { instance } = this.state;
    instance.config.theme = theme;
    this.setState({ theme });
  };

  handleOptionChange = (options: object) => {
    const { bp, theme } = this.props;
    const { instance } = this.state;
    const type = theme.palette.type;
    this.tempOptions = get(instance, `config.options.${type}.${bp}`, {});
    instance.config.options[type][bp] = options;
    this.setState({ options }, this.updateOptions);
  };

  handleIconChange = (icon: TReportIcons) => {
    const { instance } = this.state;
    instance.config.icon = icon;
    this.setState({ icon });
  };

  handleFiltersChange = (filters: TReportFilter[]) => {
    this.setState({ filterVOS: filters });
    this.execReport();
    this.toggleFiltersModal();
  };

  handleDelete = () => {
    const { id: instanceId } = this.state.instance;
    ReportService.delete(instanceId)
      .then(() => this.props.onDelete(instanceId))
      .catch(displayErrMsg(this.props.enqueueSnackbar));
  };

  getOptions() {
    const { bp, theme } = this.props;
    const { instance } = this.state;
    const type = theme.palette.type;

    const options = get(instance, `config.options.${type}.${bp}`);

    get(options, "series", []).forEach((s: any) => {
      has(s, "data") && Reflect.deleteProperty(s, "data");
    });

    return omit(options, [
      "dataset",
      "radar",
      "toolbox.feature.saveAsImage",
      "legend.textStyle"
    ]);
  }

  handleMenuItemClick = (key: TReportMenuAction) => {
    switch (key) {
      case "TOGGLE_AUTO_REFRESH":
        return this.setState(state => ({ isRunning: !state.isRunning }));

      case "REFRESH_REPORT":
        return this.execReport({ loadFromCache: false });

      case "DELETE_REPORT":
        return this.handleDelete();

      case "OPEN_FILTERS":
        return this.toggleFiltersModal();

      case "OPEN_EXPORT":
        return this.toggleExportModal();

      case "FULLSCREEN":
        const elementId = `report-grid-${this.props.instanceId}`;
        const reportWrapper = document.getElementById(elementId);
        return reportWrapper!.requestFullscreen();

      case "OPEN_EMBED":
        return this.toggleEmbedModal();

      case "BACK_FROM_DRILLDOWN":
        return this.setState(
          {
            instance: ReportService.get(this.props.instanceId),
            options: {},
            isDrillDown: false,
            parentParams: []
          },
          this.initialize
        );

      default:
        break;
    }
  };

  listener = (data: any) => {
    const { instance } = this.state;
    const { drillDownId } = instance;

    if (!!drillDownId) {
      const drillDownInstance = ReportService.get(drillDownId);
      const parentParams = drillDownInstance.report.query.queryParams.find(
        p => ["BY_PARENT", "BY_BUSINESS_OR_PARENT"].indexOf(p.fill) > -1
      );
      if (!!parentParams) {
        parentParams.value = data.name;
      }
      this.setState(
        {
          instance: drillDownInstance,
          options: {},
          isDrillDown: true,
          parentParams: !!parentParams ? [parentParams] : []
        },
        this.initialize
      );
    }
  };

  renderActions = (type: TReportType) => {
    const { instance } = this.state;
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
      instance,
      data,
      isRunning,
      interval,
      options,
      theme,
      icon,
      openFilters,
      openExport,
      openEmbed,
      filterVOS,
      isDrillDown,
      loading,
      error
    } = this.state;
    const isChart = ["SCALAR", "TABLE"].indexOf(instance.report.type) === -1;

    if (error) {
      return (
        <ReportCard instance={instance}>
          <ExecError onRetry={this.handleRetry} onDelete={this.handleDelete} />
        </ReportCard>
      );
    }

    if (!!data && isChart && data.rows.length === 0) {
      return (
        <ReportCard instance={instance}>
          <NoData onRetry={this.handleRetry} />
        </ReportCard>
      );
    }

    return (
      <Subscriber
        category={Categories.Drilldown}
        id={instance.id}
        listener={this.listener}
      >
        <ReportCard
          instance={instance}
          autoRefresh={interval > 0}
          isRunning={isRunning}
          isDrillDown={isDrillDown}
          onMenuItemClick={this.handleMenuItemClick}
          actions={this.renderActions(instance.report.type)}
        >
          <Modal
            open={openFilters}
            onClose={this.toggleFiltersModal}
            maxWidth="md"
            keepMounted={false}
            actions={<></>}
          >
            <Filters
              instance={instance}
              initials={filterVOS}
              reportFilters={this.reportFilters}
              onClose={this.toggleFiltersModal}
              onFiltersChange={this.handleFiltersChange}
            />
          </Modal>
          <Modal
            open={openExport}
            onClose={this.toggleExportModal}
            maxWidth="xs"
            actions={<></>}
          >
            <Export instanceId={instance.id} filterVOS={filterVOS} />
          </Modal>
          <Modal
            open={openEmbed}
            onClose={this.toggleEmbedModal}
            actions={<></>}
          >
            <Embed instanceId={instance.id} />
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
              instance={instance}
              // data={data}
              options={options}
              theme={theme}
              loading={loading}
            />
          )}
        </ReportCard>
      </Subscriber>
    );
  }
}

const WithTheme = withTheme(Report);
const WithBreakPoint = withBreakPoint(WithTheme);
export default withSnackbar(WithBreakPoint);
