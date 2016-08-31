# Project Name

Fryes is a web based Video Question and Answers forum.  Record your questions and donate to those who provide great answers.

## Team
  
  - Team Members: Carl Chen, June Won, Keith Wong, France Yang
  - Legacy Team Members: Billy Lan, Michael De La Cruz, Edmund To, Clay Han

## Table of Contents

1. [Team](#team)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)

## Usage

After downloading or cloning, run npm install. There is a post-install npm script that will build and compile the client files using webpack.

Use psql (postgreSQL) for database, whether local or remote. Make sure to create the database and pass in user/pw, and connect to the database source as an environment variable.

Be sure to get an AWS S3 and swift account.

For starting the app, run start or deploy remotely.

## Requirements

- PostgreSQL
- Chrome 49.0/Firefox 25.0/or newer

- aws-sdk 2.4.7
- babel-plugin-transform-object-rest-spread 6.8.0,
- bcryptjs 2.3.0
- bluebird 3.4.1
- body-parser 1.15.2
- dotenv 2.0.0
- express 4.14.0
- jquery 3.1.0
- material-ui 0.15.2
- node 4.4.7
- lodash 4.14.1
- react 15.2.1
- react-dom 15.2.1
- react-redux 4.4.5
- react-router 2.6.0
- react-router-redux 4.0.5
- react-script-loader: 0.0.1
- react-tap-event-plugin 1.0.0
- redux 3.5.2
- redux-logger 2.6.1
- redux-thunk 2.1.0
- request 2.74.0
- sequelize 3.23.4
- shortid 2.2.6
- socket.io 1.4.8
- socket.io-client 1.4.8
- stripe 4.9.0
- webrtc-adapter 1.4.0
- whatwg-fetch 1.0.0

## Development

- babel 6.5.2
- babel-core 6.10.4
- babel-loader 6.2.4
- babel-preset-es2015 6.9.0
- babel-preset-react 6.11.1
- webpack 1.13.1

### Installing Dependencies

From within the root directory:

Install all npm dependencies.
```sh
npm install
npm run postinstall
```

Using PostgreSQL or MySQL, create a database for the project:
```sh
CREATE DATABASE <databasename>;
```

Populate the database with questions for the user.
```sh
npm run seed
```

Initiate webpack.
```sh
npm run build:dev
```

Open the server with Nodemon.
```sh
npm start
```

Once the app is up and running, you will need to create an Amazon S3 account to host recorded videos. https://aws.amazon.com/s3/

Create a S3 Bucket with the region US Standard
Navigate to the bucket and click properties, update the CORS with the following

```sh
  <AllowedOrigin>*</AllowedOrigin>
  <AllowedMethod>HEAD</AllowedMethod>
  <AllowedMethod>GET</AllowedMethod>
  <AllowedMethod>PUT</AllowedMethod>
  <AllowedMethod>POST</AllowedMethod>
  <AllowedMethod>DELETE</AllowedMethod>
  <AllowedHeader>*</AllowedHeader>
```

In your root directory, create a .env file.
```sh
touch .env
```

Inside of the .env file, provide the ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_BUCKET, . You can create an AWS bucket inside of the S3 account. You .env file should look like this:
```sh
ACCESS_KEY_ID=<your-access-key-id>
AWS_BUCKET=<your-aws-bucket>
DATABASE_URL=<your-database-url>
SECRET_ACCESS_KEY=<your-secret-access-key>
STRIPE_API_KEY=<your-stripe-api-key>
STRIPE_CLIENT_ID=<your-stripe-client-id>
```

In order to push to Heroku, setup Heroku config variables (see above) as well as setup for Heroku Postgres addon
https://elements.heroku.com/addons/heroku-postgresql

If you choose to run Webpack on production, run the following command to allow heroku to install devDependencies

```sh
heroku config:set --app <your app name> NPM_CONFIG_PRODUCTION=false
```

