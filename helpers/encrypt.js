const crypto = require('crypto');

function encryptText(plainText, salt) {
    
    const algorithm = 'aes-192-cbc';
    const key = crypto.scryptSync(process.env.PASSKEY, salt, 24);

    const iv = Buffer.alloc(16, 0); // Initialization vector.
    
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

module.exports = encryptText;