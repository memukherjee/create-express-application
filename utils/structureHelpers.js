const fs = require('fs');
const path = require('path');

function createFolders(basePath, isTS) {
  const folders = ['controllers', 'middlewares', 'models', 'routes', 'utils'];
  folders.forEach(folder => fs.mkdirSync(path.join(basePath, folder)));
}

function createExampleFiles(basePath, isTS) {
  const ext = isTS ? 'ts' : 'js';

  const controllerContent = isTS
    ? `import { Request, Response } from 'express';

export const sayHello = (req: Request, res: Response) => {
  res.send('Hello from Controller!');
};`
    : `exports.sayHello = (req, res) => {
  res.send('Hello from Controller!');
};`;

  const middlewareContent = isTS
    ? `import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, _res: Response, next: NextFunction) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
};`
    : `exports.logger = (req, _res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
};`;

  const modelContent = isTS
    ? `export type User = {
  id: number;
  name: string;
  email: string;
};`
    : `module.exports = {
  users: [],
};`;

  const helperContent = isTS
    ? `export const getGreeting = (name: string): string => {
  return \`Hello, \${name}!\`;
};`
    : `exports.getGreeting = (name) => {
  return \`Hello, \${name}!\`;
};`;

  const routeContent = isTS
    ? `import { Router } from 'express';
import { sayHello } from '../controllers/hello.controller';
import { logger } from '../middlewares/logger.middleware';

const router = Router();

router.use(logger);
router.get('/', sayHello);

export default router;`
    : `const express = require('express');
const { sayHello } = require('../controllers/hello.controller');
const { logger } = require('../middlewares/logger.middleware');

const router = express.Router();

router.use(logger);
router.get('/', sayHello);

module.exports = router;`;

  fs.writeFileSync(path.join(basePath, `controllers/hello.controller.${ext}`), controllerContent);
  fs.writeFileSync(path.join(basePath, `middlewares/logger.middleware.${ext}`), middlewareContent);
  fs.writeFileSync(path.join(basePath, `models/user.model.${ext}`), modelContent);
  fs.writeFileSync(path.join(basePath, `utils/helper.${ext}`), helperContent);
  fs.writeFileSync(path.join(basePath, `routes/index.${ext}`), routeContent);
}

module.exports = {
  createFolders,
  createExampleFiles
};
