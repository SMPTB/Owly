/* =========================================================
   materi.js — ISI MATERI PEMBELAJARAN (teks, tanpa video)
   Dibaca oleh belajar.html. Satu bab = satu halaman panjang,
   terdiri dari beberapa "bagian materi" (A, B, C, ...).

   Cara menambah / mengubah materi:
   - Tiap bagian punya daftar "blocks". Setiap block berbentuk daftar:
       ['h',  'Subjudul']
       ['p',  'Paragraf']                      (boleh HTML: <b> <i> <sup> <sub>)
       ['ul', ['butir 1', 'butir 2']]          daftar berpoin
       ['ol', ['langkah 1', 'langkah 2']]      daftar bernomor
       ['note', 'Judul', 'isi']                kotak catatan / tips (hijau)
       ['warn', 'Judul', 'isi']                kotak hati-hati (oranye)
       ['text', 'Judul', 'isi']                teks contoh untuk dibaca
       ['table', ['Kolom 1','Kolom 2'], [['a','b'], ['c','d']]]
       ['ex', 'Soal contoh', ['langkah 1','langkah 2'], 'Jawaban']
       ['task', 'Judul tugas', ['pertanyaan 1','pertanyaan 2']]
   - "id" tiap bab dan bagian dipakai untuk menyimpan progres: jangan diubah
     setelah ada siswa yang memakai (kalau diubah, tanda "sudah dibaca" hilang).
   ========================================================= */

