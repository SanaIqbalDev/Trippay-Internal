import { useState } from "react";
import PhoneInputForm from "../SignupScreen/PhoneInputForm";
import ChooseOption from "./ChooseOption";

const ForgetPasswordScreen = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  switch (selectedOption) {
    case "":
      return <ChooseOption selectedOption={setSelectedOption} />;
    case "phone":
      return (
        <PhoneInputForm inputType="phone" codeVerified={setIsCodeVerified} />
      );
    case "email":
      return (
        <PhoneInputForm inputType="email" codeVerified={setIsCodeVerified} />
      );
  }
};

export default ForgetPasswordScreen;
