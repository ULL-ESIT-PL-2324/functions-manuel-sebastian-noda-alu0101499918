#!/usr/bin/env node
const { Complex, print } = require("{{root}}/src/support-lib.js");  

/* End of support code */


let $a, $b;
($a = Complex("4").add(Complex("2")), $b = Complex("5").mul($a)), print($b);