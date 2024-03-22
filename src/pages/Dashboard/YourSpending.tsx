import { Row, Tabs, Image } from "antd";
import IconDropdown from "../../assets/icons/ic-dropdown.svg";

const YourSpending = () => {
  return (
    <>
      <Row justify={"space-between"}>
        <span>Your Spending</span>
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
      <Row justify={"space-between"}>
        <span>Current balance</span>
        <span>$1240.40</span>
      </Row>
      <Row justify={"space-between"}>
        <span>Current balance</span>
        <span>$1240.40</span>
      </Row>
      <Row justify={"space-between"}>
        <span>Current balance</span>
        <span>$1240.40</span>
      </Row>
    </>
  );
};

export default YourSpending;
