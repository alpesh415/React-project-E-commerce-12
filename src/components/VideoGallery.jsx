// import React, { useRef, useState } from 'react';
// import '../styles/components/VideoGallery.css';
// import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

// const VideoGallery = () => {
//   const videos = [
//     {
//       id: 1,
//       thumbnail: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400',
//       videoUrl: 'https://www.indianterrain.com/cdn/shop/files/quinn_nri343zteztpxumubhtum824.mp4#t=0.1',
//       title: 'One shirt. Three ways. Endless...',
//       logo: 'https://www.indianterrain.com/cdn/shop/files/IT-logo-subtitle-01.png?v=1750325497&width=200'
//     },
//     {
//       id: 2,
//       thumbnail: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400',
//       videoUrl: 'https://www.indianterrain.com/cdn/shop/files/quinn_miyk5ci63ktdzo0un38lr61s.mp4#t=0.1',
//       title: "Style isn't just what you wear...",
//       logo: 'https://www.indianterrain.com/cdn/shop/files/IT-logo-subtitle-01.png?v=1750325497&width=200'
//     },
//     {
//       id: 3,
//       thumbnail: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400',
//       videoUrl: 'https://www.indianterrain.com/cdn/shop/files/quinn_z6ja0m5byole7zf6y9oxzjgp.mp4#t=0.1',
//       title: 'From checks that charm to pri...',
//       logo: 'https://www.indianterrain.com/cdn/shop/files/IT-logo-subtitle-01.png?v=1750325497&width=200'
//     },
//     {
//       id: 4,
//       thumbnail: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400',
//       videoUrl: 'https://www.indianterrain.com/cdn/shop/files/quinn_dybomgkf4ygvp9opz7g1ihhr.mp4#t=0.1',
//       title: 'Smart meets comfort. Elevate y...',
//       logo: 'https://www.indianterrain.com/cdn/shop/files/IT-logo-subtitle-01.png?v=1750325497&width=200'
//     },
//     {
//       id: 5,
//       thumbnail: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400',
//       videoUrl: 'https://www.indianterrain.com/cdn/shop/files/quinn_bxtzb3cge16ej0mpsho9s859.mp4#t=0.1',
//       title: 'Gear up for summer with our mu...',
//       logo: 'https://www.indianterrain.com/cdn/shop/files/IT-logo-subtitle-01.png?v=1750325497&width=200'
//     },
//     {
//       id: 6,
//       thumbnail: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400',
//       videoUrl: 'https://www.indianterrain.com/cdn/shop/files/quinn_dfgcor1tg28xis8bz5njxq4r.mp4#t=0.1',
//       title: 'Three misfits, one tuk-tuk, no...',
//       logo: 'https://www.indianterrain.com/cdn/shop/files/IT-logo-subtitle-01.png?v=1750325497&width=200'
//     }
//   ];

//   const [playingVideo, setPlayingVideo] = useState(null);
//   const [mutedVideos, setMutedVideos] = useState({});
//   const videoRefs = useRef({});

//   const handlePlayPause = (videoId) => {
//     const video = videoRefs.current[videoId];
//     if (!video) return;

//     if (playingVideo === videoId) {
//       video.pause();
//       setPlayingVideo(null);
//     } else {
//       // Pause all other videos
//       Object.keys(videoRefs.current).forEach((id) => {
//         if (videoRefs.current[id] && id !== videoId.toString()) {
//           videoRefs.current[id].pause();
//         }
//       });
//       video.play();
//       setPlayingVideo(videoId);
//     }
//   };

//   const toggleMute = (videoId, e) => {
//     e.stopPropagation();
//     const video = videoRefs.current[videoId];
//     if (!video) return;

//     video.muted = !video.muted;
//     setMutedVideos({ ...mutedVideos, [videoId]: video.muted });
//   };

//   return (
//     <section className="video-gallery-section">
//       <div className="video-gallery-container">
//         <div className="video-gallery-header">
//           <h2>@indianterrainofficial</h2>
//           <div className="header-underline"></div>
//         </div>

//         <div className="video-gallery-grid">
//           {videos.map((video) => (
//             <div
//               key={video.id}
//               className="video-card"
//               onClick={() => handlePlayPause(video.id)}
//             >
//               <div className="video-wrapper">
//                 <video
//                   ref={(el) => (videoRefs.current[video.id] = el)}
//                   className="video-element"
//                   poster={video.thumbnail}
//                   loop
//                   muted={mutedVideos[video.id] !== false}
//                   playsInline
//                   autoPlay
//                 >
//                   <source src={video.videoUrl} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>

//                 {/* Logo Overlay */}
//                 <div className="video-logo">
//                   <img src={video.logo} alt="Indian Terrain" />
//                 </div>


//                 {/* Controls */}
//                 {playingVideo === video.id && (
//                   <div className="video-controls">
//                     <button
//                       className="mute-btn"
//                       onClick={(e) => toggleMute(video.id, e)}
//                     >
//                       {mutedVideos[video.id] === false ? (
//                         <Volume2 size={20} />
//                       ) : (
//                         <VolumeX size={20} />
//                       )}
//                     </button>
//                   </div>
//                 )}

