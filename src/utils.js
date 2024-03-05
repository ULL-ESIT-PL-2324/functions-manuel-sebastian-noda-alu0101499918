const $ = id => '$' + id;

// Convert an ast to a json object: the problem is that the ast contains
// sets, which are not serializable. So we convert them to arrays.
const dast2json =  (dAst) => {
  let jsonDAst = dAst;
  jsonDAst.dependencies = Array.from(dAst.dependencies);
  jsonDAst.symbolTable = Array.from(dAst.symbolTable);
  jsonDAst.used = Array.from(dAst.used);

  return jsonDAst;
}

function difference(setA, setB) {
  const _difference = new Set(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

function RegexpFromNames(names) {
  // Escape regexp special characters
  let escaped = names.map(n => n.replace(/[$*.^]/, '[$&]')) 
  return new RegExp('\\b'+escaped.join('|')+'\\b');
}

module.exports = {
  $, 
  dast2json,
  difference,
  RegexpFromNames
};