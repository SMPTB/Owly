/* =========================================================
   soal.js — DATA SOAL untuk halaman Bank Soal
   Gaya soal mengikuti pre-test TKA: ada stimulus (teks/tabel),
   lalu salah satu dari tiga jenis jawaban:

   type: 'pg'     -> pilihan ganda (satu jawaban).        answer: nomor pilihan (mulai 0)
   type: 'multi'  -> pilihan ganda kompleks (lebih dari   answer: daftar nomor, mis. [0, 2]
                     satu jawaban benar)
   type: 'table'  -> tabel pernyataan (Benar/Salah, dst.) cols: dua label kolom,
                                                          rows: [{ t: pernyataan, a: 0 atau 1 }]
                                                          a = nomor kolom yang benar

   Cara menambah soal: salin salah satu blok { ... }, ganti isinya,
   lalu tambahkan di dalam daftar SOAL. Teks boleh memakai HTML sederhana
   (<b>, <i>, <sup>, <table>).
   ========================================================= */

const TOPICS = {
  mtk: ['Bilangan', 'Aljabar', 'Geometri dan Pengukuran', 'Data dan Peluang'],
  ind: ['Pemahaman Tekstual (Literal)', 'Pemahaman Inferensial', 'Evaluasi dan Apresiasi Teks']
};

