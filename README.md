# Nihongo Syntax Matrix (日本語統語行列)
### An Algorithmic Morphology, Conjugation, and Temporal Syntax Engine for Japanese Pedagogy

---

## 1. Abstract & Academic Rationale

The **Nihongo Syntax Matrix** is an austere, offline-first computational linguistic tool designed to scaffold the acquisition of Japanese morphosyntax. Built upon pure ECMAScript (ES6) with zero external runtime dependencies, the system bridges the divide between **Second Language Japanese (JSL) pedagogical frameworks** (e.g., Genki, Minna no Nihongo) and traditional **Kokugogaku (国語学) school grammar**.

In contemporary Japanese language education, learners frequently encounter difficulty reconciling two divergent conceptual models:
1. **The Textbook Paradigm:** Introduces polite verbal forms (*-masu*, *-te*, *-nai*) as discrete, memorized suffixes without exposing underlying morphemic boundaries.
2. **The Structural Phonological Model:** Grounds verbal inflection directly in the five vowel grades (*dan*) of the classical Japanese syllabary (*Gojūon*).

The Nihongo Syntax Matrix formalizes these linguistic mechanics into an interactive, deterministic matrix. It algorithmically decomposes verbal stems, computes euphonic mutations (*onbin*), parses temporal case frames, and maps every shift to both Western linguistic terminology and standard Japanese grammatical nomenclature.

---

## 2. Pedagogical Architecture

### 2.1 The Verbal Morphology Engine
Japanese verbs fall into three fundamental morphological categories, each governed by distinct morphophonemic rules. The application implements precise algorithmic pipelines for all three groups:

```
Verbal Input (Lemma)
      │
      ├─── Ends in する / [Noun]+する ───► Group 3: Irregular Suru (サ行変格活用)
      ├─── Matches くる / 来る ─────────► Group 3: Irregular Kuru (カ行変格活用)
      ├─── Does NOT end in る ─────────► Group 1: Godan (五段活用動詞)
      └─── Ends in る
            ├─── In Godan Exception Lexicon ──► Group 1: Godan (e.g., 帰る, 切る, 走る)
            ├─── Preceded by i-dan / e-dan ────► Group 2: Ichidan (一段活用動詞)
            └─── Preceded by a/u/o-dan ───────► Group 1: Godan
```

