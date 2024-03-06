#!/usr/bin/env node
const { print, Complex } = require("{{root}}/src/support-lib.js");  

/* End of support code */


print(Complex("3").sub(Complex("6i")).sub(Complex("2i")));