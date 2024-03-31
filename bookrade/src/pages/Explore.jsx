import BooksSidebar from '../components/BooksSidebar'
import Navigation from '../components/navigation'
import ShowBooks from '../components/ShowBooks'
import useGlobal from '../state/global'
import { useEffect } from 'react'


const Explore = () => {

  const socketConnect = useGlobal(state => state.socketConnect)
  const socketClose = useGlobal(state => state.socketClose)

  useEffect(() => {
    socketConnect()
    return() => {
      socketClose()
    }
  },[])

  return (
    <>
    <Navigation/>
    <div className='flex flex-wrap flex-row'>
      <BooksSidebar/>
      <ShowBooks/>
    </div>
    
  </>
  )
}

export default Explore