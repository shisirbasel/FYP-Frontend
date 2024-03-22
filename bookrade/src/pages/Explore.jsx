import BooksSidebar from '../components/BooksSidebar'
import Navigation from '../components/navigation'
import UploadBook from '../components/UploadBook'
import ShowBooks from '../components/ShowBooks'

const Explore = () => {
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