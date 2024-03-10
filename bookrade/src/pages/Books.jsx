import Sidebar from '../components/SideBar'
import ShowBooks from '../components/ShowBooks'

const Books = () => {
  return (
    <div style={{display:'flex'}}>
        <Sidebar/>
        <ShowBooks/>
    </div>
  )
}

export default Books