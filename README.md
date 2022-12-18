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
