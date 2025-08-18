import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { AuthRoute } from "./modules/auth/auth.route";


const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", AuthRoute);


app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

//Handle errors globally
app.use(globalErrorHandler)
export default app;