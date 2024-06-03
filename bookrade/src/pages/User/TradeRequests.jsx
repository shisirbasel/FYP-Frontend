import { useEffect } from 'react'
import Navigation from '../../components/User/navigation'
import ViewTradeRequests from '../../components/User/ViewTradeRequests'
import { sendGetRequest } from '../../utils/api'

const TradeRequests = () => {

  const seeTradeRequests = async () => {
    const response = await sendGetRequest("see_requests")
    console.log(response)
  }

  useEffect(()=>{seeTradeRequests()},[])
  return (
    <div>
        <Navigation/>
        <ViewTradeRequests/>
    </div>
  )
}

export default TradeRequests