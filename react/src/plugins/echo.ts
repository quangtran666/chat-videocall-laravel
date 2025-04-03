import Echo from "laravel-echo"

import Pusher from "pusher-js"
import axiosInstance from "@/plugins/axios.ts";

// Extend Window interface to include Pusher
declare global {
    interface Window {
        Pusher: typeof Pusher
    }
}

// Make Pusher globally available
window.Pusher = Pusher

export const echo = new Echo({
    broadcaster: import.meta.env.VITE_BROADCAST_CONNECTION,
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
    // @ts-ignore
    authorizer: (channel, options) => {
        return {
            // @ts-ignore
            authorize: async (socketId, callback) => {
                try {
                    const response = await axiosInstance.post('broadcasting/auth', {
                        socket_id: socketId,
                        channel_name: channel.name
                    });
                    callback(false, response.data)
                } catch (error) {
                    // @ts-ignore
                    callback(true, error.response)
                }
            }
        }
    }
});