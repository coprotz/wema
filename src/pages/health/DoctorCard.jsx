import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BsChatLeftDotsFill,BsFillPersonFill, BsCalendarDay } from "react-icons/bs";
import NewChat from '../messages/NewChat';
import { useAuth } from '../../hooks/useAuth';

const DoctorCard = ({d}) => {
    const navigate = useNavigate()
    const { user } = useAuth()
  return (
    <div className="doc_card" key={d.id}>
        <img src={d.photo} />
        <div className="doc_card_details">
            <div className="doc_info">
                <h4>{d.name}</h4>
                {d.specialize}  
            </div>
            <div className="meetings_actions">                    
                <button className='btn'><BsCalendarDay/></button>
                <button className='btn' onClick={() =>navigate(`/health/doctors/${d.id}`)}><BsFillPersonFill/></button>
                <NewChat item={d}/>        
            </div>
            
        </div>
    </div> 
  )
}

export default DoctorCard
