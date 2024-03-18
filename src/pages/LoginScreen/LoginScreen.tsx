import { Outlet } from "react-router-dom";
import SiderComponent from "../../components/SiderComponent";

export const LoginScreen: React.FC = () => {
  return (
    <div className="login-container">
      <Outlet/>
      <SiderComponent/>
    </div>
  );
};

export default LoginScreen;
