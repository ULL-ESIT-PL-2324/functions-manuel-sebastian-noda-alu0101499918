%{
const reservedWords = ["fun", "true", "false", "i"]  
const predefinedIds = ["print", "write"]

const idOrReserved = text => {

                 if (reservedWords.find(w => w == text)) return text.toUpperCase();
                 if (predefinedIds.find(w => w == text)) return 'PID'
                 return 'ID';
               }
%}
number [0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?"i"?|"i"

%%
\s+             ;
"#".*           ;
{number}       return 'N';
[a-zA-Z_]\w*   return idOrReserved(yytext); 
'**'           return '**';
'=='           return '==';
'&&'           return '&&';
'||'           return '||';
[-=+*/!(),@&{}\[\]]  return yytext;
