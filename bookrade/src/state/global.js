import { create } from 'zustand';
import { getToken } from '../utils/token';

const ADDRESS = "localhost:8000";

function responseMessageList(set, get, data) {
    if (data.messages && Array.isArray(data.messages)) {
        const newMessages = data.messages.filter(message => {
            return !get().messagesList.some(existingMessage => existingMessage.id === message.id);
        });

        set((state)=> ({
            messagesList: [...state.messagesList, ...newMessages]
        }));
    } else {
        console.error('Invalid or missing messages in the data:', data);
    }
}

function responseMessageSend(set, get, data, id) {
    if (data.message && data.message.id) { 
        const newMessage = data.message;
        
        // Check if the message sender or receiver matches the provided ID
        if (newMessage.sender === id || newMessage.receiver === id) {
            const isDuplicate = get().messagesList.some(existingMessage => existingMessage.id === newMessage.id);
            
            if (!isDuplicate) {
                set((state) => ({
                    messagesList: [...state.messagesList, newMessage]
                }));
            } else {
                console.log('Duplicate message detected, ignoring:', newMessage);
            }
        }
    } else {
        console.error('Invalid or missing message ID in the data:', data);
    }
}

const useGlobal = create((set, get) => ({ 

    socket: null,

    socketConnect: async (id) => { // Accept 'id' parameter
        const token = getToken();

        const socket = new WebSocket(
           `ws://${ADDRESS}/chat/?token=${token}`
        )
        socket.onopen = () => {
            console.log("socket open")
        }
        
        socket.onmessage = (event) => {
            const parsed = JSON.parse(event.data)
            console.log("message :", parsed)

            const response = {
                'message.list': responseMessageList,
                'message.send': responseMessageSend,
                
            }

            const resp = response[parsed.source]

            if(!resp){
                console.log("parsed source : ", parsed.source + "not found")
                return
            }
            resp(set, get, parsed.data, id);
        }


        socket.onerror = () => {
            console.log("socket error")
        }
        socket.onclose = () => {
            console.log("socket close")
        }

        set({ socket });
    },

    socketClose: () => {
        const socket = get().socket; // Access socket using get function
        if (socket) {
            socket.close();
            set({ socket: null }); // Reset socket state
        }
    },

    messageSend: (id, message) => {
        const socket = get().socket; 
        socket.send(JSON.stringify({
            source: 'message.send',
            id: id, 
            message: message
        }));
    
    },

    messagesList: [],

    messageList: async (id, page = 0) => {
        const socket = get().socket;
    
        // Wait until the WebSocket is connected
        while (!socket || socket.readyState !== WebSocket.OPEN) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        try {
            if (page === 0) {
                set({ messagesList: [] });
            }
    
            socket.send(JSON.stringify({
                source: 'message.list',
                id: id,
                page: page
            }));

        } catch (error) {
            console.error("Error sending message list request:", error);
        }
    },

    

}));

export default useGlobal;
