const { $ } = require('./utils.js')

/**
 * @desc Builds the root node of the AST
 * @param {*} child
 */
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

/**
 * @desc Builds a literal node of the AST
 * @param {*} value 
 */
function buildLiteral(value) {
  return {
    type: "Literal",
    value: String(value),
    raw: `"${value}"`, // Recast compatibility!! escodegen does not need the extra quotes
  };
}

/**
 * @desc Builds a binary expression node of the AST
 * @param {*} left 
 * @param {*} op 
 * @param {*} right 
 */
function buildBinaryExpression(left, op, right) {
  return {
    type: "BinaryExpression",
    left: left,
    operator: op,
    right: right,
  };
}

/**
 * @desc Builds a call expression node of the AST
 * @param {*} functionName 
 * @param {*} arguments 
 * @param {*} reservedWord 
 */
function buildCallExpression(functionName, arguments, reservedWord = false) {
  return {
    type: "CallExpression",
    callee: {
      type: "Identifier",
      name: reservedWord ? functionName : $(functionName)
    },
    arguments: arguments
  }
}

/**
 * @desc Builds a unary expression node of the AST
 * @param {*} op 
 * @param {*} argument 
 * @param {*} prefix 
 */
function buildUnaryExpression(op, argument, prefix) {
  return {
    type: "UnaryExpression",
    operator: op,
    argument: argument,
    prefix: prefix,
  };
}

/**
 * @desc Builds an identifier or calls node of the AST
 * @param {*} name 
 * @param {*} calls 
 */
function buildIdentifierOrCalls(name, calls) {
  let id = {
    type: "Identifier",
    name: name,
  };
  if (calls.length === 0) {
    return id;
  }
  debugger;
  let node = id;
  calls.forEach(ast => {
    let parent = {
      type: "CallExpression",
      callee: node,
      arguments: ast === null? [] : [ast],
    };
    node = parent;
  });
  return node;
}

/**
 * @desc Builds an identifier node of the AST
 */
function buildIdentifier(name) {
  return {
    type: "Identifier",
    name: name,
  };
}

/**
 * @desc Builds a variable declaration node of the AST
 * @param {*} declarations 
 */
function buildVariableDeclaration(declarations) {
  return {
    type: "VariableDeclaration",
    declarations: declarations,
    kind: "let",
  };
}

/**
 * @desc Builds a variable declarator node of the AST
 * @param {*} id 
 */
function buildVariableDeclarator(id) {
  return {
    type: "VariableDeclarator",
    id: id,
    init: null,
  };
}

/**
 * @desc Builds an assignment expression node of the AST
 * @param {*} name 
 * @param {*} operator 
 * @param {*} right 
 */
function buildAssignmentExpression(name, operator, right) {
  return {
    type: "AssignmentExpression",
    operator,
    left: buildIdentifier(name),
    right: right,
  };
}

/**
 * @desc Builds a sequence expression node of the AST
 * @param {*} expressions 
 */
function buildSequenceExpression(expressions) {
  return {
    type: "SequenceExpression",
    expressions: expressions,
  };
}

/**
 * @desc Builds a call member expression node of the AST
 * @param {*} caller
 * @param {*} names
 * @param {*} args
 */
function buildCallMemberExpression(caller, names, args) {
  let namesList = names.split('.');
  return {
    type: "CallExpression",
    callee: buildMemberExpression(caller, namesList),
    arguments: args,
  };
}

/**
 * @desc Builds a member expression node of the AST
 * @param {*} caller 
 * @param {*} names 
 */
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

/**
 * @desc Builds a min call expression node of the AST
 * @param {*} left
 * @param {*} right
 * @param {*} reservedWord
 */
function buildMin(left, right, reservedWord = false) {
  return buildCallExpression('min', [left, right], reservedWord);
}

/**
 * @desc Builds a max call expression node of the AST
 * @param {*} left 
 * @param {*} right 
 * @param {*} reservedWord 
 */
function buildMax(left, right, reservedWord = false) {
  return buildCallExpression('max', [left, right], reservedWord);
}

/**
 * @desc Builds a logical expression node of the AST
 * @param {*} left
 * @param {*} operator
 * @param {*} right
 */
function buildLogicalExpression(left, operator, right) {
  return {
    type: "LogicalExpression",
    left: left,
    operator: operator,
    right: right,
  };
}

/**
 * @desc Builds a function expression node of the AST
 * @param {*} params 
 * @param {*} exp 
 */
function buildFunctionExpression(params, exp) {
  return {
    type: "FunctionExpression",
    id: null,
    params: params,
    body: {
      type: "BlockStatement",
      body: [
        {
          type: "ReturnStatement",
          argument: exp
        }
      ]
    },
    generator: false,
    async: false,
    expression: false
  }
}

/**
 * @desc Builds an identifier call expression node of the AST
 * @param {*} id 
 * @param {*} calls 
 */
function buildIdCalls(id, calls) {
  let n = buildIdentifier(id); /// Para construir el nodo callee
  calls.forEach(args => {
    let parent = {
      type: "CallExpression",
      callee: n,
      arguments: args,
    }
    n = parent;
  });
  return n;
}

/**
 * @des Build an identifier node of the AST
 * @param {*} name 
 */
function buildIdentifier(name) {
  return {
    type: "Identifier",
    name: name,
  };
}

module.exports = {
  buildRoot,
  buildBinaryExpression,
  buildLiteral,
  buildCallExpression,
  buildUnaryExpression,
  buildIdentifierOrCalls,
  buildVariableDeclaration,
  buildVariableDeclarator,
  buildAssignmentExpression,
  buildSequenceExpression,
  buildCallMemberExpression,
  buildMemberExpression,
  buildMin,
  buildMax,
  buildIdentifier,
  buildLogicalExpression,
  buildFunctionExpression,
  buildIdCalls
}