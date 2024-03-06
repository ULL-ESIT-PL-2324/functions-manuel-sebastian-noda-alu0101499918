#!/usr/bin/env node
const { Complex } = require("{{root}}/src/support-lib.js");  

/* End of support code */


Complex("9").add(Complex("3i")).div(Complex("3").add(Complex("2i")));