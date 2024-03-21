import React from "react";
import { Row, Col, Card, Statistic, Tabs, Button, Image } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined, ExportOutlined, MenuOutlined } from "@ant-design/icons";
import SuccessGraph from "../../assets/images/success-graph.svg";
import FailureGraph from "../../assets/images/failure-graph.svg";
// You would also import your chart library and components here

const { TabPane } = Tabs;

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 m-6">
      <Row justify={"space-between"}>
        <Col>
          <div className="flex flex-col gap-1">
            <span className="main-heading" style={{ textAlign: "start" }}>
              Dashboard
            </span>
            <span className="sub-heading">Welcome back, Asmaa!</span>
          </div>
        </Col>
        <Col className="flex gap-3">
          <Button type="default" icon={<ExportOutlined />}>
            Export
          </Button>
          <Button type="primary">Send Funds</Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card className="stats-card" style={{ gap: "20px" }}>
            <div className="flex flex-col justify-between">
              <span style={{ fontSize: "16px", fontWeight: "600" }}>Users</span>
              <span style={{ fontSize: "36px", fontWeight: "600" }}>20.8k</span>
              <span style={{ fontSize: "14px", fontWeight: "500" }}>
                <ArrowUpOutlined /> 12% vs. last month
              </span>
            </div>
            <div className="flex flex-col justify-between items-end">
              <MenuOutlined />
              <Image src={SuccessGraph} preview={false} />
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card className="stats-card" style={{ gap: "20px" }}>
            <div className="flex flex-col justify-between">
              <span style={{ fontSize: "16px", fontWeight: "600" }}>Users</span>
              <span style={{ fontSize: "36px", fontWeight: "600" }}>20.8k</span>
              <span style={{ fontSize: "14px", fontWeight: "500" }}>
                <ArrowUpOutlined /> 12% vs. last month
              </span>
            </div>
            <div className="flex flex-col justify-between items-end">
              <MenuOutlined />
              <Image src={FailureGraph} preview={false} />
            </div>
          </Card>
        </Col>

        {/* Travelers Widget */}
        <Col span={8}>
          <Card className="stats-card" style={{ gap: "20px" }}>
            <div className="flex flex-col justify-between">
              <span style={{ fontSize: "16px", fontWeight: "600" }}>Users</span>
              <span style={{ fontSize: "36px", fontWeight: "600" }}>20.8k</span>
              <span style={{ fontSize: "14px", fontWeight: "500" }}>
                <ArrowUpOutlined /> 12% vs. last month
              </span>
            </div>
            <div className="flex flex-col justify-between items-end">
              <MenuOutlined />
              <Image src={SuccessGraph} preview={false} />
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Monthly Spending Donut Chart */}
        <Col span={12}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab="This month" key="1" />
              <TabPane tab="Last month" key="2" />
              <TabPane tab="Custom" key="3" />
            </Tabs>
            {/* Donut Chart Component here */}
          </Card>
        </Col>

        {/* Spending Details */}
        <Col span={12}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Overview" key="1" />
              <TabPane tab="Budget" key="2" />
              <TabPane tab="Spending" key="3" />
              <TabPane tab="Rewards" key="4" />
            </Tabs>
            {/* Spending Details Components here */}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Balance Over Time Line Chart */}
        <Col span={12}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab="12 months" key="1" />
              <TabPane tab="30 days" key="2" />
              <TabPane tab="7 days" key="3" />
            </Tabs>
            {/* Line Chart Component here */}
          </Card>
        </Col>

        {/* Balance Over Time Bar Chart */}
        <Col span={12}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane tab="12 months" key="1" />
              <TabPane tab="30 days" key="2" />
              <TabPane tab="7 days" key="3" />
            </Tabs>
            {/* Bar Chart Component here */}
            <Button type="primary">View full report</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
