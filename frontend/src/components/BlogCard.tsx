import { Link } from "react-router-dom";

interface BlogcardPropos {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export function BlogCard({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogcardPropos) {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-400 p-4 cursor-pointer">
        <div className="flex">
          <Avatar name={authorName} />
          <div className="font-light pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-400 text-sm flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-bold pt-1">{title}</div>
        <div className="text-sm ">{content.slice(0, 100) + "..."}</div>
        <div className="w-full text-slate-500 text-sm font-thin pt-4">{`${Math.ceil(
          content.length / 100
        )} minutes read`}</div>
      </div>
    </Link>
  );
}

export function Circle() {
  return <div className="h-1 w-1 bg-slate-500 rounded-full"></div>;
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        } font-extralight text-white dark:text-gray-300`}
      >
        {name[0]}
      </span>
    </div>
  );
}
