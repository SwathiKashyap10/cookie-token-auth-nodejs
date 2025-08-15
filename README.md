# Token-Based Authentication Using Cookies

A simple Node.js project demonstrating token-based authentication where the server generates a JWT upon user login and stores it in an HTTP-only cookie. This approach avoids storing tokens in localStorage and provides secure session handling.  

---

## Features

- **User Signup & Login** with email and password.
- **JWT Token-Based Authentication** stored in **HTTP-only cookies**.
- **Protected Routes**: Only accessible to authenticated users.
- **Logout Functionality**: Clears the token cookie.
- **Error Handling**: Proper responses for invalid credentials, expired or missing tokens.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT (jsonwebtoken)
- bcryptjs
- Cookies (cookie-parser)
- Axios (for frontend API calls)

---

## Project Flow

### 1. Signup

1. User sends POST request to `/user` with `{ name, email, password }`.
2. Password is hashed with bcrypt and user is stored in MongoDB.
3. JWT token is generated and sent back as an **HTTP-only cookie**.

### 2. Login

1. User sends POST request to `/user/login` with `{ email, password }`.
2. Backend verifies credentials:
   - Checks if the user exists.
   - Compares password using bcrypt.
3. If valid:
   - Generates a JWT token.
   - Sets the token in an HTTP-only cookie (`uid`).
   - Responds with success message.

### 3. Protected Route Example

1. User tries to access `/profile`.
2. Server reads the token from the cookie.
3. Verifies the JWT:
   - If valid → returns user info.
   - If invalid or expired → responds with 401/403.

### 4. Logout

1. User clicks logout.
2. Backend clears the cookie using `res.clearCookie("uid")`.
3. User is effectively logged out.

---


## API Endpoints

| Route             | Method | Description                       | Auth Required |
|-------------------|--------|-----------------------------------|---------------|
| `/user`           | POST   | Register a new user               | ❌            |
| `/user/login`     | POST   | Login user and set JWT cookie     | ❌            |
| `/user/profile`   | GET    | Get logged-in user info           | ✅            |
| `/user/check-auth`| GET    | Verify if token is valid          | ✅            |
| `/user/logout`    | POST   | Clear token cookie and logout     | ✅            |

