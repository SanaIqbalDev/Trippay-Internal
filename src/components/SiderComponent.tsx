import DotsImage from "../assets/images/img-dots.svg";
import SupportText from "../assets/images/login-support-text.svg";
import AppStoreButton from "../assets/images/btn-app-store.svg";
import GooglePlayButton from "../assets/images/btn-google-play.svg";
import AppGalleryButton from "../assets/images/btn-app-gallery.svg";
import { Image } from "antd";

const SiderComponent = () => {
  return (
    <div className="login-image">
      <div>
        <div>
          <Image src={DotsImage} preview={false} />
        </div>
        <div>
          <Image src={SupportText} preview={false} />
        </div>
        <div className="social-button-container">
          <Image src={AppStoreButton} preview={false} />
          <Image src={GooglePlayButton} preview={false} />
          <Image src={AppGalleryButton} preview={false} />
        </div>
      </div>
    </div>
  );
};

export default SiderComponent;
