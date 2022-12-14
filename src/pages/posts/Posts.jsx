import React from 'react'
import './posts.css'
import SharePost from '../posts/SharePost';
import PostCard from '../posts/PostCard';
import VideoCard from '../posts/VideoCard';
import AudioPlayer from '../posts/AudioPlayer';
import {  BsArrowLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import NikahCard from '../nikah/NikahCard';
import MadaCard from '../mada/MadaCard';
import MeetingCard from '../meetings/MeetingCard';
import Remarks from '../../components/remarks/Remarks';
import {  BsArrowRight } from "react-icons/bs";
import img1 from '../../assets/images/img1.png'
import img2 from '../../assets/images/img2.jpg'
import img3 from '../../assets/images/img3.jpg'
import img4 from '../../assets/images/img4.jpg'
import img5 from '../../assets/images/img5.jpg'
import img6 from '../../assets/images/img6.jpg'
import img7 from '../../assets/images/img7.jpg'
import img9 from '../../assets/images/img9.jpg'
import useData from '../../hooks/useData';
import ShareVideo from './ShareVideo';
import { useState } from 'react';
import ShareAudio from './ShareAudio';
import ImageCard from './ImageCard';
import ShareImage from './ShareImage';
import moment from 'moment'
import Search from '../../components/search/Search';
import { useAuth } from '../../hooks/useAuth';


const nikahs = [
  {name: 'Asha Juma', url: img1,  live: 'Tanga', tribe: 'Zaramo', age:'25'},
  {name: 'Juma Rashid', url: img2,  live: 'Moshi', tribe: 'Haya', age:'30'},
  {name: 'Mwana Achi', url: img3,  live: 'Kisarawe', tribe: 'Fipa', age:'18'},
  {name: 'Haruna Shani', url: img4,  live: 'Dar es Salaam', tribe: 'Ruguru', age:'40'},
  {name: 'Shykuru Hamisi', url: img5,  live: 'Zanzibar', tribe: 'Pare', age:'55'},
  {name: 'Mwanaisha Abdul', url: img6,  live: 'Pemba', tribe: 'Sukuma', age:'27'},
  {name: 'Hamisa Mbeto', url: img7,  live: 'Mbeya', tribe: 'Hehe', age:'80'},
  {name: 'Bob Marley', url: img9,  live: 'Iringa', tribe: 'Chaga', age:'12'},
]




const Posts = () => {
  const navigate = useNavigate();
    const scrollRef = React.useRef(null);
    const [video, setVideo] = useState(false)
    const [audio, setAudio] = useState(false)
    const [image, setImage] = useState(false)
    const { user } = useAuth()
    const { posts, users, questions, marriages } = useData();
    const cuUser = users?.find(u => u.id === user.uid)

    const RenderPost = (p) => {
        if(p.type === 'text'){
            return (
                <PostCard key={p.id} p={p}/> 
            )
        }else if(p.type === 'video'){
            return (
                <VideoCard key={p.id} p={p}/>                
            )
        }else if(p.type === 'doc'){
            return (
                <VideoCard key={p.id} p={p}/>                
            )
        }else if(p.type === 'audio'){
            return (
                <AudioPlayer key={p.id} p={p}/>                
            )
        }else if(p.type === 'image'){
            return (
                <ImageCard key={p.id} p={p}/>                
            )
        }
    }

    React.useLayoutEffect(() => {
        if(scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      })

  return (
    <div className="posts" ref={scrollRef}> 
        {video && <ShareVideo setVideo={setVideo}/> }   
        {audio && <ShareAudio setAudio={setAudio}/> }   
        {image && <ShareImage setImage={setImage}/> }          
        <div className="posts_wrapper">
          <div className="posts_inner">
            <div className="posts_cont">
                <SharePost setVideo={setVideo} setAudio={setAudio} setImage={setImage}/> 
                <Search title='Tafuta Chapisho'/>  
            </div>
                   
              <motion.div 
                  initial={{ y:'100vw'}}
                  animate={{y:0}} 
                  transition={{ ease: "easeOut", duration: 0.5 }} 
                  className="post_grids">
                    {posts?.map(p => (
                      <div>{RenderPost(p)} </div>
                    ))}
               </motion.div> 
          </div>
          <div className="main_right">
            <div className="main_right_item">
                <h3 className="card_title">
                    Waliojiunga Punde
                    <button className='btn_view' onClick={() =>navigate('/members')}><BsArrowRight/></button>
                </h3>
                                
                <div className="new_users">
                    {users?.slice(0,7).map(u => (
                        <div className="new_user">
                            <img src={u.photo} alt="" />
                        </div>
                    ))}                              
                </div>
                            
                </div>
            <div className="main_right_item">
                <h3 className="card_title">
                    Ukumbi wa Nikah
                    <button className='btn_view' onClick={() =>navigate('/nikah')}><BsArrowRight/></button>
                </h3>                          
                <div className="nikah_imgs">
                    {marriages && marriages.filter(m =>m.gender !== cuUser?.gender).slice(0,5).map((item, index) => (
                    <NikahCard key={index} item={item}/>
                     ))}
                </div>       
                </div>
                <div className="donate" onClick={() =>navigate('/subscriptions')}>
                    Tuunge Mkono
                    <button className='btn_next'><BsArrowRight/></button>
                </div>
                <div className="main_right_item">
                    <h3 className="card_title">
                        Mada ya Wiki
                        <button className='btn_view' onClick={() =>navigate('/madas')}><BsArrowRight/></button>
                    </h3>                            
                    <MadaCard/>
                            
                </div>
                
                        <div className="main_right_item">
                            <h3 className="card_title">
                                Swali Maarufu 
                                <button className='btn_view' onClick={() =>navigate('/questions')}><BsArrowRight/></button>
                            </h3>
                           {questions.slice(0,1).map(q => (
                                <>
                                <div className="help" key={q.id}>
                                    <div className="help_sender">
                                        <img src={q.photo} alt="" />
                                    </div>
                                    <div className="help_text">
                                    <h4>{q.que}</h4> 
                                    <span className='timeago'>{moment(q?.createdAt?.toDate()).fromNow(true)}</span>
                                    </div>
                                    
                                </div>
                                <Remarks/>                                
                                </>
                           ))}
                           
                            
                        </div>
                </div>
        </div>
             
    </div>
  )
}

export default Posts