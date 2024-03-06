/**
 * @file debug.js
 * @brief Contiene una función para imprimir objetos de forma detallada.
 */

const util = require('util')

/**
 * @brief Imprime un objeto de forma detallada.
 *
 * Esta función utiliza la función `util.inspect` para imprimir un objeto de forma detallada,
 * mostrando todas sus propiedades y subpropiedades hasta la profundidad especificada.
 *
 * @param {any} x - El objeto que se desea imprimir.
 * @return {string} Una representación detallada del objeto.
 */
const deb = x => util.inspect(x, { depth: null })

// Se exporta la función para su uso en otros módulos.
module.exports = {
  deb,
}

