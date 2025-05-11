// type state
export type SwitchState = {
  A: boolean;
  B: boolean;
  C: boolean;
  D: boolean;
  E?: boolean;
  F?: boolean;
};

// type level
export type Level = {
  id: number;
  expression: (s: SwitchState) => boolean;
  description: string;
  narration: string;
};

// levels
export const levels: Level[] = [
  {
    id: 1,
    expression: ({ A, B }) => A && B,
    description: '(A AND B) = true',
    narration: 'Kedua panel tampak saling mencari. Hanya ketika keduanya bersinar serentak, pintu akan merespons.',
  },
  {
    id: 2,
    expression: ({ C, D }) => C && !D,
    description: '(C AND NOT D) = true',
    narration: 'Satu harus berdiri, yang lain diam. Ketidakseimbangan adalah kunci kali ini.',
  },
  {
    id: 3,
    expression: ({ A, B, C, D }) => (A && B) || (C && !D),
    description: '(A AND B) OR (C AND NOT D) = true',
    narration: 'Dua jalan terbentang di hadapanmu. Yang satu membutuhkan kesatuan, yang lain mengandalkan ketimpangan.',
  },
  {
    id: 4,
    expression: ({ A, B, C }) => (A || B) && !C,
    description: '(A OR B) AND NOT C = true',
    narration: 'Salah satu harus menyala, tapi jangan sampai yang ketiga terlibat — ia menghentikan segalanya.',
  },
  {
    id: 5,
    expression: ({ A, B }) => A !== B,
    description: 'A XOR B = true',
    narration: 'Perbedaan adalah kunci. Jika keduanya serupa, pintu tetap tertutup.',
  },
  {
    id: 6,
    expression: ({ A, C, D }) => (A && !C) || (C && !D),
    description: '(A AND NOT C) OR (C AND NOT D) = true',
    narration: 'Bayangan bergerak saat salah satu terang menyala dan yang lainnya padam. Temukan celah di antara transisi itu.',
  },
  {
    id: 7,
    expression: ({ A, B, C, D }) => (!A && B) || (C && D),
    description: '(NOT A AND B) OR (C AND D) = true',
    narration: 'Dalam gelap, satu cahaya menyala. Atau mungkin dua cahaya menyatu membentuk jalan keluar.',
  },
  {
    id: 8,
    expression: ({ A, B, C, D, E = false }) => (A || B) && C && !D && E,
    description: '(A OR B) AND C AND NOT D AND E = true',
    narration: 'Empat kunci: satu dari dua pilihan, satu pasti, satu dihindari, dan satu tersembunyi. Susun mereka dengan urutan yang tepat.',
  },
  {
    id: 9,
    expression: ({ A, B, C, D, F = false }) => (A && B && C) || (D && F),
    description: '(A AND B AND C) OR (D AND F) = true',
    narration: 'Pilih antara kekuatan dari tiga saklar utama atau sinergi rahasia antara dua yang tersembunyi.',
  },
];
