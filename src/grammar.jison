%{
const { 
  buildRoot, 
  // import the rest of the functions here
} = require('./ast-build');
// Prefix with '$'' all user input variables to avoid collisions with our own compiler variables
const {$} = require('./utils.js')
%}

// Write priority rules
%%
es: e { return { ast: buildRoot($e) }; }
;

e: 
    e ',' e             { $$ = buildSequenceExpression([$e1, $e2])  }
   // write the rest of the rules here
;

// Write the rest of the grammar here