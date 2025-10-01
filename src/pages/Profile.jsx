import { User, Award, TrendingUp, Languages, LogOut, Download } from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
  const [language, setLanguage] = useState('uk');

  const user = {
    name: 'Іван Петренко',
    telegram: '@ivanpetrenko',
    phone: '+380 67 123 4567',
    startDate: '25.09.2024',
    completedDays: 1,
    totalDays: 6,
    moneyEarned: 500,
    totalMoney: 3000
  };

  const stats = [
    {
      icon: <Award className="text-yellow-500" size={24} />,
      label: 'Завершено днів',
      value: `${user.completedDays}/${user.totalDays}`
    },
    {
      icon: <TrendingUp className="text-green-500" size={24} />,
      label: 'Заробили',
      value: `${user.moneyEarned} ₴`
    }
  ];

  return (
    <div className="pb-20 px-4 pt-6 max-w-md mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-galya-red to-galya-dark rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600 text-sm">{user.telegram}</p>
            <p className="text-gray-600 text-sm">{user.phone}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Дата початку:</span> {user.startDate}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center mb-2">
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 mb-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">Прогрес</h3>
          <TrendingUp size={24} />
        </div>
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-2">
            <span>{user.moneyEarned} ₴</span>
            <span>{user.totalMoney} ₴</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div 
              className="bg-white h-3 rounded-full"
              style={{ width: `${(user.moneyEarned / user.totalMoney) * 100}%` }}
            ></div>
          </div>
        </div>
        <p className="text-sm opacity-90">
          Залишилось: {user.totalMoney - user.moneyEarned} ₴
        </p>
      </div>

      {user.completedDays === user.totalDays ? (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-4 border-2 border-galya-red">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Сертифікат</h3>
              <p className="text-sm text-gray-600">Вітаємо!</p>
            </div>
            <Award className="text-galya-red" size={32} />
          </div>
          <button className="w-full bg-galya-red text-white py-3 rounded-lg font-medium hover:bg-galya-dark flex items-center justify-center">
            <Download size={18} className="mr-2" />
            Завантажити
          </button>
        </div>
      ) : (
        <div className="bg-gray-100 rounded-xl p-6 mb-4 border-2 border-dashed border-gray-300">
          <div className="text-center">
            <Award className="text-gray-400 mx-auto mb-3" size={40} />
            <p className="text-gray-600 font-medium mb-1">Сертифікат недоступний</p>
            <p className="text-sm text-gray-500">
              Завершіть всі {user.totalDays} днів
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
        <h3 className="font-semibold text-gray-800 px-6 pt-5 pb-3">Налаштування</h3>
        
        <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 border-t border-gray-100">
          <div className="flex items-center">
            <Languages className="text-gray-600 mr-3" size={20} />
            <span className="text-gray-800">Мова</span>
          </div>
          <span className="text-galya-red font-medium">
            {language === 'uk' ? 'Українська' : 'Română'}
          </span>
        </button>

        <button className="w-full px-6 py-4 flex items-center hover:bg-red-50 border-t border-gray-100 text-red-600">
          <LogOut className="mr-3" size={20} />
          <span className="font-medium">Вийти</span>
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
        <p className="text-sm text-blue-800">
          Потрібна допомога? Telegram
        </p>
      </div>
    </div>
  );
}