import { notification } from 'antd';

export default (
  type: 'success' | 'error',
  message: string,
  description: string
) => {
  notification[type]({
    message,
    description,
  });
};
