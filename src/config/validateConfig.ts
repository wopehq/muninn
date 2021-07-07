import validateConfig from './schema';

export default (config) => {
  validateConfig(config);
  return validateConfig.errors;
};