#### Group 1: Godan Verbs (五段動詞 / Consonant-Stem Verbs)
The core insight of Kokugogaku is that Godan verbs shift their final consonant across the five vowel grades (*あ段, い段, う段, え段, お段*):
* **あ段 (a-grade / 未然形 Mizenkei):** Forms the base for negative (*-nai*), passive (*-reru*), and causative (*-seru*). Stems ending in vowel *u* (*う*) undergo the archaic labial glide shift to *wa* (*わ*) rather than *a* (*あ*) (e.g., 買う → 買わない).
* **い段 (i-grade / 連用形 Ren'yōkei):** Forms the base for polite affirmative (*-masu*), polite negative (*-masen*), and noun conversion (e.g., 書く → 書きます / 書き).
* **う段 (u-grade / 終止形・連体形 Shūshikei / Rentaikei):** Standard citation dictionary form.
* **え段 (e-grade / 仮定形・命令形 Kateikei / Meireikei):** Forms the base for provisional conditional (*-ba*), potential capability (*-eru*), and imperative commands (e.g., 待つ → 待てば / 待てる / 待て).
* **お段 (o-grade / 意向形 Ikōkei):** Combines with *-u* (*う*) to produce the volitional mood (*-ō*) (e.g., 飲む → 飲もう).

#### Euphonic Mutations in Conjunctive Forms (音便 Onbin)
For Godan verbs, the conjunctive (*-te*) and past (*-ta / -tara*) forms do not append directly to the regular stem. Instead, historical phonological assimilation creates four distinct classes of *onbin*:

| Ending | Sound Change Pattern | Historical Designation | Example |
| :--- | :--- | :--- | :--- |
| **う, つ, る** | Geminate stop assimilation (`って`, `った`) | **促音便 (Sokuonbin)** | 買う → 買って / 待つ → 待った |
| **む, ぶ, ぬ** | Nasal assimilation + Rendaku voicing (`んで`, `んだ`) | **撥音便 (Hatsuonbin)** | 飲む → 飲んで / 遊ぶ → 遊んだ |
| **く** | Velar vocalization to -i (`いて`, `いた`) | **イ音便 (I-onbin)** | 書く → 書いて / 書いた |
| **ぐ** | Voiced velar vocalization (`いで`, `いだ`) | **濁音イ音便 (Voiced I-onbin)** | 泳ぐ → 泳いで / 泳いだ |
| **す** | Palatal fricative retention (`して`, `した`) | **サ行音便不発・連用形保持** | 話す → 話して / 話した |
| **行く (iku)** | Irregular geminate assimilation (`行って`, `行った`) | **促音便例外** | 行く → 行って (not *行いて*) |

#### Group 2: Ichidan Verbs (一段動詞 / Vowel-Stem Verbs)
Ichidan verbs exhibit an invariant vowel root ending in either *-i* (上一段 Kami-ichidan) or *-e* (下一段 Shimo-ichidan). Inflection occurs by direct agglutination:
* Stems truncate the final *-ru* (*る*) entirely.
* Suffixes (*-masu*, *-nai*, *-te*, *-ta*, *-rareru*, *-saseru*, *-reba*) attach directly to the invariant stem without euphonic disruption.

#### Group 3: Irregular Verbs (変格活用動詞)
The two suppletive verbs of Japanese grammar:
* **する (サ行変格活用):** Displays suppletive root alternations: *shi-* (連用形: します, して, した), *se-* (未然形: させる, される; 命令形: せよ), and *sur-* (終止形・仮定形: する, すれば). The engine natively supports complex Sino-Japanese verbal compounds (e.g., 勉強する, 案内する, 参加する).
* **くる / 来る (カ行変格活用):** Exhibits vowel alternation in the root kanji itself: read as *ko-* in negative (*こない / 来ない*) and imperative (*こい / 来い*); *ki-* in continuative (*きます / 来ます*, *きて / 来て*); and *ku-* in dictionary form (*くる / 来る*).

---

## 3. Calendar & Temporal Syntax Constructor

The date constructor models both the **phonological idiosyncrasies** of Japanese calendar expressions and their **syntactic case-marking constraints**.

### 3.1 Phonological Idiosyncrasies of Months and Days
Standard Sino-Japanese numerical compounding is suspended in specific calendar domains:
* **Month Exceptions:** 4月 is strictly pronounced **しがつ (shigatsu)** (never *よんがつ*); 7月 is **しちがつ (shichigatsu)** (never *なながつ*); 9月 is **くがつ (kugatsu)** (never *きゅうがつ*).
* **Day Exceptions:** Days 1 through 10, 14, 20, and 24 preserve ancient Yamato-kotoba (和語) counters and vowel contractions:
  * 1日: **ついたち (tsuitachi)** (from archaic *月立ち tsukitachi*, "moon emergence").
  * 2日～10日: Native roots (*futu, mi, yo, itu, mu, nano, yapu, kokono, towo*) compounded with the archaic day counter suffix *-ka* (*ふつか, みっか, よっか, いつか, むいか, なのか, ようか, ここのか, とおか*).
  * 14日 / 24日: Hybrid Sino-Japanese tens prefix + native root (*じゅうよっか, にじゅうよっか*).
  * 20日: Preserved archaic numeral **はつか (hatsuka)** (from Old Japanese *patusuka*).

### 3.2 Syntactic Particle Constraints: Absolute vs. Relative Time
The engine models the syntactic admissibility of the temporal case particle **に (ni)**, following standard generative and structural analyses (e.g., Kuno 1973; Martin 1975):
1. **Absolute Temporal Coordinates:** Specific numerical calendar dates, clock hours, and weekdays denote fixed points on a shared coordinate grid and **grammatically license or mandate** the particle に:
   $$\text{2026年10月17日} + \mathbf{に} + \text{会議があります。} \quad \text{[Grammatical]}$$
2. **Relative Deictic Temporal Nouns:** Expressions anchored to the moment of utterance (*今日, 明日, 昨日, 今週, 来週, 去年*) **syntactically block** the case particle に:
   $$\text{明日} + *\mathbf{に} + \text{会議があります。} \quad \text{[Ungrammatical / Unnatural]}$$
3. **Point vs. Duration Aspect:** Calendar dates (*17日 / jūshichi-nichi*) denote instantaneous temporal points, whereas interval spans require the duration counter suffix **間 (kan)** (*17日間 / jūshichi-nichi-kan*).

---

## 4. Technical Architecture

The application is implemented under strict computational constraints to guarantee permanence, security, and offline reliability:

* **Execution Runtime:** Pure ECMAScript 2020 (Vanilla JS). Zero reliance on Node.js runtimes, package registries, web workers, or transpilers.
* **Layout Engine:** Strict CSS Grid specification (`display: grid`) structuring multidimensional tabular matrices with predictable line-box alignment.
* **Aesthetic Philosophy:** Rectilinear, austere typography. Elements maintain an absolute `border-radius: 0` geometry, reminiscent of traditional Japanese print dictionaries (*Jisho*) and technical reference manuals.
* **State Persistence:** Local client `localStorage` cache preserving user preferences (`nsm_theme`, `nsm_lang`) without transmission.
* **Zero Telemetry:** No analytics, trackers, external CDN fonts, or third-party network pings.

---

## 5. File Inventory

| File | Purpose |
| :--- | :--- |
| `index.html` | Semantic document skeleton containing the verb matrix, date constructor, and Gojūon reference. |
| `style.css` | Rectilinear stylesheet defining light/dark canvas CSS variables, typography, and grid systems. |
| `script.js` | Deterministic morphological conjugation algorithm, phonological dictionary, and localization logic. |
| `privacy.html` | Architectural policy declaring client-side data sovereignty and offline integrity. |
| `terms.html` | Academic terms of educational use and open dissemination guidelines. |
| `README.md` | Academic documentation of the pedagogical framework, linguistics, and software design. |

---

## 6. Classroom Deployment & Instruction Guide

To deploy the Nihongo Syntax Matrix in a university laboratory or classroom:
1. Download or clone the directory to any local storage device.
2. Double-click `index.html` to open directly in any modern web browser (Firefox, Chromium, Safari, Edge).
3. No web server daemon (`http-server`, Apache, Nginx) or internet connection is required.

---

*Authored for the advancement of computational pedagogy in Japanese linguistics.*
