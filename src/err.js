/**
 * @file errorMsg.js
 * @brief Define una función para imprimir un mensaje de error detallado.
 */

/**
 * @brief Imprime un mensaje de error detallado y finaliza el proceso.
 *
 * Esta función imprime un mensaje de error detallado que incluye información sobre la regla de análisis,
 * el token encontrado, la posición del token en el código fuente y el contenido de la línea donde se encontró.
 * Luego, finaliza el proceso con un código de salida 1.
 *
 * @param {object} options - Un objeto que contiene la información del error.
 * @param {string} options.rule - La regla de análisis que generó el error (opcional).
 * @param {string} options.token - El token que generó el error.
 * @param {number} options.first_line - El número de línea donde comienza el token.
 * @param {number} options.first_column - La columna donde comienza el token en la primera línea.
 * @param {number} options.last_line - El número de línea donde termina el token.
 * @param {number} options.last_column - La columna donde termina el token en la última línea.
 */
module.exports = function errorMsg({rule, token, first_line, first_column, last_line, last_column}) {
  
  // Se determina hasta qué punto se debe mostrar del token (hasta el primer salto de línea o su longitud máxima).
  let upto = token.indexOf('\n');
  if (upto == -1) upto = token.length;
  let prefix = token.slice(0, upto);

  // Se imprime el mensaje de error detallado.
  console.error(
    `Unexpected "${prefix}" at line ${first_line} column ${first_column} of input: "${errorMsg.input}"`);
  if (rule) console.error(`Rule: ${rule}`);
  
  // Se finaliza el proceso con un código de salida 1.
  process.exit(1);
}
