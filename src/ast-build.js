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
  return {
    type: "VariableDeclaration",
    declarations: declarations,
    kind: "let",
  };
}

function buildVariableDeclarator(id) {
  return {
    type: "VariableDeclarator",
    id: id,
    init: null,
  };
}

function buildAssignmentExpression(name, operator, right) {
  return {
    type: "AssignmentExpression",
    operator,
    left: buildIdentifier(name),
    right: right,
  };
}

function buildSequenceExpression(expressions) {
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
  let namesList = names.split('.');
  return {
    type: "CallExpression",
    callee: buildMemberExpression(caller, namesList),
    arguments: args,
  };
}

function buildMemberExpression(caller, names) {
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
  // Write you code here
}

function buildFunctionExpression(params, exp) {
  return {
    type: "FunctionExpression",
    id: null,
    params: params,
    body: {
      type: "BlockStatement",
      body:[
        {
          "type": "ReturnStatement",
          "argument": {
            "type": "Identifier",
            "name": "$b"
          }
        }
      ],
    },
    generator: false,
    async: false,
    expression: false,
  };
}

function buildIdCalls (id, calls) {
 let n = buildIdentifier(id);
  n = {
    type: "CallExpression",
    callee: n,
    arguments: calls[0]
  };
  return n;
}

function buildIdentifierOrCalls(name, calls) {
  let id = {
    type: "Identifier",
    name: name,
  };
  if(calls.length === 0) return id;

  debugger;
  let node = id;
  calls.forEach(ast => {
    let parent = {
      type: "CallExpression",
      callee: node,
      arguments: ast === null? [] : [ ast ],
    };
    node = parent;
  });
  return node;
}

module.exports = {
  buildRoot,
  buildBinaryExpression,
  buildLiteral,
  buildCallExpression,
  buildUnaryExpression,
  buildVariableDeclaration,
  buildVariableDeclarator,
  buildIdentifierOrCalls,
  buildAssignmentExpression,
  buildSequenceExpression,
  buildCallMemberExpression,
  buildMin,
  buildMax,
  buildLogicalExpression,
  buildFunctionExpression,
  buildIdCalls
  // export whatever you need
}