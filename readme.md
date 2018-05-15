# Code.org API for ES6
This is a library for native support of Code.org's JavaScript API.
I made this to help my class transition from Code.org's limited environment
to native ES6's expressiveness and power.

### How is it different than code.org?
If you're familiar to code.org, the JavaScript API is very similar.
However, there is no "app lab" UI to put together your apps, so 
any declarative elements (elements that are present before your code runs)
must be written in HTML. I recommend using the JavaScript API instead
because I haven't made any abstractions to the DOM that would improve
your experience.

In addition, not everything is supported yet. I am currently working on
adding more features like drop-downs and radios. They shouldn't be too
difficult but I am focusing on the core features for now.

### What do I need to know?
This library is written in ES6 with native modules. In other words,
this library uses brand new JavaScript capabilities that are not
supported in all browsers. Therefore, you should know at least some
about how to use ES6 `import` and `let`/`const`, as well as basic
JavaScript.

If you follow along in this guide, I will also show you
how to set up Webpack, a program that bundles and transforms new
JavaScript so that it will work everywhere; and `npm`, a "package
manager" for JavaScript that helps you keep track of open source code
you use automatically.

## Get Started
For this guide, I will assume that the reader has never touched any code
outside of code.org.

### Step Zero: Get Access to a Terminal
This is essential: if you want to do real development with code, you
either need a terminal or a Continuous Deployment (CD) solution.
Terminals take different forms depending on your operating system.

* Windows: You can either use PowerShell or cmd, but the former is
  generally better. Find these by using Windows search or Win+X.
* macOS: Unless you already have your preferred terminal installed,
  use Terminal.app, a default app you can find in Launchpad -> Utilities
* Linux: if you're using linux, you probably already know how to use
  a terminal.

Here is a good article that applies to macOS, Linux, and PowerShell:
[How to Use the Terminal & Command Line](http://blog.galvanize.com/how-to-use-the-terminal-command-line/)

Now that you are ready to start your project, create a new folder to store
your project in and change your terminal directory to it. (i.e. 
`cd Documents/my-project`)

### Step One: npm
1. Make sure you have npm installed on your computer.
2. Run `npm init` and answer the questions.
    * This makes sure you have a `package.json`, the file npm uses to 
      keep track of your app and its dependencies.
3. Install dependencies.
    * We need `webpack` to package our app and `babel` to make the app
      compatible with all browsers
    * Run `npm i --save webpack webpack-cli
      babel-core babel-loader babel-preset-env
      code-api` to install dependencies.
4. Add a script.
    * To make development easier, `npm`  lets you define scripts that you
      can run using the command line. We will define a script that will
      build your app (this will involve editing `package.json`, so if
      you don't know how *JSON* works, check out **[JSON](#json)**
      in the extra help section).
        1. In `package.json`, add a new key called `"scripts"` with an empty
           object as its value.
           ```json
           {
             ...
             "scripts": {},
             ...
           }
              ```
        2. In the new object, make a new entry called `"build"` and make its 
           value `"webpack"`. This tells `npm` to execute `webpack` when you 
           run `npm run build`.
           ```json
           {
             ...
             "scripts": {
               "build": "webpack"
             },
             ...
           }
           ```
        3. You can add other scripts as well; just add another property
           to the scripts object!
### Step Two: Configure Webpack
Like all computery things, you either need to conform to Webpack or
Webpack needs to conform to you. The authors of Webpack decided that
it would be better for the latter to be true. Therefore, we need to
tell Webpack how to serve us. It is pretty simple to do. Create a new
file called `webpack.config.js` in your project folder. Copy and paste
this into the file:
```javascript
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'www')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  }
};
```

Whoa. What the heck does this all mean? While you don't need to fully
understand how webpack works, the brief explanation is that this file
tells webpack to read the file called `/src/app.js`, bundle all of its
dependencies, transform it from super-shiny-new javascript to
standard javascript, then dump it all into one file called
`www/bundle.js`.

### Step 3: Bootstrap Your Project
**Coming soon!!**

## Extra Help
### JSON
If you are unsure how the `package.json` file is formatted, it is a file
that contains *JavaScript Object Notation* or *JSON*. How JSON works is
you have a root object, denoted by curly braces (`{}`) that surround the
whole thing. Objects have properties, which have a key and a value. The
key is a short name that can be used to look up the corresponding value.
Keys are just text surrounded by double-quotation marks. A value,
however, can be many kinds of things--a number, a string, a list, or an
object.

* Numbers are just the digits of the number, like `15`.
* Strings are like keys; text surrounded by quotation marks, such as
  `"Hello, world!"`
* Lists (aka Arrays) are lists of values where the values are separated
  by a comma and surrounded by square brackets (`[]`), as such: `["I", "am",
  "a", "list", "of", "strings"]`
* Objects are "containers" for key-value pairs, where the object is surrounded
  by curly brackets, the pairs are separated with commas, and the key is
  separated from the value with a colon, just so: 
  `{"firstName": "John", "lastName": "Doe"}`

JSON is also whitespace-ignorant, so you can add as many spaces and new
lines between things as you'd like.

Here is a JSON file for reference:
```json
{
  "name": "code-api",
  "version": "2.0.1",
  "description": "Recreation of code.org's JavaScript API",
  "main": "src/index.js",
  "directories": {
    "lib": "src"
  },
  "scripts": {
    "build": "jsdoc src -d docs",
    "test": "concurrently 'webpack --watch --debug --config webpack.test.js' 'serve test/www'"
  },
  "keywords": [
    "code.org",
    "javascript",
    "turtle",
    "es6"
  ],
  "justANumber": 2018
}
```
