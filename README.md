# Task List Servers

This project contains two servers for managing a task list:

- A FastAPI server implemented in Python.
- An Express server implemented in Node.js.

Both servers provide the same API routes for adding and retrieving tasks.

## Project Structure

The project has the following files and directories:

- `python-server/src/main.py`: FastAPI server implementation.
- `python-server/src/__init__.py`: Marks the `src` directory as a Python package.
- `python-server/requirements.txt`: Python dependencies.
- `python-server/Dockerfile`: Docker image for the FastAPI server.
- `express-server/src/index.js`: Express server implementation.
- `express-server/package.json`: Node.js dependencies.
- `express-server/Dockerfile`: Docker image for the Express server.
- `docker-compose.yml`: Defines and runs both servers as Docker services.

## Getting Started

To run both servers using Docker, follow these steps:

- Build and start the Docker containers by running the following command:

  ```shell
  docker compose up
  ```

  This command will build the Docker images for both servers and start the containers defined in the `docker-compose.yml` file.

- The FastAPI server will be running at port `8000`.
- The Express (Node.js) server will be running at port `8001`.

## API Routes

Both servers provide the following API routes:

- `POST /tasks`: Adds a task to the task list. The request body should contain the task details as JSON, e.g. `{ "text": "New task" }`.
- `GET /tasks`: Retrieves the task list.

## Migration Details

The original API was implemented in Python using FastAPI. The same endpoints have now been migrated to a Node.js Express server (`express-server/src/index.js`). Both servers can be run simultaneously for comparison or migration purposes.

## Testing the Servers

You can test the endpoints using `curl` or any API client:

- Get all tasks from Node.js server:
  ```sh
  curl http://localhost:8001/tasks
  ```
- Add a task to Node.js server:
  ```sh
  curl -X POST http://localhost:8001/tasks -H "Content-Type: application/json" -d '{"text":"Test task"}'
  ```
- Get all tasks from Python server:
  ```sh
  curl http://localhost:8000/tasks
  ```
- Add a task to Python server:
  ```sh
  curl -X POST http://localhost:8000/tasks -H "Content-Type: application/json" -d '{"text":"Test task"}'
  ```
