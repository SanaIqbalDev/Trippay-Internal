import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Button, Checkbox, Image, Col, Row } from "antd";
import TrippayLogo from "../../assets/images/trippay-logo.svg";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { GoogleIconComponent } from "../../components/GoogleIconComponent";
import AuthenticationCodeForm from "../../components/AuthenticationCodeForm";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Please enter your password"),
  remember: z.boolean(),
});

type LoginFormInputs = z.infer<typeof schema>;

const LoginForm: React.FC = () => {
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [authCodeVal, setAuthCodeVal] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
    setShowCodeInput(true);
  };
  return (
    <>
      {showCodeInput ? (
        <AuthenticationCodeForm getCode={setAuthCodeVal} phone={""} />
      ) : (
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
                    <Input.Password
                      {...field}
                      placeholder="Enter your password"
                    />
                  )}
                />
              </Form.Item>
              <Form.Item
                className="formItem font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                <Row className="w-full flex justify-between">
                  <Col>
                    <Controller
                      name="remember"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <Checkbox {...field}>Remember me</Checkbox>
                      )}
                    />
                  </Col>
                  <Col>
                    <Link to={"/forgetpassword"}>
                      <label
                        className="forget-password"
                      >
                        Forget Password
                      </label>
                    </Link>
                  </Col>
                </Row>
              </Form.Item>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <Form.Item className="formItem">
                  {/* <Link to={`otp`}> */}
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="submitButton"
                  >
                    Sign in
                  </Button>
                  {/* </Link> */}
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
              <Link to={"/signup"}> Sign Up</Link>
            </span>
          </span>
        </div>
      )}
    </>
  );
};

export default LoginForm;
