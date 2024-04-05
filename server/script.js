const fs = require('fs');

fs.readFile('users.json', 'utf8', (err, data) => {
 if (err) {
    console.error('Error reading file:', err);
    return;
 }

 // Parse the JSON data
 const users = JSON.parse(data);

 // Proceed to upload the data to MongoDB
 uploadUsersToMongoDB(users);
});

const mongoose = require('mongoose');
const User = require('./models/UserModel'); // Assuming you have a User model defined

async function uploadUsersToMongoDB(users) {
 try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://vinayaknawdhar003:AnrSpfHKRXxiVitQ@assignment.4sicczb.mongodb.net/?retryWrites=true&w=majority&appName=assignment');

    // Use the User model to save each user
    for (const user of users) {
      const newUser = new User(user);
      await newUser.save();
      console.log(`User ${user.first_name} ${user.last_name} uploaded successfully.`);
    }

    console.log('All users uploaded successfully.');
 } catch (error) {
    console.error('Error uploading users:', error);
 } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
 }
}