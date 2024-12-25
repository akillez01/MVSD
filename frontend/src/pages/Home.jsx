import AlbumItem from "../components/AlbumItem";
import Layout from "../components/Layout";
import SongItem from "../components/SongItem";
import { SongData } from "../context/Song";

const Home = () => {
  const { songs, albums } = SongData();
  return (
    <Layout>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albums.map((e, i) => (
            <AlbumItem
              key={i}
              image={e.thumbnail?.url || "default-album-image.jpg"} // Imagem padrão
              name={e.title || "Unknown Album"}
              desc={e.description || "No description available"}
              id={e._id || `album-${i}`}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">biggest hits</h1>
        <div className="flex overflow-auto">
          {songs.map((e, i) => (
            <SongItem
              key={i}
              image={e.thumbnail?.url || "default-song-image.jpg"} // Imagem padrão
              name={e.title || "Unknown Song"}
              desc={e.description || "No description available"}
              id={e._id || `song-${i}`}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
