function transformValueType(value: any, type: string): any {
  if (type === 'number') {
    return Number(value);
  }

  if (type === 'boolean') {
    return Boolean(value);
  }

  return value;
}

export default transformValueType;
