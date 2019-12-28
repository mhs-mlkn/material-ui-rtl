import React, { useState, useEffect } from "react";
import {
  Formik,
  Form,
  Field,
  FormikProps,
  FieldProps,
  FieldArray
} from "formik";
import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { FormikInput } from "components/Inputs";
import { Button } from "components/Button";
import {
  ReportService,
  TReport,
  TQueryParam,
  TReportParams
} from "components/Report";
import { ReportsService as Service, useReports } from "views/Reports";
import { DashboardsService } from "components/Dashboard";
import { displayErrMsg } from "utility";

const ConfigParams = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [state, actions] = useReports();
  const [drillDown, setDrillDown] = useState<TReport | undefined>();
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [drillDownParams, setDrillDownParams] = useState<TQueryParam[]>([]);
  const [loading, setLoading] = useState(false);
  const { selectedReport: report, selectedDashboard: dashboard } = state;

  useEffect(() => {
    function setDrillDownReport() {
      if (!!report && report.drillDownId > -1) {
        const _drillDown = Service.getById(report.drillDownId);
        setDrillDown(_drillDown);
      }
    }

    function setReportParams() {
      if (!!report) {
        const _params = report.query.queryParams.filter(
          p => ["BY_BUSINESS", "BY_BUSINESS_OR_PARENT"].indexOf(p.fill) > -1
        );
        setParams(_params);
      }
    }

    setDrillDownReport();
    setReportParams();
  }, [report]);

  useEffect(() => {
    if (drillDown) {
      const _params = drillDown.query.queryParams.filter(
        p => ["BY_BUSINESS"].indexOf(p.fill) > -1
      );
      setDrillDownParams(_params);
    }
  }, [drillDown]);

  const submit = (values: TReportParams) => {
    if (report && dashboard) {
      setLoading(true);
      ReportService.create(dashboard.id, report.id, values, report.drillDownId)
        .then((instanceId: number) => {
          dashboard.userReportIds.push(instanceId);
          DashboardsService.addItems(dashboard, [instanceId]);
          actions.closeParamsModal();
        })
        .catch(displayErrMsg(enqueueSnackbar))
        .finally(() => setLoading(false));
    }
  };

  const validate = (values: TReportParams) => {
    const errors: { params: { value: string }[] } = { params: [] };
    const { params } = values;
    for (const p of params) {
      if (!p.value) {
        errors.params.push({ value: "مقدار وارد کنید" });
      } else if (
        ["DECIMAL", "FLOAT"].indexOf(p.type) > -1 &&
        !Number(p.value)
      ) {
        errors.params.push({ value: "عدد وارد کنید" });
      } else if (
        p.type === "BOOLEAN" &&
        ["true", "false"].indexOf(p.value.toLowerCase()) < 0
      ) {
        errors.params.push({ value: "true یا false وارد کنید" });
      } else {
        errors.params.push({ value: "" });
      }
    }
    for (const p of errors.params) {
      if (p.value) {
        return errors;
      }
    }
    return {};
  };

  const renderParamInput = (p: TQueryParam, i: number, fieldName: string) => {
    return (
      <Grid key={p.key} item xs={12} sm={4} md={3} lg={2} xl={2}>
        <Field name={`${fieldName}.${i}.value`}>
          {(innerProps: FieldProps<TReportParams>) => {
            const { meta } = innerProps;
            return (
              <Tooltip title={p.hint || ""}>
                <FormikInput
                  {...innerProps}
                  margin="dense"
                  label={p.key}
                  error={!!meta.error}
                  helperText={meta.error}
                  FormHelperTextProps={{
                    style: { textAlign: "start" }
                  }}
                />
              </Tooltip>
            );
          }}
        </Field>
      </Grid>
    );
  };

  const renderForm = (formikProps: FormikProps<TReportParams>) => {
    return (
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Field name="name">
              {(innerProps: FieldProps<TReportParams>) => (
                <FormikInput {...innerProps} label="نام گزارش" />
              )}
            </Field>
          </Grid>
          {formikProps.values.params.length > 0 && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography variant="h6" component="h6" gutterBottom>
                پارامتر های گزارش
              </Typography>
            </Grid>
          )}
          <FieldArray
            name="params"
            render={() =>
              formikProps.values.params.map((p, i) =>
                renderParamInput(p, i, "params")
              )
            }
          />
          {formikProps.values.drillDownParams.length > 0 && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography variant="h6" component="h6" gutterBottom>
                پارامتر های زیرگزارش
              </Typography>
            </Grid>
          )}
          <FieldArray
            name="drillDownParams"
            render={() =>
              formikProps.values.drillDownParams.map((p, i) =>
                renderParamInput(p, i, "drillDownParams")
              )
            }
          />
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button text="ارسال" loading={loading} type="submit" />
          </Grid>
        </Grid>
      </Form>
    );
  };

  return (
    <Formik
      initialValues={{
        name: !!report ? report.name : "",
        params,
        drillDownParams
      }}
      enableReinitialize={true}
      validate={validate}
      onSubmit={submit}
    >
      {(formikProps: FormikProps<TReportParams>) => renderForm(formikProps)}
    </Formik>
  );
};

export default ConfigParams;
