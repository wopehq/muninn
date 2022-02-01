import execRegex from '../regex/execRegex';

const url = (val: any): string => execRegex(val, 'url');

export default url;
