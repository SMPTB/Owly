/* =========================================================
   soal-tka.js — NASKAH SOAL TKA DARI SEKOLAH
   Empat naskah asli, disimpan terpisah dari bank soal latihan
   (soal.js) supaya tidak tercampur dengan soal buatan Ωwly.

   Aturan penyimpanan:
   - Urutan soal sama persis dengan naskah asli (tidak diacak).
   - Jenis jawaban: pg (satu jawaban), multi (lebih dari satu),
     table (tabel pernyataan dengan dua kolom).
   - Naskah asli berisi 20 soal. Kekurangannya dilengkapi soal
     bergaya TKA sampai 30 soal (Bahasa Indonesia) atau 25 soal
     (Matematika). Soal tambahan diberi tanda pada "catatan".
   - Beberapa soal pada naskah Matematika aslinya berupa gambar.
     Bagian itu dituliskan sebagai teks agar tetap bisa dikerjakan.
   ========================================================= */

const SOAL_TKA = [

/* ================================================================
   NASKAH 1 · PEMANTAPAN TKA — LITERASI PERIODE 1 (Bahasa Indonesia)
   ================================================================ */
{
  id: 'pemantapan-ind',
  nama: 'Pemantapan TKA · Literasi Periode 1',
  subject: 'ind',
  tanggal: 'Selasa, 27 Oktober 2026',
  asal: 'SMP Taruna Bakti Bandung',
  catatan: 'Naskah asli, urutan tidak diacak. Soal 21–30 ditambahkan bergaya TKA untuk melengkapi 30 soal.',
  soal: [
    {
      n: 1, type: 'table', cols: ['Sesuai', 'Tidak Sesuai'],
      stimulus: `<p>Kondisi lingkungan perkotaan Yogyakarta menghadapi tekanan signifikan akibat urbanisasi pesat, pertumbuhan populasi, dan keterbatasan lahan. Isu paling mendesak adalah pengelolaan sampah, yang telah mencapai tahap "darurat sampah" sejak penutupan permanen Tempat Pemrosesan Akhir (TPA) Piyungan. Kota ini menghasilkan sekitar 300 ton sampah per hari, melebihi kapasitas penanganan lokal, yang menyebabkan penumpukan sampah liar. Pemerintah kota berupaya mengatasi ini melalui pelarangan plastik sekali pakai dan mengoptimalkan pengolahan sampah dari sumbernya, tetapi tantangan logistik tetap besar.</p>
        <p>Selain sampah, masalah lingkungan lain yang menonjol adalah kualitas udara dan minimnya Ruang Terbuka Hijau (RTH). Tingkat polusi udara sering berada dalam kategori sedang karena padatnya aktivitas kendaraan bermotor. Di sisi lain, realisasi RTH publik di Yogyakarta baru mencapai sekitar 2,6 juta m², sangat jauh dari target minimal 30% yang diamanatkan undang-undang. Keterbatasan lahan menjadi penghalang utama dalam penyediaan ruang hijau yang diperlukan untuk menjaga keseimbangan ekologis kota.</p>`,
      question: 'Tentukan kesesuaian pernyataan berikut dengan isi teks tersebut!',
      rows: [
        { t: 'Penyediaan ruang terbuka hijau terkendala lahan yang terbatas.', a: 0 },
        { t: 'Kapasitas penanganan lokal mampu mengatasi masalah sampah.', a: 1 },
        { t: 'Urbanisasi dan pertumbuhan penduduk menyebabkan masalah lingkungan.', a: 0 }
      ],
      explain: 'RTH terhambat keterbatasan lahan (sesuai). Sampah 300 ton per hari melebihi kapasitas penanganan lokal (tidak sesuai). Urbanisasi dan pertumbuhan penduduk disebut sebagai penyebab tekanan lingkungan (sesuai).',
      tambahan: false
    },
    {
      n: 2, type: 'pg',
      stimulus: '<p>Bacalah kembali teks tentang kondisi lingkungan perkotaan Yogyakarta pada soal nomor 1.</p>',
      question: 'Gagasan pendukung paragraf pertama yang sesuai adalah ...',
      options: [
        'Realisasi RTH publik baru mencapai 2,6 juta m².',
        'Penumpukan sampah liar diakibatkan tingginya produksi sampah yang melebihi kapasitas penanganan lokal.',
        'Tingkat polusi udara sering berada dalam kategori sedang.',
        'Ketersediaan lahan yang semakin berkurang diakibatkan oleh banyaknya ruang terbuka hijau.'
      ],
      answer: 1,
      explain: 'Paragraf pertama membahas sampah: produksi 300 ton per hari melebihi kapasitas sehingga sampah menumpuk liar. Pilihan lain berasal dari paragraf kedua atau berisi hubungan sebab-akibat yang terbalik.',
      tambahan: false
    },
    {
      n: 3, type: 'multi',
      stimulus: `<h4>Cara Membuat Konten YouTube Shorts</h4>
        <p>YouTube Shorts merupakan fitur YouTube yang memungkinkan pengguna membagikan video pendek berdurasi singkat. Konten ini banyak diminati karena mudah dibuat, menarik, dan cepat menjangkau penonton. Oleh karena itu, diperlukan pemahaman yang tepat mengenai langkah-langkah pembuatannya agar hasil video sesuai dengan ketentuan.</p>
        <p><b>Langkah-langkah</b></p>
        <ol>
          <li>Pastikan Anda telah memiliki akun YouTube yang aktif dan aplikasi YouTube telah terpasang di perangkat yang digunakan.</li>
          <li>Siapkan ide atau konsep video yang akan dibuat agar isi konten lebih terarah dan mudah dipahami penonton.</li>
          <li>Rekam video menggunakan kamera ponsel dengan posisi vertikal atau rasio 9:16.</li>
          <li>Pastikan durasi video tidak lebih dari 60 detik agar sesuai dengan ketentuan YouTube Shorts.</li>
          <li>Setelah merekam, buka aplikasi YouTube di ponsel yang digunakan.</li>
          <li>Tekan ikon tanda tambah (+) yang berada di bagian bawah layar.</li>
          <li>Pilih menu Buat Short atau Upload video sesuai kebutuhan.</li>
          <li>Jika memilih unggah video, pastikan kembali format video sudah vertikal.</li>
          <li>Tambahkan judul yang menarik dan relevan dengan isi video agar penonton tertarik.</li>
          <li>Sertakan tagar #Shorts pada judul atau deskripsi agar video terdeteksi sebagai YouTube Shorts.</li>
          <li>Atur audiens video menjadi privat, kemudian pilih untuk anak-anak atau umum, sesuai sasaran penonton.</li>
          <li>Periksa kembali seluruh bagian video sebelum dipublikasikan.</li>
          <li>Tekan tombol Upload untuk mengunggah video ke YouTube.</li>
          <li>Tunggu hingga proses unggahan selesai dengan sempurna.</li>
          <li>Setelah proses selesai, YouTube Shorts siap ditonton oleh pengguna lain.</li>
        </ol>
        <p>Dengan mengikuti langkah-langkah tersebut secara berurutan, siapa pun dapat membuat dan membagikan konten YouTube Shorts secara mudah, aman, dan praktis. (Sumber: support.google.com/youtube)</p>`,
      question: 'Istilah media sosial yang terdapat pada teks tersebut adalah ...',
      options: ['upload', 'relevan', 'konsep', 'Audiens'],
      answer: [0, 3],
      explain: '“Upload” dan “audiens” adalah istilah yang lazim dipakai dalam media sosial. “Relevan” dan “konsep” adalah kosakata umum, bukan istilah media sosial.',
      tambahan: false
    },
    {
      n: 4, type: 'multi',
      stimulus: `<h4>Saatnya Para Pelari Bercerita</h4>
        <p>Pelari di Tangerang 10K tidak hanya berlomba. Sekitar 2.500 peserta juga akan melintasi titik-titik menarik di Kota Tangerang. Dengan berlari, mereka berbagi cerita tentang apa saja, mulai dari ambisi berdiri di podium hingga harapan tentang kota yang terus bertumbuh. Aneka kisah itu dituangkan dalam Tangerang 10K, ajang lari yang bakal diikuti 2.500 peserta dari berbagai daerah, Minggu (7/12/2025).</p>
        <p>Antusiasme pelari untuk berbagi cerita itu tampak saat pengambilan race pack Tangerang 10K di Pasific Garden, Kota Tangerang, Banten, Sabtu (6/12). Sejak pukul 10.00 WIB, para peserta bergantian menuliskan pesan hingga harapan di papan "Whats your running story?".</p>
        <p>Beberapa tulisan itu mengandung harapan, seperti "semoga podium ya" atau "wong mbatu (orang Batu) ke Tangerang 10K, podium yuk". Ada juga yang lucu, seperti "lari pagi itu sehat, lari dari kenyataan itu tidak sehat, jujurly (jujur), aku mls (malas) sekali lari, tp (tapi) okelah".</p>
        <p>Meskipun beragam, berbagai coretan itu menunjukkan antusiasme pelari mengikuti ajang yang digelar Pemerintah Kota Tangerang bersama harian Kompas (Kompas.id) dan Bank BJB.</p>
        <p>Joliansyah (24) dan Wandi Agustian (25), misalnya, sengaja terbang dari Belitung Timur, Bangka Belitung, Jumat (5/12). "Sebenarnya kami bertiga, tetapi yang satu lagi baru berangkat hari ini. Makanya, race pack-nya saya ambilkan," ucap Joliansyah yang menenteng dua tas race pack berisi jersei, nomor BIB atau nomor dada, dan produk pendukung lainnya. Demi Tangerang 10K, ia juga menyewa penginapan setempat. (Kompas, 7 Desember 2025, dengan penyesuaian)</p>`,
      question: 'Pernyataan yang sesuai dengan isi teks berita di atas adalah ...',
      options: [
        'Jumlah pelari yang mengikuti Tangerang 10K sekitar 2.500 dan berasal dari berbagai daerah dan negara.',
        'Tangerang 10K dilaksanakan pada hari Minggu, 7 Desember 2025 di Pasific Garden, Kota Tangerang, Banten.',
        'Penyelenggara Tangerang 10K adalah Pemerintah Kota Tangerang bersama harian Kompas (Kompas.id) dan Bank BJB.',
        'Para peserta Tangerang 10K menuliskan pesan hingga harapan di papan "Whats your running story?".'
      ],
      answer: [2, 3],
      explain: 'Teks menyebut peserta berasal dari berbagai daerah (bukan negara) dan Pasific Garden adalah tempat pengambilan race pack, bukan lokasi lomba. Pernyataan tentang penyelenggara (Pemkot, Kompas, Bank BJB) dan papan cerita sesuai teks.',
      tambahan: false
    },
    {
      n: 5, type: 'multi',
      stimulus: '<p>Bacalah kembali teks berita tentang Tangerang 10K pada soal nomor 4.</p>',
      question: 'Berdasarkan teks berita di atas, hal yang dapat dilakukan pihak-pihak nonpemerintah untuk menggiatkan olahraga di masyarakat adalah ...',
      options: [
        'melakukan kegiatan olahraga yang menguntungkan secara finansial',
        'mendirikan kelompok-kelompok olahraga yang berbiaya murah atau gratis',
        'menjadi sponsor penyelenggaraan kegiatan olahraga yang bersifat massal',
        'melaksanakan kegiatan olahraga jika didanai oleh pemerintah'
      ],
      answer: [1, 2],
      explain: 'Pihak nonpemerintah dapat membuka akses olahraga lewat kelompok murah/gratis dan menjadi sponsor acara massal. Menjadikan olahraga alat mencari untung atau menunggu dana pemerintah tidak menggiatkan partisipasi.',
      tambahan: false
    },
    {
      n: 6, type: 'pg',
      stimulus: '<p>Bacalah kembali teks berita tentang Tangerang 10K pada soal nomor 4.</p>',
      question: 'Berdasarkan teks berita di atas, apa yang membuat teks tersebut belum memuat unsur-unsur berita secara lengkap?',
      options: [
        'Teks tersebut belum memuat peristiwa apa yang diberitakan.',
        'Tempat pelaksanaan kegiatan belum dibahas dalam teks tersebut.',
        'Teks tersebut belum menjelaskan siapa saja yang terlibat dalam peristiwa.',
        'Alasan penyelenggaraan kegiatan belum disampaikan dalam teks tersebut.'
      ],
      answer: 3,
      explain: 'Peristiwa, tempat, dan tokoh sudah ada. Yang belum dijelaskan adalah alasan atau latar belakang mengapa Tangerang 10K digelar.',
      tambahan: false
    },
    {
      n: 7, type: 'pg',
      stimulus: `<p>Bencana banjir bandang dan tanah longsor yang melanda Sumatra Barat, Sumatra Utara dan Aceh pada akhir November lalu terjadi karena beberapa penyebab seperti curah hujan tinggi. Namun juga ada alasan lain yakni kerusakan ekosistem hutan di hulu Daerah Aliran Sungai (DAS) karena deforestasi.</p>
        <p>Menurut Peneliti Hidrologi Hutan dan Konservasi DAS UGM, Hatma Suryatmojo, hutan di wilayah DAS memiliki peranan seperti penyangga hidrologis. Ini bisa menjadi spons untuk menyerap air hujan ke dalam tanah, seraya menahannya untuk tidak langsung masuk ke sungai.</p>
        <p>Dari hasil berbagai penelitian di hutan tropis alami Kalimantan dan Sumatera, kemampuan hutan di wilayah tersebut menahan dan menampung air hujan di tajuk mencapai 15-35% dari hujan. Dengan permukaan tanah yang tidak terganggu bisa memasukkan air ke dalam tanah mencapai 55%, jadi limpasan permukaan ke badan sungai hanya 10-20% saja. Sementara itu, kemampuan hutan mengembalikan air ke atmosfer lewat proses evapotranspirasi mencapai 25 hingga 40 persen dari total hujan. (cnbcindonesia.com)</p>`,
      question: 'Berdasarkan teks tersebut yang dapat menjadi spons untuk menyerap air ke dalam tanah seraya menahan untuk tidak langsung masuk ke sungai menunjuk pada ...',
      options: [
        'hutan di wilayah DAS',
        'hutan tropis Kalimantan',
        'hutan tropis Sumatera',
        'hutan hasil deforestasi'
      ],
      answer: 0,
      explain: 'Kalimat “hutan di wilayah DAS memiliki peranan seperti penyangga hidrologis … bisa menjadi spons” menjadi rujukan langsung jawaban.',
      tambahan: false
    },
    {
      n: 8, type: 'pg',
      stimulus: '<p>Bacalah kembali teks tentang banjir bandang dan kerusakan DAS pada soal nomor 7.</p>',
      question: 'Tindakan yang tepat bagi kita untuk mencegah peristiwa tersebut terulang adalah ...',
      options: [
        'mencintai lingkungan dengan berperan serta pada kegiatan pelestarian lingkungan.',
        'mengusulkan pada yang berwenang untuk menghukum pelaku deforestasi hutan.',
        'mendukung agar pembelajaran terkait lingkungan hidup termuat pada kurikulum.',
        'merancang undang-undang tentang pentingnya menjaga ekosistem hutan.'
      ],
      answer: 0,
      explain: 'Tindakan yang bisa langsung dilakukan pelajar adalah ikut serta dalam kegiatan pelestarian lingkungan. Pilihan lain berupa kebijakan yang bukan kewenangan kita sehari-hari.',
      tambahan: false
    },
    {
      n: 9, type: 'pg',
      stimulus: '<p>"Nada, minggu depan kita harus pindah ke Jogjakarta. Ayah dipindahtugaskan di sana." Bagaikan petir di siang bolong menyambar Nada yang seketika itu langsung diam mematung.</p>',
      question: 'Makna simbol petir di siang bolong pada kutipan cerpen tersebut adalah ...',
      options: ['merasa sedih', 'merasa bingung', 'sangat terkejut', 'merasa heran'],
      answer: 2,
      explain: 'Ungkapan “petir di siang bolong” menggambarkan kabar yang datang tiba-tiba dan mengejutkan, diperkuat oleh reaksi Nada yang diam mematung.',
      tambahan: false
    },
    {
      n: 10, type: 'table', cols: ['Benar', 'Salah'],
      stimulus: `<h4>Film Na Willa: Mengungkap Cerita di Balik Keindahan</h4>
        <p>Film Na Willa menjadi sorotan karena memadukan alur drama yang emosional dengan sinematografi yang kuat. Ceritanya berpusat pada Willa, seorang wanita muda yang berjuang menghadapi berbagai kesulitan hidup sambil mencari jati diri dan tujuan. Perjalanan Willa memperlihatkan konflik batin, keberanian, keraguan, serta ketekunan untuk tetap melangkah meskipun penuh ketidakpastian.</p>
        <p>Kekuatan film ini terletak pada visual yang tertata rapi, permainan warna dan cahaya yang membangun suasana, serta musik yang menyatu dengan emosi setiap adegan. Karakter pendukung - keluarga, teman, hingga antagonis - menambah lapisan konflik dan dinamika cerita.</p>
        <p>Akting para pemain, terutama pemeran Willa, terasa autentik dan natural. Penyutradaraan yang detail membuat setiap adegan memiliki makna, menghadirkan ketegangan, kehangatan, dan refleksi personal. Tema utama film ini adalah pencarian jati diri serta keteguhan hati menghadapi tantangan hidup, disertai pesan tentang arti hubungan manusia: dukungan, kasih sayang, dan konflik yang membentuk karakter.</p>
        <p>Dengan narasi yang mendalam, tak mudah ditebak, dan kaya emosi, Na Willa bukan hanya hiburan, tetapi pengalaman yang menginspirasi dan relevan dengan kehidupan nyata. (tradisifilm.com)</p>`,
      question: 'Tentukan kebenaran opini penulis berikut berdasarkan teks tersebut!',
      rows: [
        { t: 'Film Na Willa menjadi sorotan karena memadukan alur drama yang emosional dengan sinematografi yang kuat.', a: 0 },
        { t: 'Akting para pemain, terutama pemeran Willa, terasa autentik dan natural.', a: 0 },
        { t: 'Tokoh utamanya bernama Willa, seorang wanita muda yang berjuang menghadapi berbagai kesulitan hidup.', a: 0 }
      ],
      explain: 'Ketiga pernyataan adalah pendapat penulis yang dinyatakan langsung di dalam teks ulasan, sehingga ketiganya benar menurut teks.',
      tambahan: false
    },
    {
      n: 11, type: 'pg',
      stimulus: '<p>Bacalah kembali teks ulasan film Na Willa pada soal nomor 10.</p>',
      question: 'Simpulan paling akurat yang merangkum keseluruhan teks adalah ...',
      options: [
        'Na Willa menekankan konflik batin tokoh utama sehingga aspek lain menjadi kurang menonjol.',
        'Na Willa menggabungkan unsur cerita, visual, musik, dan akting untuk menghadirkan pengalaman menonton yang bermakna.',
        'Na Willa terutama ingin menunjukkan pentingnya karakter pendukung dalam membangun alur cerita.',
        'Na Willa berhasil karena sutradaranya fokus pada sinematografi dan mengabaikan emosi tokoh.'
      ],
      answer: 1,
      explain: 'Teks memuji cerita, visual, musik, dan akting secara seimbang, lalu menyebut film ini sebagai pengalaman yang menginspirasi.',
      tambahan: false
    },
    {
      n: 12, type: 'pg',
      stimulus: '<p>Bacalah kembali teks ulasan film Na Willa pada soal nomor 10.</p>',
      question: 'Alasan yang paling tepat mengapa judul tersebut sesuai dengan isi teks adalah ...',
      options: [
        'Karena film Na Willa hanya menampilkan keindahan visual dan kurang mementingkan karakter cerita tokohnya.',
        'Karena teks menjelaskan bahwa penonton lebih memperhatikan keindahan musik dibandingkan rangkaian ceritanya.',
        'Karena teks menunjukkan bahwa di balik sinematografi yang indah terdapat konflik, pesan moral, dan perjalanan tokoh yang penuh makna.',
        'Karena judul ingin menegaskan bahwa sebuah film drama selalu menyajikan keindahan sinematografi dan sekaligus menginspirasi.'
      ],
      answer: 2,
      explain: 'Judul “Mengungkap Cerita di Balik Keindahan” sejalan dengan isi: keindahan visual menyimpan konflik batin, pesan moral, dan perjalanan tokoh.',
      tambahan: false
    },
    {
      n: 13, type: 'table', cols: ['Sesuai', 'Tidak Sesuai'],
      stimulus: `<h4>Cahaya di Tengah Puing-Puing</h4>
        <p>Di sebuah kota kecil yang dikelilingi oleh pegunungan hijau, tinggallah seorang anak bernama Maya. Maya adalah gadis yang sangat peduli terhadap lingkungan sekitarnya. Ia selalu terpesona oleh keindahan alam sekitar dan berusaha keras untuk menjaga kebersihan dan keindahan kota tempat tinggalnya.</p>
        <p>Suatu hari, kota mereka dilanda badai besar. Angin kencang dan hujan deras merobohkan pohon-pohon dan merusak banyak bangunan di sekitar. Setelah badai mereda, Maya melihat banyaknya sampah dan puing-puing yang tersebar di mana-mana.</p>
        <p>Tak lama setelah badai, Maya bersama teman-temannya memutuskan untuk melakukan aksi bersih-bersih. Dengan semangat yang tinggi, mereka mengumpulkan sampah-sampah dan merapikan puing-puing yang berserakan.</p>
        <p>Saat mereka membersihkan lingkungan, Maya menyadari betapa pentingnya menjaga alam. Ia mengajak teman-temannya untuk membuat kotak-kotak sampah di berbagai sudut kota, memasang spanduk tentang pentingnya daur ulang.</p>`,
      question: 'Tentukan sesuai atau tidak sesuai terkait peristiwa yang mungkin terjadi dari cerita tersebut!',
      rows: [
        { t: 'Banyak warga yang mengikuti kegiatan peduli lingkungan yang dilakukan Maya dan teman-temannya.', a: 0 },
        { t: 'Maya diusir dari kota tersebut karena membuat repot warga yang masih dilanda kesusahan.', a: 1 },
        { t: 'Maya mendapatkan apresiasi dari warga karena upayanya dalam peduli lingkungan.', a: 0 }
      ],
      explain: 'Maya mengajak warga menjaga lingkungan, sehingga dukungan warga wajar terjadi. Pengusiran bertentangan dengan watak dan isi cerita.',
      tambahan: false
    },
    {
      n: 14, type: 'pg',
      stimulus: `<p>(1) Awan warna-warni adalah fenomena optik atmosfer yang dapat Anda amati warna-warna cerah dan berubah pada awan tertentu. (2) Awan warna warni tak kalah indahnya dengan penampakan pelangi selepas hujan. (3) Namun, berbeda dengan pelangi yang merupakan hasil pembiasan cahaya pada titik-titik air hujan, awan warna-warni terbentuk karena adanya difraksi dan gangguan cahaya ketika melewati partikel kecil air atau kristal es. (4) Fenomena ini terjadi terutama di awan Altocumulus, Cirrocumulus dan Cirrostratus, yang halus dan terdiri dari tetesan air atau kristal es yang sangat kecil. (5) Agar warna-warni dapat terjadi, partikel awan harus memiliki ukuran serupa yang memungkinkan cahaya menyebar secara merata.</p>`,
      question: 'Kalimat yang menyatakan hubungan pertentangan dan penggabungan ditunjukkan nomor ...',
      options: ['1 dan 2', '2 dan 3', '3 dan 4', '4 dan 5'],
      answer: 2,
      explain: 'Kalimat (3) memakai “Namun” sebagai penanda pertentangan, sedangkan kalimat (4) memakai “dan” untuk menggabungkan beberapa unsur.',
      tambahan: false
    },
    {
      n: 15, type: 'pg',
      stimulus: `<p><b>Teks I</b><br>Laki-laki itu berusia setengah baya. Perawakannya tidak terlalu tinggi juga tidak terlalu pendek. Sedang-sedang saja. Kulitnya seperti rata-rata kulit orang Indonesia, sawo matang. Wajahnya biasa, tidak terlalu ganteng, berambut biasa, berbaju dan bercelana biasa, mengenakan sepatu yang juga biasa-biasa saja. Tapi, ada satu yang luar biasa, sinar matanya. Ya, sinar matanya tajam, tapi meneduhkan.</p>
        <p><b>Teks II</b><br>Malam makin larut. Embusan sang bayu terasa dingin menyentuh kulit. Rembulan tampak bersinar lembut dalam dekapan kelam awan malam. Jeritan binatang malam seakan tengah memainkan sonata. Melahirkan irama lembut yang menggelayut hingga melengking nyaring. Namun, malam ini terasa suram. Suram dalam dekapan nada sendu. Segalanya tampak hitam. Sunyi menyelimuti hati. Duka merasuki jiwa.</p>`,
      question: 'Perbedaan pola pengembangan kedua kutipan teks tersebut adalah melalui ...',
      options: [
        'urutan tokoh / urutan waktu',
        'urutan karakter tokoh / urutan peristiwa',
        'pengenalan fisik / pengenalan latar suasana',
        'pengenalan karakter tokoh / pengenalan latar waktu'
      ],
      answer: 2,
      explain: 'Teks I menguraikan ciri fisik tokoh dari atas ke bawah, sedangkan Teks II membangun latar malam yang sunyi dan sendu.',
      tambahan: false
    },
    {
      n: 16, type: 'multi',
      stimulus: `<h4>Sepenggal Senja di Teras Rumah</h4>
        <p>Setiap sore, Pak Wiryo duduk di teras rumahnya yang menghadap sawah. Mata tuanya menatap nanar ke arah mentari yang perlahan tenggelam. Di tangannya, terselip surat dari anaknya yang merantau ke kota. Sudah tiga tahun ia tidak pulang.</p>
        <p>"Bapak sehat, kan? Maaf belum sempat pulang," begitu isi surat yang dibacanya hampir setiap hari. Pak Wiryo hanya tersenyum. Senyum yang sama setiap kali senja datang, senyum yang menahan rindu dan harapan bahwa suatu hari, anaknya akan kembali.</p>
        <p>Suara azan magrib berkumandang. Pak Wiryo bangkit perlahan, melipat surat itu, dan berjalan masuk ke rumah.</p>
        <p>Di langit, warna jingga mulai memudar, tapi dalam hati Pak Wiryo, harapan belum pernah benar-benar padam.</p>`,
      question: 'Pernyataan yang sesuai dengan teks cerpen di atas adalah ...',
      options: [
        'Pak Wiryo duduk di teras rumahnya yang menghadap ke jalan raya.',
        'Anak Pak Wiryo sudah pulang ke rumah setelah tiga tahun merantau.',
        'Pak Wiryo masuk ke rumah setelah matahari terbenam.',
        'Pak Wiryo membaca surat dari anaknya hampir setiap hari.'
      ],
      answer: [2, 3],
      explain: 'Teras menghadap sawah, bukan jalan raya, dan anaknya belum pulang. Pak Wiryo masuk setelah azan magrib dan warna jingga memudar, serta membaca surat itu hampir setiap hari.',
      tambahan: false
    },
    {
      n: 17, type: 'pg',
      stimulus: `<p><b>Teks 1</b><br>Indonesia punya menu ayam goreng yang rasanya sangat lezat. Yaitu, ayam goreng Kalasan. Ayam goreng Kalasan ini rasanya sangat gurih. Ada bumbu kriuk yang selalu setia menemani ayam goreng kampung ini. Salah satu perbedaan yang paling penting ayam goreng Kalasan menggunakan ayam kampung. Ayam Kalasan ini dimasak dengan aneka bumbu khas Indonesia. Pasti lebih sehat karena tanpa penyedap rasa yang berlebihan.</p>
        <p><b>Teks 2</b><br>Rendang adalah masakan tradisional bersantan dengan daging sapi sebagai bahan utamanya. Masakan khas dari Sumatera Barat ini sangat digemari semua kalangan. Tidak saja masyarakat Indonesia bahkan luar negeri pun menggemarinya. Selain daging sapi, rendang juga menggunakan kelapa. Rendang menggunakan bumbu khas Indonesia. Bumbu tersebut yaitu cabai, lengkuas, serai, bawang dan aneka bumbu lain.</p>`,
      question: 'Persamaan ide kedua artikel tersebut adalah ...',
      options: [
        'Masakan Indonesia yang digemari masyarakat luar negeri',
        'Masakan yang tidak menggunakan penyedap rasa',
        'Masakan menggunakan bumbu khas Indonesia',
        'Wisata kuliner'
      ],
      answer: 2,
      explain: 'Kedua teks sama-sama menyebut bahwa masakannya menggunakan bumbu khas Indonesia. Penyedap dan luar negeri hanya disebut pada salah satu teks.',
      tambahan: false
    },
    {
      n: 18, type: 'multi',
      stimulus: '<p>(1) Badan Pertahanan Nasional menyatakan ada 73 hektare lahan terlantar. (2) Lahan jutaan hektare tersebut selayaknya tidak dibiarkan terlantar. (3) Undang-undang agraria menyebutkan semua hak atas tanah mempunyai fungsi sosial. (4) Pemerintah dituntut memiliki kebijakan dan strategi pertanahan nasional, membagi dengan jelas peruntukan lahan pertanian, industri, permukiman, dan hutan. (5) Hal itu akan menjamin kepastian hukum sehingga setiap orang dapat bekerja dan berproduksi dengan tenang.</p>',
      question: 'Kalimat fakta terdapat pada kutipan teks di atas terdapat pada nomor ...',
      options: ['(1)', '(2)', '(3)', '(4)'],
      answer: [0, 2],
      explain: 'Kalimat (1) memuat data yang dapat dicek dan kalimat (3) merujuk isi undang-undang; keduanya fakta. Kalimat (2) dan (4) berisi anjuran atau tuntutan sehingga berupa opini.',
      tambahan: false
    },
    {
      n: 19, type: 'pg',
      stimulus: `<p><b>Proses Pembuatan Kartu Pelajar di Sekolah.</b></p>
        <p>(1) Datanglah ke kantor TU di sekolah Anda!<br>(2) Mintalah blangko untuk kartu pelajar kepada petugas yang berjaga!<br>(3) ....<br>(4) Setelah blangko selesai Anda isi, serahkan kepada petugas yang berjaga!<br>(5) Setelah itu, Anda akan memasuki ruang pengambilan foto!<br>(6) Setelah berfoto, kartu pelajar akan selesai kurang lebih 2 minggu.</p>`,
      question: 'Kalimat yang tepat untuk melengkapi teks tersebut adalah ...',
      options: [
        'Anda boleh memfotokopi blangko yang sudah diisi',
        'Isilah blangko dengan data yang benar dan jujur!',
        'Tempelkan foto di tempat yang telah disediakan.',
        'Pergilah ke kepala sekolah untuk meminta tanda tangan!'
      ],
      answer: 1,
      explain: 'Langkah (4) menyebut blangko yang “selesai Anda isi”, jadi langkah (3) harus berisi perintah mengisi blangko.',
      tambahan: false
    },
    {
      n: 20, type: 'pg',
      stimulus: '<p>Sampah plastik menjadi salah satu penyumbang terbesar pencemaran lingkungan. Banyak hewan laut yang mati akibat menelan plastik yang mengapung di laut. Untuk mengatasi masalah ini, masyarakat diminta mengurangi penggunaan plastik sekali pakai dan beralih ke bahan yang ramah lingkungan.</p>',
      question: 'Bagan yang tepat berdasarkan isi teks di atas adalah ...',
      options: [
        '1. Sampah organik mencemari lingkungan / 2. Hewan laut memakan sampah organik / 3. Gunakan plastik ramah lingkungan',
        '1. Sampah plastik mencemari lingkungan / 2. Hewan laut mati karena plastik / 3. Kurangi penggunaan plastik sekali pakai',
        '1. Limbah rumah tangga meningkat / 2. Sungai tercemar / 3. Pemerintah menutup pabrik',
        '1. Laut tercemar karena limbah / 2. Solusi: buang sampah sembarangan / 3. Hewan laut tumbuh dengan baik'
      ],
      answer: 1,
      explain: 'Bagan harus mengikuti alur teks: penyebab (sampah plastik) → akibat (hewan laut mati) → solusi (kurangi plastik sekali pakai).',
      tambahan: false
    },

    /* ---------- Soal tambahan 21–30 (bergaya TKA) ---------- */
    {
      n: 21, type: 'pg', tambahan: true,
      stimulus: '<p>Program "Gerakan Stop Boros Pangan" yang diluncurkan Dinas Ketahanan Pangan Kota Bandung berhasil menekan jumlah makanan layak konsumsi yang terbuang. Selama enam bulan, 120 hotel dan restoran menyalurkan 8,5 ton makanan berlebih ke 14 panti asuhan. Namun, jangkauan program masih terbatas karena belum tersedia armada berpendingin untuk mengangkut makanan ke daerah pinggiran.</p>',
      question: 'Gagasan utama paragraf tersebut adalah ...',
      options: [
        'Jumlah panti asuhan di Kota Bandung',
        'Upaya menekan makanan terbuang melalui penyaluran makanan berlebih',
        'Harga makanan di hotel dan restoran',
        'Kegagalan program karena tidak ada relawan'
      ],
      answer: 1,
      explain: 'Seluruh kalimat membahas program penyaluran makanan berlebih untuk mengurangi makanan terbuang; kendala armada hanya detail pendukung.'
    },
    {
      n: 22, type: 'table', cols: ['Sesuai', 'Tidak Sesuai'], tambahan: true,
      stimulus: `<p>Literasi digital bukan sekadar kemampuan mengoperasikan gawai. Literasi digital mencakup kecakapan menilai kebenaran informasi, menjaga data pribadi, dan berperilaku santun di ruang maya. Sekolah yang membiasakan siswa memeriksa sumber berita sebelum membagikannya membantu menekan penyebaran hoaks. Pembiasaan itu perlu didukung guru dan orang tua, bukan hanya oleh pelajaran TIK.</p>`,
      question: 'Tentukan kesesuaian pernyataan berikut dengan isi teks!',
      rows: [
        { t: 'Literasi digital hanya berarti mampu mengoperasikan gawai.', a: 1 },
        { t: 'Memeriksa sumber berita sebelum membagikan dapat menekan hoaks.', a: 0 },
        { t: 'Pembiasaan literasi digital cukup dilakukan oleh guru TIK saja.', a: 1 }
      ],
      explain: 'Teks menegaskan literasi digital lebih luas dari kemampuan teknis, dan pembiasaan perlu dukungan guru serta orang tua.'
    },
    {
      n: 23, type: 'multi', tambahan: true,
      stimulus: `<p><b>Cara Menyimpan Dokumen di Awan</b></p>
        <p>(1) Masuk ke akun penyimpanan awan yang kamu miliki.<br>(2) Tekan tombol Unggah, lalu pilih berkas dari perangkat.<br>(3) Tunggu proses unggah selesai sampai muncul tanda centang.<br>(4) Periksa kembali berkas di daftar untuk memastikan nama dan ukurannya benar.</p>`,
      question: 'Pernyataan yang sesuai dengan teks prosedur tersebut adalah ...',
      options: [
        'Berkas boleh dihapus dari perangkat sebelum proses unggah selesai.',
        'Tanda centang menandakan proses unggah telah selesai.',
        'Nama dan ukuran berkas perlu diperiksa setelah diunggah.',
        'Prosedur diawali dengan menekan tombol Unggah.'
      ],
      answer: [1, 2],
      explain: 'Langkah (3) menjelaskan tanda centang, langkah (4) memerintahkan pemeriksaan nama dan ukuran. Prosedur diawali dengan masuk ke akun, bukan menekan Unggah.'
    },
    {
      n: 24, type: 'pg', tambahan: true,
      stimulus: `<p>Pagi menabur embun di daun padi<br>Burung gereja berdecit di atap seng<br>Petani melangkah pelan membawa cangkul<br>Mentari menyibak kabut di ufuk timur</p>`,
      question: 'Citraan yang dominan pada puisi tersebut adalah ...',
      options: ['auditori', 'visual', 'taktil', 'olfaktori'],
      answer: 1,
      explain: 'Larik-lariknya membangun gambaran yang dapat dilihat: embun, atap seng, petani, mentari, dan kabut.'
    },
    {
      n: 25, type: 'pg', tambahan: true,
      question: 'Kalimat yang paling efektif adalah ...',
      options: [
        'Para siswa-siswa mengikuti upacara dengan khidmat.',
        'Para siswa mengikuti upacara dengan khidmat.',
        'Siswa semuanya pada mengikuti upacara dengan khidmat.',
        'Upacara diikuti oleh para siswa-siswa dengan sangat khidmat sekali.'
      ],
      answer: 1,
      explain: '“Para” sudah bermakna jamak sehingga tidak perlu “siswa-siswa”, dan pilihan kedua tidak memuat kata mubazir.'
    },
    {
      n: 26, type: 'table', cols: ['Benar', 'Salah'], tambahan: true,
      stimulus: '<p>Menurut saya, jam belajar di sekolah sebaiknya dimulai pukul 08.00. Data Dinas Pendidikan menunjukkan 62 persen siswa berangkat sebelum pukul 06.00. Sayangnya, kebijakan itu belum diterapkan di kota ini.</p>',
      question: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
      rows: [
        { t: 'Kalimat "Data Dinas Pendidikan menunjukkan 62 persen siswa berangkat sebelum pukul 06.00" berupa fakta.', a: 0 },
        { t: 'Kalimat "Menurut saya, jam belajar sebaiknya dimulai pukul 08.00" berupa fakta.', a: 1 },
        { t: 'Kata "sebaiknya" menandai kalimat opini.', a: 0 }
      ],
      explain: 'Kalimat berdata dapat diverifikasi (fakta). Kalimat yang memuat “menurut saya” dan “sebaiknya” adalah pendapat (opini).'
    },
    {
      n: 27, type: 'multi', tambahan: true,
      stimulus: '<p>Pertunjukan tari "Angin di Ladang" memikat penonton lewat koreografi yang lincah dan tata cahaya yang hangat. Sayangnya, durasi bagian pembuka terasa terlalu panjang sehingga beberapa penonton tampak gelisah. Musik pengiring yang dimainkan langsung menambah kekuatan suasana.</p>',
      question: 'Kelebihan pertunjukan tersebut menurut teks adalah ...',
      options: [
        'Koreografi yang lincah',
        'Durasi pembuka yang panjang',
        'Tata cahaya yang hangat',
        'Musik pengiring yang dimainkan langsung'
      ],
      answer: [0, 2, 3],
      explain: 'Tiga hal itu disebut sebagai kekuatan. Durasi pembuka yang panjang justru dikritik karena membuat penonton gelisah.'
    },
    {
      n: 28, type: 'pg', tambahan: true,
      question: 'Kata baku terdapat pada pilihan ...',
      options: ['analisa', 'praktik', 'ijin', 'merubah'],
      answer: 1,
      explain: 'Bentuk baku adalah “praktik”; “analisis”, “izin”, dan “mengubah” adalah bentuk baku untuk kata lainnya.'
    },
    {
      n: 29, type: 'pg', tambahan: true,
      stimulus: '<p>Kebiasaan membaca nyaring bersama anak setiap malam terbukti memperkaya kosakata. Anak yang rutin mendengarkan cerita lebih percaya diri ketika bercerita ulang. Orang tua tidak perlu waktu lama; lima belas menit setiap malam sudah cukup.</p>',
      question: 'Simpulan paragraf tersebut adalah ...',
      options: [
        'Membaca nyaring setiap malam bermanfaat bagi kosakata dan kepercayaan diri anak.',
        'Anak yang sering bercerita tidak perlu membaca.',
        'Orang tua harus menyediakan satu jam setiap malam.',
        'Kosakata anak hanya bertambah di sekolah.'
      ],
      answer: 0,
      explain: 'Simpulan menyatukan manfaat kosakata dan kepercayaan diri, sesuai isi paragraf.'
    },
    {
      n: 30, type: 'table', cols: ['Benar', 'Salah'], tambahan: true,
      stimulus: '<p>Sejak pagi Rani menimbang beras di warung ibunya. Angka di timbangan itu selalu ia catat di buku bersampul kain. "Ketelitian kecil hari ini menentukan kepercayaan besok," kata ibunya sambil tersenyum.</p>',
      question: 'Tentukan Benar atau Salah untuk setiap pernyataan tentang cerpen tersebut!',
      rows: [
        { t: 'Latar tempat cerpen tersebut adalah warung.', a: 0 },
        { t: 'Tokoh Rani digambarkan sebagai anak yang ceroboh.', a: 1 },
        { t: 'Amanat cerpen tersebut adalah ketelitian membangun kepercayaan.', a: 0 }
      ],
      explain: 'Rani mencatat setiap angka dengan teliti di warung; itu kebalikan dari ceroboh, dan amanatnya tersurat pada kalimat ibu.'
    }
  ]
},

/* ================================================================
   NASKAH 2 · PRE-TEST TKA 2026-2027 — LITERASI (Bahasa Indonesia)
   ================================================================ */
{
  id: 'pretest-ind',
  nama: 'Pre-Test TKA 2026/2027 · Literasi',
  subject: 'ind',
  tanggal: 'Selasa, 20 Oktober 2026',
  asal: 'SMP Taruna Bakti Bandung',
  catatan: 'Naskah asli, urutan tidak diacak. Soal 21–30 ditambahkan bergaya TKA untuk melengkapi 30 soal.',
  soal: [
    {
      n: 1, type: 'multi', tambahan: false,
      stimulus: `<p><b>Infografik: Peta Ekonomi Indonesia 2025</b> (isi gambar dituliskan sebagai teks)</p>
        <ul>
          <li>Diagram lingkaran "Kontribusi UMKM dan Koperasi terhadap PDB": UMKM 63%, Koperasi 5%.</li>
          <li>Grafik garis "Progres Digitalisasi Koperasi": naik dari sekitar 30% ke sekitar 60%.</li>
          <li>Grafik batang "5 Provinsi dengan Pertumbuhan Ekonomi Tertinggi": Bali 4,0%, NTB 4,0%, Kaltara 3,7%, Sulsel 3,2%, Jateng 4,0%.</li>
          <li>Label: FINTECH, UMKM, WIRAUSAHA MUDA.</li>
        </ul>
        <p><b>Ekonomi Indonesia Tahun 2025 Diprediksi Tumbuh Stabil, Tapi Siapa Pemain Utamanya?</b><br>Tahun 2025 akan menjadi momentum penting bagi perekonomian Indonesia. Banyak pihak memprediksi bahwa tahun ini menjadi tonggak pemulihan total pascapandemi dan awal penguatan ekonomi berbasis digital dan sektor domestik.</p>`,
      question: 'Berikut ini pernyataan yang sesuai dengan infografik di atas adalah ...',
      options: [
        'Bali, NTT, Kaltara, Sulsel, dan Jateng merupakan lima provinsi dengan pertumbuhan ekonomi tertinggi.',
        'UMKM mempunyai kontribusi yang besar terhadap PDB.',
        'Digitalisasi koperasi meningkat secara stabil selama beberapa tahun terakhir.',
        'Fintech, UMKM, dan wirausaha muda merupakan unsur-unsur penting dalam mengembangkan perekonomian Indonesia.'
      ],
      answer: [1, 2, 3],
      explain: 'Infografik menulis NTB, bukan NTT, sehingga pernyataan pertama tidak sesuai. Kontribusi UMKM 63%, garis digitalisasi naik stabil, dan ketiga label tersebut muncul pada infografik.'
    },
    {
      n: 2, type: 'multi', tambahan: false,
      stimulus: '<p>Perhatikan kembali infografik "Peta Ekonomi Indonesia 2025" pada soal nomor 1.</p>',
      question: 'Kekurangan dari infografik di atas adalah ...',
      options: [
        'Ketidaksesuaian grafik batang sehingga membingungkan pembaca',
        'Alur baca yang membingungkan',
        'Ikon yang tidak menggambarkan isi teks',
        'Banyak logo yang ditulis tanpa konteks yang jelas'
      ],
      answer: [0, 1, 3],
      explain: 'Grafik batang tidak konsisten dengan data (Jateng 4,0% digambar lebih rendah dari Sulsel 3,2%), alur baca tidak jelas, dan beberapa label/logo muncul tanpa keterangan.'
    },
    {
      n: 3, type: 'pg', tambahan: false,
      stimulus: `<p>Berdiri aku di senja senyap<br>Camar melayang menepis buih<br>Merpati putih terbang meniti<br>Menuju dara di balik bukit<br>...<br>Riak rindu mendatangkan rindu<br>Terkenangkan tuan aduhai puteri.</p>`,
      question: 'Berdasarkan puisi di atas, imaji yang dominan adalah ...',
      options: ['visual', 'taktil', 'kinestetik', 'auditori'],
      answer: 0,
      explain: 'Larik-lariknya melukiskan pemandangan yang dapat dilihat: senja, camar, buih, merpati putih, dan bukit.'
    },
    {
      n: 4, type: 'pg', tambahan: false,
      stimulus: '<p>Bacalah kembali puisi pada soal nomor 3.</p>',
      question: 'Larik "Riak rindu mendatangkan rindu" memiliki makna ...',
      options: [
        'Rasa kehilangan yang amat dalam',
        'Ingatan kecil yang memicu rindu',
        'Perasaan rindu yang datang bertubi-tubi',
        'Ingatan masa kecil yang berubah menjadi kenangan'
      ],
      answer: 2,
      explain: 'Kata “riak” menggambarkan gelombang kecil yang terus muncul, sehingga rindu yang datang berulang-ulang.'
    },
    {
      n: 5, type: 'pg', tambahan: false,
      stimulus: '<p>Bacalah kembali puisi pada soal nomor 3.</p>',
      question: 'Dilihat dari jenisnya, puisi tersebut tergolong puisi ...',
      options: ['naratif', 'epik', 'balada', 'lirik'],
      answer: 3,
      explain: 'Puisi tersebut mengungkap perasaan penulis (rindu) secara langsung, ciri puisi lirik.'
    },
    {
      n: 6, type: 'pg', tambahan: false,
      stimulus: `<p>Pak Kades tersenyum, lalu pamit. Asis berdiri di depan pintu, menatap punggung Pak Kades yang tidak berotot itu. Ia teringat bisik-bisiknya salah satu warga di waktu coblosan kemarin. Katanya, Pak Kades yang sekarang ini tidak pernah sekolah. Dan sebelumnya memang sempat terdengar desas-desus bahwa Pak Kades itu sebenarnya tidak lolos administrasi pencalonan. Asis sudah mulai curiga, dan tidak yakin dengan Pak Kades.</p>
        <p>Sebelum hari benar-benar gelap, Asis pergi ke kebun singkongnya yang berjarak dua puluh meter dari rumahnya. Ia berjalan kaki sambil membawa karung, dan pikiran tentang Pak Kades. Di tengah perjalanan, ia sesekali mencium bau asin pekat yang dibawa angin dari pantai. Setelah sampai di kebun, Asis mulai mencabut satu per satu batang singkong, kemudian mengusap tanah liat yang masih menempel. Karena karung bekas beras bulog itu sudah penuh dan cahaya matahari sudah padam, Asis bergegas pulang. Kali ini, ia mengambil lebih banyak daripada biasanya setelah mengetahui Pak Kades ternyata doyan sekali sama keripik singkong buatannya. Ah, tentang keripik singkong.</p>`,
      question: 'Pola pengembangan kutipan cerpen di atas menggunakan cara ...',
      options: ['pemunculan masalah', 'aksi tokoh', 'latar belakang', 'pengenalan tokoh'],
      answer: 1,
      explain: 'Kutipan bergerak melalui tindakan Asis: berdiri di pintu, berjalan ke kebun, mencabut singkong, lalu pulang.'
    },
    {
      n: 7, type: 'multi', tambahan: false,
      stimulus: '<p>Bacalah kembali kutipan cerpen tentang Asis pada soal nomor 6.</p>',
      question: 'Peristiwa berikut yang relevan dengan isi penggalan cerpen di atas adalah ...',
      options: [
        'Asis memanen singkong di kebunnya.',
        'Asis mengetahui Pak Kades sangat suka keripik singkong.',
        'Pak Bajuri mencuri hasil panen tetangga.',
        'Bu Ratna dipilih menjadi kepala desa karena dia punya pengalaman yang mendukung'
      ],
      answer: [0, 1],
      explain: 'Dua peristiwa pertama terdapat dalam kutipan. Nama Pak Bajuri dan Bu Ratna tidak ada dalam teks.'
    },
    {
      n: 8, type: 'pg', tambahan: false,
      stimulus: '<p>Bacalah kembali kutipan cerpen tentang Asis pada soal nomor 6.</p>',
      question: 'Cara pengarang menggambarkan watak Pak Kades adalah ...',
      options: ['tanggapan tokoh lain', 'secara langsung', 'pikiran tokoh', 'tindakan tokoh'],
      answer: 0,
      explain: 'Watak Pak Kades diketahui dari bisik-bisik warga dan kecurigaan Asis, bukan dari penjelasan langsung pengarang.'
    },
    {
      n: 9, type: 'pg', tambahan: false,
      stimulus: `<p>Saat ini, polusi udara menjadi [...] serius yang sedang dihadapi (1)Indonesia. Menurut data dari (2)Kementerian Lingkungan Hidup dan Kehutanan tahun 2023, tercatat (3)Indeks Kualitas Udara di beberapa kota besar mencapai kategori tidak sehat. Polusi udara tersebut didominasi oleh asap kendaraan, industri, dan pembakaran. Banyaknya polusi udara yang belum mampu [...] dengan baik menjadi ancaman kesehatan masyarakat. Menghirup udara kotor sama dengan menghirup racun. Selain itu, polusi udara yang tidak terkendali akan menyebabkan gangguan pernapasan. Gangguan pernapasan dapat menyebabkan penyakit seperti asma dan (4)ISPA yang berbahaya serta berkontribusi pada pemanasan global.</p>`,
      question: 'Kata berimbuhan yang tepat untuk mengisi teks rumpang tersebut adalah ...',
      options: [
        'permasalahan, dikendalikan',
        'menyoalkan, terkelola',
        'dipersoalkan, pengelolaan',
        'mempermasalahkan, mengelola'
      ],
      answer: 0,
      explain: '“Menjadi permasalahan serius” dan “belum mampu dikendalikan dengan baik” sesuai dengan konteks kalimat.'
    },
    {
      n: 10, type: 'pg', tambahan: false,
      stimulus: '<p>Bacalah kembali teks tentang polusi udara pada soal nomor 9.</p>',
      question: 'Penulisan huruf kapital yang salah ditunjukkan dengan nomor ...',
      options: ['(1)', '(2)', '(3)', '(4)'],
      answer: 0,
      explain: 'Kata “Indonesia” pada nomor (1) berada di tengah kalimat setelah kata “dihadapi”, sehingga tidak perlu huruf kapital.',
      tambahan: false
    },
    {
      n: 11, type: 'pg', tambahan: false,
      stimulus: '<p>Banyak faktor yang menyebabkan kesulitan belajar atau kesulitan dalam memahami pelajaran. Salah satunya, minimnya alur belajar yang sistematis dan kurangnya motivasi. Gangguan konsentrasi, kurang tidur, dan lingkungan belajar yang tidak kondusif juga menjadi penyebab kesulitan belajar. Kesulitan belajar dapat didominasi dengan meningkatkan metode belajar dan menjadikan belajar berkelompok sebagai kebiasaan.</p>',
      question: 'Perbaikan kata pada teks tersebut adalah ...',
      options: [
        'Kata alur diganti metode, kata didominasi diganti diantisipasi',
        'Kata alur diganti cara, kata didominasi diganti diklasifikasi',
        'Kata lingkungan diganti suasana, kata motivasi diganti semangat',
        'Kata lingkungan diganti kondisi, kata motivasi diganti keinginan'
      ],
      answer: 0,
      explain: '“Alur belajar” kurang tepat untuk konteks ini sehingga diganti “metode”, dan “didominasi” salah makna sehingga diganti “diantisipasi”.',
      tambahan: false
    },
    {
      n: 12, type: 'pg', tambahan: false,
      stimulus: '<p>Bacalah kembali teks tentang kesulitan belajar pada soal nomor 11.</p>',
      question: 'Ide pokok paragraf tersebut adalah ...',
      options: [
        'Banyak faktor yang menyebabkan kesulitan belajar atau kesulitan memahami pelajaran',
        'Minimnya alur belajar yang sistematis dan kurangnya motivasi merupakan faktor penyebab kesulitan belajar',
        'Kesulitan belajar didominasi dengan meningkatkan metode belajar',
        'Gangguan kosentrasi dan gangguan tidur merupakan faktor penyebab kesulitan belajar.'
      ],
      answer: 0,
      explain: 'Kalimat pertama bersifat umum dan kalimat berikutnya merinci faktor-faktornya, sehingga kalimat pertama adalah ide pokok.',
      tambahan: false
    },
    {
      n: 13, type: 'pg', tambahan: false,
      stimulus: '<p>(1) Lukisan karya Vincent van Gogh menggambarkan potret pemandangan alam yang indah. (2) Lukisannya berbentuk persegi dengan lebar sekitar tiga kaki atau sekitar 0,9 meter. (3) Lukisan itu dikenal dengan nama Starry Night. (4) Lukisan pelukis yang terkenal itu dijual dengan harga tinggi.</p>',
      question: 'Alasan ketidakefektifan kalimat nomor (4) adalah ...',
      options: [
        'penggunaan kata berlebihan',
        'struktur kalimat tidak jelas',
        'imbuhan tidak sejajar',
        'multitafsir (ambigu)'
      ],
      answer: 3,
      explain: 'Frasa “pelukis yang terkenal” dapat berarti lukisannya atau pelukisnya, sehingga kalimat menjadi ambigu.',
      tambahan: false
    },
    {
      n: 14, type: 'table', cols: ['Sesuai', 'Tidak Sesuai'], tambahan: false,
      stimulus: `<p><b>Teks 1</b><br>Mangga adalah buah tropis yang mengandung vitamin, karbohidrat, protein, serat, hingga mineral yang baik untuk kesehatan. Kandungan gizi ini dapat membantu memenuhi kebutuhan gizi harian. Buah ini juga memiliki banyak manfaat untuk kesehatan tubuh seperti menjaga kesehatan pencernaan, meningkatkan imunitas tubuh, menjaga kesehatan mata, dan mencegah penyakit jantung. Di balik khasiatnya, buah mangga yang dikonsumsi secara berlebihan dapat menimbulkan risiko alergi kulit. Risiko ini dapat berupa gatal-gatal, kulit kemerahan, ruam kulit, dan bengkak di area wajah. Jika gejala-gejala tersebut terjadi, coba hindari sejenak mengonsumsi mangga.</p>
        <p><b>Teks 2</b><br>Jahe merah atau dalam bahasa Latin dikenal dengan nama Zingiber officinale var. rubrum merupakan jenis tanaman rimpang yang mudah dikenali dari ukuran rimpangnya yang kecil dan warna merah keunguan. Tidak hanya itu, jahe merah juga mudah tumbuh pada tanah yang gembur. Sejak dahulu, jahe merah sudah digunakan untuk pengobatan tradisional. Faktanya, jahe merah memang banyak mengandung zat yang bermanfaat untuk tubuh. Tak heran BPOM menobatkan jahe merah sebagai herbal unggulan setelah menemukan manfaat penting jahe merah. Selain itu, rimpangnya bermanfaat untuk meningkatkan daya tahan tubuh. Lebih dari 800 studi, artikel, dan laporan telah menjelaskan tentang manfaat jahe merah dalam penyembuhan penyakit.</p>`,
      question: 'Tentukan pernyataan yang sesuai dan tidak sesuai berdasarkan teks di atas!',
      rows: [
        { t: 'Mangga dan jahe merah memiliki banyak manfaat untuk kesehatan tubuh.', a: 0 },
        { t: 'Jahe merah harus ditanam di tanah yang tandus.', a: 1 },
        { t: 'Vitamin, karbohidrat, dan protein terkandung dalam buah mangga.', a: 0 }
      ],
      explain: 'Kedua teks memuji manfaat kesehatannya. Jahe merah tumbuh baik di tanah gembur, bukan tandus.'
    },
    {
      n: 15, type: 'pg', tambahan: false,
      stimulus: '<p>Bacalah kembali Teks 1 tentang mangga pada soal nomor 14.</p>',
      question: 'Simpulan yang paling tepat dari teks 1 adalah ...',
      options: [
        'Buah mangga dapat dikonsumsi oleh siapa saja',
        'Buah mangga sangat baik untuk kesehatan tubuh dan tidak memiliki kekurangan.',
        'Buah mangga mempunyai khasiat yang baik untuk tubuh jika dikonsumsi secukupnya atau tidak berlebihan',
        'Buah mangga memiliki banyak manfaat.'
      ],
      answer: 2,
      explain: 'Teks menyebut manfaat sekaligus risiko bila berlebihan, sehingga simpulan yang tepat adalah manfaat dengan syarat tidak berlebihan.'
    },
    {
      n: 16, type: 'multi', tambahan: false,
      stimulus: `<p><b>Teks 1 — Museum Tsunami Aceh</b><br>Indonesia pernah mengalami sebuah bencana dahsyat berupa gempa tsunami yang mengguncang Aceh pada tanggal 26 Desember 2004. Sebagai bentuk mengenang para korban dari musibah gempa dan tsunami tersebut maka dibuat Museum Tsunami Aceh. Banyak korban jiwa dalam bencana ini, bahkan sampai menyentuh pada angka 170.000 jiwa.</p>
        <p>Museum ini berdiri pada tanggal 23 Februari 2009. Perancang museum ini adalah Ridwan Kamil. Beliau membuat desain yang memenangkan sayembara tingkat internasional pada tahun 2007 dalam rangka memperingati peristiwa tsunami tahun 2004.</p>
        <p>Museum Tsunami ini menyimpan sekitar 6.038 koleksi. Koleksi tersebut dibagi ke dalam beberapa jenis. Pengelola museum merotasi koleksi setiap enam bulan sekali. Dalam satu pameran, terdapat sekitar 1.300 koleksi yang tersebar di tiga titik, yaitu rumah Aceh, pameran temporer, dan ruang pameran tetap. Ketika memasuki ruangan museum, kalian akan melewati sebuah lorong kecil dengan pencahayaan minim. Lorong ini membuat emosi pengunjung campur aduk. Setelah itu ada ruang bernama The Light of God yang terdapat ratusan ribu nama korban dari bencana Tsunami Aceh.</p>
        <p><b>Teks 2 — Museum Sisa Hartaku</b><br>Museum Sisa Hartaku adalah sebuah museum mini yang terletak di Yogyakarta. Nama museum ini berarti "sisa harta saya" yang merujuk pada koleksi pribadi pemilik museum yang terdiri dari barang-barang antik dan benda lainnya. Museum ini merupakan destinasi wisata populer dan sering dikunjungi oleh mereka yang tertarik dengan sejarah dan budaya. Museum ini terkenal dengan koleksi uniknya yang terdiri dari sisa-sisa barang yang sudah rusak akibat erupsi Merapi, termasuk motor tua, rangka hewan, dan foto-foto lama.</p>
        <p>Museum Mini Sisa Hartaku, juga dikenal sebagai The House of Memory, adalah sebuah museum mini yang terletak di Dusun Kepung, Desa Kepuharjo, Cangkringan, Sleman, Yogyakarta. Museum ini didirikan oleh Sriyanto, seorang warga setempat yang selamat dari erupsi gunung Merapi pada tahun 2010. Setelah erupsi, Sriyanto memutuskan untuk mengumpulkan sisa-sisa barang yang selamat dari rumahnya dan memajangnya di museum mini yang ia dirikan. Museum Sisa Hartaku menyimpan sisa-sisa letusan gunung Merapi pada tahun 2010. Selain itu, museum ini juga menampilkan foto dan video tentang erupsi gunung Merapi silam. Letusan Merapi pada tahun 2010 menyebabkan kerugian yang besar, termasuk korban jiwa dan kerusakan properti. Letusan ini mengakibatkan sedikitnya 353 orang tewas.</p>`,
      question: 'Apa saja persamaan informasi yang dimuat dari kedua teks tersebut?',
      options: [
        'Pendeskripsian museum',
        'Pendiri museum',
        'Tata letak dalam museum',
        'Penyebab pendirian museum'
      ],
      answer: [0, 1, 3],
      explain: 'Kedua teks mendeskripsikan museum, menyebut tokoh di balik pendirian/perancangannya, dan alasan pendiriannya (tsunami dan erupsi). Tata letak hanya dirinci pada Teks 1.'
    },
    {
      n: 17, type: 'pg', tambahan: false,
      stimulus: '<p>Bacalah kembali kedua teks museum pada soal nomor 16.</p>',
      question: 'Bagaimanakah ciri khas objek wisata dalam dua teks tersebut?',
      options: [
        'Kemenarikan ilustrasi yang dipakai',
        'Penggunaan fasilitas wisata',
        'Tema museum berupa wisata kelam',
        'Manfaat mengunjungi wisata'
      ],
      answer: 2,
      explain: 'Kedua museum mengangkat peristiwa bencana yang memilukan (tsunami dan erupsi Merapi), sehingga bertema wisata kelam.'
    },
    {
      n: 18, type: 'table', cols: ['Tepat', 'Tidak Tepat'], tambahan: false,
      stimulus: '<p>Perhatikan kata bercetak tebal pada kedua teks museum soal nomor 16: <b>dasyat</b> dan <b>temporer</b> (Teks 1), serta <b>populer</b> dan <b>properti</b> (Teks 2).</p>',
      question: 'Bagaimanakah penulisan kata pada kedua teks tersebut? Tentukan Tepat atau Tidak Tepat untuk setiap pernyataan berikut!',
      rows: [
        { t: 'dasyat', a: 1 },
        { t: 'temporer', a: 0 },
        { t: 'populer', a: 0 },
        { t: 'properti', a: 0 }
      ],
      explain: 'Bentuk baku adalah “dahsyat”, sedangkan “temporer”, “populer”, dan “properti” sudah baku.'
    },
    {
      n: 19, type: 'table', cols: ['Benar', 'Salah'], tambahan: false,
      stimulus: `<p>Setelah membaca kedua teks museum tersebut, Egi dan Fera mengutarakan pendapatnya.</p>
        <p>Egi : Menurutku, teks 1 lebih dapat menggambarkan teks deskripsi dengan baik.<br>Fera : Menurutku, lebih tepat teks 2 daripada teks 1.</p>`,
      question: 'Mengapa pernyataan Egi lebih tepat menggambarkan keunggulan teks deskripsi 1 daripada teks 2? Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
      rows: [
        { t: 'Gaya penyajian teks menggunakan sapaan orang kedua sehingga lebih interaktif.', a: 0 },
        { t: 'Penyajian gambar pada teks terlalu kecil membuat pembaca kurang tertarik membaca.', a: 1 },
        { t: 'Akhir teks dilengkapi kalimat ajakan pada pembaca untuk mengunjungi museum.', a: 1 }
      ],
      explain: 'Teks 1 menyapa pembaca dengan “kalian”. Teks 1 tidak membahas ukuran gambar dan tidak diakhiri kalimat ajakan.'
    },
    {
      n: 20, type: 'table', cols: ['Benar', 'Salah'], tambahan: false,
      stimulus: '<p>Perhatikan kalimat berikut pada Teks 2 paragraf kedua: "Museum Mini Sisa Hartaku, juga dikenal sebagai The House of Memory, adalah sebuah museum mini yang terletak di Dusun Kepung, Desa Kepuharjo, Cangkringan, Sleman, Yogyakarta … menyimpan sisa-sisa letusan gunung Merapi pada tahun 2010."</p>',
      question: 'Bagaimanakah penggunaan huruf kapital pada teks kedua paragraf kedua tersebut? Tentukan Benar atau Salah untuk setiap penggunaan berikut!',
      rows: [
        { t: 'Museum Mini Sisa Hartaku', a: 0 },
        { t: 'sebagai The House of Memory', a: 0 },
        { t: 'di Dusun Kepung', a: 0 },
        { t: 'erupsi gunung Merapi', a: 1 }
      ],
      explain: 'Nama diri dan nama tempat ditulis dengan huruf kapital. Kata “gunung” pada “Gunung Merapi” seharusnya berhuruf kapital karena bagian dari nama geografi.'
    },

    /* ---------- Soal tambahan 21–30 (bergaya TKA) ---------- */
    {
      n: 21, type: 'pg', tambahan: true,
      stimulus: '<p>Batik bukan sekadar kain bermotif. Setiap motif menyimpan pesan tentang alam, kehidupan sosial, dan harapan pembuatnya. Motif parang, misalnya, dahulu hanya boleh dipakai keluarga keraton sebagai lambang kekuasaan. Kini batik dipakai siapa saja, tetapi para perajin tetap menjaga makna di balik setiap goresan canting. Bagi mereka, melestarikan batik berarti merawat cerita, bukan hanya menjual kain.</p>',
      question: 'Ide pokok paragraf tersebut adalah ...',
      options: [
        'Harga kain batik di pasaran',
        'Batik menyimpan makna sehingga pelestariannya berarti merawat cerita',
        'Motif parang paling disukai wisatawan',
        'Keluarga keraton masih memakai batik'
      ],
      answer: 1,
      explain: 'Paragraf menekankan makna motif dan pelestarian sebagai upaya merawat cerita, bukan sekadar menjual kain.'
    },
    {
      n: 22, type: 'table', cols: ['Sesuai', 'Tidak Sesuai'], tambahan: true,
      stimulus: `<p>Gerhana matahari terjadi ketika bulan berada di antara bumi dan matahari sehingga cahaya matahari tertutup. Karena orbit bulan tidak sejajar dengan orbit bumi, gerhana tidak terjadi setiap bulan. Gerhana matahari total hanya dapat disaksikan dari jalur sempit di permukaan bumi. Menatap matahari secara langsung saat gerhana tetap berbahaya karena dapat merusak retina.</p>`,
      question: 'Tentukan kesesuaian pernyataan berikut dengan isi teks!',
      rows: [
        { t: 'Gerhana matahari terjadi karena bumi berada di antara bulan dan matahari.', a: 1 },
        { t: 'Gerhana tidak terjadi setiap bulan karena orbit bulan tidak sejajar dengan orbit bumi.', a: 0 },
        { t: 'Melihat gerhana matahari secara langsung aman bagi mata.', a: 1 }
      ],
      explain: 'Teks menyebut bulan berada di antara bumi dan matahari, serta menegaskan menatap matahari langsung berbahaya bagi retina.'
    },
    {
      n: 23, type: 'multi', tambahan: true,
      stimulus: '<p>Pemerintah Kota Yogyakarta menambah tiga jalur sepeda baru sepanjang 7,4 kilometer pada awal tahun ini. Penambahan itu dilakukan setelah survei menunjukkan kenaikan pesepeda sebesar 42 persen dalam dua tahun. Meski begitu, sebagian pesepeda mengeluhkan jalur yang terputus di persimpangan dan sering dipakai kendaraan bermotor. Dinas Perhubungan berjanji menambah rambu serta mengevaluasi jalur setiap tiga bulan.</p>',
      question: 'Pernyataan yang sesuai dengan teks berita tersebut adalah ...',
      options: [
        'Jalur sepeda baru sepanjang 7,4 kilometer ditambahkan di Yogyakarta.',
        'Jumlah pesepeda turun 42 persen dalam dua tahun.',
        'Sebagian jalur terputus di persimpangan dan dipakai kendaraan bermotor.',
        'Dinas Perhubungan menolak mengevaluasi jalur sepeda.'
      ],
      answer: [0, 2],
      explain: 'Teks menyebut kenaikan 42 persen (bukan penurunan) dan janji evaluasi tiap tiga bulan (bukan penolakan).'
    },
    {
      n: 24, type: 'pg', tambahan: true,
      stimulus: '<p>Hujan mengetuk atap sepanjang malam,<br>menyusun huruf-huruf di jendela.<br>Angin membawa kabar dari ladang<br>yang lama tidak kudatangi.</p>',
      question: 'Majas yang dominan pada kutipan puisi tersebut adalah ...',
      options: ['hiperbola', 'personifikasi', 'metafora', 'litotes'],
      answer: 1,
      explain: 'Hujan “mengetuk” dan “menyusun huruf”, serta angin “membawa kabar” — benda mati diberi sifat manusia.',
      tambahan: true
    },
    {
      n: 25, type: 'pg', tambahan: true,
      question: 'Kalimat yang tidak efektif adalah ...',
      options: [
        'Panitia menyiapkan lima ratus kursi untuk tamu.',
        'Para hadirin sekalian dipersilakan duduk kembali.',
        'Rapat dimulai tepat pukul delapan pagi.',
        'Siswa wajib membawa kartu ujian.'
      ],
      answer: 1,
      explain: '“Para” dan “sekalian” sama-sama bermakna jamak sehingga pemakaiannya berlebihan.',
      tambahan: true
    },
    {
      n: 26, type: 'table', cols: ['Benar', 'Salah'], tambahan: true,
      stimulus: '<p>Kebijakan ganjil-genap diberlakukan untuk menekan kemacetan. Menurut catatan dinas perhubungan, kecepatan rata-rata kendaraan naik 12 persen pada jam sibuk. Namun, kebijakan ini dinilai memberatkan warga yang bekerja di luar jalur ganjil-genap. Sebaiknya pemerintah menyediakan angkutan pengumpan sebelum memperluas kebijakan.</p>',
      question: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
      rows: [
        { t: 'Kecepatan rata-rata kendaraan naik 12 persen pada jam sibuk.', a: 0 },
        { t: 'Pernyataan "sebaiknya pemerintah menyediakan angkutan pengumpan" berupa fakta.', a: 1 },
        { t: 'Teks tersebut memuat kritik terhadap kebijakan ganjil-genap.', a: 0 }
      ],
      explain: 'Data kecepatan adalah fakta, kalimat “sebaiknya” adalah saran (opini), dan teks memuat kritik warga.'
    },
    {
      n: 27, type: 'multi', tambahan: true,
      stimulus: '<p><b>Cara Menanam Cabai di Pot</b><br>(1) Siapkan pot berdiameter minimal 30 cm dan lubang drainase. (2) Isi pot dengan campuran tanah, kompos, dan sekam dengan perbandingan 1:1:1. (3) Tanam bibit cabai sedalam 5 cm, lalu padatkan tanah di sekelilingnya. (4) Siram secukupnya pada pagi atau sore hari. (5) Letakkan pot di tempat yang mendapat sinar matahari minimal enam jam sehari.</p>',
      question: 'Pernyataan yang sesuai dengan teks prosedur tersebut adalah ...',
      options: [
        'Pot harus memiliki lubang drainase.',
        'Bibit ditanam sedalam 5 cm.',
        'Penyiraman dilakukan pada tengah hari saat matahari terik.',
        'Pot diletakkan di tempat tanpa sinar matahari.'
      ],
      answer: [0, 1],
      explain: 'Langkah (1) dan (3) menyebut drainase dan kedalaman 5 cm. Penyiraman pagi/sore dan kebutuhan sinar matahari bertentangan dengan langkah (4) dan (5).'
    },
    {
      n: 28, type: 'pg', tambahan: true,
      question: 'Kata yang penulisannya sesuai dengan kaidah bahasa Indonesia adalah ...',
      options: ['kongkret', 'aktivitas', 'propinsi', 'tehnik'],
      answer: 1,
      explain: 'Bentuk baku adalah “konkret”, “provinsi”, dan “teknik”; “aktivitas” sudah baku.'
    },
    {
      n: 29, type: 'pg', tambahan: true,
      stimulus: '<p>Koperasi sekolah tidak hanya menjual alat tulis. Sejak tahun lalu, koperasi membuka layanan penitipan bekal dan ruang baca kecil. Layanan itu membantu siswa yang datang terlalu pagi. Penjualan alat tulis tetap berjalan, tetapi suasana koperasi kini lebih ramai karena siswa betah berlama-lama di sana.</p>',
      question: 'Simpulan paragraf tersebut adalah ...',
      options: [
        'Koperasi sekolah menambah layanan sehingga menjadi lebih ramai.',
        'Koperasi sekolah berhenti menjual alat tulis.',
        'Ruang baca membuat siswa malas belajar.',
        'Siswa dilarang membawa bekal dari rumah.'
      ],
      answer: 0,
      explain: 'Paragraf menjelaskan layanan tambahan dan akibatnya: koperasi lebih ramai, sementara penjualan alat tulis tetap berjalan.'
    },
    {
      n: 30, type: 'table', cols: ['Benar', 'Salah'], tambahan: true,
      stimulus: '<p>setiap pagi, Ibu Sari membuka warung sebelum matahari terbit. Ia menyusun dagangan dengan rapi dan mencatat setiap pembelian di buku kecil. "Uang sedikit yang tercatat lebih baik daripada uang banyak yang hilang," katanya kepada anaknya yang membantu di warung.</p>',
      question: 'Tentukan Benar atau Salah untuk setiap pernyataan tentang cerpen tersebut!',
      rows: [
        { t: 'Latar waktu cerita adalah pagi hari.', a: 0 },
        { t: 'Tokoh Ibu Sari digambarkan sebagai orang yang teliti dalam mencatat.', a: 0 },
        { t: 'Watak Ibu Sari digambarkan melalui tindakan tokoh lain.', a: 1 }
      ],
      explain: 'Cerita berlatar pagi. Ketelitian Ibu Sari tampak dari tindakannya sendiri, bukan dari tindakan tokoh lain.'
    }
  ]
},

/* ================================================================
   NASKAH 3 · PRE-TEST TKA 2026-2027 — NUMERASI (Matematika)
   Catatan: beberapa soal aslinya memakai gambar. Gambar itu
   dituliskan sebagai keterangan teks supaya tetap bisa dikerjakan.
   ================================================================ */
{
  id: 'pretest-mtk',
  nama: 'Pre-Test TKA 2026/2027 · Numerasi',
  subject: 'mtk',
  tanggal: 'Senin, 12 Oktober 2026',
  asal: 'SMP Taruna Bakti Bandung',
  catatan: 'Naskah asli, urutan tidak diacak. Gambar pada naskah dituliskan sebagai keterangan teks. Soal 21–25 ditambahkan bergaya TKA untuk melengkapi 25 soal.',
  soal: [
    {
      n: 1, type: 'pg', tambahan: false,
      stimulus: `<p>Buah merupakan salah satu sumber vitamin C. Buah yang banyak mengandung vitamin C biasanya mempunyai rasa asam, berwarna cerah dan mengandung banyak air. Namun apakah semua itu benar? Apakah semakin besar dan semakin berair buah tersebut banyak mengandung vitamin C? Untuk mengetahui hal tersebut seorang peneliti akan menguji kandungan vitamin C yang dimiliki suatu buah dengan kandungan air dan berat yang beragam.</p>
        <p>Berikut disajikan data dari hasil penelitian yang dilakukan pada 4 buah.</p>
        <table><thead><tr><th>Buah</th><th>Kandungan Air (ml)</th><th>Berat Buah (gr)</th></tr></thead><tbody>
          <tr><td>Buah A</td><td>96,3</td><td>118,4</td></tr>
          <tr><td>Buah B</td><td>150</td><td>130,7</td></tr>
          <tr><td>Buah C</td><td>140</td><td>130,55</td></tr>
          <tr><td>Buah D</td><td>118,15</td><td>96,255</td></tr>
        </tbody></table>
        <p>Karena keterbatasan waktu penelitian, pada hari pertama hanya satu buah yang diteliti yaitu buah dengan kandungan air terbesar dan buah yang terberat.</p>`,
      question: 'Buah yang diteliti adalah ...',
      options: ['Buah A', 'Buah B', 'Buah C', 'Buah D'],
      answer: 1,
      explain: 'Kandungan air terbesar 150 ml pada Buah B, dan berat terbesar 130,7 gr juga pada Buah B.',
      tambahan: false
    },
    {
      n: 2, type: 'table', cols: ['Fungsi', 'Bukan Fungsi'], tambahan: false,
      stimulus: `<p>Perhatikan tiga diagram panah dari himpunan A = {5, 9, 13, 17} ke himpunan B = {p, q, r, s}. Karena gambar tidak terbaca, isi panahnya dituliskan sebagai berikut.</p>
        <ul>
          <li>Diagram 1: 5 → p, 9 → q, 13 → r, 17 → s.</li>
          <li>Diagram 2: 5 → p, 5 → q, 9 → q, 13 → r, 17 → s.</li>
          <li>Diagram 3: 5 → p, 9 → q, 13 → r, sedangkan 17 tidak memiliki pasangan.</li>
        </ul>`,
      question: 'Berdasarkan diagram tersebut, isilah tabel berikut!',
      rows: [
        { t: 'Diagram 1', a: 0 },
        { t: 'Diagram 2', a: 1 },
        { t: 'Diagram 3', a: 1 }
      ],
      explain: 'Diagram 1 memasangkan setiap anggota A tepat satu kali. Diagram 2 bukan fungsi karena 5 punya dua pasangan. Diagram 3 bukan fungsi karena 17 tidak punya pasangan.',
      tambahan: false
    },
    {
      n: 3, type: 'pg', tambahan: false,
      stimulus: `<p><b>Jajanan Tradisional</b><br>Jajanan tradisional merupakan jajanan khas dari nenek moyang dan biasanya dipakai untuk acara atau tradisi. Seiring berjalannya waktu, jajanan tradisional bisa ditemukan setiap waktu tidak hanya pada acara tertentu saja. Berikut merupakan harga jajanan tradisional kue putu mayang dan kue pancong pada suatu bazar makanan.</p>
        <p>Keterangan gambar: tumpukan pertama berisi 3 kotak kue putu mayang dan 2 kotak kue pancong dengan harga Rp58.000,00. Tumpukan kedua berisi 2 kotak kue putu mayang dan 3 kotak kue pancong dengan harga Rp62.000,00.</p>`,
      question: 'Harga 3 kotak Kue Putu Mayang dan 1 kotak Kue Pancong adalah ...',
      options: ['Rp10.000', 'Rp14.000', 'Rp44.000', 'Rp52.000'],
      answer: 2,
      explain: '3p + 2k = 58.000 dan 2p + 3k = 62.000. Kalikan pertama dengan 3 dan kedua dengan 2: 9p + 6k = 174.000 dan 4p + 6k = 124.000, sehingga 5p = 50.000 dan p = 10.000. Lalu 3(10.000) + 2k = 58.000, jadi k = 14.000. Maka 3p + k = 30.000 + 14.000 = 44.000.',
      tambahan: false
    },
    {
      n: 4, type: 'pg', tambahan: false,
      stimulus: `<p>Rino, Tiko dan Bayu pergi ke toko alat tulis membeli buku dan pulpen untuk keperluan sekolah. Rino membeli 4 buku tulis dan 3 pulpen. Tiko membeli dua kali lipat dari masing-masing jumlah buku dan pulpen yang dibeli Rino. Bayu membeli tiga kali lipat dari masing-masing jumlah buku dan pulpen yang dibeli Rino.</p>`,
      question: 'Jika harga buku disimbolkan oleh "x" dan harga pulpen disimbolkan oleh "y", maka kalimat matematika yang menyatakan total harga yang harus dibayarkan oleh ketiga anak tersebut adalah ...',
      options: ['24x + 18y', '20x + 15y', '12x + 9y', '4x + 3y'],
      answer: 0,
      explain: 'Buku: 4 + 8 + 12 = 24. Pulpen: 3 + 6 + 9 = 18. Jadi totalnya 24x + 18y.',
      tambahan: false
    },
    {
      n: 5, type: 'pg', tambahan: false,
      stimulus: `<p>Suatu kompleks X memiliki kebiasaan yang unik yaitu membuat pagar rumah dengan desain yang unik dan sama. Pagar disusun dengan 2 bentuk batu bata yaitu segitiga dan persegi panjang. Susunannya: tingkat 1 = 1 segitiga di atas 2 persegi panjang; tingkat 2 = 2 segitiga di atas 3 persegi panjang; tingkat 3 = 3 segitiga di atas 4 persegi panjang; dan seterusnya.</p>`,
      question: 'Jika seorang warga akan membuat sampai 10 tingkat, banyaknya batu bata (segitiga maupun persegi panjang) yang dibutuhkan pada tingkat ke-10 adalah ... batu bata',
      options: ['10', '11', '20', '21'],
      answer: 3,
      explain: 'Tingkat ke-n memakai n segitiga dan n + 1 persegi panjang. Tingkat 10 membutuhkan 10 + 11 = 21 batu bata.',
      tambahan: false
    },
    {
      n: 6, type: 'table', cols: ['Benar', 'Salah'], tambahan: false,
      stimulus: '<p>Dua pagar akan dibuat sama persis dengan masing-masing 9 tingkat. Setiap tingkat ke-n tersusun dari n batu bata segitiga dan n + 1 batu bata persegi panjang. Persediaan yang ada sebanyak 60 batu bata segitiga dan 80 batu bata persegi panjang.</p>',
      question: 'Isilah tabel berikut sesuai dengan pernyataan di atas!',
      rows: [
        { t: 'Diperlukan tambahan 15 batu bata segitiga', a: 1 },
        { t: 'Diperlukan tambahan 28 batu bata persegi panjang', a: 0 },
        { t: 'Diperlukan tambahan total 43 batu bata segitiga maupun persegi panjang', a: 1 }
      ],
      explain: 'Satu pagar 9 tingkat memerlukan 45 segitiga dan 54 persegi panjang. Dua pagar: 90 segitiga dan 108 persegi panjang. Tambahan yang perlu: 30 segitiga dan 28 persegi panjang, totalnya 58.',
      tambahan: false
    },
    {
      n: 7, type: 'pg', tambahan: false,
      stimulus: '<p>Perhatikan jaring-jaring prisma segitiga berikut. Keterangan gambar: terdapat empat bagian bernomor 1 (persegi panjang), 2 (segitiga), 3 (persegi panjang), dan 4 (persegi). Sisi tutup prisma adalah sisi ABC, dengan titik A berada pada tepi sisi nomor 1.</p>',
      question: 'Rusuk AC pada sisi tutup akan berhimpit dengan rusuk pada sisi tegak prisma nomor ...',
      options: ['1', '2', '3', '4'],
      answer: 2,
      explain: 'Pada jaring-jaring prisma segitiga, rusuk AC berhimpit dengan rusuk sisi tegak yang terletak di antara sisi AB dan BC, yaitu sisi tegak nomor 3.',
      tambahan: false
    },
    {
      n: 8, type: 'pg', tambahan: false,
      stimulus: '<p>Perhatikan gambar berikut. Keterangan: sebuah segitiga memiliki sudut 68° pada sudut kiri atas dan 46° pada sudut kanan. Dua garis sejajar p dan q memotong segitiga tersebut, dan sudut b° berada pada perpotongan garis p dengan sisi atas segitiga.</p>',
      question: 'Nilai b adalah ...',
      options: ['46', '68', '112', '134'],
      answer: 2,
      explain: 'Sudut segitiga yang lain = 180° − 68° − 46° = 66°. Karena garis p sejajar q, sudut b berpelurus dengan sudut 68° pada posisi dalam berseberangan, sehingga b = 180° − 68° = 112°.',
      tambahan: false
    },
    {
      n: 9, type: 'pg', tambahan: false,
      stimulus: `<p><b>Pagar Tangga</b><br>Pak Anton baru saja membangun rumah. Salah satu bagian yang belum terpasang adalah pagar tangga. Gambar garis putus-putus merupakan rancangan untuk pagar tangga. Setiap anak tangga memiliki tinggi yang sama yaitu 25 cm, sedangkan panjang dasar tangga 150 cm dengan 8 anak tangga.</p>
        <p>Tersedia 4 jenis bahan pagar tangga: kayu jati 6 meter, meranti 4 meter, besi 5,5 meter, dan aluminium 4,5 meter.</p>`,
      question: 'Bahan pagar apa yang harus diambil Pak Anton supaya cukup dan mempunyai sisa paling sedikit?',
      options: ['Kayu Jati', 'Meranti', 'Besi', 'Alumunium'],
      answer: 3,
      explain: 'Tinggi total tangga = 8 × 25 cm = 200 cm. Panjang pagar = √(150² + 200²) = √62.500 = 250 cm = 2,5 m. Bahan terpendek yang masih cukup adalah aluminium 4,5 m, sehingga sisanya paling sedikit.',
      tambahan: false
    },
    {
      n: 10, type: 'pg', tambahan: false,
      stimulus: '<p>Naura menggunakan operator seluler "Nusantara Mobile". Naura menuliskan pilihan paket kuota dan harganya dalam bentuk pasangan berurutan: {(5, 14.000), (10, 23.000), (20, 41.000), (25, 50.000)}. Pasangan (x, harga) berarti paket x GB dikenakan harga sebesar harga tersebut.</p>',
      question: 'Jika x adalah paket kuota dalam GB, rumus fungsi f(x) yang menyatakan harga kuota internet adalah ...',
      options: ['f(x) = 2.000x + 4.000', 'f(x) = 2.000x + 1.000', 'f(x) = 1.800x + 9.000', 'f(x) = 1.800x + 5.000'],
      answer: 3,
      explain: 'Selisih harga tiap kenaikan 5 GB adalah 9.000, sehingga gradiennya 1.800. Dengan (5, 14.000): 14.000 = 1.800(5) + c, maka c = 5.000. Jadi f(x) = 1.800x + 5.000.',
      tambahan: false
    },
    {
      n: 11, type: 'pg', tambahan: false,
      stimulus: '<p>Perhatikan gambar berikut. Keterangan: pada bidang koordinat terdapat segitiga PQR di kiri sumbu-y dan segitiga KLM di kanan sumbu-y. Titik Q berimpit dengan titik K. Segitiga PQR ditranslasi oleh T(−4, −2).</p>',
      question: 'Bayangan segitiga PQR dan segitiga KLM akan saling ...',
      options: ['Tegak lurus', 'Berpotongan', 'Sejajar', 'Berhimpit'],
      answer: 2,
      explain: 'Translasi tidak mengubah bentuk dan ukuran, hanya memindahkan. Sisi-sisi bayangan tetap sejajar dengan sisi segitiga asal dan segitiga KLM yang kongruen.',
      tambahan: false
    },
    {
      n: 12, type: 'pg', tambahan: false,
      stimulus: '<p>Perhatikan gambar juring pada lingkaran berikut. Keterangan: lingkaran berjari-jari 14 cm. Juring B bersudut 90° (seperempat lingkaran), juring A bersudut 70°, dan juring C bersudut 35°.</p>',
      question: 'Pernyataan berikut yang benar terkait luas juring A, B dan C adalah ...',
      options: [
        'Luas juring B dua kali dari luas juring C',
        'Luas juring C setengah dari luas juring A',
        'Luas juring A tiga kali dari luas juring B',
        'Luas juring B dua kali dari luas juring A'
      ],
      answer: 1,
      explain: 'Luas juring sebanding dengan sudutnya. Sudut C 35° tepat setengah dari sudut A 70°, jadi luas juring C setengah luas juring A.',
      tambahan: false
    },
    {
      n: 13, type: 'pg', tambahan: false,
      stimulus: '<p>Perhatikan dua persegi panjang yang sebangun. Persegi panjang besar memiliki sisi tegak 20 cm dan luas 320 cm², sedangkan persegi panjang kecil memiliki sisi tegak 5 cm.</p>',
      question: 'Keliling persegi panjang yang kecil adalah ... cm',
      options: ['9', '18', '20', '72'],
      answer: 1,
      explain: 'Lebar persegi panjang besar = 320 ÷ 20 = 16 cm. Faktor skala 5/20 = 1/4, sehingga lebar kecil 4 cm. Kelilingnya 2(5 + 4) = 18 cm.',
      tambahan: false
    },
    {
      n: 14, type: 'multi', tambahan: false,
      stimulus: '<p>Pak Dodi adalah pemasok minyak goreng curah. Minyak jenis B ditampung pada tangki berukuran 8 dm × 2,2 m × 1 m. Tangki berisi penuh, lalu sebagian dikemas ke 300 botol berukuran 2 liter. Sisa minyak dikemas ke jeriken berukuran 5 liter.</p>',
      question: 'Jawaban yang benar sesuai informasi di atas adalah ...',
      options: [
        'Jumlah kemasan botol lebih banyak daripada jeriken',
        'Total kemasan botol dan jeriken adalah 532',
        'Sisa minyak di tangki cukup untuk mengisi 1 kemasan botol',
        'Banyak kemasan jeriken yang terisi minyak adalah 332'
      ],
      answer: [0, 1],
      explain: 'Volume tangki = 0,8 × 2,2 × 1 = 1,76 m³ = 1.760 liter. Botol mengisi 600 liter, sisa 1.160 liter = 232 jeriken. Jadi botol (300) lebih banyak dari jeriken (232), dan totalnya 532.',
      tambahan: false
    },
    {
      n: 15, type: 'table', cols: ['Mungkin', 'Tidak Mungkin'], tambahan: false,
      stimulus: '<p>Tangki minyak jenis A berisi 960 liter dan tangki jenis B berisi 1.760 liter. Semua minyak terjual kepada Pak Angga dan Bu Susi tanpa sisa. Jeriken Pak Angga berukuran 25 liter, jeriken Bu Susi berukuran 30 liter.</p>',
      question: 'Tentukan mungkin atau tidak mungkin pada pernyataan berikut!',
      rows: [
        { t: 'Bu Susi membawa pulang sebanyak 32 jeriken minyak jenis A dan 22 jeriken minyak jenis B', a: 0 },
        { t: 'Pak Angga membawa pulang sebanyak 24 jeriken minyak jenis A dan 44 jeriken minyak jenis B', a: 0 },
        { t: 'Bu Susi membawa 21 jeriken minyak jenis A dan Pak Angga membawa 40 jeriken minyak jenis B', a: 1 }
      ],
      explain: 'Total minyak 2.720 liter. Pernyataan 1 memakai 1.460 liter, sisa 1.260 liter = 42 jeriken 30 liter (mungkin). Pernyataan 2 memakai 1.920 liter, sisa 800 liter = 32 jeriken 25 liter (mungkin). Pernyataan 3 memakai 1.725 liter, sisa 995 liter yang tidak habis dibagi 25 atau 30 liter (tidak mungkin).',
      tambahan: false
    },
    {
      n: 16, type: 'pg', tambahan: false,
      stimulus: '<p>Suatu paket terdiri dari 20 kotak misteri berisi patung figur Saka dan Kirana. Dalam satu paket terdapat 8 figur Saka dan 12 figur Kirana. Riana mengambil 3 kotak misteri secara acak dan terambil 1 Saka dan 2 Kirana. Kemudian, Santi mengambil 1 kotak misteri dari sisa paket.</p>',
      question: 'Peluang terambilnya Saka oleh Santi adalah ...',
      options: ['7/20', '8/20', '8/17', '7/17'],
      answer: 3,
      explain: 'Setelah 3 kotak diambil (1 Saka, 2 Kirana), sisa 17 kotak berisi 7 Saka dan 10 Kirana. Peluang Saka = 7/17.',
      tambahan: false
    },
    {
      n: 17, type: 'pg', tambahan: false,
      stimulus: '<p>Perhatikan operasi bilangan berpangkat berikut: (7³ × 7⁻⁴) ÷ 7²</p>',
      question: 'Hasil dari operasi bilangan berpangkat tersebut adalah ...',
      options: ['7⁻⁹', '7⁻⁶', '7⁻³', '7'],
      answer: 2,
      explain: '7³ × 7⁻⁴ = 7⁻¹. Lalu 7⁻¹ ÷ 7² = 7⁻¹⁻² = 7⁻³.',
      tambahan: false
    },
    {
      n: 18, type: 'pg', tambahan: false,
      stimulus: '<p>Perhatikan gambar berikut. Keterangan: garis lurus AB dengan titik Q di tengahnya, ditarik sinar QP sehingga ∠PQA = 72° dan ∠PQB = (4x + 12)°.</p>',
      question: 'Besar sudut PQB adalah ... derajat',
      options: ['24', '108', '96', '86'],
      answer: 1,
      explain: '∠PQA dan ∠PQB berpelurus: 72 + (4x + 12) = 180, sehingga 4x = 96 dan x = 24. Maka ∠PQB = 4(24) + 12 = 108°.',
      tambahan: false
    },
    {
      n: 19, type: 'table', cols: ['Benar', 'Salah'], tambahan: false,
      stimulus: '<p>Diketahui bentuk aljabar: 2ab − b² + 3a²b + ab² − 5</p>',
      question: 'Berdasarkan informasi tersebut, manakah pernyataan berikut yang benar?',
      rows: [
        { t: 'Terdapat dua variabel yaitu a dan b', a: 0 },
        { t: 'Konstanta pada bentuk aljabar itu adalah 5', a: 1 },
        { t: 'Bilangan 2, −1, 3, dan 1 merupakan koefisien', a: 0 }
      ],
      explain: 'Variabelnya a dan b. Konstantanya −5, bukan 5. Angka 2, −1, 3, dan 1 adalah koefisien dari masing-masing suku.',
      tambahan: false
    },
    {
      n: 20, type: 'pg', tambahan: false,
      stimulus: `<p>Karet dan kelapa sangat penting bagi banyak industri di dunia, mulai dari ban hingga makanan. Berikut data produksi karet dan kelapa di Indonesia (dalam juta ton).</p>
        <table><thead><tr><th>Tahun</th><th>Karet</th><th>Kelapa</th></tr></thead><tbody>
          <tr><td>2018</td><td>3,68</td><td>2,83</td></tr>
          <tr><td>2019</td><td>3,50</td><td>2,83</td></tr>
          <tr><td>2020</td><td>3,30</td><td>2,81</td></tr>
          <tr><td>2021</td><td>3,12</td><td>2,85</td></tr>
          <tr><td>2022</td><td>2,95</td><td>2,86</td></tr>
          <tr><td>2023</td><td>2,75</td><td>2,90</td></tr>
          <tr><td>2024</td><td>2,60</td><td>2,89</td></tr>
        </tbody></table>
        <p>Semua pilihan jawaban berupa diagram garis berjudul "Data Produksi Karet dan Kelapa Tahun 2018-2024".</p>`,
      question: 'Berdasarkan data di atas, diagram garis manakah yang menunjukkan penyajian data dari salah satu hasil produksi karet atau kelapa di Indonesia?',
      options: [
        'Garis turun terus dari sekitar 6,5 (2018) ke sekitar 5,5 (2024) dengan sumbu y 5,4–6,6.',
        'Mulai sekitar 6,5 (2018), turun tajam ke sekitar 5,5 (2019), lalu naik bertahap ke sekitar 6,3 (2024).',
        'Bentuk sama seperti pilihan B, hanya gambarnya lebih buram.',
        'Garis turun bertahap dari sekitar 3,7 (2018) ke sekitar 2,6 (2024) dengan sumbu y 0–4.'
      ],
      answer: 3,
      explain: 'Produksi karet turun bertahap dari 3,68 menjadi 2,60 juta ton, sesuai pilihan D. Pilihan lain memakai angka yang tidak ada pada tabel.',
      tambahan: false
    },

    /* ---------- Soal tambahan 21–25 (bergaya TKA) ---------- */
    {
      n: 21, type: 'pg', tambahan: true,
      question: 'Hasil dari (2⁵ × 2⁻³) ÷ 2⁴ adalah ...',
      options: ['1/4', '1/2', '2', '4'],
      answer: 0,
      explain: '2⁵ × 2⁻³ = 2². Lalu 2² ÷ 2⁴ = 2⁻² = 1/4.'
    },
    {
      n: 22, type: 'pg', tambahan: true,
      stimulus: '<p>Di koperasi sekolah, 2 buku dan 3 pensil dijual seharga Rp26.000, sedangkan 3 buku dan 2 pensil seharga Rp34.000.</p>',
      question: 'Harga satu buku adalah ...',
      options: ['Rp8.000', 'Rp9.000', 'Rp10.000', 'Rp12.000'],
      answer: 2,
      explain: '2b + 3p = 26.000 dan 3b + 2p = 34.000. Kalikan pertama dengan 3 dan kedua dengan 2: 6b + 9p = 78.000 dan 6b + 4p = 68.000, jadi 5p = 10.000 dan p = 2.000. Maka 2b + 6.000 = 26.000 sehingga b = 10.000.'
    },
    {
      n: 23, type: 'table', cols: ['Benar', 'Salah'], tambahan: true,
      stimulus: '<p>Sebuah segitiga memiliki sudut (2x + 10)°, (3x − 20)°, dan (x + 40)°.</p>',
      question: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
      rows: [
        { t: 'Nilai x adalah 25.', a: 0 },
        { t: 'Sudut terbesar pada segitiga tersebut adalah 65°.', a: 0 },
        { t: 'Segitiga tersebut merupakan segitiga sama sisi.', a: 1 }
      ],
      explain: 'Jumlah sudut 180°: 6x + 30 = 180, jadi x = 25. Sudutnya 60°, 55°, dan 65°, sehingga bukan segitiga sama sisi.'
    },
    {
      n: 24, type: 'pg', tambahan: true,
      stimulus: '<p>Nilai lima ulangan Rani adalah 7, 8, 6, 9, dan 10.</p>',
      question: 'Rata-rata nilai ulangan Rani adalah ...',
      options: ['7', '8', '8,5', '9'],
      answer: 1,
      explain: 'Jumlah nilai 40 dibagi 5 sama dengan 8.'
    },
    {
      n: 25, type: 'multi', tambahan: true,
      stimulus: '<p>Sebuah dadu bersisi enam dilempar satu kali.</p>',
      question: 'Pernyataan yang benar tentang peluang hasil pelemparan dadu tersebut adalah ...',
      options: [
        'Peluang muncul bilangan prima adalah 1/2.',
        'Peluang muncul angka lebih dari 4 adalah 1/3.',
        'Peluang muncul angka 7 adalah 0.',
        'Peluang muncul bilangan genap adalah 1/3.'
      ],
      answer: [0, 1, 2],
      explain: 'Bilangan prima pada dadu: 2, 3, 5 → 3/6 = 1/2. Lebih dari 4: 5, 6 → 2/6 = 1/3. Angka 7 tidak ada → peluang 0. Bilangan genap ada 3 → peluangnya 1/2, bukan 1/3.'
    }
  ]
},

/* ================================================================
   NASKAH 4 · PERSIAPAN 1 TKA — MATEMATIKA
   Catatan: beberapa angka pada naskah asli tidak terbaca. Bagian
   yang hilang dilengkapi dengan angka yang konsisten dengan pilihan
   jawaban yang tercetak.
   ================================================================ */
{
  id: 'persiapan-mtk',
  nama: 'Persiapan 1 TKA 2026/2027 · Matematika',
  subject: 'mtk',
  tanggal: 'Senin, 26 Oktober 2026',
  asal: 'SMP Taruna Bakti Bandung',
  catatan: 'Naskah asli, urutan tidak diacak. Angka yang tidak terbaca pada naskah dilengkapi agar soal tetap dapat dikerjakan. Soal 21–25 ditambahkan bergaya TKA untuk melengkapi 25 soal.',
  soal: [
    {
      n: 1, type: 'multi', tambahan: false,
      stimulus: '<p>Sebuah resep adonan membutuhkan 1½ cangkir tepung untuk membuat 10 buah donat. Ibu ingin mengubah jumlah donat yang dibuat.</p>',
      question: 'Manakah takaran berikut yang sesuai dengan perbandingan resep asli?',
      options: [
        '3 cangkir tepung terigu untuk membuat 20 donat',
        '3/4 cangkir tepung terigu untuk membuat 5 donat',
        '4 cangkir tepung terigu untuk membuat 30 donat',
        '4½ cangkir tepung terigu untuk membuat 30 donat'
      ],
      answer: [0, 1, 3],
      explain: 'Resep asli 1,5 cangkir untuk 10 donat sama dengan 0,15 cangkir per donat. Pilihan a (3/20), b (0,75/5), dan d (4,5/30) bernilai 0,15. Pilihan c bernilai 0,133.',
      tambahan: false
    },
    {
      n: 2, type: 'pg', tambahan: false,
      stimulus: `<p><b>Program Sembako Murah "Berkah" untuk Masyarakat</b></p>
        <p>Toko "Berkah" mendapat kepercayaan dari pemerintah untuk menyalurkan program sembako murah bagi masyarakat kurang mampu. Toko menyediakan dua jenis paket sembako:</p>
        <ul><li>Paket A: 3 kg beras + 2 kg gula = Rp65.000</li><li>Paket B: 5 kg beras + 4 kg gula = Rp115.000</li></ul>`,
      question: 'Jika harga 1 kg beras = x dan 1 kg gula = y, sistem persamaan linear yang sesuai adalah ...',
      options: [
        '3x + 2y = 65.000 dan 5x + 4y = 115.000',
        '2x + 3y = 65.000 dan 4x + 5y = 115.000',
        '3x + 2y = 115.000 dan 5x + 4y = 65.000',
        '2x + 3y = 115.000 dan 4x + 5y = 65.000'
      ],
      answer: 0,
      explain: 'Paket A berisi 3 kg beras dan 2 kg gula seharga 65.000, paket B berisi 5 kg beras dan 4 kg gula seharga 115.000.',
      tambahan: false
    },
    {
      n: 3, type: 'multi', tambahan: false,
      stimulus: '<p>Diketahui 3x + 2y = 65.000 dan 5x + 4y = 115.000. Harga pasar beras Rp18.000/kg dan gula Rp16.000/kg.</p>',
      question: 'Manakah pernyataan berikut yang BENAR berdasarkan analisis harga di toko "Berkah"?',
      options: [
        'Harga 1 kg beras di toko "Berkah" lebih murah Rp3.000 dari harga pasar.',
        'Harga 1 kg gula di toko "Berkah" lebih murah Rp2.000 dari harga pasar.',
        'Dengan membeli Paket A, masyarakat menghemat Rp7.000 dibanding membeli satuan di pasar.',
        'Dengan membeli Paket B, masyarakat menghemat Rp19.000 dibanding membeli satuan di pasar.',
        'Jika pemerintah ingin memberikan subsidi Rp5.000 per paket A, harga yang dibayar masyarakat menjadi Rp60.000.'
      ],
      answer: [0, 4],
      explain: 'Dari sistem diperoleh x = 15.000 dan y = 10.000. Beras lebih murah 3.000 dari pasar (benar), gula lebih murah 6.000 (bukan 2.000). Paket A di pasar 86.000 sehingga hemat 21.000; Paket B di pasar 154.000 sehingga hemat 39.000. Subsidi 5.000 membuat Paket A menjadi 60.000 (benar).',
      tambahan: false
    },
    {
      n: 4, type: 'table', cols: ['Benar', 'Salah'], tambahan: false,
      stimulus: '<p>Harga beras di toko "Berkah" Rp15.000/kg dan gula Rp10.000/kg, sedangkan harga pasar beras Rp18.000/kg dan gula Rp16.000/kg.</p>',
      question: 'Tentukan Benar atau Salah pada setiap pernyataan berikut.',
      rows: [
        { t: 'Harga beras di toko "Berkah" lebih murah dari harga pasar.', a: 0 },
        { t: 'Harga gula di toko "Berkah" lebih murah dari harga pasar.', a: 0 },
        { t: 'Program sembako murah ini berhasil menekan harga di bawah harga pasar.', a: 0 }
      ],
      explain: 'Kedua harga di toko lebih rendah daripada harga pasar, sehingga program berhasil menekan harga.',
      tambahan: false
    },
    {
      n: 5, type: 'pg', tambahan: false,
      stimulus: '<p>Pak Andi memiliki lahan jagung berbentuk persegi panjang dengan panjang (x + 2) meter dan lebar (3x² − 2x + 1) meter.</p>',
      question: 'Bentuk aljabar yang menyatakan luas lahan jagung adalah ...',
      options: [
        '3x³ − 2x² + x + 6x² − 4x + 2',
        '3x³ + 6x² − x + 2',
        '3x³ + 4x² − 3x + 2',
        '3x³ − 2x² + 7x − 2'
      ],
      answer: 2,
      explain: 'Luas = (x + 2)(3x² − 2x + 1) = 3x³ − 2x² + x + 6x² − 4x + 2 = 3x³ + 4x² − 3x + 2.',
      tambahan: false
    },
    {
      n: 6, type: 'table', cols: ['Benar', 'Salah'], tambahan: false,
      stimulus: '<p>Luas lahan jagung adalah (x + 2)(3x² − 2x + 1) m² dan luas lahan kedelai adalah (x² + 9x + 2) m². Diketahui x = 5.</p>',
      question: 'Tentukan Benar atau Salah pada setiap pernyataan berikut.',
      rows: [
        { t: 'Luas lahan jagung adalah 462 m².', a: 0 },
        { t: 'Luas lahan kedelai adalah 72 m².', a: 0 },
        { t: 'Total luas lahan gabungan adalah 520 m².', a: 1 }
      ],
      explain: 'Jagung: (7)(75 − 10 + 1) = 7 × 66 = 462. Kedelai: 25 + 45 + 2 = 72. Totalnya 534 m², bukan 520 m².',
      tambahan: false
    },
    {
      n: 7, type: 'multi', tambahan: false,
      stimulus: '<p>Pak Andi mencatat hasil panen jagung selama 5 tahun berturut-turut: 25 ton, 30 ton, 35 ton, 40 ton, dan 45 ton. Peningkatan hasil panen setiap tahun mengikuti pola yang tetap.</p>',
      question: 'Manakah pernyataan berikut yang BENAR?',
      options: [
        'Hasil panen tahun ke-10 adalah 70 ton.',
        'Hasil panen tahun ke-15 adalah 90 ton.',
        'Pola peningkatan hasil panen setiap tahun membentuk barisan geometri.',
        'Total hasil panen selama 10 tahun adalah 475 ton.'
      ],
      answer: [0, 3],
      explain: 'Barisan aritmetika dengan a = 25 dan b = 5. U₁₀ = 25 + 9(5) = 70 ton. U₁₅ = 25 + 14(5) = 95 ton. Jumlah 10 suku = 10/2 × (25 + 70) = 475 ton.',
      tambahan: false
    },
    {
      n: 8, type: 'pg', tambahan: false,
      stimulus: '<p>Hasil dari operasi bilangan berpangkat berikut adalah ...<br>(7³ × 7⁻⁴) ÷ 7²</p>',
      question: 'Nilai dari operasi tersebut adalah ...',
      options: ['7⁻⁹', '7⁻⁶', '7⁻³', '7'],
      answer: 2,
      explain: '7³ × 7⁻⁴ = 7⁻¹, lalu dibagi 7² menjadi 7⁻³.',
      tambahan: false
    },
    {
      n: 9, type: 'multi', tambahan: false,
      stimulus: '<p>Perusahaan ekspedisi "Lynk Express" mengenakan biaya administrasi awal Rp10.000 dan biaya Rp5.000 per kg. Rumus total biaya = biaya administrasi + (berat × biaya per kg).</p>',
      question: 'Pilih pernyataan yang benar pada setiap pernyataan berikut.',
      options: [
        'Total biaya pengiriman untuk paket 8 kg adalah Rp50.000.',
        'Jika tanpa biaya administrasi, biaya pengiriman untuk 8 kg adalah Rp40.000.',
        'Total biaya pengiriman untuk paket 12 kg adalah Rp70.000.',
        'Total biaya pengiriman untuk paket 12 kg adalah Rp100.000.'
      ],
      answer: [0, 1, 2],
      explain: '8 kg: 10.000 + 40.000 = 50.000. Tanpa administrasi: 40.000. 12 kg: 10.000 + 60.000 = 70.000.',
      tambahan: false
    },
    {
      n: 10, type: 'pg', tambahan: false,
      stimulus: '<p>Pemerintah Desa Maju Jaya merencanakan renovasi gedung serbaguna yang ditargetkan selesai dalam 24 hari dengan melibatkan 20 pekerja. Karena keterbatasan anggaran, kontraktor hanya bisa merekrut 16 pekerja.</p>',
      question: 'Berapa hari keterlambatan yang terjadi akibat berkurangnya jumlah pekerja?',
      options: ['6 hari', '8 hari', '10 hari', '12 hari'],
      answer: 0,
      explain: 'Total pekerjaan = 20 × 24 = 480 hari-pekerja. Dengan 16 pekerja: 480 ÷ 16 = 30 hari. Keterlambatan 30 − 24 = 6 hari.',
      tambahan: false
    },
    {
      n: 11, type: 'pg', tambahan: false,
      stimulus: '<p>Sebuah drone pengiriman dibekali baterai 5.000 mAh. Setiap menit penerbangan, baterai berkurang rata-rata 45 mAh. Drone terbang selama 90 menit.</p>',
      question: 'Estimasi sisa kapasitas baterai yang paling mendekati adalah ...',
      options: ['950 mAh', '1.050 mAh', '1.150 mAh', '1.250 mAh'],
      answer: 0,
      explain: 'Pemakaian = 45 × 90 = 4.050 mAh. Sisa = 5.000 − 4.050 = 950 mAh.',
      tambahan: false
    },
    {
      n: 12, type: 'pg', tambahan: false,
      stimulus: '<p>Ardi dan Ari merencanakan pembangunan jembatan yang dapat diselesaikan oleh 12 pekerja dalam 20 hari. Karena deadline mendesak, kontraktor ingin menyelesaikan proyek dalam 15 hari. Produktivitas semua pekerja dianggap sama.</p>',
      question: 'Berapa tambahan pekerja yang harus direkrut?',
      options: ['4 orang', '6 orang', '8 orang', '16 orang'],
      answer: 0,
      explain: 'Total pekerjaan = 12 × 20 = 240. Untuk 15 hari: 240 ÷ 15 = 16 pekerja. Tambahan = 16 − 12 = 4 orang.',
      tambahan: false
    },
    {
      n: 13, type: 'pg', tambahan: false,
      stimulus: '<p>Sebuah pabrik roti beroperasi 24 jam dengan tiga kelompok pekerja: Shift A bekerja 4 jam lalu istirahat 2 jam, Shift B bekerja 3 jam lalu istirahat 1 jam, dan Shift C bekerja 6 jam lalu istirahat 3 jam. Ketiga shift memulai siklusnya bersamaan pada pukul 08.00.</p>',
      question: 'Pada pukul berapa ketiga shift akan memulai siklus baru secara bersamaan lagi?',
      options: ['Pukul 14.00', 'Pukul 16.00', 'Pukul 20.00', 'Pukul 22.00'],
      answer: 2,
      explain: 'Satu siklus A 6 jam, B 4 jam, dan C 9 jam. KPK dari 6, 4, dan 9 adalah 36 jam. Pukul 08.00 + 36 jam = pukul 20.00 keesokan harinya.',
      tambahan: false
    },
    {
      n: 14, type: 'table', cols: ['Benar', 'Salah'], tambahan: false,
      stimulus: '<p>Jarak Bumi ke Matahari sekitar 150.000.000 km. Cahaya merambat dengan kecepatan 3 × 10⁵ km/detik.</p>',
      question: 'Tentukan kebenaran pernyataan berikut mengenai waktu tempuh cahaya Matahari ke Bumi!',
      rows: [
        { t: 'Waktu tempuh cahaya adalah 500 detik.', a: 0 },
        { t: 'Dalam notasi ilmiah, waktu tempuhnya adalah 5 × 10³ detik.', a: 1 },
        { t: 'Jika kecepatan cahaya menjadi setengahnya, waktu tempuhnya menjadi 1.000 detik.', a: 0 }
      ],
      explain: 't = 150.000.000 ÷ 300.000 = 500 detik = 5 × 10² detik, bukan 5 × 10³. Jika kecepatan menjadi setengah, waktu menjadi dua kali lipat (1.000 detik).',
      tambahan: false
    },
    {
      n: 15, type: 'multi', tambahan: false,
      stimulus: '<p>Sebuah kereta api bergerak dari Stasiun A menuju Stasiun B. Pada peta digital berskala 1:250.000, jarak pada peta 8 cm. Kereta berangkat pukul 06.30 dan tiba pukul 07.06, tetapi berhenti 4 menit karena perbaikan rel.</p>',
      question: 'Manakah pernyataan berikut yang BENAR tentang perjalanan kereta tersebut?',
      options: [
        'Jarak sebenarnya antara Stasiun A dan Stasiun B adalah 20 km.',
        'Total waktu perjalanan kereta adalah 40 menit.',
        'Waktu bergerak kereta (tanpa berhenti) adalah 32 menit.',
        'Kecepatan rata-rata kereta saat bergerak adalah 37,5 km/jam.',
        'Jika tidak berhenti, kereta akan tiba pukul 07.02.'
      ],
      answer: [0, 2, 3, 4],
      explain: 'Jarak = 8 × 250.000 = 2.000.000 cm = 20 km. Total waktu 06.30–07.06 = 36 menit (bukan 40). Waktu bergerak 36 − 4 = 32 menit. Kecepatan = 20 ÷ (32/60) = 37,5 km/jam. Tanpa berhenti tiba 06.30 + 32 menit = 07.02.',
      tambahan: false
    },
    {
      n: 16, type: 'multi', tambahan: false,
      stimulus: '<p>Iklan GadgetZone menawarkan smartphone seharga Rp2.500.000,00 dengan dua promo. Promo A: diskon langsung 15%. Promo B: cashback Rp300.000 yang diberikan setelah pembelian.</p>',
      question: 'Manakah pernyataan berikut yang BENAR mengenai strategi pembelian Rina?',
      options: [
        'Jika memilih Promo A, Rina membayar Rp2.125.000,00.',
        'Jika memilih Promo B, Rina membayar Rp2.200.000,00.',
        'Promo A lebih menguntungkan daripada Promo B sebesar Rp75.000,00.'
      ],
      answer: [0, 1, 2],
      explain: 'Promo A: 85% × 2.500.000 = 2.125.000. Promo B: 2.500.000 − 300.000 = 2.200.000. Selisih keduanya 75.000.',
      tambahan: false
    },
    {
      n: 17, type: 'pg', tambahan: false,
      stimulus: '<p>Seorang petani hidroponik mengamati pertumbuhan tinggi tanaman selada. Minggu ke-1 tinggi 5 cm, dan tumbuh 3 cm setiap minggu berikutnya.</p>',
      question: 'Tinggi tanaman pada minggu ke-6 adalah ...',
      options: ['14 cm', '16 cm', '18 cm', '20 cm'],
      answer: 3,
      explain: 'U₆ = 5 + (6 − 1) × 3 = 5 + 15 = 20 cm.',
      tambahan: false
    },
    {
      n: 18, type: 'pg', tambahan: false,
      stimulus: '<p>Seorang arsitek merancang taman berbentuk persegi panjang dengan panjang (2x + 3) meter dan lebar (x − 1) meter. Keliling taman 34 meter. Setelah selesai, dibuat jalur setapak selebar 1 meter di sekeliling luar taman.</p>',
      question: 'Berapakah luas total taman beserta jalur setapaknya?',
      options: ['70 m²', '80 m²', '90 m²', '100 m²'],
      answer: 2,
      explain: '34 = 2((2x + 3) + (x − 1)) = 6x + 4, sehingga x = 5. Panjang 13 m dan lebar 4 m. Dengan jalur 1 m: 15 m × 6 m = 90 m².',
      tambahan: false
    },
    {
      n: 19, type: 'pg', tambahan: false,
      stimulus: '<p>Seorang pustakawan menata buku dengan pola: rak 1 berisi 1 buku tebal dan 1 buku tipis, rak 2 berisi 2 buku tebal dan 2 buku tipis, rak 3 berisi 3 buku tebal dan 3 buku tipis, dan seterusnya.</p>',
      question: 'Jika pustakawan menata hingga rak ke-10, berapakah jumlah total buku yang ada pada rak ke-10?',
      options: ['10 buku', '11 buku', '20 buku', '21 buku'],
      answer: 2,
      explain: 'Rak ke-10 berisi 10 buku tebal + 10 buku tipis = 20 buku.',
      tambahan: false
    },
    {
      n: 20, type: 'pg', tambahan: false,
      stimulus: `<p><b>Mesin Tetas Telur</b><br>Mesin tetas telur membantu proses penetasan tanpa induk dengan lampu pijar dan motor untuk meratakan pemanasan. Penetasan berlangsung 18 hari sejak telur dimasukkan. Berikut usia telur di mesin saat ini.</p>
        <table><thead><tr><th>Usia Telur</th><th>Banyak Telur</th></tr></thead><tbody>
          <tr><td>2 hari</td><td>20</td></tr>
          <tr><td>4 hari</td><td>35</td></tr>
          <tr><td>6 hari</td><td>30</td></tr>
          <tr><td>8 hari</td><td>15</td></tr>
        </tbody></table>
        <p>Telur diletakkan secara acak di dalam mesin.</p>`,
      question: 'Jika dilakukan pengamatan khusus pada satu telur yang dipilih secara acak, peluang telur tersebut akan menetas dalam 10 hari ke depan adalah ...',
      options: ['3/20', '1/15', '1/5', '3/10'],
      answer: 0,
      explain: 'Total telur 100. Menetas dalam 10 hari berarti usia telur minimal 8 hari, yaitu 15 telur. Peluangnya 15/100 = 3/20.',
      tambahan: false
    },

    /* ---------- Soal tambahan 21–25 (bergaya TKA) ---------- */
    {
      n: 21, type: 'pg', tambahan: true,
      stimulus: '<p>Empat buku tulis dijual seharga Rp48.000,00.</p>',
      question: 'Harga tujuh buku tulis yang sama adalah ...',
      options: ['Rp72.000', 'Rp80.000', 'Rp84.000', 'Rp96.000'],
      answer: 2,
      explain: 'Harga satu buku 48.000 ÷ 4 = 12.000. Tujuh buku = 7 × 12.000 = 84.000.',
      tambahan: true
    },
    {
      n: 22, type: 'pg', tambahan: true,
      stimulus: '<p>Pada sebuah barisan aritmetika, suku ke-3 adalah 11 dan suku ke-7 adalah 23.</p>',
      question: 'Suku ke-10 barisan tersebut adalah ...',
      options: ['29', '32', '35', '38'],
      answer: 1,
      explain: 'Beda = (23 − 11) ÷ (7 − 3) = 3. Suku pertama = 11 − 2(3) = 5. U₁₀ = 5 + 9(3) = 32.',
      tambahan: true
    },
    {
      n: 23, type: 'table', cols: ['Benar', 'Salah'], tambahan: true,
      stimulus: '<p>Sebuah balok berukuran panjang 8 cm, lebar 5 cm, dan tinggi 4 cm.</p>',
      question: 'Tentukan Benar atau Salah untuk setiap pernyataan berikut!',
      rows: [
        { t: 'Volume balok tersebut adalah 160 cm³.', a: 0 },
        { t: 'Luas permukaan balok tersebut adalah 184 cm².', a: 0 },
        { t: 'Volume balok tersebut adalah 180 cm³.', a: 1 }
      ],
      explain: 'Volume = 8 × 5 × 4 = 160 cm³. Luas permukaan = 2(40 + 32 + 20) = 184 cm².',
      tambahan: true
    },
    {
      n: 24, type: 'multi', tambahan: true,
      stimulus: '<p>Diketahui sistem persamaan x + y = 10 dan x − y = 4.</p>',
      question: 'Pernyataan yang benar tentang penyelesaian sistem tersebut adalah ...',
      options: ['x = 7', 'y = 3', 'x − y = 4', '2x + y = 20'],
      answer: [0, 1, 2],
      explain: 'Dengan eliminasi diperoleh x = 7 dan y = 3. Maka x − y = 4 benar, sedangkan 2x + y = 17, bukan 20.',
      tambahan: true
    },
    {
      n: 25, type: 'pg', tambahan: true,
      stimulus: '<p>Sebuah peta berskala 1:500.000. Jarak dua kota pada peta 6 cm.</p>',
      question: 'Jarak sebenarnya dua kota tersebut adalah ...',
      options: ['3 km', '12 km', '30 km', '300 km'],
      answer: 2,
      explain: 'Jarak sebenarnya = 6 × 500.000 = 3.000.000 cm = 30 km.',
      tambahan: true
    }
  ]
}

];

window.SOAL_TKA = SOAL_TKA;
