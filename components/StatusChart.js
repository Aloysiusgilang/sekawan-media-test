import { Card, Title, DonutChart } from "@tremor/react";

const cities = [
  {
    name: "New York",
    sales: 9800,
  },
  {
    name: "London",
    sales: 4567,
  },
  {
    name: "Hong Kong",
    sales: 3908,
  },
  {
    name: "San Francisco",
    sales: 2400,
  },
  {
    name: "Singapore",
    sales: 1908,
  },
  {
    name: "Zurich",
    sales: 1398,
  },
];

const valueFormatter = (number) =>
  ` ${Intl.NumberFormat("us").format(number).toString()}`;

const convertData = (requestData) => {
  const result = requestData.reduce((acc, item) => {
    const status = item.status.toLowerCase();
    const existingItem = acc.find((entry) => entry.status === status);

    if (existingItem) {
      existingItem.count++;
    } else {
      acc.push({ status, count: 1 });
    }

    return acc;
  }, []);

  return result;
};

const StatusChart = ({ requestData }) => {
  const convertedData = convertData(requestData);
  console.log(convertedData);

  return (
    <Card className="max-w-lg mb-8">
      <Title>Sales</Title>
      <DonutChart
        className="mt-6"
        data={convertedData}
        category="count"
        index="status"
        valueFormatter={valueFormatter}
        colors={["yellow", "green", "rose", "cyan", "amber"]}
      />
    </Card>
  );
};

export default StatusChart;
