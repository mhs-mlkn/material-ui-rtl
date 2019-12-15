import React, { useEffect, useRef, useState } from "react";
import find from "lodash/find";
import keyBy from "lodash/keyBy";
import {
  Formik,
  Form,
  Field,
  FormikProps,
  FieldArray,
  FieldProps
} from "formik";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { FormikInput, FormikDatePicker, FormikSwith } from "components/Inputs";
import { Button } from "components/Button";
import {
  TReportInstance,
  TReportFilters,
  TReportFilter,
  TQueryFilter
} from "components/Report";

type propsType = {
  instance: TReportInstance;
  initials: TReportFilter[];
  onFiltersChange: (filters: TReportFilter[]) => any;
  onClose: () => any;
};

const Filters = (props: propsType) => {
  const { instance, initials, onFiltersChange, onClose } = props;
  const { report } = instance;
  const filters = useRef<{ [key: string]: TQueryFilter }>({});
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const { queryFilters } = report.query;
    filters.current = keyBy(queryFilters, "id");
    setUpdate(update + 1);
    // eslint-disable-next-line
  }, [report.query]);

  const getInitials = (reset?: boolean) => {
    const { queryFilters: filters } = report.query;
    const _initials = {
      filters: filters.reduce((res, filter) => {
        const init = find(initials, { id: filter.id + "" });
        const value = !!init && !!reset ? init.value : "";
        return [...res, { id: filter.id + "", value }];
      }, [] as TReportFilter[])
    } as TReportFilters;
    return _initials;
  };

  const handleSubmit = (values: TReportFilters) => {
    onFiltersChange(values.filters);
  };

  const renderInput = (
    filter: TReportFilter,
    props: FieldProps<TReportFilters>
  ) => {
    const reportFilter = filters.current[filter.id];

    if (reportFilter.validValueType === "QUERY_LIST") {
      return <div>QUERY_LIST</div>;
    }
    if (reportFilter.validValueType === "CONST_LIST") {
      const options = reportFilter.validValue
        .split("\n")
        .map(opt => opt.trim());
      return (
        <FormikInput
          {...props}
          margin="dense"
          select
          label={reportFilter.title}
        >
          {options.map((opt, i) => (
            <MenuItem value={opt} key={i}>
              {opt}
            </MenuItem>
          ))}
        </FormikInput>
      );
    }

    switch (reportFilter.type) {
      case "DATE":
      case "DATE_STRING":
        return (
          <FormikDatePicker
            {...props}
            margin="dense"
            label={reportFilter.title}
          />
        );

      case "BOOLEAN":
        return <FormikSwith {...props} label={reportFilter.title} />;

      default:
        return (
          <FormikInput {...props} margin="dense" label={reportFilter.title} />
        );
    }
  };

  const renderForm = (formikProps: FormikProps<TReportFilters>) => {
    return (
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h6" gutterBottom>
              فیلترهای گزارش: {instance.name || instance.report.name}
            </Typography>
          </Grid>
          <FieldArray
            name="filters"
            render={() => {
              return formikProps.values.filters.map((f, i) => (
                <Grid key={f.id} item xs={12} sm={4} md={3} lg={3} xl={2}>
                  <Field name={`filters.${i}.value`}>
                    {(innerProps: FieldProps<TReportFilters>) =>
                      renderInput(f, innerProps)
                    }
                  </Field>
                </Grid>
              ));
            }}
          />
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button color="primary" text="اعمال" type="submit" />
            <Button
              color="secondary"
              text="پاک کردن"
              type="reset"
              style={{ margin: "0 8px" }}
            />
            <Button color="default" text="بستن" onClick={onClose} />
          </Grid>
        </Grid>
      </Form>
    );
  };

  if (!update) {
    return null;
  }

  return (
    <Formik
      initialValues={getInitials(true)}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {(formikProps: FormikProps<TReportFilters>) => renderForm(formikProps)}
    </Formik>
  );
};

export default Filters;
