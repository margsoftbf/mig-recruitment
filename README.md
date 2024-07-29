# Books Management Application

This is a full-stack application for managing a collection of books. The application allows users to view, add, edit, and delete books.

## Technologies Used

- **Frontend:** Next.js, React, TypeScript, Axios, React Hook Form, Yup
- **Backend:** NestJS, TypeORM, PostgreSQL
- **Database:** PostgreSQL
- **Containerization:** Docker

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/margsoftbf/mig-recruitment
    ```

2. **Environment Variables:**
   
   Ensure that you have the following environment variables defined in `backend/.env`:

    ```plaintext
    DB_HOST=postgres
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=password
    DB_DATABASE=library
    ```

3. **Run the application:**

    Navigate to the root directory of the project and run the following command:

    ```bash
    docker-compose up --build
    ```

    This command will build and start the containers for the PostgreSQL database, the backend, and the frontend.

4. **Access the application:**

    - Open your browser and go to `http://localhost:3000` to access the frontend.
    - The backend API will be available at `http://localhost:3001`.

## API Endpoints

### Books

- **GET /books**
  - Fetch all books with pagination.
  - Query Parameters: `page`, `limit`

- **GET /books/:id**
  - Fetch a single book by ID.

- **POST /books**
  - Add a new book.
  - Request Body: `title`, `author`, `description`, `price`, `rating`, `category`, `imageUrl`

- **PUT /books/:id**
  - Update a book by ID.
  - Request Body: `title`, `author`, `description`, `price`, `rating`, `category`, `imageUrl`

- **DELETE /books/:id**
  - Delete a book by ID.

## Screenshots

### Home Page
![Home Page](https://github.com/margsoftbf/mig-recruitment/blob/main/frontend/public/screenshoot/HomeScreen.jpg?raw=true)

### Details Page
![Details Page](https://github.com/margsoftbf/mig-recruitment/blob/main/frontend/public/screenshoot/DetailsPage.jpg?raw=true)

### Add Book
![Add Book](https://github.com/margsoftbf/mig-recruitment/blob/main/frontend/public/screenshoot/AddNewBookPage.jpg?raw=true)

### Edit Book
![Edit Book](https://github.com/margsoftbf/mig-recruitment/blob/main/frontend/public/screenshoot/EditPage.jpg?raw=true)

## Notes

- The application will fetch initial data from the Google Books API and store it in the PostgreSQL database.
- Ensure Docker is running on your machine before executing the commands.

If you encounter any issues or have further questions, feel free to reach out.
