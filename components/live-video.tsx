"use client"

import { useTracks } from '@livekit/components-react';
import { Participant, Track } from 'livekit-client'
import React, { useEffect, useRef, useState } from 'react'
// import { FullScreenControl } from './fullscreen-control';
import { useEventListener } from 'usehooks-ts';
// import { VolumeControl } from './volume-control';


interface LiveVideoProps {
    participant: Participant;
}

const LiveVideo = ({participant}: LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    // const [isFullScreen, setIsfullScreen] = useState(false);
    // const [volume, setVolume] = useState(0);

    const onValuChange = (value:number) => {
    //   setVolume(+value)
      if(videoRef.current){
        videoRef.current.muted = value === 0;
        videoRef.current.volume  = +value * 0.01; 
      }
    };

    // const toggleMuted = () => {
    //   const isMuted = volume === 0;
    //   setVolume(isMuted ? 50 : 0);

    //   if(videoRef.current){
    //     videoRef.current.muted = !isMuted;
    //     videoRef.current.volume = isMuted ? 0.5 : 0;
    //   }
    // }

    useEffect(() => {
      onValuChange(0);
    },[]);

    // const toggleFullScreen = () => {
    //     if(isFullScreen) {
    //         document.exitFullscreen()
    //     } else if(wrapperRef?.current) {
    //         wrapperRef.current.requestFullscreen()
    //     }
    // }

    // const handleFullScreenChange = () => {
    //     const isCurrentlyFullscreen = document.fullscreenElement !== null;
    //     // setIsfullScreen(isCurrentlyFullscreen);
    // }

    // useEventListener("fullscreenchange", handleFullScreenChange, wrapperRef); 

    useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
        if(videoRef.current) {
            track.publication.track?.attach(videoRef.current)
        }
    });

  return (
    <div className='relaytive h-full flex' ref={wrapperRef}>
      <video ref={videoRef} width="100%" />
      <div className='absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all'>
        {/* <div className='absolute bttom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4'>
           <VolumeControl
           onChange={onValuChange}
           value={volume}
           onToggle={toggleMuted}
           />
            <FullScreenControl 
            isFullScreen={isFullScreen}
            onToggle={toggleFullScreen}
            />
        </div> */}
      </div>
    </div>
  )
}

export default LiveVideo
