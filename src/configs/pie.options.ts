export default function getPieOptions(length: number) {
  const _default = {
    name: "پیشفرض",
    options: {}
  };

  const donut = {
    name: "دونات",
    options: {
      series: Array(length).fill({
        type: "pie",
        label: {
          show: true,
          position: "outside",
          alignTo: "labelLine",
          formatter: "{b} - {d}%"
        },
        radius: ["50%", "75%"],
        roseType: false
      })
    }
  };

  const noLabel = {
    name: "بدون عنوان",
    options: {
      series: Array(length).fill({
        type: "pie",
        label: {
          show: false,
          position: "outside",
          alignTo: "labelLine",
          formatter: "{b} - {d}%"
        },
        radius: [0, "75%"],
        roseType: false
      })
    }
  };

  const donutNoLabel = {
    name: "دونات بدون عنوان",
    options: {
      series: Array(length).fill({
        type: "pie",
        label: {
          show: false,
          position: "outside",
          alignTo: "labelLine",
          formatter: "{b} - {d}%"
        },
        radius: ["50%", "75%"],
        roseType: false
      })
    }
  };

  const insideLabel = {
    name: "عنوان داخلی",
    options: {
      series: Array(length).fill({
        type: "pie",
        label: {
          show: true,
          position: "inside",
          alignTo: "none",
          formatter: "{d}%"
        },
        radius: ["0", "75%"],
        roseType: false
      })
    }
  };

  const roseType = {
    name: "roseType",
    options: {
      series: Array(length).fill({
        type: "pie",
        label: {
          show: true,
          position: "outside",
          alignTo: "labelLine",
          formatter: "{b} - {d}%"
        },
        radius: [0, "75%"],
        roseType: true
      })
    }
  };

  const roseTypeArea = {
    name: "roseType (area)",
    options: {
      series: Array(length).fill({
        type: "pie",
        label: {
          show: true,
          position: "outside",
          alignTo: "labelLine",
          formatter: "{b} - {d}%"
        },
        radius: [0, "75%"],
        roseType: "area"
      })
    }
  };

  return [
    _default,
    donut,
    noLabel,
    donutNoLabel,
    insideLabel,
    roseType,
    roseTypeArea
  ];
}
