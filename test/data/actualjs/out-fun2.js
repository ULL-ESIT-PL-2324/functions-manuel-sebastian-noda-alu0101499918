#!/usr/bin/env node
const { Complex, print } = require("{{root}}/src/support-lib.js");  

/* End of support code */


let $f, $b;

($f = function($a) {
    return $a.add(Complex("2"));
}, $b = $f(Complex("4"))), print($b);