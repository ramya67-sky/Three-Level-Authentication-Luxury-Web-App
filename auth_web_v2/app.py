from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import sqlite3
import hashlib
import os

app = Flask(__name__)
app.secret_key = "three_level_auth_secret_2024"

# ================= DATABASE =================
class Database:
    def __init__(self):
        self.db_path = "auth.db"
        self._init_db()

    def _init_db(self):
        conn = sqlite3.connect(self.db_path)
        cur = conn.cursor()
        cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            name TEXT PRIMARY KEY,
            image TEXT,
            pattern TEXT,
            pin TEXT
        )
        """)
        conn.commit()
        conn.close()

    def hash(self, text):
        return hashlib.sha256(text.encode()).hexdigest()

    def register(self, name, image, pattern, pin):
        conn = sqlite3.connect(self.db_path)
        cur = conn.cursor()
        cur.execute("SELECT * FROM users WHERE name=?", (name,))
        if cur.fetchone():
            conn.close()
            return False
        cur.execute("INSERT INTO users VALUES (?, ?, ?, ?)",
                    (name, str(image), str(pattern), self.hash(pin)))
        conn.commit()
        conn.close()
        return True

    def login(self, name, image, pattern, pin):
        conn = sqlite3.connect(self.db_path)
        cur = conn.cursor()
        cur.execute("SELECT * FROM users WHERE name=?", (name,))
        data = cur.fetchone()
        conn.close()
        if not data:
            return False
        return (data[1] == str(image) and
                data[2] == str(pattern) and
                data[3] == self.hash(pin))

db = Database()

# ================= ROUTES =================

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/set_mode", methods=["POST"])
def set_mode():
    data = request.json
    session["mode"] = data.get("mode")
    session["user"] = ""
    session["image"] = None
    session["pattern"] = []
    return jsonify({"ok": True})

@app.route("/api/set_name", methods=["POST"])
def set_name():
    data = request.json
    name = data.get("name", "").strip()
    if not name:
        return jsonify({"ok": False, "msg": "Enter a name"})
    session["user"] = name
    return jsonify({"ok": True})

@app.route("/api/set_image", methods=["POST"])
def set_image():
    data = request.json
    image = data.get("image")
    if image is None:
        return jsonify({"ok": False, "msg": "Select an image"})
    session["image"] = image
    return jsonify({"ok": True})

@app.route("/api/set_pattern", methods=["POST"])
def set_pattern():
    data = request.json
    pattern = data.get("pattern", [])
    if not pattern:
        return jsonify({"ok": False, "msg": "Draw a pattern"})
    session["pattern"] = pattern
    return jsonify({"ok": True})

@app.route("/api/submit_pin", methods=["POST"])
def submit_pin():
    data = request.json
    pin = data.get("pin", "")

    if len(pin) != 4 or not pin.isdigit():
        return jsonify({"ok": False, "msg": "Enter valid 4-digit PIN"})

    name = session.get("user")
    image = session.get("image")
    pattern = session.get("pattern")
    mode = session.get("mode")

    if mode == "register":
        success = db.register(name, image, pattern, pin)
        if success:
            return jsonify({"ok": True, "msg": "Registration Successful! ✅"})
        else:
            return jsonify({"ok": False, "msg": "User already exists ❌"})
    else:
        success = db.login(name, image, pattern, pin)
        if success:
            session["logged_in_user"] = name
            return jsonify({"ok": True, "msg": f"Welcome back, {name}! ✅", "redirect": "/dashboard"})
        else:
            return jsonify({"ok": False, "msg": "Login Failed ❌ — Wrong credentials"})

@app.route("/dashboard")
def dashboard():
    user = session.get("logged_in_user")
    if not user:
        return redirect(url_for("home"))
    return render_template("dashboard.html", username=user)

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("home"))

if __name__ == "__main__":
    app.run(debug=True)