const SOAL = [

  /* ================= MATEMATIKA · Bab 1: Bilangan ================= */
    {
    id: 'MTK-001', subject: 'mtk', bab: 'Bilangan', title: 'Operasi bilangan berpangkat',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Lantai sebuah aula berbentuk persegi. Panjang sisinya 5<sup>3</sup> dm.</p>',
    question: 'Luas lantai aula tersebut adalah … dm²',
    options: ['5<sup>5</sup>', '5<sup>6</sup>', '5<sup>9</sup>', '5<sup>12</sup>'],
    answer: 1,
    explain: 'Luas persegi = sisi × sisi = 5<sup>3</sup> × 5<sup>3</sup> = 5<sup>3+3</sup> = 5<sup>6</sup> dm².'
  },
  {
    id: 'MTK-002', subject: 'mtk', bab: 'Bilangan', title: 'Bilangan rasional dan irasional',
    level: 'Dasar', type: 'multi', stimulus: '',
    question: 'Manakah yang merupakan bilangan irasional?',
    options: ['√16', '√20', 'π', '22/7'],
    answer: [1, 2],
    explain: '√16 = 4 dan 22/7 adalah pecahan, jadi keduanya rasional. √20 tidak dapat dinyatakan sebagai pecahan, begitu juga π, sehingga keduanya irasional.'
  },
  {
    id: 'MTK-003', subject: 'mtk', bab: 'Bilangan', title: 'Perbandingan dalam resep kue',
    level: 'Sedang', type: 'table',
    stimulus: '<p>Resep kue untuk <b>10 potong</b> memerlukan 250 gram tepung, 100 gram gula, dan 2 butir telur.</p>',
    question: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
    cols: ['Benar', 'Salah'],
    rows: [
      { t: 'Perbandingan banyak tepung dan gula adalah 5 : 2.', a: 0 },
      { t: 'Untuk membuat 20 potong kue diperlukan 4 butir telur.', a: 0 },
      { t: 'Untuk membuat 15 potong kue diperlukan 300 gram tepung.', a: 1 }
    ],
    explain: '250 : 100 disederhanakan menjadi 5 : 2 (benar). 20 potong = 2 kali resep, sehingga telur 2 × 2 = 4 butir (benar). 15 potong = 1,5 kali resep, sehingga tepung 1,5 × 250 = 375 gram, bukan 300 gram (salah).'
  },

  /* ================= MATEMATIKA · Bab 2: Aljabar ================= */
  {
    id: 'MTK-004', subject: 'mtk', bab: 'Aljabar', title: 'Sistem persamaan linear dua variabel',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Dina membeli 2 pensil dan 3 buku seharga Rp19.000. Rani membeli 1 pensil dan 2 buku seharga Rp11.000. Harga pensil dan buku pada kedua pembelian sama.</p>',
    question: 'Harga satu buku adalah …',
    options: ['Rp2.000', 'Rp3.000', 'Rp4.000', 'Rp5.000'],
    answer: 1,
    explain: 'Misalkan pensil = p dan buku = b. Diperoleh 2p + 3b = 19.000 dan p + 2b = 11.000. Kalikan persamaan kedua dengan 2: 2p + 4b = 22.000. Kurangkan dengan persamaan pertama: b = 3.000. Jadi harga satu buku Rp3.000 (harga pensil Rp5.000).'
  },
  {
    id: 'MTK-005', subject: 'mtk', bab: 'Aljabar', title: 'Relasi dan fungsi',
    level: 'Dasar', type: 'table',
    stimulus: '<p>Diketahui himpunan A = {1, 2, 3} dan B = {a, b, c, d}.</p>',
    question: 'Tentukan apakah relasi dari A ke B berikut merupakan fungsi atau bukan fungsi!',
    cols: ['Fungsi', 'Bukan fungsi'],
    rows: [
      { t: 'R₁ = {(1, a), (2, b), (3, b)}', a: 0 },
      { t: 'R₂ = {(1, a), (1, b), (2, c), (3, d)}', a: 1 },
      { t: 'R₃ = {(1, c), (2, d)}', a: 1 }
    ],
    explain: 'Relasi disebut fungsi jika setiap anggota A memiliki tepat satu pasangan di B. R₁ adalah fungsi (anggota B boleh dipakai lebih dari sekali). R₂ bukan fungsi karena 1 berpasangan dengan a dan b. R₃ bukan fungsi karena 3 tidak punya pasangan.'
  },
  {
    id: 'MTK-006', subject: 'mtk', bab: 'Aljabar', title: 'Barisan aritmetika pada susunan kursi',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Sebuah gedung pertunjukan menata kursi dalam beberapa baris. Baris pertama berisi 12 kursi, baris kedua 15 kursi, baris ketiga 18 kursi, dan seterusnya bertambah dengan selisih yang sama.</p>',
    question: 'Banyak kursi pada baris ke-10 adalah …',
    options: ['36', '39', '42', '255'],
    answer: 1,
    explain: 'Ini barisan aritmetika dengan suku pertama a = 12 dan beda b = 3. U₁₀ = a + 9b = 12 + 27 = 39.'
  },
  {
    id: 'MTK-007', subject: 'mtk', bab: 'Aljabar', title: 'Deret aritmetika',
    level: 'Menantang', type: 'multi',
    stimulus: '<p>Sebuah gedung pertunjukan menata kursi dalam beberapa baris. Baris pertama berisi 12 kursi, baris kedua 15 kursi, baris ketiga 18 kursi, dan seterusnya bertambah dengan selisih yang sama.</p>',
    question: 'Pernyataan yang benar tentang susunan kursi tersebut adalah …',
    options: [
      'Baris ke-5 berisi 24 kursi.',
      'Baris ke-10 berisi 40 kursi.',
      'Jumlah kursi pada 10 baris pertama adalah 255.',
      'Selisih banyak kursi antarbaris yang berurutan selalu sama.'
    ],
    answer: [0, 2, 3],
    explain: 'U₅ = 12 + 4 × 3 = 24 (benar). U₁₀ = 39, bukan 40 (salah). S₁₀ = 10/2 × (12 + 39) = 5 × 51 = 255 (benar). Selisih tiap baris selalu 3 (benar).'
  },

  /* ================= MATEMATIKA · Bab 3: Geometri dan Pengukuran ================= */
  {
    id: 'MTK-008', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Sudut berpelurus',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Titik Q terletak pada garis lurus AB. Dari titik Q ditarik sinar QP sehingga terbentuk ∠AQP = (3x + 6)° dan ∠PQB = (2x + 24)°.</p>',
    question: 'Besar ∠PQB adalah … °',
    options: ['30', '84', '90', '96'],
    answer: 1,
    explain: 'Dua sudut yang berpelurus berjumlah 180°. (3x + 6) + (2x + 24) = 180, sehingga 5x + 30 = 180 dan x = 30. Maka ∠PQB = 2(30) + 24 = 84°.'
  },
  {
    id: 'MTK-009', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Teorema Pythagoras pada tangga',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Sebuah tangga bambu sepanjang 5 meter disandarkan pada dinding tegak. Ujung bawah tangga berjarak 3 meter dari dinding.</p>',
    question: 'Tinggi ujung atas tangga dari tanah adalah … meter',
    options: ['2', '4', '5', '8'],
    answer: 1,
    explain: 'Tangga, dinding, dan tanah membentuk segitiga siku-siku dengan sisi miring 5 m. Tinggi = √(5² − 3²) = √(25 − 9) = √16 = 4 meter.'
  },
  {
    id: 'MTK-010', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Luas juring lingkaran',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Sebuah taman berbentuk lingkaran dengan jari-jari 14 meter. Sebagian taman berbentuk juring dengan sudut pusat 90° akan ditanami bunga.</p>',
    question: 'Luas bagian yang ditanami bunga adalah … m² (π = 22/7)',
    options: ['77', '154', '308', '616'],
    answer: 1,
    explain: 'Luas lingkaran = π r² = 22/7 × 14 × 14 = 616 m². Luas juring = 90/360 × 616 = 1/4 × 616 = 154 m².'
  },
  {
    id: 'MTK-011', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Dua persegi panjang sebangun',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Dua persegi panjang sebangun. Persegi panjang besar berukuran 24 cm × 16 cm, sedangkan lebar persegi panjang kecil adalah 6 cm.</p>',
    question: 'Keliling persegi panjang kecil adalah … cm',
    options: ['15', '30', '36', '80'],
    answer: 1,
    explain: 'Perbandingan panjang : lebar = 24 : 16 = 3 : 2. Jika lebar persegi panjang kecil 6 cm, maka panjangnya 9 cm. Keliling = 2 × (9 + 6) = 30 cm.'
  },

  /* ================= MATEMATIKA · Bab 4: Data dan Peluang ================= */
  {
    id: 'MTK-012', subject: 'mtk', bab: 'Data dan Peluang', title: 'Peluang tanpa pengembalian',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Sebuah kantong berisi 5 kelereng merah, 3 kelereng biru, dan 2 kelereng hijau. Doni mengambil satu kelereng secara acak dan hasilnya merah. Kelereng itu tidak dikembalikan.</p>',
    question: 'Kemudian Ayu mengambil satu kelereng. Peluang Ayu mendapat kelereng biru adalah …',
    options: ['3/10', '1/3', '3/8', '1/2'],
    answer: 1,
    explain: 'Setelah satu kelereng merah diambil, tersisa 9 kelereng dan 3 di antaranya biru. Peluang = 3/9 = 1/3.'
  },
  {
    id: 'MTK-013', subject: 'mtk', bab: 'Data dan Peluang', title: 'Mean, median, dan modus',
    level: 'Sedang', type: 'table',
    stimulus: '<p>Nilai ulangan 10 siswa: 6, 7, 7, 8, 8, 8, 9, 9, 10, 10.</p>',
    question: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
    cols: ['Benar', 'Salah'],
    rows: [
      { t: 'Rata-rata nilai tersebut adalah 8,2.', a: 0 },
      { t: 'Modus data tersebut adalah 10.', a: 1 },
      { t: 'Median data tersebut adalah 8.', a: 0 }
    ],
    explain: 'Jumlah nilai = 82, sehingga rata-rata = 82 ÷ 10 = 8,2 (benar). Nilai yang paling sering muncul adalah 8 (tiga kali), jadi modus = 8, bukan 10 (salah). Data sudah terurut; nilai ke-5 dan ke-6 sama-sama 8, sehingga median = 8 (benar).'
  },

  /* ================= BAHASA INDONESIA · Bab 1: Pemahaman Tekstual (Literal) ================= */
  {
    id: 'IND-001', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Membaca data pada teks dan tabel',
    level: 'Sedang', type: 'multi',
    stimulus: '<p><b>Kebiasaan Membaca Siswa SMP Kota Cerdas</b></p><p>Sebuah survei dilakukan pada 200 siswa kelas IX untuk mengetahui lama mereka membaca buku di luar jam pelajaran setiap hari.</p><table><tr><th>Lama membaca per hari</th><th>Jumlah siswa</th></tr><tr><td>30 menit atau lebih</td><td>90</td></tr><tr><td>10–30 menit</td><td>70</td></tr><tr><td>Kurang dari 10 menit</td><td>40</td></tr></table>',
    question: 'Pernyataan yang sesuai dengan data tersebut adalah …',
    options: [
      'Siswa yang membaca kurang dari 10 menit per hari adalah kelompok paling sedikit.',
      'Lebih dari separuh siswa membaca 30 menit atau lebih setiap hari.',
      'Sebanyak 70 siswa membaca selama 10–30 menit setiap hari.',
      'Survei dilakukan pada 200 siswa kelas IX.'
    ],
    answer: [0, 2, 3],
    explain: '90 dari 200 siswa berarti 45%, jadi bukan lebih dari separuh (pernyataan kedua salah). Tiga pernyataan lainnya sesuai dengan teks dan tabel.'
  },
  {
    id: 'IND-002', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Makna kata dalam konteks',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Rani bergabung dengan ekstrakurikuler bulu tangkis sejak kelas tujuh. Pada tiga turnamen pertama, ia selalu kalah di babak awal. Teman-temannya menyarankan ia berhenti karena dianggap tidak berbakat. Rani justru tetap gigih berlatih setiap sore dan mencatat kesalahannya di buku kecil. Pelatih mulai memperhatikan peningkatan pukulan dropshot-nya. Akhirnya, pada turnamen antarsekolah tahun ini, Rani keluar sebagai juara.</p>',
    question: 'Makna kata <i>gigih</i> pada kalimat tersebut adalah …',
    options: ['mudah menyerah', 'tekun dan pantang menyerah', 'suka berlatih sendirian', 'cepat puas dengan hasil'],
    answer: 1,
    explain: 'Dari konteks kalimat, Rani terus berlatih meskipun sering kalah. Hal itu menunjukkan sikap tekun dan pantang menyerah.'
  },
  {
    id: 'IND-003', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Menemukan informasi tersurat',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Perpustakaan keliling Pustaka Jaya melayani warga Desa Sukamaju setiap Selasa dan Kamis pukul 08.00–11.00 di lapangan desa. Mobil perpustakaan itu berhenti di dekat balai desa dan membuka meja layanan tepat waktu. Peminjam wajib membawa kartu anggota yang bisa dibuat gratis di lokasi. Buku dapat dipinjam paling lama dua pekan dan boleh diperpanjang satu kali. Warga yang terlambat mengembalikan buku hanya diminta membaca sepuluh menit di tempat sebagai pengganti denda. Anak-anak biasanya datang lebih awal untuk memilih buku cerita.</p>',
    question: 'Informasi yang <b>tidak</b> terdapat dalam teks adalah …',
    options: ['hari layanan', 'tempat layanan', 'jumlah koleksi buku', 'lama peminjaman'],
    answer: 2,
    explain: 'Hari layanan (Selasa dan Kamis), tempat layanan (lapangan desa), dan lama peminjaman (dua pekan) disebutkan dalam teks. Jumlah koleksi buku tidak disebutkan.'
  },

  /* ================= BAHASA INDONESIA · Bab 2: Pemahaman Inferensial ================= */
  {
    id: 'IND-004', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Ide pokok paragraf',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Tidur yang cukup sangat penting bagi pelajar. Saat tidur, otak merapikan informasi yang dipelajari sepanjang hari. Pelajar yang kurang tidur cenderung sulit berkonsentrasi dan mudah lupa. Mereka juga lebih cepat marah saat menghadapi soal yang sulit. Sebaliknya, pelajar yang tidur cukup tampak lebih siap mengikuti pelajaran pertama. Karena itu, tidur 8–10 jam setiap malam sebaiknya menjadi kebiasaan.</p>',
    question: 'Ide pokok paragraf tersebut adalah …',
    options: [
      'Otak merapikan informasi saat tidur.',
      'Tidur yang cukup sangat penting bagi pelajar.',
      'Pelajar yang kurang tidur sulit berkonsentrasi.',
      'Pelajar sebaiknya tidur 8–10 jam setiap malam.'
    ],
    answer: 1,
    explain: 'Ide pokok terdapat pada kalimat utama, yaitu kalimat pertama paragraf. Kalimat-kalimat lain berfungsi sebagai penjelas dan pendukung.'
  },
  {
    id: 'IND-005', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Hubungan sebab-akibat',
    level: 'Sedang', type: 'multi',
    stimulus: '<p>Hujan deras mengguyur kota sejak pagi. Saluran air di sepanjang Jalan Melati tersumbat sampah sehingga air meluap ke jalan. Genangan setinggi betis orang dewasa menutup dua jalur. Akibatnya, banyak kendaraan mogok dan sejumlah siswa terlambat tiba di sekolah. Petugas kebersihan baru datang menjelang siang untuk membersihkan saluran. Warga berharap pembersihan tidak lagi menunggu musim hujan.</p>',
    question: 'Akibat dari tersumbatnya saluran air oleh sampah adalah …',
    options: [
      'Air meluap ke jalan.',
      'Banyak kendaraan mogok.',
      'Hujan deras turun sejak pagi.',
      'Sejumlah siswa terlambat tiba di sekolah.'
    ],
    answer: [0, 1, 3],
    explain: 'Hujan deras adalah kejadian awal, bukan akibat. Tersumbatnya saluran membuat air meluap, lalu berakibat kendaraan mogok dan siswa terlambat.'
  },
  {
    id: 'IND-006', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Menyimpulkan isi teks',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Setiap hari Sungai Asri dipenuhi sampah plastik. Ikan-ikan mati karena menelan plastik dan air sungai berbau busuk. Warga yang memakai air sungai untuk mencuci mengeluh gatal-gatal. Anak-anak juga mulai jarang bermain di tepi sungai. Padahal, kegiatan bersih sungai baru dilakukan setahun sekali. Warga mengusulkan agar kerja bakti diadakan setiap bulan.</p>',
    question: 'Simpulan yang paling tepat dari teks tersebut adalah …',
    options: [
      'Warga sebaiknya pindah dari sekitar Sungai Asri.',
      'Sampah plastik merusak lingkungan dan merugikan warga, sehingga pembersihan perlu dilakukan lebih rutin.',
      'Ikan di Sungai Asri mati hanya karena air berbau busuk.',
      'Kegiatan bersih sungai tidak ada gunanya.'
    ],
    answer: 1,
    explain: 'Teks menunjukkan dampak sampah plastik pada ikan, air, dan kesehatan warga, serta pembersihan yang jarang dilakukan. Simpulan yang mencakup semuanya adalah pilihan kedua.'
  },
  {
    id: 'IND-007', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Kesesuaian pernyataan dengan teks',
    level: 'Dasar', type: 'table',
    stimulus: '<p>Pisang mengandung kalium yang membantu kerja otot dan karbohidrat sebagai sumber tenaga. Buah ini mudah ditemukan sepanjang tahun. Harganya juga relatif murah dibanding buah impor. Banyak pelajar menjadikannya bekal karena praktis dimakan. Namun, orang yang memiliki masalah ginjal perlu membatasi konsumsinya. Penderita diabetes juga sebaiknya tidak makan dalam jumlah banyak sekaligus.</p>',
    question: 'Tentukan pernyataan yang sesuai dan tidak sesuai berdasarkan teks!',
    cols: ['Sesuai', 'Tidak sesuai'],
    rows: [
      { t: 'Pisang dapat menjadi sumber tenaga.', a: 0 },
      { t: 'Pisang hanya berbuah pada musim tertentu.', a: 1 },
      { t: 'Semua orang boleh mengonsumsi pisang tanpa batas.', a: 1 }
    ],
    explain: 'Karbohidrat pada pisang menjadi sumber tenaga (sesuai). Teks menyebut buah ini mudah ditemukan sepanjang tahun (tidak sesuai). Orang dengan masalah ginjal perlu membatasi konsumsi, jadi tidak semua orang bebas tanpa batas (tidak sesuai).'
  },

  /* ================= BAHASA INDONESIA · Bab 3: Evaluasi dan Apresiasi Teks ================= */
  {
    id: 'IND-008', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Menilai argumen dan bukti',
    level: 'Sedang', type: 'table',
    stimulus: '<p>Opini: Siswa sebaiknya tidak membawa ponsel ke sekolah. Alasan 1: Ponsel dapat mengganggu konsentrasi saat pelajaran. Survei di sebuah SMP menunjukkan 60% siswa membuka media sosial pada jam belajar. Alasan 2: Semua siswa pasti menyalahgunakan ponselnya. Penulis tidak menyebut cara pengawasan yang mungkin dilakukan. Ia juga tidak membahas siswa yang memakai ponsel untuk belajar.</p>',
    question: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
    cols: ['Benar', 'Salah'],
    rows: [
      { t: 'Alasan 1 didukung bukti berupa hasil survei.', a: 0 },
      { t: 'Alasan 2 lemah karena menggeneralisasi semua siswa tanpa bukti.', a: 0 },
      { t: 'Survei tersebut membuktikan bahwa seluruh siswa menyalahgunakan ponsel.', a: 1 }
    ],
    explain: 'Alasan 1 memiliki bukti survei (benar). Alasan 2 memakai kata "semua" dan "pasti" tanpa bukti sehingga lemah (benar). Survei hanya menunjukkan 60% siswa membuka media sosial, bukan seluruh siswa (salah).'
  },
  {
    id: 'IND-009', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Citraan dalam puisi',
    level: 'Sedang', type: 'pg',
    stimulus: '<p><i>Senja menjatuhkan jingga di pundak sawah,<br>angin mengetuk jendela rumah yang sepi.</i></p>',
    question: 'Citraan yang paling dominan pada puisi tersebut adalah …',
    options: ['penglihatan (visual)', 'pendengaran (auditif)', 'penciuman (olfaktori)', 'pengecapan (gustatori)'],
    answer: 0,
    explain: 'Frasa "jingga di pundak sawah" menghadirkan warna dan pemandangan yang dapat dilihat, sehingga citraan yang paling dominan adalah citraan penglihatan.'
  },
  {
    id: 'IND-010', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Ragam sastra dan nonsastra',
    level: 'Dasar', type: 'pg', stimulus: '',
    question: 'Kutipan berikut yang termasuk ragam <b>sastra</b> adalah …',
    options: [
      '“Pemerintah kota menambah 20 bus sekolah mulai bulan depan.”',
      '“Lampu minyak itu bergetar, seperti hati Ibu yang menunggu kabar dari seberang lautan.”',
      '“Diskon 50% untuk semua buku tulis hanya sampai Jumat!”',
      '“Pengumuman: rapat orang tua siswa dilaksanakan pukul 09.00.”'
    ],
    answer: 1,
    explain: 'Teks sastra memakai bahasa yang imajinatif dan figuratif, seperti perbandingan lampu yang bergetar dengan hati Ibu. Pilihan lain bersifat informatif atau persuasif (nonsastra).'
  },
  {
    id: 'IND-011', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Pesan penulis dalam cerita',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Dina menemukan sebuah dompet berisi uang di bangku taman. Uang itu cukup untuk membeli sepatu baru yang sudah lama ia inginkan. Ia sempat memegang dompet itu lama sekali sambil menghitung isinya. Namun, Dina memilih menyerahkannya kepada petugas taman. Petugas mencatat ciri dompet dan menempelkan pengumuman di papan informasi. Tak lama kemudian, pemiliknya, seorang nenek, datang dan memeluk Dina sambil menangis haru.</p>',
    question: 'Pesan yang ingin disampaikan penulis adalah …',
    options: [
      'Rezeki harus dicari dengan bekerja keras.',
      'Kejujuran lebih berharga daripada keinginan pribadi.',
      'Sepatu baru lebih penting daripada dompet.',
      'Taman adalah tempat yang berbahaya.'
    ],
    answer: 1,
    explain: 'Dina tetap menyerahkan dompet meski uangnya bisa dipakai untuk keinginannya. Sikap itu menyampaikan pesan tentang pentingnya kejujuran.'
  },
  {
    id: 'IND-012', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Mengkritik teks opini',
    level: 'Menantang', type: 'multi',
    stimulus: '<p>Kantin sekolah harus menjual makanan sehat. Banyak siswa yang mengeluh soal makanan sekarang. Pokoknya kantin harus berubah sekarang juga. Menu sehat itu penting sekali untuk semua orang. Pengelola kantin sebaiknya segera mengganti semua dagangannya.</p>',
    question: 'Kelemahan teks opini tersebut adalah …',
    options: [
      'Tidak ada data atau bukti yang mendukung pendapat.',
      'Alasan tidak dijelaskan secara rinci ("banyak siswa mengeluh" tanpa penjelasan).',
      'Kalimat-kalimatnya terlalu panjang dan berbelit.',
      'Menggunakan kata tidak baku "pokoknya" pada teks opini.'
    ],
    answer: [0, 1, 3],
    explain: 'Teks tidak menyertakan data, alasannya tidak dirinci, dan memakai kata tidak baku "pokoknya". Kalimat-kalimatnya justru pendek, jadi pilihan ketiga bukan kelemahan.'
  },

  /* ================= MATEMATIKA · tambahan ================= */
    {
    id: 'MTK-014', subject: 'mtk', bab: 'Bilangan', title: 'Menyederhanakan bentuk akar',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Dua batang pipa besi disambung. Panjang masing-masing 3√12 meter dan 2√27 meter.</p>',
    question: 'Panjang pipa setelah disambung adalah …',
    options: ['5√39 m', '6√3 m', '12√3 m', '12√39 m'],
    answer: 2,
    explain: '√12 = 2√3 dan √27 = 3√3. Jadi 3(2√3) + 2(3√3) = 6√3 + 6√3 = 12√3 meter.'
  },
    {
    id: 'MTK-015', subject: 'mtk', bab: 'Bilangan', title: 'Skala pada peta',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Rani mengukur jarak dua kota pada peta, hasilnya 6 cm. Peta itu berskala 1 : 250.000.</p>',
    question: 'Jarak sebenarnya kedua kota tersebut adalah …',
    options: ['1,5 km', '15 km', '150 km', '1.500 km'],
    answer: 1,
    explain: 'Jarak sebenarnya = 6 × 250.000 cm = 1.500.000 cm. Karena 1 km = 100.000 cm, hasilnya 15 km.'
  },
    {
    id: 'MTK-016', subject: 'mtk', bab: 'Aljabar', title: 'Persamaan linear satu variabel',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Rara membeli 3 bungkus permen yang masing-masing berisi (2x − 5) butir. Adiknya membeli 4 bungkus berisi x butir dan 7 butir permen lepas. Ternyata jumlah permen mereka sama.</p>',
    question: 'Nilai x pada cerita tersebut adalah …',
    options: ['4', '8', '11', '22'],
    answer: 2,
    explain: '3(2x − 5) = 4x + 7, lalu 6x − 15 = 4x + 7. Kurangi 4x: 2x − 15 = 7, sehingga 2x = 22 dan x = 11.'
  },
    {
    id: 'MTK-017', subject: 'mtk', bab: 'Aljabar', title: 'Nilai fungsi kuadrat',
    level: 'Menantang', type: 'pg',
    stimulus: '<p>Banyak ubin pada sebuah pola mengikuti U(n) = 2n² − 3n + 1, dengan n nomor pola.</p>',
    question: 'Banyak ubin pada pola ke-5 adalah …',
    options: ['26', '36', '46', '51'],
    answer: 1,
    explain: 'U(5) = 2(5)² − 3(5) + 1 = 50 − 15 + 1 = 36 ubin.'
  },
    {
    id: 'MTK-018', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Keliling lingkaran',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Sebuah taman berbentuk lingkaran dengan diameter 14 meter. Seluruh tepi taman akan dipasangi pagar kawat. Gunakan π = 22/7.</p>',
    question: 'Panjang pagar kawat yang dibutuhkan adalah …',
    options: ['22 m', '44 m', '88 m', '154 m'],
    answer: 1,
    explain: 'Keliling lingkaran = π × d = 22/7 × 14 = 44 meter. Angka 154 m itu luas tamannya, bukan panjang tepinya.'
  },
    {
    id: 'MTK-019', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Volume tabung',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Ibu menyimpan sirup dalam kaleng berbentuk tabung. Jari-jari kaleng 7 cm dan tingginya 10 cm. Gunakan π = 22/7.</p>',
    question: 'Volume sirup yang dapat ditampung kaleng tersebut adalah …',
    options: ['154 cm³', '770 cm³', '1.540 cm³', '3.080 cm³'],
    answer: 2,
    explain: 'Volume tabung = πr²t = 22/7 × 7² × 10 = 22 × 7 × 10 = 1.540 cm³.'
  },
  {
    id: 'MTK-020', subject: 'mtk', bab: 'Data dan Peluang', title: 'Mencari data yang hilang dari rata-rata',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Rata-rata lima nilai ulangan Bima adalah 78. Empat nilai yang sudah diketahui: 75, 80, 70, dan 85.</p>',
    question: 'Nilai ulangan kelima Bima adalah …',
    options: ['75', '80', '85', '90'],
    answer: 1,
    explain: 'Jumlah kelima nilai = 5 × 78 = 390. Jumlah empat nilai = 75 + 80 + 70 + 85 = 310. Nilai kelima = 390 − 310 = 80.'
  },
    {
    id: 'MTK-021', subject: 'mtk', bab: 'Data dan Peluang', title: 'Peluang dua dadu',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Dalam permainan ular tangga, Andi melempar dua dadu sekaligus. Ia baru bisa naik jika jumlah mata kedua dadu tepat 7.</p>',
    question: 'Peluang Andi mendapat jumlah mata dadu 7 adalah …',
    options: ['1/12', '1/9', '1/6', '7/36'],
    answer: 2,
    explain: 'Ada 36 kemungkinan. Jumlah 7 muncul pada (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) , yaitu enam kemungkinan, jadi peluangnya 6/36 = 1/6.'
  },

  /* ================= BAHASA INDONESIA · tambahan ================= */
  {
    id: 'IND-013', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Informasi tersurat pada pengumuman',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Pendaftaran kelas menulis kreatif dibuka untuk siswa kelas VII–IX. Kelas berlangsung setiap Sabtu pukul 09.00–11.00 di ruang 12. Setiap pertemuan diisi latihan menulis cerpen dan bedah karya bersama guru bahasa. Peserta cukup membawa buku catatan karena laptop disediakan panitia. Kuota hanya 20 orang dan pendaftaran ditutup setelah terpenuhi. Formulir bisa diambil di ruang guru.</p>',
    question: 'Barang yang disediakan panitia adalah …',
    options: ['buku catatan', 'laptop', 'kartu peserta', 'cetakan materi'],
    answer: 1,
    explain: 'Teks menyebut peserta cukup membawa buku catatan karena laptop disediakan panitia. Kartu peserta dan cetakan materi tidak disebutkan.'
  },
  {
    id: 'IND-014', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Membaca jadwal pada tabel',
    level: 'Dasar', type: 'pg',
    stimulus: '<p><b>Jadwal ekstrakurikuler</b></p><table><tr><th>Kegiatan</th><th>Hari</th></tr><tr><td>Basket</td><td>Senin dan Kamis</td></tr><tr><td>Futsal</td><td>Rabu</td></tr><tr><td>Paduan suara</td><td>Jumat</td></tr><tr><td>Tari</td><td>Selasa</td></tr></table>',
    question: 'Ekstrakurikuler yang berlatih dua kali dalam sepekan adalah …',
    options: ['basket', 'futsal', 'paduan suara', 'tari'],
    answer: 0,
    explain: 'Hanya basket yang tercatat pada dua hari, yaitu Senin dan Kamis. Kegiatan lain masing-masing satu hari.'
  },
  {
    id: 'IND-015', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Tujuan penulis',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Membawa botol minum sendiri terdengar sederhana, tetapi dampaknya besar. Satu botol yang dipakai ulang setiap hari bisa menggantikan ratusan botol plastik sekali pakai dalam setahun. Botol itu juga lebih murah karena tidak perlu membeli minuman kemasan setiap hari. Di kantin sekolah, tempat sampah paling cepat penuh justru dari botol plastik. Mulai besok, coba isi botolmu sebelum berangkat sekolah.</p>',
    question: 'Tujuan penulis menulis paragraf tersebut adalah …',
    options: [
      'menghibur pembaca dengan cerita lucu',
      'mengajak pembaca mengurangi sampah botol plastik',
      'menjelaskan cara membuat botol minum',
      'menilai harga botol plastik di pasaran'
    ],
    answer: 1,
    explain: 'Teks berisi ajakan mengisi botol sendiri dan menyebut dampaknya bagi sampah plastik. Jadi tujuannya mengajak, bukan menghibur atau menjelaskan cara membuat.'
  },
  {
    id: 'IND-016', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Menyimpulkan sifat tokoh',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Setiap hari Rina membawa bekal dari rumah. Uang jajannya ia tabung, lalu dipakai membeli buku latihan sendiri. Ia mencatat pengeluaran kecil di buku tulis supaya tidak boros. Saat temannya tidak punya alat tulis, Rina sering meminjamkan. Ia juga tidak pernah menagih barang yang belum dikembalikan.</p>',
    question: 'Sifat Rina yang dapat disimpulkan dari teks tersebut adalah …',
    options: ['boros dan suka pamer', 'hemat dan suka menolong', 'pemalu dan penyendiri', 'ceroboh dan mudah lupa'],
    answer: 1,
    explain: 'Rina menabung uang jajan dan membawa bekal (hemat), serta meminjamkan alat tulis ke teman (suka menolong).'
  },
  {
    id: 'IND-017', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Majas dalam kalimat',
    level: 'Dasar', type: 'pg', stimulus: '',
    question: 'Majas pada kalimat “Angin berbisik di telinga para petani” adalah …',
    options: ['hiperbola', 'personifikasi', 'metafora', 'litotes'],
    answer: 1,
    explain: 'Angin diberi sifat manusia, yaitu berbisik. Itu personifikasi. Hiperbola melebih-lebihkan, metafora membandingkan langsung tanpa kata seperti, dan litotes merendahkan diri.'
  },
  {
    id: 'IND-018', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Membedakan fakta dan opini',
    level: 'Sedang', type: 'pg', stimulus: '',
    question: 'Kalimat yang berisi opini adalah …',
    options: [
      '“SMP Negeri 2 menambah dua kelas pada tahun ajaran ini.”',
      '“Menurut saya, seragam olahraga sebaiknya dipakai setiap Jumat.”',
      '“Ujian sekolah dilaksanakan pada 12–16 Mei.”',
      '“Jumlah siswa kelas IX sebanyak 128 orang.”'
    ],
    answer: 1,
    explain: 'Kalimat opini memuat pendapat dan ditandai frasa “menurut saya” serta kata “sebaiknya”. Tiga kalimat lain berisi data yang bisa dicek kebenarannya.'
  },
  {
    id: 'IND-019', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Nilai moral cerita',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Hujan turun deras saat bel pulang berbunyi. Bagas melihat Dita kebingungan karena payungnya tertinggal. Tanpa banyak bicara, Bagas menyerahkan payungnya lalu berlari pulang dengan seragam basah. Sepanjang jalan ia menutupi tasnya agar buku tidak ikut basah. Ibunya sempat kesal, tetapi Bagas hanya tersenyum. Besok paginya, Dita mengembalikan payung itu bersama sekotak kue.</p>',
    question: 'Nilai moral yang paling tepat dari cerita tersebut adalah …',
    options: [
      'membantu orang lain tanpa mengharap imbalan',
      'jangan lupa membawa payung saat musim hujan',
      'pulang sekolah sebaiknya tidak saat hujan',
      'ibu selalu marah bila anaknya basah'
    ],
    answer: 0,
    explain: 'Bagas rela kehujanan agar Dita bisa pulang kering, tanpa meminta apa pun. Pilihan lain hanya menanggapi peristiwa, bukan pesan ceritanya.'
  }
,
  /* ================= MATEMATIKA · tambahan 2 ================= */
  {
    id: 'MTK-022', subject: 'mtk', bab: 'Bilangan', title: 'Diskon lalu pajak',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Sebuah tas berharga Rp250.000 mendapat diskon 20%. Setelah itu, harga yang sudah didiskon dikenai pajak 10%.</p>',
    question: 'Harga akhir tas tersebut adalah …',
    options: ['Rp200.000', 'Rp220.000', 'Rp225.000', 'Rp230.000'],
    answer: 1,
    explain: 'Diskon 20% dari 250.000 = 50.000, jadi harganya 200.000. Pajak 10% dari 200.000 = 20.000, sehingga harga akhirnya 220.000.'
  },
  {
    id: 'MTK-023', subject: 'mtk', bab: 'Aljabar', title: 'Jumlah dan selisih dua bilangan',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Jumlah dua bilangan adalah 45, sedangkan selisihnya 11.</p>',
    question: 'Bilangan yang lebih besar adalah …',
    options: ['17', '22', '28', '34'],
    answer: 2,
    explain: 'Misal a + b = 45 dan a − b = 11. Jumlahkan keduanya: 2a = 56, jadi a = 28. Bilangan lainnya 45 − 28 = 17.'
  },
  {
    id: 'MTK-024', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Kerangka kubus dari kawat',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Seutas kawat panjangnya 72 cm dipakai untuk membuat kerangka kubus utuh.</p>',
    question: 'Panjang rusuk kubus tersebut adalah … cm',
    options: ['4', '6', '8', '12'],
    answer: 1,
    explain: 'Kerangka kubus memerlukan 12 rusuk sama panjang. 72 ÷ 12 = 6 cm.'
  },
  {
    id: 'MTK-025', subject: 'mtk', bab: 'Data dan Peluang', title: 'Modus data tunggal',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Banyak buku yang dibaca 8 siswa dalam sebulan: 4, 5, 5, 6, 7, 7, 7, 8.</p>',
    question: 'Modus data tersebut adalah …',
    options: ['5', '6', '7', '8'],
    answer: 2,
    explain: 'Nilai 7 muncul tiga kali, paling sering dibanding nilai lain.'
  },
  {
    id: 'MTK-026', subject: 'mtk', bab: 'Bilangan', title: 'Bentuk lain dari pecahan',
    level: 'Dasar', type: 'multi', stimulus: '',
    question: 'Manakah yang nilainya sama dengan 3/4?',
    options: ['0,75', '75%', '6/8', '4/3'],
    answer: [0, 1, 2],
    explain: '3/4 = 0,75 = 75%. Pecahan 6/8 disederhanakan menjadi 3/4. Adapun 4/3 lebih besar dari 1, jadi tidak sama.'
  },
  {
    id: 'MTK-027', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Unsur-unsur kubus',
    level: 'Dasar', type: 'multi', stimulus: '',
    question: 'Pernyataan yang benar tentang kubus adalah …',
    options: ['Memiliki 12 rusuk.', 'Semua sisinya berbentuk persegi.', 'Memiliki 8 titik sudut.', 'Memiliki 4 sisi.'],
    answer: [0, 1, 2],
    explain: 'Kubus punya 12 rusuk, 6 sisi berbentuk persegi, dan 8 titik sudut. Pernyataan 4 sisi salah.'
  },
  {
    id: 'MTK-028', subject: 'mtk', bab: 'Bilangan', title: 'Perbandingan harga buku',
    level: 'Sedang', type: 'table',
    stimulus: '<p>Harga 4 buku tulis yang sama adalah Rp32.000.</p>',
    question: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
    cols: ['Benar', 'Salah'],
    rows: [
      { t: 'Harga satu buku Rp9.000.', a: 1 },
      { t: 'Harga 6 buku Rp48.000.', a: 0 },
      { t: 'Dengan Rp56.000 dapat diperoleh 7 buku.', a: 0 }
    ],
    explain: 'Harga satu buku = 32.000 ÷ 4 = 8.000, jadi Rp9.000 salah. Enam buku = 6 × 8.000 = 48.000 (benar). 56.000 ÷ 8.000 = 7 buku (benar).'
  },
  {
    id: 'MTK-029', subject: 'mtk', bab: 'Data dan Peluang', title: 'Rata-rata, median, dan modus',
    level: 'Menantang', type: 'table',
    stimulus: '<p>Nilai enam siswa: 7, 8, 8, 9, 9, 10.</p>',
    question: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
    cols: ['Benar', 'Salah'],
    rows: [
      { t: 'Rata-rata nilainya 8,5.', a: 0 },
      { t: 'Median nilainya 8,5.', a: 0 },
      { t: 'Modusnya tunggal, yaitu 9.', a: 1 }
    ],
    explain: 'Jumlah nilai 51, dibagi 6 menjadi 8,5. Median = (8 + 9) ÷ 2 = 8,5. Modusnya tidak tunggal karena 8 dan 9 sama-sama muncul dua kali.'
  },

  /* ================= BAHASA INDONESIA · tambahan 2 ================= */
  {
    id: 'IND-020', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Kata baku',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Pagi itu seluruh siswa berkumpul di lapangan untuk senam bersama. Para siswa <b>mempraktekkan</b> gerakan pemanasan yang dicontohkan guru olahraga. Mereka mengulang gerakan yang sama sampai hitungan kedelapan. Setelah itu, mereka berbaris rapi untuk mendengarkan pengumuman. Suasana lapangan menjadi ramai ketika lagu pengiring diputar.</p>',
    question: 'Kata baku untuk kata bercetak tebal adalah …',
    options: ['mempraktikkan', 'mempraktekan', 'memperaktikkan', 'mempraktikan'],
    answer: 0,
    explain: 'Bentuk baku menurut KBBI adalah “mempraktikkan”, berasal dari kata dasar praktik.'
  },
  {
    id: 'IND-021', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Pesan penulis dalam kutipan',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Banyak pelajar merasa durasi belajar yang panjang otomatis membuat mereka lebih pintar. Dua jam belajar tanpa jeda bukan tanda rajin. Setelah sekitar empat puluh menit, perhatian biasanya mulai turun. Otak butuh istirahat singkat untuk mengendapkan yang baru dipelajari. Berjalan sebentar atau minum air putih sudah cukup untuk mengembalikan fokus. Jadi, jeda lima menit di tengah belajar bukan pemborosan waktu.</p>',
    question: 'Pesan yang ingin disampaikan penulis adalah …',
    options: [
      'Belajar harus dilakukan dua jam tanpa henti.',
      'Istirahat singkat membantu proses belajar.',
      'Otak tidak perlu dipakai belajar lama.',
      'Jeda belajar membuat pelajaran cepat lupa.'
    ],
    answer: 1,
    explain: 'Penulis menyebut istirahat singkat membantu otak mengendapkan pelajaran. Teks justru menolak gagasan belajar tanpa jeda.'
  },
  {
    id: 'IND-022', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Mengenali kalimat fakta',
    level: 'Sedang', type: 'multi', stimulus: '',
    question: 'Kalimat yang termasuk fakta adalah …',
    options: [
      '“Air mendidih pada suhu 100 °C di tekanan udara normal.”',
      '“Menurut saya, sekolah sebaiknya mulai pukul 08.00.”',
      '“Indonesia memiliki lebih dari 17.000 pulau.”',
      '“Film itu membosankan sekali.”'
    ],
    answer: [0, 2],
    explain: 'Fakta bisa diperiksa kebenarannya, seperti suhu didih air dan jumlah pulau. Opini berisi penilaian pribadi, terlihat dari “menurut saya” dan “membosankan”.'
  },
  {
    id: 'IND-023', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Simpulan yang didukung teks',
    level: 'Menantang', type: 'multi',
    stimulus: '<p>Kantin sekolah mulai memisahkan sampah organik dan anorganik bulan lalu. Tiga tempat sampah baru dipasang di dekat meja makan. Sebulan kemudian, sampah yang dibuang ke TPS berkurang sepertiga. Petugas kebersihan mengaku lebih mudah memilah karena sampah sudah terpisah. Pengurus kantin berencana menambah tempat sampah di halaman. Mereka juga akan memasang poster cara memilah sampah.</p>',
    question: 'Simpulan yang didukung oleh teks tersebut adalah …',
    options: [
      'Pemisahan sampah mengurangi jumlah sampah yang dibuang.',
      'Pemisahan sampah memudahkan petugas kebersihan.',
      'Semua siswa sudah sadar memilah sampah.',
      'Kantin berhenti menghasilkan sampah.'
    ],
    answer: [0, 1],
    explain: 'Teks menyebut sampah berkurang sepertiga dan petugas lebih mudah memilah. Teks tidak menyatakan semua siswa sadar, dan sampah tidak berhenti sama sekali.'
  },
  {
    id: 'IND-024', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Kesesuaian informasi dengan teks',
    level: 'Sedang', type: 'table',
    stimulus: '<p>Kegiatan pramuka diadakan setiap Jumat pukul 14.00. Siswa wajib membawa topi dan tali. Kegiatan berakhir pukul 16.30, dan tidak ada kegiatan pengganti jika hujan. Pembina mengecek kelengkapan sebelum barisan dibuka. Siswa yang lupa membawa perlengkapan diminta mencatatnya di buku piket. Latihan biasanya diisi permainan simpul dan baris-berbaris.</p>',
    question: 'Tentukan pernyataan yang sesuai dan tidak sesuai dengan teks!',
    cols: ['Sesuai', 'Tidak sesuai'],
    rows: [
      { t: 'Pramuka dilaksanakan setiap Jumat.', a: 0 },
      { t: 'Siswa cukup membawa topi.', a: 1 },
      { t: 'Jika hujan, kegiatan diganti pada hari lain.', a: 1 }
    ],
    explain: 'Teks menyebut setiap Jumat (sesuai). Siswa wajib membawa topi dan tali, jadi cukup topi tidak sesuai. Teks menegaskan tidak ada kegiatan pengganti saat hujan (tidak sesuai).'
  },
  {
    id: 'IND-025', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Menilai kekuatan alasan',
    level: 'Sedang', type: 'table',
    stimulus: '<p>Pendapat: Siswa perlu sarapan sebelum ke sekolah. Alasan A: Penelitian menunjukkan siswa yang sarapan lebih mampu berkonsentrasi. Alasan B: Pokoknya sarapan itu penting. Guru kelas sembilan sering menemukan siswa yang mengantuk pada jam pertama. Kantin sekolah lalu membuka layanan sarapan murah. Orang tua diundang dalam sosialisasi gizi seimbang.</p>',
    question: 'Tentukan kuat atau lemah untuk setiap pernyataan berikut!',
    cols: ['Kuat', 'Lemah'],
    rows: [
      { t: 'Alasan A didukung hasil penelitian.', a: 0 },
      { t: 'Alasan B hanya berisi ajakan tanpa bukti.', a: 0 },
      { t: 'Alasan B cukup untuk meyakinkan pembaca.', a: 1 }
    ],
    explain: 'Alasan A punya bukti penelitian sehingga kuat. Alasan B tidak punya bukti sehingga lemah dan tidak cukup meyakinkan.'
  },


  /* ================= MATEMATIKA · tambahan 3 ================= */
  {
    id: 'MTK-030', subject: 'mtk', bab: 'Bilangan', title: 'FPB pada pembagian kue',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Ibu membuat 24 kue lapis dan 36 kue donat. Keduanya akan dimasukkan ke dalam kotak dengan jumlah yang sama banyak untuk setiap jenis kue, tanpa sisa.</p>',
    question: 'Banyak kotak terbanyak yang dapat dibuat Ibu adalah …',
    options: ['6', '8', '12', '18'],
    answer: 2,
    explain: 'Banyak kotak harus membagi habis 24 dan 36, jadi dicari FPB-nya. 24 = 2³ × 3 dan 36 = 2² × 3², sehingga FPB = 2² × 3 = 12 kotak.'
  },
  {
    id: 'MTK-031', subject: 'mtk', bab: 'Bilangan', title: 'Sifat bilangan berpangkat',
    level: 'Dasar', type: 'multi', stimulus: '',
    question: 'Pernyataan yang benar tentang bilangan berpangkat adalah …',
    options: [
      '2³ × 2⁴ = 2⁷',
      '(3²)³ = 3⁵',
      '5⁰ = 1',
      '10⁴ : 10² = 10²'
    ],
    answer: [0, 2, 3],
    explain: 'Pangkat dijumlahkan saat dikali (2³ × 2⁴ = 2⁷). Pangkat dikalikan saat dipangkatkan lagi, jadi (3²)³ = 3⁶, bukan 3⁵. Bilangan tak nol berpangkat 0 bernilai 1, dan pangkat dikurangkan saat dibagi (10⁴ : 10² = 10²).'
  },
  {
    id: 'MTK-032', subject: 'mtk', bab: 'Bilangan', title: 'Operasi pecahan dan desimal',
    level: 'Sedang', type: 'table',
    stimulus: '<p>Perhatikan operasi bilangan berikut.</p>',
    question: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
    cols: ['Benar', 'Salah'],
    rows: [
      { t: '3/4 + 0,5 = 1,25', a: 0 },
      { t: '2/5 dari 150 adalah 60', a: 0 },
      { t: '1,2 × 0,5 = 6', a: 1 }
    ],
    explain: '3/4 = 0,75 sehingga 0,75 + 0,5 = 1,25 (benar). 2/5 × 150 = 60 (benar). 1,2 × 0,5 = 0,6, bukan 6 (salah).'
  },
  {
    id: 'MTK-033', subject: 'mtk', bab: 'Aljabar', title: 'Pemfaktoran bentuk kuadrat',
    level: 'Sedang', type: 'pg', stimulus: '',
    question: 'Faktor dari x² − 5x − 24 adalah …',
    options: ['(x − 8)(x + 3)', '(x − 6)(x + 4)', '(x − 12)(x + 2)', '(x + 8)(x − 3)'],
    answer: 0,
    explain: 'Cari dua bilangan yang hasil kalinya −24 dan jumlahnya −5, yaitu −8 dan 3. Jadi x² − 5x − 24 = (x − 8)(x + 3).'
  },
  {
    id: 'MTK-034', subject: 'mtk', bab: 'Aljabar', title: 'Nilai fungsi linear',
    level: 'Menantang', type: 'multi', stimulus: '<p>Diketahui fungsi f(x) = 2x − 3.</p>',
    question: 'Pernyataan yang benar tentang fungsi tersebut adalah …',
    options: ['f(4) = 5', 'f(0) = −3', 'f(−2) = −7', 'f(x) = 7 ketika x = 4'],
    answer: [0, 1, 2],
    explain: 'f(4) = 8 − 3 = 5, f(0) = −3, dan f(−2) = −4 − 3 = −7. Adapun f(x) = 7 memberi 2x = 10, jadi x = 5, bukan 4.'
  },
  {
    id: 'MTK-035', subject: 'mtk', bab: 'Aljabar', title: 'Suku barisan geometri',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Sebuah barisan bilangan: 3, 6, 12, 24, …</p>',
    question: 'Suku ke-6 barisan tersebut adalah …',
    options: ['48', '72', '96', '192'],
    answer: 2,
    explain: 'Rasio barisan = 6 ÷ 3 = 2. Suku ke-6 = 3 × 2⁵ = 3 × 32 = 96.'
  },
  {
    id: 'MTK-036', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Volume prisma segitiga',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Sebuah prisma memiliki alas berbentuk segitiga dengan panjang alas 6 cm dan tinggi 8 cm. Tinggi prisma 15 cm.</p>',
    question: 'Volume prisma tersebut adalah … cm³',
    options: ['180', '240', '360', '720'],
    answer: 2,
    explain: 'Luas alas = 1/2 × 6 × 8 = 24 cm². Volume prisma = luas alas × tinggi = 24 × 15 = 360 cm³.'
  },
  {
    id: 'MTK-037', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Jumlah sudut segitiga',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Dua sudut sebuah segitiga besarnya 65° dan 48°.</p>',
    question: 'Besar sudut ketiga segitiga tersebut adalah … °',
    options: ['57', '63', '67', '77'],
    answer: 2,
    explain: 'Jumlah sudut segitiga selalu 180°. Sudut ketiga = 180 − 65 − 48 = 67°.'
  },
  {
    id: 'MTK-038', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Unsur-unsur tabung',
    level: 'Dasar', type: 'multi', stimulus: '',
    question: 'Pernyataan yang benar tentang tabung adalah …',
    options: [
      'Memiliki dua sisi berbentuk lingkaran.',
      'Memiliki satu titik sudut.',
      'Memiliki tiga sisi.',
      'Selimutnya berbentuk persegi panjang jika dibuka.'
    ],
    answer: [0, 2, 3],
    explain: 'Tabung punya dua sisi lingkaran (alas dan atas) serta satu selimut, sehingga totalnya tiga sisi. Selimut tabung membuka menjadi persegi panjang. Tabung tidak memiliki titik sudut.'
  },
  {
    id: 'MTK-039', subject: 'mtk', bab: 'Data dan Peluang', title: 'Peluang komplemen',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Prakiraan cuaca menyebut peluang hujan besok 0,35.</p>',
    question: 'Peluang besok <b>tidak</b> hujan adalah …',
    options: ['0,35', '0,55', '0,65', '0,75'],
    answer: 2,
    explain: 'Peluang komplemen = 1 − P(A) = 1 − 0,35 = 0,65. Jumlah peluang hujan dan tidak hujan selalu 1.'
  },
  {
    id: 'MTK-040', subject: 'mtk', bab: 'Data dan Peluang', title: 'Frekuensi harapan',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Sebuah dadu dilempar 120 kali.</p>',
    question: 'Frekuensi harapan muncul mata 5 adalah … kali',
    options: ['12', '20', '24', '30'],
    answer: 1,
    explain: 'P(5) = 1/6, sehingga frekuensi harapan = 1/6 × 120 = 20 kali.'
  },
  {
    id: 'MTK-041', subject: 'mtk', bab: 'Data dan Peluang', title: 'Membaca ukuran pemusatan',
    level: 'Sedang', type: 'multi',
    stimulus: '<p>Nilai delapan siswa: 6, 6, 7, 7, 8, 8, 9, 9.</p>',
    question: 'Pernyataan yang benar tentang data tersebut adalah …',
    options: [
      'Rata-ratanya 7,5.',
      'Mediannya 7,5.',
      'Modusnya 8.',
      'Jangkauannya 3.'
    ],
    answer: [0, 1, 3],
    explain: 'Jumlah nilai 60 dibagi 8 = 7,5. Median = (7 + 8) ÷ 2 = 7,5. Tidak ada modus karena semua nilai muncul dua kali. Jangkauan = 9 − 6 = 3.'
  },
  {
    id: 'MTK-042', subject: 'mtk', bab: 'Data dan Peluang', title: 'Peluang beberapa warna bola',
    level: 'Menantang', type: 'table',
    stimulus: '<p>Sebuah kotak berisi 4 bola merah, 5 bola kuning, dan 3 bola putih. Satu bola diambil secara acak.</p>',
    question: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
    cols: ['Benar', 'Salah'],
    rows: [
      { t: 'Peluang terambil bola merah adalah 1/3.', a: 0 },
      { t: 'Peluang terambil bukan bola putih adalah 3/4.', a: 0 },
      { t: 'Peluang terambil bola putih adalah 1/3.', a: 1 }
    ],
    explain: 'Jumlah bola 12. Merah 4/12 = 1/3 (benar). Bukan putih = 9/12 = 3/4 (benar). Putih 3/12 = 1/4, bukan 1/3 (salah).'
  },

  /* ================= BAHASA INDONESIA · tambahan 3 ================= */
  {
    id: 'IND-026', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Makna kata pada petunjuk',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Lembar soal dibagikan tepat pukul tujuh. Sebelum mulai, pengawas membacakan petunjuk pengerjaan. Bacalah setiap perintah dengan cermat agar tidak ada langkah yang terlewat. Periksa kembali nomor jawaban sebelum lembar dikumpulkan. Sisa waktu sepuluh menit dipakai untuk memeriksa ulang.</p>',
    question: 'Makna kata <i>cermat</i> pada kalimat tersebut adalah …',
    options: ['dengan tergesa-gesa', 'dengan teliti', 'dengan ragu', 'dengan santai'],
    answer: 1,
    explain: 'Konteksnya meminta agar tidak ada langkah yang terlewat, sehingga cermat berarti teliti atau hati-hati.'
  },
  {
    id: 'IND-027', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Menemukan batas waktu pada teks',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Pendaftaran lomba poster dibuka 3–7 Agustus. Tema lomba tahun ini adalah hemat energi di sekolah. Karya dikumpulkan paling lambat 10 Agustus di ruang OSIS. Poster dinilai dari isi pesan, kreativitas, dan kerapian. Pemenang diumumkan saat upacara 17 Agustus. Hadiah diberikan langsung oleh kepala sekolah.</p>',
    question: 'Karya poster paling lambat dikumpulkan pada …',
    options: ['3 Agustus', '7 Agustus', '10 Agustus', '17 Agustus'],
    answer: 2,
    explain: 'Teks menyebut karya dikumpulkan paling lambat 10 Agustus. Tanggal 3–7 Agustus adalah masa pendaftaran, sedangkan 17 Agustus adalah pengumuman pemenang.'
  },
  {
    id: 'IND-028', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Kesesuaian informasi pada teks',
    level: 'Sedang', type: 'table',
    stimulus: '<p>Perpustakaan sekolah buka Senin–Jumat pukul 07.00–15.00. Pada Sabtu dan Minggu perpustakaan tutup. Buku yang terlambat dikembalikan dikenai denda Rp500 per hari. Siswa boleh meminjam dua buku sekaligus. Kartu anggota wajib dibawa setiap kali meminjam. Petugas perpustakaan adalah siswa kelas sembilan yang bertugas bergiliran.</p>',
    question: 'Tentukan pernyataan yang sesuai dan tidak sesuai dengan teks!',
    cols: ['Sesuai', 'Tidak sesuai'],
    rows: [
      { t: 'Perpustakaan tutup pada akhir pekan.', a: 0 },
      { t: 'Denda keterlambatan Rp5.000 per hari.', a: 1 },
      { t: 'Perpustakaan buka delapan jam pada hari sekolah.', a: 0 }
    ],
    explain: 'Sabtu dan Minggu tutup (sesuai). Denda Rp500 per hari, bukan Rp5.000 (tidak sesuai). 07.00–15.00 berarti delapan jam (sesuai).'
  },
  {
    id: 'IND-029', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Ide pokok paragraf',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>Menulis jurnal sebelum tidur membantu pelajar mengenali perasaannya. Saat menulis, mereka belajar memilih kata untuk hal yang sulit dijelaskan. Kebiasaan ini juga membuat pikiran lebih tenang sehingga tidur menjadi lebih nyenyak. Banyak siswa mengaku lebih mudah bercerita kepada orang tua setelah rutin menulis jurnal. Guru bimbingan konseling menyarankan kegiatan ini tanpa memaksa isi tulisan. Yang penting bukan panjangnya, melainkan rutinitasnya.</p>',
    question: 'Ide pokok paragraf tersebut adalah …',
    options: [
      'Menulis jurnal membantu pelajar mengenali perasaan dan menenangkan pikiran.',
      'Pelajar harus tidur lebih awal setiap malam.',
      'Menulis jurnal memerlukan banyak kata baru.',
      'Tidur nyenyak hanya bisa didapat dengan menulis.'
    ],
    answer: 0,
    explain: 'Kalimat utama menyebut manfaat menulis jurnal bagi perasaan, lalu kalimat berikutnya menjelaskan manfaat lain yang sejalan, yaitu pikiran lebih tenang.'
  },
  {
    id: 'IND-030', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Menyimpulkan sikap tokoh',
    level: 'Menantang', type: 'pg',
    stimulus: '<p>Alya menunda mendaftar lomba sampai hari terakhir. Ia membaca ulang syarat lomba tiga kali. Sepanjang malam ia membayangkan gagal di babak pertama. Saat mengumpulkan formulir, tangannya gemetar, tetapi ia tetap melangkah ke meja panitia. Ia sempat berhenti di depan pintu, lalu menarik napas panjang. Setelah formulir diterima, Alya tersenyum lega.</p>',
    question: 'Sikap Alya yang dapat disimpulkan dari teks tersebut adalah …',
    options: [
      'Alya yakin sepenuhnya pada kemampuannya.',
      'Alya ragu dan gugup, tetapi tetap berusaha.',
      'Alya tidak berminat mengikuti lomba.',
      'Alya mengandalkan bantuan panitia.'
    ],
    answer: 1,
    explain: 'Alya menunda, membaca syarat berulang, dan tangannya gemetar: tanda ragu dan gugup. Tapi ia tetap mengumpulkan formulir, jadi usahanya jalan terus.'
  },
  {
    id: 'IND-031', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Simpulan yang didukung data',
    level: 'Sedang', type: 'multi',
    stimulus: '<p>Sejak sekolah menyediakan rak sepeda yang aman, siswa yang bersepeda ke sekolah naik dari 40 menjadi 60 orang dalam tiga bulan. Rak itu beratap dan dikunci setiap sore. Guru juga melaporkan kemacetan di gerbang berkurang. Beberapa siswa mengaku lebih memilih bersepeda karena tidak perlu berebut angkutan. Sekolah berencana menambah rak pada tahun ajaran berikutnya. Kepala sekolah berharap kebiasaan ini juga menyehatkan siswa.</p>',
    question: 'Simpulan yang didukung oleh teks tersebut adalah …',
    options: [
      'Jumlah siswa yang bersepeda ke sekolah bertambah.',
      'Rak sepeda yang aman membuat siswa lebih mau bersepeda.',
      'Semua siswa sekarang bersepeda ke sekolah.',
      'Kemacetan di gerbang sekolah berkurang.'
    ],
    answer: [0, 1, 3],
    explain: 'Teks menyebut kenaikan 40 menjadi 60, rak yang aman, dan kemacetan berkurang. Teks tidak menyatakan semua siswa bersepeda.'
  },
  {
    id: 'IND-032', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Mengenali majas hiperbola',
    level: 'Dasar', type: 'pg', stimulus: '',
    question: 'Kalimat yang memakai majas <b>hiperbola</b> adalah …',
    options: [
      '“Suaranya menggelegar sampai ke langit.”',
      '“Angin berbisik di telinga petani.”',
      '“Wajahnya bersinar seperti bulan.”',
      '“Ia bekerja seperti kuda.”'
    ],
    answer: 0,
    explain: 'Hiperbola melebih-lebihkan kenyataan, seperti suara yang sampai ke langit. Pilihan lain memakai personifikasi dan perbandingan.'
  },
  {
    id: 'IND-033', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Membedakan fakta dan opini',
    level: 'Sedang', type: 'pg', stimulus: '',
    question: 'Kalimat yang berisi <b>opini</b> adalah …',
    options: [
      '“Perpustakaan sekolah memiliki 4.200 judul buku.”',
      '“Menurut saya, jam istirahat sebaiknya ditambah lima belas menit.”',
      '“Kegiatan pramuka dilaksanakan setiap hari Jumat.”',
      '“Jumlah siswa kelas IX tahun ini 132 orang.”'
    ],
    answer: 1,
    explain: 'Opini berisi pendapat pribadi, ditandai frasa “menurut saya” dan kata “sebaiknya”. Tiga kalimat lain berisi data yang dapat diperiksa.'
  },
  {
    id: 'IND-034', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Mengkritik paragraf argumentasi',
    level: 'Menantang', type: 'multi',
    stimulus: '<p>Semua siswa wajib mengikuti ekstrakurikuler. Pasti semua setuju karena kegiatan itu bagus. Tidak ada satu pun alasan yang menyebut manfaat khusus bagi siswa. Paragraf itu juga tidak menyebut siapa yang menyusun aturan tersebut. Pembaca pun tidak diberi gambaran bagaimana kegiatan dijalankan. Padahal, topik ini menyangkut jadwal pulang semua siswa.</p>',
    question: 'Kelemahan paragraf tersebut adalah …',
    options: [
      'Menggeneralisasi dengan kata “semua” dan “pasti”.',
      'Tidak menyertakan data atau bukti pendukung.',
      'Kalimatnya terlalu panjang dan berbelit.',
      'Alasannya terlalu umum, yaitu “kegiatan itu bagus”.'
    ],
    answer: [0, 1, 3],
    explain: 'Paragraf memakai kata “semua” dan “pasti” tanpa bukti, tidak menyertakan data, dan alasannya terlalu umum. Kalimatnya justru pendek, jadi pilihan ketiga bukan kelemahan.'
  },
  { id: 'MTK-043', subject: 'mtk', bab: 'Bilangan', title: 'FPB dua bilangan', level: 'Dasar', type: 'pg', stimulus: '', question: 'FPB dari 18 dan 24 adalah …', options: ['3', '6', '9', '12'], answer: 1, explain: '18 = 2 × 3² dan 24 = 2³ × 3. Faktor persekutuan terbesarnya 2 × 3 = 6.' },
  { id: 'MTK-044', subject: 'mtk', bab: 'Bilangan', title: 'KPK dua bilangan', level: 'Dasar', type: 'pg', stimulus: '', question: 'KPK dari 4 dan 6 adalah …', options: ['2', '12', '18', '24'], answer: 1, explain: 'Kelipatan 4: 4, 8, 12, …; kelipatan 6: 6, 12, … Kelipatan persekutuan terkecilnya 12.' },
  { id: 'MTK-045', subject: 'mtk', bab: 'Bilangan', title: 'Nilai bilangan berpangkat', level: 'Dasar', type: 'pg', stimulus: '', question: 'Nilai 2⁵ adalah …', options: ['10', '16', '25', '32'], answer: 3, explain: '2⁵ = 2 × 2 × 2 × 2 × 2 = 32. Angka 5 adalah pangkat, bukan pengali.' },
  { id: 'MTK-046', subject: 'mtk', bab: 'Bilangan', title: 'Akar kuadrat', level: 'Dasar', type: 'pg', stimulus: '', question: '√144 = …', options: ['11', '12', '14', '24'], answer: 1, explain: '12 × 12 = 144, jadi akar kuadrat dari 144 adalah 12.' },
  { id: 'MTK-047', subject: 'mtk', bab: 'Bilangan', title: 'Pecahan dan desimal', level: 'Dasar', type: 'pg', stimulus: '', question: '0,25 + 3/4 = …', options: ['0,75', '1', '1,25', '1,5'], answer: 1, explain: '3/4 = 0,75, sehingga 0,25 + 0,75 = 1.' },
  { id: 'MTK-048', subject: 'mtk', bab: 'Bilangan', title: 'Persen dari bilangan', level: 'Dasar', type: 'pg', stimulus: '', question: '35% dari 200 adalah …', options: ['35', '65', '70', '80'], answer: 2, explain: '35% = 35/100, sehingga 35/100 × 200 = 70.' },
  { id: 'MTK-049', subject: 'mtk', bab: 'Bilangan', title: 'Pembagian pecahan', level: 'Sedang', type: 'pg', stimulus: '', question: '1/2 : 1/4 = …', options: ['1/8', '1/2', '2', '4'], answer: 2, explain: 'Membagi dengan pecahan sama dengan mengalikan kebalikannya: 1/2 × 4/1 = 2.' },
  { id: 'MTK-050', subject: 'mtk', bab: 'Bilangan', title: 'Mengurutkan pecahan', level: 'Sedang', type: 'pg', stimulus: '', question: 'Urutan dari yang terkecil ke terbesar adalah …', options: ['0,7; 2/3; 3/5', '2/3; 3/5; 0,7', '3/5; 0,7; 2/3', '3/5; 2/3; 0,7'], answer: 3, explain: '3/5 = 0,6 dan 2/3 ≈ 0,67, jadi urutannya 0,6 < 0,67 < 0,7.' },
  { id: 'MTK-051', subject: 'mtk', bab: 'Bilangan', title: 'Persen ke pecahan', level: 'Dasar', type: 'pg', stimulus: '', question: '12,5% sama dengan …', options: ['1/4', '1/6', '1/8', '1/12'], answer: 2, explain: '12,5% = 12,5/100 = 1/8. Cek: 1/8 = 0,125 = 12,5%.' },
  { id: 'MTK-052', subject: 'mtk', bab: 'Bilangan', title: 'Pembagian desimal', level: 'Sedang', type: 'pg', stimulus: '', question: '4,8 : 0,6 = …', options: ['0,8', '8', '80', '0,08'], answer: 1, explain: 'Kalikan kedua bilangan dengan 10: 48 : 6 = 8.' },
  { id: 'MTK-053', subject: 'mtk', bab: 'Bilangan', title: 'Pangkat bilangan negatif', level: 'Sedang', type: 'pg', stimulus: '', question: '(−3)² + (−2)³ = …', options: ['−17', '−1', '1', '17'], answer: 2, explain: '(−3)² = 9 karena pangkat genap, sedangkan (−2)³ = −8. Jadi 9 + (−8) = 1.' },
  { id: 'MTK-054', subject: 'mtk', bab: 'Bilangan', title: 'Selisih kuadrat', level: 'Dasar', type: 'pg', stimulus: '', question: '5² − 3² = …', options: ['4', '8', '16', '64'], answer: 2, explain: '5² = 25 dan 3² = 9, sehingga 25 − 9 = 16.' },
  { id: 'MTK-055', subject: 'mtk', bab: 'Bilangan', title: 'Perkalian pecahan', level: 'Sedang', type: 'pg', stimulus: '', question: '3/4 × 2/5 = …', options: ['3/10', '5/9', '6/9', '3/20'], answer: 0, explain: 'Kalikan pembilang dan penyebut: (3 × 2)/(4 × 5) = 6/20 = 3/10.' },
  { id: 'MTK-056', subject: 'mtk', bab: 'Bilangan', title: 'Skala peta', level: 'Sedang', type: 'pg', stimulus: '<p>Peta berskala 1 : 500.000. Jarak dua tempat pada peta 4 cm.</p>', question: 'Jarak sebenarnya kedua tempat adalah …', options: ['2 km', '20 km', '200 km', '2.000 km'], answer: 1, explain: '4 × 500.000 = 2.000.000 cm. Karena 1 km = 100.000 cm, hasilnya 20 km.' },
  { id: 'MTK-057', subject: 'mtk', bab: 'Bilangan', title: 'Satuan waktu', level: 'Dasar', type: 'pg', stimulus: '', question: '3 jam 45 menit sama dengan … menit', options: ['185', '205', '225', '345'], answer: 2, explain: '3 jam = 180 menit, ditambah 45 menit menjadi 225 menit.' },
  { id: 'MTK-058', subject: 'mtk', bab: 'Bilangan', title: 'Perbandingan harga', level: 'Sedang', type: 'pg', stimulus: '<p>Harga 3 buku tulis yang sama adalah Rp45.000.</p>', question: 'Harga 8 buku tulis adalah …', options: ['Rp90.000', 'Rp105.000', 'Rp120.000', 'Rp135.000'], answer: 2, explain: 'Harga satu buku = 45.000 ÷ 3 = 15.000, sehingga 8 buku = 8 × 15.000 = 120.000.' },
  { id: 'MTK-059', subject: 'mtk', bab: 'Bilangan', title: 'Harga setelah diskon', level: 'Dasar', type: 'pg', stimulus: '<p>Sebuah tas berharga Rp80.000 mendapat diskon 25%.</p>', question: 'Harga tas setelah diskon adalah …', options: ['Rp55.000', 'Rp60.000', 'Rp65.000', 'Rp75.000'], answer: 1, explain: 'Diskon = 25% × 80.000 = 20.000, sehingga harga akhir 80.000 − 20.000 = 60.000.' },
  { id: 'MTK-060', subject: 'mtk', bab: 'Bilangan', title: 'Pembulatan', level: 'Dasar', type: 'pg', stimulus: '', question: '4,67 dibulatkan ke satuan terdekat menjadi …', options: ['4', '4,6', '4,7', '5'], answer: 3, explain: 'Angka persepuluhannya 6, yaitu 5 atau lebih, sehingga dibulatkan ke atas menjadi 5.' },
  { id: 'MTK-061', subject: 'mtk', bab: 'Bilangan', title: 'KPK pada jadwal', level: 'Sedang', type: 'pg', stimulus: '<p>Rina berenang setiap 6 hari dan Dito setiap 8 hari. Hari ini mereka berenang bersama.</p>', question: 'Mereka akan berenang bersama lagi setelah … hari', options: ['12', '24', '48', '14'], answer: 1, explain: 'Dicari KPK dari 6 dan 8, yaitu 24 hari.' },
  { id: 'MTK-062', subject: 'mtk', bab: 'Bilangan', title: 'FPB dua bilangan besar', level: 'Sedang', type: 'pg', stimulus: '', question: 'FPB dari 36 dan 48 adalah …', options: ['6', '8', '12', '24'], answer: 2, explain: '36 = 2² × 3² dan 48 = 2⁴ × 3. Faktor persekutuan terbesar = 2² × 3 = 12.' },
  { id: 'MTK-063', subject: 'mtk', bab: 'Bilangan', title: 'Pangkat bertingkat', level: 'Sedang', type: 'pg', stimulus: '', question: '(2³)² = …', options: ['32', '36', '64', '128'], answer: 2, explain: 'Pangkat dikalikan: (2³)² = 2⁶ = 64.' },
  { id: 'MTK-064', subject: 'mtk', bab: 'Bilangan', title: 'Penjumlahan pecahan berbeda penyebut', level: 'Sedang', type: 'pg', stimulus: '', question: '1/4 + 1/6 = …', options: ['2/10', '5/12', '1/10', '7/12'], answer: 1, explain: 'Samakan penyebut menjadi 12: 3/12 + 2/12 = 5/12.' },
  { id: 'MTK-065', subject: 'mtk', bab: 'Bilangan', title: 'Desimal ke persen', level: 'Dasar', type: 'pg', stimulus: '', question: '0,75 sama dengan …', options: ['7,5%', '75%', '0,75%', '750%'], answer: 1, explain: 'Desimal dikali 100 menjadi persen: 0,75 × 100% = 75%.' },
  { id: 'MTK-066', subject: 'mtk', bab: 'Bilangan', title: 'Tripel Pythagoras', level: 'Menantang', type: 'pg', stimulus: '', question: '√(7² + 24²) = …', options: ['24', '25', '31', '49'], answer: 1, explain: '7² + 24² = 49 + 576 = 625, dan √625 = 25. Ini tripel Pythagoras 7–24–25.' },
  { id: 'MTK-067', subject: 'mtk', bab: 'Bilangan', title: 'Perkalian desimal', level: 'Dasar', type: 'pg', stimulus: '', question: '2,5 × 4 = …', options: ['1', '8', '10', '100'], answer: 2, explain: '2,5 × 4 = 10. Bisa juga dihitung 4 × 2 = 8 ditambah 4 × 0,5 = 2.' },
  { id: 'MTK-068', subject: 'mtk', bab: 'Aljabar', title: 'Persamaan linear satu variabel', level: 'Dasar', type: 'pg', stimulus: '', question: 'Nilai x pada 3x + 5 = 20 adalah …', options: ['3', '5', '7', '15'], answer: 1, explain: '3x = 20 − 5 = 15, sehingga x = 15 ÷ 3 = 5.' },
  { id: 'MTK-069', subject: 'mtk', bab: 'Aljabar', title: 'Nilai fungsi', level: 'Dasar', type: 'pg', stimulus: '<p>f(x) = 3x + 1</p>', question: 'f(2) = …', options: ['5', '6', '7', '9'], answer: 2, explain: 'Substitusi x = 2: 3(2) + 1 = 6 + 1 = 7.' },
  { id: 'MTK-070', subject: 'mtk', bab: 'Aljabar', title: 'Persamaan dengan tanda kurung', level: 'Sedang', type: 'pg', stimulus: '', question: 'Nilai x pada 2(x − 3) = 10 adalah …', options: ['5', '6', '8', '13'], answer: 2, explain: 'Bagi kedua ruas dengan 2: x − 3 = 5, sehingga x = 8.' },
  { id: 'MTK-071', subject: 'mtk', bab: 'Aljabar', title: 'Selisih kuadrat', level: 'Dasar', type: 'pg', stimulus: '', question: 'Faktor dari x² − 9 adalah …', options: ['(x − 3)²', '(x − 3)(x + 3)', '(x + 3)²', '(x − 9)(x + 1)'], answer: 1, explain: 'x² − 9 = x² − 3², yang difaktorkan menjadi (x − 3)(x + 3).' },
  { id: 'MTK-072', subject: 'mtk', bab: 'Aljabar', title: 'Suku ke-n barisan aritmetika', level: 'Sedang', type: 'pg', stimulus: '<p>Barisan: 5, 9, 13, …</p>', question: 'Suku ke-10 barisan tersebut adalah …', options: ['37', '41', '45', '49'], answer: 1, explain: 'Beda = 9 − 5 = 4. U₁₀ = 5 + 9 × 4 = 41.' },
  { id: 'MTK-073', subject: 'mtk', bab: 'Aljabar', title: 'Suku ke-6 barisan aritmetika', level: 'Sedang', type: 'pg', stimulus: '<p>Barisan aritmetika dengan suku pertama 7 dan beda 3.</p>', question: 'Suku ke-6 barisan tersebut adalah …', options: ['19', '22', '25', '28'], answer: 1, explain: 'U₆ = a + 5b = 7 + 15 = 22.' },
  { id: 'MTK-074', subject: 'mtk', bab: 'Aljabar', title: 'Jumlah suku pertama', level: 'Sedang', type: 'pg', stimulus: '', question: 'Jumlah 5 suku pertama barisan 2, 4, 6, 8, … adalah …', options: ['20', '25', '30', '40'], answer: 2, explain: 'Lima suku pertamanya 2, 4, 6, 8, 10. Jumlahnya 30.' },
  { id: 'MTK-075', subject: 'mtk', bab: 'Aljabar', title: 'Variabel di dua ruas', level: 'Sedang', type: 'pg', stimulus: '', question: 'Nilai x pada 4x − 2 = 2x + 8 adalah …', options: ['3', '4', '5', '6'], answer: 2, explain: '4x − 2x = 8 + 2, sehingga 2x = 10 dan x = 5.' },
  { id: 'MTK-076', subject: 'mtk', bab: 'Aljabar', title: 'Menentukan rumus fungsi', level: 'Menantang', type: 'pg', stimulus: '<p>Fungsi f(x) = ax + b dengan f(1) = 5 dan f(3) = 11.</p>', question: 'Nilai f(5) adalah …', options: ['14', '15', '17', '20'], answer: 2, explain: 'Dari f(1) = 5: a + b = 5. Dari f(3) = 11: 3a + b = 11. Selisihnya 2a = 6, jadi a = 3 dan b = 2. f(5) = 15 + 2 = 17.' },
  { id: 'MTK-077', subject: 'mtk', bab: 'Aljabar', title: 'Perkalian bentuk aljabar', level: 'Sedang', type: 'pg', stimulus: '', question: '(x + 4)(x − 4) = …', options: ['x² − 8x + 16', 'x² − 16', 'x² + 16', 'x² − 4'], answer: 1, explain: 'Bentuk (a + b)(a − b) = a² − b², sehingga hasilnya x² − 16.' },
  { id: 'MTK-078', subject: 'mtk', bab: 'Aljabar', title: 'SPLDV dengan substitusi', level: 'Sedang', type: 'pg', stimulus: '<p>2x + 3y = 12 dan x = 3.</p>', question: 'Nilai y adalah …', options: ['1', '2', '3', '6'], answer: 1, explain: 'Substitusi x = 3: 6 + 3y = 12, sehingga 3y = 6 dan y = 2.' },
  { id: 'MTK-079', subject: 'mtk', bab: 'Aljabar', title: 'Menyederhanakan bentuk aljabar', level: 'Dasar', type: 'pg', stimulus: '', question: '3a + 2b − a + 4b = …', options: ['2a + 6b', '4a + 6b', '2a + 2b', '3a + 8b'], answer: 0, explain: 'Kelompokkan suku sejenis: (3a − a) + (2b + 4b) = 2a + 6b.' },
  { id: 'MTK-080', subject: 'mtk', bab: 'Aljabar', title: 'Persamaan dengan kurung', level: 'Sedang', type: 'pg', stimulus: '', question: 'Nilai x pada 5(x + 1) = 3x + 13 adalah …', options: ['2', '3', '4', '9'], answer: 2, explain: '5x + 5 = 3x + 13, sehingga 2x = 8 dan x = 4.' },
  { id: 'MTK-081', subject: 'mtk', bab: 'Aljabar', title: 'Suku barisan geometri', level: 'Menantang', type: 'pg', stimulus: '<p>Barisan: 2, 6, 18, …</p>', question: 'Suku ke-5 barisan tersebut adalah …', options: ['54', '108', '162', '486'], answer: 2, explain: 'Rasio = 6 ÷ 2 = 3. U₅ = 2 × 3⁴ = 2 × 81 = 162.' },
  { id: 'MTK-082', subject: 'mtk', bab: 'Aljabar', title: 'Jumlah bilangan asli', level: 'Menantang', type: 'pg', stimulus: '', question: '1 + 2 + 3 + … + 20 = …', options: ['190', '200', '210', '420'], answer: 2, explain: 'Gunakan n(n + 1)/2 = 20 × 21 ÷ 2 = 210.' },
  { id: 'MTK-083', subject: 'mtk', bab: 'Aljabar', title: 'Nilai fungsi kuadrat', level: 'Sedang', type: 'pg', stimulus: '<p>f(x) = x² − 2</p>', question: 'f(−3) = …', options: ['−11', '−7', '7', '11'], answer: 2, explain: '(−3)² = 9, sehingga f(−3) = 9 − 2 = 7.' },
  { id: 'MTK-084', subject: 'mtk', bab: 'Aljabar', title: 'Pembagian bentuk aljabar', level: 'Sedang', type: 'pg', stimulus: '', question: '6x² : 2x = … (x ≠ 0)', options: ['3x', '3x²', '4x', '12x'], answer: 0, explain: '6 ÷ 2 = 3 dan x² ÷ x = x, sehingga hasilnya 3x.' },
  { id: 'MTK-085', subject: 'mtk', bab: 'Aljabar', title: 'Barisan aritmetika menurun', level: 'Sedang', type: 'pg', stimulus: '<p>Barisan: 20, 17, 14, …</p>', question: 'Suku ke-8 barisan tersebut adalah …', options: ['−4', '−1', '2', '5'], answer: 1, explain: 'Beda = −3. U₈ = 20 + 7 × (−3) = 20 − 21 = −1.' },
  { id: 'MTK-086', subject: 'mtk', bab: 'Aljabar', title: 'Perbandingan dua bagian', level: 'Sedang', type: 'pg', stimulus: '<p>Uang Ani dan Budi berbanding 3 : 4. Jumlah uang mereka Rp63.000.</p>', question: 'Uang Ani dan Budi berturut-turut adalah …', options: ['Rp21.000 dan Rp42.000', 'Rp24.000 dan Rp39.000', 'Rp27.000 dan Rp36.000', 'Rp30.000 dan Rp33.000'], answer: 2, explain: 'Jumlah bagian 3 + 4 = 7. Satu bagian = 63.000 ÷ 7 = 9.000, sehingga Ani 27.000 dan Budi 36.000.' },
  { id: 'MTK-087', subject: 'mtk', bab: 'Aljabar', title: 'Ciri relasi fungsi', level: 'Dasar', type: 'table', stimulus: '<p>Relasi dari himpunan A = {1, 2, 3} ke B = {a, b}.</p>', question: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!', cols: ['Benar', 'Salah'], rows: [{ t: 'Fungsi memetakan setiap anggota A tepat satu pasangan.', a: 0 }, { t: 'Anggota B boleh menjadi pasangan lebih dari satu anggota A.', a: 0 }, { t: 'Relasi {(1, a), (2, b), (3, a)} bukan fungsi.', a: 1 }], explain: 'Fungsi memasangkan setiap anggota daerah asal tepat satu kali, dan anggota daerah kawan boleh dipakai berulang. Relasi pada pernyataan ketiga justru fungsi.' },
  { id: 'MTK-088', subject: 'mtk', bab: 'Aljabar', title: 'Sifat fungsi menurun', level: 'Sedang', type: 'multi', stimulus: '<p>f(x) = −2x + 5</p>', question: 'Pernyataan yang benar tentang fungsi tersebut adalah …', options: ['f(0) = 5', 'f(2) = 1', 'f(−1) = 7', 'f(3) = 1'], answer: [0, 1, 2], explain: 'f(0) = 5, f(2) = 1, dan f(−1) = 7. Adapun f(3) = −6 + 5 = −1, bukan 1.' },
  { id: 'MTK-089', subject: 'mtk', bab: 'Aljabar', title: 'Menyelesaikan SPLDV', level: 'Sedang', type: 'table', stimulus: '<p>x + y = 10 dan x − y = 4.</p>', question: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!', cols: ['Benar', 'Salah'], rows: [{ t: 'Nilai x = 7.', a: 0 }, { t: 'Nilai y = 3.', a: 0 }, { t: 'Nilai x − y = 6.', a: 1 }], explain: 'Jumlahkan kedua persamaan: 2x = 14, jadi x = 7 dan y = 3. Selisihnya 4, bukan 6.' },
  { id: 'MTK-090', subject: 'mtk', bab: 'Aljabar', title: 'SPLDV pada belanja', level: 'Sedang', type: 'pg', stimulus: '<p>Harga 2 kg apel dan 1 kg jeruk Rp50.000. Harga 1 kg apel Rp20.000.</p>', question: 'Harga 1 kg jeruk adalah …', options: ['Rp8.000', 'Rp10.000', 'Rp12.000', 'Rp15.000'], answer: 1, explain: '2 kg apel = 40.000, sehingga 1 kg jeruk = 50.000 − 40.000 = 10.000.' },
  { id: 'MTK-091', subject: 'mtk', bab: 'Aljabar', title: 'Umur dalam persamaan', level: 'Sedang', type: 'pg', stimulus: '<p>Umur ayah tiga kali umur anak. Jumlah umur mereka 48 tahun.</p>', question: 'Umur anak adalah … tahun', options: ['10', '12', '14', '16'], answer: 1, explain: 'Misal umur anak x, maka 3x + x = 48, sehingga 4x = 48 dan x = 12.' },
  { id: 'MTK-092', subject: 'mtk', bab: 'Aljabar', title: 'Pola bilangan', level: 'Menantang', type: 'pg', stimulus: '<p>Banyak batang korek pada pola ke-n mengikuti U(n) = 3n + 1.</p>', question: 'Banyak batang pada pola ke-7 adalah …', options: ['19', '21', '22', '25'], answer: 2, explain: 'U(7) = 3 × 7 + 1 = 22 batang.' },
  { id: 'MTK-093', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Luas persegi', level: 'Dasar', type: 'pg', stimulus: '<p>Sebuah persegi memiliki panjang sisi 9 cm.</p>', question: 'Luas persegi tersebut adalah … cm²', options: ['18', '36', '81', '90'], answer: 2, explain: 'Luas persegi = sisi × sisi = 9 × 9 = 81 cm².' },
  { id: 'MTK-094', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Keliling persegi panjang', level: 'Dasar', type: 'pg', stimulus: '<p>Persegi panjang berukuran 12 cm × 7 cm.</p>', question: 'Kelilingnya adalah … cm', options: ['19', '38', '84', '168'], answer: 1, explain: 'Keliling = 2 × (panjang + lebar) = 2 × (12 + 7) = 38 cm.' },
  { id: 'MTK-095', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Luas segitiga', level: 'Dasar', type: 'pg', stimulus: '<p>Segitiga dengan panjang alas 10 cm dan tinggi 6 cm.</p>', question: 'Luasnya adalah … cm²', options: ['16', '30', '60', '120'], answer: 1, explain: 'Luas segitiga = 1/2 × alas × tinggi = 1/2 × 10 × 6 = 30 cm².' },
  { id: 'MTK-096', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Luas jajar genjang', level: 'Dasar', type: 'pg', stimulus: '<p>Jajar genjang dengan alas 8 cm dan tinggi 5 cm.</p>', question: 'Luasnya adalah … cm²', options: ['13', '26', '40', '80'], answer: 2, explain: 'Luas jajar genjang = alas × tinggi = 8 × 5 = 40 cm².' },
  { id: 'MTK-097', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Luas trapesium', level: 'Sedang', type: 'pg', stimulus: '<p>Trapesium dengan sisi sejajar 6 cm dan 10 cm serta tinggi 4 cm.</p>', question: 'Luasnya adalah … cm²', options: ['24', '32', '40', '64'], answer: 1, explain: 'Luas = 1/2 × (jumlah sisi sejajar) × tinggi = 1/2 × 16 × 4 = 32 cm².' },
  { id: 'MTK-098', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Luas belah ketupat', level: 'Sedang', type: 'pg', stimulus: '<p>Belah ketupat dengan diagonal 12 cm dan 16 cm.</p>', question: 'Luasnya adalah … cm²', options: ['48', '96', '192', '28'], answer: 1, explain: 'Luas = 1/2 × d₁ × d₂ = 1/2 × 12 × 16 = 96 cm².' },
  { id: 'MTK-099', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Luas lingkaran', level: 'Sedang', type: 'pg', stimulus: '<p>Lingkaran berjari-jari 10 cm. Gunakan π = 3,14.</p>', question: 'Luasnya adalah … cm²', options: ['31,4', '62,8', '314', '628'], answer: 2, explain: 'Luas = πr² = 3,14 × 10 × 10 = 314 cm².' },
  { id: 'MTK-100', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Sudut berpelurus', level: 'Dasar', type: 'pg', stimulus: '<p>Salah satu sudut pada garis lurus besarnya 125°.</p>', question: 'Pelurus sudut tersebut adalah … °', options: ['45', '55', '65', '75'], answer: 1, explain: 'Sudut berpelurus berjumlah 180°, sehingga 180 − 125 = 55°.' },
  { id: 'MTK-101', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Sudut siku-siku dibagi', level: 'Sedang', type: 'pg', stimulus: '<p>∠AOB siku-siku. Sinar OC membagi menjadi ∠AOC = 4x dan ∠COB = 5x.</p>', question: 'Besar ∠AOC adalah … °', options: ['30', '40', '50', '60'], answer: 1, explain: '4x + 5x = 90, sehingga 9x = 90 dan x = 10. Jadi ∠AOC = 40°.' },
  { id: 'MTK-102', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Pelurus dengan variabel', level: 'Menantang', type: 'pg', stimulus: '<p>Dua sudut berpelurus besarnya 4x dan 5x.</p>', question: 'Sudut yang lebih kecil adalah … °', options: ['60', '80', '100', '120'], answer: 1, explain: '4x + 5x = 180, sehingga x = 20. Sudut terkecil = 4 × 20 = 80°.' },
  { id: 'MTK-103', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Volume kubus', level: 'Dasar', type: 'pg', stimulus: '<p>Kubus dengan panjang rusuk 6 cm.</p>', question: 'Volumenya adalah … cm³', options: ['36', '72', '216', '1.296'], answer: 2, explain: 'Volume kubus = r³ = 6 × 6 × 6 = 216 cm³.' },
  { id: 'MTK-104', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Luas permukaan kubus', level: 'Sedang', type: 'pg', stimulus: '<p>Kubus dengan rusuk 5 cm.</p>', question: 'Luas permukaannya adalah … cm²', options: ['25', '125', '150', '300'], answer: 2, explain: 'Luas satu sisi = 25 cm². Kubus punya 6 sisi, sehingga 6 × 25 = 150 cm².' },
  { id: 'MTK-105', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Volume balok', level: 'Dasar', type: 'pg', stimulus: '<p>Balok berukuran 8 cm × 3 cm × 4 cm.</p>', question: 'Volumenya adalah … cm³', options: ['15', '48', '96', '192'], answer: 2, explain: 'Volume = panjang × lebar × tinggi = 8 × 3 × 4 = 96 cm³.' },
  { id: 'MTK-106', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Luas permukaan balok', level: 'Menantang', type: 'pg', stimulus: '<p>Balok berukuran 8 cm × 4 cm × 3 cm.</p>', question: 'Luas permukaannya adalah … cm²', options: ['68', '96', '136', '192'], answer: 2, explain: '2(pl + pt + lt) = 2(32 + 24 + 12) = 2 × 68 = 136 cm².' },
  { id: 'MTK-107', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Volume prisma', level: 'Sedang', type: 'pg', stimulus: '<p>Prisma dengan alas persegi bersisi 4 cm dan tinggi 9 cm.</p>', question: 'Volumenya adalah … cm³', options: ['36', '72', '144', '288'], answer: 2, explain: 'Luas alas = 16 cm². Volume = 16 × 9 = 144 cm³.' },
  { id: 'MTK-108', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Volume limas', level: 'Menantang', type: 'pg', stimulus: '<p>Limas dengan luas alas 36 cm² dan tinggi 8 cm.</p>', question: 'Volumenya adalah … cm³', options: ['48', '96', '144', '288'], answer: 1, explain: 'Volume limas = 1/3 × luas alas × tinggi = 1/3 × 36 × 8 = 96 cm³.' },
  { id: 'MTK-109', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Kerangka balok', level: 'Sedang', type: 'pg', stimulus: '<p>Kerangka balok berukuran 10 cm × 6 cm × 4 cm dibuat dari kawat.</p>', question: 'Panjang kawat yang dibutuhkan adalah … cm', options: ['20', '60', '80', '160'], answer: 2, explain: 'Kerangka balok = 4(p + l + t) = 4(10 + 6 + 4) = 4 × 20 = 80 cm.' },
  { id: 'MTK-110', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Jaring-jaring kubus', level: 'Dasar', type: 'pg', stimulus: '', question: 'Jaring-jaring kubus terdiri atas … persegi', options: ['4', '6', '8', '12'], answer: 1, explain: 'Kubus memiliki 6 sisi berbentuk persegi, sehingga jaring-jaringnya juga 6 persegi.' },
  { id: 'MTK-111', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Kesebangunan segitiga', level: 'Menantang', type: 'pg', stimulus: '<p>Dua segitiga sebangun. Sisi 6 cm bersesuaian dengan 9 cm, sedangkan sisi 8 cm bersesuaian dengan x.</p>', question: 'Nilai x adalah … cm', options: ['10', '12', '13', '15'], answer: 1, explain: 'Perbandingan sisi = 6 : 9 = 2 : 3, sehingga 8 : x = 2 : 3. Maka x = 8 × 3/2 = 12 cm.' },
  { id: 'MTK-112', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Skala denah', level: 'Sedang', type: 'pg', stimulus: '<p>Denah rumah berskala 1 : 200. Panjang ruang tamu pada denah 5 cm.</p>', question: 'Panjang ruang tamu sebenarnya adalah …', options: ['1 m', '10 m', '100 m', '1.000 m'], answer: 1, explain: '5 × 200 = 1.000 cm = 10 m.' },
  { id: 'MTK-113', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Sudut segitiga sama kaki', level: 'Sedang', type: 'pg', stimulus: '<p>Segitiga sama kaki memiliki sudut puncak 40°.</p>', question: 'Besar salah satu sudut alasnya adalah … °', options: ['40', '55', '70', '140'], answer: 2, explain: 'Dua sudut alasnya sama besar. (180 − 40) ÷ 2 = 70°.' },
  { id: 'MTK-114', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Keliling lingkaran', level: 'Sedang', type: 'pg', stimulus: '<p>Lingkaran berjari-jari 21 cm. Gunakan π = 22/7.</p>', question: 'Kelilingnya adalah … cm', options: ['66', '132', '264', '1.386'], answer: 1, explain: 'Keliling = 2πr = 2 × 22/7 × 21 = 132 cm.' },
  { id: 'MTK-115', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Luas selimut tabung', level: 'Menantang', type: 'pg', stimulus: '<p>Tabung berjari-jari 7 cm dan tinggi 10 cm. Gunakan π = 22/7.</p>', question: 'Luas selimutnya adalah … cm²', options: ['220', '440', '1.540', '3.080'], answer: 1, explain: 'Luas selimut = 2πrt = 2 × 22/7 × 7 × 10 = 440 cm².' },
  { id: 'MTK-116', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Sifat bangun datar', level: 'Sedang', type: 'table', stimulus: '', question: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!', cols: ['Benar', 'Salah'], rows: [{ t: 'Persegi memiliki empat simetri lipat.', a: 0 }, { t: 'Jajar genjang memiliki empat sudut siku-siku.', a: 1 }, { t: 'Diagonal belah ketupat berpotongan tegak lurus.', a: 0 }], explain: 'Persegi punya empat simetri lipat (benar). Jajar genjang hanya memiliki sudut siku-siku jika berbentuk persegi panjang (salah). Diagonal belah ketupat memang berpotongan tegak lurus (benar).' },
  { id: 'MTK-117', subject: 'mtk', bab: 'Geometri dan Pengukuran', title: 'Unsur limas segi empat', level: 'Sedang', type: 'multi', stimulus: '', question: 'Pernyataan yang benar tentang limas segi empat adalah …', options: ['Memiliki lima titik sudut.', 'Memiliki delapan rusuk.', 'Memiliki empat sisi tegak berbentuk segitiga.', 'Memiliki enam sisi.'], answer: [0, 1, 2], explain: 'Limas segi empat punya 5 titik sudut (4 di alas + 1 puncak), 8 rusuk, dan 4 sisi tegak segitiga. Sisi totalnya 5 (1 alas + 4 tegak), bukan 6.' },
  { id: 'MTK-118', subject: 'mtk', bab: 'Data dan Peluang', title: 'Rata-rata data tunggal', level: 'Dasar', type: 'pg', stimulus: '', question: 'Rata-rata dari 4, 6, 8, 10 adalah …', options: ['6', '7', '8', '9'], answer: 1, explain: 'Jumlah data 28, banyak data 4, sehingga rata-ratanya 28 ÷ 4 = 7.' },
  { id: 'MTK-119', subject: 'mtk', bab: 'Data dan Peluang', title: 'Median data ganjil', level: 'Dasar', type: 'pg', stimulus: '', question: 'Median dari 5, 7, 9, 11, 13 adalah …', options: ['7', '9', '11', '13'], answer: 1, explain: 'Data sudah terurut dan banyaknya 5 (ganjil), sehingga median adalah data ke-3, yaitu 9.' },
  { id: 'MTK-120', subject: 'mtk', bab: 'Data dan Peluang', title: 'Modus data tunggal', level: 'Dasar', type: 'pg', stimulus: '', question: 'Modus dari 2, 3, 3, 4, 5 adalah …', options: ['2', '3', '4', '5'], answer: 1, explain: 'Nilai 3 muncul dua kali, paling sering dibanding nilai lain.' },
  { id: 'MTK-121', subject: 'mtk', bab: 'Data dan Peluang', title: 'Median data genap', level: 'Sedang', type: 'pg', stimulus: '', question: 'Median dari 3, 5, 7, 9 adalah …', options: ['5', '6', '7', '8'], answer: 1, explain: 'Banyak data 4 (genap). Dua nilai tengahnya 5 dan 7, sehingga median = (5 + 7) ÷ 2 = 6.' },
  { id: 'MTK-122', subject: 'mtk', bab: 'Data dan Peluang', title: 'Jangkauan data', level: 'Sedang', type: 'pg', stimulus: '', question: 'Jangkauan dari 12, 15, 9, 20 adalah …', options: ['8', '9', '11', '20'], answer: 2, explain: 'Jangkauan = data terbesar − data terkecil = 20 − 9 = 11.' },
  { id: 'MTK-123', subject: 'mtk', bab: 'Data dan Peluang', title: 'Rata-rata dari jumlah total', level: 'Sedang', type: 'pg', stimulus: '<p>Jumlah nilai enam siswa adalah 48.</p>', question: 'Rata-rata nilai mereka adalah …', options: ['6', '7', '8', '9'], answer: 2, explain: 'Rata-rata = jumlah ÷ banyak data = 48 ÷ 6 = 8.' },
  { id: 'MTK-124', subject: 'mtk', bab: 'Data dan Peluang', title: 'Peluang mata dadu', level: 'Dasar', type: 'pg', stimulus: '', question: 'Peluang muncul mata dadu lebih dari 4 adalah …', options: ['1/6', '1/3', '1/2', '2/3'], answer: 1, explain: 'Mata lebih dari 4 adalah 5 dan 6, jadi 2 dari 6 kemungkinan. Peluangnya 2/6 = 1/3.' },
  { id: 'MTK-125', subject: 'mtk', bab: 'Data dan Peluang', title: 'Peluang pada koin', level: 'Dasar', type: 'pg', stimulus: '', question: 'Peluang muncul gambar pada satu lemparan koin adalah …', options: ['0', '1/2', '1', '2'], answer: 1, explain: 'Ada dua hasil yang mungkin, angka atau gambar, sehingga peluang gambar 1/2.' },
  { id: 'MTK-126', subject: 'mtk', bab: 'Data dan Peluang', title: 'Peluang bola berwarna', level: 'Sedang', type: 'pg', stimulus: '<p>Kantong berisi 3 bola merah dan 5 bola biru.</p>', question: 'Peluang terambil bola merah adalah …', options: ['3/5', '3/8', '5/8', '1/2'], answer: 1, explain: 'Jumlah bola 8 dan 3 di antaranya merah, sehingga peluangnya 3/8.' },
  { id: 'MTK-127', subject: 'mtk', bab: 'Data dan Peluang', title: 'Peluang komplemen', level: 'Dasar', type: 'pg', stimulus: '<p>Peluang suatu kejadian A adalah 0,4.</p>', question: 'Peluang bukan A adalah …', options: ['0,4', '0,5', '0,6', '1,4'], answer: 2, explain: 'P(bukan A) = 1 − P(A) = 1 − 0,4 = 0,6.' },
  { id: 'MTK-128', subject: 'mtk', bab: 'Data dan Peluang', title: 'Frekuensi harapan koin', level: 'Sedang', type: 'pg', stimulus: '<p>Sebuah koin dilempar 80 kali.</p>', question: 'Frekuensi harapan muncul angka adalah … kali', options: ['20', '40', '60', '80'], answer: 1, explain: 'P(angka) = 1/2, sehingga frekuensi harapan = 1/2 × 80 = 40 kali.' },
  { id: 'MTK-129', subject: 'mtk', bab: 'Data dan Peluang', title: 'Dua koin dilempar', level: 'Sedang', type: 'pg', stimulus: '', question: 'Peluang muncul dua gambar pada pelemparan dua koin adalah …', options: ['1/8', '1/4', '1/2', '3/4'], answer: 1, explain: 'Ada empat hasil: AA, AG, GA, GG. Hanya GG yang diinginkan, sehingga peluangnya 1/4.' },
  { id: 'MTK-130', subject: 'mtk', bab: 'Data dan Peluang', title: 'Modus data berulang', level: 'Dasar', type: 'pg', stimulus: '', question: 'Modus dari 7, 7, 8, 9, 9, 9 adalah …', options: ['7', '8', '9', '9,5'], answer: 2, explain: 'Nilai 9 muncul tiga kali, lebih sering daripada 7 yang muncul dua kali.' },
  { id: 'MTK-131', subject: 'mtk', bab: 'Data dan Peluang', title: 'Median delapan data', level: 'Menantang', type: 'pg', stimulus: '', question: 'Median dari 4, 5, 6, 7, 8, 9, 10, 11 adalah …', options: ['7', '7,5', '8', '8,5'], answer: 1, explain: 'Banyak data 8, dua nilai tengahnya 7 dan 8. Median = (7 + 8) ÷ 2 = 7,5.' },
  { id: 'MTK-132', subject: 'mtk', bab: 'Data dan Peluang', title: 'Diagram lingkaran', level: 'Sedang', type: 'pg', stimulus: '<p>Diagram lingkaran kegemaran 200 siswa menunjukkan 25% memilih membaca.</p>', question: 'Banyak siswa yang gemar membaca adalah … siswa', options: ['25', '40', '50', '75'], answer: 2, explain: '25% × 200 = 1/4 × 200 = 50 siswa.' },
  { id: 'MTK-133', subject: 'mtk', bab: 'Data dan Peluang', title: 'Rata-rata setelah data baru', level: 'Menantang', type: 'pg', stimulus: '<p>Rata-rata empat nilai adalah 75. Ditambahkan satu nilai baru, yaitu 85.</p>', question: 'Rata-rata kelima nilai tersebut adalah …', options: ['75', '77', '78', '80'], answer: 1, explain: 'Jumlah empat nilai = 4 × 75 = 300. Jumlah baru = 300 + 85 = 385, sehingga rata-rata = 385 ÷ 5 = 77.' },
  { id: 'MTK-134', subject: 'mtk', bab: 'Data dan Peluang', title: 'Peluang bukan warna tertentu', level: 'Sedang', type: 'pg', stimulus: '<p>Sebuah kotak berisi 10 bola, 4 di antaranya merah.</p>', question: 'Peluang terambil bola bukan merah adalah …', options: ['2/5', '3/5', '4/10', '1/2'], answer: 1, explain: 'Bola bukan merah ada 6 dari 10, sehingga peluangnya 6/10 = 3/5.' },
  { id: 'MTK-135', subject: 'mtk', bab: 'Data dan Peluang', title: 'Modus dari tabel frekuensi', level: 'Sedang', type: 'pg', stimulus: '<table><tr><th>Nilai</th><th>Frekuensi</th></tr><tr><td>6</td><td>3</td></tr><tr><td>7</td><td>5</td></tr><tr><td>8</td><td>2</td></tr></table>', question: 'Modus data tersebut adalah …', options: ['6', '7', '8', '10'], answer: 1, explain: 'Frekuensi terbesar adalah 5 pada nilai 7, sehingga modusnya 7.' },
  { id: 'MTK-136', subject: 'mtk', bab: 'Data dan Peluang', title: 'Peluang mata dadu genap', level: 'Dasar', type: 'pg', stimulus: '', question: 'Peluang muncul mata dadu genap adalah …', options: ['1/6', '1/3', '1/2', '2/3'], answer: 2, explain: 'Mata genap ada tiga (2, 4, 6) dari enam kemungkinan, sehingga peluangnya 3/6 = 1/2.' },
  { id: 'MTK-137', subject: 'mtk', bab: 'Data dan Peluang', title: 'Rata-rata lima data', level: 'Dasar', type: 'pg', stimulus: '', question: 'Rata-rata dari 10, 12, 14, 16, 18 adalah …', options: ['12', '13', '14', '15'], answer: 2, explain: 'Jumlah data 70 dan banyaknya 5, sehingga rata-rata 70 ÷ 5 = 14.' },
  { id: 'MTK-138', subject: 'mtk', bab: 'Data dan Peluang', title: 'Median enam data', level: 'Sedang', type: 'pg', stimulus: '', question: 'Median dari 6, 8, 8, 10, 12, 14 adalah …', options: ['8', '9', '10', '11'], answer: 1, explain: 'Dua nilai tengahnya 8 dan 10, sehingga median = (8 + 10) ÷ 2 = 9.' },
  { id: 'MTK-139', subject: 'mtk', bab: 'Data dan Peluang', title: 'Menilai ukuran pemusatan', level: 'Menantang', type: 'table', stimulus: '<p>Data: 2, 4, 4, 6, 8.</p>', question: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!', cols: ['Benar', 'Salah'], rows: [{ t: 'Rata-ratanya 4,8.', a: 0 }, { t: 'Mediannya 4.', a: 0 }, { t: 'Modusnya 6.', a: 1 }], explain: 'Jumlah data 24 dibagi 5 = 4,8 (benar). Nilai tengahnya 4 (benar). Modusnya 4 karena muncul dua kali, bukan 6 (salah).' },
  { id: 'MTK-140', subject: 'mtk', bab: 'Data dan Peluang', title: 'Sifat nilai peluang', level: 'Dasar', type: 'multi', stimulus: '', question: 'Pernyataan yang benar tentang peluang adalah …', options: ['Peluang kejadian mustahil adalah 0.', 'Peluang kejadian pasti adalah 1.', 'Nilai peluang selalu antara 0 dan 1.', 'Peluang boleh lebih dari 1.'], answer: [0, 1, 2], explain: 'Peluang mustahil 0 dan peluang pasti 1. Semua nilai peluang berada pada rentang 0 sampai 1, sehingga tidak mungkin lebih dari 1.' },
  { id: 'IND-035', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Makna kata pada berita', level: 'Sedang', type: 'pg', stimulus: '<p>Dinas pariwisata merilis data kunjungan selama libur akhir tahun. Kenaikan jumlah kunjungan wisata tahun ini signifikan, yaitu hampir dua kali lipat dibanding tahun lalu. Sebagian besar wisatawan datang dari kota sekitar. Pengelola objek wisata menambah petugas kebersihan selama libur. Mereka juga menyiapkan kantong parkir tambahan di luar area.</p>', question: 'Makna kata <i>signifikan</i> pada kalimat tersebut adalah …', options: ['sedikit sekali', 'cukup berarti', 'tidak menentu', 'sama saja'], answer: 1, explain: 'Konteksnya menyebut kenaikan hampir dua kali lipat, sehingga signifikan berarti cukup berarti atau penting.' },
  { id: 'IND-036', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Informasi tersurat pada pengumuman', level: 'Dasar', type: 'pg', stimulus: '<p>Klinik sehat sekolah buka setiap Senin–Kamis pukul 09.00–13.00. Siswa yang ingin memeriksakan diri cukup membawa kartu pelajar. Obat ringan seperti minyak angin dan plester tersedia gratis. Kasus yang lebih serius dirujuk ke puskesmas terdekat. Petugas klinik adalah seorang perawat yang dibantu dua siswa piket.</p>', question: 'Klinik tutup pada hari …', options: ['Senin', 'Rabu', 'Jumat', 'Kamis'], answer: 2, explain: 'Teks menyebut klinik buka Senin–Kamis, sehingga hari Jumat termasuk hari tutup.' },
  { id: 'IND-037', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Membaca jadwal pada tabel', level: 'Dasar', type: 'pg', stimulus: '<p>Stasiun kecil itu hanya melayani tiga keberangkatan setiap hari. Kereta Senja berangkat pukul 05.40. Kereta Argo menyusul pada pukul 06.15. Kereta Malam baru berangkat pukul 21.30. Loket dibuka satu jam sebelum keberangkatan pertama. Penumpang diminta datang lebih awal karena pemeriksaan tiket dilakukan di pintu masuk.</p>', question: 'Kereta yang berangkat paling awal adalah …', options: ['Argo', 'Senja', 'Malam', 'Ketiganya sama'], answer: 1, explain: '05.40 lebih awal daripada 06.15 dan 21.30, sehingga Senja berangkat paling awal.' },
  { id: 'IND-038', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Informasi rinci pada teks', level: 'Dasar', type: 'pg', stimulus: '<p>Lomba menulis cerpen terbuka untuk siswa kelas VII–IX. Tema yang diangkat tahun ini adalah kehidupan di sekolah. Naskah dikirim melalui surel panitia paling lambat 20 September. Setiap peserta hanya boleh mengirim satu naskah. Naskah ditulis dalam bahasa Indonesia dengan panjang 800 sampai 1.200 kata. Hasil penilaian diumumkan dua pekan setelah batas pengumpulan.</p>', question: 'Banyak naskah yang boleh dikirim setiap peserta adalah …', options: ['satu', 'dua', 'tiga', 'tidak dibatasi'], answer: 0, explain: 'Teks menyatakan setiap peserta hanya boleh mengirim satu naskah.' },
  { id: 'IND-039', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Kata baku', level: 'Dasar', type: 'pg', stimulus: '<p>Panitia lomba debat menggelar rapat evaluasi pada Senin sore. Mereka membahas waktu lomba yang terlalu mepet dengan ujian. Panitia sedang melakukan <b>analisa</b> terhadap hasil lomba. Beberapa anggota mengusulkan perubahan format untuk tahun depan. Keputusan akhir akan diambil setelah rapat berikutnya.</p>', question: 'Kata baku untuk kata bercetak tebal adalah …', options: ['analisis', 'analis', 'menganalisa', 'analitis'], answer: 0, explain: 'Bentuk baku menurut KBBI adalah analisis, bukan analisa.' },
  { id: 'IND-040', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Makna istilah seni', level: 'Sedang', type: 'pg', stimulus: '<p>Pameran seni tahun ini digelar di gedung bekas gudang kopi. Panitia memilih karya dari seniman muda di kota. Pameran itu menampilkan karya kontemporer dari seniman muda. Banyak karya memakai bahan daur ulang dan video pendek. Pengunjung boleh memberi tanggapan di buku besar dekat pintu masuk. Pameran berlangsung sampai akhir bulan.</p>', question: 'Makna kata <i>kontemporer</i> adalah …', options: ['karya lama yang klasik', 'karya masa kini', 'karya dari luar negeri', 'karya yang tidak selesai'], answer: 1, explain: 'Kontemporer berarti pada masa kini atau sezaman dengan sekarang.' },
  { id: 'IND-041', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Informasi biaya pada brosur', level: 'Dasar', type: 'pg', stimulus: '<p>Kemah alam dibuka untuk siswa kelas VIII. Kegiatan berlangsung tiga hari di kaki Gunung Cendana. Biaya peserta Rp150.000, sudah termasuk transportasi dan konsumsi. Peserta wajib membawa jaket dan alas tidur sendiri. Pendaftaran ditutup 10 Oktober. Informasi rinci bisa ditanyakan ke pembina OSIS.</p>', question: 'Biaya tersebut sudah mencakup …', options: ['seragam kemah', 'transportasi dan konsumsi', 'tenda pribadi', 'oleh-oleh'], answer: 1, explain: 'Teks menyebut biaya sudah termasuk transportasi dan konsumsi. Barang lain tidak disebutkan.' },
  { id: 'IND-042', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Urutan langkah pada prosedur', level: 'Sedang', type: 'pg', stimulus: '<p>Petunjuk memasak mi instan tertera di belakang kemasan. Panaskan air hingga mendidih. Masukkan mi dan rebus tiga menit. Tiriskan mi. Campurkan bumbu, lalu aduk rata. Sajikan selagi hangat agar teksturnya tidak lembek.</p>', question: 'Langkah yang dilakukan setelah mi ditiriskan adalah …', options: ['memanaskan air', 'merebus mi', 'mencampurkan bumbu', 'mendinginkan air'], answer: 2, explain: 'Urutan teks menunjukkan setelah ditiriskan, mi dicampur bumbu lalu diaduk rata.' },
  { id: 'IND-043', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Fakta pada iklan', level: 'Dasar', type: 'pg', stimulus: '<p>Toko Buku Cendekia memberikan potongan 20% untuk semua buku pelajaran setiap Sabtu. Potongan berlaku untuk pembelian minimal dua buku. Promo hanya berlaku di toko, tidak untuk pesanan daring. Pembeli cukup menunjukkan kartu pelajar di kasir. Stok buku pelajaran diperbarui setiap Jumat sore. Promo berlangsung sampai akhir semester.</p>', question: 'Potongan harga berlaku jika pembeli membeli …', options: ['satu buku', 'dua buku atau lebih', 'hanya novel', 'hanya pada hari Jumat'], answer: 1, explain: 'Teks menyebut potongan berlaku untuk pembelian minimal dua buku, yaitu dua buku atau lebih.' },
  { id: 'IND-044', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Membaca tabel kandungan gizi', level: 'Sedang', type: 'pg', stimulus: '<p>Label kemasan biskuit mencantumkan kandungan gizi per sajian. Setiap sajian berisi karbohidrat 30 g, protein 8 g, dan lemak 5 g. Berat satu sajian adalah 40 g. Biskuit ini mengandung gula tambahan. Penderita diabetes diminta memperhatikan jumlah sajian yang dimakan.</p>', question: 'Kandungan yang jumlahnya paling banyak adalah …', options: ['karbohidrat', 'protein', 'lemak', 'ketiganya sama'], answer: 0, explain: '30 g lebih besar daripada 8 g dan 5 g, sehingga karbohidrat paling banyak.' },
  { id: 'IND-045', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Makna istilah lingkungan', level: 'Dasar', type: 'pg', stimulus: '<p>Setiap Jumat, siswa kelas sembilan mengumpulkan botol plastik bekas. Botol itu dicuci lalu dipotong menjadi bentuk sederhana. Sekolah mengadakan program daur ulang sampah plastik menjadi pot bunga. Pot-pot itu dijual pada bazar sekolah. Hasil penjualannya dipakai untuk membeli bibit tanaman.</p>', question: 'Makna <i>daur ulang</i> pada kalimat tersebut adalah …', options: ['membuang sampah ke sungai', 'mengolah sampah menjadi barang baru', 'membakar sampah di halaman', 'menimbun sampah di gudang'], answer: 1, explain: 'Daur ulang berarti mengolah kembali barang bekas menjadi barang baru yang berguna, seperti pot bunga.' },
  { id: 'IND-046', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Sasaran pengumuman', level: 'Dasar', type: 'pg', stimulus: '<p>Diberitahukan kepada seluruh siswa kelas IX bahwa gladi bersih ujian dilaksanakan Jumat pukul 07.30 di aula. Siswa wajib membawa kartu peserta. Pintu aula ditutup sepuluh menit sebelum kegiatan dimulai. Siswa yang terlambat menunggu di luar sampai sesi pertama selesai. Daftar tempat duduk ditempel di papan pengumuman.</p>', question: 'Pengumuman tersebut ditujukan kepada …', options: ['seluruh guru', 'siswa kelas VII', 'siswa kelas IX', 'orang tua siswa'], answer: 2, explain: 'Teks secara jelas menyebut sasaran pengumuman adalah seluruh siswa kelas IX.' },
  { id: 'IND-047', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Informasi yang tidak ada di teks', level: 'Sedang', type: 'pg', stimulus: '<p>Perpustakaan menambah 200 buku baru bulan ini. Buku tersebut terdiri atas novel, buku pelajaran, dan ensiklopedia. Peminjaman dibatasi tiga buku per siswa. Buku baru diletakkan di rak dekat pintu masuk. Siswa dapat mengusulkan judul buku lewat kotak saran.</p>', question: 'Informasi yang <b>tidak</b> terdapat dalam teks adalah …', options: ['jumlah buku baru', 'jenis buku baru', 'batas peminjaman', 'jumlah pengunjung perpustakaan'], answer: 3, explain: 'Teks menyebut 200 buku, jenisnya, dan batas tiga buku. Jumlah pengunjung tidak disebutkan.' },
  { id: 'IND-048', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Membaca tabel suhu', level: 'Dasar', type: 'pg', stimulus: '<p>Pencatatan suhu dilakukan setiap pagi selama sepekan. Pada Senin suhu mencapai 31 °C. Selasa turun menjadi 29 °C. Rabu kembali naik hingga 33 °C. Data ini dipakai untuk pelajaran tentang perubahan cuaca. Siswa diminta membuat grafik dari catatan tersebut.</p>', question: 'Suhu terendah terjadi pada hari …', options: ['Senin', 'Selasa', 'Rabu', 'ketiganya sama'], answer: 1, explain: '29 °C adalah angka terkecil di antara 31 °C dan 33 °C, sehingga terjadi pada hari Selasa.' },
  { id: 'IND-049', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Sinonim kata', level: 'Dasar', type: 'pg', stimulus: '<p>Ia tekun berlatih meski sering gagal. Setiap sore ia datang lebih awal ke sanggar. Ia mencatat kesalahan yang dibuat pada latihan sebelumnya. Pelatih menilai kemajuannya muncul setelah tiga bulan. Kini ia dipercaya tampil di acara sekolah.</p>', question: 'Sinonim kata <i>tekun</i> adalah …', options: ['rajin', 'malas', 'cepat', 'ragu'], answer: 0, explain: 'Tekun berarti rajin dan bersungguh-sungguh dalam melakukan sesuatu.' },
  { id: 'IND-050', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Antonim kata', level: 'Dasar', type: 'pg', stimulus: '<p>Pameran itu bersifat sementara dan akan ditutup pekan depan. Karya yang dipamerkan berasal dari siswa kelas sembilan. Panitia memasang papan informasi di dekat pintu. Pengunjung diminta tidak menyentuh karya yang dipajang. Buku tamu tersedia di meja depan.</p>', question: 'Antonim kata <i>sementara</i> adalah …', options: ['sebentar', 'permanen', 'situasi', 'singkat'], answer: 1, explain: 'Sementara berarti tidak kekal, sehingga antonimnya permanen atau menetap.' },
  { id: 'IND-051', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Alat pada teks prosedur', level: 'Dasar', type: 'pg', stimulus: '<p>Untuk membuat jus: siapkan blender, gelas, dan pisau. Cuci buah sampai bersih sebelum dipotong. Potong buah, masukkan ke blender bersama air, lalu haluskan dan tuang ke gelas. Tambahkan es batu bila suka. Bersihkan blender segera setelah dipakai.</p>', question: 'Alat yang disebutkan dalam teks adalah …', options: ['blender, gelas, pisau', 'kompor, panci, sendok', 'blender, kompor, saringan', 'gelas, piring, pisau'], answer: 0, explain: 'Teks menyebut blender, gelas, dan pisau sebagai alat yang disiapkan.' },
  { id: 'IND-052', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Membaca jadwal piket', level: 'Dasar', type: 'pg', stimulus: '<p>Piket kelas dibagi untuk tiga hari pertama pekan. Hari Selasa Rani bertugas menyapu. Rabu giliran Bagas membersihkan papan tulis. Kamis Sinta menyiapkan tempat sampah. Daftar ini ditempel di pintu kelas. Siswa yang berhalangan wajib mencari pengganti.</p>', question: 'Petugas piket hari Rabu adalah …', options: ['Rani', 'Bagas', 'Sinta', 'tidak ada'], answer: 1, explain: 'Tabel menunjukkan hari Rabu bertugas Bagas.' },
  { id: 'IND-053', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Informasi pada brosur lomba', level: 'Sedang', type: 'pg', stimulus: '<p>Lomba cerdas cermat diadakan 12 November di aula sekolah. Setiap kelas mengirim satu tim berisi tiga siswa. Soal terdiri atas babak wajib, lempar, dan rebutan. Pendaftaran paling lambat 8 November. Tim yang terlambat mendaftar tidak dapat mengikuti lomba.</p>', question: 'Jumlah anggota setiap tim adalah … siswa', options: ['satu', 'dua', 'tiga', 'empat'], answer: 2, explain: 'Teks menyebut setiap kelas mengirim satu tim berisi tiga siswa.' },
  { id: 'IND-054', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Makna kata prestasi', level: 'Dasar', type: 'pg', stimulus: '<p>Prestasinya di bidang matematika membuat sekolah bangga. Ia meraih juara pertama olimpiade tingkat kota. Guru matematika mendampinginya berlatih dua kali sepekan. Sekolah mengirimkan surat penghargaan kepada orang tuanya. Ia berharap bisa mewakili provinsi tahun depan.</p>', question: 'Makna kata <i>prestasi</i> adalah …', options: ['hasil yang dicapai', 'kegagalan', 'kebiasaan', 'hobi'], answer: 0, explain: 'Prestasi berarti hasil yang telah dicapai dari usaha yang dilakukan.' },
  { id: 'IND-055', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Kesesuaian informasi dengan teks', level: 'Sedang', type: 'table', stimulus: '<p>Kegiatan bakti sosial diadakan Minggu pukul 07.00 di lapangan desa. Peserta membawa alat kebersihan sendiri. Panitia menyediakan air minum dan sarung tangan. Kegiatan selesai sebelum zuhur. Warga diminta menyiapkan tempat sampah di depan rumah.</p>', question: 'Tentukan pernyataan yang sesuai dan tidak sesuai dengan teks!', cols: ['Sesuai', 'Tidak sesuai'], rows: [{ t: 'Kegiatan diadakan hari Minggu.', a: 0 }, { t: 'Panitia menyediakan alat kebersihan.', a: 1 }, { t: 'Peserta membawa alat kebersihan sendiri.', a: 0 }], explain: 'Teks menyebut hari Minggu (sesuai). Alat kebersihan dibawa peserta sendiri, sedangkan panitia menyediakan air dan sarung tangan (tidak sesuai).' },
  { id: 'IND-056', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Peristiwa pada teks berita', level: 'Dasar', type: 'pg', stimulus: '<p>Hujan deras menyebabkan pohon tumbang di Jalan Melati pada Selasa sore. Pohon itu menutup satu lajur dan membuat antrean kendaraan memanjang. Petugas kebersihan menyingkirkan pohon itu dalam waktu satu jam sehingga lalu lintas kembali lancar. Tidak ada korban dalam kejadian tersebut. Warga diminta melapor bila melihat dahan yang rawan patah.</p>', question: 'Peristiwa yang diberitakan adalah …', options: ['pohon tumbang akibat hujan', 'kebakaran di Jalan Melati', 'lalu lintas padat setiap Selasa', 'petugas menanam pohon'], answer: 0, explain: 'Inti berita adalah pohon tumbang akibat hujan deras, lalu dievakuasi petugas.' },
  { id: 'IND-057', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Kata rujukan', level: 'Menantang', type: 'pg', stimulus: '<p>Panitia menyiapkan tenda dan perlengkapan memasak. Barang-barang tersebut akan dibagikan kepada setiap regu. Setiap regu menerima satu tenda dan satu kotak peralatan. Pembagian dilakukan setelah upacara pembukaan. Regu yang datang terlambat mengambil perlengkapannya di pos panitia.</p>', question: 'Kata <i>tersebut</i> merujuk pada …', options: ['panitia', 'tenda dan perlengkapan memasak', 'setiap regu', 'kegiatan berkemah'], answer: 1, explain: 'Kata tersebut menggantikan benda yang disebut sebelumnya, yaitu tenda dan perlengkapan memasak.' },
  { id: 'IND-058', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Pertanyaan yang dijawab teks', level: 'Sedang', type: 'pg', stimulus: '<p>Bimbingan belajar di sekolah diadakan setiap Selasa dan Kamis pukul 14.00–15.30 di ruang 7. Materi yang dibahas bergantian antara matematika dan bahasa Indonesia. Siswa cukup membawa buku catatan dan alat tulis. Jadwal materi ditempel di papan pengumuman setiap awal pekan. Pendaftaran dilakukan lewat wali kelas masing-masing.</p>', question: 'Pertanyaan yang jawabannya <b>tidak</b> terdapat dalam teks adalah …', options: ['Kapan bimbingan belajar diadakan?', 'Di mana tempatnya?', 'Siapa guru yang mengajar?', 'Apa materi yang dibahas?'], answer: 2, explain: 'Waktu, tempat, dan materi disebutkan. Nama guru pengajar tidak disebutkan.' },
  { id: 'IND-059', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Informasi pada tabel harga', level: 'Sedang', type: 'table', stimulus: '<p>Koperasi sekolah menjual alat tulis dengan harga tetap sepanjang semester. Pensil dihargai Rp2.000 per batang. Pulpen Rp3.500 per batang. Penghapus Rp1.500 per buah. Pembelian lebih dari sepuluh buah mendapat potongan lima persen. Koperasi buka pada jam istirahat pertama dan kedua.</p>', question: 'Tentukan pernyataan yang sesuai dan tidak sesuai dengan tabel!', cols: ['Sesuai', 'Tidak sesuai'], rows: [{ t: 'Pulpen paling mahal di antara ketiganya.', a: 0 }, { t: 'Penghapus lebih mahal daripada pensil.', a: 1 }, { t: 'Selisih harga pulpen dan pensil Rp1.500.', a: 0 }], explain: 'Pulpen Rp3.500 paling mahal (sesuai). Penghapus Rp1.500 lebih murah daripada pensil Rp2.000 (tidak sesuai). Selisih 3.500 − 2.000 = 1.500 (sesuai).' },
  { id: 'IND-060', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Keunggulan produk pada iklan', level: 'Dasar', type: 'pg', stimulus: '<p>Sepatu lari Nyaman menggunakan bahan ringan dan sol anti-selip. Sepatu ini cocok untuk latihan di jalan aspal maupun di lapangan. Bagian atasnya berlubang kecil agar kaki tidak cepat panas. Tersedia dalam empat warna dan lima ukuran. Harga sepatu ini Rp320.000. Pembeli mendapat tas kain sebagai bonus selama persediaan masih ada.</p>', question: 'Keunggulan sepatu tersebut adalah …', options: ['harganya mahal', 'ringan dan sol anti-selip', 'hanya untuk di dalam ruangan', 'berat dan kuat'], answer: 1, explain: 'Iklan menyebut bahan ringan dan sol anti-selip sebagai keunggulan sepatu.' },
  { id: 'IND-061', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Ide pokok paragraf', level: 'Dasar', type: 'pg', stimulus: '<p>Menghemat air bukan cuma soal tagihan. Di kota yang sering kekeringan, setiap liter yang tidak terbuang membantu warga lain mendapat air bersih. Menutup keran saat menyikat gigi bisa menghemat beberapa liter sehari. Menampung air hujan untuk menyiram tanaman juga membantu. Kebiasaan kecil ini terasa ringan, tetapi dampaknya besar bila dilakukan bersama.</p>', question: 'Ide pokok paragraf tersebut adalah …', options: ['Tagihan air harus dibayar.', 'Menghemat air penting bagi banyak orang.', 'Kota selalu kekeringan.', 'Air bersih mahal.'], answer: 1, explain: 'Kalimat pertama bilang hemat air bukan cuma soal tagihan, lalu dijelaskan bahwa air yang tidak terbuang membantu warga lain.' },
  { id: 'IND-062', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Menyimpulkan isi teks', level: 'Sedang', type: 'pg', stimulus: '<p>Kantin sekolah mengganti sedotan plastik dengan sedotan kertas. Perubahan itu diusulkan oleh pengurus OSIS setelah melihat tumpukan sampah di kantin. Dalam sebulan, sampah plastik di kantin berkurang separuh. Beberapa siswa sempat mengeluh karena sedotan kertas cepat lembek. Meski begitu, pengelola kantin tetap melanjutkan kebijakan tersebut.</p>', question: 'Simpulan yang tepat adalah …', options: ['Sedotan kertas lebih mahal.', 'Perubahan kecil dapat mengurangi sampah secara nyata.', 'Siswa berhenti membeli minuman.', 'Kantin berhenti berjualan.'], answer: 1, explain: 'Penggantian sedotan adalah perubahan sederhana, tetapi dampaknya besar: sampah plastik berkurang separuh.' },
  { id: 'IND-063', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Tujuan penulis', level: 'Dasar', type: 'pg', stimulus: '<p>Membaca lima belas menit setiap hari lebih baik daripada dua jam sekali sepekan. Waktu singkat yang rutin membuat isi bacaan lebih mudah diingat. Pilih bacaan yang kamu suka agar tidak terasa sebagai beban. Cobalah sisihkan waktu sebelum tidur. Kebiasaan ini juga membantu menenangkan pikiran sebelum istirahat.</p>', question: 'Tujuan penulis paragraf tersebut adalah …', options: ['menghibur pembaca', 'mengajak membaca secara rutin', 'menjelaskan cara menulis buku', 'menilai harga buku'], answer: 1, explain: 'Penulis membandingkan kebiasaan membaca lalu mengajak pembaca menyisihkan waktu setiap hari.' },
  { id: 'IND-064', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Sifat tokoh', level: 'Dasar', type: 'pg', stimulus: '<p>Dewi selalu membagi bekalnya kepada teman yang tidak membawa makanan. Ia tidak pernah menyebut kebaikannya itu. Saat temannya berterima kasih, Dewi hanya tersenyum lalu pindah topik. Ia juga rutin menyisihkan sebagian uang sakunya untuk kas kelas. Guru menilai Dewi lebih suka membantu daripada dipuji.</p>', question: 'Sifat Dewi yang dapat disimpulkan adalah …', options: ['sombong', 'peduli dan rendah hati', 'pelit', 'pemalas'], answer: 1, explain: 'Dewi berbagi tanpa membicarakannya, yang menunjukkan kepedulian sekaligus kerendahan hati.' },
  { id: 'IND-065', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Hubungan sebab-akibat', level: 'Sedang', type: 'pg', stimulus: '<p>Rian tidur pukul dua pagi. Ia menghabiskan malam untuk menonton video sampai lupa waktu. Saat ulangan, ia lupa rumus yang sudah dihafalnya. Ia juga sulit membaca soal panjang dengan fokus. Kejadian itu membuatnya mulai mengatur waktu tidur.</p>', question: 'Sebab Rian lupa rumus adalah …', options: ['ia tidak pernah belajar', 'ia kurang tidur', 'soalnya terlalu mudah', 'ia lupa membawa buku'], answer: 1, explain: 'Tidur sangat larut membuat otak sulit mengingat, sehingga ia lupa rumus saat ulangan.' },
  { id: 'IND-066', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Perasaan tokoh', level: 'Dasar', type: 'pg', stimulus: '<p>Nina membaca pengumuman bahwa kelasnya menang lomba. Ia melompat dan memeluk teman sebangkunya. Teman-teman lain ikut bersorak di depan papan pengumuman. Nina langsung mengirim pesan kepada ibunya. Sejak pagi ia memang menunggu hasil lomba itu.</p>', question: 'Perasaan Nina saat itu adalah …', options: ['kecewa', 'gembira', 'takut', 'bosan'], answer: 1, explain: 'Melompat dan memeluk teman merupakan reaksi gembira atas kemenangan kelasnya.' },
  { id: 'IND-067', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Pesan tersirat', level: 'Sedang', type: 'pg', stimulus: '<p>Kegagalan bukan akhir. Ia hanya memberi tahu bagian mana yang perlu diperbaiki. Orang yang mau membaca kesalahannya akan tumbuh lebih cepat. Sebaliknya, menutup diri dari koreksi membuat kesalahan yang sama terulang. Karena itu, jangan takut mencoba lagi dengan cara yang berbeda.</p>', question: 'Pesan yang ingin disampaikan adalah …', options: ['Kegagalan harus dihindari dengan berhenti.', 'Kegagalan dapat menjadi pelajaran.', 'Orang sukses tidak pernah gagal.', 'Kegagalan hanya dialami pelajar.'], answer: 1, explain: 'Penulis memandang kegagalan sebagai petunjuk bagian yang perlu diperbaiki, bukan akhir segalanya.' },
  { id: 'IND-068', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Prediksi berdasarkan petunjuk', level: 'Dasar', type: 'pg', stimulus: '<p>Langit mendung sejak pagi, angin bertiup kencang, dan beberapa orang mulai membuka payung. Awan gelap bergerak dari arah selatan. Petugas sekolah menutup jendela ruang komputer. Siswa yang membawa jaket mulai memakainya. Beberapa ibu di gerbang sudah menyiapkan jas hujan.</p>', question: 'Peristiwa yang paling mungkin terjadi berikutnya adalah …', options: ['hujan turun', 'panas terik', 'salju turun', 'angin berhenti total'], answer: 0, explain: 'Mendung, angin kencang, dan orang membuka payung adalah petunjuk kuat bahwa hujan akan turun.' },
  { id: 'IND-069', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Ide pokok tentang sarapan', level: 'Dasar', type: 'pg', stimulus: '<p>Sarapan memberi energi untuk memulai hari. Siswa yang sarapan lebih mudah berkonsentrasi dibanding yang berangkat dengan perut kosong. Menu sederhana seperti nasi dan telur sudah cukup. Sarapan juga membuat siswa tidak jajan berlebihan saat istirahat. Orang tua diminta menyiapkan menu yang mudah dimakan pagi hari.</p>', question: 'Ide pokok paragraf tersebut adalah …', options: ['Sarapan membantu energi dan konsentrasi.', 'Siswa tidak perlu makan pagi.', 'Sarapan hanya untuk orang dewasa.', 'Konsentrasi tidak berhubungan dengan makanan.'], answer: 0, explain: 'Kedua kalimat membahas manfaat sarapan bagi energi dan konsentrasi.' },
  { id: 'IND-070', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Menyimpulkan tabel', level: 'Sedang', type: 'pg', stimulus: '<p>Data kunjungan dicatat dari buku tamu perpustakaan. Bulan Juli tercatat 20 kunjungan. Agustus naik menjadi 35 kunjungan. September mencapai 50 kunjungan. Kenaikan itu terjadi setelah jam buka diperpanjang. Petugas memperkirakan jumlahnya terus bertambah pada Oktober.</p>', question: 'Simpulan yang tepat dari tabel tersebut adalah …', options: ['Kunjungan menurun setiap bulan.', 'Kunjungan meningkat setiap bulan.', 'Kunjungan tetap.', 'Kunjungan tidak dapat disimpulkan.'], answer: 1, explain: 'Angka 20, 35, dan 50 menunjukkan kenaikan 15 setiap bulan.' },
  { id: 'IND-071', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Makna tersirat kalimat', level: 'Menantang', type: 'pg', stimulus: '<p>Bu guru tidak berkata apa-apa. Ia hanya menatap jam dinding, lalu menatap Rian. Seluruh kelas diam menunggu. Rian menunduk dan meletakkan tasnya perlahan. Bu guru kemudian meminta Rian menjelaskan alasannya di luar kelas.</p>', question: 'Makna tersirat dari perbuatan Bu guru adalah …', options: ['Bu guru bangga pada Rian.', 'Bu guru tidak senang karena Rian terlambat.', 'Bu guru ingin pulang cepat.', 'Bu guru lupa membawa jam.'], answer: 1, explain: 'Menatap jam lalu menatap siswa yang datang terlambat adalah cara tidak langsung menunjukkan ketidaksenangan.' },
  { id: 'IND-072', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Sikap penulis', level: 'Sedang', type: 'pg', stimulus: '<p>Ponsel memudahkan banyak hal, tetapi juga mencuri waktu belajar jika dipakai tanpa batas. Banyak siswa membuka media sosial saat mengerjakan tugas. Sebaliknya, ponsel bisa dipakai mencari penjelasan materi yang sulit. Kuncinya ada pada pengaturan waktu dan tujuan pemakaian. Orang tua dan guru sebaiknya mendampingi, bukan langsung melarang.</p>', question: 'Sikap penulis terhadap ponsel adalah …', options: ['menolak sepenuhnya', 'menerima sepenuhnya', 'menilai secara seimbang', 'tidak peduli'], answer: 2, explain: 'Penulis menyebut sisi baik dan sisi buruk ponsel, sehingga sikapnya seimbang.' },
  { id: 'IND-073', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Latar cerita', level: 'Dasar', type: 'pg', stimulus: '<p>Suara tawar-menawar terdengar di mana-mana. Aroma ikan segar bercampur bau sayuran memenuhi udara pagi. Pedagang menyusun dagangan di atas meja kayu yang basah. Pembeli berjalan hati-hati di antara genangan air. Seorang ibu menawar harga sekilo tomat sambil menggandeng anaknya.</p>', question: 'Latar tempat cerita tersebut adalah …', options: ['pasar', 'sekolah', 'rumah sakit', 'perpustakaan'], answer: 0, explain: 'Suara tawar-menawar serta aroma ikan dan sayuran menunjukkan latar pasar.' },
  { id: 'IND-074', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Amanat cerita', level: 'Sedang', type: 'pg', stimulus: '<p>Bagas menemukan dompet di jalan. Ia membuka dompet dan melihat kartu pelajar di dalamnya. Ia menunggu pemiliknya selama satu jam meski harus melewatkan latihan futsal. Temannya mengirim pesan agar ia segera datang, tetapi Bagas tetap di tempat. Ketika pemiliknya datang, Bagas menyerahkan dompet itu tanpa meminta imbalan.</p>', question: 'Amanat cerita tersebut adalah …', options: ['Latihan futsal tidak penting.', 'Kejujuran lebih penting daripada kepentingan pribadi.', 'Dompet harus dibawa pulang.', 'Menunggu di jalan berbahaya.'], answer: 1, explain: 'Bagas memilih menunggu pemilik dompet meski kehilangan waktu latihan.' },
  { id: 'IND-075', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Menyimpulkan sebab', level: 'Dasar', type: 'pg', stimulus: '<p>Rian tiba di sekolah pukul 07.30. Gerbang sudah ditutup dan petugas sedang mencatat siswa yang terlambat. Ia mendorong sepedanya dari rumah karena ban kempes. Ia sempat mencoba menambal ban di pinggir jalan, tetapi tidak berhasil. Rian akhirnya menulis surat keterangan untuk wali kelasnya.</p>', question: 'Rian terlambat karena …', options: ['bangun kesiangan', 'ban sepedanya kempes', 'lupa membawa tas', 'menunggu teman'], answer: 1, explain: 'Teks menyebut ia mendorong sepeda karena ban kempes, sehingga perjalanannya lebih lambat.' },
  { id: 'IND-076', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Tujuan teks ajakan', level: 'Dasar', type: 'pg', stimulus: '<p>Ayo bawa botol minum sendiri ke sekolah. Satu botol yang dipakai ulang dapat menggantikan ratusan botol plastik dalam setahun. Isi botolmu sebelum berangkat agar tidak perlu membeli minuman kemasan. Kebiasaan ini juga menghemat uang jajan. Mulailah dari satu hari, lalu jadikan rutinitas.</p>', question: 'Tujuan teks tersebut adalah …', options: ['menjual botol minum', 'mengajak mengurangi sampah plastik', 'menjelaskan cara membuat botol', 'membandingkan harga botol'], answer: 1, explain: 'Kalimat ajakan dan alasan pengurangan sampah plastik menunjukkan tujuannya mengajak.' },
  { id: 'IND-077', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Simpulan dari dua kalimat', level: 'Sedang', type: 'pg', stimulus: '<p>Ujian diundur satu pekan. Pengumuman itu ditempel di papan kelas pada Senin pagi. Banyak siswa belum selesai membaca materi. Guru memakai waktu tambahan untuk mengulang bab yang sulit. Siswa yang sebelumnya cemas kini bisa menyusun jadwal belajar ulang.</p>', question: 'Simpulan yang tepat adalah …', options: ['Penundaan membantu siswa menyiapkan diri.', 'Siswa tidak ingin ujian.', 'Guru membatalkan ujian.', 'Materi ujian dikurangi.'], answer: 0, explain: 'Penundaan memberi waktu tambahan bagi siswa yang belum selesai membaca materi.' },
  { id: 'IND-078', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Nada penulis', level: 'Menantang', type: 'pg', stimulus: '<p>Betapa rapi tulisan tangan murid itu, seperti hasil cetakan mesin. Setiap huruf sama tingginya dan jaraknya teratur. Guru memajang halaman itu di papan karya kelas. Beberapa siswa mendekat untuk melihat dari dekat. Mereka bertanya bagaimana cara berlatih menulis serapi itu.</p>', question: 'Nada penulis pada kalimat tersebut adalah …', options: ['kagum', 'marah', 'sedih', 'mengejek'], answer: 0, explain: 'Pujian terhadap kerapian tulisan menunjukkan nada kagum.' },
  { id: 'IND-079', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Makna tersirat sikap tokoh', level: 'Menantang', type: 'pg', stimulus: '<p>Ia hanya tersenyum mendengar ejekan itu, lalu melanjutkan latihan tanpa berkata apa pun. Temannya kesal dan ingin membalas, tetapi ia melarang. Setiap hari ia datang lebih awal untuk berlatih. Pelatih mencatat kemajuannya dari pekan ke pekan. Saat lomba, ia tampil paling tenang di antara peserta.</p>', question: 'Sikap tokoh tersebut menunjukkan …', options: ['ia menyerah', 'ia sabar dan tidak terpengaruh', 'ia ingin membalas', 'ia tidak mendengar ejekan'], answer: 1, explain: 'Tersenyum dan melanjutkan latihan menunjukkan kesabaran serta ketidakacuhan terhadap ejekan.' },
  { id: 'IND-080', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Membandingkan dua teks', level: 'Menantang', type: 'pg', stimulus: '<p>Teks A: Perpustakaan sangat tenang sehingga cocok untuk membaca. Teks B: Perpustakaan perlu menambah kursi karena pengunjung bertambah. Teks A ditulis oleh siswa yang baru pertama kali berkunjung. Teks B ditulis oleh ketua OSIS setelah menghitung pengunjung selama sepekan. Keduanya membahas tempat yang sama dari sudut pandang berbeda.</p>', question: 'Perbedaan kedua teks tersebut adalah …', options: ['Teks A membahas suasana, teks B membahas fasilitas.', 'Keduanya membahas koleksi buku.', 'Teks A membahas harga buku.', 'Teks B membahas jam buka.'], answer: 0, explain: 'Teks A menyoroti suasana tenang, sedangkan teks B menyoroti kebutuhan kursi.' },
  { id: 'IND-081', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Simpulan dari data nilai', level: 'Sedang', type: 'pg', stimulus: '<p>Nilai ulangan Dika dicatat dalam buku kecil. Ulangan pertama menghasilkan nilai 70. Ulangan kedua naik menjadi 78. Ulangan ketiga mencapai 85. Kenaikan itu terjadi setelah ia mengikuti bimbingan belajar. Dika berencana mempertahankan cara belajarnya.</p>', question: 'Simpulan yang tepat adalah …', options: ['Nilai turun setiap ulangan.', 'Nilai meningkat setiap ulangan.', 'Nilai tetap.', 'Nilai tidak dapat dibandingkan.'], answer: 1, explain: '70, 78, dan 85 menunjukkan kenaikan berturut-turut.' },
  { id: 'IND-082', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Sifat tokoh guru', level: 'Dasar', type: 'pg', stimulus: '<p>Bu Sari mengulang penjelasan tiga kali tanpa membentak, sampai semua siswa paham. Ia memakai contoh berbeda untuk siswa yang masih bingung. Setelah pelajaran, ia menemani dua siswa berlatih soal di depan kelas. Ia juga tidak pernah membandingkan siswa satu dengan yang lain. Murid-muridnya merasa aman bertanya apa pun.</p>', question: 'Sifat Bu Sari adalah …', options: ['sabar', 'pemarah', 'acuh', 'pelupa'], answer: 0, explain: 'Mengulang penjelasan tanpa membentak menunjukkan kesabaran.' },
  { id: 'IND-083', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Pesan tentang menunda', level: 'Sedang', type: 'pg', stimulus: '<p>Tugas yang terus ditunda akan menumpuk, dan waktu luang pun habis untuk mengejar tenggat. Pekerjaan yang dikerjakan sedikit demi sedikit terasa lebih ringan. Menunda juga membuat kualitas hasil menurun karena waktu terbatas. Cobalah mulai dari bagian paling mudah. Selesaikan satu bagian hari ini, lalu lanjutkan besok.</p>', question: 'Pesan penulis adalah …', options: ['Tugas sebaiknya dikerjakan segera.', 'Tenggat tidak penting.', 'Waktu luang harus dihindari.', 'Tugas sebaiknya diabaikan.'], answer: 0, explain: 'Penulis menunjukkan dampak buruk menunda, sehingga pesannya agar tugas dikerjakan segera.' },
  { id: 'IND-084', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Ide pokok kalimat kedua', level: 'Menantang', type: 'pg', stimulus: '<p>Menabung membantu menyiapkan kebutuhan mendatang. Selain itu, menabung melatih disiplin karena harus menyisihkan uang secara rutin. Siswa bisa mulai dari jumlah kecil setiap pekan. Catatan pengeluaran membantu melihat ke mana uang pergi. Kebiasaan ini akan terasa manfaatnya saat kebutuhan besar datang.</p>', question: 'Ide pokok kalimat kedua adalah …', options: ['Menabung melatih disiplin.', 'Menabung tidak perlu rutin.', 'Uang saku harus habis.', 'Kebutuhan mendatang tidak penting.'], answer: 0, explain: 'Kalimat kedua menjelaskan manfaat menabung, yaitu melatih disiplin karena dilakukan rutin.' },
  { id: 'IND-085', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Simpulan yang didukung teks', level: 'Menantang', type: 'multi', stimulus: '<p>Sejak sekolah menyediakan parkir sepeda yang aman, siswa yang bersepeda naik dari 40 menjadi 60 orang dalam tiga bulan. Parkir itu beratap dan diawasi petugas setiap pagi. Guru melaporkan kemacetan di gerbang berkurang. Beberapa siswa mengaku lebih memilih bersepeda karena hemat biaya. Sekolah berencana menambah tempat parkir tahun depan.</p>', question: 'Simpulan yang didukung teks adalah …', options: ['Jumlah pesepeda bertambah.', 'Parkir aman membuat siswa lebih mau bersepeda.', 'Semua siswa bersepeda.', 'Kemacetan di gerbang berkurang.'], answer: [0, 1, 3], explain: 'Teks menyebut kenaikan 40 menjadi 60, parkir aman, dan kemacetan berkurang. Teks tidak menyatakan semua siswa bersepeda.' },
  { id: 'IND-086', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Majas personifikasi', level: 'Dasar', type: 'pg', stimulus: '<p>“Angin membelai rambutnya dengan lembut.” Kalimat itu ditulis dalam cerpen tentang perjalanan pulang. Penulis menggambarkan angin seperti manusia yang bisa membelai. Pembaca diajak membayangkan sentuhan lembut itu. Kalimat lain dalam cerpen juga memakai gaya serupa. Guru meminta siswa menandai kata yang membuat benda mati seolah hidup.</p>', question: 'Majas pada kalimat tersebut adalah …', options: ['personifikasi', 'hiperbola', 'metafora', 'litotes'], answer: 0, explain: 'Angin diberi sifat manusia, yaitu membelai, sehingga termasuk personifikasi.' },
  { id: 'IND-087', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Majas metafora', level: 'Sedang', type: 'pg', stimulus: '<p>“Ia adalah bintang kelas kami.” Kalimat itu muncul dalam karangan tentang teman sekelas. Penulis tidak memakai kata seperti atau bagai. Ia langsung menyamakan tokoh dengan bintang. Guru menegaskan bahwa gaya ini tidak memakai kata pembanding. Siswa lalu menuliskan contoh metafora versi mereka sendiri.</p>', question: 'Majas pada kalimat tersebut adalah …', options: ['metafora', 'simile', 'personifikasi', 'ironi'], answer: 0, explain: 'Metafora membandingkan secara langsung tanpa kata seperti atau bagai.' },
  { id: 'IND-088', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Majas perbandingan', level: 'Dasar', type: 'pg', stimulus: '<p>“Wajahnya seputih kapas.” Kalimat itu dipakai untuk menggambarkan tokoh dalam cerita. Penulis memakai kata seputih sebagai pembanding. Pembaca langsung membayangkan warna yang sangat putih. Perbandingan seperti ini sering muncul dalam puisi. Guru meminta siswa mencari kalimat lain yang memakai kata seperti atau bagai.</p>', question: 'Majas pada kalimat tersebut adalah …', options: ['simile', 'metafora', 'hiperbola', 'personifikasi'], answer: 0, explain: 'Simile membandingkan dua hal dengan kata pembanding seperti, bagai, atau seputih.' },
  { id: 'IND-089', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Mengenali fakta', level: 'Dasar', type: 'pg', stimulus: '', question: 'Kalimat yang termasuk fakta adalah …', options: ['“Air membeku pada suhu 0 °C.”', '“Menurut saya, film itu membosankan.”', '“Sebaiknya sekolah menambah kantin.”', '“Seragam itu paling bagus.”'], answer: 0, explain: 'Fakta dapat diperiksa kebenarannya, seperti titik beku air. Pilihan lain berisi penilaian pribadi.' },
  { id: 'IND-090', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Menilai kekuatan alasan', level: 'Menantang', type: 'table', stimulus: '<p>Pendapat: Siswa perlu tidur cukup. Alasan A: Penelitian menyebut kurang tidur menurunkan konsentrasi. Alasan B: Pokoknya tidur itu penting. Guru kelas sembilan sering menemukan siswa yang mengantuk pada jam pertama. Sekolah mengundang petugas puskesmas untuk sosialisasi tidur sehat. Orang tua diminta membatasi penggunaan gawai pada malam hari.</p>', question: 'Tentukan kuat atau lemah untuk setiap pernyataan berikut!', cols: ['Kuat', 'Lemah'], rows: [{ t: 'Alasan A didukung penelitian.', a: 0 }, { t: 'Alasan B tanpa bukti.', a: 0 }, { t: 'Alasan B cukup meyakinkan pembaca.', a: 1 }], explain: 'Alasan A punya bukti sehingga kuat. Alasan B hanya ajakan sehingga lemah dan tidak meyakinkan.' },
  { id: 'IND-091', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Mengkritik teks argumentasi', level: 'Menantang', type: 'multi', stimulus: '<p>Semua siswa harus ikut ekstrakurikuler. Pasti semua setuju karena kegiatan itu bagus. Paragraf itu tidak menyebut manfaat khusus bagi siswa. Tidak ada data jumlah siswa yang setuju maupun yang menolak. Pembaca juga tidak diberi tahu bagaimana kegiatan dijadwalkan.</p>', question: 'Kelemahan paragraf tersebut adalah …', options: ['Menggeneralisasi dengan kata semua dan pasti.', 'Tidak menyertakan data atau bukti.', 'Kalimatnya terlalu panjang.', 'Alasannya terlalu umum.'], answer: [0, 1, 3], explain: 'Paragraf memakai generalisasi tanpa bukti dan alasan yang terlalu umum. Kalimatnya justru pendek.' },
  { id: 'IND-092', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Menentukan tema cerita', level: 'Sedang', type: 'pg', stimulus: '<p>Warga kampung bekerja bersama membersihkan selokan. Setiap keluarga mengirim satu orang untuk membantu. Alat kebersihan dikumpulkan di balai desa sejak pagi. Setelah selesai, mereka makan bersama di halaman balai desa. Anak-anak ikut membagikan air minum kepada orang tua.</p>', question: 'Tema cerita tersebut adalah …', options: ['gotong royong', 'persaingan', 'kesedihan', 'petualangan'], answer: 0, explain: 'Kerja bersama dan makan bersama menunjukkan tema gotong royong.' },
  { id: 'IND-093', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Menentukan latar waktu', level: 'Dasar', type: 'pg', stimulus: '<p>Matahari mulai tenggelam saat mereka tiba di tepi sawah. Langit berwarna jingga dan burung terbang rendah. Petani terakhir pulang dengan cangkul di pundak. Mereka duduk di pematang sambil membuka bekal. Lampu rumah mulai menyala di kejauhan.</p>', question: 'Latar waktu pada kalimat tersebut adalah …', options: ['pagi', 'siang', 'senja', 'tengah malam'], answer: 2, explain: 'Matahari tenggelam menandakan waktu senja.' },
  { id: 'IND-094', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Sudut pandang cerita', level: 'Sedang', type: 'pg', stimulus: '<p>Aku berjalan pelan menyusuri gang sempit itu. Aku mendengar suara azan dari kejauhan. Gang itu licin setelah hujan sore. Aku memegang dinding agar tidak terpeleset. Di ujung gang, ibuku sudah menunggu dengan payung.</p>', question: 'Sudut pandang cerita tersebut adalah …', options: ['orang pertama', 'orang kedua', 'orang ketiga serba tahu', 'orang ketiga pengamat'], answer: 0, explain: 'Penggunaan kata aku menunjukkan sudut pandang orang pertama.' },
  { id: 'IND-095', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Amanat cerita', level: 'Sedang', type: 'pg', stimulus: '<p>Seorang nelayan menolong perahu yang hampir tenggelam tanpa meminta imbalan. Ia menarik perahu itu ke tepi meski jaringnya sendiri belum ditarik. Esoknya, orang yang ditolong datang membantu memperbaiki jaringnya. Mereka bekerja sambil bercerita tentang cuaca. Sejak itu, keduanya sering melaut bersama.</p>', question: 'Amanat cerita tersebut adalah …', options: ['Menolong tanpa pamrih akan berbuah kebaikan.', 'Jangan menolong orang asing.', 'Nelayan harus bekerja sendiri.', 'Imbalan harus diminta di awal.'], answer: 0, explain: 'Nelayan menolong tanpa meminta imbalan, lalu kebaikannya dibalas dengan bantuan.' },
  { id: 'IND-096', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Citraan puisi', level: 'Sedang', type: 'pg', stimulus: '<p>Senja jingga di ufuk barat, burung-burung pulang ke sarang. Cahaya keemasan jatuh di pucuk padi. Petani menutup pintu gubuk dengan perlahan. Angin membawa aroma tanah basah. Sunyi mulai menyelimuti sawah yang menguning.</p>', question: 'Citraan yang dominan pada puisi tersebut adalah …', options: ['penglihatan', 'pendengaran', 'penciuman', 'pengecapan'], answer: 0, explain: 'Frasa senja jingga menghadirkan warna yang dapat dilihat, sehingga citraannya visual.' },
  { id: 'IND-097', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Rima puisi', level: 'Menantang', type: 'pg', stimulus: '<p>Ibu selalu berdoa, agar anaknya bahagia. Bait itu ditulis untuk lomba baca puisi. Baris pertama diakhiri kata berdoa. Baris kedua diakhiri kata bahagia. Keduanya berakhir dengan bunyi yang sama.</p>', question: 'Bunyi akhir kedua baris tersebut …', options: ['sama sehingga berima', 'berbeda sama sekali', 'tidak ada', 'tidak dapat ditentukan'], answer: 0, explain: 'Berdoa dan bahagia sama-sama berakhiran bunyi a, sehingga berima.' },
  { id: 'IND-098', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Citraan pendengaran', level: 'Dasar', type: 'pg', stimulus: '<p>“Gemericik air mengiringi langkah mereka.” Kalimat itu terdapat dalam cerpen tentang perjalanan ke air terjun. Penulis menggambarkan bunyi air yang kecil dan terus-menerus. Pembaca seolah mendengar suara itu sendiri. Guru meminta siswa menyebutkan indra yang dipakai dalam kalimat tersebut.Kalimat itu membuat pembaca membayangkan suasana di sekitar air terjun.</p>', question: 'Citraan pada kalimat tersebut adalah …', options: ['pendengaran', 'penglihatan', 'penciuman', 'perabaan'], answer: 0, explain: 'Gemericik air adalah bunyi, sehingga citraannya auditif atau pendengaran.' },
  { id: 'IND-099', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Ragam sastra', level: 'Dasar', type: 'pg', stimulus: '', question: 'Kutipan yang termasuk ragam sastra adalah …', options: ['“Pengumuman: ujian dimulai pukul 07.30.”', '“Bulan tersenyum di balik awan malam.”', '“Diskon 30% untuk semua buku.”', '“Rapat dimulai pukul 09.00 di aula.”'], answer: 1, explain: 'Kalimat bulan tersenyum memakai bahasa figuratif, ciri ragam sastra. Pilihan lain bersifat informatif.' },
  { id: 'IND-100', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Menilai kelebihan teks', level: 'Sedang', type: 'pg', stimulus: '<p>Teh hijau mengandung antioksidan. Sebuah penelitian pada 200 responden menunjukkan konsumsi rutin teh hijau membantu menjaga kesehatan jantung. Jumlah responden dan hasilnya disebutkan dengan jelas. Penulis juga tidak mengklaim bahwa teh hijau menyembuhkan penyakit. Bagian akhir teks menyarankan konsultasi dengan tenaga kesehatan.</p>', question: 'Kelebihan teks tersebut adalah …', options: ['Menyertakan data penelitian sebagai bukti.', 'Tidak memiliki alasan.', 'Hanya berisi opini.', 'Menggunakan kalimat berbelit.'], answer: 0, explain: 'Teks menyebut jumlah responden dan hasil penelitian, sehingga klaimnya didukung bukti.' },
  { id: 'IND-101', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Kelemahan argumentasi', level: 'Menantang', type: 'multi', stimulus: '<p>Semua orang pasti suka pelajaran olahraga. Pelajaran itu menyenangkan dan tidak perlu alasan. Penulis tidak menyebut data siswa yang menyukai olahraga. Kata pasti dipakai tanpa bukti apa pun. Alasan yang diberikan juga terlalu umum.</p>', question: 'Kelemahan teks tersebut adalah …', options: ['Menggunakan kata pasti tanpa bukti.', 'Tidak memberikan alasan yang jelas.', 'Kalimatnya terlalu panjang.', 'Tidak ada data pendukung.'], answer: [0, 1, 3], explain: 'Teks memakai generalisasi, tanpa data, dan alasannya tidak jelas. Kalimatnya pendek, jadi pilihan ketiga bukan kelemahan.' },
  { id: 'IND-102', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Fakta dan opini', level: 'Sedang', type: 'table', stimulus: '', question: 'Tentukan fakta atau opini untuk setiap pernyataan berikut!', cols: ['Fakta', 'Opini'], rows: [{ t: 'Indonesia memiliki lebih dari 17.000 pulau.', a: 0 }, { t: 'Film itu sangat membosankan.', a: 1 }, { t: 'Air mendidih pada 100 °C di tekanan normal.', a: 0 }], explain: 'Jumlah pulau dan titik didih air dapat diperiksa. Penilaian membosankan adalah opini.' },
  { id: 'IND-103', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Menilai sumber informasi', level: 'Sedang', type: 'pg', stimulus: '', question: 'Sumber paling tepat untuk data prakiraan cuaca adalah …', options: ['lembar komik', 'situs resmi meteorologi', 'iklan minuman', 'cerpen'], answer: 1, explain: 'Data cuaca sebaiknya diambil dari lembaga meteorologi resmi yang memiliki data terukur.' },
  { id: 'IND-104', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Pesan moral fabel', level: 'Sedang', type: 'pg', stimulus: '<p>Semut bekerja keras sepanjang musim panas. Ia mengumpulkan biji-bijian sedikit demi sedikit. Ketika musim dingin datang, ia tidak kelaparan. Belalang yang hanya bersenang-senang datang meminta bantuan. Semut membagi makanannya sambil mengingatkan pentingnya menyiapkan diri.</p>', question: 'Pesan moral fabel tersebut adalah …', options: ['Bekerja keras memberi manfaat di kemudian hari.', 'Bersenang-senang selalu salah.', 'Semut lebih kuat daripada belalang.', 'Musim dingin tidak perlu dipersiapkan.'], answer: 0, explain: 'Semut yang menyiapkan diri tidak kelaparan, sedangkan belalang yang bersenang-senang kesulitan.' },
  { id: 'IND-105', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Memilih judul yang sesuai', level: 'Dasar', type: 'pg', stimulus: '<p>Isi teks membahas cara menghemat listrik di rumah, mulai dari mematikan lampu hingga memilih alat elektronik hemat energi. Penulis juga menyarankan mencabut pengisi daya yang tidak dipakai. Contoh perhitungan tagihan disertakan di bagian akhir. Semua saran ditulis dengan bahasa yang mudah dipraktikkan. Teks ditutup dengan ajakan mencoba satu kebiasaan baru setiap pekan.</p>', question: 'Judul yang paling sesuai adalah …', options: ['“Cara Menghemat Listrik di Rumah”', '“Sejarah Lampu Gas”', '“Harga Alat Elektronik”', '“Wisata Pantai”'], answer: 0, explain: 'Judul harus mencerminkan isi teks, yaitu cara menghemat listrik di rumah.' },
  { id: 'IND-106', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Kata baku', level: 'Dasar', type: 'pg', stimulus: '<p>Kegiatan <b>praktek</b> di laboratorium dimulai pukul 08.00. Siswa dibagi menjadi enam kelompok. Setiap kelompok mendapat satu meja kerja dan alat tulis. Guru mendampingi kelompok yang kesulitan memakai mikroskop. Kegiatan berakhir pukul 10.00.</p>', question: 'Kata baku untuk kata bercetak tebal adalah …', options: ['praktik', 'praktekan', 'peraktik', 'praktis'], answer: 0, explain: 'Bentuk baku menurut KBBI adalah praktik, bukan praktek.' },
  { id: 'IND-107', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Kalimat efektif', level: 'Sedang', type: 'pg', stimulus: '', question: 'Kalimat yang paling efektif adalah …', options: ['“Para siswa-siswa berkumpul di lapangan.”', '“Para siswa berkumpul di lapangan.”', '“Siswa-siswa para berkumpul di lapangan.”', '“Di lapangan para berkumpul siswa-siswa.”'], answer: 1, explain: 'Kata para sudah bermakna jamak, sehingga tidak perlu digabung dengan siswa-siswa.' },
  { id: 'IND-108', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Menilai simpulan', level: 'Menantang', type: 'pg', stimulus: '<p>Dari dua siswa yang diwawancarai, keduanya gemar membaca. Penulis menyimpulkan semua siswa di sekolah gemar membaca. Jumlah siswa di sekolah itu lebih dari enam ratus orang. Dua orang jelas belum mewakili seluruh siswa. Simpulan sebaiknya menyebut jumlah responden yang diwawancarai.</p>', question: 'Kelemahan simpulan tersebut adalah …', options: ['Simpulan terlalu umum untuk data yang sedikit.', 'Simpulan memakai terlalu banyak data.', 'Simpulan tidak berhubungan dengan membaca.', 'Simpulan didukung penelitian besar.'], answer: 0, explain: 'Dua siswa tidak mewakili seluruh sekolah, sehingga simpulannya terlalu umum.' },
  { id: 'IND-109', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Majas ironi', level: 'Menantang', type: 'pg', stimulus: '<p>“Rajin sekali, baru datang pukul sepuluh pagi.” Kalimat itu diucapkan ketua kelas kepada temannya. Maknanya justru mengejek kebiasaan terlambat. Guru menjelaskan bahwa sindiran seperti ini disebut ironi. Siswa diminta mencari contoh lain dalam teks cerita.Siswa mencatat bahwa makna kalimat berbeda dari kata yang dipakai.</p>', question: 'Majas pada kalimat tersebut adalah …', options: ['ironi', 'hiperbola', 'personifikasi', 'metafora'], answer: 0, explain: 'Ironi menyatakan kebalikan dari maksud sebenarnya untuk menyindir.' },
  { id: 'IND-110', subject: 'ind', bab: 'Evaluasi dan Apresiasi Teks', title: 'Nilai moral cerita', level: 'Sedang', type: 'multi', stimulus: '<p>Sinta menemukan uang di kelas. Uang itu tergeletak di bawah meja guru. Ia menyerahkannya kepada guru meski sedang membutuhkan uang untuk membeli buku. Temannya menyarankan agar uang itu dipakai dulu. Sinta tetap memilih menyerahkan uang tersebut.</p>', question: 'Nilai moral yang sesuai dengan cerita tersebut adalah …', options: ['Kejujuran lebih penting daripada kebutuhan pribadi.', 'Uang yang ditemukan boleh diambil.', 'Menyerahkan barang temuan adalah sikap jujur.', 'Membeli buku tidak penting.'], answer: [0, 2], explain: 'Sinta memilih jujur meski membutuhkan uang, sehingga cerita menekankan kejujuran dan menyerahkan barang temuan.' }
];

window.SOAL = SOAL;
window.TOPICS = TOPICS;
