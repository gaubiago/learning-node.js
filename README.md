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