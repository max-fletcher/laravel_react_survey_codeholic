import { useContext, createContext, useState } from "react"

// YOU DON'T HAVE TO DECLARE THESE INSIDE THE createContext TO USE CONTEXT API, BUT IF YOU WANT AUTOCOMPLETE IN YOUR IDE, YOU CAN ADD THESE HERE
const StateContext = createContext({
   currentUser: {},
   userToken: null,
   setCurrentUser: () => {},
   setUserToken: () => {}
})

export const ContextProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState({
      name: 'Tom Cook',
      email: 'tom@example.com',
      imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
   })
   const [userToken, setUserToken] = useState('')

   return(
      // VALUE IS A RESERVED KEYWORD FOR USECONTEXT. DO NOT CHANGE IT AND EXPECT IT TO WORK
      // YOU CAN PASS AN OBECT INTO 'VALUE' TO GET ACCESS TO MULTIPLE VARIABLES/FUNCTIONS IN DEEPLY NESTED COMPONENTS. OTHERWISE, THERE IS NO OTHER WAY
      // TO PASS MULTIPLE VALUES USING USECONTEXT
      <StateContext.Provider value={{
         currentUser,
         setCurrentUser,
         userToken,
         setUserToken
      }}>
         {children}
      </StateContext.Provider>
   )
}

// THIS IS A SHORTCUT INSTEAD OF DEFINING THIS INSIDE EACH COMPONENT WHERE WE WISH TO USE THIS CONTEXT. JUST USE DESTRUCTURING TO GET WHAT IS NEEDED.
export const userStateContext = () => useContext(StateContext)