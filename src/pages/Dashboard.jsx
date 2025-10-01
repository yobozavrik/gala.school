import React from 'react';
import { TrendingUp, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom'; 

export default function Dashboard() {
  // Поки що статичні дані, потім підключимо до бази
  const progress = {
    currentDay: 1,
    totalDays: 6,
    completedDays: 0,
    moneyEarned: 0,
    totalMoney: 3000
  };

  const percentage = (progress.completedDays / progress.totalDays) * 100;

  return (
    <div className="pb-20 px-4 pt-6 max-w-md mx-auto">
      {/* Шапка */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Вітаємо, стажер! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Галя Балувана - Програма навчання
        </p>
      </div>

      {/* Прогрес */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Ваш прогрес</span>
          <span className="text-sm text-galya-red font-bold">
            {progress.completedDays}/{progress.totalDays} днів
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-galya-red h-3 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
          <TrendingUp size={24} className="mb-2" />
          <p className="text-2xl font-bold">{progress.moneyEarned} ₴</p>
          <p className="text-sm opacity-90">Заробили</p>
        </div>
        
        <div className="bg-gradient-to-br from-galya-red to-galya-dark rounded-xl p-4 text-white">
          <Award size={24} className="mb-2" />
          <p className="text-2xl font-bold">{progress.totalMoney} ₴</p>
          <p className="text-sm opacity-90">Можливо заробити</p>
        </div>
      </div>

      {/* Поточний урок */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
        <div className="flex items-center mb-3">
          <Clock size={20} className="text-galya-red mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">
            Поточний урок
          </h2>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-gray-600">День {progress.currentDay}</p>
              <h3 className="font-semibold text-gray-800">
                Знайомство з компанією
              </h3>
            </div>
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
              В процесі
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Дізнайтесь про історію "Галя Балувана", наші цінності та місію
          </p>
        </div>
        
        <Link 
          to="/lessons"
          className="block w-full bg-galya-red text-white text-center py-3 rounded-lg font-semibold hover:bg-galya-dark transition-colors"
        >
          Продовжити навчання
        </Link>
      </div>

      {/* Мотивація */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <h3 className="font-semibold mb-2">💪 Ви на правильному шляху!</h3>
        <p className="text-sm opacity-90">
          Завершіть усі 6 днів навчання та отримайте 3000 грн + сертифікат
        </p>
      </div>
    </div>
  );
}