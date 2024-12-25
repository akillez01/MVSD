import { useEffect } from "react";
import { FaBookmark, FaPlay } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import { UserData } from "../context/User";

const Album = () => {
  const {
    fetchAlbumSong,
    albumSong,
    albumData,
    setIsPlaying,
    setSelectedSong,
  } = SongData();

  const params = useParams();

  useEffect(() => {
    fetchAlbumSong(params.id);
  }, [params.id, fetchAlbumSong]);

  const onclickHandler = (id) => {
    setSelectedSong(id);
    setIsPlaying(true);
  };

  const { addToPlaylist } = UserData();

  const savePlaylistHandler = (id) => {
    addToPlaylist(id);
  };

  return (
    <Layout>
      {albumData && (
        <>
          <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
            <img
              src={albumData?.thumbnail?.url || "https://via.placeholder.com/150"}
              className="w-48 rounded"
              alt="Capa do álbum"
            />

            <div className="flex flex-col">
              <span>Playlist</span>
              <h2 className="text-3xl font-bold mb-4 md:text-5xl">
                {albumData.title} PlayList
              </h2>
              <p>{albumData.description}</p>
              <span className="mt-1">
                <img
                  src={assets.spotify_logo}
                  className="inline-block w-6"
                  alt="Spotify logo"
                />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
            <span>
              <b className="mr-4">#</b>
            </span>
            <span>Artist</span>
            <span className="hidden sm:block">Description</span>
            <span className="text-center">Actions</span>
          </div>

          <hr />
          {albumSong &&
            albumSong.map((e, i) => (
              <div
                className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
                key={i}
              >
                <div className="text-white">
                  <b className="mr-4 text-[#a7a7a7]">{i + 1}</b>
                  <img
                    src={e?.thumbnail?.url || "https://via.placeholder.com/50"}
                    className="inline w-10 mr-5"
                    alt="Capa da música"
                  />
                  {e.title}
                </div>
                <span className="text-[15px]">{e.singer}</span>
                <span className="text-[15px] hidden sm:block">
                  {e.description.slice(0, 20)}...
                </span>
                <div className="flex justify-center items-center gap-5">
                  <button
                    className="text-[15px] text-center"
                    onClick={() => savePlaylistHandler(e._id)}
                  >
                    <FaBookmark />
                  </button>
                  <button
                    className="text-[15px] text-center"
                    onClick={() => onclickHandler(e._id)}
                  >
                    <FaPlay />
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </Layout>
  );
};

export default Album;