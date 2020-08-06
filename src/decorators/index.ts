import "reflect-metadata";
import { AppRouter } from "../router";

const router = AppRouter.getInstance();

enum Methods {
  get = "get",
  post = "post",
}

export function controller(routePrefix: string): Function {
  return (target: Function) => {
    for (let key in target.prototype) {
      const path = Reflect.getMetadata("path", target.prototype, key);
      const method: Methods = Reflect.getMetadata(
        "method",
        target.prototype,
        key
      );
      // TODO Use middlewares
      router[method](`${routePrefix}${path}`, target.prototype[key]);
    }
  };
}

function methodBinder(method: string): Function {
  return function (path: string): Function {
    return (target: any, key: string) => {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", method, target, key);
    };
  };
}

export const get = methodBinder("get");
export const post = methodBinder("post");
