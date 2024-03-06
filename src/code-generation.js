const recast = require("recast");
const path = require('path');
const PredefinedNames = Object.keys(require('./support-lib.js'));

let template = (dependencies) =>
`#!/usr/bin/env node
const { ${dependencies} } = require("{{root}}/src/support-lib.js");  
\n/* End of support code */\n\n
`;

module.exports = function codeGen(ast) {
  let dependecies = Array.from(ast.dependencies).join(", ");
  let preamble = template(dependecies);
  let output = preamble + recast.print(ast.ast).code;
  return output;
}