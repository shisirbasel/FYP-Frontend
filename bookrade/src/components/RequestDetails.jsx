import { OfferBookContext, RequestBookContext } from "../App"
import { useContext } from "react"

const RequestDetails = () => {
  const [offeredBook, setOfferedBook] = useContext(OfferBookContext)
  const [requestedBook, setRequestedBook] = useContext(RequestBookContext)

  return (
    <div className="mx-10 my-10 bg-white rounded-md ring-2 ring-gray-900/5 shadow py-8 px-4 w-4/12">
       {Object.keys(requestedBook).length > 0 && ( 
        <>
           <h1 className="text-4xl text-gray-900 ml-10 mb-6">Requested Book</h1>
          <div className="shadow-md m-10 mt-4 w-10/12 flex book-preview">
            <div className="w-4/12">
              <img src={`http://127.0.0.1:8000${requestedBook.image}`} />
            </div>

            <div className="ml-12">
              <p className="text-3xl font-bold text-gray-900 mb-4">{requestedBook.title}</p>
              <p className="text-2xl text-gray-700 mb-4">{requestedBook.author}</p>
              <p className="text-lg text-gray-700">@{requestedBook.user.username}</p>
            </div>
        </div>
        </>
       
       )}

        {Object.keys(offeredBook).length > 0 && ( 
          <>
            <h1 className="text-4xl text-gray-900 ml-10 mb-6">Offered Book</h1>
            <div className="shadow-md m-10 mt-4 w-10/12 flex book-preview">
                <div className="w-4/12">
                  <img src={`http://127.0.0.1:8000${offeredBook.image}`} />
                </div>

                <div className="ml-12">
                    <p className="text-3xl font-bold text-gray-900 mb-4">{offeredBook.title}</p>
                    <p className="text-2xl text-gray-700 mb-4">{offeredBook.author}</p>
                    <p className="text-lg text-gray-700">@{offeredBook.user.username}</p>
                </div>
            </div>
          </>
      
      )}
    </div>
  )
}

export default RequestDetails
