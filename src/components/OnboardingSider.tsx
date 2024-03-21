import { Image } from "antd";


type OnboardingSiderProps = {
//   siderImage: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  siderImage: string;
};

const OnboardingSider:React.FC<OnboardingSiderProps> = ({ siderImage })=> {
  return (
    <div className="login-image">
        <Image
          src={siderImage}
          preview={false}
        />
      </div>
  );
}

export default OnboardingSider