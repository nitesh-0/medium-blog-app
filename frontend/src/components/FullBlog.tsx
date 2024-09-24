import { AppBar } from "./AppBar";
import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

export function FullBlog({ blog }: { blog: Blog }) {
  return (
    <div>
      <AppBar type="edit" id={blog.id}/>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-20 w-full pt-200 max-w-screen-xl pt-12">
          <div className="col-span-8 ">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-400 pt-4">
              Posted on 23rd September 2024
            </div>
            <div className="pt-5 ">{blog.conntent}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-900 text-lg">Author</div>
            <div className="flex justify-center items-center">
              <div className="pr-4">
                <Avatar name={blog.author.name || "Anonymous"} />
              </div>

              <div>
                <div className="text-3xl font-bold pt-1">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the autho's ability to grab the
                  user'sattention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
