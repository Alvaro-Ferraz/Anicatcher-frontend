export const Home = () => {
  return (
    <div className="bg-body min-h-screen text-white">
      {/* Header - Movido para fora do fluxo da sidebar */}
      <header className="flex justify-between items-center p-4 bg-sidebar fixed top-0 left-0 w-full z-10">
        <div className="flex items-center">
          <div className="bg-green-500 rounded-full w-8 h-8"></div>
          <a href="#" className="ml-4 text-sm">Home</a>
          <a href="#" className="ml-4 text-sm">Lista</a>
          <a href="#" className="ml-4 text-sm">Comunidade</a>
          <a href="#" className="ml-4 text-sm">Yomashiro</a>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Buscar por nome"
            className="bg-utils border text-utilsText border-gray-600 px-2 py-1 rounded"
          />
          <div className="bg-purple-500 rounded-full w-8 h-8 ml-4"></div>
        </div>
      </header>

      {/* Layout Principal */}
      <div className="flex pt-[68px]"> {/* Adicionado padding-top para evitar sobreposição com o header */}
        {/* Sidebar - Ajustada para começar abaixo do header */}
        <div className="w-[20%] bg-sidebar p-5 fixed h-[calc(100vh-68px)] top-[68px] left-0 overflow-y-auto sidebar">
          {/* Área superior (pode ser um logo ou título) */}
          <div className="w-full h-12 bg-[#1F2937] mb-5 rounded"></div>

          {/* Barra de Pesquisa da Sidebar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar por nome"
              className="bg-utils  text-utilsText pl-10 pr-3 py-2 rounded w-full text-sm placeholder-gray-400 focus:outline-none"
            />
          </div>

          <div className="w-full bg-utils p-5 rounded">
            {/* Seção de Favoritos */}
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
        <div className="w-[75%] ml-[22%] bg-body p-6">
          <main>
            {/* Hero Banner */}
            <div className="grid grid-cols-4 gap-6 mb-10">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx176496-9BDMjAZGEbq4.png"}
                    alt={`Imagem ${i + 1}`}
                    className="w-full h-[250px]  transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Seção Últimos Lançamentos */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-red-400">Últimos Lançamentos</h2>
              <div className="grid grid-cols-5 gap-6">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 group"
                  >
                    {/* Imagem do anime */}
                    <a
                      href={`/anime/${i + 1}`}
                      className="rounded-md shadow-lg cursor-pointer inline-block h-[265px] overflow-hidden relative w-full"
                    >
                      <img
                        src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx189796-cVlT7CY7n8pd.jpg"
                        alt={`Último Lançamento ${i + 1}`}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                      />
                    </a>
                    {/* Título do anime */}
                    <a
                      href="/anime/21/ONE-PIECE/"
                      className="text-gray-500 font-sans text-1xl font-bold leading-[21px] mt-2 overflow-hidden transition-colors duration-200 ease-in-out line-clamp-2"
                    >
                      Naruto
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Seção Ação */}
            <section className="mt-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white uppercase">Ação</h2>
                <a href="#" className="text-sm text-blue-400">View All</a>
              </div>
              <div className="grid grid-cols-6 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-gray-600 rounded-lg shadow-md w-full h-[200px] object-cover"></div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;