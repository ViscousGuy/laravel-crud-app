## **CRUD APP**

A Minimal CRUD Application that fetches product list from database from backend and displays it on frontend.

**Technologies Used**

-   Laravel [11.5.0]
-   PHP [8.3.6]
-   [Database - SQLite]

**Installation**

1.  **Navigate to the project directory:**

2.  **Install Composer dependencies:**
    ```
    composer install
    ```
3.  **Copy the example environment file and configure:**
    ```
    cp .env.example .env
    ```
4.  **Generate an application key:**
    ```
    php artisan key:generate
    ```
5.  **Run database migrations:**
    ```
    php artisan migrate
    ```
6.  **Running the Project:**

        ```
        php artisan serve

        ```

**Routes**

The application defines the following routes:

**Basic Routes**

-   **GET /:** Renders the default Laravel 11 'welcome' view.

**Product Management Routes (grouped)**

-   **GET /products:** Displays a list of all products (`products.index`).
-   **GET /products/create:** Displays the form to create a new product (`products.create`).
-   **POST /products:** Stores a newly created product (`products.store`).
-   **GET /products/{product}/edit:** Displays the form to edit an existing product (`products.edit`).
-   **PUT /products/{product}:** Updates an existing product (`products.update`).
-   **DELETE /products/{product}:** Deletes an existing product (`products.destroy`)

**Notes:**

-   These routes are controlled by the `ProductController`.
