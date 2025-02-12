const mailContact = (name, email, contact, message) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>New User Registration</title>
        <style>
            body {
                background-color: #f9fafb;
                font-family: 'Helvetica Neue', Arial, sans-serif;
                font-size: 16px;
                color: #333;
                margin: 0;
                padding: 0;
            }
  
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
            }
  
            .logo {
                max-width: 180px;
                margin-bottom: 30px;
            }
  
            .message {
                font-size: 26px;
                font-weight: 700;
                margin-bottom: 20px;
                color: #2c3e50;
            }
  
            .body {
                font-size: 18px;
                margin-bottom: 30px;
                text-align: left;
                color: #555;
                line-height: 1.6;
            }
  
            .info {
                margin-bottom: 20px;
            }
  
            .info p {
                margin: 8px 0;
            }
  
            .highlight {
                font-weight: 600;
                color: #e67e22;
            }
  
            .cta {
                display: inline-block;
                padding: 12px 24px;
                background-color: #3498db;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: 600;
                margin-top: 20px;
            }
  
            .cta:hover {
                background-color: #2980b9;
            }
  
            .support {
                font-size: 14px;
                color: #999;
                margin-top: 30px;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="http://localhost:3000">
                <img class="logo" src=https://api.dicebear.com/5.x/initials/svg?seed=${name} alt="VR Here">
            </a>
            <div class="message">New Contact Info</div>
            <div class="body">
                <p>Dear <span class="highlight">Admin</span>,</p>
                <div class="info">
                    <p>A new user has contact with the following details:</p>
                    <p><span class="highlight">Name:</span> ${name}</p>
                    <p><span class="highlight">Email:</span> ${email}</p>
                    <p><span class="highlight">Contact Number:</span> ${contact}</p>
                    <p><span class="highlight">Contact Number:</span> ${message}</p>
                </div>
            </div>
            <a href="http://localhost:3000/admin" class="cta">View Details</a>
            <div class="support">
                <p>If you have any questions, feel free to reach out to our support team.</p>
            </div>
        </div>
    </body>
    
    </html>`;
}

module.exports = { mailContact };
