const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com', // Explicit host
    port: 465, // Explicit port
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: text
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return { success: true, info };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
};

const fs = require('fs');
const readline = require('readline');

// ... (transporter configuration remains same)

// If run directly (node sender.js), send to list in recipients.txt
if (require.main === module) {
    const recipientsFile = 'recipients.txt';

    if (fs.existsSync(recipientsFile)) {
        const fileStream = fs.createReadStream(recipientsFile);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        console.log(`Reading recipients from ${recipientsFile}...`);

        rl.on('line', async (line) => {
            const email = line.trim();
            // Skip empty lines or comments
            if (email && !email.startsWith('#')) {
                console.log(`Sending to: ${email}`);
                await sendEmail(email, 'Bank App Notification', 'This is a notification from the Bank App.');
                // Add a small delay to avoid rate limits? (Optional but good practice)
            }
        });
    } else {
        console.log('recipients.txt not found. Usage: node sender.js <recipient_email> OR create recipients.txt');
        // Fallback to single argument usage
        const recipient = process.argv[2];
        if (recipient) {
            sendEmail(recipient, 'Test Email', 'Single test email.');
        }
    }
}

module.exports = sendEmail;

