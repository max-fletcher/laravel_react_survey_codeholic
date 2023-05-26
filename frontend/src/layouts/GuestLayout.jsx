import { Outlet } from "react-router-dom"
import { userStateContext } from "../contexts/ContextProvider"
import { Navigate } from "react-router-dom"


const GuestLayout = () => {

   const { currentUser, userToken } = userStateContext() // GET currentUser FROM ContextProvider BY DESTRUCTURING IT

   if(userToken){
      // THE REASON WE ARE NOT USING useNavigate IS BECAUSE IT CAN BE USED ONLY INSIDE FUNCTIONS INCLUDING useEffect AND NOT OUTSIDE OF IT
      return <Navigate to='/' />
   }

   return (
      <div>
         <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
               <img
                  className="mx-auto h-10 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
               />
            </div>
            <Outlet />
         </div>
      </div>
   )
}

export default GuestLayout