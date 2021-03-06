import _ from 'lodash';

declare module 'lodash' {
  // tslint:disable-next-line:interface-name
  interface LoDashStatic {
    log(message?: any, ...optionalParams: any[]): void;
  }

  // tslint:disable-next-line:interface-name
  interface LoDashExplicitWrapperBase<T, TWrapper> {
    log(...optionalParams: any[]): TWrapper;
  }

  // tslint:disable-next-line:interface-name
  interface LoDashImplicitWrapperBase<T, TWrapper> {
    log(...optionalParams: any[]): TWrapper;
  }
}

const log = (value, ...args) => {
  let logFunc = _.noop;
  // do not print in production env
  if (process.env.NODE_ENV !== 'production') {
    // tslint:disable-next-line:no-console
    logFunc = v => console.log(...args, v);
  }
  return _.tap(value, logFunc);
};

export const logFactory = lodash => {
  if ('log' in lodash && lodash.log !== log && process.env.NODE_ENV !== 'production') {
    throw new Error('Please Check! There has been another \'log\' in your lodash');
  }

  lodash.mixin({ log });
};

logFactory(_);
