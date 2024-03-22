import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Button, Checkbox, Image } from "antd";
import TrippayLogo from "../../assets/images/trippay-logo.svg";
import { Link } from "react-router-dom";
import { GoogleIconComponent } from "../../components/GoogleIconComponent";
import SiderComponent from "../../components/SiderComponent";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Enter a valid email" }),
  agencyName: z.string().min(1, { message: "Agency Name is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  terms: z.boolean().refine((val) => val, {
    message: "You must accept the User Agreement and Privacy Policy",
  }),
});

type SignupFormInputs = z.infer<typeof schema>;

interface SignupFormProps {
  formData: (values:SignupFormInputs) => void; 
}
const SignUpForm: React.FC<SignupFormProps>= ({formData}) => {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
    formData(data);
  };

  return (
    <div className="login-container">
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
                    <span
                      className="sub-heading"
                      style={{ fontSize: "14px", textAlign: "start" }}
                    >
                      Must be at least 8 characters.
                    </span>
                  </div>
                )}
              />
            </Form.Item>

            <Form.Item
              validateStatus={errors.terms ? "error" : ""}
              help={errors.terms?.message}
            >
              <Controller
                name="terms"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Checkbox {...field} checked={field.value}>
                    I certify that I’m 18 years of age or older, and I agree to
                    the{" "}
                    <span className="highlighted-text"> User Agreement</span>{" "}
                    and{" "}
                    <span className="highlighted-text">Privacy Policy.</span>
                  </Checkbox>
                )}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="submitButton"
              >
                Sign up
              </Button>
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
          </Form>
        </div>
        <span style={{ color: "#475467" }}>
          Already have an account?
          <span
            style={{
              color: "#6941C6",
              fontSize: "14px",
              fontWeight: "600",
              marginLeft: "5px",
            }}
          >
            <Link to={"/login"}>Sign In</Link>
          </span>
        </span>
      </div>
      <SiderComponent />
    </div>
  );
};

export default SignUpForm;
