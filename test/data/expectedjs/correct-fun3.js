
let $sum, $r;

($sum = function($n) {
    return function($x) {
        return $n.add($x);
    };
}, $r = $sum(Complex("4"))(Complex("5"))), print($r);