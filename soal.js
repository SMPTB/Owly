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
    stimulus: '<p>Meskipun sering kalah di babak awal, Rani tetap <b>gigih</b> berlatih bulu tangkis setiap sore hingga akhirnya menjuarai turnamen antarsekolah.</p>',
    question: 'Makna kata <i>gigih</i> pada kalimat tersebut adalah …',
    options: ['mudah menyerah', 'tekun dan pantang menyerah', 'suka berlatih sendirian', 'cepat puas dengan hasil'],
    answer: 1,
    explain: 'Dari konteks kalimat, Rani terus berlatih meskipun sering kalah. Hal itu menunjukkan sikap tekun dan pantang menyerah.'
  },
  {
    id: 'IND-003', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Menemukan informasi tersurat',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Perpustakaan keliling <b>Pustaka Jaya</b> melayani warga Desa Sukamaju setiap Selasa dan Kamis pukul 08.00–11.00 di lapangan desa. Peminjam wajib membawa kartu anggota. Buku dapat dipinjam paling lama dua pekan.</p>',
    question: 'Informasi yang <b>tidak</b> terdapat dalam teks adalah …',
    options: ['hari layanan', 'tempat layanan', 'jumlah koleksi buku', 'lama peminjaman'],
    answer: 2,
    explain: 'Hari layanan (Selasa dan Kamis), tempat layanan (lapangan desa), dan lama peminjaman (dua pekan) disebutkan dalam teks. Jumlah koleksi buku tidak disebutkan.'
  },

  /* ================= BAHASA INDONESIA · Bab 2: Pemahaman Inferensial ================= */
  {
    id: 'IND-004', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Ide pokok paragraf',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Tidur yang cukup sangat penting bagi pelajar. Saat tidur, otak merapikan informasi yang dipelajari sepanjang hari. Pelajar yang kurang tidur cenderung sulit berkonsentrasi dan mudah lupa. Karena itu, tidur 8–10 jam setiap malam sebaiknya menjadi kebiasaan.</p>',
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
    stimulus: '<p>Hujan deras mengguyur kota sejak pagi. Saluran air tersumbat sampah sehingga air meluap ke jalan. Akibatnya, banyak kendaraan mogok dan sejumlah siswa terlambat tiba di sekolah.</p>',
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
    stimulus: '<p>Setiap hari Sungai Asri dipenuhi sampah plastik. Ikan-ikan mati karena menelan plastik dan air sungai berbau busuk. Warga yang memakai air sungai untuk mencuci mengeluh gatal-gatal. Padahal, kegiatan bersih sungai baru dilakukan setahun sekali.</p>',
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
    stimulus: '<p>Pisang mengandung kalium yang membantu kerja otot dan karbohidrat sebagai sumber tenaga. Buah ini mudah ditemukan sepanjang tahun. Namun, orang yang memiliki masalah ginjal perlu membatasi konsumsinya.</p>',
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
    stimulus: '<p><b>Opini:</b> Siswa sebaiknya tidak membawa ponsel ke sekolah.</p><p><b>Alasan 1:</b> Ponsel dapat mengganggu konsentrasi saat pelajaran. Survei di sebuah SMP menunjukkan 60% siswa membuka media sosial pada jam belajar.</p><p><b>Alasan 2:</b> Semua siswa pasti menyalahgunakan ponselnya.</p>',
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
    stimulus: '<p>Dina menemukan sebuah dompet berisi uang di bangku taman. Uang itu cukup untuk membeli sepatu baru yang sudah lama ia inginkan. Namun, Dina memilih menyerahkannya kepada petugas taman. Tak lama kemudian, pemiliknya, seorang nenek, datang dan memeluk Dina sambil menangis haru.</p>',
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
    stimulus: '<p>Kantin sekolah harus menjual makanan sehat. Banyak siswa yang mengeluh. Pokoknya kantin harus berubah sekarang juga.</p>',
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
    explain: 'Ada 36 kemungkinan. Jumlah 7 muncul pada (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) — enam kemungkinan, jadi peluangnya 6/36 = 1/6.'
  },

  /* ================= BAHASA INDONESIA · tambahan ================= */
  {
    id: 'IND-013', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Informasi tersurat pada pengumuman',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Pendaftaran kelas menulis kreatif dibuka untuk siswa kelas VII–IX. Kelas berlangsung setiap Sabtu pukul 09.00–11.00 di ruang 12. Peserta cukup membawa buku catatan karena laptop disediakan panitia. Kuota hanya 20 orang.</p>',
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
    stimulus: '<p>Membawa botol minum sendiri terdengar sederhana, tetapi dampaknya besar. Satu botol yang dipakai ulang setiap hari bisa menggantikan ratusan botol plastik sekali pakai dalam setahun. Mulai besok, coba isi botolmu sebelum berangkat sekolah.</p>',
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
    stimulus: '<p>Setiap hari Rina membawa bekal dari rumah. Uang jajannya ia tabung, lalu dipakai membeli buku latihan sendiri. Saat temannya tidak punya alat tulis, Rina sering meminjamkan.</p>',
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
    stimulus: '<p>Hujan turun deras saat bel pulang berbunyi. Bagas melihat Dita kebingungan karena payungnya tertinggal. Tanpa banyak bicara, Bagas menyerahkan payungnya lalu berlari pulang dengan seragam basah. Ibunya sempat kesal, tetapi Bagas hanya tersenyum.</p>',
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
    stimulus: '<p>“Para siswa <b>mempraktekkan</b> gerakan senam di lapangan.”</p>',
    question: 'Kata baku untuk kata bercetak tebal adalah …',
    options: ['mempraktikkan', 'mempraktekan', 'memperaktikkan', 'mempraktikan'],
    answer: 0,
    explain: 'Bentuk baku menurut KBBI adalah “mempraktikkan”, berasal dari kata dasar praktik.'
  },
  {
    id: 'IND-021', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Pesan penulis dalam kutipan',
    level: 'Sedang', type: 'pg',
    stimulus: '<p>“Dua jam belajar tanpa jeda bukan tanda rajin. Otak butuh istirahat singkat untuk mengendapkan yang baru dipelajari.”</p>',
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
    stimulus: '<p>Kantin sekolah mulai memisahkan sampah organik dan anorganik. Sebulan kemudian, sampah yang dibuang ke TPS berkurang sepertiga. Petugas kebersihan mengaku lebih mudah memilah karena sampah sudah terpisah.</p>',
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
    stimulus: '<p>Kegiatan pramuka diadakan setiap Jumat pukul 14.00. Siswa wajib membawa topi dan tali. Kegiatan berakhir pukul 16.30, dan tidak ada kegiatan pengganti jika hujan.</p>',
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
    stimulus: '<p><b>Pendapat:</b> Siswa perlu sarapan sebelum ke sekolah.</p><p><b>Alasan A:</b> Penelitian menunjukkan siswa yang sarapan lebih mampu berkonsentrasi.</p><p><b>Alasan B:</b> Pokoknya sarapan itu penting.</p>',
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
    stimulus: '<p>“Bacalah setiap perintah dengan <b>cermat</b> agar tidak ada langkah yang terlewat.”</p>',
    question: 'Makna kata <i>cermat</i> pada kalimat tersebut adalah …',
    options: ['dengan tergesa-gesa', 'dengan teliti', 'dengan ragu', 'dengan santai'],
    answer: 1,
    explain: 'Konteksnya meminta agar tidak ada langkah yang terlewat, sehingga cermat berarti teliti atau hati-hati.'
  },
  {
    id: 'IND-027', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Menemukan batas waktu pada teks',
    level: 'Dasar', type: 'pg',
    stimulus: '<p>Pendaftaran lomba poster dibuka 3–7 Agustus. Karya dikumpulkan paling lambat 10 Agustus di ruang OSIS. Pemenang diumumkan saat upacara 17 Agustus.</p>',
    question: 'Karya poster paling lambat dikumpulkan pada …',
    options: ['3 Agustus', '7 Agustus', '10 Agustus', '17 Agustus'],
    answer: 2,
    explain: 'Teks menyebut karya dikumpulkan paling lambat 10 Agustus. Tanggal 3–7 Agustus adalah masa pendaftaran, sedangkan 17 Agustus adalah pengumuman pemenang.'
  },
  {
    id: 'IND-028', subject: 'ind', bab: 'Pemahaman Tekstual (Literal)', title: 'Kesesuaian informasi pada teks',
    level: 'Sedang', type: 'table',
    stimulus: '<p>Perpustakaan sekolah buka Senin–Jumat pukul 07.00–15.00. Pada Sabtu dan Minggu perpustakaan tutup. Buku yang terlambat dikembalikan dikenai denda Rp500 per hari.</p>',
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
    stimulus: '<p>Menulis jurnal sebelum tidur membantu pelajar mengenali perasaannya. Saat menulis, mereka belajar memilih kata untuk hal yang sulit dijelaskan. Kebiasaan ini juga membuat pikiran lebih tenang sehingga tidur menjadi lebih nyenyak.</p>',
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
    stimulus: '<p>Alya menunda mendaftar lomba sampai hari terakhir. Ia membaca ulang syarat lomba tiga kali. Saat mengumpulkan formulir, tangannya gemetar, tetapi ia tetap melangkah ke meja panitia.</p>',
    question: 'Sikap Alya yang dapat disimpulkan dari teks tersebut adalah …',
    options: [
      'Alya yakin sepenuhnya pada kemampuannya.',
      'Alya ragu dan gugup, tetapi tetap berusaha.',
      'Alya tidak berminat mengikuti lomba.',
      'Alya mengandalkan bantuan panitia.'
    ],
    answer: 1,
    explain: 'Alya menunda, membaca syarat berulang, dan tangannya gemetar — tanda ragu dan gugup. Namun ia tetap mengumpulkan formulir, jadi ia tetap berusaha.'
  },
  {
    id: 'IND-031', subject: 'ind', bab: 'Pemahaman Inferensial', title: 'Simpulan yang didukung data',
    level: 'Sedang', type: 'multi',
    stimulus: '<p>Sejak sekolah menyediakan rak sepeda yang aman, siswa yang bersepeda ke sekolah naik dari 40 menjadi 60 orang dalam tiga bulan. Guru juga melaporkan kemacetan di gerbang berkurang.</p>',
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
    stimulus: '<p>Semua siswa wajib mengikuti ekstrakurikuler. Pasti semua setuju karena kegiatan itu bagus.</p>',
    question: 'Kelemahan paragraf tersebut adalah …',
    options: [
      'Menggeneralisasi dengan kata “semua” dan “pasti”.',
      'Tidak menyertakan data atau bukti pendukung.',
      'Kalimatnya terlalu panjang dan berbelit.',
      'Alasannya terlalu umum, yaitu “kegiatan itu bagus”.'
    ],
    answer: [0, 1, 3],
    explain: 'Paragraf memakai kata “semua” dan “pasti” tanpa bukti, tidak menyertakan data, dan alasannya terlalu umum. Kalimatnya justru pendek, jadi pilihan ketiga bukan kelemahan.'
  }
];

window.SOAL = SOAL;
window.TOPICS = TOPICS;
