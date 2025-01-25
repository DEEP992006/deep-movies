import { useState, useEffect } from 'react';

export default function About() {
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    // Retrieve email from localStorage when the component mounts
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const saveEmail = () => {
    // Save the email to localStorage
    localStorage.setItem('email', newEmail);
    setEmail(newEmail);
  };

  return (
    <div className="text-center p-4">
      <h1 className="text-2xl">Current Email: {email || 'No email set'}</h1>

      <input
        type="email"
        value={newEmail}
        onChange={handleEmailChange}
        placeholder="Enter new email"
        className="mt-4 p-2 border border-gray-300 rounded"
      />

      <button
        onClick={saveEmail}
        className="bg-blue-500 text-white px-4 py-2 m-2 rounded"
      >
        Save Email
      </button>
    </div>
  );
}
