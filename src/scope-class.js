const {
  buildIdentifier,
  buildVariableDeclaration,
  buildVariableDeclarator,
} = require('./ast-build');
const { difference } = require('./utils.js');

class Scope {
  constructor(parent) {
    this.parent = parent;
    this.initialized = new Set();
    this.used = new Set();
    this.letDeclarations = [];
  }
  /**
     * Agrega una variable al conjunto de inicializadas y crea una declaración para ella.
     * @param {string} name - El nombre de la variable.
     */
  add(name) {
    this.initialized.add(name);
    this.letDeclarations.push(buildVariableDeclarator(buildIdentifier(name)));
  }
  
   /**
     * Establece una variable como inicializada.
     * @param {string} name - El nombre de la variable.
     */
  setAsInitialized(name) {
    this.initialized.add(name);
  }
  /**
     * Establece una variable como usada.
     * @param {string} name - El nombre de la variable.
     */
  setAsUsed(name) {
    this.used.add(name);
  }
  /**
     * Verifica si una variable está inicializada en el ámbito.
     * @param {string} name - El nombre de la variable.
     * @returns {boolean} - Verdadero si la variable está inicializada, falso en caso contrario.
     */
  has(name) {
    return this.initialized.has(name);
  }
  
  /**
     * Construye una declaración de variable para el ámbito.
     * @returns {ASTNode} - El nodo AST que representa la declaración de variable.
     */
  buildDeclaration() {
    return buildVariableDeclaration(this.letDeclarations);
  }

  lookup(name) {
    if (this.has(name)) return this;
    if (this.parent) return this.parent.lookup(name);
    return null;
  }
  notDeclared() {
    let notDeclared = difference(this.used, this.initialized);
    for (let v of this.used) {
      let s = this.lookup(v);
      if (s) notDeclared.delete(v);
    }
    return notDeclared;
  }
  
  /**
     * Genera un mensaje para las variables que están en uso pero no declaradas.
     * @returns {string|null} - Un mensaje que enumera las variables que están en uso pero no declaradas, o null si todas las variables están declaradas.
     */
  
  notDeclaredMessage() {
    let d = this.notDeclared();
    if (d.size > 0) {
      return Array.from(d).
        map(x => x.replace(/^[$]/, '')).
        map(x => `Not declared variable '${x}'`).join('\n')
    }
    return null;
  }
    /**
     * Obtiene el número de declaraciones de variables en el ámbito.
     * @type {number}
     */
  get length() {
    return this.letDeclarations.length;
  }
  };
  
  module.exports = Scope;