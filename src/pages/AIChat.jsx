import { Send, Bot, User } from 'lucide-react';
import { useState } from 'react';

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: 'Вітаю! Я ваш AI наставник 🤖 Можете запитати мене про все, що стосується роботи в "Галя Балувана". Чим можу допомогти?'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // Додаємо повідомлення користувача
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    // Симуляція відповіді AI (поки що)
    setTimeout(() => {
      const aiResponse = {
        role: 'ai',
        content: 'Це тестова відповідь AI. Пізніше тут буде справжній AI наставник, підключений через OpenAI API! 🚀'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Шапка */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold text-gray-800">AI Наставник 🤖</h1>
          <p className="text-sm text-gray-600">Завжди готовий допомогти</p>
        </div>
      </div>

      {/* Повідомлення */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-24">
        <div className="max-w-md mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 ${message.role === 'user' ? 'ml-3' : 'mr-3'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' ? 'bg-galya-red' : 'bg-blue-500'
                  }`}>
                    {message.role === 'user' ? (
                      <User size={18} className="text-white" />
                    ) : (
                      <Bot size={18} className="text-white" />
                    )}
                  </div>
                </div>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-galya-red text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Поле вводу */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="max-w-md mx-auto flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Напишіть ваше питання..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-galya-red"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-galya-red text-white p-3 rounded-full hover:bg-galya-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}