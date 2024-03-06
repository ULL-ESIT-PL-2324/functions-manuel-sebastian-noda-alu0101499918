#!/usr/bin/env node
const { print, factorial, Complex } = require("{{root}}/src/support-lib.js");  

/* End of support code */


print(
    factorial(Complex("2")).pow(factorial(Complex("3")).pow(factorial(Complex("2"))))
);