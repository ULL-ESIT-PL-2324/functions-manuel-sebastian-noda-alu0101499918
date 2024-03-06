
let $x, $f, $b;

((($x = Complex("10"), $f = function($a) {
    let $x;
    return $x = $a.add(Complex("2i")), Complex("3i").mul($x);
}), $b = $f(Complex("4"))), print($b)), print($x);