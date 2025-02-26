import MassaLogo from "../../images/massa.jpg";
import { Link } from "react-router-dom";

const Logo = ({}) => {
  return (
    <Link
      to="/"
      className="ttnc-logo inline-block text-primary-6000 flex-shrink-0"
    >
      <img
        src={MassaLogo}
        alt="logo"
        width={50}
        height={50}
        style={{ borderRadius: "50%" }}
      />
      {/* <LogoSvg /> */}
    </Link>
  );
};

export default Logo;
