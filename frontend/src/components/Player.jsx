import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { SongData } from "../context/Song";

const Player = () => {
  const {
    song,
    fetchSingleSong,
    selectedSong,
    isPlaying,
    setIsPlaying,
    nextMusic,
    prevMusic,
  } = SongData();

  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Carregar música selecionada
  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);

  // Atualizar metadados e progresso do áudio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setProgress(audio.currentTime || 0);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [song]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (!isNaN(newVolume)) {
      setVolume(newVolume);
      if (audioRef.current) audioRef.current.volume = newVolume;
    }
  };

  const handleProgressChange = (e) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (!isNaN(newTime)) {
      setProgress(newTime);
      if (audioRef.current) audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div>
      {song && (
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
          {/* Informações da música */}
          <div className="lg:flex items-center gap-4">
            <img
              src={
                song.thumbnail
                  ? song.thumbnail.url
                  : "https://via.placeholder.com/50"
              }
              className="w-12"
              alt="Song Thumbnail"
            />
            <div className="hidden md:block">
              <p>{song.title}</p>
              <p>{song.description?.slice(0, 30)}...</p>
            </div>
          </div>

          {/* Controles de reprodução */}
          <div className="flex flex-col items-center gap-1 m-auto">
            {song.audio && (
              <audio ref={audioRef} src={song.audio.url} autoPlay={isPlaying} />
            )}

            <div className="w-full flex items-center font-thin text-green-400">
              <input
                type="range"
                min="0"
                max="100"
                className="progress-bar w-[120px] md:w-[300px]"
                value={duration ? (progress / duration) * 100 : 0}
                onChange={handleProgressChange}
              />
            </div>

            <div className="flex justify-center items-center gap-4">
              <span className="cursor-pointer" onClick={prevMusic}>
                <GrChapterPrevious />
              </span>
              <button
                className="bg-white text-black rounded-full p-2"
                onClick={handlePlayPause}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <span className="cursor-pointer" onClick={nextMusic}>
                <GrChapterNext />
              </span>
            </div>
          </div>

          {/* Controle de volume */}
          <div className="flex items-center">
            <input
              type="range"
              className="w-16 md:w-32"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
