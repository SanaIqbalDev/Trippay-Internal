import { Button, Image } from "antd";
import { PinInput } from "react-input-pin-code"; // ES Module

import ShieldIcon from "../assets/icons/ic-shield.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

interface AuthenticationFormProps {
  data: string;
  isPhone: boolean;
  getCode: (value: string) => void;
}

const OtpForm: React.FC<AuthenticationFormProps> = ({
  data,
  isPhone,
  getCode,
}) => {
  const [values, setValues] = useState(["", "", "", "", ""]);

  const codeCompleted = (data: string) => {
    console.log("data is ", data);
    getCode(data);
  };
  return (
    <div className="form-container">
      <Image src={ShieldIcon} preview={false} />
      <div className="form-header">
        <span className="main-heading">Authentication Code</span>
        <span className="sub-heading">
          {isPhone
            ? "Enter 5-digit code we just texted to your phone number, "
            : "Please enter the code we just sent to email, "}
          {data}
        </span>
      </div>
      <div className="form-content">
        <PinInput
          values={values}
          onChange={(value, index, values) => setValues(values)}
          mask={true}
          placeholder=""
          focusBorderColor="#7F56D9"
          validBorderColor="#EAECF0"
        />
        <span
          style={{
            color: "#0F172A",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          {isPhone
            ? "Use different phone number"
            : "Use different email address"}
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "12px",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={values.join("").length < 5}
            onClick={() => codeCompleted(values.join(""))}
            className="submitButton"
          >
            Continue
          </Button>

          <Button
            type="default"
            htmlType="submit"
            block
            style={{ color: "#98A2B3" }}
          >
            <Link to={""}>You can resend code in 55 s</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
