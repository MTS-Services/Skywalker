![alt text](/public/logo%20.png)

# 🏠 Real Estate Application (React)

A full-featured rental application built with **React**. Users can browse, search, and book rental House & Apartment. The platform includes property details, user Login, Registration, reviews, and a responsive UI optimized for all devices.

---

## ✨ Features

- 🔍 Browse and search for house and apartment listings.
- 🏡 View property details with image gallery and short vidoes.
- 📝 Add images and short videos.
- 🔐 User (Login/Register).
- 💾 User profile with saved listings
- 📱 Fully responsive design
- ⚡ Fast and modern UI built with React

---

## 🚀 Tech Stack

- **Frontend**: React, React Router, Tailwind CSS
- **State Management**: useState, useRef
- **Routing**: React Router DOM
- **Deployment**: Vercel (Frontend)

---

## 📁 Folder Structure

---

- src/
  - /components
    - common
      - /button
  - /layouts
    - /Header
    - /Footer
  - /pages
    - /home
    - /about
    - /contact
    - /filter
    - /auth
      - /loging
      - /register
  - /routes
- app.jsx
- main.jsx

---

## 🔧 Installation

1. **Clone the repo:**

   ```bash
   git clone https://github.com/MTS-Services/Skywalker.git

   cd react-initialize

   npm install

   npm run dev

   http://localhost:5173/

   ```

---

## 🎨 Tailwind Development vsCode Editor setup

### Step-1 : To get started, install prettier-plugin-tailwindcss as a dev-dependency:

```js
npm install -D prettier prettier-plugin-tailwindcss
```

### Step-2 : Then add the plugin to your Prettier configuration:

```js
//create this file in root directory (.prettier)

{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```
