import { Link } from "react-router-dom"

// DEFAAULT VALUES FOR TButton COMPONENT
const TButton = ({ color='indigo', to='', circle=false, href='', link='', target='_blank', children }) => {

   let classes = [
      "flex", "whitespace-nowrap", "text-sm", "border", "border-2", "border-transparent"
   ]

   // IF BUTTON IS A LINK TYPE BUTTON
   if(link){
      // PUSH MORE CLASSES INTO THE ARRAY USING DESTRUCTURING
      classes = [...classes, "transition-colors"]

      // CONDITIONALLY PUSH MORE CLASSES
      switch(color){
         case "indigo":
            classes = [...classes, "text-indigo-500", "focus:border-indigo-500"]
            break
         case "red":
            classes = [...classes, "text-red-500", "focus:border-red-500"]
      }
   }
   // IF BUTTON IS NOT A LINK TYPE BUTTON
   else{
      // PUSH MORE CLASSES INTO THE ARRAY USING DESTRUCTURING
      classes = [...classes, "text-white", "focus:ring-2", "focus:ring-offset-2"]

      // CONDITIONALLY PUSH MORE CLASSES
      switch(color){
         case "indigo":
            classes = [...classes, "bg-indigo-600", "hover:border-indigo-700", "focus:ring-indigo-500"]
            break
         case "red":
            classes = [...classes, "bg-red-600", "hover:border-red-700", "focus:ring-red-500"]
      }
   }

   if(circle){
      classes = [...classes, "h-8", "w-8", "items-center", "justify-center", "rounded-full", "text-sm"]
   }
   else{
      classes = [...classes, "p-0", "py-2", "px-4", "rounded-md"]
   }

   return (
      <>
         {/* IF href EXISTS, SEND BACK A BUTTON WITH THE href AND WITH CLASSES JOINED TO FORM A STRING SEPARATED BY SINGLE SPACE */}
         {href && (<a href={href} className={classes.join(" ")} target={target}>{children}</a>)}
         {/* ELSE IF to EXISTS, SEND BACK A Link BUTTON WITH THE to PROPERTY AND WITH CLASSES JOINED TO FORM A STRING SEPARATED BY SINGLE SPACE */}
         {to && (<Link to={to} className={classes.join(" ")}>{children}</Link>)}
         {/* ELSE IF NEITHER href NOR to EXISTS, SEND BACK A NORMAL BUTTON WITH CLASSES JOINED TO FORM A STRING SEPARATED BY SINGLE SPACE */}
         {!to && (<button className={classes.join(" ")}>{children}</button>)}
      </>
   )
}

export default TButton