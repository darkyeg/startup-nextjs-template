export type PartialNull<T> = {
  [P in keyof T]: T[P] | null;
};

export type Awaitable<T> = T | Promise<T>;
