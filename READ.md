# Finance Data Processing Backend

## Overview

This project is a backend application built using **Node.js, Express, and MongoDB** to manage financial records. It supports user management, role-based access control, and financial data processing with summary insights.

-----------------------------------------------------

## Setup Instructions

1. Install dependencies:

```
npm install
```

2. Start MongoDB (make sure MongoDB service is running)

3. Run the server:

```
node server.js
```

4. Server will run on:

```
http://localhost:5000
```

-----------------------------------------------------
## Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JSON Web Token (JWT)

-----------------------------------------------------
##  Authentication & Authorization

* JWT-based authentication
* Role-based access control (admin, viewer)
* Protected routes require:

```
Authorization: Bearer <token>
```
-----------------------------------------------------

##  API Endpoints


### Users

#### ➤ Create User

```
POST /users
```

#### ➤ Get Users

```
GET /users
```

#### ➤ Login (Get Token)

```
POST /users/login
```

-----------------
###  Records

#### ➤ Create Record (Admin only)

```
POST /records
```

#### ➤ Get Records (with filtering & pagination)

```
GET /records
```

Query params:

* `type=income/expense`
* `category=...`
* `page=1`
* `limit=5`

#### ➤ Update Record

```
PUT /records/:id
```

#### ➤ Delete Record

```
DELETE /records/:id
```

------------------

### Summary

#### ➤ Get Financial Summary

```
GET /summary
```

Returns:

* Total Income
* Total Expense
* Net Balance

-----------------------------------------------------

##  Features

* User management
* Role-based access control
* JWT authentication
* Financial records CRUD
* Filtering & pagination
* Summary dashboard API
* Error handling & validation

-----------------------------------------------------

## Assumptions

* Role is passed through JWT token
* No password-based authentication (email-based login)
* MongoDB runs locally

-----------------------------------------------------

##  How to Test (Postman Flow)

1. Create User
2. Login → get token
3. Use token in headers
4. Create record
5. Fetch records
6. View summary

-----------------------------------------------------

##  Project Structure

```
src/
 ├── models/
 ├── routes/
 ├── middleware/
server.js
```

-----------------------------------------------------

## Conclusion

This project demonstrates backend development skills including API design, authentication, database management, and role-based access control.

-----------------------------------------------------
