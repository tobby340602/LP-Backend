const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
 const { username, amount } = req.body;
 try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.totalSpent += amount;
    await user.save();
    res.status(200).json({ success: true, message: 'Spent added successfully' });
 } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding spent' });
 }
});

module.exports = router;
