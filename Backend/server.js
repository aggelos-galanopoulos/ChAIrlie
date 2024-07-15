require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const port = process.env.PORT || 3002;
const secretKey = process.env.SECRET_KEY;

app.use(express.json());

app.use(cors({
    origin: "*"
}));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const User = mongoose.model('User', {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Signup Endpoint
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(500).send('Error creating user');
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid password');
        }

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

// Chat Endpoint
app.post('/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        const chatCompletion = await openai.chat.completions.create({
            messages,
            model: 'gpt-3.5-turbo',
        });
        res.json(chatCompletion);
    } catch (error) {
        res.status(500).send('Error communicating with OpenAI API');
    }
});

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Hello world');
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Secret Key ${secretKey}`);
});