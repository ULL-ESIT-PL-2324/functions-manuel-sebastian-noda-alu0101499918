%{
const { 
  buildRoot, 
  buildBinaryExpression, 
  buildLiteral, 
  buildCallExpression, 
  buildIdentifier,
  buildIdentifierOrCalls,
  buildAssignmentExpression,
  buildSequenceExpression,
  buildCallMemberExpression,
  buildMax,
  buildMin,
  buildFunctionExpression,
  buildLogicalExpression,
  buildIdCalls,
  buildUnaryExpression,
} = require('./ast-build');
const {$} = require('./utils.js')
%}

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
%left '!''|'
%%
es: e { return { ast: buildRoot($e) }; }
;

e: 
    e ',' e             { $$ = buildSequenceExpression([$e1, $e2]); }
  | ID '=' e            { $$ = buildAssignmentExpression($($ID), '=', $e); }

  | e '@' e             { $$ = buildMax($e1, $e2, true); }
  | e '&' e             { $$ = buildMin($e1, $e2, true); }

  | e '-' e             { $$ = buildCallMemberExpression($e1, 'sub', [$e2]); }
  | e '+' e             { $$ = buildCallMemberExpression($e1, 'add', [$e2]); }
  | e '*' e             { $$ = buildCallMemberExpression($e1, 'mul', [$e2]); }
  | e '/' e             { $$ = buildCallMemberExpression($e1, 'div', [$e2]); }
  | e '**' e            { $$ = buildCallMemberExpression($e1, 'pow', [$e2]); }
  | '(' e ')'           { $$ = $2; }
  | '-' e %prec UMINUS  { $$ = buildCallMemberExpression($e, 'neg', []); }
  | e '!'               { $$ = buildCallExpression('factorial', [$e], true); }
  | N                   { $$ = buildCallExpression('Complex',[buildLiteral($N)], true); }

  | '|' e '|'           { $$ = buildCallMemberExpression($e, 'abs', []) }
  | e '||' e            { $$ = buildLogicalExpression($e1, '||', $e2); }
  | e '&&' e            { $$ = buildLogicalExpression($e1, '&&', $e2); } 
  | TRUE                { $$ = buildLiteral(true); }
  | FALSE               { $$ = buildLiteral(false); }
  | e '==' e            { $$ = buildCallMemberExpression($e1, 'equals', [$e2]); }
  | e '<' e             { $$ = buildCallMemberExpression($e1, 'lessThan', [$e2]);}
  | '!' e               { $$ = buildUnaryExpression('!', $e); }

  | PID '(' e ')'       { $$ = buildCallExpression($PID, [$e], true); }
  | FUN '(' idOrEmpty ')' '{' e '}' { $$ = buildFunctionExpression($idOrEmpty, $e); }
  | ID                  { $$ = buildIdentifier($($ID)); }
  | ID calls            { $$ = buildIdCalls($($ID), $calls); }
;

idOrEmpty:              { $$ = []; }
  | ID                  { $$ = [buildIdentifier($($ID))]; }
;

calls: '(' e ')' calls  { $$ = [ [$e] ].concat($calls); }
  | '(' ')' calls       { $$ = [ [] ].concat($calls);}
  | '(' e ')'           { $$ = [ [$e] ]; }
  | '('  ')'            { $$ = [ [] ]; }
;
