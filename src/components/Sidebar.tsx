import React, { useState } from 'react';
import {
  Menu,
  X,
  User,
  Settings,
  History,
  CheckCircle,
  Database,
  Moon,
  Sun,
  Briefcase,
  Users,
} from 'lucide-react';
import type { UserRole, HistoryMode } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
  historyMode: HistoryMode;
  onHistoryModeChange: (mode: HistoryMode) => void;
  onShowHistory: () => void;
  onShowApprovals: () => void;
  onShowEmbeddings: () => void;
  pendingCount: number;
  darkMode: boolean;
  onDarkModeToggle: () => void;
  userId: string;
  onUserIdChange: (userId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  role,
  onRoleChange,
  historyMode,
  onHistoryModeChange,
  onShowHistory,
  onShowApprovals,
  onShowEmbeddings,
  pendingCount,
  darkMode,
  onDarkModeToggle,
  userId,
  onUserIdChange,
}) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Chat Assistant
            </h1>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Role Selector */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Tryb użytkownika
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => onRoleChange('employee')}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  role === 'employee'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Briefcase size={16} />
                Pracownik
              </button>
              <button
                onClick={() => onRoleChange('client')}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  role === 'client'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Users size={16} />
                Klient
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <button
              onClick={onShowHistory}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <History size={18} />
              Historia czatu
            </button>

            <button
              onClick={onShowApprovals}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <CheckCircle size={18} />
              <span className="flex-1 text-left">Zatwierdzenia</span>
              {pendingCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={onShowEmbeddings}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Database size={18} />
              Embeddings
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Settings size={18} />
              Ustawienia
            </button>

            {/* Settings Panel */}
            {showSettings && (
              <div className="ml-6 mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-2">
                    Tryb historii
                  </label>
                  <select
                    value={historyMode}
                    onChange={(e) => onHistoryModeChange(e.target.value as HistoryMode)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  >
                    <option value="STANDARD">Standard (20 wiadomości)</option>
                    <option value="FULL">Pełna historia</option>
                    <option value="RAG">RAG (20 + kontekst)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Tryb ciemny
                  </span>
                  <button
                    onClick={onDarkModeToggle}
                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                  </button>
                </div>
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                <User size={16} />
                User ID (Developer)
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => onUserIdChange(e.target.value)}
                placeholder="user-employee"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Zmień ID użytkownika dla testów
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 lg:hidden z-30 p-4 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg"
      >
        <Menu size={24} />
      </button>
    </>
  );
};
