import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';
const Massage = ({massage}) => {
  const {authUser} = useAuthContext();
  const {selectedConversation}=useConversation();
  const fromMe = massage.senderId === authUser._id;
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const extractedTime = extractTime(massage.createdAt)
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : "";

  return (
    <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img src={profilePic} />
            </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{massage.massage}</div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{extractedTime}</div>
    </div>
  )
}

export default Massage