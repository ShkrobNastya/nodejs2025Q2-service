# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Add .env file (using example .env.example)

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

**⚠️ Attention:**: ***To run tests you need running server in another terminal:***

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

### Docker

Builds the PostgreSQL image from the Dockerfile located in src/db.

```
docker build -t rustlingg/db:latest ./src/db
```

Builds the application image from the project’s root directory.

```
docker build -t rustlingg/myapp:latest ./
```

Starts all services defined in docker-compose.yml in detached mode.

```
docker-compose up -d
```

Stops and removes running containers and networks.

```
docker-compose down
```

Rebuilds all images defined in the compose file.do

```
docker-compose build
```
For more information: https://docs.docker.com/

### Script for vulnerabilities scanning 

```
npm run audit
```

```
npm run audit:fix
```

### Project setup

1.Clone repo

```
git clone https://github.com/your/repo.git
```

2.Add .env file

3.Build project

```
docker-compose build
```
4.Start project

```
docker-compose up -d
```