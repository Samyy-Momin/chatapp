import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast'

const useGetMassages = () => {
  const [loading,setLoading] = useState(false);
  const { massages, setMassages, selectedConversation } = useConversation();

  useEffect(()=>{
    const getMassages = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/massage/${selectedConversation._id}`);
            const data =await res.json();
            if (data.error) throw new Error(data.error)
            setMassages(data);
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    if (selectedConversation?._id) getMassages();
  },[selectedConversation?._id,setMassages])

  return { massages,loading }
}

export default useGetMassages