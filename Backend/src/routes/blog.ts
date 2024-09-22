import { Hono } from "hono";
import authMiddleware from "../middleware";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogZod, updateBlogZod } from "@nitesh-0/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.post("/createblog", authMiddleware, async (c) => {
  const blogBody = await c.req.json();

  const createSuccess = createBlogZod.safeParse(blogBody);

  if (!createSuccess.success) {
    c.status(403);
    return c.json({
      msg: "Invalid input type",
    });
  }

  const authorId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const newBlog = await prisma.blog.create({
      data: {
        authorId: Number(authorId),
        conntent: blogBody.conntent,
        title: blogBody.title,
      },
    });

    return c.json({
      msg: "Blog created successflly",
      blogId: newBlog.id,
    });
  } catch {
    c.json({
      msg: "Error creating the blog",
    });
  }
});

// UpdateBlog Route
blogRouter.put("/updateblog", authMiddleware, async (c) => {
  const updateBody = await c.req.json();
  console.log("hi There");
  const success = updateBlogZod.safeParse(updateBody);

  if (!success.success) {
    c.status(403);
    return c.json({
      msg: "Invalid input type",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const updatedBlog = await prisma.blog.update({
    where: {
      id: updateBody.id,
    },
    data: {
      title: updateBody.title,
      conntent: updateBody.conntent,
    },
  });

  return c.json({
    msg: "Blog updated successfully",
    updatedBlogId: updatedBlog.id,
  });
});

// Todo: Pagination here
blogRouter.get("/bulk", authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const allBlogs = await prisma.blog.findMany();

  return c.json({
    msg: "Found all Blogs",
    allBlogs: allBlogs,
  });
});

blogRouter.get("/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.findUnique({
    where: {
      id: Number(id),
    },
  });

  return c.json({
    msg: "Blog found successfully",
    blog: blog,
  });
});
