import { ArrowTopRightOnSquareIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";


const SurveyListItem = ({survey, onDeleteClick}) => {

   console.log(survey);

   return (
      <>
         <div className="flex flex-col py-4 px-4 shadow-md bg-white hover:bg-gray-50 h-[470px]">
            <img src={survey.image_url} alt={survey.title} className="w-full h-48 object-cover" />
            <h4 className="mt-4 text-lg font-bold">{survey.title}</h4>
            {/* FOR DESCRIPTION OF dangerouslySetInnerHTML, 
                  SEE THIS: https://blog.logrocket.com/using-dangerouslysetinnerhtml-in-a-react-application/ */}
            <div
               dangerouslySetInnerHTML={{ __html: survey.description }}
               className="overflow-hidden flex-1"
            >
            </div>

            <div className="flex justify-between items-center mt-3">
               <TButton to={`surveys/${survey.id}`}>
                  <PencilIcon className="w-5 h-5 mr-2" />
                  Edit
               </TButton>
            </div>

            <div className="flex items-center">
               <TButton href={`/view/survey/${survey.slug}`} circle link>
                  <ArrowTopRightOnSquareIcon className="w-5 h-5 mr-2" />
               </TButton>

               {survey.id && (
                  <TButton onDeleteClick={onDeleteClick} circle link color="red">
                     <TrashIcon />
                  </TButton>
               )}
            </div>

         </div>
      </>
   )
}

export default SurveyListItem