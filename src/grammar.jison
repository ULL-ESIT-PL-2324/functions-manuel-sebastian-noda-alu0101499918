%{
const { 
  buildRoot, 
  buildBinaryExpression, 
  buildLiteral, 
  buildCallExpression, 
  buildIdentifier,
  buildAssignmentExpression,
  buildSequenceExpression,
  buildCallMemberExpression,
  buildMax,
  buildMin,
  buildFunctionExpression,
  buildIdCalls
  // import the rest of the functions here
} = require('./ast-build');
// Prefix with '$'' all user input variables to avoid collisions with our own compiler variables
const {$, deb} = require('./utils.js')
%}
/* add remaining precedences */
%left ','
%right '='
%nonassoc '&&'
%nonassoc '||'
%left '==' '<'
%left '@'
%left '&'
%left '-' '+'
%left '*' '/'
%nonassoc UMINUS
%right '**'
%left '!'
%%
es: e { return { ast: buildRoot($e) }; }
;

e: 
 
   e ',' e              { $$ = buildSequenceExpression([$e1, $e2]); }
  | ID '=' e            { $$ = buildAssignmentExpression($($ID),'=',$e); }
  | e '@' e             { $$ = buildMax($e1, $e2, true); }
  | e '&' e             { $$ = buildMin($e1, $e2, true); }
  | e '-' e             { $$ = buildCallMemberExpression($e1, 'sub', [$e2]); }
  | e '+' e             { $$ = buildCallMemberExpression($e1, 'add', [$e2]); }
  | e '*' e             { $$ = buildCallMemberExpression($e1, 'mul', [$e2]); }
  | e '/' e             { $$ = buildCallMemberExpression($e1, 'div', [$e2]); }
  | e '**' e            { $$ = buildCallMemberExpression($e1, 'pow', [$e2]); }
  | '!' e               { $$ = buildUnaryExpression('!', $e); }
  | e '<' e             { $$ = buildCallMemberExpression($e1, 'lessThan', [$e2]);}
  | e '==' e            { $$ = buildCallMemberExpression($e1, 'equals', [$e2]); }
  | e '||' e            { $$ = buildLogicalExpression($e1, '||', $e2); }
  | e '&&' e            { $$ = buildLogicalExpression($e1, '&&', $e2); } 
  | TRUE                { $$ = buildLiteral(true); }
  | FALSE               { $$ = buildLiteral(false); }
  | '(' e ')'           { $$ = $2; }
  | '-' e %prec UMINUS  { $$ = buildCallMemberExpression($e, 'neg', []); }
  | e '!'               { $$ = buildCallExpression('factorial', [$e], true); }
  | PID '(' e ')'        { $$ = buildCallExpression($PID, [$e], true);}
  | FUN '(' idorEmpty ')'  '{'e'}' {$$ = buildFunctionExpression($idorEmpty, $e);}
  | ID                  { $$ = buildIdentifier($($ID)); }
  | ID calls            { /*console.error(deb($ID), deb($calls)); process.exit(0);*/
                          buildIdCalls($($ID), $calls);}
  | N                  { $$ = buildCallExpression('Complex',[buildLiteral($N)], true); }
  
;

idorEmpty: /*Empty!*/ {$$ = [];}
  | ID                 { $$ = [buildIdentifier($($ID))]; }

;

calls: '(' e ')' calls {$$ = [[$e]].concat($calls);}
  | '(' ')' calls      {$$ [[]].concat($calls);}
  | '(' e ')'          {$$ = [[$e]];}
  | '(' ')'            {$$ = [null];}
  ;
// Write the rest of the grammar here
