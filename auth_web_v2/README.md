# 👑 THREE-LEVEL AUTHENTICATION LUXURY WEB APP

### 🔐 Secure • Elegant • Modern Multi-Factor Authentication System

---

> A premium Flask-based authentication web application that combines  
> **Image Authentication + Pattern Lock + PIN Verification**  
> into one secure and luxury-themed login experience.

---

# 🌟 PROJECT OVERVIEW

This project is a modern conversion of a Tkinter authentication system into a stylish Flask web application inspired by luxury shopping websites.

The system uses **three authentication layers** to improve security while maintaining a visually premium user experience.

---

# ✨ CORE FEATURES

## 🖼️ IMAGE-BASED AUTHENTICATION
Users choose a secret image from a 3×3 image grid.

---

## ✏️ PATTERN LOCK AUTHENTICATION
Interactive pattern drawing system similar to mobile lock screens.

---

## 🔢 PIN AUTHENTICATION
Secure 4-digit PIN verification with SHA-256 hashing.

---

## 🎨 LUXURY UI DESIGN
- Premium aesthetic interface
- Smooth animations
- Modern layout
- Responsive design
- Glassmorphism-inspired styling

---

## 🛡️ SECURITY FEATURES
- SHA-256 PIN hashing
- Multi-factor verification
- SQLite database integration
- Duplicate user prevention
- Session-based authentication flow

---

# 🧠 AUTHENTICATION FLOW

```text
REGISTER / LOGIN
        ↓
SELECT SECRET IMAGE
        ↓
DRAW SECRET PATTERN
        ↓
ENTER 4-DIGIT PIN
        ↓
AUTHENTICATION SUCCESS

 🏗️ PROJECT STRUCTURE

auth_web/
│
├── app.py
│   └── Flask backend
│
├── auth.db
│   └── SQLite database
│
├── requirements.txt
│
├── templates/
│   └── index.html
│
├── static/
│   │
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   └── main.js
│   │
│   └── images/
│       ├── img1.png
│       ├── img2.png
│       └── ...
│
└── README.md

🚀 INSTALLATION & SETUP

1️⃣ CLONE THE REPOSITORY

git clone https://github.com/yourusername/Three-Level-Authentication-Luxury-Web-App.git

2️⃣ OPEN PROJECT DIRECTORY

pip install -r requirements.txt

4️⃣ ADD IMAGE FILES

Place all images inside:
static/images/
img1.png
img2.png
img3.png
...
img9.png

5️⃣ RUN THE APPLICATION

python app.py

6️⃣ OPEN IN BROWSER

http://localhost:5000

👨‍💻 AUTHOR

Developed as a secure and visually premium authentication system project using Flask.

 📜 LICENSE

This project is open-source and intended for educational purposes.
