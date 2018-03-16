# ALCwithMicrosoft-Capstone-project
This is the capstone project for the Microsoft Professional Program for Front-End Web Development in collaboration with Andela Learning Community (ALC).

It is an online grocery shop. With main focus, on the front-end.

## Setup And Development
Follow the steps below to setup a local development environment. First ensure you have version of [Node.js](http://nodejs.org/) equal or greater than v6.10.0.

1. Clone the repository from a terminal `git clone https://github.com/megame24/ALCwithMicrosoft-Capstone-project.git`.
2. Navigate to the project directory `cd ALCwithMicrosoft-Capstone-project`.
3. Install global dependencies: `npm install -g grunt grunt-cli`.
4. Install project dependencies `npm install && bower install`.
5. Change `enviro.prodEnv.base` in `server.js` to `enviro.devEnv.base`.
5. Start the express server `npm start`.

## Build And Deployment
Follow the steps below to build and deploy app.

1. Run `grunt build` to build app.
2. Change `enviro.devEnv.base` in `server.js` to `enviro.prodEnv.base`.
3. deploy.