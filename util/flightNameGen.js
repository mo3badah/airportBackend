let prefix = Math.floor(Math.random() * 100) + 1; // Generate a random prefix between 1 and 100
let suffix = Math.random().toString(36).substring(3, 6).toUpperCase(); // Generate a random alphanumeric suffix
let flight_number = `${prefix}${suffix}`;
module.exports = flight_number;
// to generate a random string from time stamp to ensure unique flight number
// const timestamp = Date.now(); // Get current timestamp
// const codePoints = String(timestamp).split('').map(digit => 65 + parseInt(digit)); // Convert timestamp to code points
// const suffix = String.fromCharCode(...codePoints); // Create string from code points