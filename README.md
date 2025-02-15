# LearnSphare

### Course Selling Platform (MERN Stack)

## Overview

This is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) where users can buy programming courses like Java, CSS, C, and other languages.

## Features

#### User authentication (Signup/Login)

#### Browse and search for courses

#### Purchase courses securely using Stripe

#### View purchased courses in the user dashboard

#### Admin panel to manage courses

#### Cloudinary integration for image uploads

## Technologies Used

#### Frontend: React, Redux, TailwindCSS

#### Backend: Node.js, Express.js

#### Database: MongoDB

#### Authentication: JWT (JSON Web Tokens)

#### Payment Integration: Stripe

#### Image Storage: Cloudinary

### Installation & Setup

=======
Course Selling Platform (MERN Stack)

Overview

This is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) where users can buy programming courses like Java, CSS, C, and other languages.

Features

User authentication (Signup/Login)

Browse and search for courses

Purchase courses securely using Stripe

View purchased courses in the user dashboard

Admin panel to manage courses

Cloudinary integration for image uploads

Technologies Used

Frontend: React, Redux, TailwindCSS

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT (JSON Web Tokens)

Payment Integration: Stripe

Image Storage: Cloudinary

Installation & Setup

> > > > > > > 90087d0 (Initial commit)

Clone the repository:

git clone https://github.com/HumairAbbasKhan/LearnSphare1
cd course-platform

Install dependencies for the frontend:

cd client
npm install

Install dependencies for the backend:

cd ../server
npm install

Create a .env file in the server folder and configure the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_SECRET_ADMIN=your_admin_secret_key
CLIENT_URL=http://localhost:5173
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Create a .env file in the client folder and configure the following:

VITE_BACKEND_URL=http://localhost:5000

Start the backend server:

npm run server

Start the frontend client:

cd ../client
npm start

How to Save the README File

Save this file as README.md in the root directory of your project.

If you are using GitHub, commit and push it:

git add README.md
git commit -m "Updated README with Stripe and Cloudinary setup"
git push origin main

<<<<<<< HEAD

## Contributing

Feel free to fork this repository and submit pull requests with improvements or bug fixes.

## License

=======
Contributing

Feel free to fork this repository and submit pull requests with improvements or bug fixes.

License

> > > > > > > 90087d0 (Initial commit)

This project is licensed under the MIT License.
