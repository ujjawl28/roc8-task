import React,{useState,useEffect} from 'react';
import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { select} from '../../redux/reduxSlice';

export default function Home() {
    const [allMail,setAllMail] = useState([]);
    const [isClick,setIsClick] = useState(false);
    const [selectedItem,setSelectedItem] = useState({})
    const [description,setDescription] = useState({})
    const dispatch  = useDispatch();
    const favoriteArr = useSelector((state)=>{
        return state.favorite.favorites
    })

    useEffect(function (){
        
     if(selectedItem.id){
    fetch(`https://flipkart-email-mock.vercel.app/?id=${selectedItem.id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data); 
      
      setDescription(data); 
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}
    },[selectedItem])

    useEffect(function (){
        
        fetch(`https://flipkart-email-mock.now.sh/`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.list); // Log the data to the console
          setAllMail(data.list); // Update the state with the fetched data
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    
        },[])


  return (
    <div>
        <nav>
         <h3>Filter By :</h3>
          <h3>Unread</h3>
          <h3 className='read'>Read</h3>
          <h3>Favorites</h3>
        </nav>
         

         
        
         {
            !isClick ?  
            allMail.map((ele,idx)=>{
                console.log(ele)
                let d = new Date(ele.date);
                let date = d.getDate();
                let month = d.getMonth();
                let year = d.getFullYear();
                return(
                    <div key={ele.id} onClick={()=> {
                    setSelectedItem({id:ele.id})
                    setIsClick(true)
                    }}>
                        <div className='item'>
                            <div className='char'>
                            <span>{ele.from.email.charAt(0).toUpperCase()}</span>
                            </div>
                            <div className='allDetails'>
                               <h3>From : {ele.from.email}</h3>
                               <h3>Subject : {ele.subject}</h3>
                               <h3>{date}/{month}/{year}</h3>
                               <h3></h3>
                            </div>
                        </div>
                       
                    </div>
                )
            })
         :
         <main className='mainBody'>
         <div>
         {
           allMail.map((ele,idx)=>{
                console.log(ele)
                let d = new Date(ele.date);
                let date = d.getDate();
                let month = d.getMonth();
                let year = d.getFullYear();
                let hour = d.getHours().toString().padStart(2,0);
                let min = d.getMinutes().toString().padStart(2,0);
                let sec = d.getSeconds().toString().padStart(2,0);

                return(
                    <div key={ele.id} onClick={()=> {
                    setSelectedItem({id:ele.id})
                    setIsClick(true)
                    }}>
                        <div className='item'>
                            <div className='char'>
                            <span>{ele.from.email.charAt(0).toUpperCase()}</span>
                            </div>
                            <div className='allDetails'>
                               <h3>From : {ele.from.email}</h3>
                               <h3>Subject : {ele.subject}</h3>
                               <h3>{date}/{month}/{year}</h3>
                                <h3>{hour}:{min}:{sec}</h3>
                               <h3 className='favoriteClass'>{favoriteArr.includes(ele.id) ? 'favorites':''}</h3>
                            </div>
                        </div>
                       
                    </div>
                )
            })
         }
         </div>
           <div>
                    <div className='item'>
             <div className='char'>
              <span>{allMail[selectedItem.id].from.email.charAt(0).toUpperCase()}</span>
                 </div>
                 <div >
                <div className='seletedHeading'>
                                <div >
                      <h1>{allMail[selectedItem.id].subject}</h1>
                                <p></p>
                                </div>
                                <button className='favoriteButton'
                                onClick={()=>{
                                    dispatch(select(selectedItem.id))
                                }}>Mark As Favorites</button>
                                </div>
                                 <div dangerouslySetInnerHTML={{__html:description.body}}>
                                    
                                  </div>
                            </div>
                        </div>
                            </div>
        
         </main>
    
 }  
 </div>
 )
}
