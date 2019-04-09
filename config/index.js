import commonConf from './common';
import devConf from './dev';
import prdConf from './prd';
import testConf from './test';

const env = ENVIRONMENT || 'dev';
const configMap = {
  dev: devConf,
  prd: prdConf,
  test: testConf,
};

Object.keys(configMap[env]).forEach((k) => {
  commonConf[k] = configMap[env][k];
});

export default commonConf;
