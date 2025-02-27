import { FC, useEffect, useState } from "react";
import SearchModal from "./SearchModal";
import Button from "../Button/Button";
import MenuBar from "../MenuBar/MenuBar";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import SwitchDarkMode from "../SwitchDarkMode/SwitchDarkMode";
import ModalConnectWallet from "../ModalConnectWallet/ModalConnectWallet";
import React from "react";
import { shortenAddress } from "../../utils/shortenAddress";
import { useAccountStore } from "@massalabs/react-ui-kit";
import AvatarDropdown from "./AvatarDropdown";

export interface MainNav1Props {}

const MainNav1: FC<MainNav1Props> = ({}) => {
  const { connectedAccount } = useAccountStore();
  const [selectedAccount, setSelectedAccount] = useState(
    connectedAccount?.address || ""
  );
  const [showModal, setShowModal] = React.useState(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    setSelectedAccount(connectedAccount?.address || "");
  }, [connectedAccount, connectedAccount?.address]);
  return (
    <div className="nc-MainNav1 relative z-10 bg-white dark:bg-slate-900 ">
      <ModalConnectWallet
        show={showModal}
        onCloseModalConnectWallet={closeModal}
      />
      <div className="container">
        <div className="h-20 py-5 flex justify-between items-center">
          <div className="flex items-center lg:hidden flex-1">
            <MenuBar />
          </div>

          <div className="flex justify-center lg:justify-start flex-1 items-center space-x-4 sm:space-x-10 2xl:space-x-14 rtl:space-x-reverse">
            <Logo />
            <Navigation className="hidden lg:flex" />
          </div>

          <div className="flex-1 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1 rtl:space-x-reverse">
            <div className="hidden items-center lg:flex">
              <SwitchDarkMode />
              <SearchModal />
              {connectedAccount && <AvatarDropdown />}
              <div className="px-1"></div>
              <Button
                sizeClass="py-3 px-4 sm:px-6"
                pattern="primary"
                onClick={() => setShowModal(true)}
              >
                {connectedAccount
                  ? shortenAddress(selectedAccount, 4)
                  : "Connect Wallet"}
              </Button>
            </div>
            <div className="flex items-center lg:hidden">
              <SwitchDarkMode />
              <SearchModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
