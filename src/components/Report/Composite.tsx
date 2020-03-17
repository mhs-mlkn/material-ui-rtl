import React, { useState, useEffect, useRef } from "react";
import get from "lodash/get";
import ReactHtmlParser from "react-html-parser";
import { parseToJSON } from "utility";
import Loading from "components/Loading";
import ReportCard from "components/ReportCard";
import { ReportService, ExecError, TReportInstance } from "components/Report";

type Config = {
  html: string;
  map: { [key: string]: number };
};

const defaultConfig = { html: "", map: {} };

const Composite = (props: { instance: TReportInstance }) => {
  const { instance } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    function execReport(key: string, reportId: number) {
      return ReportService.executeComposite(instance.id, reportId).then(
        reportData => {
          const value = get(reportData, "rows[0].cols[0]", "");
          const reg = new RegExp(`\\{${key}\\}`, "g");
          return setContent(config.html.replace(reg, value));
        }
      );
    }

    const config: Config = parseToJSON(instance.report.config, defaultConfig);
    let p: Promise<any>[] = [];
    setLoading(true);
    for (const key in config.map) {
      if (config.map.hasOwnProperty(key)) {
        const reportId = config.map[key];
        p = p.concat(execReport(key, reportId));
      }
    }
    Promise.all(p)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [instance]);

  if (error) {
    return (
      <ReportCard instance={instance}>
        <ExecError onRetry={() => {}} onDelete={() => {}} />
      </ReportCard>
    );
  }

  return (
    <ReportCard instance={instance}>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ direction: "ltr" }}>{ReactHtmlParser(content)}</div>
      )}
    </ReportCard>
  );
};

export default Composite;
