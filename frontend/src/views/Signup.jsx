import { useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios"
import { useStateContext } from "../contexts/ContextProvider"

function Signup() {

   const {setCurrentUser, setUserToken} = useStateContext()
   const [fullName, setFullName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [passwordConfirmation, setPasswordConfirmation] = useState('')
   const [error, setError] = useState({__html: ''}) //SET A DEFAULT VALUE

   const onSubmit = (event) => {
      event.preventDefault()
      setError({__html: ''})

      console.log('here');

      axiosClient.post('/signup', {
         name: fullName,
         email: email,
         password: password,
         password_confirmation: passwordConfirmation
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
            console.log(finalErrors)
            setError({__html: finalErrors.join('<br>')})
         }
      })
   }

   return (
         <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
               Sign up to create a new account
            </h2>
   
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

               {error.__html && (
                  <div className="bg-red-500 rounded py-3 px-3 mb-5 text-white" dangerouslySetInnerHTML={error}>
                  </div>
               )}

               <form onSubmit={onSubmit} className="space-y-6">
                  <div>
                     <label htmlFor="full_name" className="block text-sm font-medium leading-6 text-gray-900">
                        Full Name
                     </label>
                     <div className="mt-2">
                        <input
                           id="full_name"
                           name="name"
                           type="name"
                           autoComplete="name"
                           required
                           value={fullName}
                           onChange={event => setFullName(event.target.value)}
                           placeholder="Full Name"
                           className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>

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
                           placeholder="Email Address"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>
   
                  <div>
                     <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                           Password
                        </label>
                        <div className="text-sm">
                           <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                           Forgot password?
                           </a>
                        </div>
                     </div>
                     <div className="mt-2">
                        <input
                           id="password"
                           name="password"
                           type="password"
                           autoComplete="off"
                           required
                           value={password}
                           onChange={event => setPassword(event.target.value)}
                           placeholder="Enter Password"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>

                  <div>
                     <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                           Confirm Password
                        </label>
                     </div>
                     <div className="mt-2">
                        <input
                           id="password_confirmation"
                           name="password_confirmation"
                           type="password"
                           autoComplete="off"
                           required
                           value={passwordConfirmation}
                           onChange={event => setPasswordConfirmation(event.target.value)}
                           placeholder="Password Confirmation"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                     </div>
                  </div>

                  <div>
                     <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                     >
                        Sign in
                     </button>
                  </div>
               </form>
   
               <p className="mt-10 text-center text-sm text-gray-500">
                  Already have an account?
                  <Link to="/login" className="ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                     Login Here
                  </Link>
               </p>
            </div>
         </>
      )
   }
   
   export default Signup