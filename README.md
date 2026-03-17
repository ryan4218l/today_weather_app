#  Weather App (React + MUI + Glassmorphism)

A modern weather application built with **React** and **Material UI**, featuring a sleek **glassmorphism UI**, **light/dark mode**, and persistent **search history**.

---

## Features

**Current Weather Display**

  * Temperature, Description, humidity, high/low
  * Dynamic weather icons

**Search Functionality**

  * Search by city and country
  * Instant UI updates

**Search History**

  * Stores the last 10 searches
  * Quick re-search
  * Delete individual entries
  * Persisted using `sessionStorage`

**Light / Dark Mode**

  * Fully theme-aware UI
  * Smooth visual consistency across components

**Glassmorphism UI**

  * Frosted glass containers
  * Blur effects + transparency
  * Subtle shadows and depth

**Custom Scrollbar**

  * Styled per theme
  * Clean, minimal, and modern

---

##  Tech Stack

* **React**
* **Material UI (MUI)**
* **JavaScript (ES6+)**
* **OpenWeather API**

---

## Project Structure

```
src/
│── assets/
│── components/
│   ├── SearchTextBox.jsx
│   ├── SearchHistory.jsx
│   ├── TodayWeather.jsx
│
│── theme.jsx
│── constant.jsx
│── App.jsx
│── index.js
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/ryan4218l/today_weather_app.git
cd today_weather_app
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Add API Key

Create a `.env` file: (example file: .env.example)

```env
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

---

### 4. Run the app

```bash
npm start
```

---

## ⚙️ Key Implementations

### Glassmorphism

* Uses `backdrop-filter: blur()`
* Transparent layered backgrounds
* Theme-based opacity tuning

---

### Theme Switching

* Uses MUI `createTheme`
* Dynamically switches between light/dark mode
* All components consume theme via `sx`

---

## Acknowledgements

* OpenWeather API for weather data
* Material UI for UI components

---

## 📄 License

This project is open-source and available under the MIT License.
