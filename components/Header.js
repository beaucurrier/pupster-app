'use client';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <header className={`p-6 ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'} shadow-lg`}>
      <nav className='flex items-center justify-between'>
        {/* Left section with links */}
        <div className='flex space-x-8'>
          <Link href='/' className='flex items-center space-x-2 hover:text-blue-400'>
            <span>{t('home')}</span>
          </Link>
          <Link href='/discover' className='hover:text-blue-400'>
            {t('discover')}
          </Link>
          <Link href='/search' className='hover:text-blue-400'>
            {t('search')}
          </Link>
        </div>

        {/* Right section with the theme toggle button and language toggle button */}
        <div className='flex items-center space-x-4'>
          {/* Theme Toggle */}
          <button
            className='flex items-center p-2 bg-gray-200 dark:bg-gray-600 text-black dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300'
            onClick={toggleTheme}
          >
            {theme === 'light' ? (
              <>
                <MoonIcon className='w-6 h-6' />
                <span className='ml-2'>{t('dark_mode')}</span>
              </>
            ) : (
              <>
                <SunIcon className='w-6 h-6' />
                <span className='ml-2'>{t('light_mode')}</span>
              </>
            )}
          </button>

          {/* Language Toggle */}
          <button
            className='flex items-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300'
            onClick={toggleLanguage}
          >
            <span className='ml-2'>
              {language === 'en' ? t('switch_to_spanish') : t('switch_to_english')}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
