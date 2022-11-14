export interface Question {
  id: number;
  title: string;
  qType: 'single' | 'multi';
  content: string;
  answer: string | string[] | null; // "A", ["A", "B"] or "0", ["0", "1"], MDN: return type of a input is always string
  analysis?: string;
}

export interface BasicInfo {
  title: string;
  message: string;
}
