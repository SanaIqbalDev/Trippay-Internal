import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Button, Checkbox, Image } from "antd";
import TrippayLogo from "../../assets/images/trippay-logo.svg";
import React from "react";
import { Link } from "react-router-dom";

// Step 3: Define Zod schema
const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Enter a valid email" }),
  agencyName: z.string().min(1, { message: "Agency Name is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the User Agreement and Privacy Policy",
  }),
});

// Define the form's input shape using the schema
type SignupFormInputs = z.infer<typeof schema>;

const SignUpForm: React.FC = () => {
  // Step 4: Setup useForm with Zod resolver
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
    console.log(data);
  };
  return (
    <div className="form-container">
      <div className="form-header">
        <Image src={TrippayLogo} preview={false} />
        <span className="main-heading">Create your account</span>
        <span className="sub-heading">
          Let’s get started with a free account.
        </span>
      </div>

      <div className="form-content">
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          {/* Step 5: Create the UI using Ant Design components */}
          <Form.Item
            label="Name*"
            validateStatus={errors.name ? "error" : ""}
            help={errors.name?.message}
          >
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} placeholder="Enter your name" />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Email*"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter your email" />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Agency Name*"
            validateStatus={errors.agencyName ? "error" : ""}
            help={errors.agencyName?.message}
          >
            <Controller
              name="agencyName"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Agency Name" />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Password*"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <Input {...field} placeholder="Create a password" />
                  <span className="sub-heading" style={{fontSize:"14px"}}>Must be at least 8 characters.</span>
                </div>
              )}
            />
          </Form.Item>

          <Form.Item>
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <Checkbox {...field} checked={field.value}>
                  I certify that I’m 18 years of age or older, and I agree to
                  the <span className="highlighted-text"> User Agreement</span>{" "}
                  and <span className="highlighted-text">Privacy Policy.</span>
                </Checkbox>
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
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

export default SignUpForm;
