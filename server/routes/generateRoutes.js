import express from "express";
import { generateWebsiteFromPrompt } from "../controllers/generateController.js";

const router = express.Router();

router.post("/generate-website", generateWebsiteFromPrompt);

export default router;
