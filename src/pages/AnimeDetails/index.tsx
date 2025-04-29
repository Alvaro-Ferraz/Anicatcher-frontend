import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Anime } from './interface'; // Ajuste o caminho conforme necessário
import Layout from '../../components/layout/index';

const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms));

const AnimeDetails = () => {
  const { id } = useParams();

  const [anime, setAnime] = useState<Anime | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`, { timeout: 5000 });
        setAnime(response.data.data);
        setIsLoading(false);
      } catch (err: any) {
        console.error('Erro ao buscar detalhes do anime:', err);
        if (err.response?.status === 429) {
          console.log('Rate limit atingido, tentando novamente em 5 segundos...');
          await delay(5000);
          fetchAnimeDetails();
          return;
        }
        setError('Não foi possível carregar os detalhes do anime.');
        setIsLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // Aqui você pode adicionar lógica para salvar o estado de favorito no backend ou localStorage
  };

  const handleAddToList = () => {
    // Lógica para adicionar à lista (pode ser um modal ou integração com backend)
    alert('Anime adicionado à sua lista!');
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
      <Layout>
        <div className="text-center text-gray-400 mt-10">Carregando...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center text-red-400 mt-10">{error}</div>
      </Layout>
    );
  }

  if (!anime) {
    return (
      <Layout>
        <div className="text-center text-gray-400 mt-10">Anime não encontrado.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mt-10">
        {/* Primeira Parte: Imagem, Título, Sinopse e Abas */}
        <div className="mt-6 flex gap-6">
          {/* Imagem de Capa */}
          <div className="flex-shrink-0">
            <img
              src={anime.images?.jpg?.large_image_url || 'https://via.placeholder.com/200x300'}
              alt={anime.title}
              className="w-[250px] h-[370px]"
            />
            {/* Botões */}
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleAddToList}
                className="flex items-center w-full gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <span className='flex-1 justify-center'>Add to List</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </button>
              <button
                onClick={handleFavoriteToggle}
                className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{anime.title}</h1>
            <p className="text-sm text-gray-400 mb-4">
              {anime.year || 'Ano desconhecido'} •{' '}
              {anime.genres?.map((g: any) => g.name).join(', ') || 'Gêneros desconhecidos'} •{' '}
              {anime.episodes || 'N/A'} episódios
            </p>
            <p className="text-gray-300">{anime.synopsis || 'Sinopse não disponível.'}</p>
          </div>
        </div>

        {/* Abas de Navegação */}
        <div className="mt-6 border-b border-gray-700">
          <div className="flex gap-8 border-gray-700 justify-center">
            <a href="#" className="pb-2 text-white border-b-2 border-blue-500">
              Overview
            </a>
            <a href="#" className="pb-2 text-gray-400 hover:text-white">
              Watch
            </a>
            <a href="#" className="pb-2 text-gray-400 hover:text-white">
              Characters
            </a>
            <a href="#" className="pb-2 text-gray-400 hover:text-white">
              Staff
            </a>
            <a href="#" className="pb-2 text-gray-400 hover:text-white">
              Reviews
            </a>
            <a href="#" className="pb-2 text-gray-400 hover:text-white">
              Stats
            </a>
            <a href="#" className="pb-2 text-gray-400 hover:text-white">
              Social
            </a>
          </div>
        </div>

        {/* Seção de Informações Abaixo */}
        <div className="mt-6 flex gap-6">
          {/* Coluna de Informações à Esquerda */}
          <div className="w-[240px] text-gray-400 bg-[#151F2E] p-5">
            {/* Informações do Anime */}
            {[
              { label: 'Formato', value: anime.type },
              { label: 'Episódios', value: anime.episodes },
              { label: 'Duração do Episódio', value: anime.duration },
              { label: 'Status', value: anime.status },
              { label: 'Data de Início', value: formatDate(anime.aired?.from) },
              { label: 'Data de Fim', value: formatDate(anime.aired?.to) },
              { label: 'Temporada', value: formatSeason() },
              { label: 'Nota Média', value: anime.score ? `${Math.round(anime.score * 10)}%` : 'N/A' },
              { label: 'Popularidade', value: anime.popularity },
              { label: 'Favoritos', value: anime.favorites },
              { label: 'Estúdios', value: anime.studios?.map((s) => s.name).join(', ') },
              { label: 'Produtores', value: anime.producers?.map((p) => p.name).join(', ') },
              { label: 'Fonte', value: anime.source },
              { label: 'Gêneros', value: anime.genres?.map((g) => g.name).join(', ') },
              { label: 'Romaji', value: anime.title },
              { label: 'Inglês', value: anime.title_english },
              { label: 'Nativo', value: anime.title_japanese },
              { label: 'Sinônimos', value: anime.title_synonyms?.join(', ') },
            ].map(({ label, value }) => (
              <div className="mb-3" key={label}>
                <p className="text-[14px] font-bold text-[#9FADBD]">{label}</p>
                <p className="text-[13px]">{value || 'Desconhecido'}</p>
              </div>
            ))}
          </div>

          {/* Espaço à Direita (para conteúdo futuro das abas) */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-4">Detalhes</h2>
            {/* Conteúdo adicional pode ser adicionado aqui conforme a aba selecionada */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnimeDetails;