# QUESTR - Anonymous Q&A Application

<p align="center">
  <img src="https://i.imgur.com/KAhUMk0.png" alt="Logo" width="500" />
</p>

This repository contains the auth microservice portion of the Questr Q&A application.

## QUESTR - All Repositories

- [Frontend](https://github.com/Neography7/questr-front)
- [API Gateway](https://github.com/Neography7/questr-gateway)
- [User Microservice](https://github.com/Neography7/questr-user-srvc)
- [Auth Microservice](https://github.com/Neography7/questr-auth-srvc)
- [Question Microservice](https://github.com/Neography7/questr-question-srvc)
- [GRPC Protos](https://github.com/Neography7/questr-proto)
- [Deployment](https://github.com/Neography7/questr-deployment)

## Description

The auth microservice, developed using Nest.js, focuses on managing session authentication for user memberships within the platform. It handles user authentication, token generation using JWT after membership validation, and session management.

On the other hand, profile management operations are handled within the user microservice. The user microservice, also developed using Nest.js, manages user profiles and other membership-related functionalities.

This microservice communicates with the api-gateway and other services via GRPC. 

## Backend Technologies

- **Nest.js:** Employed for developing the microservice architecture.
- **gRPC:** Used for communication between microservices.
- **i18next:** Used for internationalization (i18n) support.
- **class-validator:** Used for validation within Nest.js.
- **class-transformer:** Used for object transformation within Nest.js.
- **JWT:** Utilized for session authentication and token generation.

## Installing

Note: Please don't forget to use this service with api-gateway and question and auth microservices.

First setup the env file. You must generate a JWT Secret key. If nessesery change the user service URL. 

```env
NODE_ENV=development

JWT_SECRET=

USER_SERVICE=0.0.0.0:5002
```

And then, install the packages.

```bash
# Install required packages
npm install
```

Lastly start the service. This service will run on port 5001.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

This project is licensed under the [Beerware License](LICENSE).

If you find this project useful and we ever meet, you might consider buying me a beer in return.

## Contact

If you have any questions or feedback regarding the project, feel free to get in touch:

- Email: ilkerakyel97@gmail.com
- LinkedIn: [İlker Akyel](https://www.linkedin.com/in/ilker-akyel/)
- Website: [ilkerakyel.com](https://www.ilkerakyel.com)