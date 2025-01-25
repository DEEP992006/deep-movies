import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail } from './store'; // Import your Redux action

const Home = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);

  // Check localStorage on mount and update Redux state if necessary
  useEffect(() => {
    if (!email) {
      const cachedEmail = localStorage.getItem('email');
      if (cachedEmail) {
        dispatch(setEmail(cachedEmail));
      }
    }
  }, [email, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-200">
      <h1 className="text-2xl font-bold">Home</h1>
      <h2 className="text-xl">
        Email: {email || 'No Email Set'}
      </h2>
    </div>
  );
};

export default Home;
