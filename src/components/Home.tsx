import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return <div className="home">
    <section className="video">
      <video loop autoPlay>
        <source type="video/mp4" src="https://media.contentapi.ea.com/content/dam/ea/command-conquer/remastered/videos/2020/03/ccrem-section-bg-video-deep-dive-trailer-darkened.mp4" />
        <source type="video/webm" src="https://media.contentapi.ea.com/content/dam/ea/command-conquer/remastered/videos/2020/03/ccrem-section-bg-video-deep-dive-trailer-darkened.webm" />
      </video>
      <header className="header">
        <div className="top" data-aos="fade-up" data-aos-duration="750" data-aos-delay="300">Najlepszy katalog gier z ocenami</div>
        <div data-aos="fade-down" data-aos-duration="750" data-aos-delay="300">w sieci!</div>
        <div data-aos="fade-down" data-aos-duration="500" data-aos-delay="1000" className="move-down">
          <div>
            <Link to="/games">
              kliknij po więcej!
            </Link>
          </div>
        </div>
      </header>
    </section>
  </div>
};

export default Home;
