# The Complete Node.js Course

## Getting Started

- Node architecture

  - Node is a C++ program that embeds Chrome's V8 engine, the fastest JS engine in the world
  - Node is not a framework, it is a runtime environment for executing JavaScript code

- How Node works

  - It has non-blocking (asynchronous) architecture
  - Ideal for I/O-intensive apps
  - Should not be used for CPU-intensive applications

- Examples of Node modules
  - os, fs, events, http

- Global object
  - e.g. `console.log(); // global`
    - Can be accessed from anywhere
  - `window` object in the browser represents the global scope
    - All variables and functions defined globally ban be accessed via `window`
    - If you call `console.log()`, the JavaScript engine will prefix `window.` to it
    - User declared objects can be also accessed via `window`
  - `global` is an object just like `window`
    - Exception: user-defined variables are not accessible via `global`

- Modules
  - In order to build reliable and maintainable applications, avoid defining variables and functions into the global scope
  - Every file in a Node application is considered a module
  - `module` object shows important information about a module

- Creating a module
  - Exporting an object: `module.exports.<object_name> = <object>`
  - Exporting a single function: `module.exports = <object>`


- Loading a module
  - `require('./logger') // logger.js is in the same folder`
  - Store the module being loaded in a constant (`const`)
    - Reason: we don't want to accidentally override the module's exports
  
- Module wrapper function
  - `function (exports, require, module, __filename, __dirname) { ... }`
  - `module.exports.log = log;` === `exports.log = log;`
    - You must not export a function using `exports` (e.g. `exports = log`)

- Path modules
  - See Node documentation for built-in modules and objects 
  - Important modules: Buffer, File System, HTTP, OS, Path, Process, Query Strings, Stream
  - Loading a built-in module: `const <constant_name> = require('<module_name>')`

- OS module

- File System module
  - Always prefer to use asynchronous methods 
  - 
    ```js
    const fs = require('fs');

    fs.readdir('./', (err, files) => {
      if (err) console.log('Error', err);
      else console.log('Result', files);
    })
    ```

- Event module
  - Use PascalCase for classes
  - 
    ```js
    const EventEmitter = require('events');

    const emitter = new EventEmitter();

    // Register a listener
    emitter.on('messageLogged', () => console.log('Listener called.'));

    // Raise an event
    emitter.emit('messageLogged');
    ```

- Event arguments
  - Passed in to a event listener
  - Usual variable names: arg, e, or eventArg
  - 
    ```js
    const EventEmitter = require('events');

    const emitter = new EventEmitter();

    // Register a listener
    emitter.on('messageLogged', (arg) => console.log('Listener called.', arg));

    // Raise an event
    emitter.emit('messageLogged', {id: 1, url: 'http://'});
    ```

- Extending EventEmitter
  - `class` is used for creating a constructor function in ES6
  - When you define a method inside a class, you don't need the `function` keyword
  - `extends` is used for inhering properties and methods from the base (parent) class
  - `class Logger extends EventEmitter { ... }`

- HTTP module
  - In `const server = http.createServer();`, `server` is an `EventEmitter`
  - 
    ```js
    const http = require('http');

    const server = http.createServer((req, res) => {
      if (req.url === '/') {
        res.write('Hello World');
        res.end();
      }

      if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
      }
    });

    server.listen(3000);

    console.log('Listening on port 3000...');
    ```

## Node Package Manager (NPM)

- Introduction
  - (Using specific npm version: `sudo npm i -g npm@5.5.1`)

- Package.json
  - Includes basic information about the application
  - Before adding any node packages to your application, create the package.json file
  - `npm init` creates the package.json file interactively 
    - `npm init --yes` skips the interactive mode

- Installing a Node Package
  - `package.json`
    - There is one inside every node module
    - There is one in the package application
  - Package gets listed in `package.json` (of the package application) under *dependencies*
  - Package is installed in the `node_modules` folder
  - Before, there used to be the need to supply the `--save` flag when installing a package
    - Without the flag, the package would not be saved and would not show up under *dependencies*

- Using Package
  - Install **underscore@1.8.3**
  - `require('underscore')` assumes there is a core module (module can be found in node_modules)
  - ```js
      var _ = require('underscore');
      var result = _.contains([1, 2, 3], 2)
      console.log(result)
    ```
- Package Dependencies
  - Install **mongoose@4.13.6**
  - All modules in `node_modules`, except for *underscore* and *mongoose*, are dependencies of *mongoose*
  - Before, the dependencies of each module were installed in each module's `node_modules' folder
    - Same packages would be installed multiple times
  - Nowadays, all dependencies (dependencies of dependencies and so on) are stored in the `node_modules` in the root directory of the application
    - Unless one of the packages uses a different version of one of these dependencies. In that case, that version would be stored locally with that package (within an internal `node_modules` folder).

