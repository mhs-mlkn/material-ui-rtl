import React, { Component } from "react";
import get from "lodash/get";
import { withSnackbar, WithSnackbarProps } from "notistack";
import { withTheme, Theme } from "@material-ui/core/styles";
import { displayErrMsg } from "utility";
import { withBreakPoint, TBreakPoint } from "components/Layout";
import { TReportInstance } from "components/Report";
import Chart from "components/Chart";
import Scalar from "components/Scalar";
import Table from "components/Table";
import ReportCard from "components/ReportCard";
import {
  ReportService,
  ExecError,
  TReportData,
  TReportExecParams
} from "components/Report";

type propsType = {
  instance: TReportInstance;
  onDelete: (instanceId: number) => void;
} & WithSnackbarProps & { bp: TBreakPoint } & { theme: Theme };

type stateType = {
  loading: boolean;
  error: boolean;
  data: TReportData | undefined;
};

class Report extends Component<propsType, stateType> {
  state = {
    loading: false,
    error: false,
    data: undefined
  };

  componentDidMount() {
    if (this.props.instance.report.type !== "TABLE") {
      this.execReport();
    }
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error: true });
    console.error(`Report ErrorBoundary> (${this.props.instance.id}) `, error);
  }

  execReport = (params?: TReportExecParams) => {
    this.setState({ loading: true, error: false });
    const { id: instanceId } = this.props.instance;
    ReportService.execute(instanceId, params)
      .then(data => this.setState({ data }))
      .catch(() => this.setState({ error: true }))
      .finally(() => this.setState({ loading: false }));
  };

  handleRetry = () => {
    this.execReport({ loadFromCache: false });
  };

  handleChangeOption = (options: object) => {
    const { instance, bp, theme } = this.props;
    const type = theme.palette.type;
    instance.config.options[type][bp] = options;
  };

  handleDelete = () => {
    const { id: instanceId } = this.props.instance;
    ReportService.delete(instanceId)
      .then(() => this.props.onDelete(instanceId))
      .catch(displayErrMsg(this.props.enqueueSnackbar));
  };

  render() {
    const { data, loading, error } = this.state;
    const { instance, bp, theme } = this.props;

    const type = theme.palette.type;
    const options = get(instance, `config.options.${type}.${bp}`, {});

    if (error) {
      return (
        <ReportCard>
          <ExecError onRetry={this.handleRetry} onDelete={this.handleDelete} />
        </ReportCard>
      );
    }

    return instance.report.type === "SCALAR" ? (
      <Scalar
        instance={instance}
        options={options}
        data={data}
        loading={loading}
        onChangeOption={this.handleChangeOption}
        onDelete={this.handleDelete}
      />
    ) : instance.report.type === "TABLE" ? (
      <Table
        instance={instance}
        options={options}
        data={data}
        loading={loading}
        onChangeOption={this.handleChangeOption}
        onDelete={this.handleDelete}
        execReport={this.execReport}
      />
    ) : (
      <Chart
        instance={instance}
        options={options}
        data={data}
        loading={loading}
        onChangeOption={this.handleChangeOption}
        onDelete={this.handleDelete}
      />
    );
  }
}

const WithTheme = withTheme(Report);
const WithBreakPoint = withBreakPoint(WithTheme);
export default withSnackbar(WithBreakPoint);
