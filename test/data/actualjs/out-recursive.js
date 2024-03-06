#!/usr/bin/env node
const { Complex, print } = require("{{root}}/src/support-lib.js");  

/* End of support code */


let $fact;

$fact = function($n) {
    return $n.equals(Complex("0")) && Complex("1") || $n.mul($fact($n.sub(Complex("1"))));
}, print($fact(Complex("4")));