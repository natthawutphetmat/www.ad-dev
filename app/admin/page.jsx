"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Admin = () => {
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState('');
    const [headline, setHeadline] = useState('');
    const [content, setContent] = useState('');
    const [videos, setVideos] = useState('');
    const [addok, setAddok] = useState('');
    const [selectedFiles, setSelectedFiles] = useState(null);

    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get('https://post-api.ad-dev.net/get');
            setFiles(response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('headline', headline);
        formData.append('content', content);
        formData.append('videos', videos);

        if (selectedFiles && selectedFiles.length > 0) {
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('files', selectedFiles[i]);
            }
        }

        try {
            await axios.post('https://post-api.ad-dev.net/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchFiles();
            setAddok('เรียบร้อย');
            setTimeout(() => setAddok(''), 3000); // รีเซ็ตข้อความหลังจาก 3 วินาที
            
            // เคลียร์ฟอร์ม
            setTitle('');
            setHeadline('');
            setContent('');
            setVideos('');
            setSelectedFiles(null);
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://post-api.ad-dev.net/delete/${id}`);
            fetchFiles();
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const extractYouTubeID = (url) => {
        const regExp = /^.*(youtu\.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=|\?v=|\/videos\/|\/embed\/|\/v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    return (
        <div>
            {addok}
            <form className='login' onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" className='form-control mb-3' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Headline" className='form-control mb-3' value={headline} onChange={(e) => setHeadline(e.target.value)} />
                <textarea placeholder="Content" className='form-control mb-3' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <input type="text" placeholder="Videos" className='form-control mb-3' value={videos} onChange={(e) => setVideos(e.target.value)} />
                <input type="file" className='form-control mb-3' multiple onChange={handleFileChange} />
                <button type="submit" className='btn btn-info'>Upload</button>
            </form>

            <div className="container text-center m-5">
                <ul>
                    {files.map(item => (
                        <main key={item.id}>
                               <button onClick={() => handleDelete(item.id)} className='mb-5'>Delete</button>
                            {item.filename ? (
                                <div className='Postimg'> 
                                    <img src={`https://post-api.ad-dev.net/uploads/${item.filename}`} alt={item.title} width={100} height={100} />
                                </div>
                            ) : (
                                <div className='Postvdo'>
                                    <iframe className='vdo' 
                                        src={`https://www.youtube.com/embed/${extractYouTubeID(item.videos)}`}
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen>
                                    </iframe>
                                </div>
                            )}
                            <p>Title: {item.title}</p>
                            <p>Headline: {item.headline}</p>
                            <p>Content: {item.content}</p>
                            <hr />
                        </main>
                    ))}
                    <hr />
                </ul>
            </div>
        </div>
    );
};

export default Admin;
