const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse incoming form data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle form data

// Dummy data array to store registered users
let users = [];

// Route to serve the registration form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Serve the HTML file with the form
});

// Route to handle form submission
app.post('/register', (req, res) => {
    const { firstName, lastName, mobile, email, password, city, state } = req.body;

    // Name and city/state validation: only alphabets allowed
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName) || !nameRegex.test(city) || !nameRegex.test(state)) {
        return res.status(400).json({ message: 'Name, City, and State must contain only letters and spaces.' });
    }

    // Mobile number validation: exactly 10 digits
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
        return res.status(400).json({ message: 'Invalid mobile number. It must be exactly 10 digits.' });
    }

    // Password validation: no special characters allowed
    const passwordRegex = /^[a-zA-Z0-9@]+$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must not contain special characters.' });
    }

    // Email validation: valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // If all validations pass, add the user to the users array
    users.push({ firstName, lastName, mobile, email, password, city, state });

    res.send({ message: 'User registered successfully!' });
});

// Route to fetch all registered users
app.get('/fetch-users', (req, res) => {
    res.json(users);
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
