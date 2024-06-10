# Image Upload App Backend

This is a simple Image Upload app backend built with Node.js, Express, Prisma, and MySql. It provides RESTful API endpoints for managing Image Upload items.

## Table of Contents

- [Image App Backend](#image-app-backend)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Clone the Repository](#clone-the-repository)
    - [Install Dependencies](#install-dependencies)
    - [Set Up Environment Variables](#set-up-environment-variables)
    - [Generate Prisma Client](#generate-prisma-client)
    - [Run the Server](#run-the-server)
  - [API Endpoints](#api-endpoints)
    - [Create a Image Upload](#create)
    - [Get All Image list](#ge)
    - [Get a Image by id](#get)
    - [Update a Image](#update)
    - [Delete a Image](#delete)
## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (version 6 or higher)
- [MySql](https://www.mysql.com/) (local installation or MySql server)

## Getting Started

## Prisma Setup
-npm i prisma
-npx prisma init
-npx prisma generate(After writing the Schema)

### Clone the Repository

```sh
git clone https://github.com/vikas5singh/exportgenius.git
cd image-app-backend
