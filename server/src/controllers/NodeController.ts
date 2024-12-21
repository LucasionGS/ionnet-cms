import { Router } from "express";
import { Node } from "../models/Node.ts";

namespace NodeController {
  export const router = Router();
  
  router.get("/", (req, res) => {
    res.json([
      {
        id: 1,
        name: "Home",
        parentId: null,
        fields: [
          { field: "title", value: "Home" },
          { field: "content", value: "Welcome to the home page!" }
        ]
      },
      {
        id: 2,
        name: "About",
        parentId: 1,
        fields: [
          { field: "title", value: "About" },
          { field: "content", value: "About us" }
        ]
      }
    ])
  });
}

export default NodeController;