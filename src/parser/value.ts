export type Value<Initial = unknown> =
  | string
  | Record<string, string>
  | Initial;
