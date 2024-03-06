#!/usr/bin/env node
const { Complex, print, factorial } = require("{{root}}/src/support-lib.js");  

/* End of support code */


(Complex("2"), Complex("3").pow(Complex("2"))), print(factorial(Complex("4")));