const Operadores = {
  add: '+',
  mul: '*',
  div: '/',
  equals: '==',
  pow: '**',
  neg: '-'
};

for (const op in Operadores) {
  /**
   * Extiende el prototipo del objeto Boolean para lanzar un error para operadores no admitidos.
   * @param {*} other - El otro operando.
   * @throws {Error} - Lanza un error indicando la operación no admitida.
   */
  Boolean.prototype[op] = function (other) {
    throw new Error(`"${Operadores[op]}" no admitido para ${other}`);
  };

  /**
   * Extiende el prototipo del objeto Function para manejar diferentes tipos de operandos.
   * @param {*} other - El otro operando.
   * @returns {Function} - Devuelve una función que realiza la operación.
   * @throws {Error} - Lanza un error si la operación no es admitida para el operando.
   */
  Function.prototype[op] = function (other) {
    switch (typeof other) {
      case 'boolean':
        return (...x) => this(...x)[op](Number(other));
      case 'object':
        if (other instanceof Complex) {
          return (...x) => this(...x)(op)(other);
        } else {
          throw new Error(`Operación no admitida para ${other}`);
        }
      case 'function':
        try {
          return (...x) => this(...x)[op](other(...x));
        } catch (e) {
          throw new Error(`Operación no admitida para la función ${other}`);
        }
      default:
        throw new Error(`Operación no admitida para el tipo ${typeof other}`);
    }
  };
}