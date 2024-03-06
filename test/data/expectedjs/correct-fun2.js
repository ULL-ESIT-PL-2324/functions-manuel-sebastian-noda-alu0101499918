
let $f, $b;

($f = function($a) {
    return $a.add(Complex("2"));
}, $b = $f(Complex("4"))), print($b);