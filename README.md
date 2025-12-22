🧠 Psychologists Marketplace

A web application for finding and booking professional psychologists.
The platform allows users to browse specialists, sort them by different criteria, add psychologists to favorites, and book a personal appointment.

This project demonstrates a real-world marketplace-style application with authentication, protected routes, persistent user data, and dynamic content loading.

🔗 Live Demo

👉

✨ Features

User authentication (Sign up / Log in / Log out) using Firebase

Public and private routes (Favorites page accessible only to authenticated users)

Psychologists catalog with:

sorting by name (A–Z / Z–A)

sorting by price (low → high / high → low)

sorting by rating (low → high / high → low)

Lazy loading with Load more button

Add / remove psychologists to Favorites

Persistent favorites state after page refresh

Detailed psychologist card with Read more

Appointment booking form in modal window

Fully responsive layout (mobile, tablet, desktop)

🧩 Pages

Home – landing page with project introduction and call-to-action

Psychologists – list of available psychologists with sorting and interaction

Favorites (private) – list of psychologists added by the user

🛠️ Technologies Used

React

TypeScript

React Router

Firebase Authentication

Firebase Realtime Database

react-hook-form

yup

Vite

CSS / Styled Components (or your actual styling method)

🔐 Authentication

Authentication is implemented with Firebase:

user registration

login / logout

access to protected routes

user-specific favorites persistence

🗂️ Database Structure

Psychologists data is stored in Firebase Realtime Database with fields such as:

name

avatar_url

specialization

experience

license

price_per_hour

rating

reviews

about

initial_consultation

📱 Responsiveness

The application is fully responsive and correctly displayed on:

mobile devices (from 320px)

tablets

desktops (up to 1440px)

🚀 Deployment

The project is deployed on:
👉

📌 Project Purpose

This project was created as a portfolio application to demonstrate:

working with Firebase

building a scalable React application

handling authentication and protected routes

managing application state and user interactions

implementing real-world UI/UX patterns

👩‍💻 Author

Olesia
Junior Frontend / Fullstack Developer
