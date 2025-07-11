import React from 'react';

type Anime = {
  mal_id: number;
  title: string;
  images?: {
    jpg?: {
      large_image_url?: string;
    };
  };
};

const AnimeCardGrid: React.FC<{
  title?: string;
  animes?: Anime[];
  columns?: number;
  rows?: number;
  showViewAll?: boolean;
  viewAllLink?: string;
  isLoading?: boolean;
}> = ({
  title = '',
  animes = [],
  columns = 5,
  rows = 3,
  showViewAll = true,
  viewAllLink = '#',
  isLoading = false,
}) => {
    const totalCards = rows * columns;
    const displayedAnimes = animes.slice(0, totalCards);

    // Mapeamento de colunas para classes Tailwind responsivas
    const responsiveGridClass =
      'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4';

    // Forçar atualização do grid ao redimensionar a tela
    // Isso resolve o bug de responsividade só atualizar ao abrir o menu

    return (
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-sans px-5 sm:px-5 text-[#ADC0D2]">{title}</h2>
          {showViewAll && (
            <a href={viewAllLink} className="text-sm px-5 sm:px-5 text-blue-400">
              View All
            </a>
          )}
        </div>

        <div className={responsiveGridClass + " relative z-0 px-5 sm:p-5 overflow-hidden"}>
          {isLoading
            ? // Renderizar skeleton loading
            [...Array(totalCards)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="relative overflow-hidden transition-transform duration-300 z-0"
              >
                <div className="block w-full aspect-[3/4] overflow-hidden bg-gray-700 rounded animate-pulse">
                  <div className="w-full h-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-shimmer" />
                </div>
                <div className="mt-2 h-6 w-3/4 bg-gray-700 rounded animate-pulse">
                  <div className="w-full h-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-shimmer" />
                </div>
              </div>
            ))
            : // Renderizar os cards reais, preenchendo com placeholders se necessário
            [...Array(totalCards)].map((_, index) => {
              const anime = displayedAnimes[index];
              if (!anime) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="relative overflow-hidden transition-transform duration-300 z-0"
                  >
                    <div className="block w-full aspect-[3/4] overflow-hidden bg-gray-800 rounded">
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No Data
                      </div>
                    </div>
                    <div className="mt-2 h-6 w-3/4 bg-gray-800 rounded" />
                  </div>
                );
              }
              return (
                <div
                  key={anime.mal_id}
                  className="relative overflow-hidden transition-transform duration-300 hover:scale-105 z-0"
                >
                  <a
                    href={`/anime/${anime.mal_id}`}
                    className="block w-full aspect-[3/4] overflow-hidden"
                  >
                    <img
                      src={anime.images?.jpg?.large_image_url || 'https://via.placeholder.com/150'}
                      alt={anime.title}
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <a
                    href={`/anime/${anime.mal_id}`}
                    className="block mt-2 text-[#8BA0B2] font-sans text-1xl font-semibold leading-[21px] overflow-hidden break-words"
                  >
                    {anime.title}
                  </a>
                </div>
              );
            })}
        </div>
      </section>
    );
  };

export default AnimeCardGrid;