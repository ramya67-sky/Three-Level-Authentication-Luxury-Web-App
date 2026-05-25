# Three-Level Authentication Web App

Converted from tkinter GUI to a Flask web app with a luxury shopping site aesthetic.

## Project Structure

```
auth_web/
├── app.py                  ← Flask backend (same DB logic as original)
├── auth.db                 ← Auto-created SQLite DB (same schema)
├── requirements.txt
├── templates/
│   └── index.html          ← Single-page app
├── static/
│   ├── css/style.css       ← Luxury aesthetic styles
│   ├── js/main.js          ← All auth flow + canvas logic
│   └── images/             ← Put your img1.png ... img9.png here ✅
```

## Setup

1. Copy your `images/` folder contents into `static/images/`
   - Files should be named: `img1.png`, `img2.png`, ... `img9.png`

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the app:
   ```bash
   python app.py
   ```

4. Open browser: `http://localhost:5000`

## What's Preserved from Original

- ✅ Same SQLite DB schema (name, image, pattern, pin)
- ✅ SHA-256 PIN hashing
- ✅ Image selection (9 images in 3x3 grid)
- ✅ Pattern drawing (9-dot canvas, same logic)
- ✅ 4-digit PIN entry
- ✅ Register / Login modes
- ✅ Duplicate user check on register
- ✅ All 3 factors must match on login

## Notes

- `auth.db` from your original project works directly — no migration needed!
- Images are served from `static/images/` instead of local `images/` folder
- Session stores temp state (mode, user, image, pattern) during flow
