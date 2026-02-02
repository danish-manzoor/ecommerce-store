# E-Commerce Store

A modern **E-Commerce** web application built with **Laravel 12**, **React.js**, and **Inertia.js**.

---

## Features

- User authentication (register, login, logout) via Laravel Starter Kit
- **Product management**:
  - Multiple **product variations** (size, color, etc.)
  - Categories and **subcategories**
  - Product images and descriptions
- Shopping cart and checkout system
- Admin panel to manage products, orders, and users
- Responsive design with React components
- Real-time updates using Inertia.js
- Search and filter functionality

---

## Tech Stack

- **Backend:** Laravel 12, PHP 8.1+
- **Frontend:** React 3, Inertia.js, Tailwind CSS
- **Database:** MySQL
- **Version Control:** Git & GitHub

---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/danish-manzoor/ecommerce-store.git
cd ecommerce-store
```


2. Install PHP dependencies:
```bash
composer install
```
3. Install Node dependencies:
```bash
npm install
npm run dev
```
4. Copy .env file and generate app key:
```bash
cp .env.example .env
php artisan key:generate
```
5. Configure database in .env:
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```
6. Run migrations and seeders:
```bash
php artisan migrate --seed
```
7. Serve the application:
```bash
php artisan serve
```
Visit http://127.0.0.1:8000 in your browser.
