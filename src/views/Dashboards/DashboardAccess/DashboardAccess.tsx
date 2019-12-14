import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment-jalaali";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { Search } from "components/Inputs";
import Loading from "components/Loading";
import Alert from "components/Alert";
import Users from "./Users";
import { DatePicker, useAccess, TUser, TActions } from ".";

const DashboardAccess = (props: { reportId: number }) => {
  const [date, setDate] = useState(moment().add(1, "month"));
  const [state, actions] = useAccess();
  const { loading, error, users, q } = state;
  const { reportId } = props;

  useEffect(() => {
    actions.getUsers(reportId);
  }, [actions, q, reportId]);

  const handleDateChange = (d: Moment) => {
    setDate(d);
  };

  const handleSubmit = (q: string) => {
    if (q && users.every(u => u.user.username !== q)) {
      actions.subscribe({
        identity: q.trim().replace(/(\s|;)+/g, ","),
        expire: date.format("YYYY/MM/DD"),
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
        sm={9}
        md={10}
        lg={10}
        xl={10}
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
      </Grid>
      <Grid
        item
        xs={12}
        sm={3}
        md={2}
        lg={2}
        xl={2}
        style={{ direction: "ltr" }}
      >
        <DatePicker date={date} onDateChange={handleDateChange} />
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
