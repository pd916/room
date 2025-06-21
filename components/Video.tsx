"use client";

import { useProfileStore } from "@/hooks/use-modal-store";
import {
  useTracks,
  TrackToggle,
} from "@livekit/components-react";
import { Track } from "livekit-client";

export const Video = () => {
  const { profile } = useProfileStore((state) => state);
  const role = profile.newUser.role;

  // Get all local tracks, including screen share
  const tracks = useTracks([
    { source: Track.Source.Camera, with: "local" },
    { source: Track.Source.Microphone, with: "local" },
    { source: Track.Source.ScreenShare, with: "local" },
  ]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-black rounded-md overflow-hidden">
      <div className="flex-1 w-full flex items-center justify-center">
        {tracks
          // Filter tracks: if role is teacher, show all tracks
          // if student, exclude screen share tracks
          .filter(({ publication }) =>
            role === "teacher"
              ? true
              : publication.source !== Track.Source.ScreenShare
          )
          .map(({ publication }) => (
            <video
              key={publication.trackSid}
              ref={(el) => {
                if (el && publication.track) {
                  publication.track.attach(el);
                }
              }}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded"
            />
          ))}
      </div>

      {/* Mic and Camera Toggles for local user */}
      <div className="flex gap-4 py-2 bg-gray-900 w-full justify-center">
        <TrackToggle source="microphone" />
        {role === "teacher" && 
        <>
        <TrackToggle source="camera"/>
       {/* <TrackToggle source="screenShare" /> */}
        </>
        }
      </div>
    </div>
  );
};


{/* <div className="flex gap-4 py-2 bg-gray-900 w-full justify-center">
  <TrackToggle source="microphone" />
  <TrackToggle source="camera" />
</div> */}