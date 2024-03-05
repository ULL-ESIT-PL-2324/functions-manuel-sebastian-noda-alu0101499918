#!/usr/bin/env node
const Complex = require("/Users/casianorodriguezleon/campus-virtual/2223/pl2223/practicas/drafts/functions-solution/src/complex.js");  
const print = x => { console.log(x); return x; };
let $f, $b;

($f = function($a) {
    let $x;
    return $x = $a.add(Complex("2")), Complex("3").mul($x);
}, $b = $f(Complex("4"))), print($b);