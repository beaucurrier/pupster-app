'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Discover() {
  const [dogImage, setDogImage] = useState('');
  const [friendsCounter, setFriendsCounter] = useState(0); // State to track 'likes' from dogs
  const [notification, setNotification] = useState(''); // State to handle the match notification

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  useEffect(() => {
    fetchRandomDog(); // Fetch random dog image on mount
  }, []);

  const fetchRandomDog = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    setDogImage(data.message); // Set the new image in state
  };

  const handleLike = () => {
    setNotification(''); // Clear any existing notification

    if (Math.random() < 0.2) {
      // 20% chance to increment the friends counter
      setFriendsCounter((prev) => prev + 1); // Update friends counter
      setNotification('WOOF! You made a new friend!'); // Show notification

      // Clear the notification after 3 seconds and then fetch a new dog image
      setTimeout(() => {
        setNotification(''); // Clear the notification
        fetchRandomDog(); // Fetch new random dog image after the notification clears
      }, 3000);
    } else {
      fetchRandomDog(); // Fetch new dog image immediately if no match
    }
  };

  const handleDislike = () => {
    setNotification(''); // Clear notification when clicking 'Dislike'
    fetchRandomDog(); // Fetch new random dog image after disliking
  };

  return (
    <div className='max-w-md text-center mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md'>
      <img src={dogImage} alt='Random Dog' className='w-full h-96 rounded-md mb-4' />
      <div className='flex justify-between'>
        <button onClick={handleDislike} className='w-full p-3 mr-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300'>
          {t('Dislike')}
        </button>
        <button onClick={handleLike} className='w-full p-3 ml-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300'>
          Like
        </button>
      </div>
      <p className='mt-4 text-lg text-gray-900 dark:text-white'>
        Friends Counter: {friendsCounter}
      </p>
      {notification && (
        <p className='mt-4 text-green-500 dark:text-green-400'>
          {notification}
        </p>
      )}
    </div>
  );
}

export default Discover;