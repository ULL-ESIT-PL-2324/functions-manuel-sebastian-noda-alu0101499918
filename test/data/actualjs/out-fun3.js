#!/usr/bin/env node
const { Complex, print } = require("{{root}}/src/support-lib.js");  

/* End of support code */


let $sum, $r;

($sum = function($n) {
    return function($x) {
        return $n.add($x);
    };
}, $r = $sum(Complex("4"))(Complex("5"))), print($r);