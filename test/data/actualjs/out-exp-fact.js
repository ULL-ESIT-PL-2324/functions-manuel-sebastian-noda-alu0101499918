#!/usr/bin/env node
const { print, Complex, factorial } = require("{{root}}/src/support-lib.js");  

/* End of support code */


print(Complex("2").pow(factorial(Complex("3"))));