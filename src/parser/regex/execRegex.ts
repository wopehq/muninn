import REGEXES from './constant';

function execRegex(value: string, regex): string {
  let $regex;
  const isPreDefinedRegex = typeof regex === 'string';
  if (isPreDefinedRegex) {
    if (REGEXES[regex]) {
      $regex = REGEXES[regex];
    }
  } else if(regex.pattern) {
    const { pattern, flags } = regex;
    $regex = new RegExp(pattern, flags);

  }else {
    $regex = regex
  }
  const result = $regex.exec(value);
  const newValue = isPreDefinedRegex
    ? result?.[0]
    : result?.[1] || result?.[0] || value;

  return newValue;
}

export default execRegex;
