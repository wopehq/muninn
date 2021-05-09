import { RegexConfig } from '../config';
import transformValueType from '../utils/transformValueType';
import execRegex from '../utils/execRegex';

type TransformValueArgs = {
  value?: any;
  trim?: boolean;
  type?: string;
  custom?: (value: any) => any;
  regex: RegexConfig;
};

function transformValue({
  value,
  trim,
  regex,
  type,
  custom
}: TransformValueArgs): any {
  if (typeof value === 'string' && trim !== false) {
    value = value.trim();
  }

  if (regex) {
    value = execRegex(value, regex);
  }

  value = transformValueType(value, type);

  if (typeof custom === 'function') {
    value = custom(value);
  }

  return value;
}

export default transformValue;
