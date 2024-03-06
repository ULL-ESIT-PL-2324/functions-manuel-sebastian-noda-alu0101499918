#!/usr/bin/env node
const { print, Complex } = require("{{root}}/src/support-lib.js");  

/* End of support code */


print(Complex("1").neg().pow(Complex("0.5")));