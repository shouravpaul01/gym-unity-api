import express, { Application, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./modules/middlewares/globalErrorHandler";

const app: Application = express();

app.use(cors());
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

//Handle errors globally
app.use(globalErrorHandler)
export default app;