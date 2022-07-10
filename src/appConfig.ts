
// Перенос энвов в кубер

interface IWindowWithConfig extends Window {
   globalConfig: {
      test: string
   }
}

const appConfig = (window as unknown as IWindowWithConfig).globalConfig || {
   test: process.env.REACT_APP_TEST
}

export { appConfig }
