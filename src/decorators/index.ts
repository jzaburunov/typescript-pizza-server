import "reflect-metadata";
import { AppRouter } from "../router";
import { RequestHandler } from "express";

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
      const middlewares =
        Reflect.getMetadata("middleware", target.prototype, key) || [];
      router[method](
        `${routePrefix}${path}`,
        ...middlewares,
        target.prototype[key]
      );
    }
  };
}

export function use(middleware: RequestHandler): Function {
  return (target: any, key: string) => {
    const middlewares = Reflect.getMetadata("middleware", target, key) || [];
    Reflect.defineMetadata(
      "middleware",
      [...middlewares, middleware],
      target,
      key
    );
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
