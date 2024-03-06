#!/usr/bin/env node
const { Complex, print } = require("{{root}}/src/support-lib.js");  

/* End of support code */


let $a;
$a = Complex("2").mul(Complex("5")).sub(Complex("2").pow(Complex("3"))), print($a);