// load dictionary objects for kana character sets
const hiraganaChart = {
  vowels: ['a', 'i', 'u', 'e', 'o'],
  rows: [
    { name: 'a', chars: ['あ', 'い', 'う', 'え', 'お'], romaji: ['a', 'i', 'u', 'e', 'o'] },
    { name: 'ka', chars: ['か', 'き', 'く', 'け', 'こ'], romaji: ['ka', 'ki', 'ku', 'ke', 'ko'] },
    { name: 'sa', chars: ['さ', 'し', 'す', 'せ', 'そ'], romaji: ['sa', 'shi', 'su', 'se', 'so'] },
    { name: 'ta', chars: ['た', 'ち', 'つ', 'て', 'と'], romaji: ['ta', 'chi', 'tsu', 'te', 'to'] },
    { name: 'na', chars: ['な', 'に', 'ぬ', 'ね', 'の'], romaji: ['na', 'ni', 'nu', 'ne', 'no'] },
    { name: 'ha', chars: ['は', 'ひ', 'ふ', 'へ', 'ほ'], romaji: ['ha', 'hi', 'fu', 'he', 'ho'] },
    { name: 'ma', chars: ['ま', 'み', 'む', 'め', 'も'], romaji: ['ma', 'mi', 'mu', 'me', 'mo'] },
    { name: 'ya', chars: ['や', '', 'ゆ', '', 'よ'], romaji: ['ya', '', 'yu', '', 'yo'] },
    { name: 'ra', chars: ['ら', 'り', 'る', 'れ', 'ろ'], romaji: ['ra', 'ri', 'ru', 're', 'ro'] },
    { name: 'wa', chars: ['わ', '', '', '', 'を'], romaji: ['wa', '', '', '', 'wo'] },
    { name: 'n', chars: ['ん', '', '', '', ''], romaji: ['n', '', '', '', ''] }
  ]
};

