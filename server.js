const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'manishimwecabudensie@gmail.com', 
            pass: 'already-tested-password' 
        }
    });
    const mailOptions = {
        from: 'manishimwecabudensie@gmail.com',
        to: email,
        subject: 'Confirmation Email',
        text: `Dear ${name},\n\nThank you for your message. We will get back to you soon.\n\nBest regards,\nThe Torsports Team`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'An error occurred while sending the email.' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully.' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
