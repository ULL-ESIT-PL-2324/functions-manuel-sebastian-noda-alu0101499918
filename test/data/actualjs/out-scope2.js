#!/usr/bin/env node
const { Complex, print } = require("{{root}}/src/support-lib.js");  

/* End of support code */


let $a, $b;
($a = Complex("4").add(Complex("i")), print($b)), $b = Complex("2").sub(Complex("2i"));