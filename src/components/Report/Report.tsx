import React, { Component } from "react";
import { withSnackbar, WithSnackbarProps } from "notistack";
import { displayErrMsg } from "utility";
import { TReportInstance } from "components/Report";
import Chart from "components/Chart";
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
} & WithSnackbarProps;

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
    console.log(this.props.instance.report.type);
    this.execReport();
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error: true });
    console.error("Report ErrorBoundary> ", error);
    // console.dir(errorInfo);
  }

  execReport(params?: TReportExecParams) {
    const { id: instanceId } = this.props.instance;
    this.setState({ loading: true, error: false });
    ReportService.execute(instanceId, params)
      .then(data => this.setState({ data }))
      .catch(() => this.setState({ error: true }))
      .finally(() => this.setState({ loading: false }));
  }

  handleRetry = () => {
    this.execReport({ loadFromCache: false });
  };

  handleDelete = () => {
    const { id: instanceId } = this.props.instance;
    ReportService.delete(instanceId)
      .then(() => this.props.onDelete(instanceId))
      .catch(displayErrMsg(this.props.enqueueSnackbar));
  };

  render() {
    const { data, loading, error } = this.state;
    const { instance } = this.props;

    if (error) {
      return (
        <ReportCard>
          <ExecError onRetry={this.handleRetry} onDelete={this.handleDelete} />
        </ReportCard>
      );
    }

    return instance.report.type === "Scalar" ? (
      <div>Scalar</div>
    ) : instance.report.type === "Table" ? (
      <div>Table</div>
    ) : (
      <Chart
        instance={instance}
        loading={loading}
        data={data}
        onDelete={this.handleDelete}
      />
    );
  }
}

export default withSnackbar(Report);
