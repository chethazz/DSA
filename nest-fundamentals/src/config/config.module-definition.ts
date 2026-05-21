import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ConfigModuleOptions } from './interfaces';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<ConfigModuleOptions>()
  // .setClassMethodName('forRoot')
  .setExtras({ isGlobal: true }, (definition, extras) => ({
    ...definition,
    global: extras.isGlobal,
  }))
  .build();

// setClassMethodName: Constructor will instruct ConfigurableModuleBuilder to generate a class
// that exposes forRoot and forRootAsync

// setExtras is an object containing default values for extra properties, second arg is a function that
// takes auto generated module definitions.(with provider, exports etc.) and extras object which represents
// extra properties(either default or user specified). Returned value of the fnction is a module definition.
