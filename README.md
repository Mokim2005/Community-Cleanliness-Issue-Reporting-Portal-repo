# Community Cleanliness & Issue Reporting Portal

## Project Purpose

This project is a **full-stack MERN (MongoDB, Express.js, React.js, Node.js)** application that allows users to report and track environmental and cleanliness-related issues in their local area. Users can report garbage buildup, broken footpaths, illegal dumping, waterlogging, and more. They can also request cleanup drives, pay small community service fees, and view their issue history.

The application emphasizes **clean UI with Tailwind CSS**, **secured routes using Firebase Authentication**, and a modern app structure with private routes, protected data, and user authorization.

---

## Live Demo

[Insert your live website URL here]

---

## Features Implemented

### Authentication

- Login & Register using email/password and Google.
- Private routes for protected content.
- Password validation:
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - Minimum 6 characters
- Success/error notifications implemented using **Toast** or **SweetAlert**.
- Profile avatar shows logout button after login.

### Home Page (Public)

- Banner section with **3 real-world slides** (garbage issues, community cleaning, sustainability actions).
- Category section with 4 cards:
  - Garbage
  - Illegal Construction
  - Broken Public Property
  - Road Damage
- Recent Complaints section showing **latest 6 issues** fetched from MongoDB.
- Extra sections:
  - Community Stats (total users, issues resolved/pending)
  - Volunteer Call-to-Action / Join Clean Drive Section

### Add Issue Page (Private)

- Allows logged-in users to submit new issues.
- Form fields:
  - Title, Category, Location, Description, Image
  - Suggested Fix Budget (Amount)
  - Status (default: ongoing)
  - Date (auto-generated)
  - Email (read-only, current user)
- Success notifications using toast alerts.
- Saves data to MongoDB.

### All Issues Page

- Displays all issues in a **3-column grid layout**.
- Each card shows Image, Title, Category, Location, Amount, and “See Details” button.
- Category and status filtering implemented.

### Issue Details Page (Private)

- Displays full issue details:
  - Title, Category, Location, Description, Image, Date, Amount
- Pay Clean-Up Contribution modal form:
  - Issue Title, Amount, Contributor Name, Email, Phone, Address, Date, Additional Info
- Contributors Table showing all users who contributed to the issue.
- Optional progress bar showing collected vs suggested budget.

### My Issues Page (Private)

- Displays issues submitted by the logged-in user.
- Update modal to edit title, category, amount, description, or status.
- Delete confirmation modal.
- Personalized & secure data access.

### My Contribution Page (Private)

- Table showing logged-in user's contributions.
- Download report as PDF (using **jsPDF + jsPDF-AutoTable**).

### Additional Features

- Dynamic titles for each route.
- 404 Not Found Page.
- Loading spinner during API calls.
- Toast/SweetAlert for all CRUD actions.
- Fully responsive UI for all screen sizes.
- Dark/Light mode toggle.
- Lottie React / React-simple-typewriter / React Awesome Reveal integration on homepage.

---

## UI & Design

- Unique design inspired by online research (ThemeForest, UI blogs, etc.)
- Consistent headings, paragraph spacing, button styles, and card sizes.
- Grid layouts for equal image sizes and alignment.
- Navbar & Footer consistent across all pages.
- Responsive on mobile, tablet, and desktop.
- Uses **new X logo** instead of old Twitter icon for social links.

### Resources & Inspiration

- [UI Inspiration](https://uiverse.io/)
- [Free Images & Resources](https://devmeetsdevs.com/)
- [ThemeForest](https://themeforest.net/)
- [CodeCanyon](https://codecanyon.net/)

---

## Database Structure (MongoDB)

### Collection: Issues

```json
{
  "title": "Overflowing garbage on Road 21",
  "category": "Garbage",
  "location": "Mohakhali, Dhaka",
  "description": "Garbage has not been collected for 5 days.",
  "image": "https://example.com/image.jpg",
  "amount": 200,
  "email": "user@mail.com",
  "date": "2025-10-26"
}
Collection: My Contribution
json
Copy code
{
  "issueId": "abc123",
  "amount": 250,
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "01712345678",
  "address": "Banani, Dhaka",
  "date": "2025-11-10T14:30:00Z",
  "additionalInfo": "Looking forward to a cleaner community area!"
}
Technology Stack
Frontend: React.js, Tailwind CSS, Firebase Authentication

Backend: Node.js, Express.js

Database: MongoDB

Hosting: Client-side: Netlify / Surge / Firebase; Server-side: Vercel

NPM Packages Used
React, React Router

Firebase

TailwindCSS

Toastify, SweetAlert2

Lottie React / React-simple-typewriter / React Awesome Reveal

jsPDF + jsPDF-AutoTable (PDF reports)
```
