import { RegexConfig, CustomConfig } from '../config';
import transformValueType from './transformValueType';
import execRegex from './execRegex';

type TransformValueArgs = {
  value?: any;
  trim?: boolean;
  type?: string;
  custom?: CustomConfig;
  regex?: RegexConfig;
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
