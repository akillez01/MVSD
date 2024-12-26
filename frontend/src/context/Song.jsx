import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [song, setSong] = useState(null);
  const [albumSong, setAlbumSong] = useState([]);
  const [albumData, setAlbumData] = useState([]);

  async function fetchSongs() {
    try {
      const { data } = await axios.get("/api/songs/all");
      setSongs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  }

  async function fetchAlbums() {
    try {
      const { data } = await axios.get("/api/songs/album/all");
      setAlbums(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  }

  async function fetchSingleSong(id) {
    try {
      const { data } = await axios.get(`/api/songs/single/${id}`);
      setSong(data);
    } catch (error) {
      console.error("Error fetching single song:", error);
    }
  }

  async function fetchAlbumSong(id) {
    try {
      const { data } = await axios.get(`/api/songs/album/${id}`);
      setAlbumSong(data.songs);
      setAlbumData(data.album);
    } catch (error) {
      console.error("Error fetching album songs:", error);
    }
  }

  async function deleteSong(id) {
    try {
      const { data } = await axios.delete(`/api/songs/${id}`);
      toast.success(data.message);
      fetchSongs();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  return (
    <SongContext.Provider
      value={{
        songs,
        albums,
        loading,
        fetchSongs,
        fetchAlbums,
        fetchSingleSong,
        fetchAlbumSong,
        deleteSong,
        selectedSong,
        setSelectedSong,
        isPlaying,
        setIsPlaying,
        song,
        albumSong,
        albumData,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const SongData = () => useContext(SongContext);