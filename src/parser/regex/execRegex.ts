import REGEXES from './constant';

type RegexObj = {
  pattern: string;
  flags?: string;
};

type Regex = 'url' | 'email' | RegExp | RegexObj;

function execRegex(value: string, regex: Regex): string {
  if (!value || typeof value !== 'string') return;

  const isPreDefinedRegex = typeof regex === 'string';
  const isRegexObject = regex instanceof RegExp;

  let _regex: RegExp;

  if (isPreDefinedRegex) {
    if (REGEXES[regex]) {
      _regex = REGEXES[regex];
    }
  } else if (!isRegexObject) {
    const { pattern, flags } = regex;
    _regex = new RegExp(pattern, flags);
  } else {
    _regex = regex;
  }

  return value.match(_regex)?.[0] || null;
}

export default execRegex;
