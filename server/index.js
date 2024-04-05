const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
mongoose.connect('mongodb+srv://vinayaknawdhar003:AnrSpfHKRXxiVitQ@assignment.4sicczb.mongodb.net/?retryWrites=true&w=majority&appName=assignment');
app.get('/',(req,res)=>{
    res.json({message : "hii"});
})


const User = require('./models/UserModel');

// Create a new user
app.post('/api/users', async (req, res) => {
 const user = new User(req.body);
 try {
    await user.save();
    res.status(201).send(user);
 } catch (error) {
    res.status(400).send(error);
 }
});

// Get all users
app.get('/api/users', async (req, res) => {
 try {
    const users = await User.find({});
    res.send(users);
 } catch (error) {
    res.status(500).send(error);
 }
});

// Get a user by ID
app.get('/api/users/:id', async (req, res) => {
 try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send(user);
 } catch (error) {
    res.status(500).send(error);
 }
});

// Update a user
app.put('/api/users/:id', async (req, res) => {
 try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).send('User not found');
    res.send(user);
 } catch (error) {
    res.status(400).send(error);
 }
});

// Delete a user
app.delete('/api/users/:id', async (req, res) => {
 try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send(user);
 } catch (error) {
    res.status(500).send(error);
 }
});

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});