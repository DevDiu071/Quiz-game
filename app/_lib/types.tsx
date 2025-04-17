export interface Quiz {
  title: string;
  icon: string;
  questions: Question[];
}

export interface ClientSideData {
  clientSideData: Quiz;
}

export interface Question {
  question: string;
  options: string[];
  answer: string;
}
