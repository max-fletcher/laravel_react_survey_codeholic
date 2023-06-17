import { Link } from "react-router-dom"
import axiosClient from "../axios"
import { useState } from "react"
import { useStateContext } from "../contexts/ContextProvider"

function Login() {

   const {setCurrentUser, setUserToken} = useStateContext()
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState({__html: ''}) //SET A DEFAULT VALUE

   const onSubmit = (event) => {
      event.preventDefault()
      setError({__html: ''})

      console.log('here');

      axiosClient.post('/login', {
         email: email,
         password: password,
      })
      .then(({data}) => { // DESTRUCTURING AND GETTING THE DATA ONLY NOT ANYTHING ELSE e.g HEADERS
         console.log(data);
         setCurrentUser(data.user)
         setUserToken(data.token)
         // THE APPLICATION WILL AUTOMATICALLY REDIRECT USER TO DASHBOARD BECAUSE OF THE LOGIC IN GuestLayout.jsx*(i.e if(userToken){ return <Navigate to='/' /> })
         // CONTEXT BEHAVES LIKE STATE SO UPDATING THE userToken CAUSES THE COMPONENT TO RE-RENDER AND HENCE THIS BEHAVIOUR
      })
      .catch((error) => {
         console.log(error);
         console.error(error);
         if(error.response){
            // reduce JUST APPENDS THE PREVIOUS ELEMENT WITH THE ALREADY EXISTING ARRAY OF ELEMENTS SO IT CONSTRUCTS AN ARRAY
            const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
            setError({__html: finalErrors.join('<br>')})
         }
      })
   }

   return (
         <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
               Sign in to your account
            </h2>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

               {error.__html && (
                  <div className="bg-red-500 rounded py-3 px-3 mb-5 text-white" dangerouslySetInnerHTML={error}>
                  </div>
               )}

               <form className="space-y-6" onSubmit={onSubmit}>
                  <div>
                     <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                     </label>
                     <div className="mt-2">
                        <input
                           id="email"
                           name="email"
                           type="email"
                           autoComplete="email"
                           required
                           value={email}
                           onChange={event => setEmail(event.target.value)}
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>

                  <div>
                     <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                           Password
                        </label>
                        {/* <div className="text-sm">
                           <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                           Forgot password?
                           </a>
                        </div> */}
                     </div>
                     <div className="mt-2">
                        <input
                           id="password"
                           name="password"
                           type="password"
                           autoComplete="current-password"
                           required
                           value={password}
                           onChange={event => setPassword(event.target.value)}
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>

                  <div>
                     <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                     >
                        Login
                     </button>
                  </div>
               </form>

               <p className="mt-10 text-center text-sm text-gray-500">
                  Don't have an account yet?
                  <Link to="/signup" className="ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                     Signup Here
                  </Link>
               </p>
            </div>
         </>
   )
}

export default Login
