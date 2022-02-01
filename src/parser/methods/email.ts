import execRegex from '../regex/execRegex';

const email = (val: any): string => execRegex(val, 'email');

export default email;
