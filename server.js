// server.js
const app = require('./app'); // Import the app configuration
const PORT = process.env.PORT || 3000; // Use the environment port if available

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
