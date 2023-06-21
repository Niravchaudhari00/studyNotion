export const resetPasswordTemplate = (url) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Reset Password</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
            .reset-password{
                text-decoration: none;
                color: #0352fc;
                font-size: 1.1rem;
                transition: all 0.9s ease;
            }
            .reset-password:hover{
                color: #fc2003;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="https://studynotion-edtech-project.vercel.app"><img class="logo"
                    src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo"></a>
            <div class="message">Passsword Reset</div>
            <div class="body">
                <p>If you've lost your password or wish to reset it, </br> use the link below to get started.</p>
                <a href=${url} class="reset-password">Click here to reset password</a>
                <p>If you did not request a password reset. you can safely ignore this email. Only a person with access to your email can reset your account password.</p>
            </div>
            <div class="support">If you have any questions or need further assistance, please feel free to reach out to us
                at
                <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!
            </div>
        </div>
    </body>

    </html>`;
};
