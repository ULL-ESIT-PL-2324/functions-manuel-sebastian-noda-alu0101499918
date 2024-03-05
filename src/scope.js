const visit = require("ast-types").visit;
const { RegexpFromNames } = require('./utils.js');

// Detect what support functions are used: dependency analysis
function dependencies(dAst) {
  const Support = require("./support-lib.js");
  // Build regexp matching the names of the support functions /factorial|power|min|max|.../
   const patternIsSupport = RegexpFromNames(Object.keys(Support));
      
  dAst.dependencies = new Set([]);
  visit(dAst.ast, {
    visitCallExpression(path) {
      const node = path.node;
      let name = node.callee.name;
      if (patternIsSupport.test(name)) {
        dAst.dependencies.add(name);
      }
      this.traverse(path);
    }
  });

  return dAst;
}

// Builds the set of variables that are initialized in the program
const scopeAnalysis = (dAst) => {
  // Write you code here
};

module.exports = {
  scopeAnalysis,
  dependencies,
}