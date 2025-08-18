import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { AuthRoute } from "./modules/auth/auth.route";
import { UserRoutes } from "./modules/user/user.route";
import { ClassScheduleRoutes } from "./modules/classSchedule/classSchedule.route";

const app: Application = express();

app.use(cors({}));
app.use(express.json());

// Routes
app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoutes);
app.use("/api/classSchedule", ClassScheduleRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

//Handle errors globally
app.use(globalErrorHandler);
export default app;
