import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const HomePage = () => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");

  // Retrieve email from localStorage on component mount
  useEffect(() => {
    if (!userEmail) {
      const cachedEmail = localStorage.getItem('email');
      if (cachedEmail) {
        setUserEmail(cachedEmail);
      }
    }
  }, [userEmail]);

  return (
    <div>
      <h1>Welcome to MovieMate</h1>
      <h2>Email: {userEmail || 'No Email Set'}</h2>
    </div>
  );
};

export default HomePage;
