#!/usr/bin/env node
const { Complex, print } = require("/home/usuario/practicas/practica_5/functions-manuel-sebastian-noda-alu0101499918/src/support-lib.js");let $f, $b;

($f = function($a) {
    return $a.add(Complex("2"));
}, $b = $f(Complex("4"))), print($b);