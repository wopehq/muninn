import execRegex from '../../utils/execRegex';

export default (val: any): string => {
  return execRegex(val, 'url');
};
