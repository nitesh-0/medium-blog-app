import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export function AppBar({type, id}: {type: "new" | "edit", id?: number}) {
  return (
    <div className="border-b flex justify-between items-center px-10 py-3">
      <Link to={"/blogs"}>
        <div className="cursor-pointer">Medium</div>
      </Link>

      <div>
        <Link to={type==="new" ? "/publish" : `/editblog/${id}`}>
          <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green- 
          300 font-medium rounded-3xl text-sm px-5 py-2.5 me-2 mb-2 mr-4 cursor-pointer">{type==="new" ? "New Blog" : "Edit Blog"}
          </button>
        </Link>

        <Avatar name="Nitesh" size={"big"}/>
      </div>
    </div>
  );
}
