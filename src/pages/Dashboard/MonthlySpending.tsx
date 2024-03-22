import { Row, Col, Divider, Tabs } from "antd";
import DoughnutChart from "../../components/DoughnutChart";

const MonthlySpending = () => {
  const data = [
    { label: "Subscriptions", amount: "$148.40", color: "#1890ff" },
    { label: "Groceries", amount: "$642.48", color: "#6172f3" },
    { label: "Food & Dining", amount: "$614.16", color: "#EE46BC" },
    { label: "Investing", amount: "$290.00", color: "#17B26A" },
    { label: "Mortgage", amount: "$824.28", color: "#F79009" },
    { label: "Other", amount: "$48.44", color: "#4E5BA6" },
  ];
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        className="right-tabs"
        items={[
          { label: "This month", key: "1" },
          { label: "Last month", key: "2" },
          { label: "+ Custom", key: "3" },
        ]}
      ></Tabs>
      <Divider />
      <Row>
        <Col span={12}>
          <DoughnutChart />
        </Col>
        <Col span={12}>
          <Row gutter={[16, 16]} wrap={true} className="h-full">
            {data.map((item, index) => (
              <Col span={12} key={index} className="flex items-center">
                <div className="flex flex-row">
                  <span
                    style={{
                      marginRight: 8,
                      color: item.color,
                      fontSize: "24px",
                    }}
                  >
                    •
                  </span>
                  <div className="flex flex-col">
                    <span className=" text-sm font-medium">{item.label}</span>
                    <span className=" text-2xl font-semibold">
                      {item.amount}
                    </span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default MonthlySpending;
