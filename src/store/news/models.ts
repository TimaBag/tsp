export interface UnparsedNews {
  /* fields */
  id: number;
  text: string;
  datetime: string;
  title: string;
  trId: string;
  source: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  related_categories: any[];
}

export interface News {
  /* fields */
  id: number;
  text: string;
  datetime: string;
  title: string;
  trId: string;
  source: string;
}
