import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select, Form, Image, Button, Space } from "antd";
import { Controller, useForm } from "react-hook-form";
import ShieldIcon from "../../assets/icons/ic-shield.svg";
import { z } from "zod";

const schemaPhone = z.object({
  countryCode: z.string().min(1, "Country code is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Phone number must be numeric"),
});

const schemaEmail = z.object({
  email: z.string().email("Invalid email"),
});

type FormValuesPhone = z.infer<typeof schemaPhone>;
type FormValuesEmail = z.infer<typeof schemaEmail>;

const { Option } = Select;
interface PhoneInputFormProps {
  inputType: "phone" | "email";
  getContactData: (value: string) => void;
}

const PhoneInputForm: React.FC<PhoneInputFormProps> = ({
  inputType,
  getContactData,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(
    inputType === "phone"
      ? {
          resolver: zodResolver(schemaPhone),
        }
      : {
          resolver: zodResolver(schemaEmail),
        }
  );

  const countries = [
    { code: "+966", name: "KSA" },
    { code: "+973", name: "BHR" },
    { code: "+964", name: "IRQ" },
    { code: "+965", name: "KWT" },
    { code: "+968", name: "OMN" },
    { code: "+974", name: "QAT" },
    { code: "+971", name: "UAE" },
  ];

  const onSubmitPhone = (data: FormValuesPhone) => {
    console.log("Phone is:", data);
    getContactData(data.countryCode + data.phoneNumber);
  };

  const onSubmitEmail = (data: FormValuesEmail) => {
    console.log("Email is:", data);
    getContactData(data.email);
  };

  return (
    <div className="form-container">
      <Image src={ShieldIcon} preview={false} />
      <div className="form-header">
        <span className="main-heading">Almost Done!</span>
        <span className="sub-heading">
          Enter your {inputType}, we will send a verification code
        </span>
      </div>
      <div className="form-content">
        <Form
          layout="vertical"
          onFinish={
            inputType === "phone"
              ? handleSubmit(onSubmitPhone)
              : handleSubmit(onSubmitEmail)
          }
        >
          {inputType === "phone" ? (
            <>
              <Form.Item
                label="Phone number*"
                validateStatus={errors.phoneNumber ? "error" : ""}
                help={errors.phoneNumber?.message}
              >
                <Space.Compact className="w-full">
                  <Controller
                    name="countryCode"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        style={{ width: "35%" }}
                        placeholder="code"
                        defaultActiveFirstOption={true}
                      >
                        {countries.map((country) => (
                          <Option
                            key={country.code}
                            value={country.code}
                          >{`${country.name} ${country.code}`}</Option>
                        ))}
                      </Select>
                    )}
                  />
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <Input
                        style={{ width: "65%" }}
                        {...field}
                        placeholder="Phone number"
                      />
                    )}
                  />
                </Space.Compact>
                <span className="hidden py-2" style={{ color: "#ff4d4f" }}>
                  Phone already registered
                </span>
              </Form.Item>
            </>
          ) : (
            // Render email input field
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
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="submitButton"
            >
              Continue
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PhoneInputForm;
