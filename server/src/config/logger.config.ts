export const loggerConfig = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
  },
};

export const logDirectoryConfig = {
  defaultPath: 'logs',
  fileRetentionDays: 14,
  maxFileSize: '20m',
};
