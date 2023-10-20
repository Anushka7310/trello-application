# Trello Application

A Trello project built with [React. js](https://reactjs.org/) and [Node.js](https://nodejs.org/) (Express.js). This project replicates the core features of Trello, including projects, boards, and tasks, and allows users to manage tasks through a drag-and-drop interface.

## Live Demo

A live demo of the project can be accessed [here]().
## Features

- **User Authentication:**
  - User registration and login.
  - Users are redirected to the dashboard upon login.

- **Dashboard:**
  - The dashboard displays a list of projects in card format.
  - Clicking on a project card redirects the user to the project page.

- **Projects Page:**
  - Project page contains boards with task lists.
  - Tasks can be moved between lists via drag and drop.
  - Clicking on a task card opens a popup with task details.

- **Responsive UI:**
  - The user interface is designed to be responsive, ensuring a seamless experience on various devices.

## Tech Stack

- Frontend:
  - [React.js](https://reactjs.org/)

- Backend:
  - [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/) for the server.
 
## Running the Application

To run the project locally, follow these steps:

### Frontend
1. Navigate to the `client` directory: `cd client`.
2. Install dependencies: `npm install`.
3. Start the development server: `npm run start`.

### Backend
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`.
3. Start backend server: `npm run dev`.

## Setting Up Credentials

To run the application successfully, you need to set up your credentials. Add the following placeholders for your credentials in the .env file in backend folder:

```dotenv
# .env

# MongoDB Database URI
MONGO_URI=

# JWT (JSON Web Tokens) Secret Key
JWT_SECRET=

# JWT Token Expiration (e.g., 5d for 5 days)
TOKEN_EXPIRE_TIME=

```