//                 {/* Title Overlay */}
//                 <div className="video-title">
//                   <p>{video.title}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//     </section>

//   );
// };

// export default VideoGallery;








import React, { useRef, useState } from 'react';
import '../styles/components/VideoGallery.css';
import { Volume2, VolumeX } from 'lucide-react';

const VideoGallery = () => {
  const videos = [
    {
      id: 1,
      thumbnail:
        'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400',
      videoUrl:
        'https://www.indianterrain.com/cdn/shop/files/quinn_nri343zteztpxumubhtum824.mp4#t=0.1',
      title: 'One shirt. Three ways. Endless...',
      logo:
        'https://www.indianterrain.com/cdn/shop/files/IT-logo-subtitle-01.png?v=1750325497&width=200'
    },
    {
      id: 2,
      thumbnail:
        'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400',
      videoUrl:
        'https://www.indianterrain.com/cdn/shop/files/quinn_miyk5ci63ktdzo0un38lr61s.mp4#t=0.1',
      title: "Style isn't just what you wear...",
      logo:
        'https://www.indianterrain.com/cdn/shop/files/IT-logo-subtitle-01.png?v=1750325497&width=200'
    },
    {
      id: 3,
      thumbnail:
        'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400',
      videoUrl:
        'https://www.indianterrain.com/cdn/shop/files/quinn_z6ja0m5byole7zf6y9oxzjgp.mp4#t=0.1',
      title: 'From checks that charm to pri...',
      logo:
        'https://www.indianterrain.com/cdn/shop/files/IT-logo-subtitle-01.png?v=1750325497&width=200'
    },
    {
      id: 4,
      thumbnail:
        'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400',
      videoUrl:
        'https://www.indianterrain.com/cdn/shop/files/quinn_dybomgkf4ygvp9opz7g1ihhr.mp4#t=0.1',
      title: 'Smart meets comfort. Elevate y...',
      logo:
        'https://www.indianterrain.com/cdn/shop/files/IT-logo-subtitle-01.png?v=1750325497&width=200'
    },
    {
      id: 5,
      thumbnail:
        'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400',
      videoUrl:
        'https://www.indianterrain.com/cdn/shop/files/quinn_bxtzb3cge16ej0mpsho9s859.mp4#t=0.1',
      title: 'Gear up for summer with our mu...',
      logo:
        'https://www.indianterrain.com/cdn/shop/files/IT-logo-subtitle-01.png?v=1750325497&width=200'
    },
    {
      id: 6,
      thumbnail:
        'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400',
      videoUrl:
        'https://www.indianterrain.com/cdn/shop/files/quinn_dfgcor1tg28xis8bz5njxq4r.mp4#t=0.1',
      title: 'Three misfits, one tuk-tuk, no...',
      logo:
        'https://www.indianterrain.com/cdn/shop/files/IT-logo-subtitle-01.png?v=1750325497&width=200'
    }
  ];

  const [playingVideo, setPlayingVideo] = useState(null);
  const [mutedVideos, setMutedVideos] = useState({});
  const videoRefs = useRef({});

  const handlePlayPause = (videoId) => {
    const video = videoRefs.current[videoId];

    if (!video) return;

    if (playingVideo === videoId) {
      video.pause();
      setPlayingVideo(null);
    } else {
      Object.keys(videoRefs.current).forEach((id) => {
        if (
          videoRefs.current[id] &&
          id !== videoId.toString()
        ) {
          videoRefs.current[id].pause();
        }
      });

      video.play();
      setPlayingVideo(videoId);
    }
  };

  const toggleMute = (videoId, e) => {
    e.stopPropagation();

    const video = videoRefs.current[videoId];

    if (!video) return;

    video.muted = !video.muted;

    setMutedVideos({
      ...mutedVideos,
      [videoId]: video.muted
    });
  };

  return (
    <section className="video-gallery-section">
      <div className="video-gallery-container">
        <div className="video-gallery-header">
          <h2>@indianterrainofficial</h2>
          <div className="header-underline"></div>
        </div>

        <div className="video-gallery-grid">
          {videos.map((video) => (
            <div
              key={video.id}
              className="video-card"
              onClick={() => handlePlayPause(video.id)}
            >
              <div className="video-wrapper">
                <video
                  ref={(el) => {
                    videoRefs.current[video.id] = el;
                  }}
                  className="video-element"
                  poster={video.thumbnail}
                  loop
                  muted={mutedVideos[video.id] !== false}
                  playsInline
                  autoPlay
                >
                  <source
                    src={video.videoUrl}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>

                {/* Logo Overlay */}
                <div className="video-logo">
                  <img
                    src={video.logo}
                    alt="Indian Terrain"
                  />
                </div>

                {/* Controls */}
                {playingVideo === video.id && (
                  <div className="video-controls">
                    <button
                      type="button"
                      className="mute-btn"
                      onClick={(e) =>
                        toggleMute(video.id, e)
                      }
                    >
                      {mutedVideos[video.id] === false ? (
                        <Volume2 size={20} />
                      ) : (
                        <VolumeX size={20} />
                      )}
                    </button>
                  </div>
                )}

                {/* Title Overlay */}
                <div className="video-title">
                  <p>{video.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;