const MATERI = [

/* ================================================================
   MATEMATIKA · BAB 1: BILANGAN
   ================================================================ */
{
  id: 'mtk-1', subject: 'mtk', bab: 'Bilangan', no: '01',
  intro: `Bilangan ada di mana-mana: harga barang, suhu udara, takaran resep, sampai jarak di peta. Di bab ini kamu mengenal jenis-jenis bilangan dan cara menghitungnya dengan tepat.`,
  goals: [
    `Mengoperasikan bilangan bulat dan pecahan dengan benar`,
    `Menggunakan sifat bilangan berpangkat dan mengenali bilangan irasional`,
    `Menyelesaikan masalah sehari-hari dengan perbandingan senilai dan berbalik nilai`
  ],
  lessons: [
    { id: 'mtk-1-a', title: 'Bilangan Bulat', blocks: [
      ['p', `Bilangan bulat terdiri dari bilangan negatif, nol, dan bilangan positif: …, −3, −2, −1, 0, 1, 2, 3, …. Kita memakainya untuk suhu di bawah nol, saldo yang berkurang, atau lantai basement pada gedung.`],
      ['h', `Membandingkan bilangan bulat`],
      ['p', `Pada garis bilangan, semakin ke kanan nilainya semakin besar. Jadi −2 > −5, karena −2 berada di sebelah kanan −5.`],
      ['h', `Aturan tanda`],
      ['table', ['Operasi', 'Aturan', 'Contoh'], [
        ['Penjumlahan', `a + (−b) = a − b`, `7 + (−3) = 4`],
        ['Pengurangan', `a − (−b) = a + b`, `5 − (−2) = 7`],
        ['Perkalian dan pembagian', `Tanda sama → positif. Tanda berbeda → negatif.`, `(−4) × (−3) = 12 dan (−12) ÷ 3 = −4`]
      ]],
      ['h', `Urutan operasi`],
      ['p', `Kerjakan dari dalam kurung, lalu pangkat, kemudian perkalian dan pembagian (dari kiri ke kanan), terakhir penjumlahan dan pengurangan (dari kiri ke kanan).`],
      ['ex', `Hitunglah 12 + (−5) × 3 − 8 ÷ (−2).`, [
        `Kerjakan perkalian dan pembagian dulu: (−5) × 3 = −15 dan 8 ÷ (−2) = −4.`,
        `Gantikan: 12 + (−15) − (−4).`,
        `12 − 15 = −3, lalu −3 + 4 = 1.`
      ], `1`],
      ['warn', `Hati-hati dengan kurung`, `−3<sup>2</sup> berarti −(3<sup>2</sup>) = −9, sedangkan (−3)<sup>2</sup> = 9. Kurung menentukan hasilnya.`],
      ['task', `Coba sendiri`, [
        `Urutkan dari yang terkecil: 3, −7, 0, −2, 5.`,
        `Suhu di puncak gunung −4 °C. Malam hari suhu turun 6 °C. Berapa suhunya sekarang?`,
        `Hitung (−6) × 4 + 15 ÷ (−3).`
      ]]
    ]},
    { id: 'mtk-1-b', title: 'Bilangan Rasional', blocks: [
      ['p', `Bilangan rasional adalah bilangan yang dapat ditulis sebagai pecahan <i>a/b</i> dengan <i>a</i> dan <i>b</i> bilangan bulat dan <i>b</i> ≠ 0. Bilangan bulat, pecahan, serta desimal yang berhenti atau berulang semuanya termasuk bilangan rasional.`],
      ['table', ['Bentuk', 'Contoh', 'Rasional?'], [
        ['Bilangan bulat', `−4, 0, 9`, `Ya (−4 = −4/1)`],
        ['Pecahan', `3/5, −7/2`, `Ya`],
        ['Desimal berhenti', `0,25 = 1/4`, `Ya`],
        ['Desimal berulang', `0,333… = 1/3`, `Ya`]
      ]],
      ['h', `Operasi pecahan`],
      ['ul', [
        `<b>Penjumlahan dan pengurangan:</b> samakan penyebut lebih dulu.`,
        `<b>Perkalian:</b> kalikan pembilang dengan pembilang dan penyebut dengan penyebut.`,
        `<b>Pembagian:</b> kalikan dengan kebalikan pecahan pembagi.`
      ]],
      ['ex', `Hitunglah 2/3 + 3/4.`, [
        `KPK dari 3 dan 4 adalah 12.`,
        `2/3 = 8/12 dan 3/4 = 9/12.`,
        `8/12 + 9/12 = 17/12 = 1 5/12.`
      ], `17/12 atau 1 5/12`],
      ['ex', `Hitunglah 3/5 ÷ 9/10.`, [
        `Ubah pembagian menjadi perkalian dengan kebalikan: 3/5 × 10/9.`,
        `Kalikan: 30/45.`,
        `Sederhanakan dengan membagi 15: 2/3.`
      ], `2/3`],
      ['note', `Mengubah desimal menjadi pecahan`, `0,75 = 75/100 = 3/4. Untuk desimal berulang seperti 0,666…, misalkan x = 0,666…. Maka 10x = 6,666…. Kurangkan keduanya: 9x = 6, sehingga x = 2/3.`],
      ['task', `Coba sendiri`, [
        `Ubah 0,125 menjadi pecahan paling sederhana.`,
        `Hitung 5/6 − 1/4.`,
        `Ibu memakai 1/4 kg gula untuk kue pertama dan 2/5 kg untuk kue kedua. Berapa kg gula yang dipakai seluruhnya?`
      ]]
    ]},
    { id: 'mtk-1-c', title: 'Bilangan Berpangkat dan Irasional', blocks: [
      ['p', `Bilangan berpangkat adalah perkalian berulang. Misalnya 2<sup>4</sup> = 2 × 2 × 2 × 2 = 16. Angka 2 disebut basis dan 4 disebut pangkat (eksponen).`],
      ['table', ['Sifat', 'Bentuk', 'Contoh'], [
        ['Perkalian', `a<sup>m</sup> × a<sup>n</sup> = a<sup>m+n</sup>`, `3<sup>2</sup> × 3<sup>4</sup> = 3<sup>6</sup>`],
        ['Pembagian', `a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m−n</sup>`, `5<sup>7</sup> ÷ 5<sup>3</sup> = 5<sup>4</sup>`],
        ['Pangkat dari pangkat', `(a<sup>m</sup>)<sup>n</sup> = a<sup>m×n</sup>`, `(2<sup>3</sup>)<sup>2</sup> = 2<sup>6</sup>`],
        ['Pangkat nol', `a<sup>0</sup> = 1 (a ≠ 0)`, `9<sup>0</sup> = 1`],
        ['Pangkat negatif', `a<sup>−n</sup> = 1/a<sup>n</sup>`, `2<sup>−3</sup> = 1/8`]
      ]],
      ['ex', `Sederhanakan (2<sup>6</sup> × 2<sup>−3</sup>) ÷ 2<sup>2</sup>.`, [
        `Perkalian: pangkat dijumlahkan, 6 + (−3) = 3, sehingga 2<sup>3</sup>.`,
        `Pembagian: pangkat dikurangkan, 3 − 2 = 1.`,
        `Hasilnya 2<sup>1</sup> = 2.`
      ], `2`],
      ['h', `Bilangan irasional`],
      ['p', `Bilangan irasional tidak dapat ditulis sebagai pecahan <i>a/b</i>. Bentuk desimalnya tidak berhenti dan tidak berulang. Contohnya π = 3,14159…, √2 = 1,41421…, dan √3. Akar dari bilangan kuadrat sempurna (√16 = 4, √25 = 5) justru rasional.`],
      ['ex', `Taksir nilai √20, lalu sederhanakan bentuknya.`, [
        `16 < 20 < 25, sehingga 4 < √20 < 5. Karena 20 lebih dekat ke 16, nilainya sekitar 4,5 (sebenarnya 4,47…).`,
        `Sederhanakan: √20 = √(4 × 5) = √4 × √5 = 2√5.`
      ], `Sekitar 4,5; bentuk sederhananya 2√5`],
      ['note', `Menyederhanakan akar`, `Cari faktor yang merupakan kuadrat sempurna. Contoh: √50 = √(25 × 2) = 5√2.`],
      ['task', `Coba sendiri`, [
        `Hitung 2<sup>−2</sup> + 4<sup>0</sup>.`,
        `Tentukan dua bilangan bulat berurutan yang mengapit √40.`,
        `Sederhanakan √72.`
      ]]
    ]},
    { id: 'mtk-1-d', title: 'Perbandingan', blocks: [
      ['p', `Perbandingan membandingkan dua besaran sejenis, ditulis a : b. Seperti pecahan, perbandingan dapat disederhanakan: 20 : 30 = 2 : 3.`],
      ['h', `Perbandingan senilai`],
      ['p', `Dua besaran disebut senilai jika naik bersamaan atau turun bersamaan dengan rasio yang tetap, misalnya jumlah barang dan harganya.`],
      ['ex', `3 kg apel harganya Rp45.000. Berapa harga 5 kg apel?`, [
        `Harga 1 kg = 45.000 ÷ 3 = Rp15.000.`,
        `Harga 5 kg = 5 × 15.000 = Rp75.000.`
      ], `Rp75.000`],
      ['h', `Perbandingan berbalik nilai`],
      ['p', `Jika satu besaran naik, besaran lain turun dengan hasil kali yang tetap, misalnya jumlah pekerja dan lama pekerjaan.`],
      ['ex', `6 pekerja menyelesaikan suatu pekerjaan dalam 10 hari. Berapa hari yang dibutuhkan jika dikerjakan 4 pekerja?`, [
        `Beban kerja total = 6 × 10 = 60 pekerja-hari.`,
        `Dengan 4 pekerja: 60 ÷ 4 = 15 hari.`
      ], `15 hari`],
      ['note', `Skala pada peta`, `Skala 1 : 200.000 berarti 1 cm pada peta mewakili 200.000 cm = 2 km pada kenyataan. Jarak 5 cm pada peta berarti 10 km.`],
      ['task', `Coba sendiri`, [
        `Perbandingan tepung dan gula pada sebuah resep adalah 5 : 2. Jika tepung 300 gram, berapa gram gula?`,
        `Sebuah mobil menempuh 180 km dengan 15 liter bensin. Berapa liter yang dibutuhkan untuk 300 km?`,
        `8 orang membersihkan taman dalam 6 hari. Jika dikerjakan 12 orang, berapa hari?`
      ]]
    ]}
  ],
  summary: [
    `Bilangan bulat: perhatikan aturan tanda dan urutan operasi.`,
    `Bilangan rasional dapat ditulis sebagai pecahan; samakan penyebut sebelum menjumlah atau mengurang.`,
    `Sifat pangkat: pangkat dijumlahkan saat dikali, dikurangkan saat dibagi.`,
    `Perbandingan senilai dicari lewat harga satuan; berbalik nilai lewat hasil kali yang tetap.`
  ]
},

/* ================================================================
   MATEMATIKA · BAB 2: ALJABAR
   ================================================================ */
{
  id: 'mtk-2', subject: 'mtk', bab: 'Aljabar', no: '02',
  intro: `Aljabar memakai huruf untuk mewakili bilangan yang belum diketahui. Dengan aljabar, kamu bisa mengubah cerita sehari-hari menjadi persamaan dan menyelesaikannya langkah demi langkah.`,
  goals: [
    `Menyelesaikan persamaan dan pertidaksamaan linear satu variabel`,
    `Menyelesaikan sistem persamaan linear dua variabel (SPLDV)`,
    `Menyederhanakan bentuk aljabar, memahami fungsi, serta mengenali pola barisan dan deret`
  ],
  lessons: [
    { id: 'mtk-2-a', title: 'Persamaan dan Pertidaksamaan Linear Satu Variabel', blocks: [
      ['p', `Persamaan linear satu variabel (PLSV) adalah kalimat terbuka dengan tanda “=” yang memuat satu variabel berpangkat satu, misalnya 3x + 5 = 20. Menyelesaikannya berarti mencari nilai variabel yang membuat kalimat itu benar.`],
      ['ol', [
        `Pindahkan konstanta ke ruas lain (tandanya berganti).`,
        `Bagi kedua ruas dengan koefisien variabel.`,
        `Periksa jawabanmu dengan memasukkannya ke persamaan semula.`
      ]],
      ['ex', `Selesaikan 3x + 5 = 20.`, [
        `3x = 20 − 5 = 15.`,
        `x = 15 ÷ 3 = 5.`,
        `Periksa: 3(5) + 5 = 20 ✓`
      ], `x = 5`],
      ['h', `Pertidaksamaan linear satu variabel`],
      ['p', `Bentuknya mirip, tetapi memakai tanda &lt;, &gt;, ≤, atau ≥. Langkah penyelesaiannya sama dengan persamaan, <b>kecuali</b> ketika kedua ruas dikali atau dibagi bilangan negatif: tanda pertidaksamaan harus dibalik.`],
      ['ex', `Selesaikan −2x + 1 &gt; 9.`, [
        `−2x &gt; 9 − 1 = 8.`,
        `Bagi dengan −2 dan balik tandanya: x &lt; −4.`
      ], `x &lt; −4`],
      ['task', `Coba sendiri`, [
        `Selesaikan 4x − 7 = 21.`,
        `Selesaikan 2x − 3 &lt; 7, lalu gambarkan penyelesaiannya pada garis bilangan.`,
        `Dua kali umur Dika ditambah 4 sama dengan 30. Berapa umur Dika?`
      ]]
    ]},
    { id: 'mtk-2-b', title: 'Sistem Persamaan Linear Dua Variabel (SPLDV)', blocks: [
      ['p', `SPLDV terdiri atas dua persamaan linear dengan dua variabel, misalnya x + y = 7 dan x − y = 1. Penyelesaiannya adalah pasangan (x, y) yang memenuhi kedua persamaan sekaligus.`],
      ['h', `Metode eliminasi`],
      ['p', `Hilangkan salah satu variabel dengan menjumlahkan atau mengurangkan kedua persamaan.`],
      ['ex', `Selesaikan x + y = 7 dan x − y = 1.`, [
        `Jumlahkan kedua persamaan: 2x = 8, sehingga x = 4.`,
        `Masukkan ke x + y = 7: 4 + y = 7, sehingga y = 3.`,
        `Periksa pada persamaan kedua: 4 − 3 = 1 ✓`
      ], `(x, y) = (4, 3)`],
      ['h', `Metode substitusi`],
      ['p', `Ubah salah satu persamaan menjadi x = … atau y = …, lalu masukkan ke persamaan yang lain.`],
      ['ex', `Selesaikan 2x + 3y = 12 dan x + y = 5.`, [
        `Dari persamaan kedua: x = 5 − y.`,
        `Substitusi ke persamaan pertama: 2(5 − y) + 3y = 12, sehingga 10 − 2y + 3y = 12 dan y = 2.`,
        `x = 5 − 2 = 3.`
      ], `(x, y) = (3, 2)`],
      ['note', `Soal cerita`, `Misalkan hal yang dicari dengan huruf (mis. p = harga pensil, b = harga buku), ubah cerita menjadi dua persamaan, lalu selesaikan dengan eliminasi atau substitusi.`],
      ['task', `Coba sendiri`, [
        `Selesaikan x + 2y = 8 dan x − y = 2.`,
        `Harga 2 buku dan 1 pulpen Rp11.000, sedangkan 1 buku dan 1 pulpen Rp7.000. Berapa harga 1 buku dan 1 pulpen?`
      ]]
    ]},
    { id: 'mtk-2-c', title: 'Bentuk Aljabar', blocks: [
      ['p', `Bentuk aljabar adalah gabungan variabel (huruf), koefisien (angka di depan variabel), dan konstanta (angka tanpa variabel). Contoh: 3x<sup>2</sup> − 4x + 7.`],
      ['table', ['Bagian', 'Pada 3x² − 4x + 7'], [
        ['Variabel', `x`],
        ['Koefisien', `3 (pada x²) dan −4 (pada x)`],
        ['Konstanta', `7`],
        ['Suku', `3x², −4x, dan 7`]
      ]],
      ['p', `Suku sejenis memiliki variabel dan pangkat yang sama, misalnya 5x dan −2x. Hanya suku sejenis yang boleh dijumlahkan atau dikurangkan.`],
      ['ex', `Sederhanakan (3x + 2) + (x − 5) − (2x − 1).`, [
        `Hilangkan kurung. Tanda minus di depan kurung membalik tanda di dalamnya: 3x + 2 + x − 5 − 2x + 1.`,
        `Kumpulkan suku sejenis: (3x + x − 2x) + (2 − 5 + 1).`,
        `Hasilnya 2x − 2.`
      ], `2x − 2`],
      ['ex', `Jabarkan (x + 2)(x + 3).`, [
        `Kalikan setiap suku: x · x + x · 3 + 2 · x + 2 · 3.`,
        `= x<sup>2</sup> + 3x + 2x + 6.`,
        `Gabungkan suku sejenis: x<sup>2</sup> + 5x + 6.`
      ], `x<sup>2</sup> + 5x + 6`],
      ['task', `Coba sendiri`, [
        `Tentukan variabel, koefisien, dan konstanta dari 2ab − b<sup>2</sup> + 5.`,
        `Sederhanakan 4a + 3b − 2a + b.`,
        `Jabarkan (x − 4)(x + 1).`
      ]]
    ]},
    { id: 'mtk-2-d', title: 'Relasi dan Fungsi', blocks: [
      ['p', `Relasi adalah hubungan antara anggota himpunan A (daerah asal) dan anggota himpunan B (daerah kawan). Relasi dapat disajikan dengan diagram panah, pasangan berurutan, atau grafik.`],
      ['note', `Apa itu fungsi?`, `Fungsi adalah relasi khusus: <b>setiap anggota A memiliki tepat satu pasangan di B</b>. Dua anggota A boleh berpasangan dengan anggota B yang sama, tetapi satu anggota A tidak boleh memiliki dua pasangan.`],
      ['table', ['Relasi dari A = {1, 2, 3}', 'Fungsi?', 'Alasan'], [
        [`{(1,a), (2,b), (3,b)}`, `Ya`, `Setiap anggota A punya satu pasangan`],
        [`{(1,a), (1,b), (2,c), (3,d)}`, `Bukan`, `Angka 1 punya dua pasangan`],
        [`{(1,c), (2,d)}`, `Bukan`, `Angka 3 tidak punya pasangan`]
      ]],
      ['h', `Rumus fungsi`],
      ['p', `Fungsi linear ditulis f(x) = ax + b. Nilai fungsi di x = 3 ditulis f(3) dan dihitung dengan mengganti x dengan 3.`],
      ['graph', { a: 2, b: 1, x: 1 }],
      ['p', `Geser <b>a</b> untuk membuat garis makin tegak atau makin landai, <b>b</b> untuk menggeser garis naik-turun, dan <b>x</b> untuk melihat bahwa satu nilai x selalu memberi tepat satu nilai f(x). Itulah ciri fungsi.`],
      ['ex', `Diketahui f(x) = 2x + 1. Hitung f(3), lalu cari x jika f(x) = 11.`, [
        `f(3) = 2(3) + 1 = 7.`,
        `f(x) = 11 → 2x + 1 = 11 → 2x = 10 → x = 5.`
      ], `f(3) = 7 dan x = 5`],
      ['ex', `Fungsi linear f memenuhi f(1) = 5 dan f(2) = 8. Tentukan rumus f(x).`, [
        `Nilai bertambah 3 (dari 5 ke 8) ketika x bertambah 1, jadi a = 3.`,
        `Masukkan f(1) = 5: 3(1) + b = 5, sehingga b = 2.`
      ], `f(x) = 3x + 2`],
      ['task', `Coba sendiri`, [
        `Apakah {(1,p), (2,p), (3,q)} merupakan fungsi dari {1,2,3} ke {p,q}? Jelaskan.`,
        `Jika f(x) = 4x − 3, hitung f(−2).`,
        `Tarif parkir 1 jam Rp5.000 dan 3 jam Rp9.000. Jika tarif bersifat linear, tentukan rumus tarif f(x) untuk x jam.`
      ]]
    ]},
    { id: 'mtk-2-e', title: 'Barisan dan Deret', blocks: [
      ['p', `Barisan bilangan adalah urutan bilangan yang mengikuti suatu pola. Deret adalah jumlah dari suku-suku barisan.`],
      ['h', `Barisan dan deret aritmetika`],
      ['p', `Selisih antarsuku berurutan selalu tetap. Selisih itu disebut beda (b).`],
      ['table', ['Rumus', 'Keterangan'], [
        [`U<sub>n</sub> = a + (n − 1)b`, `Suku ke-n`],
        [`S<sub>n</sub> = n/2 × (a + U<sub>n</sub>)`, `Jumlah n suku pertama`]
      ]],
      ['ex', `Barisan 3, 7, 11, 15, … Tentukan U<sub>10</sub> dan S<sub>10</sub>.`, [
        `Suku pertama a = 3 dan beda b = 7 − 3 = 4.`,
        `U<sub>10</sub> = 3 + 9 × 4 = 39.`,
        `S<sub>10</sub> = 10/2 × (3 + 39) = 5 × 42 = 210.`
      ], `U<sub>10</sub> = 39 dan S<sub>10</sub> = 210`],
      ['h', `Barisan geometri`],
      ['p', `Perbandingan antarsuku berurutan selalu tetap. Perbandingan itu disebut rasio (r), dan U<sub>n</sub> = a × r<sup>n−1</sup>.`],
      ['ex', `Barisan 2, 6, 18, … Tentukan suku ke-5.`, [
        `a = 2 dan r = 6 ÷ 2 = 3.`,
        `U<sub>5</sub> = 2 × 3<sup>4</sup> = 2 × 81 = 162.`
      ], `162`],
      ['note', `Pola dalam kehidupan`, `Susunan kursi pada gedung pertunjukan, tumpukan batu bata, atau tabungan yang bertambah tetap tiap bulan dapat dimodelkan dengan barisan aritmetika.`],
      ['task', `Coba sendiri`, [
        `Tentukan suku ke-12 dari barisan 5, 8, 11, …`,
        `Tentukan jumlah 20 suku pertama dari 2, 4, 6, 8, …`,
        `Pada barisan 4, 12, 36, …, tentukan suku ke-4.`
      ]]
    ]}
  ],
  summary: [
    `PLSV diselesaikan dengan memindahkan suku dan membagi koefisien; balik tanda pertidaksamaan jika dibagi bilangan negatif.`,
    `SPLDV dapat diselesaikan dengan eliminasi atau substitusi.`,
    `Fungsi: setiap anggota daerah asal punya tepat satu pasangan.`,
    `Barisan aritmetika memakai beda tetap; barisan geometri memakai rasio tetap.`
  ]
},

/* ================================================================
   MATEMATIKA · BAB 3: GEOMETRI DAN PENGUKURAN
   ================================================================ */
{
  id: 'mtk-3', subject: 'mtk', bab: 'Geometri dan Pengukuran', no: '03',
  intro: `Dari bentuk atap rumah sampai ukuran tangki air, geometri membantu kita memahami bentuk dan mengukurnya dengan tepat. Bab ini mengajakmu bermain dengan sudut, segitiga, lingkaran, transformasi, dan bangun ruang.`,
  goals: [
    `Menghitung besar sudut dan menggunakan teorema Pythagoras`,
    `Menghitung keliling, luas, dan juring lingkaran serta memahami kesebangunan`,
    `Menentukan bayangan hasil transformasi dan menghitung volume bangun ruang`
  ],
  lessons: [
    { id: 'mtk-3-a', title: 'Sudut dan Garis', blocks: [
      ['p', `Sudut diukur dalam derajat (°). Sudut siku-siku = 90°, sudut lurus = 180°, dan satu putaran penuh = 360°.`],
      ['table', ['Hubungan sudut', 'Sifat'], [
        ['Berpelurus (pada garis lurus)', `Jumlahnya 180°`],
        ['Berpenyiku', `Jumlahnya 90°`],
        ['Bertolak belakang', `Besarnya sama`],
        ['Tiga sudut dalam segitiga', `Jumlahnya 180°`]
      ]],
      ['h', `Dua garis sejajar dipotong garis lain`],
      ['ul', [
        `Sudut sehadap besarnya sama.`,
        `Sudut dalam berseberangan besarnya sama.`,
        `Sudut dalam sepihak jumlahnya 180°.`
      ]],
      ['ex', `Dua sudut berpenyiku besarnya (2x + 10)° dan (x + 20)°. Tentukan sudut yang lebih besar.`, [
        `Berpenyiku berarti jumlahnya 90°: (2x + 10) + (x + 20) = 90.`,
        `3x + 30 = 90, sehingga x = 20.`,
        `Sudutnya 2(20) + 10 = 50° dan 20 + 20 = 40°.`
      ], `50°`],
      ['ex', `Dua sudut dalam segitiga besarnya 50° dan 65°. Berapa sudut ketiga?`, [
        `Jumlah sudut dalam segitiga adalah 180°.`,
        `180° − 50° − 65° = 65°.`
      ], `65°`],
      ['task', `Coba sendiri`, [
        `Dua sudut berpelurus besarnya 4x° dan (x + 30)°. Tentukan x dan kedua sudutnya.`,
        `Dua garis sejajar dipotong sebuah garis. Jika satu sudut sehadap besarnya 72°, berapa besar sudut sehadap pasangannya?`
      ]]
    ]},
    { id: 'mtk-3-b', title: 'Segitiga dan Teorema Pythagoras', blocks: [
      ['p', `Pada segitiga siku-siku, kuadrat sisi miring (c) sama dengan jumlah kuadrat kedua sisi siku-sikunya (a dan b): <b>a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></b>.`],
      ['note', `Tripel Pythagoras`, `Tiga bilangan bulat yang memenuhi rumus ini, misalnya 3-4-5, 5-12-13, dan 8-15-17, beserta kelipatannya seperti 6-8-10.`],
      ['ex', `Sebuah tangga 13 m bersandar pada dinding. Ujung bawahnya berjarak 5 m dari dinding. Berapa tinggi ujung atas tangga?`, [
        `Sisi miring c = 13 dan sisi mendatar a = 5.`,
        `b<sup>2</sup> = c<sup>2</sup> − a<sup>2</sup> = 169 − 25 = 144.`,
        `b = √144 = 12.`
      ], `12 meter`],
      ['ex', `Berapa panjang diagonal persegi panjang berukuran 8 cm × 6 cm?`, [
        `Diagonal adalah sisi miring segitiga siku-siku dengan sisi 8 dan 6.`,
        `d<sup>2</sup> = 64 + 36 = 100.`,
        `d = 10.`
      ], `10 cm`],
      ['warn', `Hati-hati`, `Tentukan dulu mana sisi miringnya: sisi terpanjang yang berada di depan sudut siku-siku.`],
      ['task', `Coba sendiri`, [
        `Segitiga siku-siku memiliki sisi tegak 9 dan 12. Berapa panjang sisi miringnya?`,
        `Apakah 7, 24, dan 25 membentuk segitiga siku-siku? Buktikan.`,
        `Sebuah kawat dipasang dari puncak tiang setinggi 8 m ke tanah sejauh 6 m dari kaki tiang. Berapa panjang kawat?`
      ]]
    ]},
    { id: 'mtk-3-c', title: 'Lingkaran', blocks: [
      ['p', `Unsur-unsur lingkaran: pusat, jari-jari (r), diameter (d = 2r), busur, tali busur, dan juring.`],
      ['table', ['Besaran', 'Rumus'], [
        ['Keliling', `K = 2πr = πd`],
        ['Luas', `L = πr<sup>2</sup>`],
        ['Panjang busur', `(sudut pusat ÷ 360°) × keliling`],
        ['Luas juring', `(sudut pusat ÷ 360°) × luas lingkaran`]
      ]],
      ['p', `Gunakan π = 22/7 jika jari-jari kelipatan 7, dan π = 3,14 untuk bilangan lainnya.`],
      ['ex', `Jari-jari sebuah lingkaran 21 cm. Hitung keliling dan luasnya (π = 22/7).`, [
        `K = 2 × 22/7 × 21 = 132 cm.`,
        `L = 22/7 × 21 × 21 = 22 × 3 × 21 = 1.386 cm<sup>2</sup>.`
      ], `K = 132 cm dan L = 1.386 cm<sup>2</sup>`],
      ['ex', `Sebuah juring bersudut pusat 60° berada pada lingkaran berjari-jari 7 cm. Hitung luas juringnya.`, [
        `Luas lingkaran = 22/7 × 7 × 7 = 154 cm<sup>2</sup>.`,
        `Luas juring = 60/360 × 154 = 1/6 × 154 ≈ 25,67 cm<sup>2</sup>.`
      ], `Sekitar 25,67 cm<sup>2</sup>`],
      ['note', `Membandingkan juring`, `Dua juring pada lingkaran yang sama dapat dibandingkan lewat sudutnya. Juring 70° luasnya dua kali juring 35°.`],
      ['task', `Coba sendiri`, [
        `Hitung keliling lingkaran berdiameter 28 cm (π = 22/7).`,
        `Sebuah taman melingkar berjari-jari 14 m. Berapa luas bagian juring bersudut 90°?`,
        `Juring A bersudut 40° dan juring B bersudut 120° pada lingkaran yang sama. Berapa kali lipat luas B terhadap A?`
      ]]
    ]},
    { id: 'mtk-3-d', title: 'Kesebangunan dan Kekongruenan', blocks: [
      ['p', `Dua bangun disebut <b>sebangun</b> jika sudut-sudut yang bersesuaian sama besar dan sisi-sisi yang bersesuaian memiliki perbandingan yang sama (skala). Dua bangun disebut <b>kongruen</b> jika sebangun dan ukurannya sama persis.`],
      ['ex', `Segitiga pertama bersisi 6, 8, dan 10 cm. Segitiga kedua sebangun dengannya dan sisi terpendeknya 9 cm. Tentukan kedua sisi lainnya.`, [
        `Skala = 9 ÷ 6 = 1,5.`,
        `Sisi lain: 8 × 1,5 = 12 cm dan 10 × 1,5 = 15 cm.`
      ], `12 cm dan 15 cm`],
      ['ex', `Tiang setinggi 2 m membentuk bayangan 3 m. Pada saat yang sama bayangan sebuah pohon 12 m. Berapa tinggi pohon?`, [
        `Segitiga tiang dan segitiga pohon sebangun.`,
        `tinggi pohon / 12 = 2 / 3.`,
        `tinggi pohon = 12 × 2/3 = 8 m.`
      ], `8 meter`],
      ['note', `Keliling dan luas`, `Jika skala panjang dua bangun sebangun adalah 1 : k, maka perbandingan kelilingnya 1 : k dan perbandingan luasnya 1 : k<sup>2</sup>.`],
      ['task', `Coba sendiri`, [
        `Persegi panjang 10 cm × 4 cm diperbesar dengan skala 3. Berapa ukuran dan keliling hasilnya?`,
        `Sebutkan syarat agar dua segitiga sebangun.`
      ]]
    ]},
    { id: 'mtk-3-e', title: 'Transformasi', blocks: [
      ['p', `Transformasi mengubah posisi atau ukuran bangun pada bidang koordinat. Ada empat jenis: translasi (pergeseran), refleksi (pencerminan), rotasi (perputaran), dan dilatasi (perbesaran atau perkecilan).`],
      ['table', ['Transformasi', 'Aturan', 'Contoh'], [
        [`Translasi (a, b)`, `(x, y) → (x + a, y + b)`, `(2, 3) ditranslasi (−4, −2) → (−2, 1)`],
        [`Refleksi terhadap sumbu x`, `(x, y) → (x, −y)`, `(3, 5) → (3, −5)`],
        [`Refleksi terhadap sumbu y`, `(x, y) → (−x, y)`, `(3, 5) → (−3, 5)`],
        [`Dilatasi pusat O, faktor k`, `(x, y) → (kx, ky)`, `(2, 3) dengan k = 2 → (4, 6)`]
      ]],
      ['p', `Rotasi 90° berlawanan arah jarum jam dengan pusat O: (x, y) → (−y, x).`],
      ['ex', `Segitiga ABC dengan A(1, 1), B(4, 1), dan C(1, 3) ditranslasi oleh (3, −2). Tentukan bayangannya.`, [
        `A′ = (1 + 3, 1 − 2) = (4, −1).`,
        `B′ = (4 + 3, 1 − 2) = (7, −1).`,
        `C′ = (1 + 3, 3 − 2) = (4, 1).`
      ], `A′(4, −1), B′(7, −1), C′(4, 1)`],
      ['note', `Translasi menjaga bentuk`, `Bayangan hasil translasi kongruen dengan bangun semula. Hanya posisinya yang berpindah.`],
      ['task', `Coba sendiri`, [
        `Titik P(−2, 5) direfleksikan terhadap sumbu y. Di mana bayangannya?`,
        `Titik Q(3, −4) didilatasi dengan pusat O dan faktor 3. Tentukan bayangannya.`,
        `Tentukan bayangan titik (2, 5) setelah rotasi 90° berlawanan arah jarum jam dengan pusat O.`
      ]]
    ]},
    { id: 'mtk-3-f', title: 'Bangun Ruang dan Volume', blocks: [
      ['p', `Bangun ruang memiliki volume (isi) dan luas permukaan. Bangun yang sering muncul: balok, kubus, prisma, tabung, dan limas.`],
      ['table', ['Bangun', 'Volume', 'Catatan'], [
        ['Balok', `p × l × t`, ``],
        ['Kubus', `s<sup>3</sup>`, ``],
        ['Prisma', `Luas alas × tinggi`, `Alas bisa segitiga, persegi, dan lainnya`],
        ['Tabung', `πr<sup>2</sup>t`, `Alasnya lingkaran`],
        ['Limas', `1/3 × luas alas × tinggi`, ``]
      ]],
      ['note', `Perhatikan satuan`, `1 dm<sup>3</sup> = 1 liter dan 1 m<sup>3</sup> = 1.000 liter. Samakan satuan panjang lebih dulu sebelum menghitung volume.`],
      ['ex', `Sebuah tangki berbentuk balok berukuran 5 dm × 2 m × 0,6 m. Berapa liter isinya saat penuh?`, [
        `Samakan ke dm: 2 m = 20 dm dan 0,6 m = 6 dm.`,
        `V = 5 × 20 × 6 = 600 dm<sup>3</sup>.`,
        `600 dm<sup>3</sup> = 600 liter.`
      ], `600 liter`],
      ['ex', `Alas sebuah prisma berbentuk segitiga siku-siku dengan sisi siku-siku 6 cm dan 8 cm. Tinggi prisma 10 cm. Hitung volumenya.`, [
        `Luas alas = 1/2 × 6 × 8 = 24 cm<sup>2</sup>.`,
        `V = 24 × 10 = 240 cm<sup>3</sup>.`
      ], `240 cm<sup>3</sup>`],
      ['p', `<b>Jaring-jaring</b> adalah bangun ruang yang dibuka menjadi bidang datar. Jaring-jaring prisma segitiga terdiri atas 2 segitiga (alas dan tutup) dan 3 persegi panjang (sisi tegak).`],
      ['net', { shape: 'kubus' }],
      ['p', `Coba lipat dan bentangkan bangun di atas. Saat masih berupa jaring-jaring, hitung dulu banyak sisinya; saat sudah terlipat, kamu bisa melihat sisi mana yang tadinya berimpit menjadi rusuk.`],
      ['task', `Coba sendiri`, [
        `Hitung volume tabung berjari-jari 7 cm dan tinggi 10 cm (π = 22/7).`,
        `Ada berapa persegi panjang pada jaring-jaring prisma segitiga?`,
        `Kolam berukuran 4 m × 3 m dengan kedalaman 150 cm diisi penuh. Berapa liter airnya?`
      ]]
    ]}
  ],
  summary: [
    `Sudut berpelurus berjumlah 180°, berpenyiku 90°, dan sudut dalam segitiga 180°.`,
    `Pythagoras: a² + b² = c², dengan c sisi miring.`,
    `Luas juring = (sudut pusat ÷ 360°) × luas lingkaran.`,
    `Volume prisma = luas alas × tinggi; samakan satuan sebelum menghitung.`
  ]
},

/* ================================================================
   MATEMATIKA · BAB 4: DATA DAN PELUANG
   ================================================================ */
{
  id: 'mtk-4', subject: 'mtk', bab: 'Data dan Peluang', no: '04',
  intro: `Berita, hasil survei, dan prakiraan cuaca penuh dengan data dan kemungkinan. Bab ini melatihmu membaca data dengan cermat dan menghitung peluang.`,
  goals: [
    `Membaca dan memilih penyajian data yang sesuai`,
    `Menghitung mean, median, dan modus`,
    `Menghitung peluang suatu kejadian`
  ],
  lessons: [
    { id: 'mtk-4-a', title: 'Penyajian Data', blocks: [
      ['p', `Data dapat disajikan dalam tabel, diagram batang, diagram garis, atau diagram lingkaran. Pilih bentuk yang sesuai dengan tujuan.`],
      ['table', ['Jenis diagram', 'Cocok untuk'], [
        ['Batang', `Membandingkan jumlah antarkategori`],
        ['Garis', `Melihat naik-turunnya data dari waktu ke waktu`],
        ['Lingkaran', `Melihat bagian terhadap keseluruhan (persen)`]
      ]],
      ['h', `Tips membaca diagram`],
      ['ol', [
        `Baca judul dan keterangan sumbu (perhatikan satuannya).`,
        `Lihat angka awal sumbu. Sumbu yang tidak dimulai dari 0 membuat perbedaan tampak lebih besar.`,
        `Cocokkan titik atau batang dengan angka pada tabel.`
      ]],
      ['ex', `Jumlah pohon yang ditanam sekolah: 2022 = 40, 2023 = 55, 2024 = 70. Diagram apa yang cocok, dan apa kesimpulannya?`, [
        `Data berubah dari tahun ke tahun, jadi diagram garis cocok.`,
        `Garis naik: setiap tahun bertambah 15 pohon.`
      ], `Diagram garis; jumlah pohon terus meningkat 15 per tahun`],
      ['ex', `Diagram lingkaran kegemaran 40 siswa: olahraga 50%, musik 25%, membaca 25%. Berapa siswa yang suka musik?`, [
        `25% × 40 = 10.`
      ], `10 siswa`],
      ['task', `Coba sendiri`, [
        `Mengapa diagram garis kurang cocok untuk membandingkan jumlah siswa di tiga kelas?`,
        `Data: Senin 12, Selasa 15, Rabu 9, Kamis 18. Hari apa yang tertinggi, dan berapa selisih nilai tertinggi dengan terendah?`
      ]]
    ]},
    { id: 'mtk-4-b', title: 'Mean, Median, dan Modus', blocks: [
      ['p', `Tiga ukuran pemusatan data: <b>mean</b> (rata-rata), <b>median</b> (nilai tengah setelah diurutkan), dan <b>modus</b> (nilai yang paling sering muncul).`],
      ['table', ['Ukuran', 'Cara menghitung'], [
        ['Mean', `Jumlah semua data ÷ banyak data`],
        ['Median', `Urutkan data. Jika banyak data ganjil: nilai tengahnya. Jika genap: rata-rata dua nilai tengah.`],
        ['Modus', `Nilai dengan frekuensi terbanyak`]
      ]],
      ['ex', `Data: 3, 5, 5, 8, 9. Tentukan mean, median, dan modus.`, [
        `Mean = (3 + 5 + 5 + 8 + 9) ÷ 5 = 30 ÷ 5 = 6.`,
        `Data sudah terurut dan banyaknya 5, sehingga nilai tengah adalah data ke-3, yaitu 5.`,
        `Angka 5 muncul dua kali (paling sering), jadi modus = 5.`
      ], `Mean 6, median 5, modus 5`],
      ['ex', `Data: 4, 6, 7, 9, 10, 12. Tentukan mediannya.`, [
        `Banyak data 6 (genap).`,
        `Dua nilai tengahnya 7 dan 9.`,
        `Median = (7 + 9) ÷ 2 = 8.`
      ], `8`],
      ['warn', `Data ekstrem`, `Satu data yang sangat besar atau kecil dapat menggeser mean, tetapi median hampir tidak berubah. Pada data 3, 5, 5, 8, 90, mean menjadi 22,2 sedangkan median tetap 5.`],
      ['task', `Coba sendiri`, [
        `Tentukan mean dan modus dari 6, 7, 8, 8, 9, 9, 9.`,
        `Rata-rata 4 nilai adalah 7. Jika ditambah satu nilai 12, berapa rata-rata barunya?`
      ]]
    ]},
    { id: 'mtk-4-c', title: 'Peluang', blocks: [
      ['p', `Peluang menyatakan seberapa mungkin suatu kejadian terjadi: <b>P(A) = banyak hasil yang diinginkan ÷ banyak semua hasil yang mungkin</b>. Nilainya antara 0 (mustahil) dan 1 (pasti).`],
      ['table', ['Percobaan', 'Semua hasil', 'Contoh peluang'], [
        ['Melempar koin', `Angka atau gambar (2 hasil)`, `P(angka) = 1/2`],
        ['Melempar dadu', `1 sampai 6 (6 hasil)`, `P(genap) = 3/6 = 1/2`],
        ['Mengambil kartu', `52 kartu`, `P(hati) = 13/52 = 1/4`]
      ]],
      ['p', `Peluang komplemen: P(bukan A) = 1 − P(A). Frekuensi harapan = P(A) × banyak percobaan.`],
      ['ex', `Kantong berisi 4 kelereng hitam dan 2 kelereng putih. Satu kelereng diambil acak. Berapa peluang terambil hitam?`, [
        `Semua hasil: 4 + 2 = 6.`,
        `Hasil yang diinginkan: 4.`,
        `P(hitam) = 4/6 = 2/3.`
      ], `2/3`],
      ['ex', `Sebuah dadu dilempar 60 kali. Berapa frekuensi harapan muncul angka 6?`, [
        `P(6) = 1/6.`,
        `Frekuensi harapan = 1/6 × 60 = 10.`
      ], `10 kali`],
      ['ex', `Dari kantong berisi 4 kelereng merah dan 2 putih, diambil satu kelereng tanpa dikembalikan, lalu diambil satu lagi. Berapa peluang keduanya merah?`, [
        `Pengambilan pertama: 4/6.`,
        `Setelah satu merah terambil, tersisa 3 merah dari 5 kelereng: 3/5.`,
        `Peluang keduanya merah = 4/6 × 3/5 = 12/30 = 2/5.`
      ], `2/5`],
      ['task', `Coba sendiri`, [
        `Berapa peluang muncul angka lebih dari 4 pada pelemparan satu dadu?`,
        `Peluang hujan besok 0,3. Berapa peluang tidak hujan?`,
        `Dua koin dilempar bersamaan. Tuliskan semua hasilnya, lalu tentukan peluang muncul dua angka.`
      ]]
    ]}
  ],
  summary: [
    `Pilih diagram sesuai tujuan: batang untuk perbandingan, garis untuk perubahan, lingkaran untuk bagian dari keseluruhan.`,
    `Mean = jumlah ÷ banyak data; median = nilai tengah; modus = paling sering muncul.`,
    `P(A) = hasil yang diinginkan ÷ semua hasil yang mungkin.`,
    `Tanpa pengembalian, jumlah semua hasil berkurang pada pengambilan berikutnya.`
  ]
},

/* ================================================================
   BAHASA INDONESIA · BAB 1: PEMAHAMAN TEKSTUAL (LITERAL)
   ================================================================ */
{
  id: 'ind-1', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', no: '01',
  intro: `Sebelum menafsirkan sebuah teks, kita perlu memahami apa yang tertulis di dalamnya. Bab ini melatihmu menemukan informasi yang disebutkan langsung, memahami makna kata, dan membaca detail dengan teliti.`,
  goals: [
    `Menemukan informasi tersurat dalam teks`,
    `Menentukan makna kata dan istilah berdasarkan konteks`,
    `Membaca detail pada teks, tabel, dan infografik serta membandingkan dua teks`
  ],
  lessons: [
    { id: 'ind-1-a', title: 'Menemukan Informasi Tersurat', blocks: [
      ['p', `Informasi tersurat adalah informasi yang ditulis langsung dalam teks. Kamu tidak perlu menebak-nebak; cukup menemukan kalimat yang menyebutkannya.`],
      ['h', `Langkah menemukannya`],
      ['ol', [
        `Baca pertanyaan lebih dulu dan tentukan kata kuncinya (siapa, apa, kapan, di mana, mengapa, bagaimana).`,
        `Baca teks, lalu cari kata kunci atau padanan katanya.`,
        `Baca kalimat di sekitar kata kunci, lalu cocokkan dengan pilihan jawaban.`
      ]],
      ['text', `Teks contoh`, `Pasar Malam Kenanga dibuka setiap Jumat dan Sabtu pukul 17.00–22.00 di halaman parkir stadion. Pengunjung yang membawa tas belanja sendiri mendapat potongan harga Rp2.000 pada setiap pembelian.`],
      ['table', ['Pertanyaan', 'Jawaban tersurat'], [
        [`Kapan pasar malam dibuka?`, `Jumat dan Sabtu, pukul 17.00–22.00`],
        [`Di mana pasar malam diadakan?`, `Di halaman parkir stadion`],
        [`Apa keuntungan membawa tas belanja sendiri?`, `Potongan harga Rp2.000 pada setiap pembelian`]
      ]],
      ['note', `Tips`, `Jika sebuah pilihan jawaban memuat informasi yang tidak ada di teks, walaupun terdengar masuk akal, itu bukan informasi tersurat.`],
      ['task', `Coba sendiri`, [
        `Tulis tiga pertanyaan (apa, siapa, kapan) dari teks contoh yang jawabannya tersurat.`,
        `Temukan satu informasi yang TIDAK terdapat dalam teks tersebut.`
      ]]
    ]},
    { id: 'ind-1-b', title: 'Makna Kata dan Istilah', blocks: [
      ['p', `Makna sebuah kata bergantung pada konteks kalimatnya. Kata yang sama dapat berbeda arti pada kalimat yang berbeda.`],
      ['table', ['Jenis makna', 'Penjelasan', 'Contoh'], [
        ['Denotatif', `Makna sebenarnya (sesuai kamus)`, `Ia mencuci <b>tangan</b> sebelum makan.`],
        ['Konotatif', `Makna kiasan atau bernilai rasa`, `Dia <b>tangan kanan</b> direktur (orang kepercayaan).`],
        ['Sinonim', `Kata yang bermakna sama atau mirip`, `cermat = teliti`],
        ['Antonim', `Kata yang bermakna berlawanan`, `cermat ≠ ceroboh`]
      ]],
      ['h', `Menebak makna dari konteks`],
      ['ul', [
        `Cari sinonim atau penjelasan di kalimat yang sama atau kalimat sebelumnya.`,
        `Perhatikan kata penanda pertentangan (tetapi, namun, meskipun) untuk menemukan antonim.`,
        `Gantikan kata itu dengan pilihan jawaban, lalu cek apakah kalimat tetap bermakna sama.`
      ]],
      ['ex', `“Penjelasan gurunya sangat <b>lugas</b>, tidak berbelit-belit, sehingga mudah dipahami.” Apa makna kata <i>lugas</i>?`, [
        `Kata “tidak berbelit-belit” menjelaskan sifat penjelasan itu.`,
        `Penjelasan yang langsung ke pokok persoalan akan mudah dipahami.`,
        `Jadi, lugas berarti langsung pada pokoknya dan jelas.`
      ], `Langsung pada pokok dan jelas`],
      ['note', `Istilah dan kata serapan`, `Istilah adalah kata khusus pada bidang tertentu, misalnya <i>hipotesis</i> dalam sains. Kata serapan berasal dari bahasa lain, misalnya <i>kualitas</i> (dari <i>quality</i>). Periksa ejaannya di KBBI.`],
      ['task', `Coba sendiri`, [
        `Carilah sinonim dan antonim dari kata “gigih”.`,
        `Tulis dua kalimat dengan kata “kepala”: satu bermakna denotatif dan satu bermakna konotatif.`
      ]]
    ]},
    { id: 'ind-1-c', title: 'Identifikasi Detail Teks', blocks: [
      ['p', `Detail teks adalah rincian penting dalam teks: nama, angka, tempat, waktu, urutan, serta data pada tabel atau grafik.`],
      ['h', `Membaca teks yang disertai tabel atau infografik`],
      ['ul', [
        `Baca judul tabel atau infografik lebih dulu.`,
        `Perhatikan satuan dan tahunnya.`,
        `Cocokkan pernyataan dengan angka. Hitung bila perlu (persen, selisih, jumlah).`
      ]],
      ['table', ['Lama membaca per hari', 'Jumlah siswa'], [
        ['30 menit atau lebih', `90`],
        ['10–30 menit', `70`],
        ['Kurang dari 10 menit', `40`]
      ]],
      ['ex', `Pada tabel di atas, apakah lebih dari separuh dari 200 siswa membaca 30 menit atau lebih?`, [
        `Separuh dari 200 adalah 100.`,
        `Yang membaca 30 menit atau lebih: 90 siswa.`,
        `90 &lt; 100, jadi pernyataan itu salah (hanya 45%).`
      ], `Salah; hanya 45%`],
      ['h', `Membandingkan dua teks`],
      ['p', `Saat membandingkan dua teks, catat persamaannya (topik, isi yang dibahas) dan perbedaannya (sudut pandang, data yang disajikan, gaya bahasa). Tabel dua kolom membantu merapikannya.`],
      ['task', `Coba sendiri`, [
        `Berapa persen siswa yang membaca kurang dari 10 menit pada tabel di atas?`,
        `Pilih dua teks tentang topik yang sama (misalnya museum) dan buat tabel persamaan dan perbedaannya.`
      ]]
    ]}
  ],
  summary: [
    `Informasi tersurat ditulis langsung di teks; cari lewat kata kunci pertanyaan.`,
    `Makna kata ditentukan oleh konteks kalimat.`,
    `Pada tabel dan infografik, periksa judul, satuan, dan hitung angkanya sebelum menjawab.`
  ]
},

/* ================================================================
   BAHASA INDONESIA · BAB 2: PEMAHAMAN INFERENSIAL
   ================================================================ */
{
  id: 'ind-2', subject: 'ind', bab: 'Pemahaman Inferensial', no: '02',
  intro: `Tidak semua hal ditulis langsung. Kadang kita harus menghubungkan beberapa informasi untuk menemukan maknanya. Bab ini melatihmu menyimpulkan, menemukan ide pokok, dan menelusuri sebab-akibat.`,
  goals: [
    `Menyimpulkan isi teks dengan menggabungkan beberapa informasi`,
    `Menentukan ide pokok dan gagasan pendukung paragraf`,
    `Menemukan hubungan sebab-akibat dalam teks`
  ],
  lessons: [
    { id: 'ind-2-a', title: 'Menyimpulkan Isi Teks', blocks: [
      ['p', `Simpulan diambil dari gabungan beberapa fakta dalam teks. Simpulan bukan sekadar mengulang satu kalimat, dan bukan pula menambah hal yang tidak ada dalam teks.`],
      ['table', ['Bukan simpulan yang baik', 'Simpulan yang baik'], [
        [`Mengulang satu fakta saja`, `Menggabungkan beberapa fakta menjadi pernyataan umum`],
        [`Menambah informasi yang tidak ada di teks`, `Tetap berdasar isi teks`],
        [`Terlalu sempit atau terlalu luas`, `Cakupannya pas dengan teks`]
      ]],
      ['p', `Kata penanda simpulan: <i>jadi, dengan demikian, oleh karena itu, singkatnya</i>.`],
      ['text', `Teks contoh`, `Embung di Desa Mekarsari mulai mengering. Petani harus mengambil air dari sumur yang jaraknya dua kilometer. Hasil panen jagung turun karena sawah jarang diairi. Padahal, perbaikan saluran air baru direncanakan tahun depan.`],
      ['ex', `Apa simpulan teks di atas?`, [
        `Fakta 1: sumber air desa berkurang (embung mengering).`,
        `Fakta 2: petani kesulitan dan panen menurun.`,
        `Fakta 3: perbaikan saluran air masih lama.`,
        `Gabungkan menjadi satu pernyataan umum.`
      ], `Kekeringan embung merugikan petani, sehingga perbaikan saluran air perlu dipercepat.`],
      ['warn', `Jangan terlalu jauh`, `“Semua petani akan pindah dari desa” bukan simpulan yang baik karena tidak didukung teks.`],
      ['task', `Coba sendiri`, [
        `Tuliskan satu simpulan dari teks tentang kebiasaan membaca pada bab sebelumnya.`,
        `Mengapa “Seluruh jagung di desa itu gagal panen” kurang tepat sebagai simpulan teks contoh?`
      ]]
    ]},
    { id: 'ind-2-b', title: 'Ide Pokok dan Gagasan Pendukung', blocks: [
      ['p', `Ide pokok (gagasan utama) adalah inti yang dibahas dalam sebuah paragraf. Kalimat yang memuatnya disebut kalimat utama, sedangkan kalimat lain berfungsi sebagai kalimat penjelas.`],
      ['table', ['Pola paragraf', 'Letak kalimat utama'], [
        ['Deduktif', `Di awal paragraf`],
        ['Induktif', `Di akhir paragraf`],
        ['Campuran', `Di awal dan di akhir paragraf`]
      ]],
      ['text', `Paragraf deduktif`, `Membaca setiap hari memberi banyak manfaat. Membaca menambah kosakata. Membaca melatih kita untuk fokus. Membaca juga membuat kita lebih mudah menulis.`],
      ['ex', `Tentukan ide pokok paragraf di atas.`, [
        `Kalimat pertama paling umum dan mencakup isi paragraf.`,
        `Kalimat berikutnya memberi rincian manfaat, jadi berfungsi sebagai gagasan pendukung.`
      ], `Membaca setiap hari memberi banyak manfaat.`],
      ['text', `Paragraf induktif`, `Kantin sekolah menjual gorengan, kerupuk, dan minuman manis. Jajanan di luar pagar pun tidak jauh berbeda. Ternyata, makanan di sekitar sekolah kurang sehat.`],
      ['ex', `Tentukan ide pokok paragraf induktif di atas.`, [
        `Dua kalimat awal berisi contoh.`,
        `Kalimat terakhir merangkum semuanya.`
      ], `Makanan di sekitar sekolah kurang sehat.`],
      ['note', `Tips`, `Ide pokok bersifat umum, sedangkan gagasan pendukung berisi contoh, data, atau alasan. Hindari pilihan jawaban yang hanya membahas satu contoh.`],
      ['task', `Coba sendiri`, [
        `Tulis satu paragraf induktif tentang kebiasaan sarapan.`,
        `Pada paragraf deduktif, apa fungsi kalimat kedua dan seterusnya?`
      ]]
    ]},
    { id: 'ind-2-c', title: 'Hubungan Sebab-Akibat', blocks: [
      ['p', `Hubungan sebab-akibat menjelaskan <i>mengapa</i> sesuatu terjadi (sebab) dan <i>apa yang terjadi kemudian</i> (akibat).`],
      ['table', ['Penanda sebab', 'Penanda akibat'], [
        [`karena, sebab, lantaran, akibat dari`, `sehingga, akibatnya, maka, oleh karena itu`]
      ]],
      ['text', `Teks contoh`, `Musim kemarau panjang membuat debit sungai menurun. Sawah kekurangan air sehingga padi gagal tumbuh. Akibatnya, harga beras naik di pasar.`],
      ['ex', `Susun rantai sebab-akibat teks di atas.`, [
        `Mulai dari peristiwa awal: musim kemarau panjang.`,
        `Tanyakan berulang kali: “lalu apa akibatnya?”`,
        `Hasilnya: kemarau panjang → debit sungai turun → sawah kekurangan air → padi gagal tumbuh → harga beras naik.`
      ], `Kemarau panjang menyebabkan kenaikan harga beras melalui rangkaian akibat tersebut.`],
      ['note', `Cek dengan dua pertanyaan`, `Sebab: “mengapa itu terjadi?” Akibat: “lalu apa yang terjadi setelah itu?”`],
      ['task', `Coba sendiri`, [
        `Tuliskan penyebab dan akibat dari kebiasaan membuang sampah sembarangan.`,
        `Gabungkan dua kalimat berikut dengan kata “sehingga”: “Jalan berlubang. Banyak pengendara terjatuh.”`
      ]]
    ]}
  ],
  summary: [
    `Simpulan menggabungkan beberapa fakta dan tetap berdasar teks.`,
    `Ide pokok terdapat pada kalimat utama; kalimat lain menjelaskan.`,
    `Telusuri sebab-akibat dengan pertanyaan “mengapa?” dan “lalu apa akibatnya?”.`
  ]
},

/* ================================================================
   BAHASA INDONESIA · BAB 3: EVALUASI DAN APRESIASI TEKS
   ================================================================ */
{
  id: 'ind-3', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', no: '03',
  intro: `Pembaca yang baik tidak hanya memahami, tetapi juga menilai. Di bab ini kamu belajar menilai kekuatan argumen, membedakan teks sastra dan nonsastra, serta menanggapi pesan penulis dengan alasan yang jelas.`,
  goals: [
    `Menilai argumen berdasarkan alasan dan bukti`,
    `Membedakan ragam sastra dan nonsastra serta mengenali unsur puisi dan cerpen`,
    `Menemukan pesan penulis dan memberi tanggapan yang santun dan beralasan`
  ],
  lessons: [
    { id: 'ind-3-a', title: 'Menilai Argumen dan Bukti', blocks: [
      ['p', `Argumen yang baik terdiri atas <b>pendapat</b>, <b>alasan</b>, dan <b>bukti</b> (data, hasil penelitian, pendapat ahli, atau contoh nyata).`],
      ['table', ['Fakta', 'Opini'], [
        [`Dapat dibuktikan kebenarannya`, `Pendapat atau penilaian pribadi`],
        [`“Survei menunjukkan 60% siswa membuka media sosial saat jam belajar.”`, `“Media sosial itu sangat mengganggu.”`]
      ]],
      ['h', `Pertanyaan untuk menguji argumen`],
      ['ul', [
        `Apakah alasannya berhubungan dengan pendapat?`,
        `Adakah bukti yang dapat diperiksa?`,
        `Adakah generalisasi berlebihan, misalnya kata “semua”, “selalu”, atau “pasti”?`,
        `Apakah sumbernya dapat dipercaya?`
      ]],
      ['ex', `“Anak muda sekarang tidak suka membaca. Semua orang tahu itu.” Nilai argumen ini.`, [
        `Pendapat: anak muda tidak suka membaca.`,
        `Alasan: “semua orang tahu itu”.`,
        `Tidak ada data, dan “semua orang” adalah generalisasi.`
      ], `Argumen lemah: menggeneralisasi tanpa bukti. Perlu data, misalnya hasil survei.`],
      ['task', `Coba sendiri`, [
        `Tulis satu pendapat tentang jam masuk sekolah lengkap dengan alasan dan bukti.`,
        `Ubah “Semua orang malas olahraga” menjadi pernyataan yang lebih tepat.`
      ]]
    ]},
    { id: 'ind-3-b', title: 'Ragam Sastra dan Nonsastra', blocks: [
      ['p', `<b>Teks sastra</b> bersifat imajinatif, memakai bahasa kias, dan menyentuh perasaan. <b>Teks nonsastra</b> bersifat faktual, lugas, dan bertujuan memberi informasi atau membujuk.`],
      ['table', ['Aspek', 'Sastra', 'Nonsastra'], [
        ['Isi', `Imajinatif / rekaan`, `Fakta / informasi`],
        ['Bahasa', `Kiasan, indah, bisa bermakna ganda`, `Lugas, satu makna`],
        ['Tujuan', `Menghibur, menyentuh, mengajak merenung`, `Memberi tahu, menjelaskan, membujuk`],
        ['Contoh', `Puisi, cerpen, novel, drama`, `Berita, pengumuman, iklan, artikel`]
      ]],
      ['h', `Unsur puisi`],
      ['ul', [
        `<b>Diksi:</b> pilihan kata.`,
        `<b>Citraan:</b> gambaran yang ditangkap indera (penglihatan, pendengaran, perabaan, dan lainnya).`,
        `<b>Majas:</b> gaya bahasa kias, misalnya perumpamaan, personifikasi, dan metafora.`,
        `<b>Rima dan irama:</b> bunyi dan alunan.`
      ]],
      ['text', `Contoh kutipan puisi`, `Bulan menuang perak di punggung laut,<br>ombak menyanyikan kidung yang lirih.`],
      ['p', `“Bulan menuang” dan “ombak menyanyikan” memberi sifat manusia pada benda (personifikasi). “Perak di punggung laut” memunculkan citraan penglihatan, sedangkan “kidung yang lirih” memunculkan citraan pendengaran.`],
      ['h', `Unsur cerpen`],
      ['p', `Unsur intrinsik: tema, tokoh dan penokohan, alur, latar, sudut pandang, gaya bahasa, dan amanat. Unsur ekstrinsik: latar belakang pengarang, latar belakang masyarakat, dan nilai-nilai yang terkandung.`],
      ['task', `Coba sendiri`, [
        `Tentukan mana yang sastra dan nonsastra: (a) “Pengumuman: perpustakaan tutup hari Jumat.” (b) “Malam merebahkan sunyi di bahu kota.”`,
        `Tulis dua baris puisi dengan majas personifikasi tentang hujan.`
      ]]
    ]},
    { id: 'ind-3-c', title: 'Menanggapi Pesan Penulis', blocks: [
      ['p', `<b>Tema</b> adalah gagasan pokok cerita. <b>Amanat</b> atau pesan adalah nilai yang ingin disampaikan penulis kepada pembaca. Pesan biasanya tidak ditulis langsung, melainkan disimpulkan dari tindakan tokoh dan akhir cerita.`],
      ['h', `Menemukan pesan penulis`],
      ['ol', [
        `Perhatikan masalah yang dihadapi tokoh.`,
        `Lihat pilihan atau tindakan tokoh dan akibatnya.`,
        `Rumuskan pelajaran umumnya dalam satu kalimat (“Kita sebaiknya …”).`
      ]],
      ['text', `Teks contoh`, `Sari memenangi lomba menulis cerita dengan karya yang ia kerjakan sendiri. Sebelumnya, temannya menawarkan tulisan jadi yang lebih bagus, tetapi Sari menolak. Ia hanya meraih juara tiga. Meski begitu, Sari pulang dengan senyum karena bangga pada hasil tangannya sendiri.`],
      ['ex', `Apa pesan teks di atas?`, [
        `Masalah: Sari tergoda memakai tulisan orang lain.`,
        `Tindakan: ia menolak dan memakai karyanya sendiri.`,
        `Akhir: ia bangga walau hanya juara tiga.`
      ], `Berkarya dengan jujur lebih berharga daripada menang dengan cara curang.`],
      ['h', `Memberi kritik terhadap teks`],
      ['p', `Kritik yang baik menyebut bagian yang kuat dan yang lemah disertai alasan. Kelemahan teks opini, misalnya: tidak ada data, alasan tidak dirinci, memakai kata tidak baku (seperti “pokoknya”), atau kalimat yang berbelit.`],
      ['note', `Santun dan beralasan`, `Gunakan kalimat seperti “Menurut saya, bagian ini kurang kuat karena … sebaiknya ditambahkan …”.`],
      ['task', `Coba sendiri`, [
        `Rumuskan pesan dari cerpen terakhir yang kamu baca.`,
        `Pilih satu teks opini, lalu tulis dua kekuatan dan dua kelemahannya.`
      ]]
    ]}
  ],
  summary: [
    `Argumen kuat memiliki pendapat, alasan yang relevan, dan bukti; waspadai generalisasi.`,
    `Teks sastra bersifat imajinatif dan kias; teks nonsastra bersifat faktual dan lugas.`,
    `Pesan penulis disimpulkan dari tindakan tokoh dan akhir cerita.`
  ]
}

];

window.MATERI = MATERI;
