import zod from "zod";

export const signupZod = zod.object({
  username: zod.string().email(),
  password: zod.string().min(4),
  name: zod.string().optional(),
});
// tpye inference in zod for signup
export type SignupZod = zod.infer<typeof signupZod>;

export const signInZod = zod.object({
  username: zod.string().email(),
  password: zod.string().min(4),
  name: zod.string().optional(),
});
// tpye inference in zod for signin
export type SignInZod = zod.infer<typeof signInZod>;

export const createBlogZod = zod.object({
  title: zod.string(),
  conntent: zod.string(),
});
// typ inference in zod for creating blog
export type CreateBlogZod = zod.infer<typeof createBlogZod>;

export const updateBlogZod = zod.object({
  title: zod.string(),
  conntent: zod.string(),
  id: zod.number(),
});
// typ inference in zod for updating blog
export type UpdateBlogZod = zod.infer<typeof updateBlogZod>;
