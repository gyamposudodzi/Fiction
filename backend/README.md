# Bank Login Backend

This is the backend for the Bank Login project. It receives login credentials and stores them in a MongoDB database.

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Create a `.env` file in this directory with the following content:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string_here
    ```
    *Note: You need a MongoDB connection string. You can get a free cluster from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).*

3.  **Start the Server**:
    ```bash
    npm start
    ```
    (You might need to add `"start": "node server.js"` to your `package.json` scripts if it's not there).

## API Endpoints

-   `GET /`: Checks if server is running.
-   `POST /api/login`: Receives `{ userID, password, saveID }` and saves to DB.

## Development

-   Ensure the frontend (`boalogin.html`) is updated to point to `http://localhost:3000/api/login` (or your deployed URL).
