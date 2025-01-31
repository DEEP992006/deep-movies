import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const NotificationsForm = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "DEEP") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/notifications", {
        title,
        message,
        type,
      });
      setSuccess("Notification sent successfully!");
      setTitle("");
      setMessage("");
      setType("info");
      setError("");
    } catch (error) {
      setError("Failed to send notification. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
      {!isAuthenticated ? (
        <motion.form
          onSubmit={handlePasswordSubmit}
          className="bg-gray-800 p-8 rounded-lg shadow-2xl w-96"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Enter Password</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <input
            type="password"
            className="w-full p-3 mb-6 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Submit
          </button>
        </motion.form>
      ) : (
        <motion.form
          onSubmit={handleNotificationSubmit}
          className="bg-gray-800 p-8 rounded-lg shadow-2xl w-96"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Send Notification</h2>
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <input
            type="text"
            className="w-full p-3 mb-6 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full p-3 mb-6 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <select
            className="w-full p-3 mb-6 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Send Notification
          </button>
        </motion.form>
      )}
    </div>
  );
};

export default NotificationsForm;