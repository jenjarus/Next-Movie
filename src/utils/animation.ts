export function throttle(func: Function, ms: number): any {
  let locked: boolean = false;

  return function (this: any) {
    if (!locked) {
      const context: any = this;
      const args: IArguments = arguments;

      locked = true;

      setTimeout((): void => {
        func.apply(context, args);
        locked = false;
      }, ms);
    }
  };
}
