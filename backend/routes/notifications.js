const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, message, type } = req.body;
    const newNotification = new Notification({ title, message, type });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: 'Error creating notification' });
  }
});

router.patch('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Error marking notification as read' });
  }
});

router.patch('/mark-all-read', async (req, res) => {
  try {
    await Notification.updateMany({}, { read: true });
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Error marking all as read' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting notification' });
  }
});

module.exports = router;