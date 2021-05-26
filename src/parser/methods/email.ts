import execRegex from '../regex/execRegex';

export default (val: any): string => {
  return execRegex(val, 'email');
};
