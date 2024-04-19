# Faceflix API

Welcome to the Faceflix API documentation.This API provides functionality like social media in general but in a simple form, allowing users to interact with video, photo and blog posts, users can also register, log in and authenticate.

## Table of Contents

- [Faceflix API](#Faceflix-API)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Database Schema](#database-schema)
    - [Users Schema](#users-schema)
    - [Images Schema](#images-schema)
    - [Videos Schema](#videos-schema)
    - [Blogs Schema](#blogs-schema)
    - [Transformations](#transformations)
  - [API Structure](#api-structure)
    - [1. application](#1-application)
    - [2. controller](#2-controller)
    - [3. exception](#3-exception)
    - [4. middlewares](#4-middlewares)
    - [5. model](#5-model)
    - [6. routes](#6-routes)
    - [7. services](#7-services)
    - [8. validation](#8-validation)
    - [9. test](#9-test)
        - [a. utils](#a-utils)

  - [API Endpoints](#api-endpoints)
  - [Usage](#usage)

  ## Prerequisites

Before running the API, make sure you have the following prerequisites installed on your system:

1. Node.js (<https://nodejs.org>)
2. npm (Node Package Manager, usually installed along with Node.js)
3. MongoDB (<https://www.mongodb.com>)

## Installation

To set up the API, follow these steps:

1. Clone this repository to your local machine.

    example with git clone
   ```
   git clone https://github.com/faceflix/backend-faceflix 
   ```
2. Navigate to the project directory using the terminal.
   
3. Install the required dependencies by running:

   ```
   npm install
   ```

## Configuration
Before running the API, you need to set up the environment variables. Create a `.env` file based on the provided `.env.example` file. You can do this by running the following command:

```bash
cp .env.example .env
```

Then, open the `.env` file and fill in the values for the environment variables according to your setup.

example value:
```env
# DATABASE MONGODB
DATABASE_URL=mongodburl

# JWT 
JWT_SECRET=jwtscret

#PORT
PORT=3000
```

## Database Schema

This section provides an in-depth explanation of the model scheme used in the Faceflix application. This schema outlines the structure of the main data entities, including users, videos, images, and blogs

### Users Schema
The `users Schema` defines the user structure that will be related to images, videos and blogs, the users themselves store crucial user information for the faceflix application, each user includes:

- **email**: A unique identifier for the user.
- **password**: The user's password, securely stored.
- **name**: a name for the user to be easily recognized.
- **title**: a title tells what kind of person he is.
- **description**: a brief summary about him.
- **profileImage**: image profile for the user's profile.
- **backgroundImage**: . background image for the user's profile

### Images Schema
The `images Schema` defines the image structure of user posts which will definitely be related to the user, the images themselves store information about the image posts:

- **userId**: Reference to the user's ID.
- **title**:title of an image post.
- **description**: description of an image post.
- **image**: Image is an image of a post that is posted
- **createdAt**: Defines when a post was created
- **updatedAt**: Defines when a post was last updated


### Videos Schema
The `videos Schema` defines the structure of a user's video post which will definitely be related to the user, the video itself stores information about the video post

- **userId**: Reference to the user's ID.
- **title**: Title of an video post.
- **description**: Description of an video post.
- **video**: Video is an video of a post that is posted
- **createdAt**: Defines when a post was created
- **updatedAt**: Defines when a post was last updated

### Blogs Schema
The `blogs Schema` defines the structure of user blog posts which will definitely be related to users, the blog itself stores information about blog posts

- **userId**: Reference to the user's ID.
- **title**: Title of an blog post.
- **description**: Description of an blog post.
- **createdAt**: Defines when a post was created
- **updatedAt**: Defines when a post was last updated

### Transformations

Each schema is configured to transform the `_id` field into an `id` field during serialization. This modification provides a standardized structure for API responses and enhances consistency when interacting with the application's data.

## API Structure

The organization of the code into different folders follows a modular approach, promoting code reusability and maintainability. Below is an overview of each folder and its purpose:

### 1. application

`application`: Folder to store code related to the application as a whole.

### 2. controller
`controller`:` Folder to store route handlers or HTTP request handlers.

### 3. exception
`exception`: Folder to store custom exceptions or error-handling utilities.

### 4. middlewares
`middlewares`: Folder to store middlewares or intermediary functions used in handling HTTP requests.

### 5. model
`model`: Folder to store data models or data structure definitions.

### 6. routes
`routes`: Folder to store route definitions or route settings for HTTP requests.

### 7. services
`services`: Folder to store business logic or application-related services.

### 8. validation
`validation`: Folder to store input validation or validation schema.

### 9. test
`test`: Folder to store test code or application testing unit.

#### a. utils
`utils`: Sub-folder to store utilities used in testing.

## API Endpoints

For a detailed explanation of the request and response format for each endpoint, please run the application first. To run the application, it is in the next section, if it is already running then open the URL:

for the port, match the one in the env
```
    http://localhost:PORT/api/docs
```

## Usage

To start the API, run the following command in the terminal:

```
npm run dev
```

The API server will start, and you can access the endpoints at `http://localhost:3000` (assuming the default port is used).