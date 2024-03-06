#!/usr/bin/env node
const { Complex, print } = require("/home/usuario/practicas/practica_5/functions-manuel-sebastian-noda-alu0101499918/src/support-lib.js");let $sum, $r;

($sum = function($n) {
    return function($x) {
        return $n.add($x);
    };
}, $r = $sum(Complex("4"))(Complex("5"))), print($r);