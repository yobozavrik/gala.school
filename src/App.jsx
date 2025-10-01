import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, MessageCircle, User, TrendingUp, Award, Clock, CheckCircle, Circle, Lock, ArrowRight, Send, Bot } from 'lucide-react';
import LessonView from './pages/LessonView';

function Navigation() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="max-w-md mx-auto flex justify-around">
        <Link to="/" className={`flex flex-col items-center p-2 transition-colors ${isActive('/') ? 'text-galya-brown' : 'text-gray-600'}`}>
          <Home size={24} />
          <span className="text-xs mt-1">Головна</span>
        </Link>
        <Link to="/lessons" className={`flex flex-col items-center p-2 transition-colors ${isActive('/lessons') ? 'text-galya-brown' : 'text-gray-600'}`}>
          <BookOpen size={24} />
          <span className="text-xs mt-1">Уроки</span>
        </Link>
        <Link to="/chat" className={`flex flex-col items-center p-2 transition-colors ${isActive('/chat') ? 'text-galya-brown' : 'text-gray-600'}`}>
          <MessageCircle size={24} />
          <span className="text-xs mt-1">AI Чат</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center p-2 transition-colors ${isActive('/profile') ? 'text-galya-brown' : 'text-gray-600'}`}>
          <User size={24} />
          <span className="text-xs mt-1">Профіль</span>
        </Link>
      </div>
    </nav>
  );
}

import { getUserProgress } from './utils/progressManager';

function Dashboard() {
  const progress = getUserProgress();
  const percentage = (progress.completedDays.length / progress.totalDays) * 100;

  return (
    <div className="pb-20 px-4 pt-6 max-w-md mx-auto">
      {/* Логотип з анімацією */}
      <div className="flex items-center justify-center mb-6 animate-fade-in">
        <img src="/logo.png" alt="Галя Балувана" className="w-24 h-24 object-contain" />
      </div>
      
      {/* Заголовок з анімацією */}
      <div className="mb-6 text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h1 className="text-2xl font-bold text-galya-brown">Вітаємо, стажер!</h1>
        <p className="text-galya-brown-light mt-1">Програма навчання</p>
      </div>

      {/* Прогрес з анімацією */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-4 animate-scale-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-galya-brown">Ваш прогрес</span>
          <span className="text-sm text-galya-brown font-bold">
            {progress.completedDays.length}/{progress.totalDays} днів
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-galya-brown to-galya-accent h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Статистика з анімацією */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white animate-scale-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.3s' }}>
          <TrendingUp size={28} className="mb-2" />
          <p className="text-2xl font-bold">{progress.moneyEarned} ₴</p>
          <p className="text-sm opacity-90">Заробили</p>
        </div>
        <div className="bg-gradient-to-br from-galya-brown to-galya-brown-light rounded-xl p-5 text-white animate-scale-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.4s' }}>
          <Award size={28} className="mb-2" />
          <p className="text-2xl font-bold">{progress.totalMoney} ₴</p>
          <p className="text-sm opacity-90">Можливо заробити</p>
        </div>
      </div>

      {/* Поточний урок з анімацією */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="flex items-center mb-3">
          <Clock size={22} className="text-galya-brown mr-2" />
          <h2 className="text-lg font-semibold text-galya-brown">Поточний урок</h2>
        </div>
        <div className="bg-galya-beige rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-sm text-galya-brown-light">День {progress.currentDay}</p>
              <h3 className="font-semibold text-galya-brown">Знайомство з компанією</h3>
            </div>
            <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium animate-pulse">В процесі</span>
          </div>
          <p className="text-sm text-galya-brown-light mb-3">Дізнайтесь про історію "Галя Балувана", наші цінності та місію</p>
        </div>
        
        <Link 
          to="/lessons" 
          className="block w-full bg-gradient-to-r from-galya-brown to-galya-brown-light text-white text-center py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          Продовжити навчання
        </Link>
      </div>

      {/* Мотивація з анімацією */}
      <div className="bg-gradient-to-r from-galya-accent to-galya-brown-light rounded-xl p-6 text-white animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <h3 className="font-semibold mb-2 text-lg">Ви на правильному шляху!</h3>
        <p className="text-sm opacity-95">Завершіть усі 6 днів навчання та отримайте 3000 грн + сертифікат</p>
      </div>
    </div>
  );
}

import { getLessonStatus } from './utils/progressManager';

function Lessons() {
  const [testMode, setTestMode] = useState(false);
  
  const lessons = [
    { day: 1, title: 'Знайомство з компанією', description: 'Історія, цінності, місія', reward: 500, icon: '🏢' },
    { day: 2, title: 'Продуктова лінійка', description: 'Пельмені, вареники, хінкалі', reward: 500, icon: '🥟' },
    { day: 3, title: 'Робота з касою Poster', description: 'Касова дисципліна', reward: 500, icon: '💳' },
    { day: 4, title: 'Техніка продажу', description: 'Презентація, допродажі', reward: 500, icon: '💼' },
    { day: 5, title: 'Робота з клієнтами', description: 'Типи клієнтів, конфлікти', reward: 500, icon: '😊' },
    { day: 6, title: 'Фінальний іспит', description: 'Перевірка знань', reward: 500, icon: '🎓' }
  ].map(lesson => ({
    ...lesson,
    status: testMode ? 'not_started' : getLessonStatus(lesson.day)
  }));

  const getStatusBadge = (status) => {
    if (status === 'completed') return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Завершено</span>;
    if (status === 'in_progress') return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">В процесі</span>;
    if (status === 'not_started') return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Доступний</span>;
    return <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">Заблоковано</span>;
  };

  return (
    <div className="pb-20 px-4 pt-6 max-w-md mx-auto bg-gradient-to-b from-galya-beige to-gray-50 min-h-screen">
      <div className="flex items-center justify-center mb-4">
        <img src="/logo.png" alt="Галя Балувана" className="w-16 h-16 object-contain" />
      </div>
      
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-galya-brown">Програма навчання</h1>
        <p className="text-galya-brown-light mt-1">6 днів до вашого сертифікату</p>
      </div>

      <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-blue-900">Тестовий режим</p>
            <p className="text-xs text-blue-700">Всі дні відкриті</p>
          </div>
          <button
            onClick={() => setTestMode(!testMode)}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              testMode ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                testMode ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => {
          const isAccessible = testMode || lesson.status !== 'locked';
          
          return (
            <div key={lesson.day} className={`bg-white rounded-xl shadow-sm overflow-hidden border-2 ${!isAccessible ? 'opacity-60 border-gray-200' : 'border-galya-accent'}`}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="text-3xl">{lesson.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-galya-brown-light">День {lesson.day}</span>
                        {getStatusBadge(lesson.status)}
                      </div>
                      <h3 className="font-semibold text-galya-brown mb-1">{lesson.title}</h3>
                      <p className="text-sm text-gray-600">{lesson.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center text-green-600">
                    <span className="text-lg font-bold">{lesson.reward} ₴</span>
                    <span className="text-sm ml-1">винагорода</span>
                  </div>
                  {isAccessible && (
                    <Link to={`/lesson/${lesson.day}`} className="flex items-center text-galya-brown font-medium text-sm hover:text-galya-brown-light transition-colors">
                      {lesson.status === 'completed' ? 'Переглянути' : 'Почати'}
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-galya-beige border-2 border-galya-accent rounded-xl p-4">
        <p className="text-sm text-galya-brown">
          <strong>Підказка:</strong> Завершуйте уроки по порядку.
        </p>
      </div>
    </div>
  );
}

function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Вітаю! Я ваш AI наставник з навчання в "Галя Балувана". Можу відповісти на питання про продукцію, роботу з касою, обслуговування клієнтів. Чим можу допомогти?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
  if (!input.trim() || isLoading) return;

  const userMessage = { role: 'user', content: input };
  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setIsLoading(true);

  try {
    const response = await fetch('https://n8n.dmytrotovstytskyi.online/webhook-test/gala.school', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: input,
        history: messages.slice(-10)
      })
    });

    if (!response.ok) {
      throw new Error('Помилка відповіді від сервера');
    }

    // Спочатку отримуємо текст
    const textData = await response.text();
    console.log('Raw response:', textData);

    // Пробуємо розпарсити JSON
    let data;
    try {
      data = JSON.parse(textData);
    } catch (e) {
      // Якщо не JSON, використовуємо текст як є
      data = { response: textData };
    }
    
    const aiResponse = {
      role: 'ai',
      content: data.response || data.message || textData || 'Вибачте, не зміг отримати відповідь.'
    };
    
    setMessages(prev => [...prev, aiResponse]);
  } catch (error) {
    console.error('Помилка AI чату:', error);
    const errorMessage = {
      role: 'ai',
      content: 'Вибачте, сталася помилка з\'єднання. Перевірте інтернет або спробуйте пізніше.'
    };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-galya-beige to-gray-50">
      <div className="bg-white border-b-2 border-galya-accent px-4 py-4 shadow-md">
        <div className="max-w-md mx-auto flex items-center">
          <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain mr-3" />
          <div>
            <h1 className="text-xl font-bold text-galya-brown">AI Наставник</h1>
            <p className="text-sm text-galya-brown-light">
              {isLoading ? 'Друкує...' : 'Готовий відповісти'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 pb-32">
        <div className="max-w-md mx-auto space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 ${message.role === 'user' ? 'ml-3' : 'mr-3'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${message.role === 'user' ? 'bg-gradient-to-br from-galya-brown to-galya-brown-light' : 'bg-gradient-to-br from-blue-500 to-blue-600'}`}>
                    {message.role === 'user' ? <User size={20} className="text-white" /> : <Bot size={20} className="text-white" />}
                  </div>
                </div>
                <div className={`rounded-2xl px-4 py-3 shadow-md ${message.role === 'user' ? 'bg-gradient-to-br from-galya-brown to-galya-brown-light text-white' : 'bg-white text-galya-brown border-2 border-galya-beige'}`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%]">
                <div className="mr-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br from-blue-500 to-blue-600">
                    <Bot size={20} className="text-white" />
                  </div>
                </div>
                <div className="rounded-2xl px-4 py-3 shadow-md bg-white border-2 border-galya-beige">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-galya-brown rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-galya-brown rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-galya-brown rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 bg-white border-t-2 border-galya-accent px-4 py-3 shadow-lg">
        <div className="max-w-md mx-auto flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder="Напишіть питання..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 border-2 border-galya-brown-light rounded-full focus:outline-none focus:border-galya-brown disabled:opacity-50"
          />
          <button 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading} 
            className="bg-gradient-to-r from-galya-brown to-galya-brown-light text-white p-3 rounded-full hover:shadow-lg disabled:opacity-50 transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  const user = {
    name: 'Іван Петренко',
    telegram: '@ivanpetrenko',
    phone: '+380 67 123 4567',
    startDate: '25.09.2024',
    completedDays: 0,
    totalDays: 6,
    moneyEarned: 0,
    totalMoney: 3000
  };

  return (
    <div className="pb-20 px-4 pt-6 max-w-md mx-auto bg-gradient-to-b from-galya-beige to-gray-50 min-h-screen">
      <div className="flex items-center justify-center mb-4">
        <img src="/logo.png" alt="Галя Балувана" className="w-20 h-20 object-contain" />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-4 border-2 border-galya-accent">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-galya-brown to-galya-brown-light rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
            ІП
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-galya-brown">{user.name}</h2>
            <p className="text-galya-brown-light text-sm">{user.telegram}</p>
            <p className="text-galya-brown-light text-sm">{user.phone}</p>
          </div>
        </div>
        <div className="pt-4 border-t border-galya-beige">
          <p className="text-sm text-galya-brown-light">
            <span className="font-medium text-galya-brown">Дата початку:</span> {user.startDate}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl shadow-lg p-5 border-2 border-galya-beige">
          <Award className="text-galya-accent mb-2" size={28} />
          <p className="text-2xl font-bold text-galya-brown mb-1">{user.completedDays}/{user.totalDays}</p>
          <p className="text-sm text-galya-brown-light">Завершено днів</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-5 border-2 border-galya-beige">
          <TrendingUp className="text-green-500 mb-2" size={28} />
          <p className="text-2xl font-bold text-galya-brown mb-1">{user.moneyEarned} ₴</p>
          <p className="text-sm text-galya-brown-light">Заробили</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 mb-4 text-white shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">Прогрес до винагороди</h3>
          <TrendingUp size={28} />
        </div>
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-2">
            <span>{user.moneyEarned} ₴</span>
            <span>{user.totalMoney} ₴</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div 
              className="bg-white h-3 rounded-full shadow-inner" 
              style={{ width: `${(user.moneyEarned / user.totalMoney) * 100}%` }}
            ></div>
          </div>
        </div>
        <p className="text-sm opacity-95">
          Залишилось: <span className="font-bold">{user.totalMoney - user.moneyEarned} ₴</span>
        </p>
      </div>

      <div className="bg-galya-beige rounded-xl p-6 mb-4 border-2 border-dashed border-galya-brown-light">
        <div className="text-center">
          <Award className="text-galya-brown-light mx-auto mb-3" size={48} />
          <p className="text-galya-brown font-medium mb-1">Сертифікат недоступний</p>
          <p className="text-sm text-galya-brown-light">Завершіть всі {user.totalDays} днів навчання</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lesson/:day" element={<LessonView />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Navigation />
      </div>
    </BrowserRouter>
  );
}

export default App;
