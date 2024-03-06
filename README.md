[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=14165727)
# Lab Add Functions and extend scope analysis for the complex calculator

# Manuel Jose Sebastian Noda


# Opciones en línea de comandos (-o, -V, -h, etc.)

  Ya teniamos incluidos las opciones de -o y -V, por lo que lo unico que teniamos que hacer era añadir la opcion -h,
  de la misma manera qeu la opcion -o

  program
  .version(version)

  .argument("<filename>", 'file with the original code')

  .option("-o, --output <filename>", "file in which to write the output")

  .option('-h, --help   ','display help for command')

  .action((filename, options) => {

    transpile(filename, options.output);

  });

# Traduce correctamente las expresiones fuente a JS

 Aqui tenemos un ejemplo de como nos muestra el codigo a js del test recursive.
 
```js
let $fact;

$fact = function($n) {
    return $n.equals(Complex("0")) && Complex("1") || $n.mul($fact($n.sub(Complex("1"))));
}, print($fact(Complex("4")));
```

# Traduce correctamente las llamadas encadenadas
Esto se encarga de manejar las  expresioens encadenadas, aparte de mostramr como definimos las llamdas (gramatica de abajo)
  ```js
  | ID calls                            { $$ = buildIdCalls($($ID), $calls); }

  calls: 
    '(' e ')' calls   { $$ = [[$e]].concat($calls); }
  | '(' e ')'         { $$ = [[$e]]; }
  | '('  ')' calls    { $$ = [[]].concat($calls); }
  | '(' ')'           { $$ = [[]]; } /// No hay argumentos
;
```
# Traduce correctamente las expresiones lógicas
  Con estas 2 reglas de la gramaticas podemos tratar los true y falses.
  Siendo de ayuda para el manejo de las expresiones logicas
 ``` js
 | TRUE                                { $$ = buildLiteral(true); } 
 | FALSE                               { $$ = buildLiteral(false); }

  | e '&&' e                            { $$ = buildLogicalExpression($e1, '&&', $e2); }
  | e '||' e                            { $$ = buildLogicalExpression($e1, '||', $e2); }
```
# Se declaran las variables inicializadas en el preámbulo de las funciones o del programa
  Aqui tenemos un ejemplo de la declaracion de las variables
```js
  let $a, $b;
($a = Complex("4").add(Complex("i")), print($b)), $b = Complex("2").sub(Complex("2i"));
```

# Da mensajes de error para variables no declaradas
 Si no declaramos variables como por ejemplo d y c nos saldran estos mensaje.

 Not declared variable 'd'
 Not declared variable 'c'

# Los mensajes de error ayudan a la detección de errores
  Aqui tenemos por ejemplo un error lexico que nos da en el test abs.js
 Lexical error on line 3. Unrecognized text.
 ...-5i,b = 2+a,print(|a|),print(|b|)
 ---------------------^

# Monkey-patch

  Nos permite declarar los operadores qeu vamso a usar, aparte de ser una librerai de apoyo para Complex.
  Ya que lo tendremos que sobreescribir para estea practica.Resibimos el operador, si es un vuleano  con 
  operador espret (esto ...), resive todos los argumentos y retorna una funcion con dichos argumentos sumados(funciones y variables). Con las variables comprueba si son numeros complejos.

# Ha añadido tests suficientes, documentación y cubrimiento

  > scope-intro@1.0.0 test
> npm run compile; mocha test/test.mjs


> scope-intro@1.0.0 compile
> jison src/grammar.jison src/lexer.l -o src/calc.js



  ✔ transpile(test1.calc, out1.js) (No errors: true)

  ✔ transpile(test2.calc, out2.js) (No errors: true)

  ✔ transpile(test3.calc, out3.js) (No errors: true)
  
  ✔ transpile(test5.calc, out5.js) (No errors: true)

  ✔ transpile(test-scope2.calc, out-scope2.js) (No errors: true)

  ✔ transpile(test-power-power.calc, out-power-power.js) (No errors: true)

  ✔ transpile(test-print.calc, out-print.js) (No errors: true)

  ✔ transpile(test-assign1.calc, out-assign1.js) (No errors: true)

  ✔ transpile(test-maxmin.calc, out-maxmin.js) (No errors: true)

  ✔ transpile(test4.calc, out4.js) (No errors: true)

  ✔ transpile(test-mixed.calc, out-mixed.js) (No errors: true)

  ✔ transpile(test-exp.calc, out-exp.js) (No errors: true)

  ✔ transpile(test-exp-fact.calc, out-exp-fact.js) (No errors: true)

  ✔ transpile(test-recursive.calc, out-recursive.js) (No errors: true)

  ✔ transpile(test-id.calc, out-id.js) (No errors: true)

  ✔ transpile(test-comma.calc, out-comma.js) (No errors: true)

  ✔ transpile(test-fun3.calc, out-fun3.js) (No errors: true)
  
  ✔ transpile(test-and.calc, out-and.js) (No errors: true)

  ✔ transpile(test-fact-fact.calc, out-fact-fact.js) (No errors: true)

  ✔ transpile(test-fun2.calc, out-fun2.js) (No errors: true)

  ✔ transpile(test-fun1.calc, out-fun1.js) (No errors: true)

  21 passing (141ms)

# Se publica la documentación usando un static generator, API docs y Covering
 [enlace](https://ull-esit-pl-2324.github.io/functions-manuel-sebastian-noda-alu0101499918/)



## References

* [Repo ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk)
* [crguezl/hello-jison](https://github.com/crguezl/hello-jison)
* [Espree](https://github.com/eslint/espree)
  * [Options for parse and tokenize methods](https://github.com/eslint/espree#options)
* <a href="https://astexplorer.net/" target="_blank">astexplorer.net demo</a>
* [idgrep.js](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk/blob/master/idgrep.js)
* [Introducción a los Compiladores](https://ull-esit-gradoii-pl.github.io/temas/introduccion-a-pl/esprima.html) con Jison y Espree