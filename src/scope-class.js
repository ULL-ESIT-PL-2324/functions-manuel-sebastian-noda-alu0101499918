const { buildVariableDeclarator, buildVariableDeclaration, buildIdentifier } = require("./ast-build");

const { difference } = require("./utils");

class Scope {
  constructor(parent) {
    this.parent = parent;
    this.initialized = new Set();
    this.used = new Set();
    this.letDeclaration = [];
  }
  add(name) {
    this.initialized.add(name);
    this.letDeclaration.push(buildVariableDeclarator(buildIdentifier(name)));
  }
  setAsInitialized(name) {
    this.initialized.add(name);
  }
  setAsUsed(name) {
    this.used.add(name);
  }
  has(name) {
    return this.initialized.has(name);
  }
  buildDeclaration() {
    return buildVariableDeclaration(this.letDeclaration);
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
  notDeclaredMessage() {
    let notDeclared = this.notDeclared();
    if (notDeclared.size > 0) {
      return Array.from(notDeclared).
          map(x => x.replace(/^[&]/, '')).
          map(x => `Not declared variable '${x}'`).join('\n');
    }
    return null;
  }
  get length() {
    return this.letDeclaration.length;
  }
}

module.exports = Scope;