import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupZod } from "@nitesh-0/medium-common";
import axios from "axios"
import { BACKEND_URL } from "../config";

export function Auth({ type }: { type: "signup" | "signin" }) {

    const [postInputs, setPostInputs] = useState<SignupZod>({
        name: "",
        username: "",
        password: ""       
    })
    const navigate = useNavigate()

    async function SendRequest(){
        try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
        localStorage.setItem("token", response.data.token)
        console.log(response.data)
        navigate("/blogs")
        } catch(e) {
           console.log("error signing up")
        }        
    }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
          <div className="text-3xl font-bold">{type === "signin" ? "Create an account" : "Create an account"}</div>
          <div className="text-slate-400">
           {type === "signin" ?  "Don't have an account": "Already have an account?"}
          {type ==="signin" ? <Link to={"/signup"} className="pl-2 underline">SignUp</Link> : <Link to={"/signin"} className="pl-2 
           underline">Login</Link>}  
          </div>
        </div>
        <div className="pt-8">
        {type === "signup" ? <LabeledInput label="Name" placeholder="Nitesh sah" onChange={(e) => {
            setPostInputs({
                ...postInputs,
                name: e.target.value
            })
        }}/> : null}
        <LabeledInput label="Username" placeholder="niteshsah760@gamil.com" onChange={(e) => {
            setPostInputs({
                ...postInputs,
                username: e.target.value
            })
        }}/>
        <LabeledInput label="Password" type={"password"} placeholder="johndoe@43" onChange={(e) => {
            setPostInputs({
                ...postInputs,
                password: e.target.value
            })
        }}/>
        
            <button onClick={ SendRequest } type="button" className=" mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline- 
             none focus:ring-4 focus:ring-gray-300 font- medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg- 
            gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signin" ? "sign in" : "sign up"}</button>      
         </div>  
        </div>        
      </div>
    </div>
  );
}

interface LabeledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

function LabeledInput({label, placeholder, onChange, type}: LabeledInputType){
    return <div>
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text- 
         sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} 
        required />
    </div>
}