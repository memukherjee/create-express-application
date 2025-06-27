const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const jsTemplate = require('../templates/jsTemplate');
const tsTemplate = require('../templates/tsTemplate');
const { createFolders, createExampleFiles } = require('./structureHelpers');

function setupProject(projectName, language, useDotenv, initGit) {
  const isTS = language === 'TypeScript';
  const projectDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectDir)) {
    console.error('❌ Directory already exists. Please choose a different name.');
    process.exit(1);
  }

  fs.mkdirSync(projectDir);
  process.chdir(projectDir);

  console.log('📦 Initializing npm...');
  execSync('npm init -y', { stdio: 'inherit' });

  console.log('📥 Installing Express and CORS...');
  execSync('npm install express cors', { stdio: 'inherit' });

  if (useDotenv) {
    execSync('npm install dotenv', { stdio: 'inherit' });
  }

  fs.writeFileSync('.gitignore', 'node_modules\ndist\n.env\n');

  fs.writeFileSync('README.md', `# ${projectName}

> Created with [create-express-app](https://github.com/your-org/create-express-app)

## 📦 Setup

\`\`\`bash
npm install
npm run dev
\`\`\`

## 📁 Folder Structure

- \`controllers/\` – Route handlers
- \`routes/\` – Route definitions
- \`middlewares/\` – Custom Express middleware
- \`models/\` – Data models or types
- \`utils/\` – Utility/helper functions

## ✅ Features

- Express.js
- CORS
- ${useDotenv ? 'dotenv support' : 'No dotenv'}
- ${isTS ? 'TypeScript' : 'JavaScript'}

`);

  fs.writeFileSync('.eslintrc.json', JSON.stringify({
    env: { node: true, es2021: true },
    extends: ['eslint:recommended'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    rules: {}
  }, null, 2));

  fs.writeFileSync('.prettierrc', JSON.stringify({
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'es5'
  }, null, 2));

  if (initGit) {
    console.log('🔧 Initializing Git repository...');
    execSync('git init', { stdio: 'inherit' });
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Initial commit"', { stdio: 'inherit' });
  }

  const pkg = JSON.parse(fs.readFileSync('package.json'));

  if (isTS) {
    console.log('🔧 Setting up TypeScript...');
    execSync('npm install -D typescript ts-node-dev @types/node @types/express', { stdio: 'inherit' });

    const tsConfig = {
      compilerOptions: {
        target: 'ES6',
        module: 'commonjs',
        rootDir: './src',
        outDir: './dist',
        esModuleInterop: true,
        strict: true
      }
    };
    fs.writeFileSync('tsconfig.json', JSON.stringify(tsConfig, null, 2));

    pkg.scripts = {
      dev: 'ts-node-dev --respawn --transpile-only src/index.ts',
      build: 'tsc',
      start: 'node dist/index.js'
    };

    fs.mkdirSync('src');
    createFolders('src', true);
    createExampleFiles('src', true);
    fs.writeFileSync('src/index.ts', tsTemplate(useDotenv));
  } else {
    pkg.scripts = {
      dev: 'node --watch --watch-path=src src/index.js',
      start: 'node src/index.js'
    };

    fs.mkdirSync('src');
    createFolders('src', false);
    createExampleFiles('src', false);
    fs.writeFileSync('src/index.js', jsTemplate(useDotenv));
  }

  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));

  if (useDotenv) {
    fs.writeFileSync('.env', 'PORT=3000\n');
  }

  console.log('\n✅ Project created successfully!');
  console.log(`👉 cd ${projectName}`);
  console.log('👉 npm run dev');
}

module.exports = { setupProject };