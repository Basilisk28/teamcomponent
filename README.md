## Getting Started
**NOTE:** Windows Users must ensure global config setting to fix line-endings.
```
git config --global core.autocrlf true
git config --global core.eol lf
```

Update package.json to include repository information:
```
"repository": {
    "type": "git",
    "url": "TODO"
},
```

Install all necessary modules from NPM:
```
npm install
```

**Note:** DO NOT check-in the package-lock.json file. This file is causing issues with the current CI/CD pipeline.

### Compiles and hot-reloads for development (does NOT work on Windows)
```
npm run serve
```

##### On windows, for development and hot-reloads write these commands in separate terminal: 
```
npm run build && npm run start:dev
```
```
npm run serve:client
```

### Build and run for production: 
```
npm run build && npm run start
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests (does NOT work on windows)
```
npm run test:e2e
```
##### For windows, e2e test run these command in separate terminals 
```
npm run build && npm run start
```
```
npx vue-cli-service test:e2e --url=http://localhost:8080
```

### Run your unit tests
```
npm run test:unit
```

### To kill the process on port number (if required)
```
npx kill-port 8080
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# DO NOT TOUCH or EDIT 
#### Any of these file:
 - scripts folder
 - server.js
 - vue-config.js
 - src/index.template.html
 - Dockerfile
