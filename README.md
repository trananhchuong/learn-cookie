# Learn Cookie - Cookie Authentication Demo

A simple Node.js web application demonstrating cookie-based session management and authentication.

## Features

- Express.js web server
- Cookie-based session authentication
- EJS templating engine
- In-memory user database (for learning purposes)
- Login/logout functionality
- Protected dashboard route

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

### Using nodemon (auto-restart):
```bash
npm start
```

### Using Node.js built-in watch flag (Node.js 18+):
```bash
node --watch index.js
```

### Standard run:
```bash
node index.js
```

The server will start on port 8000.

## Configuration

### Local Host Setup

To use a custom domain for testing:

1. Edit your hosts file:
```bash
sudo nano /etc/hosts
```

2. Add the following line:
```
127.0.0.1 chapter-testcookie.com
```

3. Access the application at `http://chapter-testcookie.com:8000`

## Test Credentials

- **Username:** chapter@gmail.com
- **Password:** Chapter@123

## Routes

- `/` - Home page
- `/login` - Login page
- `/dashboard` - Protected dashboard (requires authentication)
- `/logout` - Logout and clear session

## Security Notes

This is a learning project with simplified security practices:
- Uses in-memory session storage
- Hardcoded test credentials
- Basic HttpOnly cookie implementation

## The Cookie Authentication Flow

```mermaid
sequenceDiagram
    participant U as User/Browser
    participant S as Express Server
    participant M as Memory Store
    
    Note over U, M: Initial Login Process
    U->>S: GET /login
    S->>U: Login form (HTML)
    
    U->>S: POST /login (credentials)
    S->>M: Validate credentials
    M-->>S: User found & verified
    S->>M: Create session (sessionId)
    M-->>S: Session stored
    S->>U: 302 Redirect + Set-Cookie (HttpOnly)
    
    Note over U, M: Accessing Protected Routes
    U->>S: GET /dashboard (with cookie)
    S->>M: Lookup session by ID
    M-->>S: Session data & user info
    S->>U: Dashboard HTML (user data)
    
    Note over U, M: Subsequent Requests
    U->>S: Any protected route (with cookie)
    S->>M: Validate session
    alt Session valid
        M-->>S: User data returned
        S->>U: Protected content
    else Session invalid/expired
        M-->>S: Session not found
        S->>U: 302 Redirect to /login
    end
    
    Note over U, M: Logout Process
    U->>S: GET /logout (with cookie)
    S->>M: Delete session
    M-->>S: Session removed
    S->>U: 302 Redirect + Clear-Cookie
```