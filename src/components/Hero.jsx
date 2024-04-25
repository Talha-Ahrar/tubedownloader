import React from "react";
import { logo } from "../assets";
import { FaGithub, FaGitlab } from "react-icons/fa";

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img src={logo} alt='sumz_logo' className='w-28 object-contain' />

        {/* Container for icon buttons */}
        <div className='flex'>
          <a
            href="https://github.com/Talha-Ahrar"
            target="_blank"
            rel="noopener noreferrer"
            className='black_btn mr-2 flex items-center' // Add mr-2 for margin between buttons
          >
            <FaGithub className="mr-1" /> GitHub
          </a>

          <a
            href="https://gitlab.com/Talha.saeed"
            target="_blank"
            rel="noopener noreferrer"
            className='black_btn flex items-center'
          >
            <FaGitlab className="mr-1" /> GitLab
          </a>
        </div>
      </nav>

      <h1 className='head_text'>
       Download Youtube videos with <br className='max-md:hidden' />
        <span className='orange_gradient'>TubeDownloader</span>
      </h1>
      <h2 className='desc'>
        TubeDownloader simplifies the process of saving YouTube videos to your device. Easily copy and paste video links, and enjoy downloading your favorite content hassle-free. With TubeDownloader, access your videos offline anytime, anywhere.
      </h2>
    </header>
  );
};

export default Hero;
