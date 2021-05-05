import { RegexConfig } from '../config';
import transformValueType from '../utils/transformValueType';
import execRegex from '../utils/execRegex';

type TransformValueArgs = {
  value?: any;
  trim?: boolean;
  type?: string;
  regex: RegexConfig;
};

function transformValue({ value, trim, regex, type }: TransformValueArgs): any {
  if (typeof value === 'string' && trim !== false) {
    value = value.trim();
  }

  if (regex) {
    value = execRegex(value, regex);
  }

  value = transformValueType(value, type);

  return value;
}

export default transformValue;
