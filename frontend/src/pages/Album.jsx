import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import SongItem from "../components/SongItem";
import { SongData } from "../context/Song";

const Album = () => {
  const { id } = useParams();
  const { fetchAlbumSong, albumSong, albumData } = SongData();

  useEffect(() => {
    if (id) {
      fetchAlbumSong(id);
    }
  }, [id, fetchAlbumSong]);

  return (
    <Layout>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">{albumData.title}</h1>
        <div className="flex overflow-auto">
          {albumSong.map((song, i) => (
            <SongItem
              key={i}
              image={song.thumbnail?.url || "default-song-image.jpg"} // Imagem padrão
              name={song.title || "Unknown Song"}
              desc={song.description || "No description available"}
              id={song._id || `song-${i}`}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Album;