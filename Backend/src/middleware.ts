import { verify } from "hono/jwt";

const authMiddleware = async (c: any, next: any) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({
      msg: "invalid header token",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = await verify(token, "mysecretkey");
    if (decode) {
      c.set("userId", decode.id);
    }

    c.json({
      msg: "authentication successful",
    });

    await next();
  } catch {
    c.status(403);
    c.json({
      msg: "Authentication failed",
    });
  }
};

export default authMiddleware;
