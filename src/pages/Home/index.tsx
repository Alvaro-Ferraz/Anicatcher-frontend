import logo from '../../images/Logo-ani.3.png';
import avatar from '../../images/avatar.png';
import TemporadaAtual from '../../components/anime-season/anime-season';
import AnimeGenres from '../../components/anime-genres-filter/anime-genres-filter';
import AnimeCardGrid from '../../components/anime-card-grid/anime-card-grid';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Função para adicionar um atraso (delay) entre requisições
const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

export const Home = () => {
  const [genres, setGenres] = useState([]);
  const [seasonAnimes, setSeasonAnimes] = useState([]);
  const [nextSeason, setNextSeason] = useState([]);
  const [filteredAnimes, setFilteredAnimes] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('Todos'); // Estado para armazenar a categoria selecionada
  const [isLoadingSeason, setIsLoadingSeason] = useState(true);
  const [isLoadingNextSeason, setIsLoadingNextSeason] = useState(true);
  const [isLoadingFiltered, setIsLoadingFiltered] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar animes da temporada atual
        setIsLoadingSeason(true);
        const seasonResponse = await axios.get('https://api.jikan.moe/v4/seasons/now');
        setSeasonAnimes(seasonResponse.data.data);
        setFilteredAnimes(seasonResponse.data.data);
        setIsLoadingSeason(false);
        setIsLoadingFiltered(false);

        await delay(500);

        // Buscar animes da próxima temporada
        setIsLoadingNextSeason(true);
        const nextSeasonResponse = await axios.get('https://api.jikan.moe/v4/seasons/upcoming');
        setNextSeason(nextSeasonResponse.data.data);
        setIsLoadingNextSeason(false);

        await delay(500);

        // Buscar gêneros
        const genresResponse = await axios.get('https://api.jikan.moe/v4/genres/anime');
        setGenres(genresResponse.data.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setIsLoadingSeason(false);
        setIsLoadingNextSeason(false);
        setIsLoadingFiltered(false);
      }
    };

    fetchData();
  }, []);

  const handleGenreSelect = (genre: { mal_id: any; name: string }) => {
    if (!genre) {
      setFilteredAnimes(seasonAnimes);
      setSelectedGenre('Todos');
      setIsLoadingFiltered(false);
      return;
    }

    setIsLoadingFiltered(true);
    setSelectedGenre(genre.name);
    axios
      .get(`https://api.jikan.moe/v4/anime?genres=${genre.mal_id}`)
      .then((response) => {
        setFilteredAnimes(response.data.data);
        setIsLoadingFiltered(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar animes filtrados:', error);
        setIsLoadingFiltered(false);
      });
  };

  return (
    <div className="bg-body min-h-screen text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-sidebar border-b border-gray-700 fixed top-0 left-0 w-full z-10">
        <div className="flex items-center space-x-6">
          <img src={logo} alt="Logo" className="w-[60px] h-[60px] rounded-full" />
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-white hover:text-gray-300">Home</a>
            <a href="#" className="text-sm text-white hover:text-gray-300">Animelist</a>
            <a href="#" className="text-sm text-white hover:text-gray-300">Comunidade</a>
            <a href="#" className="text-sm text-white hover:text-gray-300">Yomashiro</a>
          </div>
        </div>
        <div className="flex mr-10 items-center space-x-4">
          <input
            type="text"
            placeholder="Buscar por nome"
            className="bg-utils border text-white color-red border-gray-600 px-2 py-1 rounded"
          />
          <div>
            <a href="">
              <img
                src={avatar}
                alt="Avatar"
                className="w-[40px] h-[40px] bg-size-cover rounded-[3px]"
              />
            </a>
          </div>
        </div>
      </header>

      {/* Layout Principal */}
      <div className="flex pt-[68px]">
        {/* Sidebar */}
        <div className="w-[250px] bg-sidebar p-5 fixed h-[calc(100vh-68px)] border-r border-gray-700 top-[68px] left-0 overflow-y-auto">
          <TemporadaAtual />
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar por nome"
              className="bg-utils text-red-400 pl-10 pr-3 py-2 rounded w-full text-sm placeholder-gray-400 focus:outline-none"
            />
          </div>
          <div className="w-full bg-utils p-5 rounded">
            <h2 className="text-lg font-medium text-white mb-4">Meus Favoritos</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group cursor-pointer hover:bg-[#2D3748] p-1 rounded transition-colors">
                <img
                  src="https://static.betterstatic.dev/cover/sXtu0Ok6pjGMemqj2zDTtQtnCDZHNjlovKJzPHYC.jpg"
                  alt="Sakurasou no pet na kanojo"
                  className="w-12 h-16 object-cover rounded"
                />
                <div className="flex-1 self-center">
                  <h3 className="text-sm text-white group-hover:text-gray-200">Sakurasou no pet na kanojo</h3>
                </div>
              </div>
              <div className="flex items-start space-x-3 group cursor-pointer hover:bg-[#2D3748] p-1 rounded transition-colors">
                <img
                  src="https://static.betterstatic.dev/cover/sXtu0Ok6pjGMemqj2zDTtQtnCDZHNjlovKJzPHYC.jpg"
                  alt="Sakurasou no pet na kanojo"
                  className="w-12 h-16 object-cover rounded"
                />
                <div className="flex-1 self-center">
                  <h3 className="text-sm text-white group-hover:text-gray-200">Sakurasou no pet na kanojo</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Área de Conteúdo Principal */}
        <div className="flex-1 ml-[250px] p-6">
          <main className="max-w-[1200px] mx-auto">
            {/* Hero Banner */}
            <div className="grid grid-cols-4 gap-6 mt-10 mb-10">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx176496-9BDMjAZGEbq4.png'}
                    alt={`Imagem ${i + 1}`}
                    className="w-full h-[250px] transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Seção Popular this season */}
            <AnimeCardGrid
              title="Popular this season"
              animes={seasonAnimes}
              columns={5}
              rows={2}
              showViewAll={true}
              viewAllLink="#"
              isLoading={isLoadingSeason}
            />
            <div className="mt-10"></div>
            {/* Seção Upcoming next season */}
            <AnimeCardGrid
              title="Upcoming next season"
              animes={nextSeason}
              columns={5}
              rows={1}
              showViewAll={true}
              viewAllLink="#"
              isLoading={isLoadingNextSeason}
            />

            {/* Seção Filtrada por Gênero */}
            <section className="mt-10">
              <div className="flex justify-between items-center mb-5">
                <AnimeGenres genres={genres} onGenreSelect={handleGenreSelect} />
              </div>
              <AnimeCardGrid
                title={selectedGenre}
                animes={filteredAnimes}
                columns={6}
                rows={2}
                showViewAll={true}
                viewAllLink="#"
                isLoading={isLoadingFiltered}
              />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;