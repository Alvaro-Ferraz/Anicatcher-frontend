import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Anime, Episode, Trailer } from './interface';
import ClientLayout from '../../components/layout/index';
import AnimeStatistics from "../../components/AnimeStatistics/AnimeStatistics";
import AnimeRecommendations from '../../components/AnimeRecommendations/AnimeRecommendations';

const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

const AnimeDetails = () => {
  const { id } = useParams();

  const [anime, setAnime] = useState<Anime | null>(null);
  const [characters, setCharacters] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [videos, setVideos] = useState<Episode[]>([]);
  const [trailer, setTrailer] = useState<Trailer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchAnimeDetails = async () => {
      try {
        setIsLoading(true);
        while (isMounted) {
          try {
            const [animeRes, charactersRes, staffRes, videosRes, recommendationsRes] = await Promise.all([
              axios.get(`https://api.jikan.moe/v4/anime/${id}`, { timeout: 5000 }),
              axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`, { timeout: 5000 }),
              axios.get(`https://api.jikan.moe/v4/anime/${id}/staff`, { timeout: 5000 }),
              axios.get(`https://api.jikan.moe/v4/anime/${id}/videos`, { timeout: 5000 }),
              axios.get(`https://api.jikan.moe/v4/anime/${id}/recommendations`, { timeout: 5000 }),
            ]);

            const animeData = animeRes.data.data;
            const videosData = videosRes.data.data;

            if (!isMounted) return;
            setAnime(animeData);
            setCharacters(charactersRes.data.data);
            setStaff(staffRes.data.data);
            setVideos(videosData.episodes || []);
            setTrailer(animeData.trailer || null);
            setRecommendations(recommendationsRes.data.data);
            setIsLoading(false);
            setError(null);
            break;
          } catch (err: any) {
            if (err.response?.status === 429) {
              // Não exibe erro no console, apenas espera e tenta novamente
              await delay(5000);
              continue;
            }
            if (!isMounted) return;
            setError('Não foi possível carregar os detalhes do anime.');
            setIsLoading(false);
            break;
          }
        }
      } finally {
        // nada
      }
    };
    fetchAnimeDetails();
    return () => { isMounted = false; };
  }, [id]);


  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // Aqui você pode adicionar lógica para salvar o estado de favorito no backend ou localStorage
  };

  const handleAddToList = () => {
    // Lógica para adicionar à lista (pode ser um modal ou integração com backend)
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Desconhecido';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatSeason = () => {
    if (!anime?.season || !anime.year) return 'Desconhecido';
    return `${anime.season.charAt(0).toUpperCase() + anime.season.slice(1)} ${anime.year}`;
  };

  if (isLoading) {
    return (
      <ClientLayout>
        <div className="text-center text-gray-400 mt-10">Carregando...</div>
      </ClientLayout>
    );
  }

  if (error) {
    return (
      <ClientLayout>
        <div className="text-center text-red-400 mt-10">{error}</div>
      </ClientLayout>
    );
  }

  if (!anime) {
    return (
      <ClientLayout>
        <div className="text-center text-gray-400 mt-10">Anime não encontrado.</div>
      </ClientLayout>
    );
  }
  return (
    <ClientLayout>
      <div className="mt-16 mb-4 md:mt-20 w-full px-2 sm:px-4">
        {/* Primeira Parte: Imagem, Título, Sinopse e Abas */}
        <div className="mt-2 flex flex-col md:flex-row gap-6 w-full">
          {/* Imagem de Capa */}
          <div className="flex-shrink-0 flex flex-col items-center md:block">
            <img
              src={anime.images?.jpg?.large_image_url || 'https://via.placeholder.com/200x300'}
              alt={anime.title}
              className="w-[180px] h-[260px] md:w-[250px] md:h-[370px] rounded"
            />
            {/* Botões */}
            <div className="mt-2 flex gap-2 w-[180px] md:w-[250px]">
              <button
                onClick={handleAddToList}
                className="flex items-center justify-center flex-1 bg-blue-500 text-white h-8 rounded-lg hover:bg-blue-600 transition-colors text-xs font-medium"
              >
                Add to List
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </button>
              <button
                onClick={handleFavoriteToggle}
                className="flex items-center justify-center w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={isFavorite ? 'red' : 'none'}
                  stroke={isFavorite ? 'red' : 'currentColor'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Título e Sinopse */}
          <div className="flex-1 w-full text-center md:text-left">
            <h1 className="text-2xl md:text-2xl font-medium text-[#9bb5cc] mb-2">{anime.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
              {anime.year || 'Ano desconhecido'} •{' '}
              {anime.genres?.map((g: any) => g.name).join(', ') || 'Gêneros desconhecidos'} •{' '}
              {anime.episodes || 'N/A'} episódios
            </p>
            <p className="text-gray-400 hover:text-gray-300 md:text-left">{anime.synopsis || 'Sinopse não disponível.'}</p>
          </div>
        </div>

        {/* Abas de Navegação */}
        <div className="mt-6 border-b border-gray-700 w-full overflow-x-auto">
          <div className="flex gap-2 sm:gap-4 md:gap-8 border-gray-700 justify-start sm:justify-center w-full">
            <a href="#" className="pb-2 text-white border-b-2 border-blue-500 whitespace-nowrap">Overview</a>
            <a href="#" className="pb-2 text-gray-400 hover:text-white line-through whitespace-nowrap">Watch</a>
            <a href="#" className="pb-2 text-gray-400 hover:text-white line-through whitespace-nowrap">Characters</a>
            <a href="#" className="pb-2 text-gray-400 hover:text-white line-through whitespace-nowrap">Staff</a>
            <a href="#" className="pb-2 text-gray-400 hover:text-white line-through whitespace-nowrap">Reviews</a>
            <a href="#" className="pb-2 text-gray-400 hover:text-white line-through whitespace-nowrap">Stats</a>
            <a href="#" className="pb-2 text-gray-400 hover:text-white line-through whitespace-nowrap">Social</a>
          </div>
        </div>

        {/* Seção de Informações Abaixo */}
        <div className="mt-6 flex flex-col md:flex-row gap-6 w-full">
          {/* Coluna de Informações à Esquerda */}
          <div className="w-full md:w-[240px] text-gray-400 bg-[#151F2E] p-5 rounded mb-4 md:mb-0 min-w-0">
            {[
              { label: 'Format', value: anime.type },
              { label: 'Episodes', value: anime.episodes },
              { label: 'Episode Duration', value: anime.duration },
              { label: 'Status', value: anime.status },
              { label: 'Start Date', value: formatDate(anime.aired?.from) },
              { label: 'End date', value: formatDate(anime.aired?.to) },
              { label: 'Season', value: formatSeason() },
              { label: 'Score', value: anime.score ? `${Math.round(anime.score * 10)}%` : 'N/A' },
              { label: 'Popularity', value: anime.popularity },
              { label: 'Favorites', value: anime.favorites },
              { label: 'Studios', value: anime.studios?.map((s) => s.name).join(', ') },
              { label: 'Producers', value: anime.producers?.map((p) => p.name).join(', ') },
              { label: 'Source', value: anime.source },
              { label: 'Genres', value: anime.genres?.map((g) => g.name).join(', ') },
              { label: 'Romaji', value: anime.title },
              { label: 'English', value: anime.title_english },
              { label: 'Native', value: anime.title_japanese },
              { label: 'Synonyms', value: anime.title_synonyms?.join(', ') },
            ].map(({ label, value }) => (
              <div className="mb-3" key={label}>
                <p className="text-[14px] font-bold text-[#9FADBD]">{label}</p>
                <p className="text-[13px]">{value || 'Desconhecido'}</p>
              </div>
            ))}
          </div>

          {/* Espaço à Direita (para conteúdo futuro das abas) */}
          <div className="flex-1 w-full min-w-0">            
            {/* Seção de Personagens */}
            <div className="flex-1 p-0 md:p-5 min-w-0">
              <h2 className="text-[13px] font-medium text-[#ADC0D2] mb-2">Characters</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {characters.slice(0, 6).map((char) => (
                  <div
                    key={char.character.mal_id}
                    className="bg-[#1e2a3a] flex h-[80px] overflow-hidden"
                  >
                    {/* Imagem do personagem - alinhada à esquerda */}
                    <div className="w-[64px] h-full">
                      <img
                        src={char.character.images?.jpg?.image_url}
                        alt={char.character.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Nome e papel do personagem */}
                    <div className="flex-1 flex flex-col justify-between text-left pl-2 py-2 min-h-full">
                      <p className="font-semibold text-gray-300 text-[13px] leading-tight">
                        {char.character.name}
                      </p>
                      <p className="text-gray-400 text-[11px]">{char.role}</p>
                    </div>
                    {/* Seiyuu - imagem à direita e info à esquerda dela */}
                    {char.voice_actors?.length > 0 && (
                      <div className="hidden md:flex h-full">
                        <div className="flex flex-col justify-between text-right px-2 pr-2 py-2 min-h-full">
                          <p className="text-gray-300 text-[13px] leading-tight">
                            {char.voice_actors[0].person.name}
                          </p>
                          <p className="text-gray-400 text-[11px]">
                            {char.voice_actors[0].language}
                          </p>
                        </div>
                        <div className="w-[64px] h-full">
                          <img
                            src={char.voice_actors[0].person.images.jpg.image_url}
                            alt={char.voice_actors[0].person.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Staff Section */}
              <h2 className="text-[13px] font-medium text-[#ADC0D2] mb-2 mt-4">Staff</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {staff.slice(0, 3).map((member) => (
                  <div
                    key={member.person.mal_id}
                    className="bg-[#1e2a3a] flex h-[80px] overflow-hidden"
                  >
                    {/* Imagem do Staff à esquerda */}
                    <div className="w-[64px] h-full">
                      <img
                        src={member.person.images?.jpg?.image_url}
                        alt={member.person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Nome e posição */}
                    <div className="flex-1 flex flex-col justify-between px-2 py-2 text-sm text-white">
                      <p className="font-semibold text-gray-300 text-[13px] leading-tight">
                        {member.person.name}
                      </p>
                      <p className="text-gray-400 text-[11px]">
                        {member.positions.join(", ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {videos && videos.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-[13px] font-medium text-[#ADC0D2] mb-2">Watch</h2>
                  <div className="flex gap-4 flex-wrap">
                    {videos.slice(-4).map((video) => (
                      <a
                        key={video.url}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-[200px] h-[100px] rounded overflow-hidden group"
                      >
                        <img
                          src={video.images?.jpg?.image_url}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Overlay escuro fixo atrás do texto */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                          <p className="text-[12px] font-medium text-[#c4d9ec] truncate">
                            {video.episode} - {video.title}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {trailer && trailer.embed_url && (
                <div className="mt-8">
                  <h2 className="text-[13px] font-medium text-[#ADC0D2] mb-2">Trailer</h2>
                  <div className="relative w-full max-w-[350px] aspect-video rounded overflow-hidden group">
                    <iframe
                      className="w-full h-full"
                      src={trailer.embed_url}
                      title="Trailer do Anime"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
              {id && <AnimeStatistics id={Number(id)} />}
              {recommendations.length > 0 && (
                <AnimeRecommendations recommendations={recommendations} />
              )}
            </div>
          </div>
        </div>
      </div>
    </ClientLayout >
  );
};

export default AnimeDetails;