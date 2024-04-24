import { useEffect, useState } from "react"
import {sendGetRequest, sendPatchRequestWithoutData} from '../utils/api'
import {Modal} from "antd";
import { toast } from "react-toastify";

const SuspendButton = ({user, fetchReports}) => {

    const [isSuspended, setIsSuspended] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const checkUserStatus = async () => {
        const response = await sendGetRequest(`status/${user.id}`)
        setIsSuspended(response.status)
    }

    const handleSuspendUser = async () => {
        const response = await sendPatchRequestWithoutData(`suspend/${user.id}`)
        console.log(response)
        setIsModalOpen(false);
        checkUserStatus();
        toast.success("User Suspended.")
        fetchReports();
    }

    useEffect(()=>{
        checkUserStatus();
    },[])

  return (
    <div className="mt-4">
        {isSuspended? (
            <>
                <h1 className="text-2xl text-red-500 font-semibold">Suspended</h1>
            </>

        ) : (
            <>
                <button 
                className="cancel-btn mx-2 my-5" 
                onClick={(e)=>{
                    e.preventDefault();
                    setIsModalOpen(true)
                }}>Suspend User</button>

                <Modal
                  title="Suspend User"
                  open={isModalOpen}
                  onOk={handleSuspendUser}
                  onCancel={()=>setIsModalOpen(false)}
                  okText= "Suspend"
                  okButtonProps={{ style: { backgroundColor: 'red', width: "90px" }}}
                >
                    Are you sure you want to suspend this user?
                </Modal>
            </>
        ) }
    </div>
  )
}

export default SuspendButton