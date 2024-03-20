import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import ForgetPasswordBg from "../../assets/images/forget-password-img.svg";
import TrippayLogo from "../../assets/images/trippay-logo.svg";
import PasswordChangedLogo from "../../assets/images/password-changed-illustration.svg";
import { Button, Form, Image, Input } from "antd";
import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

type FormValues = z.infer<typeof schema>;

const AddNewPassword: React.FC = () => {
  const navigate = useNavigate();
  const [newPasswordUpdated, setNewPasswordUpdated] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    // Handle password update logic
    setNewPasswordUpdated(true);
  };

  const goToSignIn = () => {
    navigate(-1);
  }
  return (
    <div className="login-container">
      {newPasswordUpdated ? (
        <div className="form-container">
          <div className="form-header">
            <Image src={PasswordChangedLogo} preview={false} />
            <span className="main-heading">Password Changed</span>
            <span className="sub-heading">
              Password changed successfully, you can login again with the new
              password
            </span>
          </div>
          <div className="form-content">
            <Link to={"/login"}>
              <Button
                type="primary"
                block
                className="submitButton"
                onClick={() => goToSignIn()}
              >
                Back to Sign In
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="form-container">
          <div className="form-header">
            <Image src={TrippayLogo} preview={false} />
            <span className="main-heading">New Password</span>
            <span className="sub-heading">
              Create a new password that is safe and easy to remember
            </span>
          </div>
          <div className="form-content">
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
              <Form.Item
                label="New password"
                validateStatus={errors.newPassword && "error"}
                help={errors.newPassword?.message}
              >
                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field }) => <Input.Password {...field} />}
                />
              </Form.Item>

              <Form.Item
                label="Confirm new password"
                validateStatus={errors.confirmNewPassword && "error"}
                help={errors.confirmNewPassword?.message}
              >
                <Controller
                  name="confirmNewPassword"
                  control={control}
                  render={({ field }) => <Input.Password {...field} />}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="submitButton"
                >
                  Confirm new password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
      <div className="login-image">
        <Image src={ForgetPasswordBg} preview={false} />
      </div>
    </div>
  );
};

export default AddNewPassword;
