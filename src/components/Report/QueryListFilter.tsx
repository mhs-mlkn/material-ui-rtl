import React, { useState, useEffect } from "react";
import { TextField } from "components/Inputs";
import Loading from "components/Loading";
import { ReportService, TReportData } from "components/Report";

type propsType = {
  instanceId: number;
  filterId: number;
  children: (options: any[]) => any;
};

const QueryListFilter = (props: propsType) => {
  const { instanceId, filterId, children } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    ReportService.getFilterOptions(instanceId, filterId)
      .then((data: TReportData) =>
        setOptions(data.rows.map(row => row.cols[0]))
      )
      .catch(() => setError(true))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <TextField
        variant="outlined"
        fullWidth
        disabled
        error
        value="دریافت اطلاعات با خطا مواجه شد"
      />
    );
  }
  return children(options);
};

export default QueryListFilter;
