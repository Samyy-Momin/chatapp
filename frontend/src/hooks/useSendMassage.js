import React, { useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from "react-hot-toast";
const useSendMassage = () => {
  const [loading, setLoading] = useState(false);
  const { massages, setMassages, selectedConversation } = useConversation();

  const sendMassage = async (massage) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/massage/send/${selectedConversation._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ massage })
      })

      const data = await res.json()

      if (data.error) throw new Error(data.error)


      setMassages([...massages, data])
    } catch (error) {
      toast.error(error.massage);
    } finally {
      setLoading(false)
    }
  }


  return { sendMassage, loading }
}

export default useSendMassage