#! /usr/bin/env node
//shebang for script execution in npm

import inquirer from "inquirer";
import chalk from "chalk";

let todos = [];

let conditions = true;

while (conditions) {
  let addTask = await inquirer.prompt([
    {
      name: "todo",
      type: "input",
      message: chalk.bold.blueBright(
        "What you want to add in your Todos list?"
      ),
    },
    {
      name: "addMore",
      type: "confirm", //answer in yes or no
      message: chalk.bold.magentaBright("Do you want to add more?"),
      default: "false",
    },
  ]);

  todos.push(addTask.todo);

  console.log(chalk.cyan(todos));

  conditions = addTask.addMore;

  if (addTask.addMore) {
    let tododeleted = await inquirer.prompt([
      {
        name: "delete",
        type: "confirm",
        message: chalk.bold.yellowBright(
          "Do you want to delete anything in todo?" // yes or no
        ),
        default: "false",
      },
    ]);

    if (tododeleted.delete) {
      let deleteAnswer = await inquirer.prompt([
        {
          name: "list",
          message: chalk.bold.greenBright(
            "Choose an element to delete:"
          ),
          type: "options",
          choices: todos,
        },
      ]);
      let index: number = todos.indexOf(deleteAnswer.index);
      todos.splice(index, 1);
      console.log(chalk.red(todos));

      conditions = false;
    }
  }
}
