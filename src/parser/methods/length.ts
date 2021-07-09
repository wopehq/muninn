export default (val: string): number => {
  return typeof val === 'string' ? val.length : 0;
};
