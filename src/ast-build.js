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
    raw: "${value}", // Recast compatibility!! escodegen does not need the extra quotes
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
  let id = {
    type: "Identifier",
    name: name,
  };
  if (calls.length === 0) {
    return id;
  }
  let node = id
  calls.forEach(ast => {
    let parent = {
      type: "CallExpression",
      callee: node,
      arguments: ast == null? [] : [ ast ],
    };
    node = parent;
  });
  return node;
}


function buildIdentifier(name) {
  return buildIdentifierOrCalls(name, []);
}


function buildVariableDeclaration(declarations) {
  // Write you code here
  return {
    type: "VariableDeclaration",
    declarations: declarations,
    kind: "let",
  };
}


function buildVariableDeclarator(id) {
  // Write you code here
  return {
    type: "VariableDeclarator",
    id: id,
    init: null,
  };
}

function buildAssignmentExpression(name, operator, right) {
  // Write you code here
  return {
    type: "AssignmentExpression",
    operator,
    left: buildIdentifier(name),
    right: right,
  };
}

function buildSequenceExpression(expressions) {
  // Write you code here
  return {
    type: "SequenceExpression",
    expressions: expressions,
  };
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
  let namesList = names.split('.');
  return {
    type: "CallExpression",
    callee: buildMemberExpression(caller, namesList),
    arguments: args,
  };
}


function buildMemberExpression(caller, names) {
  // Write you code here
  if (names.length === 1) {
    return {
      type: "MemberExpression",
      property: {
        type: "Identifier",
        name: names.pop()
      },
      object: caller
    };
  }
  return {
    type: "MemberExpression",
    property: {
      type: "Identifier",
      name: names.pop()
    },
    object: buildMemberExpression(caller, names),
  };
}

function buildMin(left, right, reservedWord = false) {
  return buildCallExpression('min', [left, right], reservedWord);
}

function buildMax(left, right, reservedWord = false) {
  return buildCallExpression('max', [left, right], reservedWord);
}

function buildLogicalExpression(left, operator, right) {
  // Write you code here ASTEXPLORER
  return {
    type: "LogicalExpression",
    left: left,
    operator: operator,
    right: right,
  };
}

function buildFunctionExpression(params, exp) {
  // Write you code here
  return {
    type: "FunctionExpression",
    id: null,
    params: params,
    body: {
      type: "BlockStatement",
      body: [
        {
          "type": "ReturnStatement",
          "argument": exp,
        }
      ],
    },
    generator: false,
    async: false,
    expression: false,
  };
}

function buildIdCalls(id, calls) {
  let n = buildIdentifier(id);
  calls.forEach( args => {
    let parent = {
      type: "CallExpression",
      callee: n,
      arguments: args
    }
    n = parent;
  })
  return n;
}

module.exports = {
  buildRoot,
  buildBinaryExpression,
  buildLiteral,
  buildCallExpression,
  buildUnaryExpression,
  buildIdentifier,
  buildIdentifierOrCalls,
  buildVariableDeclaration,
  buildVariableDeclarator,
  buildAssignmentExpression,
  buildSequenceExpression,
  buildCallMemberExpression,
  buildMemberExpression,
  buildMin,
  buildMax,
  buildLogicalExpression,
  buildFunctionExpression,
  buildIdCalls,
}