#!/usr/bin/env node
const { Complex, print } = require("/home/usuario/practicas/practica_5/functions-manuel-sebastian-noda-alu0101499918/src/support-lib.js");let $fact;

$fact = function($n) {
    return equals($n, Complex("0") && Complex("1")) || $n.mul($fact($n.sub(Complex("1"))));
}, print($fact(Complex("4")));