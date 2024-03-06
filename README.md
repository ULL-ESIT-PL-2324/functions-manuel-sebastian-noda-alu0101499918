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

# Traduce correctamente las expresiones lógicas

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

# Las operaciones aritméticas entre funciones son soportadas (f+g)(x)

# Es posible operar una función con un número (f+2)(x)

# Los valores booleanos son soportados y se promueven a números y a funciones correctamente

# Los operadores de comparación son soportados

## References

* [Repo ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk)
* [crguezl/hello-jison](https://github.com/crguezl/hello-jison)
* [Espree](https://github.com/eslint/espree)
  * [Options for parse and tokenize methods](https://github.com/eslint/espree#options)
* <a href="https://astexplorer.net/" target="_blank">astexplorer.net demo</a>
* [idgrep.js](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk/blob/master/idgrep.js)
* [Introducción a los Compiladores](https://ull-esit-gradoii-pl.github.io/temas/introduccion-a-pl/esprima.html) con Jison y Espree