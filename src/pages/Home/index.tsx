import logo from '../../images/Logo-ani.3.png';
import avatar from '../../images/avatar.png';
import TemporadaAtual from '../../components/anime-season/anime-season';
import AnimeGenres from '../../components/anime-genres-filter/anime-genres-filter';
import AnimeCardGrid from '../../components/anime-card-grid/anime-card-grid';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

// Funções para caching no localStorage
const getCachedData = (key: string, expirationMinutes: number) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  const isExpired = Date.now() - timestamp > expirationMinutes * 60 * 1000;
  if (isExpired) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
};

const setCachedData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};

export const Home = () => {
  const [genres, setGenres] = useState<any[]>([]);
  const [seasonAnimes, setSeasonAnimes] = useState<any[]>([]);
  const [nextSeason, setNextSeason] = useState<any[]>([]);
  const [filteredAnimes, setFilteredAnimes] = useState<any[]>([]);
  const [popularAnimes, setPopularAnimes] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [isLoadingSeason, setIsLoadingSeason] = useState(true);
  const [isLoadingNextSeason, setIsLoadingNextSeason] = useState(true);
  const [isLoadingFiltered, setIsLoadingFiltered] = useState(true);
  const [isLoadingPopular, setIsLoadingPopular] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar animes da temporada atual (com caching)
        setIsLoadingSeason(true);
        setIsLoadingPopular(true);

        let seasonData = getCachedData('seasonAnimes', 60); // Cache por 1 hora
        if (!seasonData) {
          const seasonResponse = await axios.get('https://api.jikan.moe/v4/seasons/now', { timeout: 5000 });
          seasonData = seasonResponse.data.data;
          setCachedData('seasonAnimes', seasonData);
        }
        setSeasonAnimes(seasonData);
        setFilteredAnimes(seasonData);

        // Ordenar por 'members' e selecionar os 4 mais populares
        const sortedByPopularity = [...seasonData].sort((a: any, b: any) => b.members - a.members).slice(0, 4);
        setPopularAnimes(sortedByPopularity);

        setIsLoadingSeason(false);
        setIsLoadingFiltered(false);
        setIsLoadingPopular(false);

        await delay(1000); // Aumentado para 1 segundo

        // Buscar animes da próxima temporada (com caching)
        setIsLoadingNextSeason(true);
        let nextSeasonData = getCachedData('nextSeason', 60);
        if (!nextSeasonData) {
          const nextSeasonResponse = await axios.get('https://api.jikan.moe/v4/seasons/upcoming', { timeout: 5000 });
          nextSeasonData = nextSeasonResponse.data.data;
          setCachedData('nextSeason', nextSeasonData);
        }
        setNextSeason(nextSeasonData);
        setIsLoadingNextSeason(false);

        await delay(1000);

        // Buscar gêneros (com caching)
        let genresData = getCachedData('genres', 60);
        if (!genresData) {
          const genresResponse = await axios.get('https://api.jikan.moe/v4/genres/anime', { timeout: 5000 });
          genresData = genresResponse.data.data;
          setCachedData('genres', genresData);
        }
        setGenres(genresData);
      } catch (error: any) {
        console.error('Erro ao buscar dados:', error);

        // Se for erro de rate limiting (429), tentar novamente após um delay maior
        if (error.response?.status === 429) {
          console.log('Rate limit atingido, tentando novamente em 5 segundos...');
          await delay(5000);
          fetchData(); // Tenta novamente
          return;
        }

        // Fallback para dados em cache, se disponíveis
        const cachedSeason = getCachedData('seasonAnimes', 60);
        if (cachedSeason) {
          setSeasonAnimes(cachedSeason);
          setFilteredAnimes(cachedSeason);
          const sortedByPopularity = [...cachedSeason].sort((a: any, b: any) => b.members - a.members).slice(0, 4);
          setPopularAnimes(sortedByPopularity);
        }

        const cachedNextSeason = getCachedData('nextSeason', 60);
        if (cachedNextSeason) {
          setNextSeason(cachedNextSeason);
        }

        const cachedGenres = getCachedData('genres', 60);
        if (cachedGenres) {
          setGenres(cachedGenres);
        }

        setIsLoadingSeason(false);
        setIsLoadingNextSeason(false);
        setIsLoadingFiltered(false);
        setIsLoadingPopular(false);
      }
    };

    fetchData();
  }, []);

  const handleGenreSelect = async (genre: { mal_id: any; name: string }) => {
    if (!genre) {
      setFilteredAnimes(seasonAnimes);
      setSelectedGenre('Todos');
      setIsLoadingFiltered(false);
      return;
    }

    setIsLoadingFiltered(true);
    setSelectedGenre(genre.name);
    try {
      const cacheKey = `filteredAnimes_${genre.mal_id}`;
      let filteredData = getCachedData(cacheKey, 60);
      if (!filteredData) {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?genres=${genre.mal_id}`, { timeout: 5000 });
        filteredData = response.data.data;
        setCachedData(cacheKey, filteredData);
      }
      setFilteredAnimes(filteredData);
      setIsLoadingFiltered(false);
    } catch (error: any) {
      console.error('Erro ao buscar animes filtrados:', error);

      if (error.response?.status === 429) {
        console.log('Rate limit atingido na filtragem, tentando novamente em 5 segundos...');
        await delay(5000);
        handleGenreSelect(genre); // Tenta novamente
        return;
      }

      const cacheKey = `filteredAnimes_${genre.mal_id}`;
      const cachedFiltered = getCachedData(cacheKey, 60);
      if (cachedFiltered) {
        setFilteredAnimes(cachedFiltered);
      }
      setIsLoadingFiltered(false);
    }
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
            <a href="#" className="text-sm text-white hover:text-gray-300">Comunity</a>
            <a href="#" className="text-sm text-white hover:text-gray-300">Yomashiro</a>
          </div>
        </div>
        <div className="flex mr-10 items-center space-x-4">
          <input
            type="text"
            placeholder="Search for name..."
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
              placeholder="Search for name..."
              className="bg-utils text-red-400 pl-10 pr-3 py-2 rounded w-full text-sm placeholder-gray-400 focus:outline-none"
            />
          </div>
          <div className="w-full bg-utils p-5 rounded">
            <h2 className="text-lg font-medium text-white mb-4">My favorites</h2>
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
              {isLoadingPopular ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-lg overflow-hidden shadow-lg animate-pulse">
                    <div className="w-full h-[250px] bg-gray-700"></div>
                  </div>
                ))
              ) : popularAnimes.length > 0 ? (
                popularAnimes.map((anime: any, i: number) => (
                  <div key={i} className="rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={anime.images?.jpg?.large_image_url || 'https://via.placeholder.com/300x250'}
                      alt={anime.title || `Anime ${i + 1}`}
                      className="w-full h-[250px] object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-4 text-center text-gray-400">Dados indisponíveis no momento.</div>
              )}
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