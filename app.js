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
    const { firstName, lastName, mobile, email, password, city, state,street,country,address,loginId} = req.body;

     // Validate loginId: Must be a combination of letters and numbers, or only letters
     const loginIdRegex =  /^(?=.*[A-Za-z])[A-Za-z0-9]{5,10}$/;
     if (!loginIdRegex.test(loginId)) {
         return res.status(400).json({ message: 'Login ID must be 5 to 12 characters long and contain at least one letter. It cannot be only numbers.' });
     }
 
     // Validate password: Length between 7 and 12, and allow only letters, numbers, and the '@' character
     const passwordRegex = /^[A-Za-z0-9@]{7,12}$/;
     if (!passwordRegex.test(password)) {
         return res.status(400).json({ message: 'Password must be between 7 and 12 characters, containing only letters, numbers, and the @ symbol.' });
     }
 
     // Check if email has already been registered
     const emailExists = users.some(user => user.email === email);
     if (emailExists) {
         return res.status(400).json({ message: 'Email is already registered. Please use another email.' });
     }

    // Name and city/state validation: only alphabets allowed
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName) || !nameRegex.test(city) || !nameRegex.test(country) || !nameRegex.test(street) || !nameRegex.test(state)) {
        return res.status(400).json({ message: 'Name, City, street,country and State must contain only letters and spaces.' });
    }

    // Mobile number validation: exactly 10 digits
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
        return res.status(400).json({ message: 'Invalid mobile number. It must be exactly 10 digits.' });
    }

     // Login ID validation: allow letters and numbers only
     if (!/^[a-zA-Z0-9]+$/.test(loginId)) {
        alert('Login ID must be 5 to 12 characters long and contain at least one letter. It cannot be only numbers.');
        return; // Stop form submission if validation fails
    }

    

    // Email validation: valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // If all validations pass, add the user to the users array
    users.push({ firstName, lastName, mobile, email, address,street,country,loginId, password, city, state });

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
