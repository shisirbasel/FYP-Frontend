import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Modal } from 'antd';
import { sendGetRequest, sendDeleteRequest, sendPostRequest } from "../utils/api";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const SentTradeRequestCard = ({ request, fetchAllRequests, whoseBook = true }) => {

    const animatedComponents = makeAnimated();
    const [tradeMeet, setTradeMeet] = useState({
        district: null,
        date: null,
        time: null,
        place: null
    });
    
    const [districts, setDistricts] = useState([]);

    const [district, setDistrict] = useState(null);
    const [time, setTime] = useState(null);
    const [date, setDate] = useState(null);
    const [place, setPlace] = useState(null);

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const fetchDistricts = async () => {
        try {
            const response = await sendGetRequest('districts');
    
            const formattedDistricts = response.districts.map(district => ({
                label: district,
                value: district,
            }));
    
            setDistricts(formattedDistricts);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const CancelTradeRequest = async (id) => {
        console.log(id)
        const response = await sendDeleteRequest(`delete/traderequest/${id}`)
        console.log(response)
        fetchAllRequests();
    }

    const handleFormSubmit = async (id) => {
        if (!district) {
            console.error('Please select a district.');
            return;
        }

        const formData = new FormData();
        formData.append('date', date);
        formData.append('traderequest', id);
        formData.append('time', time);
        formData.append('place', place);
        formData.append('district', district);
        console.log(formData);

        try {
            const response = await sendPostRequest('set_trademeet', formData);
            console.log(response);
            setIsModalOpen(false);
            toast.success("Trade Meet Set Successfully.")
            fetchTradeMeet();
        } catch (error) {
            console.error('Error submitting trade meet:', error);
        }
        fetchReceivedRequests();
    }

    const fetchTradeMeet = async () => {
        try{
            const response = await sendGetRequest(`view_trademeet/${request.id}`)
            console.log(response)
            setTradeMeet({
                district: response.district,
                date: response.date,
                time: response.time,
                place: response.place
            });
        }
        catch (error){
            console.log(error)
        }
    }
    useEffect(() => { 
        fetchDistricts(); 
        fetchTradeMeet();
    }, [])

    return (
        <div className="m-auto flex mt-8 bg-white rounded-md ring-2 shadow-md ring-gray-900/5 w-10/12 p-8">

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
                    <p className="text-xl text-gray-700 font-semibold">@{request.offered_book.user.username}</p>
                    {whoseBook && (
                        <p className="text-xl text-red-700 font-bold mt-8">Your Book</p>
                    )}

                </div>
            </div>

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
                    <p className="text-xl text-gray-700 font-semibold">@{request.requested_book.user.username}</p>

                    {whoseBook && (<p className="text-xl text-red-700 font-bold mt-8">Requested Book</p>)}
                </div>
            </div>

            <div className="m-10 mt-4 pt-12 w-4/12 h-64 flex flex-column book-preview gap-10 text-center justify-center">
                <div>
                    <p className="text-2xl font-bold text-black text-center" style={{ marginLeft: '-20px' }}>{request.status}</p>
                </div>
                {request.status === "Pending" ? (
                    <button className='cancel-btn' onClick={() => CancelTradeRequest(request.requested_book.id)}>Cancel Trade Request</button>
                ) : (
                    <>
                        {request.status === "Accepted" ? (
                            <>
                            {
                                tradeMeet.district? 
                                (
                                    <>
                                    
                                        <button className="success-btn" onClick={()=>setIsViewModalOpen(true)}>View Trade Meet</button>

                                        <Modal title="View Trade Meet"
                                            open={isViewModalOpen}
                                            onOk={()=>setIsViewModalOpen(false)}
                                            onCancel={()=>setIsViewModalOpen(false)}
                                            cancelButtonProps={{style: {display: 'none'}}}
                                            okText="Close"
                                            okButtonProps={{ style: { backgroundColor: 'green', width: "150px" } }}
                                        >
                                            <div className="profile-section">
                                                <div className="profile-details" style={{ marginLeft: "50px" }}>
                                                    <form>
                                                        <label htmlFor="date">Date:</label>
                                                        <input
                                                            type="date"
                                                            className="field"
                                                            id="date"
                                                            name="date"
                                                            value={tradeMeet.date}
                                                        />

                                                        <label htmlFor="time">Time:</label>
                                                        <input
                                                            type="time"
                                                            className="field"
                                                            id="time"
                                                            name="time"
                                                            step="1800"
                                                            value={tradeMeet.time}
                                                        />

                                                        <label htmlFor="place">Place:</label>
                                                        <input
                                                            type="text"
                                                            className="field"
                                                            id="place"
                                                            name="place"
                                                            value={tradeMeet.place}
                                                        />

                                                        <label htmlFor="district">District :</label>
                                                        <Select
                                                            isDisabled = {true}
                                                            id="districts"
                                                            closeMenuOnSelect={true}
                                                            components={animatedComponents}
                                                            value={{ label: tradeMeet.district, value: tradeMeet.district }}
                                                            className="select"
                                                            styles={{
                                                                control: (provided, state) => ({
                                                                    ...provided,
                                                                    borderColor: state.isFocused ? 'green' : provided.borderColor,
                                                                    boxShadow: state.isFocused ? '0 0 0 1px #27ae60' : provided.boxShadow,
                                                                    width: '90%'
                                                                }),
                                                            }}
                                                        />

                                                    </form>
                                                </div>
                                            </div>
                                        </Modal>

                                        <button className="success-btn" onClick={showModal}>Set New Trade Meet</button>
                                        <Modal title="Set New Trade Meet"
                                                open={isModalOpen}
                                                onOk={() => { handleFormSubmit(request.id) }}
                                                onCancel={handleCancel}
                                                okText="Set Trade Meet"
                                                okButtonProps={{ style: { backgroundColor: 'green', width: "150px" } }}
                                            >
                                                <div className="profile-section">
                                                    <div className="profile-details" style={{ marginLeft: "50px" }}>
                                                        <form>
                                                            <label htmlFor="date">Date:</label>
                                                            <input
                                                                type="date"
                                                                className="field"
                                                                id="date"
                                                                name="date"
                                                                min={new Date().toISOString().split('T')[0]}
                                                                onChange={(e) => setDate(e.target.value)}
                                                            />

                                                            <label htmlFor="time">Time:</label>
                                                            <input
                                                                type="time"
                                                                className="field"
                                                                id="time"
                                                                name="time"
                                                                step="1800"
                                                                min="07:00" max="18:00"
                                                                onChange={(e) => setTime(e.target.value)}
                                                            />

                                                            <label htmlFor="place">Place:</label>
                                                            <input
                                                                type="text"
                                                                className="field"
                                                                id="place"
                                                                name="place"
                                                                onChange={(e) => setPlace(e.target.value)}
                                                            />

                                                            <label htmlFor="district">District :</label>
                                                            <Select
                                                                id="districts"
                                                                closeMenuOnSelect={false}
                                                                components={animatedComponents}
                                                                options={districts}
                                                                className="select"
                                                                onChange={(selectedOptions) => setDistrict(selectedOptions ? selectedOptions.value : null)}
                                                                styles={{
                                                                    control: (provided, state) => ({
                                                                        ...provided,
                                                                        borderColor: state.isFocused ? 'green' : provided.borderColor,
                                                                        boxShadow: state.isFocused ? '0 0 0 1px #27ae60' : provided.boxShadow,
                                                                        width: '90%'
                                                                    }),
                                                                }}
                                                            />

                                                        </form>
                                                    </div>
                                                </div>
                                            </Modal>
                                    </>

                                ) 
                                : 
                                (
                                    <>
                                             <button className="success-btn" onClick={showModal}>Set Trade Meet</button>

                                            <Modal title="Set Trade Meet"
                                                open={isModalOpen}
                                                onOk={() => { handleFormSubmit(request.id) }}
                                                onCancel={handleCancel}
                                                okText="Set Trade Meet"
                                                okButtonProps={{ style: { backgroundColor: 'green', width: "150px" } }}
                                            >
                                                <div className="profile-section">
                                                    <div className="profile-details" style={{ marginLeft: "50px" }}>
                                                        <form>
                                                            <label htmlFor="date">Date:</label>
                                                            <input
                                                                type="date"
                                                                className="field"
                                                                id="date"
                                                                name="date"
                                                                min={new Date().toISOString().split('T')[0]}
                                                                onChange={(e) => setDate(e.target.value)}
                                                            />

                                                            <label htmlFor="time">Time:</label>
                                                            <input
                                                                type="time"
                                                                className="field"
                                                                id="time"
                                                                name="time"
                                                                step="1800"
                                                                min="07:00" max="18:00"
                                                                onChange={(e) => setTime(e.target.value)}
                                                            />

                                                            <label htmlFor="place">Place:</label>
                                                            <input
                                                                type="text"
                                                                className="field"
                                                                id="place"
                                                                name="place"
                                                                onChange={(e) => setPlace(e.target.value)}
                                                            />

                                                            <label htmlFor="district">District :</label>
                                                            <Select
                                                                id="districts"
                                                                closeMenuOnSelect={false}
                                                                components={animatedComponents}
                                                                options={districts}
                                                                className="select"
                                                                onChange={(selectedOptions) => setDistrict(selectedOptions ? selectedOptions.value : null)}
                                                                styles={{
                                                                    control: (provided, state) => ({
                                                                        ...provided,
                                                                        borderColor: state.isFocused ? 'green' : provided.borderColor,
                                                                        boxShadow: state.isFocused ? '0 0 0 1px #27ae60' : provided.boxShadow,
                                                                        width: '90%'
                                                                    }),
                                                                }}
                                                            />

                                                        </form>
                                                    </div>
                                                </div>
                                            </Modal>
                                    </>
                                )
                            }
                               
                            </>
                        ) : (
                            <>

                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default SentTradeRequestCard;