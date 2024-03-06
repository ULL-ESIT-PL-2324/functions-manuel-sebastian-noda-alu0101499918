let Operators = {
  add: '+',
  mul: '*',
  div: '/',
  equals: '==',
  pow: '**',
  neg: '-'
};

for (let op in Operators) {
  Boolean.prototype[op] = function (other) {
    throw new Error(`Unsupported "${Operators[op]}" for ${other}`)
  };
  Function.prototype[op] = function (other) {
    switch (typeof other) {
      case 'boolean':
        return (...x) => this(...x)[op](Number(other))
      case 'object':
        if (other instanceof Complex) {
          return (...x) => this(...x)(op)(other)
        } else {
          throw new Error(`Unsupported ${op} for ${other}`)
        }
      case 'function':
        try {
          return (...x) => this(...x)[op](other(...x))
        } catch (e) {
          throw new Error(`Unsupported ${op} for function ${other}`)
        }
      default:
        throw new Error(`Unsupported ${op} for type ${typeof other}`)
    }
  }
}