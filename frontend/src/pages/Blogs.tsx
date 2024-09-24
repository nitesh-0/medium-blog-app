import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { Skeleton } from "../components/Skeleton";

export function Blogs() {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <AppBar/>
        <div className="flex justify-center">
          <div>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          {blogs.map((blog) => (
            <BlogCard
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.conntent}
              publishedDate={"Sep 23, 2024"}
              id={blog.id}></BlogCard>
          ))}
        </div>
      </div>
    </div>
  );
}
