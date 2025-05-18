# Express Server

This project is a simple Express server that listens on port 8001. It is set up to automatically restart on code changes using Nodemon.

## Project Structure

The project has the following files and directories:

- `src/index.js`: The entry point of the application. It creates an instance of the Express app and listens on port 8001 without defining any endpoints.

- `package.json`: The configuration file for npm, listing the dependencies (express and nodemon) and including a script to start the server.

- `Dockerfile`: Used to build a Docker image for the Express server. It specifies the base image, copies the source code, installs dependencies, and sets the command to run the server.

- `.gitignore`: Specifies files and directories to be ignored by Git, such as node_modules and logs.

- `nodemon.json`: Contains configuration settings for Nodemon, including watch directories and restart delay.

## Getting Started

To run the Express server, follow these steps:

1. Install the dependencies by running:

   ```shell
   npm install
   ```

2. Start the server using Nodemon:

   ```shell
   npm start
   ```

   The server will be running on port `8001`.

## Docker

To run the server using Docker, build the Docker image and run the container:

1. Build the Docker image:

   ```shell
   docker build -t express-server .
   ```

2. Run the Docker container:

   ```shell
   docker run -p 8001:8001 express-server
   ```

The server will be accessible at port `8001`.