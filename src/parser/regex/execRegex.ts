import REGEXES from './constant';

function execRegex(value: string, regex): string {
  const isPreDefinedRegex = typeof regex === 'string';
  let $regex;

  if (isPreDefinedRegex) {
    if (REGEXES[regex]) {
      $regex = REGEXES[regex];
    }
  } else if (regex?.pattern) {
    const { pattern, flags } = regex;
    $regex = new RegExp(pattern, flags);
  } else if (regex?.exec) {
    $regex = regex;
  }

  return value?.match($regex)?.[0] || null;
}

export default execRegex;
