import { Pizza } from "../models/Pizza";
import { controller, get, use } from "../decorators";
import { Response, Request } from "express";
import { loginRequired } from "../middlewares";

@controller("/pizza")
export class PizzaController {
  @get("/all")
  @use(loginRequired)
  async fetchAll(req: Request, res: Response) {
    const pizzas = await Pizza.find({});
    res.send(pizzas);
  }
}
