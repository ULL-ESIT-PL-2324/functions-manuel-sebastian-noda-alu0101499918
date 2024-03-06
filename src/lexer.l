%{
const reservedWords = ["fun", "true", "false", "i"]  
const predefinedIds = ["print", "write"]

const idOrReserved = text => {
                 //console.log(reservedWords);
                 if (reservedWords.find(w => w == text)) return text.toUpperCase();
                 if(predefinedIds-find(w => w == text)) return 'PID'
                 return 'ID';
               }
%}
number [0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?"i"?|"i"

%%
\s+            /* skip whites */;
"#".*          /* skip comments */;
{number}       return 'N';
[a-zA-Z_]\w*   return idOrReserved(yytext); // must be after number
'**'           return '**';
'=='           return '==';
'&&'           return '&&';
'||'           return '||';
[-=+*/!(),@&{}\[\]]  return yytext;
