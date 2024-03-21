import { Flex, Image, Layout } from 'antd'
import Sider from 'antd/es/layout/Sider';
import { Header, Content } from 'antd/es/layout/layout';
import React from 'react'
import TrippayLogo from "../../assets/images/trippay-logo-header.svg";
import DashboardMenu from '../../components/DashboardMenu';
import SearchIcon from "../../assets/icons/ic-search.svg";
import NotificationIcon from "../../assets/icons/ic-notification.svg";
import Avatar from "../../assets/icons/test-avatar.svg"
import Dashboard from './Dashboard';

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#f7f4fd",
};

const contentStyle: React.CSSProperties = {
   backgroundColor: "white",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  backgroundColor:"#F9FAFB",
};

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
  maxWidth: "100%",
  height:"100vh",
  
};
const Home = () => {
  return (
    <Layout style={layoutStyle}>
      <Sider width={280} style={siderStyle}>
        <Image src={TrippayLogo} preview={false} />
        <DashboardMenu />
      </Sider>
      <Layout>
        <Header
          className="h-[72px] w-full flex flex-row-reverse justify-between items-center "
          style={headerStyle}
        >
          <Flex className="h-12 gap-1">
            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-white">
              <Image className="w-5 h-5" src={SearchIcon} preview={false} />
            </div>
            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-white">
              <Image
                className="w-5 h-5"
                src={NotificationIcon}
                preview={false}
              />
            </div>
            <Image src={Avatar} preview={false} />
          </Flex>
        </Header>
        <Content style={contentStyle}><Dashboard/></Content>
      </Layout>
    </Layout>
  );
}

export default Home