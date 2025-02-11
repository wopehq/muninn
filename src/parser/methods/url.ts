import execRegex from '../regex/execRegex';

const paramsToRemove = new Set(['sa', 'sqi', 'ved', 'usg']);

const url = (val) => {
  if (val.startsWith('/search?')) {
    return val;
  }

  let extractedUrl = execRegex(val, 'url');
  if (!extractedUrl) return null;

  return cleanUrl(extractedUrl);
};

const cleanUrl = (url) => removeTextFragment(removeParams(url));

const removeTextFragment = (url) =>
  url.replace(/(#|%23):~:text(=|%3D)[^#&]*/g, '');

const removeParams = (url) =>
  url
    .split('&')
    .filter((param) => !paramsToRemove.has(param.split('=')[0]))
    .join('&');

export default url;
