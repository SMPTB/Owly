/* =========================================================
   etimologi.js — asal-usul kata kunci tiap bab materi
   Dipakai belajar.js untuk membuka setiap bab dengan satu
   blok etimologi singkat, seperti catatan kaki kamus.

   Bentuk data:
     id   : { kata, rantai: [[bahasa, kata, arti], ...], teks }
     en   : sama, versi Inggris
   ========================================================= */
window.ETIMOLOGI = {
  'mtk-1': {
    id: {
      kata: 'Bilangan',
      rantai: [
        ['Austronesia', '*bilaŋ', 'menghitung'],
        ['Melayu', 'bilang', 'menyebut, menghitung'],
        ['Indonesia', 'bilangan', '']
      ],
      teks: 'Kata “bilangan” berakar pada *bilaŋ, kata Austronesia purba untuk “menghitung”. Dalam bahasa Melayu, “bilang” berarti menyebut atau menghitung, dan “bilangan” menjadi sebutan bagi hasil menghitung — sesuatu yang bisa dihitung satu, dua, tiga.'
    },
    en: {
      kata: 'Number',
      rantai: [
        ['Austronesian', '*bilaŋ', 'to count'],
        ['Malay', 'bilang', 'to say, to count'],
        ['Indonesian', 'bilangan', 'number']
      ],
      teks: '“Bilangan” comes from *bilaŋ, an ancestral Austronesian root meaning “to count”. In Malay, “bilang” means to say or to count, and “bilangan” is the thing you get when you count: one, two, three.'
    }
  },

  'mtk-2': {
    id: {
      kata: 'Aljabar',
      rantai: [
        ['Arab', 'al-jabr', 'penyusunan, pemulihan'],
        ['Latin', 'algebra', ''],
        ['Indonesia', 'aljabar', '']
      ],
      teks: 'Dari bahasa Arab al-jabr, “penyusunan” atau “pemulihan” — istilah dalam judul kitab al-Khwarizmi abad ke-9, Al-Kitāb al-mukhtaṣar fī ḥisāb al-jabr wa al-muqābala, buku yang menyusun cara menyelesaikan persamaan. Lewat bahasa Latin, kata itu menjadi “algebra” dan sampai ke Indonesia sebagai “aljabar”.'
    },
    en: {
      kata: 'Algebra',
      rantai: [
        ['Arabic', 'al-jabr', 'reunion, restoration'],
        ['Latin', 'algebra', ''],
        ['English', 'algebra', '']
      ],
      teks: 'From Arabic al-jabr, “reunion” or “restoration” — a word in the ninth-century title of al-Khwārizmī’s book on solving equations, Al-Kitāb al-mukhtaṣar fī ḥisāb al-jabr wa al-muqābala. Latin borrowed it as “algebra”, and English followed.'
    }
  },

  'mtk-3': {
    id: {
      kata: 'Geometri',
      rantai: [
        ['Yunani', 'gē', 'bumi'],
        ['Yunani', 'metron', 'ukuran'],
        ['Latin', 'geometria', ''],
        ['Indonesia', 'geometri', '']
      ],
      teks: 'Dari bahasa Yunani gē, “bumi”, dan metron, “ukuran”: geōmetria berarti “pengukuran bumi”, pekerjaan para pengukur tanah di Mesir dan Babilonia kuno yang harus menetapkan batas ladang sesudah banjir sungai. Kata ini masuk lewat Latin geometria.'
    },
    en: {
      kata: 'Geometry',
      rantai: [
        ['Greek', 'gē', 'earth'],
        ['Greek', 'metron', 'measure'],
        ['Latin', 'geometria', ''],
        ['English', 'geometry', '']
      ],
      teks: 'Greek gē, “earth”, plus metron, “measure”: geōmetria, “measuring the land” — the work of surveyors in ancient Egypt and Babylon who had to re-mark field boundaries after the river flooded. Latin took it as geometria.'
    }
  },

  'mtk-4': {
    id: {
      kata: 'Data',
      rantai: [
        ['Latin', 'datum', 'yang diberikan'],
        ['Inggris', 'data', ''],
        ['Indonesia', 'data', '']
      ],
      teks: '“Data” berasal dari Latin datum, “sesuatu yang diberikan” — fakta yang diberikan lebih dulu sebelum kita menarik kesimpulan. “Peluang” berakar pada kata “luang”: ruang atau waktu kosong, kesempatan yang bisa terjadi atau tidak.'
    },
    en: {
      kata: 'Data',
      rantai: [
        ['Latin', 'datum', 'something given'],
        ['English', 'data', ''],
        ['Indonesian', 'data', '']
      ],
      teks: '“Data” comes from Latin datum, “something given” — the facts handed to you before you draw a conclusion. “Peluang”, the Indonesian word for probability, grows from “luang”: empty room or spare time, a chance that may or may not happen.'
    }
  },

  'ind-1': {
    id: {
      kata: 'Teks',
      rantai: [
        ['Latin', 'texere', 'menenun'],
        ['Latin', 'textus', 'tenunan'],
        ['Indonesia', 'teks', '']
      ],
      teks: 'Dari Latin textus, “tenunan”, dari texere, “menenun”: teks adalah jalinan kata seperti benang yang saling menyilang, dan maknanya muncul dari pola jalinan itu. “Paham” datang dari bahasa Arab fahm, “mengerti”.'
    },
    en: {
      kata: 'Text',
      rantai: [
        ['Latin', 'texere', 'to weave'],
        ['Latin', 'textus', 'a woven thing'],
        ['English', 'text', '']
      ],
      teks: 'From Latin textus, “a woven thing”, from texere, “to weave”: a text is words woven like threads, and its meaning comes from the pattern of the weave. “Paham”, the Indonesian word for understanding, comes from Arabic fahm.'
    }
  },

  'ind-2': {
    id: {
      kata: 'Inferensi',
      rantai: [
        ['Latin', 'in-', 'ke dalam'],
        ['Latin', 'ferre', 'membawa'],
        ['Latin', 'inferre', 'membawa masuk'],
        ['Indonesia', 'inferensi', '']
      ],
      teks: 'Dari Latin inferre — in-, “ke dalam”, dan ferre, “membawa” — yaitu membawa sebuah simpulan masuk dari petunjuk yang tersirat. Karena itu pemahaman inferensial adalah membaca yang tidak tertulis: yang disimpulkan, bukan yang dikatakan langsung.'
    },
    en: {
      kata: 'Inference',
      rantai: [
        ['Latin', 'in-', 'into'],
        ['Latin', 'ferre', 'to carry'],
        ['Latin', 'inferre', 'to carry in'],
        ['English', 'inference', '']
      ],
      teks: 'From Latin inferre — in-, “into”, and ferre, “to carry” — carrying a conclusion in from clues that are only implied. Inferential reading is therefore reading what is not written: what follows, rather than what is said outright.'
    }
  },

  'ind-3': {
    id: {
      kata: 'Evaluasi',
      rantai: [
        ['Latin', 'valere', 'bernilai'],
        ['Latin', 'evaluare', 'menaksir nilai'],
        ['Indonesia', 'evaluasi', '']
      ],
      teks: '“Evaluasi” dari Latin evaluare, dari valere, “bernilai”: menaksir berapa nilainya. “Apresiasi” dari appretiare — ad-, “ke arah”, dan pretium, “harga” — yaitu menghargai. Keduanya tentang menimbang dan menghargai sebuah teks.'
    },
    en: {
      kata: 'Evaluation',
      rantai: [
        ['Latin', 'valere', 'to be worth'],
        ['Latin', 'evaluare', 'to work out the value'],
        ['English', 'evaluation', '']
      ],
      teks: '“Evaluation” comes from Latin evaluare, from valere, “to be worth”: working out how much something is worth. “Appreciation” comes from appretiare — ad-, “towards”, and pretium, “price” — to set a value on. Both are about weighing and valuing a text.'
    }
  }
};
