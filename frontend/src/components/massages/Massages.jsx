import React, { useEffect, useRef } from 'react'
import Massage from './Massage'
import useGetMassages from '../../hooks/useGetMassages'
import MassageSkeleton from '../skeletons/MassageSkeleton';
import useListenMassages from '../../hooks/useListenMassages';
const Massages = () => {
  const { massages, loading } = useGetMassages();

  useListenMassages();
  // console.log("massages", massages)
  const lastMassageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMassageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [massages])
  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading &&
        massages.length > 0 &&
        massages.map((massage) => (
          <div key={massage._id} ref={lastMassageRef}>
            <Massage massage={massage} />
          </div>
        ))
      }
      {loading && [...Array(3)].map((_, idx) => <MassageSkeleton key={idx} />)}
      {!loading && massages.length === 0 && (
        <p className='text-center'>Send Massage to start the Conversation</p>
      )}
    </div>
  )
}

export default Massages