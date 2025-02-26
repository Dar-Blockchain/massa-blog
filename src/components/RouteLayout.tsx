import React, { ReactNode } from "react";
// import Footer from "@/components/Footer/Footer";
import Header2 from "./Header/Header2";
import "../styles/index.scss";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="bg-[#f8f8f8] text-base dark:bg-neutral-900/95 text-neutral-900 dark:text-neutral-200 font-poppins">
      <Header2 />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default RootLayout;
