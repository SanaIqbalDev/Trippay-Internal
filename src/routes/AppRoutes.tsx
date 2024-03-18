import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SplashScreen from "../pages/SplashScreen";
import LoginScreen from "../pages/LoginScreen/LoginScreen";
import OtpForm from "../pages/LoginScreen/OtpForm";
import LoginForm from "../pages/LoginScreen/LoginForm";
import SignupScreen from "../pages/SignupScreen/SignupScreen";
import SignUpForm from "../pages/SignupScreen/SignUpForm";
const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SplashScreen />,
    },
    {
      path: "/login",
      element: <LoginScreen />,
      children: [
        {
          index: true,
          element: <LoginForm />,
        },
        {
          path: "otp",
          element: <OtpForm />,
        },
      ],
    },
    {
      path:"/signup",
      element:<SignupScreen/>,
      children:[
        {
          index:true,
          element:<SignUpForm/>
        }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
