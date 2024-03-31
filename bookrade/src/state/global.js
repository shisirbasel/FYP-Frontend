import { create } from 'zustand'
import { getToken } from '../utils/token'

const ADDRESS = "localhost:8000"
const useGlobal = create((set)=>({
    socket: null,

    socketConnect: async () => {
        const token = getToken();

        const socket = new WebSocket(
           `ws://${ADDRESS}/chat/?token=${token}`
        )
        socket.onopen = () => {
            console.log("socket open")
        }
        socket.onmessage = () => {
            console.log("socket message")
        }
        socket.onerror = () => {
            console.log("socket error")
        }
        socket.onclose = () => {
            console.log("socket close")
        }

        set((state) => ({
            socket: socket
        }))
    },

    socketClose: () => {

    }

}))

export default useGlobal
