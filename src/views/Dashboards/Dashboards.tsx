import React from "react";
import Layout from "components/Layout";
import ReportCard from "components/ReportCard/ReportCard";

const layouts = {
  xl: [
    { i: "0", x: 0, y: 0, w: 1, h: 1 },
    { i: "1", x: 0, y: 0, w: 1, h: 1 },
    { i: "2", x: 0, y: 0, w: 1, h: 1 }
  ],
  lg: [
    { i: "0", x: 0, y: 0, w: 1, h: 1 },
    { i: "1", x: 0, y: 0, w: 1, h: 1 },
    { i: "2", x: 0, y: 0, w: 1, h: 1 }
  ],
  md: [
    { i: "0", x: 0, y: 0, w: 1, h: 1 },
    { i: "1", x: 0, y: 0, w: 1, h: 1 },
    { i: "2", x: 0, y: 0, w: 1, h: 1 }
  ],
  sm: [
    { i: "0", x: 0, y: 0, w: 1, h: 1 },
    { i: "1", x: 0, y: 0, w: 1, h: 1 },
    { i: "2", x: 0, y: 0, w: 1, h: 1 }
  ],
  xs: [
    { i: "0", x: 0, y: 0, w: 1, h: 1 },
    { i: "1", x: 0, y: 0, w: 1, h: 1 },
    { i: "2", x: 0, y: 0, w: 1, h: 1 }
  ]
};

const Dashboards = () => {
  return (
    <Layout layouts={layouts}>
      {[0, 1, 2].map(key => (
        <div key={`${key}`}>
          <ReportCard key={key} />
        </div>
      ))}
    </Layout>
  );
};

export default Dashboards;
