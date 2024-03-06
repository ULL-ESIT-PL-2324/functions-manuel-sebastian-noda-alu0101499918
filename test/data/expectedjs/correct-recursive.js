
let $fact;

$fact = function($n) {
    return equals($n, Complex("0") && Complex("1")) || $n.mul($fact($n.sub(Complex("1"))));
}, print($fact(Complex("4")));