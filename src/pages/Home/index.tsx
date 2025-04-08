import logo from '../../images/Logo-ani.3.png';
import avatar from '../../images/avatar.png';

export const Home = () => {
  return (
    <div className="bg-body min-h-screen text-white">
      {/* Header - Fixed at the top */}
      <header className="flex justify-between items-center p-4 bg-sidebar border-b border-gray-700 fixed top-0 left-0 w-full z-10">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="flex justify-center items-center space-x-6 ml-4">
            <a href="#" className="text-sm text-white hover:text-gray-300">Home</a>
            <a href="#" className="text-sm text-white hover:text-gray-300">Animelist</a>
            <a href="#" className="text-sm text-white hover:text-gray-300">Comunidade</a>
            <a href="#" className="text-sm text-white hover:text-gray-300">Yomashiro</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Buscar por nome"
            className="bg-utils border text-utilsText border-gray-600 px-2 py-1 rounded"
          />
          <div>
            <img
              src={avatar}
              alt="Logo"
              className="w-[40px] h-[40px] bg-size-cover rounded-[3px]"
            />
          </div>
        </div>
      </header>

      {/* Layout Principal */}
      <div className="flex pt-[68px]">
        {/* Sidebar - Fixed on the left */}
        <div className="w-[250px] bg-sidebar p-5 fixed h-[calc(100vh-68px)] border-r border-gray-700 top-[68px] left-0 overflow-y-auto">
          <div className="w-full h-12 bg-[#2e79e2] mt-5 mb-5 rounded"></div>
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
              className="bg-utils text-utilsText pl-10 pr-3 py-2 rounded w-full text-sm placeholder-gray-400 focus:outline-none"
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
                    src={"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx176496-9BDMjAZGEbq4.png"}
                    alt={`Imagem ${i + 1}`}
                    className="w-full h-[250px] transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Seção Últimos Lançamentos */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-red-400">Últimos Lançamentos</h2>
                <a href="#" className="text-sm text-[#748899] hover:text-blue-400">View All</a>
              </div>
              <div className="grid grid-cols-5 gap-6">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden transition-transform duration-300 hover:scale-105"
                  >
                    <a
                      href={`/anime/${i + 1}`}
                      className="block w-full aspect-[3/4] overflow-hidden"
                    >
                      <img
                        src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx189796-cVlT7CY7n8pd.jpg"
                        alt={`Último Lançamento ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </a>
                    <a
                      href={`/anime/${i + 1}`}
                      className="block mt-2 text-[#8BA0B2] font-sans text-lg font-bold leading-[21px] overflow-hidden"
                    >
                      Naruto
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Seção Ação */}
            <section className="mt-10">
              <div className="flex justify-between items-center mb-3">
                <input type="" />
                <a href="#" className="text-sm text-[#748899] hover:text-blue-400">View All</a>
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