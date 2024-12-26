import React from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import AlbumItem from "../components/AlbumItem";
import SongItem from "../components/SongItem";

const Home = () => {
  const { songs, albums } = SongData();

  // Verifique se albums e songs são arrays antes de usar map
  const validAlbums = Array.isArray(albums) ? albums : [];
  const validSongs = Array.isArray(songs) ? songs : [];

  return (
    <Layout>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {validAlbums.map((e, i) => (
            <AlbumItem
              key={i}
              image={e.thumbnail?.url}
              name={e.title}
              desc={e.description}
              id={e._id}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-auto">
          {validSongs.map((e, i) => (
            <SongItem
              key={i}
              image={e.thumbnail?.url}
              name={e.title}
              desc={e.description}
              id={e._id}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
