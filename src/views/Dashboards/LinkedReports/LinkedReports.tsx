import React, { useEffect, useState } from "react";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { ModalButton } from "components/Modal";
import Loading from "components/Loading";
import { ErrorMessage } from "components/Exceptions";
import { TDashboard } from "components/Dashboard";
import { ReportService as Reports } from "components/Report";
import { ReportList } from ".";

type propsType = {
  dashboard: TDashboard;
};

const LinkedReports = (props: propsType) => {
  const { dashboard } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    Reports.Instances.catch(() => setError(true)).finally(() =>
      setLoading(false)
    );
  }, []);

  return (
    <ModalButton
      icon={AccountTreeIcon}
      IconButtonProps={{ title: "لیست گزارش ها" }}
      IconProps={{ fontSize: "default" }}
      DialogProps={{ maxWidth: "lg" }}
    >
      {error ? (
        <ErrorMessage />
      ) : loading ? (
        <Loading />
      ) : (
        <ReportList dashboard={dashboard} />
      )}
    </ModalButton>
  );
};

export default LinkedReports;
