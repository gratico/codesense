export interface B1 {}
export interface B<A = any> {
  key1: Record<string, string>;
  key2: number | string | 4;
}
