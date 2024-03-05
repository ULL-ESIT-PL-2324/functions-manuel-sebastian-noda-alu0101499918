const { $ } = require('./utils.js')

function buildRoot(child) {
  return {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: child,
      },
    ],
    sourceType: "script",
  };
}

function buildLiteral(value) {
  return {
    type: "Literal",
    value: value,
    raw: `"${value}"`, // Recast compatibility!! escodegen does not need the extra quotes
  };
}

function buildBinaryExpression(left, op, right) {
  return {
    type: "BinaryExpression",
    left: left,
    operator: op,
    right: right,
  };
}

function buildCallExpression(functionName, arguments, reservedWord = false) {
  return {
    "type": "CallExpression",
    "callee": {
      "type": "Identifier",
      "name": reservedWord ? functionName : $(functionName)
    },
    "arguments": arguments
  }
}

function buildUnaryExpression(op, argument, prefix) {
  return {
    type: "UnaryExpression",
    operator: op,
    argument: argument,
    prefix: prefix,
  };
}

function buildIdentifierOrCalls(name, calls) {
  // Write you code here
}

function buildIdentifier(name) {
  return buildIdentifierOrCalls(name, []);
}

function buildVariableDeclaration(declarations) {
  // Write you code here
}

function buildVariableDeclarator(id) {
  // Write you code here
}

function buildAssignmentExpression(name, operator, right) {
  // Write you code here
}

function buildSequenceExpression(expressions) {
  // Write you code here
}

function buildUnaryExpression(operator, child, prefix = true) {
  return {
    type: "UnaryExpression",
    operator,
    argument: child,
    prefix
  };
}

function buildCallMemberExpression(caller, names, args) {
  // Write you code here
}

function buildMemberExpression(caller, names) {
  // Write you code here
}

function buildMin(left, right, reservedWord = false) {
  return buildCallExpression('min', [left, right], reservedWord);
}

function buildMax(left, right, reservedWord = false) {
  return buildCallExpression('max', [left, right], reservedWord);
}

function buildLogicalExpression(left, operator, right) {
  // Write you code here
}

function buildFunctionExpression(params, exp) {
  // Write you code here
}

module.exports = {
  buildRoot,
  buildBinaryExpression,
  buildLiteral,
  buildCallExpression,
  // export whatever you need
}