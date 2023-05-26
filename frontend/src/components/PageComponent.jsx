// PASSING PROPS TO THIS COMPONENT. buttons WILL HAVE BLANK AS DEFAULT IF NO VALUE IS PASSED
// CHILDREN IS A SPECIAL NAME FOR WHEN YOU WANT TO PLACE CONTENT IN THE MIDDLE OF CUSTOM COMPONENT RENDERED IN A SPECIFIC SPOT
// HENCE, "<h1> Surveys Content </h1>" <PageComponent title='Surveys'> <h1> Surveys Content </h1> </PageComponent> IN Surveys.js
// WILL BE RENDERED HERE IN PLACE OF CHILDREN
const PageComponent = ({ title, buttons = "", children }) => {

   console.log(children);

   return (
      <>
         <header className="bg-white shadow">
            <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
               <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
               {buttons}
            </div>
         </header>
         <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
               {children}
            </div>
         </main>
      </>
   )
}

export default PageComponent