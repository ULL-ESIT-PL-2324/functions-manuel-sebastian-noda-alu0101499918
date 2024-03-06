#!/usr/bin/env node
const { factorial, Complex } = require("{{root}}/src/support-lib.js");  

/* End of support code */


factorial(Complex("2")).mul(factorial(Complex("3")));