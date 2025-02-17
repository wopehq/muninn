import execRegex from '../regex/execRegex';

const url = (val: any) => execRegex(val, 'url');

export default url;
