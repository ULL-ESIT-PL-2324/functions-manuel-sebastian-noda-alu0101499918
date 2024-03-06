let $a;

$a = max(
    Complex("2").add(Complex("4")),
    min(Complex("3"), Complex("5").sub(Complex("i")))
), print($a);