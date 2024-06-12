import { Router } from "express";
import { UserRoutes } from "../modules/Users/user.route";
import { BikeRoutes } from "../modules/Bikes/bike.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/bikes",
    route: BikeRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
