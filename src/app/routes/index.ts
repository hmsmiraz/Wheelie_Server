import { Router } from "express";
import { UserRoutes } from "../modules/Users/user.route";
import { BikeRoutes } from "../modules/Bikes/bike.route";
import { BookingRoutes } from "../modules/Bookings/booking.route";
import { AuthRoutes } from "../modules/Auth/auth.route";

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
  {
    path: "/rentals",
    route: BookingRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
