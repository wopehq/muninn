import execRegex from '../regex/execRegex';

const email = (val: any) => execRegex(val, 'email');

export default email;
