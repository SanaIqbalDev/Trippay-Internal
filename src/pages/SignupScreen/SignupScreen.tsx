import { z } from "zod";
import PhoneInputImage from "../../assets/images/mobile-illustration-I.svg";
import PhoneInputImage_ from "../../assets/images/mobile-illustration-II.svg";
import React, { useEffect, useState } from "react";
import AuthenticationCodeForm from "../../components/AuthenticationCodeForm";
import SiderComponent from "../../components/SiderComponent";
import PhoneInputForm from "./PhoneInputForm";
import CompleteAccount from "./CompleteAccount";
import OnboardingSider from "../../components/OnboardingSider";
import SignUpForm from "./SignUpForm";

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

const SignUpScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState("signup");
  const [userPhone, setUserPhone] = useState("");
  const [submittedData, setSubmittedData] = useState<SignupFormInputs>();
  const [emailAuthCode, setEmailAuthCode] = useState("");
  const [phoneAuthCode, setPhoneAuthCode] = useState("");

  useEffect(() => {
    if (currentStep == "signup" && submittedData) {
      setCurrentStep("emailAuth");
    } else if (currentStep == "emailAuth" && emailAuthCode.length == 5) {
      setCurrentStep("PhoneInput");
    } else if (currentStep == "PhoneInput" && userPhone.length > 0) {
      setCurrentStep("phoneAuth");
    } else if (currentStep == "phoneAuth" && phoneAuthCode.length == 5) {
      setCurrentStep("completionStep");
    }
  }, [currentStep, emailAuthCode, phoneAuthCode, userPhone, submittedData]);

  switch (currentStep) {
    case "signup":
      return <SignUpForm formData={setSubmittedData} />;

    case "emailAuth":
      return (
        <div className="login-container">
          <AuthenticationCodeForm
            data={submittedData?.email}
            isPhone={false}
            getCode={setEmailAuthCode}
          />
          <SiderComponent />
        </div>
      );

    case "PhoneInput":
      return (
        <div className="login-container">
          <PhoneInputForm inputType="phone" getContactData={setUserPhone} />
          <OnboardingSider siderImage={PhoneInputImage} />
        </div>
      );

    case "phoneAuth":
      return (
        <div className="login-container">
          <AuthenticationCodeForm
            data={userPhone}
            isPhone={true}
            getCode={setPhoneAuthCode}
          />

          <OnboardingSider siderImage={PhoneInputImage_} />
        </div>
      );
    case "completionStep":
      return <CompleteAccount />;
  }
};

export default SignUpScreen;
