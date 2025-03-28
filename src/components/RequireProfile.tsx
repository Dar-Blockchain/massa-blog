import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';
import { useAccountStore } from "@massalabs/react-ui-kit";
import { toast } from 'react-toastify';

interface RequireProfileProps {
  children: React.ReactNode;
}

const RequireProfile: React.FC<RequireProfileProps> = ({ children }) => {
  const navigate = useNavigate();
  const { connectedAccount } = useAccountStore();
  const userProfile = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (!connectedAccount) {
      toast.warning('Please connect your wallet first');
      navigate('/');
      return;
    }

    if (!userProfile?.firstName) {
      toast.info('Please create your profile first');
      navigate('/dashboard/edit-profile');
    }
  }, [connectedAccount, userProfile, navigate]);

  if (!connectedAccount || !userProfile?.firstName) {
    return null;
  }

  return <>{children}</>;
};

export default RequireProfile;