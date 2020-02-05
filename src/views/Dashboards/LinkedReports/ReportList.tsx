import React, { useEffect, useState } from "react";
import get from "lodash/get";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Button } from "components/Button";
import SaveIcon from "@material-ui/icons/Save";
import { TDashboard } from "components/Dashboard";
import { ReportService as Reports } from "components/Report";
import { ReportSelect } from ".";

type propsType = {
  dashboard: TDashboard;
};

let linkedReports = {};

const ReportList = (props: propsType) => {
  const { dashboard } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    linkedReports = {};

    return function() {
      linkedReports = {};
    };
  }, []);

  const handleChange = (id: number) => (parentId: number) => {
    linkedReports = { ...linkedReports, [id]: parentId };
    console.log(linkedReports);
  };

  const getReportName = (id: number) => {
    const ins = Reports.get(id);
    const defaultName = get(ins, "report.name", "");
    return get(ins, "name", defaultName);
  };

  const getReportType = (id: number) => {
    const ins = Reports.get(id);
    return get(ins, "report.type", "");
  };

  const getParentId = (id: number) => {
    const ins = Reports.get(id);
    return get(ins, "parentId", -1);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
  };

  return (
    <>
      <Toolbar variant="dense" disableGutters>
        <Typography variant="h6" color="primary" style={{ flex: "1 1 100%" }}>
          {dashboard.name}
        </Typography>

        <Tooltip title="ذخیره">
          <Button
            text="ذخیره"
            icon={SaveIcon}
            loading={loading}
            variant="outlined"
            size="small"
            onClick={handleSave}
          />
        </Tooltip>
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 100 }}>شناسه</TableCell>
            <TableCell>نام</TableCell>
            <TableCell style={{ width: 100 }}>نوع</TableCell>
            <TableCell>گزارش اصلی</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dashboard.userReportIds
            .sort((a, b) => b - a)
            .map(id => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{getReportName(id)}</TableCell>
                <TableCell>{getReportType(id)}</TableCell>
                <TableCell>
                  <ReportSelect
                    reportId={id}
                    dashboard={dashboard}
                    value={getParentId(id)}
                    onChange={handleChange(id)}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ReportList;
