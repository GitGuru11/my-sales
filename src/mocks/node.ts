// import { setupWorker } from 'msw/browser';
// const { setupWorker } = require("msw/browser")
import { handlers } from './handlers';

export const server = async () => {
  if (typeof window !== 'undefined') {
    const { setupWorker } = require("msw/browser");

    const worker = setupWorker(...handlers)
    worker.start({ onUnhandledRequest: 'bypass' });
    console.log('worker installed')
  }
}