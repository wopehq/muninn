v0.11.0:
  * The `InputConfig` removed.
  * The `Config` `interface` converted to a `type` and replaced the `InputConfig`.
  * `Selector` can only be `string` (was `string | string[]`)
  * `transform` function takes `Value<Initial>` as argument, instead of `any`.
  * `ConfigFunction` renamed to `SchemaGenerator`
  * `RawConfig.schema`'s type is set to `SchemaGenerator | Schema`
  * `getSelector` renamed to `parseSelector`

v0.9.1:
  * Ignored `null` values returned from `cheerio.html()`

v0.9.0:
  * Added `ignoreIntersectingElements?: 'ignore-kids' | 'ignore-parents';` to `RawConfig`.
  * Converted `RawConfig` and `Config` classes to `interface`.
