const visit = require("ast-types").visit;
const { RegexpFromNames } = require('./utils.js');

// Detect what support functions are used: dependency analysis
function dependencies(dAst) {
  const Support = require("./support-lib.js");
  const nameInSupport = Object.keys(Support);
      
  dAst.dependencies = new Set([]);
  visit(dAst.ast, {
    visitCallExpression(path) {
      const node = path.node;
      let name = node.callee.name;
      if (nameInSupport.includes(name)) {
        dAst.dependencies.add(name);
      }
      this.traverse(path);
    }
  });
  return dAst;
}



const scopeAnalysis = (dAst) => {
  const Scope = require('./scope-class.js');
  let scope = new Scope(null);
  let ast = dAst.ast;

  visit(ast,{
    visitFunctionExpression(path) {
      let node = path.node;
      scope = new Scope(scope);

      let params = node.params;
      for(let param of params) {
        scope.setAsInitialized(param.name);
      }
      this.traverse(path);
      if(scope.length > 0) {
        node.body.body.unshift(scope.buildVariableDeclaration());
      }
      node.scope = scope;
      let d = scope.notDeclaredMessage();
      if(d) console.error(d + 'used in function scope');

      scope = scope.parent;
    },
    visitAssignmentExpression(path) {
      const node = path.node;
      if(node.left.type === "Identifier") {
        let name = node.left.name;
        if(name && !scope.has(name)) {
          if(!dAst.dependencies.has(name)){
            scope.add(name);
          }
        }
      }
      this.traverse(path);
    },
    visitIdentifier(path) {
      let name = path.node.name;
      if(/^[$]/.test(name) && !dAst.dependencies.has(name)) {
        scope.setAsUsed(name);
      }

      this.traverse(path);
    }
  });

  if(scope.length > 0){
    ast.body.unshift(scope.buildDeclaration());
  }

  ast.scope = scope;

  let d = scope.notDeclaredMessage();
  if(d)  console.error(d)

  return dAst;
};


module.exports = {
  scopeAnalysis,
  dependencies,
}