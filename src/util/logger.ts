import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
  base: {
    pid: false,
  },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
    },
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
