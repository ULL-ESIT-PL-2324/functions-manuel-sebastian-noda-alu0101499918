#!/usr/bin/env node
const { Complex } = require("{{root}}/src/support-lib.js");  

/* End of support code */


let $f;

$f = function($a) {
    return $a.add(Complex("2"));
};