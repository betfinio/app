import { createConsola } from 'consola/browser';

const logger = createConsola({}).withTag('app');

logger.wrapConsole();

export default logger;
