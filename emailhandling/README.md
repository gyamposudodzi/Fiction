# Email Handling Tool

This tool allows you to send emails using Node.js.

## Setup
1.  Open the `.env` file in this folder.
2.  Add your email credentials:
    ```env
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_app_password
    ```
    *(Note: If using Gmail, you must enable 2FA and generate an App Password. Do not use your login password.)*


## Usage
1.  **Bulk Sending**:
    -   Add email addresses to `recipients.txt` (one per line).
    -   Run: `node sender.js`
    -   It will send the email to everyone in the list.

2.  **Single Email**:
    -   Run: `node sender.js recipient@example.com`

## Integration
You can require this module in other scripts:
```javascript
const sendEmail = require('./sender');
sendEmail('user@example.com', 'Subject', 'Body text');
```
