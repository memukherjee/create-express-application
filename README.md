# create-express-application 🛠️

A zero-config CLI tool to bootstrap a modern Express.js server with support for JavaScript or TypeScript, environment variables, code formatting, and project scaffolding.

## ✨ Features

- 📦 One-command project setup
- ⚙️ Support for **JavaScript** or **TypeScript**
- 🔄 Auto-generated folder structure: `routes`, `controllers`, `middlewares`, `utils`, `models`
- 🌐 CORS and dotenv support
- 🎨 ESLint + Prettier config scaffolding
- 🧪 Ready for Git with optional `git init`

## 📥 Installation

```bash
npx create-express-application
```
Or clone it locally:
```bash
git clone https://github.com/your-org/create-express-app.git
cd create-express-app
npm install
npm link
```
## 🚀 Usage

Run the CLI and follow prompts:
```bash
npm create express-application@latest
```
It will ask:

- Project name
- Preferred language: JavaScript or TypeScript
- Include .env support?
- Initialize Git repo?

## 🗂️ Generated Project Structure
```
your-project/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.ts|js
├── .env
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── package.json
├── tsconfig.json (if TypeScript)
└── README.md
```
## 🔧 Scripts
```bash
npm run dev   # Starts the dev server (with watch mode)
npm start     # Starts the compiled JS server
npm run build # TypeScript only: compiles to dist/
```
## 📘 License
ISC
