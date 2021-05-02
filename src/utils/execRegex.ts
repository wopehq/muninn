function execRegex(value: string, regex): string {
  const { pattern, flags } = regex;
  const result = new RegExp(pattern, flags).exec(value);
  const newValue = result?.[0] || value;

  return newValue;
}

export default execRegex;
