#!/usr/bin/env node
const { print, factorial, Complex } = require("{{root}}/src/support-lib.js");  

/* End of support code */


print(factorial(Complex("3")).sub(Complex("1")));