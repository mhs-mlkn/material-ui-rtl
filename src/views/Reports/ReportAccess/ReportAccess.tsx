import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { Search } from "components/Inputs";
import Loading from "components/Loading";
import Alert from "components/Alert";
import Users from "./Users";
import { useAccess, TAccess } from ".";

const ReportAccess = (props: { reportId: number }) => {
  const [state, actions]: [TAccess, any] = useAccess();
  const { loading, error, users, q } = state;
  const { reportId } = props;

  useEffect(() => {
    actions.getUsers(reportId);
  }, [actions, q, reportId]);

  const handleSearch = (q: string) => {
    actions.changeSearch(q);
  };

  const handleSubmit = (q: string) => {
    if (q && users.every(u => u.username !== q)) {
      actions.subscribe(q);
    }
  };

  const handleCloseError = () => {
    actions.changeSearch("");
    actions.getUsers(reportId);
  };

  if (loading) {
    return <Loading text="درحال دریافت اطلاعات" />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Search
          initialValue={q}
          onChange={handleSearch}
          onSubmit={handleSubmit}
          icon={AddIcon}
          updateOnTyping
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        {error && (
          <Alert
            variant="error"
            message={error.toString()}
            onClose={handleCloseError}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Users />
      </Grid>
    </Grid>
  );
};

export default ReportAccess;
