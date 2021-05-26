import REGEXES from './constant';

function execRegex(value: string, regex): string {
  let $regex;
  if (typeof regex === 'string') {
    if (REGEXES[regex]) {
      $regex = REGEXES[regex];
    }
  } else {
    const { pattern, flags } = regex;
    $regex = new RegExp(pattern, flags);
  }
  const result = $regex.exec(value);
  const newValue = result?.[0] || value;

  return newValue;
}

export default execRegex;
