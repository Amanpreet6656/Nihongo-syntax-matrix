const assert = require('assert');
const {
  detectVerbGroup,
  conjugateVerb,
  kanaToRomaji,
  constructDateData,
  getDurationKana,
  getImperialEra
} = require('../script.js');

function getForm(result, id) {
  const found = result.forms.find(f => f.id === id);
  assert(found, `Expected form ${id} for ${result.verb}`);
  return found;
}

// 1. Verb classification & Godan -iru/-eru exceptions
assert.strictEqual(detectVerbGroup('書く'), 'godan');
assert.strictEqual(detectVerbGroup('食べる'), 'ichidan');
assert.strictEqual(detectVerbGroup('帰る'), 'godan');
assert.strictEqual(detectVerbGroup('返る'), 'godan');
assert.strictEqual(detectVerbGroup('勉強する'), 'irregular-suru');
assert.strictEqual(detectVerbGroup('来る'), 'irregular-kuru');
assert.strictEqual(detectVerbGroup('擦る'), 'godan');

// 2. Euphonic onbin mutations & no "geminata" string corruption
const matsu = conjugateVerb('待つ', 'auto');
assert.strictEqual(getForm(matsu, 'te').conj, '待って');
assert.strictEqual(getForm(matsu, 'ta').conj, '待った');
assert.strictEqual(getForm(matsu, 'ta').morph.includes('geminata'), false);

const iku = conjugateVerb('行く', 'auto');
assert.strictEqual(getForm(iku, 'te').conj, '行って');
assert.strictEqual(getForm(iku, 'ta').conj, '行った');

const kau = conjugateVerb('買う', 'auto');
assert.strictEqual(getForm(kau, 'nai').conj, '買わない');

const tou = conjugateVerb('問う', 'auto');
assert.strictEqual(getForm(tou, 'te').conj, '問うて');

// 3. Existential ある suppletives & non-productive forms
const aru = conjugateVerb('ある', 'auto');
assert.strictEqual(getForm(aru, 'nai').conj, 'ない');
assert.strictEqual(getForm(aru, 'masen').conj, 'ありません');
assert.strictEqual(getForm(aru, 'potential').conj.startsWith('-'), true);
assert.strictEqual(getForm(aru, 'imperative').conj.startsWith('-'), true);

// 4. Honorific -aru keigo stems
const kudasaru = conjugateVerb('くださる', 'auto');
assert.strictEqual(getForm(kudasaru, 'masu').conj, 'くださいます');
assert.strictEqual(getForm(kudasaru, 'imperative').conj, 'ください');

// 5. Missing kanji readings must not produce corrupted hybrid Romaji
const unknownVerb = conjugateVerb('繋ぐ', 'auto');
assert.strictEqual(getForm(unknownVerb, 'te').read, '');

const knownVerb = conjugateVerb('作る', 'auto');
assert.strictEqual(getForm(knownVerb, 'masu').read, 'つくります');
assert.strictEqual(kanaToRomaji(getForm(knownVerb, 'masu').read), 'tsukurimasu');

// 6. Calendar exceptions, eras, and duration consistency
const oct17 = constructDateData(2026, 10, 17);
assert.strictEqual(oct17.eraData.name, '令和');
assert.strictEqual(oct17.eraData.yearStr, '8年');
assert.strictEqual(constructDateData(2026, 4, 1).monthData.kana, 'しがつ');
assert.strictEqual(constructDateData(2026, 4, 1).dayData.kana, 'ついたち');
assert.strictEqual(constructDateData(2026, 4, 20).dayData.kana, 'はつか');
assert.strictEqual(getDurationKana(1), 'いちにちかん');
assert.strictEqual(getImperialEra(1989, 1, 8).name, '平成');

console.log('PASS: All Nihongo Syntax Matrix tests succeeded.');
