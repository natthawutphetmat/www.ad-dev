"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

function App() {
  const [data, setData] = useState([]);

  const callApi = async () => {
    try {
      const res = await axios.get("https://apipost.ad-dev.net/api/images");
      setData(res.data); // ตั้งค่าข้อมูลทั้งหมดที่ได้รับจาก API
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  useEffect(() => {
    callApi();
  }, []);


  const formatToThailandTime = (timeString) => {
    const date = new Date(timeString);
    const options = {
        timeZone: 'Asia/Bangkok',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // ใช้รูปแบบ 24 ชั่วโมง
    };
    const dateTimeString = date.toLocaleString('th-TH', options);

    // แยกส่วนของวันที่และเวลา
    const [datePart, timePart] = dateTimeString.split(' ');

    // ตัดส่วนของปีออก และใช้นี้ '/' เป็นตัวคั่นในวันที่
    const formattedDate = datePart.split('/').slice(0, 2).join('/');

    return `${formattedDate} = ${timePart}`;
  }

  return (
    <>
      {data.map((item, index) => (
        <div key={index}>
          <div className="card mb-3">
            <h2 className="card-header">{item.title}</h2>


          {item.videos ? (
        
              <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${item.videos}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            >

            </iframe>


          
            ):(
            <div className='postimg'> 
            <Image src={`https://apipost.ad-dev.net/uploads/${item.filename}`} className="cardimg"   loading="lazy" width={600} height={300} alt={item.title} /> 
            </div>
            
            )}
            <div className="card-body">
              <h4 className="card-title">{item.headline}</h4>
              <p className="card-text">{item.content}</p>
              <hr />
              <p className="card-text"><small className="text-muted">{formatToThailandTime(item.time)}</small></p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default App
