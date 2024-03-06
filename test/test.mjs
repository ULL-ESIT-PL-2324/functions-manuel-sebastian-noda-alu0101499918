import * as util from 'util';
import transpile from "../src/transpile.js";
import assert from 'assert';
import * as fs from "fs";
import {
  dirname
} from 'path';
import {
  fileURLToPath
} from 'url';
//import * as shell from 'shelljs';
import exec from "shelljs.exec"

const __dirname = dirname(fileURLToPath(import.meta.url));
import Tst from './test-description.mjs';

const Test = Tst.map(t => {
  let result = {
    input: __dirname + '/data/input/' + t.input,
    actualjs: __dirname + '/data/actualjs/' + t.actualjs,
    expectedjs: __dirname + '/data/expectedjs/' + t.expectedjs,
    expectedout: false
  };
  if (t.expectedout) {
    result.expectedout = __dirname + '/data/expectedout/' + t.expectedout;
  }
  return result;
})

function removeSpaces(s) {
  return s.replace(/\s/g, '');
}

function removeFolderDependency(s) {
  return s.replace(/const.*?Complex.*?require.*?complex.js".;/, '')
}

function removeDependencies(s) {
  const REGULAR_SEPARATION = /^(.|\n)*\n\/\* End of support code \*\/\n\n/
  const pruned = s.replace(REGULAR_SEPARATION, '')
 
  return removeSpaces(pruned);
}



for (let i = 0; i < Test.length; i++) {
  it(`transpile(${Tst[i].input}, ${Tst[i].actualjs}) (No errors: ${Boolean(Tst[i].expectedout)})`, async () => {
    let actualjs = await transpile(Test[i].input, Test[i].actualjs);  
    let expectedjs = fs.readFileSync(Test[i].expectedjs, 'utf-8')
 
    let trimActualJS = removeDependencies(actualjs)
    let trimExpectedJS = removeDependencies(expectedjs)
    assert.equal(trimActualJS, trimExpectedJS);
  });
}