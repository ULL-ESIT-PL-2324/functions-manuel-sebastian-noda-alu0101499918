/**
 * @file monkey-patch.js
 * @brief Contiene las modificaciones del prototipo de la clase Complex.
 */

// Se incluye el archivo 'monkey-patch.js' para realizar parches al prototipo de la clase.
require('./monkey-patch.js');

// Se importa la clase Complex desde el módulo 'complex.js'.
let Complex = require('complex.js');

/**
 * @brief Agrega el método lessThan al prototipo de la clase Complex.
 *
 * Este método determina si el número complejo actual es menor que otro número complejo dado.
 *
 * @param {Complex} other - El otro número complejo a comparar.
 * @return {boolean} true si el número complejo actual es menor que el otro, de lo contrario, false.
 */
Complex.prototype.lessThan = function (other) {
  if (this.re < other.re) return true;
  if (this.re == other.re && this.im < other.im) return true;
  return false;
}

// Se define un conjunto de operadores que se parchearán en el prototipo de la clase Complex.
let Operators = new Set(['add', 'sub', 'mul', 'div', 'equals', 'pow', 'neg', 'lessThan', 'abs'])

// Se crea un objeto para almacenar las implementaciones antiguas de los métodos parcheados.
let oldComplex = Object.create(null);

// Se realiza el parcheo de los operadores en el prototipo de la clase Complex.
for (let op of Operators) {
  // Se almacena la implementación antigua del operador actual.
  oldComplex[op] = Complex.prototype(op);

  // Se sobrescribe el método del operador actual en el prototipo de Complex.
  Complex.prototype[op] = function (other) {
    try {
      // Si el otro operando es una función, se realiza la operación con ella.
      if (typeof other === 'function') return other[op](this);

      // Si el otro operando es un booleano, se aplica el operador correspondiente al número complejo actual.
      if (typeof other === 'boolean') return this[op][Complex(Number(other))];

      // Se llama a la implementación antigua del operador actual.
      return oldComplex[op].call(this, other);
    } catch(e) {
      // Se lanza un error si el operador no es soportado para el tipo de dato proporcionado.
      throw new Error(`Complex numbers do not support ${op} for ${other}\n${e}`)
    }
  }
}

/**
 * @brief Agrega el método call al prototipo de la clase Complex.
 *
 * Este método devuelve el número complejo actual.
 *
 * @param {any} other - Cualquier valor, ya que este método simplemente devuelve el número complejo actual.
 * @return {Complex} El número complejo actual.
 */
Complex.prototype.call = function (other) {
  return this
}

// Se exporta la clase Complex con los parches aplicados.
module.exports = Complex;


