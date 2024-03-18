import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Button, Checkbox, Image } from "antd";
import TrippayLogo from "../../assets/images/trippay-logo.svg";
import React from "react";
import { Link } from "react-router-dom";

// Define your schema using Zod
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Please enter your password"),
  remember: z.boolean(),
});

// Infer the types from the schema
type LoginFormInputs = z.infer<typeof schema>;

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    // Handle form submission
    console.log(data);
  };
  return (
    <div className="form-container">
      <div className="form-header">
        <Image src={TrippayLogo} preview={false} />
        <span className="main-heading">Welcome back</span>
        <span className="sub-heading">
          Welcome back! Please enter your details.
        </span>
      </div>

      <div className="form-content">
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
            label={"Email"}
          >
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} placeholder="Enter your email" />
              )}
            />
          </Form.Item>
          <Form.Item
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
            label={"Password"}
          >
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input.Password {...field} placeholder="Enter your password" />
              )}
            />
          </Form.Item>
          <Form.Item className="formItem item-remember">
            <Controller
              name="remember"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox {...field}>Remember me</Checkbox>
              )}
            />
          </Form.Item>
          <div style={{ display:"flex", flexDirection:"column", gap:"16px"}}>
            <Form.Item className="formItem">
              <Link to={`otp`}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="submitButton"
                >
                  Sign in
                </Button>
              </Link>
            </Form.Item>
            <Form.Item className="formItem">
              <Button
                block
                icon={<GoogleIconComponent />}
                className="googleButton"
              >
                Sign in with Google
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <span style={{ color: "#475467" }}>
        Don't have an account?
        <span
          style={{
            color: "#6941C6",
            fontSize: "14px",
            fontWeight: "600",
            marginLeft: "5px",
          }}
        >
          Sign up
        </span>
      </span>
    </div>
  );
};

const GoogleIconComponent = () => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_713_2294)">
        <path
          d="M24.2663 12.7616C24.2663 11.9459 24.2001 11.1257 24.059 10.3232H12.7402V14.9442H19.222C18.953 16.4346 18.0888 17.753 16.8233 18.5907V21.5891H20.6903C22.9611 19.4991 24.2663 16.4125 24.2663 12.7616Z"
          fill="#4285F4"
        />
        <path
          d="M12.7401 24.4857C15.9766 24.4857 18.7059 23.423 20.6945 21.5888L16.8276 18.5904C15.7517 19.3224 14.3627 19.7368 12.7445 19.7368C9.61388 19.7368 6.95946 17.6248 6.00705 14.7852H2.0166V17.8761C4.05371 21.9283 8.2029 24.4857 12.7401 24.4857Z"
          fill="#34A853"
        />
        <path
          d="M6.00277 14.7861C5.50011 13.2957 5.50011 11.6819 6.00277 10.1915V7.10059H2.01674C0.314734 10.4914 0.314734 14.4862 2.01674 17.877L6.00277 14.7861Z"
          fill="#FBBC04"
        />
        <path
          d="M12.7401 5.23501C14.4509 5.20856 16.1044 5.85232 17.3434 7.03402L20.7695 3.60797C18.6001 1.57086 15.7208 0.450886 12.7401 0.48616C8.2029 0.48616 4.05371 3.04357 2.0166 7.10016L6.00264 10.1911C6.95064 7.34708 9.60947 5.23501 12.7401 5.23501Z"
          fill="#EA4335"
        />
      </g>
      <defs>
        <clipPath id="clip0_713_2294">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.5 0.485352)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LoginForm;
