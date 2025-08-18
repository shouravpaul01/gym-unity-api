"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const auth_route_1 = require("./modules/auth/auth.route");
const user_route_1 = require("./modules/user/user.route");
const classSchedule_route_1 = require("./modules/classSchedule/classSchedule.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({}));
app.use(express_1.default.json());
// Routes
app.use("/api/auth", auth_route_1.AuthRoute);
app.use("/api/user", user_route_1.UserRoutes);
app.use("/api/classSchedule", classSchedule_route_1.ClassScheduleRoutes);
app.get("/", (req, res) => {
    res.send("API is running");
});
//Handle errors globally
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map