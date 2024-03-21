import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SplashScreen from "../pages/SplashScreen";
import LoginScreen from "../pages/LoginScreen/LoginScreen";
import LoginForm from "../pages/LoginScreen/LoginForm";
import SignupScreen from "../pages/SignupScreen/SignupScreen";
import SignUpForm from "../pages/SignupScreen/SignUpForm";
import ForgetPasswordScreen from "../pages/ForgetPassword/ForgetPasswordScreen";
import Home from "../pages/Dashboard/Home";
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
        }
      ],
    },
    {
      path: "/forgetpassword",
      element: <ForgetPasswordScreen />,
    },
    {
      path: "/signup",
      element: <SignupScreen />,
      children: [
        {
          index: true,
          element: <SignUpForm />,
        }
        // {
        //   path: "phone",
        //   element: <PhoneInputForm />,
        // },
      ],
    },
    {
      path:"/home",
      element:<Home/>,
    }
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
