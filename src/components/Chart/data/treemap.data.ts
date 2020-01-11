import { TReportInstance, TReportData } from "components/Report";

type TNode = {
  id: number;
  name: string;
  value: number;
  children: TNode[];
};

function treemapData(instance: TReportInstance, data: TReportData) {
  if (data.rows.length === 0) {
    return {
      series: [
        {
          name: "no data",
          type: "treemap",
          data: []
        }
      ]
    };
  }
  const root = creteNode(data.rows[0].cols);

  function creteNode(row: any[]): TNode {
    return {
      id: row[2],
      name: row[0],
      value: row[1],
      children: getChildren(row[2], data)
    };
  }

  function getChildren(parentId: number, data: TReportData): TNode[] {
    const children = [];
    for (const row of data.rows) {
      const r = row.cols;
      if (r[3] === parentId) {
        children.push(creteNode(r));
      }
    }
    return children;
  }

  console.dir(root);

  return {
    series: [
      {
        name: root.name,
        type: "treemap",
        visibleMin: 300,
        data: root.children,
        leafDepth: 2,
        levels: [
          {
            itemStyle: {
              normal: {
                borderColor: "#555",
                borderWidth: 4,
                gapWidth: 4
              }
            }
          },
          {
            colorSaturation: [0.3, 0.6],
            itemStyle: {
              normal: {
                borderColorSaturation: 0.7,
                gapWidth: 2,
                borderWidth: 2
              }
            }
          },
          {
            colorSaturation: [0.3, 0.5],
            itemStyle: {
              normal: {
                borderColorSaturation: 0.6,
                gapWidth: 1
              }
            }
          },
          {
            colorSaturation: [0.3, 0.5]
          }
        ]
      }
    ]
  };
}
export default treemapData;
