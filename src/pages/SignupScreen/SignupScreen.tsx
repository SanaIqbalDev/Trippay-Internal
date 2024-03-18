import { Outlet } from "react-router-dom";
import SiderComponent from "../../components/SiderComponent";

const SignupScreen = () => {
  return (
    <div className="login-container">
      <Outlet />
      <SiderComponent />
    </div>
  );
}

export default SignupScreen;