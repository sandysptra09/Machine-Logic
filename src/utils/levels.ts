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
};

// levels
export const levels: Level[] = [
  {
    id: 1,
    expression: ({ A, B }) => A && B,
    description: '(A AND B) = true',
  },
  {
    id: 2,
    expression: ({ C, D }) => C && !D,
    description: '(C AND NOT D) = true',
  },
  {
    id: 3,
    expression: ({ A, B, C, D }) => (A && B) || (C && !D),
    description: '(A AND B) OR (C AND NOT D) = true',
  },
  {
    id: 4,
    expression: ({ A, B, C }) => (A || B) && !C,
    description: '(A OR B) AND NOT C = true',
  },
  {
    id: 5,
    expression: ({ A, B }) => A !== B,
    description: 'A XOR B = true',
  },
  {
    id: 6,
    expression: ({ A, C, D }) => (A && !C) || (C && !D),
    description: '(A AND NOT C) OR (C AND NOT D) = true',
  },
  {
    id: 7,
    expression: ({ A, B, C, D }) => (!A && B) || (C && D),
    description: '(NOT A AND B) OR (C AND D) = true',
  },
  {
    id: 8,
    expression: ({ A, B, C, D, E = false }) => (A || B) && C && !D && E,
    description: '(A OR B) AND C AND NOT D AND E = true',
  },
  {
    id: 9,
    expression: ({ A, B, C, D, F = false }) => (A && B && C) || (D && F),
    description: '(A AND B AND C) OR (D AND F) = true',
  },
];
