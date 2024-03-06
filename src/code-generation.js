/**
 * @fileOverview
 * This module defines a function for generating code using the provided Abstract Syntax Tree (AST).
 * It utilizes the 'recast' library for printing the AST back into JavaScript code.
 *
 * @module codeGen
 */

const recast = require("recast");
const path = require('path');

/**
 * Generates JavaScript code based on the provided Abstract Syntax Tree (AST).
 *
 * @function
 * @param {Object} ast - The Abstract Syntax Tree (AST) representing the parsed code.
 * @param {Set} ast.dependencies - Set containing dependencies used in the code.
 * @returns {string} - The generated JavaScript code as a string.
 */
module.exports = function codeGen(ast) {
  // Define the full path to the support library file
  let fullPath = path.join(__dirname, 'support-lib.js');

  // Convert the set of dependencies into a comma-separated string
  let dependencies = Array.from(ast.dependencies).join(", ");

  // Create the preamble using the template function
  let preamble = template(dependencies, fullPath);

  // Combine the preamble and the printed AST code
  let output = preamble + recast.print(ast.ast).code;

  // Return the generated JavaScript code
  return output;
};
/**
 * Generates a template for the code preamble with specified dependencies and full path.
 *
 * @function
 * @param {string} dependencies - Comma-separated string of dependencies.
 * @param {string} fullPath - The full path to the support library file.
 * @returns {string} - The generated code preamble as a string.
 */
const template = (dependencies, fullPath) => `#!/usr/bin/env node
const { ${dependencies} } = require("${fullPath}");`;