import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, setEmail } from '../src/store';

export default function New() {
  const { count, email } = useSelector((state) => state.user); // Access count and email
  const dispatch = useDispatch();

  const [newEmail, setNewEmail] = useState(email); // Local state for input field

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value); // Update local state
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    dispatch(setEmail(newEmail)); // Dispatch action to update Redux store
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl mb-4">Counter: {count}</h1>

      {/* Display Email */}
      <h2 className="text-center text-lg mb-4">
        Current Email: <span className="font-bold">{email || 'No Email Set'}</span>
      </h2>

      {/* Form to Update Email */}
      <form onSubmit={handleEmailSubmit} className="flex flex-col items-center space-y-4">
        <input
          type="email"
          value={newEmail}
          onChange={handleEmailChange}
          placeholder="Enter new email"
          className="border border-gray-300 p-2 rounded w-64"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Email
        </button>
      </form>

      {/* Counter Buttons */}
      <div className="text-center mt-8">
        <button
          onClick={() => dispatch(increment())}
          className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="bg-red-500 text-white px-4 py-2 m-2 rounded"
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
