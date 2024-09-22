import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupZod, signInZod } from "@nitesh-0/medium-common";


export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// signUp Code
userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  const success = signupZod.safeParse(body);
  console.log("signup zod");

  if (!success.success) {
    c.status(411);
    return c.json({
      msg: "Incorrect Input",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  console.log("route is correct");

  try {
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        username: body.username,
        password: body.password,
      },
    });

    const token = await sign(
      {
        id: newUser.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      msg: "user signed up successfully",
      token: token,
    });
  } catch (e) {
    console.log(e);
    c.status(411);
    c.json({
      msg: "User with this email already exists",
    });
  }
});

// SignIn Code
userRouter.post("/signin", async (c) => {
  const userBody = await c.req.json();

  const signinSuccess = signInZod.safeParse(userBody);

  if (!signinSuccess.success) {
    c.status(403);
    return c.json({
      msg: "Invalid input",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        username: userBody.username,
        password: userBody.password,
      },
    });

    if (!findUser) {
      c.status(403);
      return c.json({
        msg: "user doesn't exist",
      });
    }

    const token = await sign(
      {
        id: findUser.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      msg: "You are signed in successfully",
      token: token,
    });
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.json({
      msg: "Invalid inputs",
    });
  }
});
