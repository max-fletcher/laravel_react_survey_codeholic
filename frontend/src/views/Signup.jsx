import { useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios"

function Signup() {

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
      })
      .catch((error) => { // DESTRUCTURING AND GETTING THE RESPONSE ONLY NOT ANYTHING ELSE e.g HEADERS
         console.log(error);
      })
   }

   return (
         <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
               Sign up to create a new account
            </h2>
   
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
   