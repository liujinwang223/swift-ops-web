import config from './config';  // 引入主配置文件

const urls = {};

urls.loginUrl = `${config.backend_url}/api/v1/sys/login`;
urls.logoutUrl = `${config.backend_url}/api/v1/sys/logout`;

export default urls;