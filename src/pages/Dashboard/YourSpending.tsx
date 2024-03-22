import { Row, Tabs, Image, Button, Divider } from "antd";
import IconDropdown from "../../assets/icons/ic-dropdown.svg";
import StackedBarGraph from "../../components/StackedBarGraph";

const YourSpending = () => {
  return (
    <div className="flex flex-col gap-8">
      <Row justify={"space-between"}>
        <span className="font-semibold text-lg">Your Spending</span>
        <Image src={IconDropdown} preview={false} className="cursor-pointer" />
      </Row>
      <Tabs
        defaultActiveKey="1"
        items={[
          { label: "Overview", key: "1" },
          { label: "Budget", key: "2" },
          { label: "Spending", key: "3" },
          { label: "Rewards", key: "4" },
        ]}
      ></Tabs>
      <div className="flex flex-col gap-4">
        <Row justify={"space-between"}>
          <span className="text-sm font-medium">Current balance</span>
          <span className="text-2xl font-semibold">$1240.40</span>
        </Row>
        <Row justify={"space-between"}>
          <span className="text-sm font-medium">Current limit</span>
          <span className="text-2xl font-semibold">$15000.00</span>
        </Row>
        <Row justify={"space-between"}>
          <span className="text-sm font-medium">Budget this month</span>
          <span className="text-2xl font-semibold">$2400.00</span>
        </Row>
      </div>
      <div className="flex flex-col gap-6">
        <Row justify={"space-between"}>
          <span className="font-semibold text-lg">Balance over time</span>
          <Image
            src={IconDropdown}
            preview={false}
            className="cursor-pointer"
          />
        </Row>
        <div className="tabs-container">
          <Button type="text">12 months</Button>
          <Divider
            type="vertical"
          />
          <Button type="text">30 days</Button>
          <Divider
            type="vertical"
          />
          <Button type="text">7 days</Button>
        </div>
        <StackedBarGraph/>
      </div>
      <Divider/>
    </div>
  );
};

export default YourSpending;
