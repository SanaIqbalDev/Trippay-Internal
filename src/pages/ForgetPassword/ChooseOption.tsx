import { Button, Card, Col, Image, Row } from "antd";
import ForgetPasswordBg from "../../assets/images/forget-password-img.svg";
import TrippayLogo from "../../assets/images/trippay-logo.svg";
import EmailIcon from "../../assets/icons/ic-email.svg";
import MobileIcon from "../../assets/icons/ic-mobile.svg";
import NextIconInactive from "../../assets/icons/ic-right-inactive.svg";

interface ChooseOptionProps {
  selectedOption : (value:string) => void;
}
const ChooseOption : React.FC<ChooseOptionProps> = ({selectedOption}) => {
  return (
    <div className="login-container">
      <div className="form-container">
        <div className="form-header">
          <Image src={TrippayLogo} preview={false} />
          <span className="main-heading">Forget Password</span>
          <span className="sub-heading">
            Select verification method and we will send verification code
          </span>
        </div>
        <div className="form-content">
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Card
                className="default-card"
                onClick={() => selectedOption("email")}
              >
                <Row className="flex justify-between">
                  <Col className="flex gap-4">
                    <div className="w-12 h-12 icon-container">
                      <Image sizes="24" src={EmailIcon} preview={false} />
                    </div>
                    <div className="flex flex-col h-full justify-between py-1">
                      <span className="font-bold text-sm">Email</span>
                      <span className="text-xs font-normal">
                        With your email
                      </span>
                    </div>
                  </Col>
                  <Col className="align-middle my-auto">
                    <Image src={NextIconInactive} preview={false} />
                  </Col>
                </Row>
              </Card>
              <Card
                className="default-card"
                onClick={() => selectedOption("phone")}
              >
                <Row className="flex justify-between">
                  <Col className="flex gap-4">
                    <div className="w-12 h-12 icon-container">
                      <Image sizes="24" src={MobileIcon} preview={false} />
                    </div>
                    <div className="flex flex-col h-full justify-between py-1">
                      <span className="font-bold text-sm">Mobile Number</span>
                      <span className="text-xs font-normal">
                        with your mobile number
                      </span>
                    </div>
                  </Col>
                  <Col className="align-middle my-auto">
                    <Image src={NextIconInactive} preview={false} />
                  </Col>
                </Row>
              </Card>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="submitButton"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
      <div className="login-image">
        <Image src={ForgetPasswordBg} preview={false} />
      </div>
    </div>
  );
};

export default ChooseOption;
