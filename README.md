# MERN Facebook Clone API

Backend for a social media web application built with **Node.js**, **Express**, and **MongoDB**. Provides RESTful APIs for user authentication, posts, comments, likes, and other social interactions.

---

## Features
- **User Authentication**: JWT-based login and registration  
- **Posts**: Create, read, update, delete posts  
- **Comments**: Add and delete comments on posts  
- **Likes**: Like or unlike posts and comments  
- **User Profiles**: View and update profile information  
- **Secure endpoints**: Authenticated routes protected with middleware  

---

## Folder Structure
```bash
server/
├── controllers/       # Handles request logic for users, posts, comments, likes
├── models/            # Mongoose schemas for User, Post, Comment, Like
├── routes/            # API routes organized by feature
├── server.js          # Express server entry point
└── package.json
