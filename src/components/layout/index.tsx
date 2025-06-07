import logo from '../../assets/images/Logo-ani.3.png';
import avatar from '../../assets/images/avatar.png';
import TemporadaAtual from '../../components/anime-season/anime-season';
import { useState } from 'react';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); // Sidebar expandida por padrão

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const sidebarWidth = isSidebarExpanded ? '250px' : '60px';
  const mainMarginLeft = isSidebarExpanded ? '280px' : '90px';

  return (
    <div className="bg-body min-h-screen text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-sidebar border-b border-gray-700 fixed top-0 left-0 w-full z-10">
        <div className="flex items-center space-x-6">
          <img src={logo} alt="Logo" className="w-[60px] h-[60px] rounded-full" />
          <div className="flex space-x-6">
            <a href="/" className="text-sm text-white hover:text-gray-300">Home</a>
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
        {/* Sidebar com Hover */}
        <div className="relative group">
          {/* Hitbox para o Hover */}
          <div
            className="fixed top-[68px] left-0 h-[calc(100vh-68px)] transition-all duration-500 ease-in-out"
            style={{ width: isSidebarExpanded ? '250px' : '80px' }} // Área maior para hover quando retraída
          >
            <div
              className="bg-sidebar p-5 h-full border-r border-gray-700 overflow-y-auto transition-all duration-500 ease-in-out sidebar"
              style={{ width: sidebarWidth }}
            >
              {/* Sidebar Content - Hidden when collapsed */}
              {isSidebarExpanded && (
                <>
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
                </>
              )}
            </div>
          </div>

          <div
            className={`fixed top-[50%] transform -translate-y-1/2 z-20 transition-opacity duration-500 ease-in-out ${isSidebarExpanded ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            style={{ left: sidebarWidth, transition: 'left 0.5s' }}
          >
            <button
              onClick={toggleSidebar}
              className="text-white focus:outline-none rounded-full"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 h-4 text-gray-400 hover:text-white transition-colors"
                style={{ transform: isSidebarExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <path fill="currentColor" d="M8 4l8 8-8 8"></path>
              </svg>
            </button>
          </div>
        </div>

        <div
          className="flex-1 p-6 transition-all duration-500 ease-in-out"
          style={{ marginLeft: mainMarginLeft }}
        >
          <main className="max-w-[1200px] mx-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;