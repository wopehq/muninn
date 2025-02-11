import execRegex from '../regex/execRegex';

const url = (val: any) => {
  if (val.startsWith('/search?')) {
    return val;
  }

  return execRegex(val, 'url');
};

export default url;
