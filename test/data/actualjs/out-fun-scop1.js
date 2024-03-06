
($f = function($a) {
    let $x;
    return $x = $a.add(Complex("2")), Complex("3").mul($x);
}, $b = $f(Complex("4"))), print($b);