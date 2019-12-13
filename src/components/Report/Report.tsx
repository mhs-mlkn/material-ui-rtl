import React, { Component } from "react";
import merge from "lodash/merge";
import get from "lodash/get";
import { withSnackbar, WithSnackbarProps } from "notistack";
import { withTheme, Theme } from "@material-ui/core/styles";
import { displayErrMsg, parseToJSON } from "utility";
import { withBreakPoint, TBreakPoint } from "components/Layout";
import { DeleteButton } from "components/Button";
import { TReportInstance } from "components/Report";
import Chart, { getOptions, getData } from "components/Chart";
import Scalar, { IconMenu } from "components/Scalar";
import Table from "components/Table";
import ReportCard from "components/ReportCard";
import {
  ReportService,
  ExecError,
  Settings,
  ThemeMenu,
  SaveButton,
  TReportData,
  TReportExecParams,
  TReportAdminConfig,
  TReportType,
  TChartTheme,
  TReportIcons
} from "components/Report";

type propsType = {
  instance: TReportInstance;
  onDelete: (instanceId: number) => void;
} & WithSnackbarProps & { bp: TBreakPoint } & { theme: Theme };

type stateType = {
  loading: boolean;
  error: boolean;
  data: TReportData | undefined;
  theme: TChartTheme;
  options: object;
  icon: TReportIcons;
};

class Report extends Component<propsType, stateType> {
  state = {
    loading: false,
    error: false,
    data: undefined,
    theme: get(this.props.instance, "config.theme", "default"),
    options: this.getOptions(),
    icon: get(this.props.instance, "config.icon", "info")
  };

  tempOptions: object = {};
  adminConfig: TReportAdminConfig = { refreshInterval: 0 };
  refreshInterval: number = -1;

  componentDidMount() {
    const { report } = this.props.instance;

    this.adminConfig = parseToJSON(report.config, this.adminConfig);

    if (this.adminConfig.refreshInterval > 0) {
      this.refreshInterval = window.setInterval(() => {
        // this.execReport({ loadFromCache: false }, false);
      }, this.adminConfig.refreshInterval * 1000);
    }

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

  handleRetry = () => {
    const { instance, bp, theme } = this.props;
    const type = theme.palette.type;
    instance.config.options[type][bp] = this.tempOptions;
    this.execReport({ loadFromCache: false });
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
            <DeleteButton onDelete={this.handleDelete} />
            <SaveButton instanceId={instance.id} />
          </>
        );

      case "TABLE":
        return (
          <>
            <DeleteButton onDelete={this.handleDelete} />
          </>
        );

      default:
        return (
          <>
            <ThemeMenu theme={theme} onChange={this.handleThemeChange} />
            <Settings json={options} onChange={this.handleOptionChange} />
            <DeleteButton onDelete={this.handleDelete} />
            <SaveButton instanceId={instance.id} />
          </>
        );
    }
  };

  render() {
    const { data, options, theme, icon, loading, error } = this.state;
    const { instance } = this.props;

    if (error) {
      return (
        <ReportCard>
          <ExecError onRetry={this.handleRetry} onDelete={this.handleDelete} />
        </ReportCard>
      );
    }

    return (
      <ReportCard actions={this.renderActions(instance.report.type)}>
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
