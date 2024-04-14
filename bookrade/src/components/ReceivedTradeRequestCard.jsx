import { Link } from "react-router-dom"
import { sendPatchRequestWithoutData } from "../utils/api"

const ReceivedTradeRequestCard = ({request, fetchAllRequests}) => {

    const AcceptTradeRequest = async () => {
        const response = await sendPatchRequestWithoutData(`accept/traderequest/${request.id}`)
        console.log(response)
        fetchAllRequests();
    }

    
    const RejectTradeRequest = async () => {
        const response = await sendPatchRequestWithoutData(`reject/traderequest/${request.id}`)
        console.log(response)
        fetchAllRequests();
    }


  return (
    <div className="m-auto flex mt-8 bg-white rounded-md ring-2 shadow-md ring-gray-900/5 w-10/12 p-8">
        <div className="shadow-md m-10 mt-4 w-6/12 h-64 flex book-preview">
            <div className="w-3/12">
                <img 
                    src={`http://127.0.0.1:8000${request.requested_book.image}`} 
                    className="book-image" 
                    alt={request.requested_book.title} 
                />
            </div>

            <div className="ml-12">
                <p className="text-3xl font-bold text-gray-900 mb-4 book_title">{request.requested_book.title}</p>
                <p className="text-2xl text-gray-700 mb-4">{request.requested_book.author}</p>
                <p className="text-xl text-gray-700 font-semibold"><Link to={`/user/${request.requested_book.user.username}`}>@{request.requested_book.user.username}</Link>
                </p>

                <p className="text-xl text-red-700 font-bold mt-8">Your Book</p>
            </div>
        </div>

        <div className="shadow-md m-10 mt-4 w-6/12 h-64 flex book-preview">
            <div className="w-3/12">
                <img 
                    src={`http://127.0.0.1:8000${request.offered_book.image}`} 
                    className="book-image" 
                    alt={request.offered_book.title} 
                />
            </div>

            <div className="ml-12">
                <p className="text-3xl font-bold text-gray-900 mb-4 book_title">{request.offered_book.title}</p>
                <p className="text-2xl text-gray-700 mb-4">{request.offered_book.author}</p>
                <p className="text-xl text-gray-700 font-semibold">
                <Link to={`/user/${request.offered_book.user.username}`}>@{request.offered_book.user.username}</Link>
                </p>
                <p className="text-xl text-red-700 font-bold mt-8">Offered Book</p>

            </div>
        </div>

        <div className="m-10 mt-4 pt-12 w-4/12 h-64 flex flex-column book-preview gap-10">
            <button className='cancel-btn' onClick={RejectTradeRequest}>Reject Trade Request</button>
            <button className='trade-btn' onClick={AcceptTradeRequest}>Accept Trade Request</button>
        </div>
    </div>
  )
}

export default ReceivedTradeRequestCard