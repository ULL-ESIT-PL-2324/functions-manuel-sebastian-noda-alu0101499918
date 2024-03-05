#!/usr/bin/env node
const Complex = require("/Users/casianorodriguezleon/campus-virtual/2223/pl2223/practicas/drafts/functions-solution/src/complex.js");  
const print = x => { console.log(x); return x; };
let $x, $f, $b;

((($x = Complex("10"), $f = function($a) {
    let $x;
    return $x = $a.add(Complex("2i")), Complex("3i").mul($x);
}), $b = $f(Complex("4"))), print($b)), print($x);