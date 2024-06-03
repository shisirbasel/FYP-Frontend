import BooksSidebar from '../../components/User/BooksSidebar'
import Navigation from '../../components/User/navigation'
import ShowBooks from '../../components/Shared/ShowBooks'


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