"use client"
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Post() {
    const [data, setData] = useState([]);

    const callApi = async () => {
        try {
            const res = await axios.get("https://post-api.ad-dev.net/get"); // แทนที่ด้วย URL ของ API จริงของคุณ
            setData(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        callApi();
    }, []);


    const extractYouTubeID = (url) => {
        const regExp = /^.*(youtu\.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=|\?v=|\/videos\/|\/embed\/|\/v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <div className="container">
            <main>
                {data.map(item => (
                    <div key={item.id} className="post">
                        <h2>{item.title}</h2>
                        <h3>{item.headline}</h3>
                        <p>{item.content}</p>
                        
                        {item.filename ? (
                            <Image 
                                src={`https://post-api.ad-dev.net/${item.url}`} 
                                alt={item.title} 
                                width={200} 
                                height={200} 
                            />
                        ) : null}
                        
                        {item.videos ? (
                            <iframe className='vdo' 
                            src={`https://www.youtube.com/embed/${extractYouTubeID(item.videos)}`}
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                        ) : null}
                        
                        <hr />
                    </div>
                ))}
            </main>
        </div>
    );
}
