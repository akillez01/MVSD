import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [song, setSong] = useState(null);
=======
  const [songLoading, setSongLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [song, setSong] = useState([]);
  const [index, setIndex] = useState(0);
>>>>>>> 923900865a097e933fc97493b3e7a718085d0ccd
  const [albumSong, setAlbumSong] = useState([]);
  const [albumData, setAlbumData] = useState([]);

  async function fetchSongs() {
    try {
<<<<<<< HEAD
      const { data } = await axios.get("/api/songs/all");
      setSongs(Array.isArray(data) ? data : []);
=======
      const { data } = await axios.get("/api/song/all");
      setSongs(data);
      if (data.length > 0) {
        setSelectedSong(data[0]._id);
      }
      setIsPlaying(false);
>>>>>>> 923900865a097e933fc97493b3e7a718085d0ccd
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  }

<<<<<<< HEAD
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
=======
  async function fetchSingleSong() {
    if (!selectedSong) return;
    try {
      const { data } = await axios.get("/api/song/single/" + selectedSong);
      setSong(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchAlbums() {
    try {
      const { data } = await axios.get("/api/song/album/all");
      setAlbums(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addAlbum(formData, setTitle, setDescription, setFile) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/song/album/new", formData);
      toast.success(data.message);
      setLoading(false);
      fetchAlbums();
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  async function addSong(formData, setTitle, setDescription, setFile, setSinger, setAlbum) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/song/new", formData);
      toast.success(data.message);
      setLoading(false);
      fetchSongs();
      setTitle("");
      setDescription("");
      setFile(null);
      setSinger("");
      setAlbum("");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  async function addThumbnail(id, formData, setFile) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/song/" + id, formData);
      toast.success(data.message);
      setLoading(false);
      fetchSongs();
      setFile(null);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
>>>>>>> 923900865a097e933fc97493b3e7a718085d0ccd
    }
  }

  async function deleteSong(id) {
    try {
<<<<<<< HEAD
      const { data } = await axios.delete(`/api/songs/${id}`);
=======
      const { data } = await axios.delete("/api/song/" + id);
>>>>>>> 923900865a097e933fc97493b3e7a718085d0ccd
      toast.success(data.message);
      fetchSongs();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

<<<<<<< HEAD
=======
  function nextMusic() {
    if (index === songs.length - 1) {
      setIndex(0);
      setSelectedSong(songs[0]._id);
    } else {
      setIndex(index + 1);
      setSelectedSong(songs[index + 1]._id);
    }
  }

  function prevMusic() {
    if (index === 0) {
      return null;
    } else {
      setIndex(index - 1);
      setSelectedSong(songs[index - 1]._id);
    }
  }

  async function fetchAlbumSong(id) {
    try {
      const { data } = await axios.get("/api/song/album/" + id);
      setAlbumSong(data.songs);
      setAlbumData(data.album);
    } catch (error) {
      console.log(error);
    }
  }

>>>>>>> 923900865a097e933fc97493b3e7a718085d0ccd
  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

<<<<<<< HEAD
=======
  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);

>>>>>>> 923900865a097e933fc97493b3e7a718085d0ccd
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