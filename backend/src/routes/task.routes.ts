import { Router } from "express";
import * as controller from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", controller.getTasks);
router.post("/", controller.createTask);
router.patch("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);
router.patch("/:id/toggle", controller.toggleTask);

export default router;
