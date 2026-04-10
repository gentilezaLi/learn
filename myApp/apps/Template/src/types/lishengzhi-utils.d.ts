declare module '@lishengzhi/utils' {
  export function unique<T>(list: T[]): T[];
  export function chunk<T>(list: T[], size: number): T[][];
  export function sleep(ms: number): Promise<void>;
  export function deepClone<T>(value: T): T;
  export function pick<T extends Record<string, unknown>, K extends keyof T>(
    obj: T,
    keys: K[],
  ): Pick<T, K>;
  export function omit<T extends Record<string, unknown>, K extends keyof T>(
    obj: T,
    keys: K[],
  ): Omit<T, K>;
  export function clamp(value: number, min: number, max: number): number;
  export function add(a: number, b: number): number;
}
