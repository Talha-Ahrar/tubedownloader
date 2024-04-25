import React, { useState, useEffect } from "react";
import axios from "axios";

import { copy, linkIcon, loader, tick } from "../assets";
const rapidApiKey = import.meta.env.VITE_RAPID_API_Youtube_DOWNLOAD_KEY
const Demo = () => {
  const [article, setArticle] = useState({});
  const [isFetching, setIsFetching] = useState(false); 
  const [videoData, setVideoData] = useState({});
  
  const handleSubmit = async (e) => {
    setVideoData({})
    e.preventDefault();
    setIsFetching(true);

    const videoId = extractYouTubeVideoId(article.url);
    
    try {
      const options = {
        method: 'GET',
        url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
        params: { id: videoId },
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
        }
      };
  
      const response = await axios.request(options);
      if (response.data.status === "fail" && response.data.code === 403) {
        console.log("Invalid request:", response.data.error);
        console.log("YouTube Link:", article.url);
      } else {


        console.log(response.data);
        setVideoData(response.data);

        // const filteredAudioData = response.data.adaptiveFormats.filter(
        //   (format) => format.mimeType.includes("audio/webm")
        // );

      }
      
      setVideoData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };


  const handleVideoButtonClick = () => {
    // setDisplayAudio(false);
};



  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const extractYouTubeVideoId = (url) => {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    if (match) {
        return match[1]; // Return the captured video ID
    }
    return null;
};

  const convertBitrateToMbps = (bitrateBps) => {
    return (bitrateBps / 1000000).toFixed(2); // Convert to Mbps and round to 2 decimal places
  };
  
  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2'>
        <form
          className='relative flex justify-center items-center'
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt='link-icon'
            className='absolute left-0 my-2 ml-3 w-5'
          />
          <input
            type='url'
            placeholder='Paste the YouTube video link'
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            pattern="^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}$"
            className='url_input peer text-black'
          />
          <button
            type='submit'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 '
          >
            <p>↵</p>
          </button>
        </form>
      </div>
<br></br>
      {videoData.title  ? (   
      
    
      <div class="max-w rounded overflow-hidden shadow-lg flex  border border-white">

<img class="w-1/2" src={videoData.thumbnail[3].url} alt="Thumbnail"/>

  
      <div class="w-1/2 p-4">
        <div class="font-bold text-xl mb-2">{videoData.title}</div>
    
        <p className="text-sm">{(parseInt(videoData.lengthSeconds) / 60).toFixed(2)} minutes</p>

      </div>
    </div>
    
    
    
    
    ):(
  <br></br>
)}


      <div className='my-10 max-w-full flex justify-center items-center'>
      {isFetching ? (
        
  <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
) : videoData.title ? (

  
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {/* Map over adaptive formats to display each format in a card */}
    {videoData.adaptiveFormats && videoData.adaptiveFormats.map((format, index) => (
      <div key={index} className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
     <h3 className="text-lg font-semibold">File Type: {format.mimeType.split(';')[0]}</h3>
<br></br>
    
        <p className="text-sm">Bitrate: {convertBitrateToMbps(format.averageBitrate)} Mbps</p>
        <p className="text-sm">Quality: {format.quality}</p>
       <button onClick={() => window.open(format.url)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Download</button>
      </div>
    ))}
  </div>
) : (
  <p></p>
  
)}
      </div>
    </section>
 
  );
};

export default Demo;
