import { FC, useEffect } from "react";

import NcModal from "../NcModal/NcModal";
import { ConnectMassaWallet, useAccountStore } from "@massalabs/react-ui-kit";
import useAccountSync from "../../hooks/useAccountSync";

export interface ProblemPlan {
  name: string;
  label: string;
}

export interface ModalReportItemProps {
  show: boolean;
  onCloseModalConnectWallet: () => void;
}

const ModalConnectWallet: FC<ModalReportItemProps> = ({
  show,
  onCloseModalConnectWallet,
}) => {
  const { connectedAccount } = useAccountStore();
  useAccountSync(); // This will handle the wallet persistence

  const renderContent = () => {
    return (
      <>
        <div
          id="modal-description"
          className="text-gray-600 mb-6 overflow-visible"
        >
          {!connectedAccount && (
            <p className="mb-4">
              Choose your preferred wallet to connect to the platform:
            </p>
          )}
          <div className="theme-light">
            <ConnectMassaWallet />
          </div>
        </div>
      </>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalConnectWallet}
      contentExtraClass="max-w-screen-sm"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle="Connect Wallet"
    />
  );
};

export default ModalConnectWallet;