- NPM Packages and Source Control
  - In real world applications, the size of your `node_modules` may be a few hundred Megabytes
    - Don't check out your code into your version control repository
    - Don't share `node_modules` if you are sharing the code with someone
  - All dependencies are stored in `package.json`, which is used for rebuilding `node_modules` (`npm i` achieves that).
  - Add `node_modules/` to your `.gitignore` to keep you from uploading it to your repository

- Semantic Versioning
  - **Major.Minor.Patch**
  - **Major version** is increased when adding new features that potentially breaks the existing application that depends on the current version 
  - **Minor version** is increased when adding new features without breaking the existing API (X.X.0 could mean that that that version is unstable because they haven't found/fixed bugs yet)
  - **Patch version** is increased when fixing bugs
  - Caret character: `^`
    - `^4`in `"mongoose": "^4.13.6",` tells NPM that we are interested in any version of Mongoose as long as the major version is 4 (`4.x` would translate to the same command)
  - Tilde character: `~`
    - `~4`in `"mongoose": "~4.13.6",` tells NPM that we are interested in any version of Mongoose as long as the major version is 4 and the minor version is 13 (`4.13.x` would translate to the same command)
  - Without `^` or `~`, you get the exact version (e.g. `4.13.6`)

- Listing the Installed Packages
  - Finding out the version after `npm i`
    - Check last line of `package.json` the dependency of interest in `node_modules`
    - Run `npm list` (shows the dependencies and their versions in a dependency tree format)
    - Run `npm list --depth=0` (shows the dependencies of your application and their versions)

- Viewing Registry Info for a Package
  - `npm view <package>` to view the `package.json` of a given package
    - Look up all versions available: `npm view <package> versions --json`
    - Look up all versions available and their release dates: `npm view <package> time --json`
  - If you are looking only for information on the dependencies: `npm view <package> dependencies`
  - All the versions release of a package: `npm view <package> versions`

- Installing a Specific Version of a Package
  - `npm i <package>@<version>`

- Updating Local Packages
  - `npm outdated`
  - `npm update` only updates minor and patch releases
  - To update to major releases:
    - `npm i -g npm-check-updates`
    - `ncu -u`
    - `npm i`

- DevDependencies
  - JSHint: analyze code and look for syntactical errors
  - `npm i jshint --save-dev`

- Uninstalling a Package
  - `npm un <package>`

- Working with Global Packages
  - Examples of a global package: npm, ng
  - `npm i -g <package>`
  - `npm -g outdated`

- Publishing a Package
  - Create the folder which will contain your new library: `mkdir <folder-lib>`
  - Add a `package.json` file: `npm init --yes`
  - Add an `index.js` file (the entry point to your library), in which you export your package functions
  - Make an account on NPM: `npm adduser`
  - Sign in to your NPM account: `npm login`
  - Publish the package: `npm publish`

- Updating a Published Package
  - Do the code enhancement then update the version accordingly:
    - `npm version major`
    - `npm version minor`
    - `npm version patch`
  - Run `npm publish`

## Building RESTful API's Using Express

- Introduction 
  - Use Express instead of *http* module
    - Express is a fast and lightweight framework for building web applications

- RESTful Services
  - Also called RESTful APIs
  - REST (REpresentational State Transfer)
  - CRUD Operations
    - Create
    - Read
    - Update
    - Delete
  - `http://vidly.com/api/costumers`
    - `/costumers` is a resource
  - HTTP methods
    - GET for getting data
    - POST for creating data
    - PUT for updating data
    - DELETE for deleting data
    
- Introducing Express
  - Install Express v.4.16.2: `npm i express@4.16.2`

- Building Your First Web Server

- Nodemon
  - Removes the need of stopping and restarting the server after every change
  - You may want to do a global install: `npm i -g nodemon`
  - Run your application: `nodemon index.js`

- Environment Variables
  - It is a variable part of the environment where a process runs
  - Env. var. is PORT usually (fall back to 3000 in case PORT is not defined)
    - `const port = process.env.PORT || 3000`
  - Assign an arbitrary port number for your application
    - `export PORT=5001`

- Route Parameters
  - **Route parameters** are used for essential or **required** values
    - `/:<parameter>` is a parameter in the URL
      - `/api/courses/:id`
      - `/api/posts/:year/:month`
    - In Express, <parameter> can be fetched with `req.params`
  - **Query string parameters** are used for anything that is **optional** and are passed in the URL after a question mark
    - In Express, query parameters are fetched with `req.query`
    - `/api/posts/:year/:month?sortBy=name`

- Handling HTTP GET Requests
  - `let` is used for defining a variable that we can reset later
  - `const` is used for defining a constant
  - 404: object not found

- Handling HTTP POST Requests
  - Add `app.use(express.json());` to be able to read the request body as JSON
  - Send back to the client the object created using the POST method
  - Test HTTP POST using Postman

- Input Validation
  - Don't assume the client is sending a correct request
  - JOI is a npm package that is used for request validation
  - Install JOI: `npm i joi@13.1.0`
  - `const Joi = require('joi');` with the capital J because we are dealing with a class
  - ```js
      const schema = {
        name: Joi.string().min(3).required(),
      };

      const result = Joi.validate(req.body, schema);

      if (result.error) return res.status(400).send(result.error.details[0].message);
    ```

- Handling PUT Requests
  
- Handling DELETE Requests

## Express - Advanced Topics

- Middleware
  - A middleware, or middleware function, takes a request object and returns a response to the client or passes the control to another middleware function
    - In Express, every route function is technically a middleware function
- The **request processing pipeline** for the current code:
  - `request` &rarr; `json()` (middleware 1) &rarr; `route()` (middleware 2) &rarr; `response`

- Creating Custom Middleware
  - A middleware follows the following pattern
    - ```js
        function(req, res, next){
          // do something
          next(); // don't forget this line; otherwise, app will hang
        }
      ```
  - Create logic for the middleware in a separate file and export the middleware function
  - Import the middleware to your app and install it by using the line below
    - `app.use(<middleware>)`

- Built-in Middleware
  - `express.json()` is a built-in middleware that parses the body of a request
  - VSCode trick: `option` + `shift` + `down arrow` duplicates a line
  - `express.urlencoded({ extended: true })` in the body of your request (e.g. key1=value1&key2=value2)
    - To test it, use x-www-form-urlencoded in Body tab in Postman
    - Pass arrays and complex formats using *urlencoded*
  - `express.static()` use for serving static files
    - `app.use(express.static('public'));` will serve files located in the public folder of the root directory of your app

- Third-party Middleware
  - **helmet**: helps secure your apps by setting various HTTP headers
  - **morgan**: HTTP request logger
    - Log requests to the console, but it can be configured to log requests to a log file

- Environment
  - Enable or disable certain features according to your current environment
    - E.g.: enabling logging of HTTP requests only in the development environment
  - Two ways of fetching the environment
    - `process.env.NODE_ENV`: if `NODE_ENV` not set, returns `undefined`
    - `app.get('env')`: returns `development` by default (regardless of whether `NODE_ENV` is `undefined`)
    - Load a middleware or not based on the current environment
      - ```js
          if (app.get('env') === 'development') {
            app.use(morgan('tiny'));
            console.log('Morgan enabled...');
          }
        ```

- Configuration
  - NPM modules for managing the configuration of your applications
    - rc
    - config
  - Run `npm i config@1.29.2`
  - Create a folder named `config` in the root directory of your app and have a file for each of your environments
    - *default.json*
    - *development.json*
    - *production.json*
  - When using the *config* module, your application will load the configurations based on the value you declared to your env. var. `NODE_ENV` (e.g.: development, production)
  - Do not store your application secrets in the configuration files (instead, you should store your secrets using env. variables e.g. `export app_password=1234`)
    - No database password
    - No mail server database
  - To fetch the env. variables that are storing your secrets, create a file named `custom-environment-variables.json`, map in this file the JSON properties with those env. variables (example below), and use the *config* module to access the secrets
    - ```json
        {
          "mail": {
            "password": "app_password"
          }
        }
      ```

- Debugging
  - Install the debug package: `npm i debug@3.1.0`
  - `require('debug')` returns a function
  - Pass in a namespace for the debug function (e.g. `require('debug')('app:startup')` or `require('debug')('app:db')`
  - Use the env. var. DEBUG to set what namespace debugging message you want to see
    - `export DEBUG=app:db`
    - `export DEBUG=app:startup,app:db`
    - `export DEBUG=app:*`
  - There is also a shortcut for setting DEBUG env. variable 
    - `DEBUG=app:db nodemon index.js`

- Template Engines
  - Template engine modules (generate dynamic HTML and return it to the client)
    - Pug
    - Mustache
    - EJS
  - Install *pug*: `npm i pug@2.0.1`
  - Set `view engine` property in your app
    - `app.set('view engine', 'pug')` loads the *pug* module (no need for `require('pug')`)
  - Set (by default) views
    - `app.set('views', './views')` (make sure to create the folder views in the root of your project directory) 
  - Return an HTML markup to the client
    - `res.render('index', { title: 'My Express App', message: 'Hello});`
    - The first argument is the name of our view
    - The second argument is an object with all the parameters defined in the template (.pug file)
  - When building RESTful web services for the backend, you usually don't need a view engine, or a template engine

- Database Integration
  - There are various [database drivers](https://expressjs.com/en/guide/database-integration.html) when you use Node.js and Express

- Authentication
  - Authentication is outside the scope of Express
  - Express is minimal, light-weight framework which does not have an opinion about
  - To be seen later in the course

- Structuring Express Applications
  - When putting the routes for a certain resource into its own, separate file, instead of using `const app = express();`, use `const <router_object_name> = express.Router();` and then export `<router_object_name>` at the end of your code. In your *index.js* file, import the router object that you just exported in the other file (e.g. `const <router_object> = require('./routes/<router_object_file>');`) and add `app.use('<path>', <router_object>)`, which tells your application to prepend `<path>` to the route when using the given `<router_object>`
  - If there are any custom middleware functions, ensure those are under a *middleware* folder located in the root directory