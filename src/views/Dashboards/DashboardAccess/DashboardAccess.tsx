import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { Search } from "components/Inputs";
import Loading from "components/Loading";
import Alert from "components/Alert";
import Users from "./Users";
import { DatePicker, useAccess, TAccess, TActions } from ".";

const DashboardAccess = (props: { reportId: number }) => {
  const [state, actions] = useAccess();
  const { loading, error, users, q } = state;
  const { reportId } = props;

  useEffect(() => {
    actions.getUsers(reportId);
  }, [actions, q, reportId]);

  // const handleSearch = (q: string) => {
  //   actions.changeSearch(q);
  // };

  const handleSubmit = (q: string) => {
    if (q && users.every(u => u.user.username !== q)) {
      actions.subscribe({
        identity: q.trim().replace(/(\s|;)+/g, ","),
        expire: "2019-12-31",
        editable: true
      });
    }
  };

  const handleCloseError = () => {
    actions.changeSearch("");
    actions.getUsers(reportId);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        style={{ direction: "ltr" }}
      >
        <Search
          placeholder="( ; نام کاربری، ایمیل یا شماره همراه (جداسازی با فاصله یا"
          initialValue={q}
          // onChange={handleSearch}
          onSubmit={handleSubmit}
          icon={AddIcon}
          updateOnTyping={false}
        />
        <DatePicker />
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

export default DashboardAccess;
