import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMassages = () => {
    const { socket } = useSocketContext();
    const { massages, setMassages } = useConversation();

    useEffect(() => {
        socket?.on("newMassage", (newMassage) => {
            newMassage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMassages([...massages, newMassage]);
        });

        return () => socket?.off("newMassage");
    }, [socket, setMassages, massages]);
};
export default useListenMassages;