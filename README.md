🚀 Three-Level Authentication Luxury Web App

A premium multi-factor authentication system built with Flask, featuring a luxury shopping-inspired UI and secure three-step verification.

🌟 Overview

This project is a modern web adaptation of a traditional Tkinter authentication system.
The application combines:

🖼️ Image-Based Authentication
✏️ Pattern Lock Verification
🔐 PIN Authentication

into one elegant and secure authentication flow.

Designed with a luxury e-commerce aesthetic, the interface focuses on both security and premium user experience.

✨ Features
🔒 Three-Level Authentication

Users must successfully complete:

Image Selection Authentication
Pattern Lock Authentication
4-Digit PIN Verification
🎨 Luxury UI Design
Premium shopping website inspired interface
Smooth animations and transitions
Responsive layout
Modern typography and glassmorphism effects
🛡️ Security Features
SHA-256 hashed PIN storage
SQLite database integration
Multi-factor verification
Duplicate account prevention
Secure session-based authentication flow
🧠 Authentication Flow
User Registration/Login
        ↓
Select Secret Image
        ↓
Draw Secret Pattern
        ↓
Enter Secure PIN
        ↓
Authentication Success
🏗️ Project Structure
auth_web/
│
├── app.py
│   └── Flask backend with authentication logic
│
├── auth.db
│   └── SQLite database (auto-created)
│
├── requirements.txt
│
├── templates/
│   └── index.html
│       └── Main frontend page
│
├── static/
│   │
│   ├── css/
│   │   └── style.css
│   │       └── Luxury UI styling
│   │
│   ├── js/
│   │   └── main.js
│   │       └── Authentication flow & pattern logic
│   │
│   └── images/
│       └── img1.png → img9.png
│
└── README.md
⚙️ Technologies Used
Technology	Purpose
Python	Backend Logic
Flask	Web Framework
SQLite	Database
HTML5	Structure
CSS3	Styling
JavaScript	Frontend Logic
SHA-256	PIN Hashing
📸 Authentication Components
🖼️ Image Authentication

Users select a secret image from a 3×3 grid.

✏️ Pattern Lock

Interactive canvas-based pattern drawing similar to mobile lock systems.

🔢 PIN Verification

Secure 4-digit PIN verification using SHA-256 hashing.

🚀 Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/yourusername/Three-Level-Authentication-Luxury-Web-App.git
2️⃣ Navigate to Project Folder
cd Three-Level-Authentication-Luxury-Web-App
3️⃣ Install Dependencies
pip install -r requirements.txt
4️⃣ Add Images

Place these files inside:

static/images/

Required image names:

img1.png
img2.png
...
img9.png
5️⃣ Run Application
python app.py
6️⃣ Open in Browser
http://localhost:5000
🗄️ Database Schema

The application preserves the original Tkinter database structure:

Field	Description
name	Username
image	Selected image
pattern	Drawn pattern
pin	SHA-256 hashed PIN
✅ Preserved Features from Original Tkinter App
✅ Same authentication logic
✅ Same database schema
✅ Same pattern system
✅ Same image selection system
✅ Same PIN verification
✅ Same registration/login workflow
💡 Future Enhancements
🌐 Deploy on cloud hosting
📱 Mobile responsiveness improvements
👤 Profile system
📧 Email verification
🔐 OTP authentication
🌙 Dark/Light themes
📊 Login analytics dashboard
🎯 Learning Outcomes

This project demonstrates practical implementation of:

Multi-Factor Authentication (MFA)
Flask Web Development
Frontend-Backend Integration
Session Management
Database Handling
Secure Hashing Techniques
Interactive Canvas Programming
👨‍💻 Author

Developed as a secure authentication system project with a modern luxury web interface.

📜 License

This project is open-source and available for educational purposes.

⭐ Support

If you found this project useful:

⭐ Star the repository
🍴 Fork the project
🚀 Contribute improvements
🔥 Final Preview

“Security meets luxury experience.”
A stylish three-factor authentication system built for modern web applications.
