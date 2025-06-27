
const inquirer = require('inquirer');
const { setupProject } = require('./utils/setupProject');

(async () => {
  console.log('🚀 Welcome to create-express-app CLI!');

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      validate: input => input ? true : 'Project name cannot be empty'
    },
    {
      type: 'list',
      name: 'language',
      message: 'Choose language:',
      choices: ['JavaScript', 'TypeScript']
    },
    {
      type: 'confirm',
      name: 'useDotenv',
      message: 'Include dotenv support?',
      default: true
    },
    {
      type: 'confirm',
      name: 'initGit',
      message: 'Initialize a Git repository?',
      default: true
    }
  ]);

  setupProject(answers.projectName, answers.language, answers.useDotenv, answers.initGit);
})();