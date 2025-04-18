import { useSelector } from 'react-redux';

const useAuth = () => {
  const { user } = useSelector((state) => state.auth); // Access user state from Redux store
  return !!user; // Return true if the user is logged in, otherwise false
};

export default useAuth;