const katakanaChart = {
  vowels: ['a', 'i', 'u', 'e', 'o'],
  rows: [
    { name: 'a', chars: ['ア', 'イ', 'ウ', 'エ', 'オ'], romaji: ['a', 'i', 'u', 'e', 'o'] },
    { name: 'ka', chars: ['カ', 'キ', 'ク', 'ケ', 'コ'], romaji: ['ka', 'ki', 'ku', 'ke', 'ko'] },
    { name: 'sa', chars: ['サ', 'シ', 'ス', 'セ', 'ソ'], romaji: ['sa', 'shi', 'su', 'se', 'so'] },
    { name: 'ta', chars: ['タ', 'チ', 'ツ', 'テ', 'ト'], romaji: ['ta', 'chi', 'tsu', 'te', 'to'] },
    { name: 'na', chars: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'], romaji: ['na', 'ni', 'nu', 'ne', 'no'] },
    { name: 'ha', chars: ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'], romaji: ['ha', 'hi', 'fu', 'he', 'ho'] },
    { name: 'ma', chars: ['マ', 'ミ', 'ム', 'メ', 'モ'], romaji: ['ma', 'mi', 'mu', 'me', 'mo'] },
    { name: 'ya', chars: ['ヤ', '', 'ユ', '', 'ヨ'], romaji: ['ya', '', 'yu', '', 'yo'] },
    { name: 'ra', chars: ['ラ', 'リ', 'ル', 'レ', 'ロ'], romaji: ['ra', 'ri', 'ru', 're', 'ro'] },
    { name: 'wa', chars: ['ワ', '', '', '', 'ヲ'], romaji: ['wa', '', '', '', 'wo'] },
    { name: 'n', chars: ['ン', '', '', '', ''], romaji: ['n', '', '', '', ''] }
  ]
};

// vowel row mappings for godan verb inflection
const godanRowMap = {
  'う': { a: 'わ', i: 'い', u: 'う', e: 'え', o: 'お' },
  'く': { a: 'か', i: 'き', u: 'く', e: 'け', o: 'こ' },
  'ぐ': { a: 'が', i: 'ぎ', u: 'ぐ', e: 'げ', o: 'ご' },
  'す': { a: 'さ', i: 'し', u: 'す', e: 'せ', o: 'そ' },
  'つ': { a: 'た', i: 'ち', u: 'つ', e: 'て', o: 'と' },
  'ぬ': { a: 'な', i: 'に', u: 'ぬ', e: 'ね', o: 'の' },
  'ぶ': { a: 'ば', i: 'び', u: 'ぶ', e: 'べ', o: 'ぼ' },
  'む': { a: 'ま', i: 'み', u: 'む', e: 'め', o: 'も' },
  'る': { a: 'ら', i: 'り', u: 'る', e: 'れ', o: 'ろ' }
};

// verbs ending in -iru or -eru that belong to group 1 godan
const godanExceptions = new Set([
  '帰る', '切る', '入る', '走る', '知る', '要る', '減る', '蹴る',
  '喋る', '限る', '握る', '滑る', '焦る', '照る', '散る', '遮る',
  'かえる', 'きる', 'はいる', 'はしる', 'しる', 'へる', 'ける',
  'しゃべる', 'かぎる', 'にぎる', 'すべる', 'あせる', 'ちる',
  '参る', 'まいる', '混じる', 'まじる', '交じる', '弄る', 'いじる',
  '捻る', 'ひねる', '嘲る', 'あざける', '覆る', 'くつがえる'
]);

// basic kana to romaji dictionary
const kanaToRomajiMap = {
  'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
  'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
  'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
  'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
  'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
  'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
  'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
  'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
  'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
  'わ': 'wa', 'を': 'wo', 'ん': 'n',
  'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
  'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
  'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
  'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
  'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
  'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
  'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
  'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
  'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
  'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
  'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
  'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
  'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
  'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
  'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
  'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo'
};

// dictionary for bilingual ui text
const uiText = {
  en: {
    app_title: 'Nihongo Syntax Matrix',
    app_subtitle: 'Algorithmic Japanese Morphology & Syntax Engine',
    tab_verbs: 'Verb Conjugation Matrix',
    tab_dates: 'Date Grammar Constructor',
    tab_kana: 'Kana Phonology Matrix',
    verb_heading: 'Verbal Inflection Matrix',
    verb_desc: 'Algorithmic morphological decomposition across Godan (Group 1), Ichidan (Group 2), and Irregular (Group 3) verbal paradigms.',
    label_verb_input: 'Dictionary Form (辞書形)',
    label_group_select: 'Verb Class',
    opt_auto: 'Auto-Detect',
    opt_godan: 'Group 1: Godan (五段動詞)',
    opt_ichidan: 'Group 2: Ichidan (一段動詞)',
    opt_suru: 'Group 3: Irregular する (サ変動詞)',
    opt_kuru: 'Group 3: Irregular くる (カ変動詞)',
    label_filter_select: 'Register / Politeness',
    opt_filter_all: 'All Speech Registers',
    opt_filter_plain: 'Plain Form (常体 / だ・である)',
    opt_filter_polite: 'Polite Form (敬体 / です・ます)',
    btn_conjugate: 'Analyze & Conjugate',
    preset_label: 'Canonical Presets:',
    btn_copy_matrix: 'Copy Matrix Text',
    th_form: 'Grammatical Form',
    th_register: 'Register',
    th_conjugated: 'Conjugated Expression',
    th_reading: 'Kana Reading',
    th_romaji: 'Hepburn Romaji',
    th_morpheme: 'Morpheme Shift & Phonology',
    th_syntax: 'Syntactic Function',
    date_heading: 'Calendar & Temporal Syntax Constructor',
    date_desc: 'Structural composition of Japanese date syntax (Year, Month, Day, Weekday), phonological mutations (音便), and particle assignment rules.',
    label_date_picker: 'Interactive Date Selector',
    label_year_input: 'Year (西暦年)',
    label_month_input: 'Month (月)',
    label_day_input: 'Day (日)',
    btn_today: 'Set to Today',
    caption_standard_date: 'Standard Written Format (年月日)',
    caption_phonology_breakdown: 'Component Phonological Breakdown',
    heading_particle_rules: 'Syntactic Constraints & Particle Mechanics',
    rule_badge_ni: 'Temporal Marker に (ni)',
    rule_ni_title: 'Absolute vs Relative Time Rule',
    rule_ni_body: 'The case particle に (ni) marks an absolute, mathematically defined temporal point on the calendar. Conversely, relative temporal nouns (今日, 明日, 来週, 去年) strictly reject に.',
    sub_ni_valid: 'Grammatically required: Fixed calendar coordinate',
    sub_ni_invalid: 'Syntax violation: Relative deictic noun blocks particle に',
    rule_badge_range: 'Span Markers から / まで',
    rule_range_title: 'Temporal Boundaries (Source & Goal)',
    rule_range_body: 'The postpositional particles から (kara) and まで (made) define the initial boundary (ablatival) and terminating boundary (terminative) of an interval.',
    sub_range_desc: 'Bounded interval: From start date until end date',
    rule_badge_counter: 'Calendar Date vs. Duration Counter',
    rule_counter_title: 'Point vs Interval Counter Morphology',
    rule_counter_body: 'A calendar date identifies a precise location on the calendar, whereas duration expressions append the counter interval suffix 間 (kan).',
    sub_counter_point: 'Point on calendar: Archaic \'tsukitachi\' (moon rise)',
    sub_counter_duration: 'Temporal duration: Sino-Japanese reading + 間 suffix',
    synthesizer_title: 'Contextual Sentence Synthesizer',
    synthesizer_desc: 'Generate authentic Japanese sentences integrating the selected date with correct particle case frames.',
    label_predicate: 'Predicate Frame',
    pred_meeting: 'Point in Time: 会議があります (There is a meeting)',
    pred_travel: 'Arrival Point: 日本へ行きます (I will go to Japan)',
    pred_exam: 'Starting Point: 試験が始まります (The exam begins)',
    pred_duration: 'Duration: 滞在します (I will stay)',
    pred_deadline: 'Deadline: レポートを提出します (I will submit the report)',
    kana_heading: 'Gojūon Phonology Matrix & Verb Dan Association',
    kana_desc: 'The classical Japanese phonetic grid (五十音図) mapping the five vowel grades (段: a, i, u, e, o) to Godan verbal stem transformations.',
    kana_explain_title: 'Structural Connection to Godan Inflection',
    kana_explain_p1: 'In Japanese grammatical pedagogy, Godan (五段) literally translates to "five grades" or "five steps". A Group 1 verb shifts its base consonant across all five vowel rows of the syllabary:',
    dan_a: 'あ段 (a-grade): Irrealis stem (未然形) used for negative -nai, passive -reru, and causative -seru. (Note: Endings in -u shift to -wa).',
    dan_i: 'い段 (i-grade): Continuative stem (連用形) used for polite -masu, compound verbs, and noun conversion.',
    dan_u: 'う段 (u-grade): Terminal / Attributive form (終止形 / 連体形), the standard citation or dictionary form.',
    dan_e: 'え段 (e-grade): Imperative (命令形) and Hypothetical stem (仮定形) for conditional -ba and potential verbs.',
    dan_o: 'お段 (o-grade): Volitional stem (意向形) combined with -u (e.g., 書く → 書こう / kakō).',
    kana_legend: '5 Vowel Grades (段) × 10 Consonant Rows (行)',
    footer_sub: 'Offline-First Computational Linguistics & Pedagogical Tool',
    link_home: 'Matrix Home',
    link_privacy: 'Privacy Policy',
    link_terms: 'Terms & Conditions',
    theme_dark: 'DARK',
    theme_light: 'LIGHT',
    lang_btn: '日本語',
    verb_placeholder: 'e.g., 書く, 食べる, 行く, くる...',
    copied_toast: 'Matrix copied to clipboard'
  },
  ja: {
    app_title: '日本語統語行列',
    app_subtitle: '日本語形態素・統語解析アルゴリズムエンジン',
    tab_verbs: '動詞活用行列',
    tab_dates: '日付文法体系',
    tab_kana: '五十音図・音韻行列',
    verb_heading: '動詞活用形態素マトリックス',
    verb_desc: '五段動詞（第1類）、一段動詞（第2類）、不規則動詞（第3類）の形態論的分解および活用語尾変換エンジン。',
    label_verb_input: '辞書形（終止形）入力',
    label_group_select: '動詞分類',
    opt_auto: '自動判別',
    opt_godan: '第1類: 五段動詞',
    opt_ichidan: '第2類: 一段動詞',
    opt_suru: '第3類: サ行変格活用（する）',
    opt_kuru: '第3類: カ行変格活用（くる）',
    label_filter_select: '待遇表現 / スピーチレベル',
    opt_filter_all: '全活用形式を表示',
    opt_filter_plain: '常体のみ（だ・である）',
    opt_filter_polite: '敬体のみ（です・ます）',
    btn_conjugate: '解析・活用実行',
    preset_label: '基準動詞プリセット:',
    btn_copy_matrix: 'マトリックスをコピー',
    th_form: '文法形式・活用形',
    th_register: '待遇',
    th_conjugated: '活用語形',
    th_reading: 'かな表記',
    th_romaji: 'ヘボン式ローマ字',
    th_morpheme: '形態素推移・音便現象',
    th_syntax: '統語的機能・用法',
    date_heading: '暦日・時間統語構成エンジン',
    date_desc: '年月日・曜日の統語構造、音韻変化（促音便・音便変則）、および格助詞「に」の生起制約規則。',
    label_date_picker: '日付選択カレンダー',
    label_year_input: '西暦年',
    label_month_input: '月',
    label_day_input: '日',
    btn_today: '本日の日付を設定',
    caption_standard_date: '標準表記（年月日・和暦）',
    caption_phonology_breakdown: '構成要素の音韻・語彙分解',
    heading_particle_rules: '統語制約と助詞の選択規則',
    rule_badge_ni: '時を表す格助詞「に」',
    rule_ni_title: '絶対時間と相対時間の生起規則',
    rule_ni_body: '格助詞「に」はカレンダー上の固定された絶対的数値時間を表示します。一方、発話時を基準とする相対時間名詞（今日、明日、来週、去年など）には「に」を接続できません。',
    sub_ni_valid: '文法的に必須: 確定暦日座標',
    sub_ni_invalid: '統語違反: 相対時間詞は助詞「に」の接続を阻害',
    rule_badge_range: '範囲の助詞「から」「まで」',
    rule_range_title: '時間境界（起点と着点）',
    rule_range_body: '格助詞・副助詞「から」（起点）および「まで」（限界点）により、時間の区間境界を確定します。',
    sub_range_desc: '限定区間: 開始日から終了日まで',
    rule_badge_counter: '暦日と期間助数詞の区別',
    rule_counter_title: '時点と期間の形態素対立',
    rule_counter_body: 'カレンダー上の特定日（時点）と、持続期間を表す「間（かん）」の付加による語彙対立を厳密に区別します。',
    sub_counter_point: '暦日上の特定日: 古語「月立ち（つきたち）」に由来',
    sub_counter_duration: '継続期間の表示: 漢数詞読み＋接尾辞「間（かん）」',
    synthesizer_title: '文脈例文シンセサイザー',
    synthesizer_desc: '選択された日付と助詞格フレームを適用した自然な日本語文を生成します。',
    label_predicate: '述語フレーム',
    pred_meeting: '時点表示: 会議があります',
    pred_travel: '移動着点: 日本へ行きます',
    pred_exam: '開始起点: 試験が始まります',
    pred_duration: '期間滞在: 滞在します',
    pred_deadline: '提出期限: レポートを提出します',
    kana_heading: '五十音図・母音段と五段活用の対応',
    kana_desc: '古典的な五十音図の母音5段（あ段・い段・う段・え段・お段）と第1類（五段）動詞の語尾変化の完全な対応関係。',
    kana_explain_title: '五段活用と母音段の構造的連動',
    kana_explain_p1: '五段動詞の名称は、語尾の子音が五十音図の5つの母音段すべてを縦断して変化することに由来します。',
    dan_a: 'あ段（未然形）: 否定「〜ない」、受身「〜れる」、使役「〜せる」に接続。（語尾「う」は「わ」に変化）',
    dan_i: 'い段（連用形）: 丁寧「〜ます」、複合動詞、名詞化に接続。',
    dan_u: 'う段（終止形・連体形）: 辞書形、文末終止および体言修飾。',
    dan_e: 'え段（仮定形・命令形）: 条件「〜ば」、命令形、可能動詞化。',
    dan_o: 'お段（意向形）: 意志・勧誘「〜う」に接続（例: 書く → 書こう）。',
    kana_legend: '5母音段 × 10子音行',
    footer_sub: 'オフライン優先・日本語計算形態論学習環境',
    link_home: '行列ホーム',
    link_privacy: 'プライバシーポリシー',
    link_terms: '利用規約',
    theme_dark: 'ダーク',
    theme_light: 'ライト',
    lang_btn: 'English',
    verb_placeholder: '例: 書く、食べる、行く、くる...',
    copied_toast: 'マトリックスをクリップボードにコピーしました'
  }
};

let currentLang = 'en';

// convert hiragana string to romanized string
function kanaToRomaji(kana) {
  // normalize katakana characters to hiragana using unicode offset
  const normalizedKana = Array.from(kana).map(c => {
    const code = c.charCodeAt(0);
    return (code >= 0x30A1 && code <= 0x30F6) ? String.fromCharCode(code - 0x60) : c;
  }).join('');

  let result = '';
  let i = 0;
  while (i < normalizedKana.length) {
    if (normalizedKana[i] === 'ー') {
      const prevChar = result.slice(-1);
      const vowelMap = { 'a': 'ā', 'i': 'ī', 'u': 'ū', 'e': 'ē', 'o': 'ō' };
      if (vowelMap[prevChar]) {
        result = result.slice(0, -1) + vowelMap[prevChar];
      }
      i++;
      continue;
    }

    if (normalizedKana[i] === 'っ') {
      const nextChar = normalizedKana[i + 1];
      if (nextChar) {
        const nextTwo = normalizedKana.slice(i + 1, i + 3);
        const rom = kanaToRomajiMap[nextTwo] || kanaToRomajiMap[nextChar] || '';
        if (rom.length > 0) {
          result += rom.startsWith('ch') ? 't' : rom[0];
        }
      }
      i++;
      continue;
    }

    const twoChars = normalizedKana.slice(i, i + 2);
    if (kanaToRomajiMap[twoChars]) {
      result += kanaToRomajiMap[twoChars];
      i += 2;
      continue;
    }

    const oneChar = normalizedKana[i];
    if (kanaToRomajiMap[oneChar]) {
      let rom = kanaToRomajiMap[oneChar];
      // Inject standard Hepburn apostrophe if 'ん' is followed by a vowel or 'y'
      if (oneChar === 'ん') {
        const nextChar = normalizedKana[i + 1];
        if (nextChar && /^[あいうえおやゆよ]/.test(nextChar)) {
          rom = "n'";
        }
      }
      result += rom;
    } else {
      result += oneChar;
    }
    i++;
  }

  // format long vowels, preserving terminal ou in verbs
  result = result.replace(/ou(?!\b)/g, 'ō').replace(/oo/g, 'ō').replace(/uu/g, 'ū').replace(/aa/g, 'ā').replace(/ee/g, 'ē').replace(/ii/g, 'ī');
  return result;
}

// detect verb class automatically
function detectVerbGroup(verb) {
  const clean = verb.trim();
  const nativeSuruGodan = new Set(['擦る', 'こする', '摩る', 'さする', '揺する', 'ゆする', '掠る', 'かする']);
  if ((clean === 'する' || clean.endsWith('する')) && !nativeSuruGodan.has(clean)) {
    return 'irregular-suru';
  }
  if (clean === 'くる' || clean === '来る' ||
      clean.endsWith('てくる') || clean.endsWith('でくる') ||
      clean.endsWith('て来る') || clean.endsWith('で来る')) {
    return 'irregular-kuru';
  }
  if (!clean.endsWith('る')) {
    return 'godan';
  }
  if (godanExceptions.has(clean)) {
    return 'godan';
  }

  // check sound before ru ending
  if (clean.length >= 2) {
    const prevChar = clean[clean.length - 2];
    const iOrESounds = ['い', 'き', 'ぎ', 'し', 'じ', 'ち', 'ぢ', 'に', 'ひ', 'び', 'ぴ', 'み', 'り',
                        'え', 'け', 'げ', 'せ', 'ぜ', 'て', 'で', 'ね', 'へ', 'べ', 'ぺ', 'め', 'れ'];
    // add common 1-kanji ichidan roots
    const ichidanKanji = ['見', '寝', '着', '似', '煮', '得', '経', '居', '出', '診', '射', '鋳', '干'];
    if (iOrESounds.includes(prevChar) || ichidanKanji.includes(prevChar)) {
      return 'ichidan';
    }
  }

  return 'godan';
}

// generate comprehensive conjugation matrix
function conjugateVerb(inputVerb, manualGroup) {
  const verb = inputVerb.trim();
  if (!verb) return { error: 'Empty input' };

  let group = manualGroup;
  if (!group || group === 'auto') {
    group = detectVerbGroup(verb);
  }

  const results = [];
  const lastChar = verb.slice(-1);
  const baseStem = verb.slice(0, -1);

  // handle irregular suru
  if (group === 'irregular-suru') {
    let prefix = '';
    if (verb.endsWith('する')) {
      prefix = verb.slice(0, -2);
    }
    const isKanji = prefix.length > 0;
    const prefixReading = prefix;

    const forms = [
      { id: 'dict', nameEn: 'Dictionary / Non-Past', nameJa: '辞書形 / 終止形', reg: 'plain', conj: prefix + 'する', read: prefixReading + 'する', stem: prefix, suf: 'する', morph: 'sur-u [Citation]', synEn: 'Present and future plain affirmative', synJa: '現在の習慣、確実な未来' },
      { id: 'masu', nameEn: 'Polite Non-Past (-masu)', nameJa: 'ます形 / 丁寧形', reg: 'polite', conj: prefix + 'します', read: prefixReading + 'します', stem: prefix, suf: 'します', morph: 'shi-masu [Polite]', synEn: 'Polite affirmative statement', synJa: '丁寧な叙述・対話表現' },
      { id: 'nai', nameEn: 'Plain Negative (-nai)', nameJa: '未然形・ない形', reg: 'plain', conj: prefix + 'しない', read: prefixReading + 'しない', stem: prefix, suf: 'しない', morph: 'shi-nai [Negative]', synEn: 'Plain negative assertion', synJa: '日常会話での否定表現' },
      { id: 'masen', nameEn: 'Polite Negative (-masen)', nameJa: 'ません形', reg: 'polite', conj: prefix + 'しません', read: prefixReading + 'しません', stem: prefix, suf: 'しません', morph: 'shi-masen [Polite Neg]', synEn: 'Polite negative statement', synJa: '改まった否定叙述' },
      { id: 'te', nameEn: 'Conjunctive (-te form)', nameJa: 'て形 / 接続形', reg: 'plain', conj: prefix + 'して', read: prefixReading + 'して', stem: prefix, suf: 'して', morph: 'shi-te [Continuative]', synEn: 'Sequential link, requests, continuous state', synJa: '動作の継起、依頼、進行状態' },
      { id: 'ta', nameEn: 'Plain Past (-ta form)', nameJa: 'た形 / 過去形', reg: 'plain', conj: prefix + 'した', read: prefixReading + 'した', stem: prefix, suf: 'した', morph: 'shi-ta [Past/Perfect]', synEn: 'Completed past action or state', synJa: '過去の完了・事象の確定' },
      { id: 'mashita', nameEn: 'Polite Past (-mashita)', nameJa: 'ました形', reg: 'polite', conj: prefix + 'しました', read: prefixReading + 'しました', stem: prefix, suf: 'しました', morph: 'shi-mashita [Polite Past]', synEn: 'Polite completed past', synJa: '丁寧な過去の叙述' },
      { id: 'masen_deshita', nameEn: 'Polite Past Neg (-masen deshita)', nameJa: 'ませんでした形', reg: 'polite', conj: prefix + 'しませんでした', read: prefixReading + 'しませんでした', stem: prefix, suf: 'しませんでした', morph: 'shi-masen deshita', synEn: 'Formal past negation', synJa: '過去の出来事の丁寧な否定' },
      { id: 'nakatta', nameEn: 'Plain Past Negative (-nakatta)', nameJa: 'なかった形', reg: 'plain', conj: prefix + 'しなかった', read: prefixReading + 'しなかった', stem: prefix, suf: 'しなかった', morph: 'shi-nakatta [Past Neg]', synEn: 'Plain past negative assertion', synJa: '日常的な過去否定' },
      { id: 'potential', nameEn: 'Potential Form', nameJa: '可能形', reg: 'plain', conj: prefix + 'できる', read: prefixReading + 'できる', stem: prefix, suf: 'できる', morph: 'dekiru [Suppletive]', synEn: 'Capability, possibility, permission', synJa: '能力可能・状況可能' },
      { id: 'passive', nameEn: 'Passive Form (-reru)', nameJa: '受身形', reg: 'plain', conj: prefix + 'される', read: prefixReading + 'される', stem: prefix, suf: 'される', morph: 's-areru [Passive]', synEn: 'Direct/indirect passive, honorific', synJa: '被動・迷惑受け身・尊敬' },
      { id: 'causative', nameEn: 'Causative Form (-saseru)', nameJa: '使役形', reg: 'plain', conj: prefix + 'させる', read: prefixReading + 'させる', stem: prefix, suf: 'させる', morph: 's-aseru [Causative]', synEn: 'Make or let someone perform action', synJa: '他者への指示・許容' },
      { id: 'imperative', nameEn: 'Imperative Form', nameJa: '命令形', reg: 'plain', conj: prefix + 'しろ', read: prefixReading + 'しろ', stem: prefix, suf: 'しろ', morph: 'shi-ro [Direct Command]', synEn: 'Direct command (spoken)', synJa: '直接命令（日常・指示）' },
      { id: 'volitional', nameEn: 'Volitional Form (-ō)', nameJa: '意向形', reg: 'plain', conj: prefix + 'しよう', read: prefixReading + 'しよう', stem: prefix, suf: 'しよう', morph: 'shi-yō [Intention/Cohortative]', synEn: 'Personal intention, proposal ("Let\'s")', synJa: '話者の意志・共同誘致' },
      { id: 'ba', nameEn: 'Provisional Conditional (-ba)', nameJa: '仮定形・ば形', reg: 'plain', conj: prefix + 'すれば', read: prefixReading + 'すれば', stem: prefix, suf: 'すれば', morph: 'sur-eba [Provisional]', synEn: 'General condition or hypothetical prerequisite', synJa: '論理的条件・仮定' },
      { id: 'tara', nameEn: 'General Conditional (-tara)', nameJa: '条件形・たら形', reg: 'plain', conj: prefix + 'したら', read: prefixReading + 'したら', stem: prefix, suf: 'したら', morph: 'shi-tara [Temporal/Conditional]', synEn: 'Sequence ("When/If... then")', synJa: '時間的継起・個別条件' }
    ];
    return { verb, group, groupLabel: 'Group 3: Irregular する (サ行変格活用)', stem: prefix, ending: 'する', forms };
  }

  // handle irregular kuru
  if (group === 'irregular-kuru') {
    const isKanji = verb.includes('来');
    const prefix = verb.replace(/くる|来る/, '');
    const kStem = isKanji ? '来' : '';

    const forms = [
      { id: 'dict', nameEn: 'Dictionary / Non-Past', nameJa: '辞書形 / 終止形', reg: 'plain', conj: prefix + (isKanji ? '来る' : 'くる'), read: prefix + 'くる', stem: prefix + (isKanji ? '来' : 'く'), suf: 'る', morph: 'ku-ru [Citation]', synEn: 'Affirmative non-past motion toward speaker', synJa: '話者方向への移動' },
      { id: 'masu', nameEn: 'Polite Non-Past (-masu)', nameJa: 'ます形 / 丁寧形', reg: 'polite', conj: prefix + (isKanji ? '来ます' : 'きます'), read: prefix + 'きます', stem: prefix + (isKanji ? '来' : 'き'), suf: 'ます', morph: 'ki-masu [Polite]', synEn: 'Polite arrival or motion', synJa: '丁寧な到来の叙述' },
      { id: 'nai', nameEn: 'Plain Negative (-nai)', nameJa: '未然形・ない形', reg: 'plain', conj: prefix + (isKanji ? '来ない' : 'こない'), read: prefix + 'こない', stem: prefix + (isKanji ? '来' : 'こ'), suf: 'ない', morph: 'ko-nai [Negative stem shift]', synEn: 'Negative non-past (root shifts to ko-)', synJa: '母音変化を伴う否定' },
      { id: 'masen', nameEn: 'Polite Negative (-masen)', nameJa: 'ません形', reg: 'polite', conj: prefix + (isKanji ? '来ません' : 'きません'), read: prefix + 'きません', stem: prefix + (isKanji ? '来' : 'き'), suf: 'ません', morph: 'ki-masen [Polite Neg]', synEn: 'Formal negative motion', synJa: '改まった否定' },
      { id: 'te', nameEn: 'Conjunctive (-te form)', nameJa: 'て形 / 接続形', reg: 'plain', conj: prefix + (isKanji ? '来て' : 'きて'), read: prefix + 'きて', stem: prefix + (isKanji ? '来' : 'き'), suf: 'て', morph: 'ki-te [Continuative]', synEn: 'Sequential link, approaching state', synJa: '継起・接近状態の表現' },
      { id: 'ta', nameEn: 'Plain Past (-ta form)', nameJa: 'た形 / 過去形', reg: 'plain', conj: prefix + (isKanji ? '来た' : 'きた'), read: prefix + 'きた', stem: prefix + (isKanji ? '来' : 'き'), suf: 'た', morph: 'ki-ta [Past]', synEn: 'Completed arrival', synJa: '過去の到着' },
      { id: 'mashita', nameEn: 'Polite Past (-mashita)', nameJa: 'ました形', reg: 'polite', conj: prefix + (isKanji ? '来ました' : 'きました'), read: prefix + 'きました', stem: prefix + (isKanji ? '来' : 'き'), suf: 'ました', morph: 'ki-mashita [Polite Past]', synEn: 'Formal completed arrival', synJa: '丁寧な過去の到着' },
      { id: 'masen_deshita', nameEn: 'Polite Past Neg (-masen deshita)', nameJa: 'ませんでした形', reg: 'polite', conj: prefix + (isKanji ? '来ませんでした' : 'きませんでした'), read: prefix + 'きませんでした', stem: prefix + (isKanji ? '来' : 'き'), suf: 'ませんでした', morph: 'ki-masen deshita', synEn: 'Formal negative past', synJa: '丁寧な過去否定' },
      { id: 'nakatta', nameEn: 'Plain Past Negative (-nakatta)', nameJa: 'なかった形', reg: 'plain', conj: prefix + (isKanji ? '来なかった' : 'こなかった'), read: prefix + 'こなかった', stem: prefix + (isKanji ? '来' : 'こ'), suf: 'なかった', morph: 'ko-nakatta [Past Neg]', synEn: 'Plain past negative', synJa: '日常的な過去否定' },
      { id: 'potential', nameEn: 'Potential Form', nameJa: '可能形', reg: 'plain', conj: prefix + (isKanji ? '来られる' : 'こられる'), read: prefix + 'こられる', stem: prefix + (isKanji ? '来' : 'こ'), suf: 'られる', morph: 'ko-rareru [Potential]', synEn: 'Ability to come', synJa: '来訪可能性・能力' },
      { id: 'passive', nameEn: 'Passive Form (-reru)', nameJa: '受身形', reg: 'plain', conj: prefix + (isKanji ? '来られる' : 'こられる'), read: prefix + 'こられる', stem: prefix + (isKanji ? '来' : 'こ'), suf: 'られる', morph: 'ko-rareru [Adversity Passive]', synEn: 'Adversative passive ("visited upon")', synJa: '迷惑の受身' },
      { id: 'causative', nameEn: 'Causative Form (-saseru)', nameJa: '使役形', reg: 'plain', conj: prefix + (isKanji ? '来させる' : 'こさせる'), read: prefix + 'こさせる', stem: prefix + (isKanji ? '来' : 'こ'), suf: 'させる', morph: 'ko-saseru [Causative]', synEn: 'Cause someone to come', synJa: '他者を来訪させる' },
      { id: 'imperative', nameEn: 'Imperative Form', nameJa: '命令形', reg: 'plain', conj: prefix + (isKanji ? '来い' : 'こい'), read: prefix + 'こい', stem: prefix + (isKanji ? '来' : 'こ'), suf: 'い', morph: 'ko-i [Imperative]', synEn: 'Direct command to come', synJa: '強い呼び寄せ命令' },
      { id: 'volitional', nameEn: 'Volitional Form (-ō)', nameJa: '意向形', reg: 'plain', conj: prefix + (isKanji ? '来よう' : 'こよう'), read: prefix + 'こよう', stem: prefix + (isKanji ? '来' : 'こ'), suf: 'よう', morph: 'ko-yō [Volitional]', synEn: 'Intention to come', synJa: '来訪の意志' },
      { id: 'ba', nameEn: 'Provisional Conditional (-ba)', nameJa: '仮定形・ば形', reg: 'plain', conj: prefix + (isKanji ? '来れば' : 'くれば'), read: prefix + 'くれば', stem: prefix + (isKanji ? '来' : 'く'), suf: 'れば', morph: 'kur-eba [Provisional]', synEn: 'If someone comes', synJa: '仮定条件' },
      { id: 'tara', nameEn: 'General Conditional (-tara)', nameJa: '条件形・たら形', reg: 'plain', conj: prefix + (isKanji ? '来たら' : 'きたら'), read: prefix + 'きたら', stem: prefix + (isKanji ? '来' : 'き'), suf: 'たら', morph: 'ki-tara [Temporal/Conditional]', synEn: 'Once arrival occurs', synJa: '来訪後の継起' }
    ];
    return { verb, group, groupLabel: 'Group 3: Irregular くる (カ行変格活用)', stem: prefix + (isKanji ? '来' : 'く'), ending: isKanji ? 'る' : 'る', forms };
  }

  // handle group 2 ichidan verbs
  if (group === 'ichidan') {
    const stem = baseStem;
    const forms = [
      { id: 'dict', nameEn: 'Dictionary / Non-Past', nameJa: '辞書形 / 終止形', reg: 'plain', conj: stem + 'る', read: stem + 'る', stem, suf: 'る', morph: 'stem + ru [Citation]', synEn: 'Affirmative non-past', synJa: '現在の習慣、将来の事象' },
      { id: 'masu', nameEn: 'Polite Non-Past (-masu)', nameJa: 'ます形 / 丁寧形', reg: 'polite', conj: stem + 'ます', read: stem + 'ます', stem, suf: 'ます', morph: 'stem + masu [Polite]', synEn: 'Polite affirmative statement', synJa: '日常対話における丁寧表現' },
      { id: 'nai', nameEn: 'Plain Negative (-nai)', nameJa: '未然形・ない形', reg: 'plain', conj: stem + 'ない', read: stem + 'ない', stem, suf: 'ない', morph: 'stem + nai [Negative]', synEn: 'Plain negation', synJa: '日常的な否定表現' },
      { id: 'masen', nameEn: 'Polite Negative (-masen)', nameJa: 'ません形', reg: 'polite', conj: stem + 'ません', read: stem + 'ません', stem, suf: 'ません', morph: 'stem + masen [Polite Neg]', synEn: 'Polite negative statement', synJa: '改まった丁寧な否定' },
      { id: 'te', nameEn: 'Conjunctive (-te form)', nameJa: 'て形 / 接続形', reg: 'plain', conj: stem + 'て', read: stem + 'て', stem, suf: 'て', morph: 'stem + te [Continuative]', synEn: 'Sequential link, requests, aspect', synJa: '文の接続、依頼、進行状態' },
      { id: 'ta', nameEn: 'Plain Past (-ta form)', nameJa: 'た形 / 過去形', reg: 'plain', conj: stem + 'た', read: stem + 'た', stem, suf: 'た', morph: 'stem + ta [Past]', synEn: 'Completed past action', synJa: '過去の完了・事象' },
      { id: 'mashita', nameEn: 'Polite Past (-mashita)', nameJa: 'ました形', reg: 'polite', conj: stem + 'ました', read: stem + 'ました', stem, suf: 'ました', morph: 'stem + mashita [Polite Past]', synEn: 'Formal completed past', synJa: '丁寧な過去の叙述' },
      { id: 'masen_deshita', nameEn: 'Polite Past Neg (-masen deshita)', nameJa: 'ませんでした形', reg: 'polite', conj: stem + 'ませんでした', read: stem + 'ませんでした', stem, suf: 'ませんでした', morph: 'stem + masen deshita', synEn: 'Formal negative past', synJa: '丁寧な過去否定' },
      { id: 'nakatta', nameEn: 'Plain Past Negative (-nakatta)', nameJa: 'なかった形', reg: 'plain', conj: stem + 'なかった', read: stem + 'なかった', stem, suf: 'なかった', morph: 'stem + nakatta [Past Neg]', synEn: 'Plain past negation', synJa: '日常的な過去否定' },
      { id: 'potential', nameEn: 'Potential Form', nameJa: '可能形', reg: 'plain', conj: stem + 'られる', read: stem + 'られる', stem, suf: 'られる', morph: 'stem + rareru [Potential]', synEn: 'Ability or possibility', synJa: '能力可能・状況可能' },
      { id: 'passive', nameEn: 'Passive Form (-reru)', nameJa: '受身形', reg: 'plain', conj: stem + 'られる', read: stem + 'られる', stem, suf: 'られる', morph: 'stem + rareru [Passive]', synEn: 'Passive construction, honorific', synJa: '受動態・間接受け身・尊敬' },
      { id: 'causative', nameEn: 'Causative Form (-saseru)', nameJa: '使役形', reg: 'plain', conj: stem + 'させる', read: stem + 'させる', stem, suf: 'させる', morph: 'stem + saseru [Causative]', synEn: 'Compel or permit action', synJa: '他者に動作を行わせる' },
      { id: 'imperative', nameEn: 'Imperative Form', nameJa: '命令形', reg: 'plain', conj: stem + 'ろ', read: stem + 'ろ', stem, suf: 'ろ', morph: 'stem + ro [Imperative]', synEn: 'Direct command', synJa: '命令表現' },
      { id: 'volitional', nameEn: 'Volitional Form (-ō)', nameJa: '意向形', reg: 'plain', conj: stem + 'よう', read: stem + 'よう', stem, suf: 'よう', morph: 'stem + yō [Volitional]', synEn: 'Personal intention, proposal', synJa: '話者の意志・勧誘' },
      { id: 'ba', nameEn: 'Provisional Conditional (-ba)', nameJa: '仮定形・ば形', reg: 'plain', conj: stem + 'れば', read: stem + 'れば', stem, suf: 'れば', morph: 'stem + reba [Provisional]', synEn: 'Hypothetical or general condition', synJa: '仮定条件' },
      { id: 'tara', nameEn: 'General Conditional (-tara)', nameJa: '条件形・たら形', reg: 'plain', conj: stem + 'たら', read: stem + 'たら', stem, suf: 'たら', morph: 'stem + tara [Conditional]', synEn: 'Condition or sequential completion', synJa: '動作完了後の継起' }
    ];
    return { verb, group, groupLabel: 'Group 2: Ichidan (一段動詞)', stem, ending: 'る', forms };
  }

  // handle group 1 godan verbs
  const row = godanRowMap[lastChar] || { a: 'わ', i: 'い', u: 'う', e: 'え', o: 'お' };
  const stem = baseStem;

  // special case for godan verb iku (行く)
  const isIku = (verb.endsWith('行く') || verb.endsWith('いく'));
  const isAru = (verb === 'ある');

  // handle keigo / honorific godan verbs (くださる, なさる, おっしゃる, いらっしゃる, ござる)
  const keigoList = ['くださる', '下さる', 'なさる', '為さる', 'おっしゃる', '仰る', '仰っしゃる', 'いらっしゃる', '居らっしゃる', 'ござる', '御座る'];
  const isKeigo = keigoList.some(k => verb.endsWith(k));
  const iSound = isKeigo ? 'い' : row.i;
  const impSuffix = isKeigo ? 'い' : row.e;

  // calculate sound mutations for te, ta, and tara forms
  let teSuffix = '';
  let taSuffix = '';
  let taraSuffix = '';
  let euphonyNote = '';

  const isTou = (verb === '問う' || verb === 'とう' || verb === '請う' || verb === 'こう');

  if (isIku) {
    // swap ending to -te form with sokuonbin exception
    teSuffix = 'って';
    taSuffix = 'った';
    taraSuffix = 'ったら';
    euphonyNote = '促音便 (Sokuonbin exception for iku)';
  } else if (isTou) {
    teSuffix = 'うて';
    taSuffix = 'うた';
    taraSuffix = 'うたら';
    euphonyNote = 'ウ音便 (U-onbin exception for tou/kou)';
  } else if (lastChar === 'う' || lastChar === 'つ' || lastChar === 'る') {
    teSuffix = 'って';
    taSuffix = 'った';
    taraSuffix = 'ったら';
    euphonyNote = '促音便 (Sokuonbin: assimilation to geminate)';
  } else if (lastChar === 'む' || lastChar === 'ぶ' || lastChar === 'ぬ') {
    teSuffix = 'んで';
    taSuffix = 'んだ';
    taraSuffix = 'んだら';
    euphonyNote = '撥音便 (Hatsuonbin: nasal assimilation with rendaku)';
  } else if (lastChar === 'く') {
    teSuffix = 'いて';
    taSuffix = 'いた';
    taraSuffix = 'いたら';
    euphonyNote = 'イ音便 (I-onbin: vocalization to -i)';
  } else if (lastChar === 'ぐ') {
    teSuffix = 'いで';
    taSuffix = 'いだ';
    taraSuffix = 'いだら';
    euphonyNote = 'イ音便・有声音化 (Voiced I-onbin)';
  } else if (lastChar === 'す') {
    teSuffix = 'して';
    taSuffix = 'した';
    taraSuffix = 'したら';
    euphonyNote = 'サ行摩擦音保持 (Regular palatalization)';
  }

  // negative form calculation
  const naiForm = isAru ? 'ない' : stem + row.a + 'ない';
  const masenForm = isAru ? 'ありません' : stem + iSound + 'ません';
  const nakattaForm = isAru ? 'なかった' : stem + row.a + 'なかった';

  const forms = [
    { id: 'dict', nameEn: 'Dictionary / Non-Past', nameJa: '辞書形 / 終止形', reg: 'plain', conj: verb, read: verb, stem, suf: lastChar, morph: `u-grade: [${lastChar}]`, synEn: 'Affirmative non-past habitual or future', synJa: '現在の習慣、将来の事象' },
    { id: 'masu', nameEn: 'Polite Non-Past (-masu)', nameJa: 'ます形 / 丁寧形', reg: 'polite', conj: stem + iSound + 'ます', read: stem + iSound + 'ます', stem: stem + iSound, suf: 'ます', morph: isKeigo ? 'honorific stem shift [い] + masu' : `i-grade: [${row.i}] + masu`, synEn: 'Polite assertion in formal discourse', synJa: '丁寧な陳述・対話' },
    { id: 'nai', nameEn: 'Plain Negative (-nai)', nameJa: '未然形・ない形', reg: 'plain', conj: naiForm, read: naiForm, stem: isAru ? '' : stem + row.a, suf: isAru ? 'ない' : 'ない', morph: isAru ? 'suppletive [nai]' : `a-grade: [${row.a}] + nai`, synEn: 'Informal negative assertion', synJa: '未然形による否定' },
    { id: 'masen', nameEn: 'Polite Negative (-masen)', nameJa: 'ません形', reg: 'polite', conj: masenForm, read: masenForm, stem: stem + iSound, suf: 'ません', morph: isKeigo ? 'honorific stem shift [い] + masen' : `i-grade: [${row.i}] + masen`, synEn: 'Polite negation', synJa: '丁寧な否定' },
    { id: 'te', nameEn: 'Conjunctive (-te form)', nameJa: 'て形 / 接続形', reg: 'plain', conj: stem + teSuffix, read: stem + teSuffix, stem, suf: teSuffix, morph: euphonyNote, synEn: 'Coordinate conjunction, requests, aspect', synJa: '連用形音便・文の接続' },
    { id: 'ta', nameEn: 'Plain Past (-ta form)', nameJa: 'た形 / 過去形', reg: 'plain', conj: stem + taSuffix, read: stem + taSuffix, stem, suf: taSuffix, morph: euphonyNote.replace('te', 'ta'), synEn: 'Completed past or perfect state', synJa: '過去の完了・事象' },
    { id: 'mashita', nameEn: 'Polite Past (-mashita)', nameJa: 'ました形', reg: 'polite', conj: stem + iSound + 'ました', read: stem + iSound + 'ました', stem: stem + iSound, suf: 'ました', morph: isKeigo ? 'honorific stem shift [い] + mashita' : `i-grade: [${row.i}] + mashita`, synEn: 'Formal completed past', synJa: '丁寧な過去の叙述' },
    { id: 'masen_deshita', nameEn: 'Polite Past Neg (-masen deshita)', nameJa: 'ませんでした形', reg: 'polite', conj: stem + iSound + 'ませんでした', read: stem + iSound + 'ませんでした', stem: stem + iSound, suf: 'ませんでした', morph: isKeigo ? 'honorific stem shift [い] + masen deshita' : `i-grade: [${row.i}] + masen deshita`, synEn: 'Formal past negation', synJa: '丁寧な過去否定' },
    { id: 'nakatta', nameEn: 'Plain Past Negative (-nakatta)', nameJa: 'なかった形', reg: 'plain', conj: nakattaForm, read: nakattaForm, stem: isAru ? '' : stem + row.a, suf: isAru ? 'なかった' : 'なかった', morph: isAru ? 'suppletive [nakatta]' : `a-grade: [${row.a}] + nakatta`, synEn: 'Plain past negative', synJa: '日常的な過去否定' },
    { id: 'potential', nameEn: 'Potential Form', nameJa: '可能形', reg: 'plain', conj: stem + row.e + 'る', read: stem + row.e + 'る', stem: stem + row.e, suf: 'る', morph: `e-grade: [${row.e}] + ru`, synEn: 'Capacity or circumstantial possibility', synJa: '可能動詞化（下一段活用化）' },
    { id: 'passive', nameEn: 'Passive Form (-reru)', nameJa: '受身形', reg: 'plain', conj: stem + row.a + 'れる', read: stem + row.a + 'れる', stem: stem + row.a, suf: 'れる', morph: `a-grade: [${row.a}] + reru`, synEn: 'Passive voice, potential, indirect adversity', synJa: '受動・自発・可能・尊敬' },
    { id: 'causative', nameEn: 'Causative Form (-seru)', nameJa: '使役形', reg: 'plain', conj: stem + row.a + 'せる', read: stem + row.a + 'せる', stem: stem + row.a, suf: 'せる', morph: `a-grade: [${row.a}] + seru`, synEn: 'Induce or permit an agent to act', synJa: '他者への動機付け・強制' },
    { id: 'imperative', nameEn: 'Imperative Form', nameJa: '命令形', reg: 'plain', conj: stem + impSuffix, read: stem + impSuffix, stem, suf: impSuffix, morph: isKeigo ? 'honorific imperative shift [い]' : `e-grade: [${row.e}]`, synEn: 'Strong directive command', synJa: '強い直接命令' },
    { id: 'volitional', nameEn: 'Volitional Form (-ō)', nameJa: '意向形', reg: 'plain', conj: stem + row.o + 'う', read: stem + row.o + 'う', stem: stem + row.o, suf: 'う', morph: `o-grade: [${row.o}] + u`, synEn: 'Speaker resolution or mutual suggestion', synJa: '意志表明・連帯勧誘' },
    { id: 'ba', nameEn: 'Provisional Conditional (-ba)', nameJa: '仮定形・ば形', reg: 'plain', conj: stem + row.e + 'ば', read: stem + row.e + 'ば', stem: stem + row.e, suf: 'ば', morph: `e-grade: [${row.e}] + ba`, synEn: 'General law or prerequisite condition', synJa: '順接仮定条件' },
    { id: 'tara', nameEn: 'General Conditional (-tara)', nameJa: '条件形・たら形', reg: 'plain', conj: stem + taraSuffix, read: stem + taraSuffix, stem, suf: taraSuffix, morph: `ta-stem + ra`, synEn: 'Subsequent result upon completion', synJa: '継起条件・個別状況仮定' }
  ];

  return { verb, group, groupLabel: 'Group 1: Godan (五段動詞)', stem, ending: lastChar, forms };
}

// date grammar rules and calendar phonology module
const japaneseMonths = [
  { num: 1, kanji: '1月', kana: 'いちがつ', romaji: 'ichigatsu', irregular: false, note: 'Regular Sino-Japanese' },
  { num: 2, kanji: '2月', kana: 'にがつ', romaji: 'nigatsu', irregular: false, note: 'Regular Sino-Japanese' },
  { num: 3, kanji: '3月', kana: 'さんがつ', romaji: 'sangatsu', irregular: false, note: 'Regular Sino-Japanese' },
  { num: 4, kanji: '4月', kana: 'しがつ', romaji: 'shigatsu', irregular: true, note: 'Phonological constraint: "shi" mandatory, "yon" barred' },
  { num: 5, kanji: '5月', kana: 'ごがつ', romaji: 'gogatsu', irregular: false, note: 'Regular Sino-Japanese' },
  { num: 6, kanji: '6月', kana: 'ろくがつ', romaji: 'rokugatsu', irregular: false, note: 'Regular Sino-Japanese' },
  { num: 7, kanji: '7月', kana: 'しちがつ', romaji: 'shichigatsu', irregular: true, note: 'Phonological constraint: "shichi" standard, "nana" barred' },
  { num: 8, kanji: '8月', kana: 'はちがつ', romaji: 'hachigatsu', irregular: false, note: 'Regular Sino-Japanese' },
  { num: 9, kanji: '9月', kana: 'くがつ', romaji: 'kugatsu', irregular: true, note: 'Phonological constraint: "ku" mandatory, "kyū" barred' },
  { num: 10, kanji: '10月', kana: 'じゅうがつ', romaji: 'jūgatsu', irregular: false, note: 'Regular Sino-Japanese' },
  { num: 11, kanji: '11月', kana: 'じゅういちがつ', romaji: 'jūichigatsu', irregular: false, note: 'Regular Sino-Japanese' },
  { num: 12, kanji: '12月', kana: 'じゅうにがつ', romaji: 'jūnigatsu', irregular: false, note: 'Regular Sino-Japanese' }
];

const japaneseDays = [
  { day: 1, kanji: '1日', kana: 'ついたち', romaji: 'tsuitachi', irregular: true, etymology: 'Old Japanese "tsukitachi" (月立ち: moon arrival)' },
  { day: 2, kanji: '2日', kana: 'ふつか', romaji: 'futsuka', irregular: true, etymology: 'Native Wago numerical stem "futu" + suffix "-ka"' },
  { day: 3, kanji: '3日', kana: 'みっか', romaji: 'mikka', irregular: true, etymology: 'Wago stem "mi" + geminate sokuon assimilation' },
  { day: 4, kanji: '4日', kana: 'よっか', romaji: 'yokka', irregular: true, etymology: 'Wago stem "yo" + geminate assimilation' },
  { day: 5, kanji: '5日', kana: 'いつか', romaji: 'itsuka', irregular: true, etymology: 'Wago stem "itu" + "-ka"' },
  { day: 6, kanji: '6日', kana: 'むいか', romaji: 'muika', irregular: true, etymology: 'Wago stem "mu" + vowel vocalization' },
  { day: 7, kanji: '7日', kana: 'なのか', romaji: 'nanoka', irregular: true, etymology: 'Wago stem "nano" + "-ka"' },
  { day: 8, kanji: '8日', kana: 'ようか', romaji: 'yōka', irregular: true, etymology: 'Wago stem "yapu" vocalization to long vowel "yō"' },
  { day: 9, kanji: '9日', kana: 'ここのか', romaji: 'kokonoka', irregular: true, etymology: 'Wago stem "kokono" + "-ka"' },
  { day: 10, kanji: '10日', kana: 'とおか', romaji: 'tōka', irregular: true, etymology: 'Wago stem "towo" vocalization to long vowel "tō"' },
  { day: 11, kanji: '11日', kana: 'じゅういちにち', romaji: 'jūichinichi', irregular: false, etymology: 'Sino-Japanese compound + "-nichi"' },
  { day: 12, kanji: '12日', kana: 'じゅうににち', romaji: 'jūninichi', irregular: false, etymology: 'Sino-Japanese compound + "-nichi"' },
  { day: 13, kanji: '13日', kana: 'じゅうさんにち', romaji: 'jūsannichi', irregular: false, etymology: 'Sino-Japanese compound + "-nichi"' },
  { day: 14, kanji: '14日', kana: 'じゅうよっか', romaji: 'jūyokka', irregular: true, etymology: 'Hybrid Sino-Japanese "jū" + native Wago "yokka"' },
  { day: 15, kanji: '15日', kana: 'じゅうごにち', romaji: 'jūgonichi', irregular: false, etymology: 'Sino-Japanese compound + "-nichi"' },
  { day: 16, kanji: '16日', kana: 'じゅうろくにち', romaji: 'jūrokunichi', irregular: false, etymology: 'Sino-Japanese compound + "-nichi"' },
  { day: 17, kanji: '17日', kana: 'じゅうしちにち', romaji: 'jūshichinichi', irregular: false, etymology: 'Standard "shichi" stem + "-nichi"' },
  { day: 18, kanji: '18日', kana: 'じゅうはちにち', romaji: 'jūhachinichi', irregular: false, etymology: 'Sino-Japanese compound + "-nichi"' },
  { day: 19, kanji: '19日', kana: 'じゅうくにち', romaji: 'jūkunichi', irregular: true, etymology: 'Sino-Japanese "ku" (avoiding "kyū") + "-nichi"' },
  { day: 20, kanji: '20日', kana: 'はつか', romaji: 'hatsuka', irregular: true, etymology: 'Archaic Wago "patusuka" preserved as fixed lexical unit' },
  { day: 21, kanji: '21日', kana: 'にじゅういちにち', romaji: 'nijūichinichi', irregular: false, etymology: 'Sino-Japanese compound + "-nichi"' },
  { day: 22, kanji: '22日', kana: 'にじゅうににち', romaji: 'nijūninichi', irregular: false, etymology: 'Sino-Japanese compound + "-nichi"' },
  { day: 23, kanji: '23日', kana: 'にじゅうさんにち', romaji: 'nijūsannichi', irregular: false, etymology: 'Sino-Japanese compound + "-nichi"' },
  { day: 24, kanji: '24日', kana: 'にじゅうよっか', romaji: 'nijūyokka', irregular: true, etymology: 'Hybrid Sino-Japanese "nijū" + native Wago "yokka"' },
  { day: 25, kanji: '25日', kana: 'にじゅうごにち', romaji: 'nijūgonichi', irregular: false, etymology: 'Sino-Japanese compound + "-nichi"' },
  { day: 26, kanji: '26日', kana: 'にじゅうろくにち', romaji: 'nijūrokunichi', irregular: false, etymology: 'Sino-Japanese compound + "-nichi"' },
  { day: 27, kanji: '27日', kana: 'にじゅうしちにち', romaji: 'nijūshichinichi', irregular: false, etymology: 'Standard "shichi" stem + "-nichi"' },
  { day: 28, kanji: '28日', kana: 'にじゅうはちにち', romaji: 'nijūhachinichi', irregular: false, etymology: 'Sino-Japanese compound + "-nichi"' },
  { day: 29, kanji: '29日', kana: 'にじゅうくにち', romaji: 'nijūkunichi', irregular: true, etymology: 'Sino-Japanese "ku" (avoiding "kyū") + "-nichi"' },
  { day: 30, kanji: '30日', kana: 'さんじゅうにち', romaji: 'sanjūnichi', irregular: false, etymology: 'Sino-Japanese compound + "-nichi"' },
  { day: 31, kanji: '31日', kana: 'さんじゅういちにち', romaji: 'sanjūichinichi', irregular: false, etymology: 'Sino-Japanese compound + "-nichi"' }
];

const weekdays = [
  { index: 0, kanji: '日曜日', short: '日', kana: 'にちようび', romaji: 'nichiyōbi', elemEn: 'Sun (Solar)', elemJa: '太陽・陽' },
  { index: 1, kanji: '月曜日', short: '月', kana: 'げつようび', romaji: 'getsuyōbi', elemEn: 'Moon (Lunar)', elemJa: '月・陰' },
  { index: 2, kanji: '火曜日', short: '火', kana: 'かようび', romaji: 'kayōbi', elemEn: 'Fire (Mars)', elemJa: '火星・火' },
  { index: 3, kanji: '水曜日', short: '水', kana: 'すいようび', romaji: 'suiyōbi', elemEn: 'Water (Mercury)', elemJa: '水星・水' },
  { index: 4, kanji: '木曜日', short: '木', kana: 'もくようび', romaji: 'mokuyōbi', elemEn: 'Wood (Jupiter)', elemJa: '木星・木' },
  { index: 5, kanji: '金曜日', short: '金', kana: 'きんようび', romaji: 'kin\'yōbi', elemEn: 'Gold/Metal (Venus)', elemJa: '金星・金' },
  { index: 6, kanji: '土曜日', short: '土', kana: 'どようび', romaji: 'doyōbi', elemEn: 'Earth/Soil (Saturn)', elemJa: '土星・土' }
];

// compute japanese era name from date
function getImperialEra(year, month, day) {
  const d = new Date(year, month - 1, day);
  if (d >= new Date(2019, 4, 1)) {
    const eraYear = year - 2018;
    const yearStr = eraYear === 1 ? '元年' : `${eraYear}年`;
    return { name: '令和', romaji: 'Reiwa', yearStr, eraNum: eraYear };
  } else if (d >= new Date(1989, 0, 8)) {
    const eraYear = year - 1988;
    const yearStr = eraYear === 1 ? '元年' : `${eraYear}年`;
    return { name: '平成', romaji: 'Heisei', yearStr, eraNum: eraYear };
  } else if (d >= new Date(1926, 11, 25)) {
    const eraYear = year - 1925;
    const yearStr = eraYear === 1 ? '元年' : `${eraYear}年`;
    return { name: '昭和', romaji: 'Shōwa', yearStr, eraNum: eraYear };
  } else if (d >= new Date(1912, 6, 30)) {
    const eraYear = year - 1911;
    const yearStr = eraYear === 1 ? '元年' : `${eraYear}年`;
    return { name: '大正', romaji: 'Taishō', yearStr, eraNum: eraYear };
  } else {
    const eraYear = year - 1867;
    const yearStr = eraYear === 1 ? '元年' : `${eraYear}年`;
    return { name: '明治', romaji: 'Meiji', yearStr, eraNum: eraYear };
  }
}

// convert year number to kana reading
function getYearKana(year) {
  const digits = ['ぜろ', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
  const y = parseInt(year, 10);
  if (isNaN(y)) return '';

  let kana = '';
  const thousands = Math.floor(y / 1000);
  const hundreds = Math.floor((y % 1000) / 100);
  const tens = Math.floor((y % 100) / 10);
  const units = y % 10;

  if (thousands === 1) kana += 'せん';
  else if (thousands === 2) kana += 'にせん';
  else if (thousands === 3) kana += 'さんぜん';
  else if (thousands > 0) kana += digits[thousands] + 'せん';

  if (hundreds === 1) kana += 'ひゃく';
  else if (hundreds === 3) kana += 'さんびゃく';
  else if (hundreds === 6) kana += 'ろっぴゃく';
  else if (hundreds === 8) kana += 'はっぴゃく';
  else if (hundreds > 0) kana += digits[hundreds] + 'ひゃく';

  if (tens === 1) kana += 'じゅう';
  else if (tens > 1) kana += digits[tens] + 'じゅう';

  if (units > 0) kana += digits[units];

  return kana + 'ねん';
}

// build date structure and syntax data
function constructDateData(year, month, day) {
  const y = parseInt(year, 10);
  const m = parseInt(month, 10);
  const d = parseInt(day, 10);

  const dateObj = new Date(y, m - 1, d);
  const dayOfWeekIndex = dateObj.getDay();
  const weekdayData = weekdays[dayOfWeekIndex];

  const monthData = japaneseMonths[m - 1] || japaneseMonths[0];
  const dayData = japaneseDays[d - 1] || japaneseDays[0];
  const eraData = getImperialEra(y, m, d);

  const yearKana = getYearKana(y);
  const fullKanji = `${y}年${m}月${d}日 (${weekdayData.short})`;
  const eraFullKanji = `${eraData.name}${eraData.yearStr}${m}月${d}日 (${weekdayData.kanji})`;
  const fullKana = `${yearKana} ${monthData.kana} ${dayData.kana} (${weekdayData.kana})`;
  const fullRomaji = `${kanaToRomaji(yearKana)} ${monthData.romaji} ${dayData.romaji} (${weekdayData.romaji})`;

  return {
    year: y,
    month: m,
    day: d,
    fullKanji,
    eraFullKanji,
    fullKana,
    fullRomaji,
    eraData,
    monthData,
    dayData,
    weekdayData
  };
}

// render verb conjugation table
function renderConjugationMatrix(data, filter = 'all') {
  const tbody = document.getElementById('matrix-body');
  const countEl = document.getElementById('matrix-count');
  const summaryEl = document.getElementById('verb-summary');
  if (!tbody) return;

  tbody.innerHTML = '';

  // update summary card
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="summary-item">
        <span class="summary-label">${currentLang === 'en' ? 'Lemma / Base' : '基本見出し語'}</span>
        <span class="summary-value">${data.verb}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">${currentLang === 'en' ? 'Morphological Class' : '文法分類'}</span>
        <span class="summary-tag">${data.groupLabel}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">${currentLang === 'en' ? 'Stem (語幹)' : '語幹'}</span>
        <span class="summary-value meta-text">${data.stem || '∅'}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">${currentLang === 'en' ? 'Citation Ending' : '語尾形態'}</span>
        <span class="summary-value meta-text">${data.ending}</span>
      </div>
    `;
  }

  const filteredForms = data.forms.filter(f => {
    if (filter === 'all') return true;
    return f.reg === filter;
  });

  if (countEl) {
    countEl.textContent = `${filteredForms.length} ${currentLang === 'en' ? 'Paradigmatic Inflections Generated' : '活用の生成結果'}`;
  }

  filteredForms.forEach(f => {
    const tr = document.createElement('tr');
    tr.className = 'output-row';

    const isPolite = f.reg === 'polite';
    const regLabel = isPolite
      ? (currentLang === 'en' ? 'Polite (敬体)' : '敬体 (丁寧)')
      : (currentLang === 'en' ? 'Plain (常体)' : '常体 (普通)');

    const rom = kanaToRomaji(f.read);

    tr.innerHTML = `
      <td class="form-cell">
        ${currentLang === 'en' ? f.nameEn : f.nameJa}
        <small>${currentLang === 'en' ? f.nameJa : f.nameEn}</small>
      </td>
      <td>
        <span class="register-badge ${isPolite ? 'polite' : ''}">${regLabel}</span>
      </td>
      <td class="conjugated-cell">
        <span class="conjugated-stem">${f.stem}</span><span class="conjugated-suffix">${f.suf}</span>
      </td>
      <td class="reading-cell">${f.read}</td>
      <td class="romaji-cell">${rom}</td>
      <td><span class="morpheme-cell">${f.morph}</span></td>
      <td class="syntax-cell">${currentLang === 'en' ? f.synEn : f.synJa}</td>
    `;
    tbody.appendChild(tr);
  });
}

// render date breakdown cards and rules
function renderDateMatrix(dateData) {
  const kanjiEl = document.getElementById('date-kanji-display');
  const eraEl = document.getElementById('date-era-display');
  const kanaEl = document.getElementById('date-kana-display');
  const romajiEl = document.getElementById('date-romaji-display');
  const breakdownEl = document.getElementById('date-breakdown-grid');

  if (kanjiEl) kanjiEl.textContent = dateData.fullKanji;
  if (eraEl) eraEl.textContent = dateData.eraFullKanji;
  if (kanaEl) kanaEl.textContent = dateData.fullKana;
  if (romajiEl) romajiEl.textContent = dateData.fullRomaji;

  if (breakdownEl) {
    breakdownEl.innerHTML = `
      <div class="breakdown-item">
        <div class="breakdown-label">${currentLang === 'en' ? 'Year (年)' : '年の表記'}</div>
        <div class="breakdown-kanji">${dateData.year}年 / ${dateData.eraData.name}${dateData.eraData.yearStr}</div>
        <div class="breakdown-kana">${getYearKana(dateData.year)} (${dateData.eraData.romaji})</div>
        <span class="breakdown-tag">${currentLang === 'en' ? 'Sino-Japanese Year Counter (ねん)' : '漢字音読み数詞'}</span>
      </div>
      <div class="breakdown-item">
        <div class="breakdown-label">${currentLang === 'en' ? 'Month (月)' : '月の表記'}</div>
        <div class="breakdown-kanji">${dateData.monthData.kanji}</div>
        <div class="breakdown-kana">${dateData.monthData.kana} (${dateData.monthData.romaji})</div>
        <span class="breakdown-tag ${dateData.monthData.irregular ? 'irregular' : ''}">
          ${dateData.monthData.irregular ? (currentLang === 'en' ? 'Phonological Irregularity' : '変則音韻（例外読み）') : (currentLang === 'en' ? 'Regular Reading' : '規則読み')}
        </span>
      </div>
      <div class="breakdown-item">
        <div class="breakdown-label">${currentLang === 'en' ? 'Day (日)' : '日の表記'}</div>
        <div class="breakdown-kanji">${dateData.dayData.kanji}</div>
        <div class="breakdown-kana">${dateData.dayData.kana} (${dateData.dayData.romaji})</div>
        <span class="breakdown-tag ${dateData.dayData.irregular ? 'irregular' : ''}">
          ${dateData.dayData.irregular ? (currentLang === 'en' ? 'Irregular Wago Compound' : '和語固有数詞（変則）') : (currentLang === 'en' ? 'Regular Sino-Japanese' : '規則的音読み数詞')}
        </span>
      </div>
      <div class="breakdown-item">
        <div class="breakdown-label">${currentLang === 'en' ? 'Weekday (曜日)' : '曜日の表記'}</div>
        <div class="breakdown-kanji">${dateData.weekdayData.kanji}</div>
        <div class="breakdown-kana">${dateData.weekdayData.kana} (${dateData.weekdayData.romaji})</div>
        <span class="breakdown-tag">${currentLang === 'en' ? dateData.weekdayData.elemEn : dateData.weekdayData.elemJa}</span>
      </div>
    `;
  }

  // update sample rule examples
  const sampleNiEl = document.getElementById('sample-ni-valid');
  if (sampleNiEl) {
    sampleNiEl.innerHTML = `${dateData.year}年${dateData.month}月${dateData.day}日<strong>に</strong>会議があります。`;
  }

  const sampleRangeEl = document.getElementById('sample-range');
  if (sampleRangeEl) {
    sampleRangeEl.innerHTML = `${dateData.month}月1日<strong>から</strong>${dateData.month}月${dateData.day}日<strong>まで</strong>研修を行います。`;
  }

  updateSynthesizer(dateData);
}

// native wago duration readings for days
const durationWagoMap = {
  1: 'いちにち',
  2: 'ふつかかん',
  3: 'みっかかん',
  4: 'よっかかん',
  5: 'いつかかん',
  6: 'むいかかん',
  7: 'なのかかん',
  8: 'ようかかん',
  9: 'ここのかかん',
  10: 'とおかかん',
  14: 'じゅうよっかかん',
  20: 'はつかかん',
  24: 'にじゅうよっかかん'
};

// get phonetic kana for duration of days
function getDurationKana(day) {
  if (durationWagoMap[day]) {
    return durationWagoMap[day];
  }
  const dayEntry = japaneseDays[day - 1];
  if (dayEntry) {
    return dayEntry.kana + 'かん';
  }
  return day + 'にちかん';
}

// update contextual sentence synthesizer
function updateSynthesizer(dateData) {
  const predSelect = document.getElementById('predicate-select');
  const sentenceJa = document.getElementById('synth-sentence-ja');
  const sentenceKana = document.getElementById('synth-sentence-kana');
  const sentenceGloss = document.getElementById('synth-sentence-gloss');

  if (!predSelect || !sentenceJa) return;

  const pred = predSelect.value;
  const dateStr = `${dateData.year}年${dateData.month}月${dateData.day}日`;
  const dateKana = `${getYearKana(dateData.year)} ${dateData.monthData.kana} ${dateData.dayData.kana}`;

  if (pred === 'meeting') {
    sentenceJa.innerHTML = `${dateStr}<strong>に</strong> 会議があります。`;
    sentenceKana.textContent = `${dateKana} に かいぎ が あります。`;
    sentenceGloss.textContent = currentLang === 'en'
      ? `There is a meeting on ${dateData.month}/${dateData.day}/${dateData.year}. (Definite point in time requires に)`
      : `${dateData.year}年${dateData.month}月${dateData.day}日に会議があります。（確定時点を示す格助詞「に」）`;
  } else if (pred === 'travel') {
    sentenceJa.innerHTML = `${dateStr}<strong>に</strong> 日本へ行きます。`;
    sentenceKana.textContent = `${dateKana} に にほん へ いきます。`;
    sentenceGloss.textContent = currentLang === 'en'
      ? `I will go to Japan on ${dateData.month}/${dateData.day}/${dateData.year}. (Arrival coordinate marker)`
      : `${dateData.year}年${dateData.month}月${dateData.day}日に日本へ行きます。（到着・出発日時の確定）`;
  } else if (pred === 'exam') {
    sentenceJa.innerHTML = `${dateStr}<strong>から</strong> 試験が始まります。`;
    sentenceKana.textContent = `${dateKana} から しけん が はじまります。`;
    sentenceGloss.textContent = currentLang === 'en'
      ? `The examination begins from ${dateData.month}/${dateData.day}/${dateData.year}. (Temporal origin marked by から)`
      : `${dateData.year}年${dateData.month}月${dateData.day}日から試験が始まります。（開始時点を示す助詞「から」）`;
  } else if (pred === 'duration') {
    const durationKana = getDurationKana(dateData.day);
    const durationText = dateData.day === 1 ? '1日' : `${dateData.day}日間`;
    sentenceJa.innerHTML = `${dateStr}まで <strong>${durationText}</strong> 滞在します。`;
    sentenceKana.textContent = `${dateKana}まで ${durationKana} たいざいします。`;
    sentenceGloss.textContent = currentLang === 'en'
      ? `I will stay for ${dateData.day} ${dateData.day === 1 ? 'day' : 'days'} until this date. (Note counter interval suffix 間 / kan)`
      : `${durationText}滞在します。（期間を表す接尾辞「間（かん）」の付加）`;
  } else if (pred === 'deadline') {
    sentenceJa.innerHTML = `${dateStr}<strong>までに</strong> レポートを提出します。`;
    sentenceKana.textContent = `${dateKana} までに れぽーと を ていしゅつします。`;
    sentenceGloss.textContent = currentLang === 'en'
      ? `I will submit the report by ${dateData.month}/${dateData.day}/${dateData.year}. (Limit deadline marker までに)`
      : `${dateData.year}年${dateData.month}月${dateData.day}日までにレポートを提出します。（完了期限を示す「までに」）`;
  }
}

// render kana reference grid
function renderKanaGrid(script = 'hiragana') {
  const container = document.getElementById('kana-grid-container');
  if (!container) return;

  container.innerHTML = '';
  const chart = (script === 'hiragana') ? hiraganaChart : katakanaChart;

  // top header row for vowels
  const corner = document.createElement('div');
  corner.className = 'kana-cell header-cell';
  corner.textContent = currentLang === 'en' ? 'Grade' : '段';
  container.appendChild(corner);

  chart.vowels.forEach(v => {
    const vCell = document.createElement('div');
    vCell.className = 'kana-cell header-cell';
    vCell.textContent = `${v.toUpperCase()}段`;
    container.appendChild(vCell);
  });

  // grid rows
  chart.rows.forEach(r => {
    const rowH = document.createElement('div');
    rowH.className = 'kana-cell row-header';
    rowH.textContent = `${r.name.toUpperCase()}行`;
    container.appendChild(rowH);

    r.chars.forEach((ch, idx) => {
      const cell = document.createElement('div');
      if (!ch) {
        cell.className = 'kana-cell empty';
      } else {
        cell.className = 'kana-cell';
        cell.innerHTML = `
          <span class="kana-char">${ch}</span>
          <span class="kana-romaji">${r.romaji[idx]}</span>
        `;
      }
      container.appendChild(cell);
    });
  });
}

// copy matrix text to clipboard
function copyMatrixToClipboard() {
  const table = document.getElementById('matrix-table');
  if (!table) return;

  let text = '';
  const rows = table.querySelectorAll('tr');
  rows.forEach(r => {
    const cells = Array.from(r.querySelectorAll('th, td')).map(c => c.textContent.trim().replace(/\s+/g, ' '));
    text += cells.join('\t') + '\n';
  });

  navigator.clipboard.writeText(text).then(() => {
    const copyBtn = document.getElementById('copy-matrix-btn');
    const orig = copyBtn.textContent;
    copyBtn.textContent = currentLang === 'en' ? 'Copied!' : 'コピー完了！';
    setTimeout(() => {
      copyBtn.textContent = orig;
    }, 1500);
  });
}

// toggle application language
function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  const bundle = uiText[lang] || uiText.en;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (bundle[key]) {
      el.textContent = bundle[key];
    }
  });

  const verbInput = document.getElementById('verb-input');
  if (verbInput && bundle.verb_placeholder) {
    verbInput.placeholder = bundle.verb_placeholder;
  }

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.textContent = bundle.lang_btn;
  }

  // update dark mode button label
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.textContent = isDark ? bundle.theme_light : bundle.theme_dark;
  }

  // refresh active matrix and date displays
  runConjugation();
  runDateUpdate();
  const activeKanaScript = document.querySelector('.kana-mode-btn.active')?.dataset.script || 'hiragana';
  renderKanaGrid(activeKanaScript);

  try {
    localStorage.setItem('nsm_lang', lang);
  } catch (e) {
    // localStorage may be disabled
  }
}

// toggle dark theme
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = (current === 'light') ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);

  const bundle = uiText[currentLang] || uiText.en;
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.textContent = (next === 'dark') ? bundle.theme_light : bundle.theme_dark;
  }

  try {
    localStorage.setItem('nsm_theme', next);
  } catch (e) {
    // localStorage may be disabled
  }
}

// populate month and day selectors
function initDatePickers() {
  const monthSelect = document.getElementById('month-select');
  const daySelect = document.getElementById('day-select');
  const datePicker = document.getElementById('date-picker-input');
  const yearInput = document.getElementById('year-select');

  if (!monthSelect || !daySelect) return;

  monthSelect.innerHTML = '';
  japaneseMonths.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.num;
    opt.textContent = `${m.kanji} (${m.kana})`;
    monthSelect.appendChild(opt);
  });

  daySelect.innerHTML = '';
  japaneseDays.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.day;
    opt.textContent = `${d.kanji} (${d.kana})`;
    daySelect.appendChild(opt);
  });

  // set default to 2026-10-17
  const now = new Date(2026, 9, 17);
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');

  if (datePicker) datePicker.value = `${y}-${m}-${d}`;
  if (yearInput) yearInput.value = y;
  monthSelect.value = now.getMonth() + 1;
  daySelect.value = now.getDate();
}

function runDateUpdate() {
  const yearInput = document.getElementById('year-select');
  const monthSelect = document.getElementById('month-select');
  const daySelect = document.getElementById('day-select');

  if (!yearInput || !monthSelect || !daySelect) return;

  const y = parseInt(yearInput.value, 10) || 2026;
  const m = parseInt(monthSelect.value, 10) || 1;
  const d = parseInt(daySelect.value, 10) || 1;

  const dateData = constructDateData(y, m, d);
  renderDateMatrix(dateData);
}

function runConjugation() {
  const input = document.getElementById('verb-input');
  const groupSelect = document.getElementById('group-select');
  const filterSelect = document.getElementById('filter-select');

  if (!input) return;

  const verb = input.value.trim() || '書く';
  const group = groupSelect ? groupSelect.value : 'auto';
  const filter = filterSelect ? filterSelect.value : 'all';

  const data = conjugateVerb(verb, group);
  renderConjugationMatrix(data, filter);
}

// set up event listeners
document.addEventListener('DOMContentLoaded', () => {
  // restore stored settings
  try {
    const savedTheme = localStorage.getItem('nsm_theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    const savedLang = localStorage.getItem('nsm_lang');
    if (savedLang && (savedLang === 'en' || savedLang === 'ja')) {
      currentLang = savedLang;
    }
  } catch (e) {
    // ignore
  }

  initDatePickers();
  setLanguage(currentLang);

  // navigation tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const tab = btn.dataset.tab;
      const target = document.getElementById(`section-${tab}`);
      if (target) target.classList.add('active');
    });
  });

  // theme and lang buttons
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const nextLang = (currentLang === 'en') ? 'ja' : 'en';
      setLanguage(nextLang);
    });
  }

  // verb conjugation events
  const conjugateBtn = document.getElementById('conjugate-btn');
  if (conjugateBtn) {
    conjugateBtn.addEventListener('click', runConjugation);
  }

  const verbInput = document.getElementById('verb-input');
  if (verbInput) {
    verbInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        runConjugation();
      }
    });
  }

  const groupSelect = document.getElementById('group-select');
  if (groupSelect) {
    groupSelect.addEventListener('change', runConjugation);
  }

  const filterSelect = document.getElementById('filter-select');
  if (filterSelect) {
    filterSelect.addEventListener('change', runConjugation);
  }

  // preset buttons
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const verb = btn.dataset.verb;
      const group = btn.dataset.group;
      if (verbInput) verbInput.value = verb;
      if (groupSelect) groupSelect.value = group;
      runConjugation();
    });
  });

  // copy matrix
  const copyBtn = document.getElementById('copy-matrix-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', copyMatrixToClipboard);
  }

  // date controls synchronization
  const datePicker = document.getElementById('date-picker-input');
  const yearInput = document.getElementById('year-select');
  const monthSelect = document.getElementById('month-select');
  const daySelect = document.getElementById('day-select');

  if (datePicker) {
    datePicker.addEventListener('change', () => {
      const val = datePicker.value;
      if (val) {
        const parts = val.split('-');
        if (parts.length === 3) {
          if (yearInput) yearInput.value = parseInt(parts[0], 10);
          if (monthSelect) monthSelect.value = parseInt(parts[1], 10);
          if (daySelect) daySelect.value = parseInt(parts[2], 10);
          runDateUpdate();
        }
      }
    });
  }

  if (yearInput) yearInput.addEventListener('input', runDateUpdate);
  if (monthSelect) monthSelect.addEventListener('change', runDateUpdate);
  if (daySelect) daySelect.addEventListener('change', runDateUpdate);

  const todayBtn = document.getElementById('set-today-btn');
  if (todayBtn) {
    todayBtn.addEventListener('click', () => {
      const now = new Date();
      const y = now.getFullYear();
      const m = now.getMonth() + 1;
      const d = now.getDate();

      if (yearInput) yearInput.value = y;
      if (monthSelect) monthSelect.value = m;
      if (daySelect) daySelect.value = d;

      const mStr = String(m).padStart(2, '0');
      const dStr = String(d).padStart(2, '0');
      if (datePicker) datePicker.value = `${y}-${mStr}-${dStr}`;

      runDateUpdate();
    });
  }

  const predSelect = document.getElementById('predicate-select');
  if (predSelect) {
    predSelect.addEventListener('change', runDateUpdate);
  }

  // kana script toggle buttons
  document.querySelectorAll('.kana-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.kana-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderKanaGrid(btn.dataset.script);
    });
  });

  // initial execution
  runConjugation();
  runDateUpdate();
  renderKanaGrid('hiragana');
});
