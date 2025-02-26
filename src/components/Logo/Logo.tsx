import React from "react";
import logoImg from "../../images/logo.png";
import logoLightImg from "../../images/logo-light.png";
import LogoSvg from "./LogoSvg";
import { Link } from "react-router-dom";

export interface LogoProps {
  img?: string;
  imgLight?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
}) => {
  return (
    <Link
      to="/"
      className="ttnc-logo inline-block text-primary-6000 flex-shrink-0"
    >
      {/* THIS USE FOR MY MULTI DEMO */}
      {/* IF YOU ARE MY CLIENT. PLESE DELETE THIS CODE AND YOU YOUR IMAGE PNG BY BELLOW CODE */}
      <LogoSvg />
    </Link>
  );
};

export default Logo;
