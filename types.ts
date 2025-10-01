
export type Mode = 'LEARN' | 'PRACTICE' | 'ASSESS';

export interface Chapter {
  id: number;
  title: string;
  description: string;
}

export interface Message {
  sender: 'user' | 'ai';
  text: string;
  isError?: boolean;
}
