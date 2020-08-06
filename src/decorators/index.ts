import "reflect-metadata";
import { AppRouter } from "../router";

const router = AppRouter.getInstance();

export function controller(routePrefix: string): Function {
  return (target: Function) => {
    // use metada information
    for (let key in target.prototype) {
      const path = Reflect.getMetadata("path", target.prototype, key);
      // TODO Use middlewares
      router.get(`${routePrefix}${path}`, target.prototype[key]);
    }
  };
}

export function get(path: string): Function {
  return (target: any, key: string) => {
    // TODO Use metadata to pass by information:
    // path
    // method
    Reflect.defineMetadata("path", path, target, key);
  };
}
