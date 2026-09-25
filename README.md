# Analytics_backend

## prerequisites

- Node.js
- docker / mongo db

## Quick start

```bash
git clone https://github.com/Analytics_backend.git
cp .env.example .env
npm install
npm start
```

## Endpoints

- Auth (POST `api/v1/user`)
- Analytics (POST `api/v1/analytics`)

## Structure / Coding Architecture

- This project follows a **MVC** (Model-View-Controller) architecture with **Dependency Injection** (DI) and **Inversion of Control** (IoC)
- It conatins config file where app continers are bind and there **TYPES** are defined
- This project follows **Object-Oriented Programming** (OOP) principles

## Centralized Error Handling And Logging

- It conatin **apiError** calss and **Logging** class in utils folder which are intjected into the app via DI

## Auther

- **@auther**: `aliasgarbootwala@gmail.com`


#

> **Note:** I have insatll prettier for code formatting.

#

> **Note:** You can find the centralized error handling and logging implementation in the `utils` folder.


#

> **Note:** You can find the DI container configuration in the `config` folder.

#

> **Note:** You can find the validators in the `validators` folder.

#
