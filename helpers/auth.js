const bcrypt = require('bcrypt');

// Function to hash a password
exports.hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        // Generate a salt with a cost factor of 12
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            } else {
                // Hash the password using the generated salt
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        reject(err);
                    } else {
                        // Return the hashed password
                        resolve(hash);
                    }
                });
            }
        });
    });
};

// Function to compare a password with a hashed password
exports.comparePassword = (password, hashed) => {
    return new Promise((resolve, reject) => {
        // Compare the password with the hashed password
        bcrypt.compare(password, hashed, (err, isMatch) => {
            if (err) {
                reject(err);
            } else {
                // Return whether the password matches or not
                resolve(isMatch);
            }
        });
    });
};
