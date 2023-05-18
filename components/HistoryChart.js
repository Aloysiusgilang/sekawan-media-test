import { Card, Title, LineChart } from "@tremor/react";

const chartdata = [
  {
    year: 1970,
    "Export Growth Rate": 2.04,
    "Import Growth Rate": 1.53,
  },
  {
    year: 1971,
    "Export Growth Rate": 1.96,
    "Import Growth Rate": 1.58,
  },
  {
    year: 1972,
    "Export Growth Rate": 1.96,
    "Import Growth Rate": 1.61,
  },
  {
    year: 1973,
    "Export Growth Rate": 1.93,
    "Import Growth Rate": 1.61,
  },
  {
    year: 1974,
    "Export Growth Rate": 1.88,
    "Import Growth Rate": 1.67,
  },
  //...
];

const dataFormatter = (number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

const HistoryChart = ({ data }) => (
  console.log(data),
  (
    <Card>
      <Title>Fuel Consumption Trend</Title>
      <LineChart
        className="mt-6"
        data={data}
        index="date"
        categories={["liter"]}
        colors={["emerald", "gray"]}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  )
);

export default HistoryChart;
