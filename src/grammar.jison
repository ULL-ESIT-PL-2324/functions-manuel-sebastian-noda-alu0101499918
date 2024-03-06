%{
const { 
  buildRoot, 
  buildBinaryExpression, 
  buildUnaryExpression,
  buildLiteral, 
  buildCallExpression, 
  buildAssignmentExpression,
  buildSequenceExpression,
  buildCallMemberExpression,
  buildMax,
  buildMin,
  buildFunctionExpression,
  buildIdentifier,
  buildIdCalls,
  buildLogicalExpression
  // import the rest of the functions here
} = require('./ast-build');
// Prefix with '$'' all user input variables to avoid collisions with our own compiler variables
const { $ } = require('./utils.js')
const { deb } = require('./deb.js')
%}

%left ','
%nonassoc '=='
%left '&&' '||'
%right '='
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
    e ',' e                             { $$ = buildSequenceExpression([$e1, $e2]); }
  | ID '=' e                            { $$ = buildAssignmentExpression($($ID), '=', $e); }
  | e '==' e                            { $$ = buildCallExpression('equals', [$e1, $e2], true);  }
  | e '@' e                             { $$ = buildMax($e1, $e2, true); }
  | e '&' e                             { $$ = buildMin($e1, $e2, true); }
  | e '-' e                             { $$ = buildCallMemberExpression($e1, 'sub', [$e2]); }
  | e '+' e                             { $$ = buildCallMemberExpression($e1, 'add', [$e2]); }
  | e '*' e                             { $$ = buildCallMemberExpression($e1, 'mul', [$e2]); }
  | e '/' e                             { $$ = buildCallMemberExpression($e1, 'div', [$e2]); }
  | e '**' e                            { $$ = buildCallMemberExpression($e1, 'pow', [$e2]); }
  | '-' e %prec UMINUS                  { $$ = buildCallMemberExpression($e, 'neg', []); }
  | '(' e ')'                           { $$ = $2; }
  | '|' e '|'                           { $$ = buildCallExpression('abs', [$e], true); }
  | e '!'                               { $$ = buildCallExpression('factorial', [$e], true); }
  | PID '(' e ')'                       { $$ = buildCallExpression($PID, [$e], true); }
  | N                                   { $$ = buildCallExpression('Complex', [buildLiteral($N)], true); }
  | ID                                  { $$ = buildIdentifier($($ID)); }
  | FUN '(' idOrEmpty ')' '{' e '}'     { $$ = buildFunctionExpression($idOrEmpty, $e); }
  | ID calls                            { $$ = buildIdCalls($($ID), $calls); }
  // | ID calls                         { console.error(deb($ID), deb($calls)); process.exit(0); }
  | TRUE                                { $$ = buildLiteral(true); } 
  | FALSE                               { $$ = buildLiteral(false); }
  | e '&&' e                            { $$ = buildLogicalExpression($e1, '&&', $e2); }
  | e '||' e                            { $$ = buildLogicalExpression($e1, '||', $e2); }
  | '!' e                               { $$ = buildUnaryExpression('!', $e1); }
;

idOrEmpty:
        { $$ = []; } /// Empty! --> Esta regla produce vacío
  | ID  { $$ = [buildIdentifier($($ID))]; }
;

calls: 
    '(' e ')' calls   { $$ = [[$e]].concat($calls); }
  | '(' e ')'         { $$ = [[$e]]; }
  | '('  ')' calls    { $$ = [[]].concat($calls); }
  | '(' ')'           { $$ = [[]]; } /// No hay argumentos
;