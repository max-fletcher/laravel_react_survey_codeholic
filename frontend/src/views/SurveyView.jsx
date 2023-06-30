import { useState } from "react";
import PageComponent from "../components/PageComponent";
import { PhotoIcon } from "@heroicons/react/24/outline";
import TButton from "../components/core/TButton";
import axiosClient from "../axios";

const SurveyView = () => {
   const [survey, setSurvey] = useState({
      title: "",
      slug: "",
      status: false,
      description: "",
      image: null,
      image_url: null,
      expire_date: "",
      questions: [],
   });

   const onSubmit = (event) => {
      event.preventDefault()
      console.log("submitted");

      axiosClient.post('/survey', {
         title: 'Lorem Ipsum',
         description: 'Test Desc',
         expire_date: '11/24/2022',
         status: true
      })
   };

   const onImageChange = () => {
      console.log("iamge changed");
   };

   return (
      <PageComponent title="Create New Survey">
         <form action="#" method="POST" onSubmit={onSubmit}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
               <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  {/* Image */}
                  <div>
                     <label className="block text-sm font-medium text-gray-700">
                        Photo
                     </label>
                     <div className="mt-1 flex items-center">
                        {survey.image_url && (
                           <img
                              src={survey.image_url}
                              alt=""
                              className="w-32 h-32 object-cover"
                           />
                        )}
                        {!survey.image_url && (
                           <span className="flex justify-content items-center text-gray-400 h-12 2-12 overflow-hidden rounded-full bg-gray-100">
                              <PhotoIcon className="w-8 h-8" />
                           </span>
                        )}
                        <button type="button"
                           className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium
                           leading-4 text-gray-700 shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500
                           focus:ring-offset-2"
                        >
                           {/* CLICKING THIS WILL OPEN BROWSER'S IMAGE SELECTOR */}
                           <input type="file" 
                              className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                              onChange={onImageChange} 
                           />
                           Change
                        </button>
                        {/* Image */}

                     </div>
                  </div>

                  {/* Title */}
                  <div className="col-span-6 sm:col-span-3">
                     <label htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                     >
                        Survey Title
                     </label>
                     <input 
                        type="text"
                        name="title"
                        id="title"
                        value={survey.title}
                        onChange={(event) =>
                           setSurvey({...survey, title: event.target.value})
                        }
                        placeholder="Survey Title"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50
                        focus:ring-indigo-500 sm:text-sm"
                     />
                  </div>
                  {/* Title */}

                  {/* Description */}
                  <div className="col-span-6 sm:col-span-3">
                     <label htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                     >
                        Survey Description
                     </label>
                     <input 
                        type="text"
                        name="description"
                        id="description"
                        value={survey.description}
                        onChange={(event) =>
                           setSurvey({...survey, description: event.target.value})
                        }
                        placeholder="Survey Description"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50
                        focus:ring-indigo-500 sm:text-sm"
                     />
                  </div>
                  {/* Description */}

                  {/* Expiraton Date */}
                  <div className="col-span-6 sm:col-span-3">
                     <label htmlFor="expire_date"
                        className="block text-sm font-medium text-gray-700"
                     >
                        Survey Expires At
                     </label>
                     <input 
                        type="text"
                        name="expire_date"
                        id="expire_date"
                        value={survey.expire_date}
                        onChange={(event) =>
                           setSurvey({...survey, expire_date: event.target.value})
                        }
                        placeholder="Survey Description"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50
                        focus:ring-indigo-500 sm:text-sm"
                     />
                  </div>
                  {/* Expiraton Date */}

                  {/* Active */}
                     <div className="flex items-start">
                        <div className="flex h-5 items-center">
                           <input
                              type="checkbox" 
                              name="status"
                              id="status"
                              checked={survey.status}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                           />
                        </div>
                     </div>
                     <div className="ml-3 text-sm">
                        <label htmlFor="comments" className="font-medium text-gray-700">
                           Active
                        </label>
                        <p className="text-gray-500">
                           Whether to make survey publicly available
                        </p>
                     </div>
                  {/* Active */}

                  <div className="bg-gray-50 px-4 py-4 text-right sm:px-6">
                     <TButton>
                        Save
                     </TButton>
                  </div>
               </div>
            </div>
         </form>

      </PageComponent>
   );
};

export default SurveyView;
