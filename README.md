# my-express-typescript-template
My own version of express typescript template. It was from express-generator-typescript but I stripe down the packages that I don't use and also I change the file structure

# usage
Clone the repository first
```
git clone https://github.com/AngheloAmir/my-express-typescript-template.git
```
####
Then install (downloads the node_modules)
```
npm install
```
# Remember to add/change the .gitignore and .eslintrc
```
/node_modules
/dist
/backup
/rest

## Uncomment these for production!
# /env/development.env
# /env/production.env
# /build
```

# .eslintrc (create a .eslintrc)
```
{
    "parser": "@typescript-eslint/parser",
    "plugins": [
      "@typescript-eslint"
    ],
    "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parserOptions": {
      "project": "./tsconfig.json"
    },
    "rules": {
      "max-len": 0,
      "no-console": 1,
      "no-extra-boolean-cast": 0,
      "@typescript-eslint/restrict-plus-operands": 0,
      "@typescript-eslint/explicit-module-boundary-types": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/no-floating-promises": 0,
      "@typescript-eslint/no-unsafe-member-access": 0,
      "@typescript-eslint/no-unsafe-assignment": 0,
      
      "@typescript-eslint/no-unsafe-return": 0,
      "@typescript-eslint/no-misused-promises": 0,
      "@typescript-eslint/no-unsafe-call": 0
    }
}
```

# npm scripts
```
npm run start:dev
```
To start the developement server. Everytime time there is changes, ESLint will run automatically because the nodemon contains a modified code to run Eslint every file changes

```
npm run build
```
To build the project which is NECESSARY before the uploading the project to production

```
npm run start
```
Run the production build.

# updating the nodemon inside the enviroment-setup
This project contains a modified nodemon but only the nodemon/lib/monitor/watcher.js has the only modification.  
Just delete the nodemon folder, and copy another nodemon from your node_modues and delete the code (in the watcher.js):
```javascript
function restartBus(matched) {
  ... everything in this function
}
```
and replace it with the ff code:
```javascript
/*added*/ const cli = require("eslint/lib/cli");
/*added*/ const chalk = require('chalk');
/*added*/ const command = ['-c', '.eslintrc', 'src', '--ignore-pattern', 'src/public/**/*']

function restartBus(matched) {
  /*added*/ console.clear();
  /*added*/ console.log(chalk.yellow('[Eslint] Linting files...'));
  /*added*/ cli.execute(command).then((value) => {
  /*added*/   if(value == 0) {
      //utils.log.status('restarting due to changes...');
      matched.result.map(file => {
        utils.log.detail(path.relative(process.cwd(), file));
      });
      if (config.options.verbose) {
        utils.log._log('');
      }
      bus.emit('restart', matched.result);
    }
  });
}
```
which I added it at line 218 of the watcher.js

# Lincess under MIT
