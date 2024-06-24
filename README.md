# ecommerce
# Real-Time eCommerce Application

This project is a full-stack real-time eCommerce application built with Spring Boot, Angular, and MySQL. It includes all essential features of an eCommerce platform such as browsing products, shopping cart management, order placement and cancellation. Additionally, there are administrative functionalities available for managing products and users.

## Features

- **User Features:**
  - Browse products by categories
  - View product details including pricing and availability
  - Add products to the shopping cart
  - Manage shopping cart items (add, update quantity, remove)
  - User authentication and authorization using JWT tokens
  - Place orders and view order history
  - Cancel orders if allowed within specified time

- **Admin Features:**
  - CRUD operations for products and categories
  - User management (view users, promote to admin)
  - View order details and change order status
  
- **Backend (Spring Boot):**
  - RESTful API implementation using Spring MVC
  - Spring Security for JWT-based authentication and authorization
  - JPA and Hibernate for database interaction
  - MySQL database for storing real-time data
  - Secure endpoints for user and admin functionalities
  
- **Frontend (Angular):**
  - Single Page Application (SPA) architecture
  - Responsive design using Angular Material or Bootstrap
  - Angular services for REST API integration
  - Routing and navigation between different views
  - Observable and RxJS concepts for handling asynchronous operations
  
## Getting Started

To launch this application, follow these steps:

1. **Backend (Spring Boot):**
   - Clone the repository
   - Open the backend project in your IDE
   - Configure MySQL database connection in `application.properties`
   - Run the Spring Boot application (ensure all dependencies are resolved)

2. **Frontend (Angular):**
   - Navigate to the frontend directory (`cd frontend`)
   - Install dependencies using `npm install`
   - Start the Angular application with `ng serve -o`
   - The application will open automatically in your default browser

3. **Create Admin User:**
   - Use the provided API collections to create an admin user
   - Admin users have additional privileges compared to normal users

## API Collections (Postman)
   - Import the provided Postman collection for testing API endpoints
   - Includes requests for user authentication, product management, and order operations

## Technologies Used

- **Backend:**
  - Java, Spring Boot, Spring Security, JWT, JPA, Hibernate, MySQL
  
- **Frontend:**
  - TypeScript, Angular, RxJS, Angular Material (or Bootstrap), HTML/CSS

## Screenshots
Login :
![image](https://github.com/Supratik5904/ecommerce/assets/47635739/a5d7760a-83be-44cc-ba99-2f30c5dbe9a7)

Admin:
![image](https://github.com/Supratik5904/ecommerce/assets/47635739/59402a71-feea-411b-a00f-17a8f6c30106)
![image](https://github.com/Supratik5904/ecommerce/assets/47635739/f45342fe-e72f-4ae4-8647-92045c2c733a)
![image](https://github.com/Supratik5904/ecommerce/assets/47635739/7e09736c-ef25-4da9-b8bb-0a4b744abafc)
![image](https://github.com/Supratik5904/ecommerce/assets/47635739/0cb4dfd4-e9fa-4ca8-8421-0f6932b1af28)

User:

![image](https://github.com/Supratik5904/ecommerce/assets/47635739/59fc6c7e-ea67-493e-bd6d-65ba71abcb0c)
![image](https://github.com/Supratik5904/ecommerce/assets/47635739/67a3de95-f802-4ace-802d-465323130e1b)
![image](https://github.com/Supratik5904/ecommerce/assets/47635739/515a3d18-96d0-48ad-a9ab-68a89de51493)
![image](https://github.com/Supratik5904/ecommerce/assets/47635739/8aacf51a-f026-4113-9f59-f6abf35fa148)
![image](https://github.com/Supratik5904/ecommerce/assets/47635739/f0177905-4a12-44f0-9ee1-6d5d48e9a13c)
![image](https://github.com/Supratik5904/ecommerce/assets/47635739/13084b24-60aa-4c05-836c-7a642205eee7)
![image](https://github.com/Supratik5904/ecommerce/assets/47635739/d4f580a1-a4e5-4797-b713-5f59596523fa)














