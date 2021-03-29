import * as express from "express";

import DB from "../../db";

const router = express.Router();

export interface ReqUser extends express.Request {
  user: {
    role: string;
  };
}

export const isAdmin = (req: ReqUser, res, next) => {
  if (!req.user || req.user.role !== "guest") {
    return res.sendStatus(401);
  } else {
    return next();
  }
};

router.get("/", async (req, res, next) => {
  try {
    let blogs = await DB.Blogs.allBlogs();
    res.json(blogs);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/:id", isAdmin, async (req, res, next) => {
  let id = req.params.id;
  try {
    let blog = await DB.Blogs.oneBlog(id);
    res.json(blog);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    let deleteBlog = await DB.Blogs.deleteBlog(req.params.id);
    res.json(deleteBlog);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/:id", isAdmin, async (req, res) => {
  const body = req.body;
  try {
    let blogs = await DB.Blogs.updateBlog(
      body.title,
      body.content,
      req.params.id
    );
    res.json(blogs);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/", isAdmin, async (req, res) => {
  const body = req.body;
  try {
    const postBody = await DB.Blogs.insertBlog(
      req.user.id,
      body.title,
      body.content
    );
    res.json(postBody);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
