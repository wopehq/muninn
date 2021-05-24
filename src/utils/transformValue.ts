import { RegexConfig, CustomConfig } from '../config';
import transformValueType from './transformValueType';
import execRegex from './execRegex';
import Methods from '../parser/methods';

type TransformValueArgs = {
  value?: any;
  trim?: boolean;
  type?: string;
  custom?: CustomConfig;
  methods?: string[];
  regex?: RegexConfig;
};

function transformValue({
  value,
  trim,
  regex,
  type,
  custom,
  methods
}: TransformValueArgs): any {
  if (typeof value === 'string' && trim !== false) {
    value = value.trim();
  }

  if (regex) {
    value = execRegex(value, regex);
  }

  if (methods?.length > 0) {
    methods.forEach((name) => {
      if (Methods[name]) {
        value = Methods[name](value);
      }
    });
  }

  value = transformValueType(value, type);

  if (typeof custom === 'function') {
    value = custom(value);
  }

  return value;
}

export default transformValue;
