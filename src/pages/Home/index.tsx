import React from 'react';

export const Home = () => {
  return (
    <div className="bg-body min-h-screen text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-171D22">
        <div className="flex items-center">
          {/* Logo */}
          <div className="bg-green-500 rounded-full w-8 h-8"></div>
          {/* Links de Navegação */}
          <a href="#" className="ml-4 text-sm">Home</a>
          <a href="#" className="ml-4 text-sm">Lista</a>
          <a href="#" className="ml-4 text-sm">comunidade</a>
          <a href="#" className="ml-4 text-sm">yomashiro</a>
        </div>
        <div className="flex items-center">
          {/* Barra de Pesquisa */}
          <input
            type="text"
            placeholder="Buscar por nome"
            className="bg-25272D border border-gray-600 px-2 py-1 rounded"
          />
          {/* Ícone de Perfil do Usuário */}
          <div className="bg-purple-500 rounded-full w-8 h-8 ml-4"></div>
        </div>
      </header>

      {/* Container Principal com Sidebar e Main */}
      <div className="flex bg-sidebar">
        {/* Sidebar */}
        <div className="w-1/7 bg-gray-800 p-4">
          <aside>
            {/* Barra de Pesquisa da Sidebar */}
            <input
              type="text"
              placeholder="Buscar por nome"
              className="bg-gray-700 border border-gray-600 px-2 py-1 rounded mb-4"
            />
            {/* Seção Continue Assistindo */}
            <h2 className="text-lg font-bold mb-2">Continue assistindo</h2>
            <div>
              {[...Array(15 )].map((_, i) => (
                <div key={i} className="flex items-center mb-2">
                  {/* Thumbnail do Anime */}
                  <div className="w-12 h-12 bg-gray-600 rounded"></div>
                  {/* Título do Anime */}
                  <span className="ml-2 text-sm">Sakurasou no pet na kanojo</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* Área de Conteúdo Principal */}
        <div className="w-3/4 bg-body p-4">
          <main>
            {/* Hero Banner */}
            <div className="w-full h-56 bg-gray-700 rounded mb-8"></div>

            {/* Seção Últimos Lançamentos */}
            <section>
              <h2 className="text-xl font-bold mb-4 text-red-400">Últimos Lançamentos</h2>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-gray-600 rounded h-48"></div>
                ))}
              </div>
            </section>

            {/* Seção Ação */}
            <section className="mt-8">
              <h2 className="text-xl font-bold mb-4">Ação</h2>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-gray-600 rounded h-48"></div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Home