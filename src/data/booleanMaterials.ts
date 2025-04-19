export const booleanMaterials = [
    {
      title: "Apa itu Aljabar Boolean?",
      content_1:
        "Aljabar Boolean adalah cabang matematika yang menangani operasi logika pada variabel biner (0 dan 1). " +
        "Digunakan dalam analisis dan penyederhanaan sirkuit digital serta dalam pemrograman komputer. " +
        "Variabel Boolean hanya memiliki dua nilai: True (1) dan False (0).",
  
      title_2: "Operator Logika Dasar",
      content_2: [
        "AND (∧) : Hasilnya True hanya jika kedua operand True.",
        "OR (∨)  : Hasilnya True jika setidaknya satu operand True.",
        "NOT (¬) : Mengubah nilai operand; True menjadi False, dan sebaliknya.",
        "Operand adalah nilai atau variabel logika, sedangkan operator adalah simbol yang menunjukkan jenis operasi logika (seperti AND, OR, NOT)."
      ],
  
      title_4: "Hukum-Hukum Aljabar Boolean",
      content_4:
        "• Identitas: A + 0 = A, A × 1 = A\n" +
        "  Penjelasan: Jika kamu menambahkan 0 ke suatu nilai, nilainya tidak berubah (A + 0 = A). " +
        "Jika kamu mengalikan 1 dengan suatu nilai, hasilnya tetap nilai tersebut (A × 1 = A).\n\n" +
      
        "• Dominasi: A + 1 = 1, A × 0 = 0\n" +
        "  Penjelasan: Jika salah satu operand bernilai 1 (untuk OR) atau 0 (untuk AND), " +
        "hasilnya akan tetap dominan (A + 1 = 1, A × 0 = 0).\n\n" +
      
        "• Idempoten: A + A = A, A × A = A\n" +
        "  Penjelasan: Jika suatu nilai ditambah atau dikalikan dengan dirinya sendiri, hasilnya tetap sama.\n\n" +
      
        "• Komplement: A + A' = 1, A × A' = 0\n" +
        "  Penjelasan: Ini menunjukkan bahwa nilai A dan nilai negasinya A' saling melengkapi. " +
        "Jika A adalah 1, maka A' adalah 0, dan jika A adalah 0, A' adalah 1.\n\n" +
      
        "• Komutatif: A + B = B + A, A × B = B × A\n" +
        "  Penjelasan: Urutan operand dalam operasi OR atau AND tidak mempengaruhi hasilnya. " +
        "Contoh: A + B sama dengan B + A (untuk OR), A × B sama dengan B × A (untuk AND).\n\n" +
      
        "• Asosiatif: A + (B + C) = (A + B) + C, A × (B × C) = (A × B) × C\n" +
        "  Penjelasan: Urutan pengelompokan dalam operasi OR atau AND tidak mempengaruhi hasilnya.\n\n" +
      
        "• Distributif: A × (B + C) = (A × B) + (A × C), A + (B × C) = (A + B) × (A + C)\n" +
        "  Penjelasan: Ini menunjukkan bagaimana operasi AND dan OR bisa saling mendistribusikan satu sama lain.",      

  
        title_5: "Fungsi Boolean",
        content_5:
          "Fungsi Boolean adalah ekspresi logika yang terdiri dari variabel Boolean (seperti A, B, C) " +
          "dan operator logika seperti AND (×), OR (+), dan NOT (').\n\n" +
          
          "Contoh: F(A, B, C) = A × B + C\n" +
          "Penjelasan: Pada contoh di atas, nilai fungsi F akan bernilai 1 jika A dan B bernilai 1, " +
          "atau jika C bernilai 1.\n\n" +
        
          "Fungsi Boolean digunakan untuk merepresentasikan logika dalam sirkuit digital, " +
          "seperti gerbang logika, rangkaian aritmatika, memori, dan sistem pengendalian lainnya.",        
  
      title_6: "Penerapan dalam Game 'MachineLogic'",
      content_6:
        "Game ini menggunakan konsep Aljabar Boolean untuk menguji pemahaman pemain tentang logika dasar. " +
        "Pemain akan melihat kombinasi acak dari variabel dan operator, lalu menentukan hasilnya. " +
        "Skor diberikan berdasarkan jawaban yang benar, membantu memperkuat pemahaman konsep logika. " +
        "Dengan memainkan game ini, kamu nggak cuma bersenang-senang, tapi juga memperkuat logika dasar yang sering dipakai di dunia digital dan pemrograman."
    }
  ];
  