import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';
import { useAccountStore } from "@massalabs/react-ui-kit";
import { toast } from 'react-toastify';
import useAccountSync from '../hooks/useAccountSync';

interface RequireProfileProps {
  children: React.ReactNode;
}

const RequireProfile: React.FC<RequireProfileProps> = ({ children }) => {
  const navigate = useNavigate();
  const { connectedAccount } = useAccountStore();
  const userProfile = useAppSelector((state) => state.user.user);
  const [isInitialized, setIsInitialized] = useState(false);
  useAccountSync(); // Add this to ensure wallet sync

  useEffect(() => {
    // Wait for a short delay to allow wallet reconnection
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isInitialized) return; // Don't check until initialized

    if (!connectedAccount) {
      toast.warning('Please connect your wallet first');
      navigate('/');
      return;
    }

    if (!userProfile?.firstName) {
      toast.info('Please create your profile first');
      navigate('/dashboard/edit-profile');
    }
  }, [connectedAccount, userProfile, navigate, isInitialized]);

  if (!isInitialized || !connectedAccount || !userProfile?.firstName) {
    return null;
  }

  return <>{children}</>;
};

export default RequireProfile;