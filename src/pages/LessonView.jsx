import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Award, AlertCircle } from 'lucide-react';

export default function LessonView() {
  const { day } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadLesson = async () => {
    setLoading(true);
    try {
      let lessonData;
      switch(day) {
        case '1':
          lessonData = (await import('../data/lessons/day1.js')).day1Content;
          break;
        case '2':
          lessonData = (await import('../data/lessons/day2.js')).day2Content;
          break;
        case '3':
          lessonData = (await import('../data/lessons/day3.js')).day3Content;
          break;
        case '4':
          lessonData = (await import('../data/lessons/day4.js')).day4Content;
          break;
        case '5':
          lessonData = (await import('../data/lessons/day5.js')).day5Content;
          break;
        case '6':
          lessonData = (await import('../data/lessons/day6.js')).day6Content;
          break;
        default:
          throw new Error('Урок не знайдено');
      }
      setLesson(lessonData);
    } catch (error) {
      console.error('Помилка завантаження уроку:', error);
      alert('Помилка завантаження уроку');
      navigate('/lessons');
    } finally {
      setLoading(false);
    }
  };

  loadLesson();
}, [day, navigate]);

  if (loading || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-galya-beige to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-galya-brown">Завантаження уроку...</p>
        </div>
      </div>
    );
  }

  const totalSteps = lesson.steps.length;
  const currentContent = lesson.steps[currentStep];
  const isLastStep = currentStep === totalSteps - 1;

  const handleNext = () => {
    if (currentContent.type === 'quiz' && selectedAnswer === null) {
      alert('Будь ласка, оберіть відповідь');
      return;
    }

    if (currentContent.type === 'quiz' && !showResult) {
      setShowResult(true);
      if (selectedAnswer === currentContent.correct) {
        setScore(score + 1);
      }
      return;
    }

    if (isLastStep) {
      const totalQuizzes = lesson.steps.filter(s => s.type === 'quiz').length;
      const percentage = totalQuizzes > 0 ? Math.round((score / totalQuizzes) * 100) : 100;
      alert(`Вітаємо! Ви завершили День ${day}!\n\nВаш результат: ${score}/${totalQuizzes} (${percentage}%)\nВи заробили 500 грн!`);
      navigate('/lessons');
    } else {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const renderContent = () => {
    switch (currentContent.type) {
      case 'intro':
        return (
          <div className="text-center py-8">
            <div className="text-6xl mb-6">{lesson.icon}</div>
            <h2 className="text-2xl font-bold text-galya-brown mb-4">{currentContent.title}</h2>
            <p className="text-galya-brown-light text-lg">{currentContent.content}</p>
          </div>
        );

      case 'content':
        return (
          <div>
            <h2 className="text-xl font-bold text-galya-brown mb-4">{currentContent.title}</h2>
            {currentContent.image && (
              <div className="mb-6 flex justify-center">
                <img src={currentContent.image} alt={currentContent.title} className="w-32 h-32 object-contain" />
              </div>
            )}
            <div className="text-galya-brown-light whitespace-pre-line leading-relaxed">
              {currentContent.content.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={i} className="font-bold text-galya-brown mt-4 mb-2">{line.slice(2, -2)}</p>;
                }
                if (line.startsWith('•') || line.startsWith('☐')) {
                  return <p key={i} className="ml-4 mt-1">{line}</p>;
                }
                if (line.startsWith('✅') || line.startsWith('❌') || line.startsWith('🟢') || line.startsWith('🟡') || line.startsWith('🔴') || line.startsWith('⚪')) {
                  return <p key={i} className="mt-2 font-medium">{line}</p>;
                }
                return <p key={i} className="mt-2">{line}</p>;
              })}
            </div>
          </div>
        );

      case 'quiz':
        const isCorrect = selectedAnswer === currentContent.correct;
        return (
          <div>
            <div className="flex items-center mb-4">
              <Award className="text-galya-accent mr-2" size={28} />
              <h3 className="font-bold text-galya-brown text-lg">Перевірка знань</h3>
            </div>
            <p className="text-galya-brown font-medium mb-6 text-lg">{currentContent.question}</p>
            <div className="space-y-3">
              {currentContent.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(index)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    showResult
                      ? index === currentContent.correct
                        ? 'border-green-500 bg-green-50'
                        : index === selectedAnswer
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 bg-gray-50'
                      : selectedAnswer === index
                      ? 'border-galya-brown bg-galya-beige'
                      : 'border-gray-200 hover:border-galya-brown-light hover:bg-galya-beige'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-galya-brown">{option}</span>
                    {showResult && index === currentContent.correct && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                    {showResult && index === selectedAnswer && index !== currentContent.correct && (
                      <AlertCircle className="text-red-500" size={20} />
                    )}
                  </div>
                </button>
              ))}
            </div>
            {showResult && (
              <div className={`mt-6 p-4 rounded-xl ${isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-blue-50 border-2 border-blue-500'}`}>
                <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-blue-800'}`}>
                  {isCorrect ? 'Правильно!' : 'Пояснення:'}
                </p>
                <p className={`text-sm mt-1 ${isCorrect ? 'text-green-700' : 'text-blue-700'}`}>
                  {currentContent.explanation}
                </p>
              </div>
            )}
          </div>
        );

      case 'completion':
        return (
          <div className="text-center py-8">
            <div className="inline-block p-6 bg-green-100 rounded-full mb-6">
              <CheckCircle className="text-green-600" size={64} />
            </div>
            <h2 className="text-2xl font-bold text-galya-brown mb-4">{currentContent.title}</h2>
            <p className="text-galya-brown-light text-lg mb-6">{currentContent.content}</p>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
              <p className="text-3xl font-bold mb-2">+500 ₴</p>
              <p>Ви заробили винагороду!</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-galya-beige to-gray-50">
      <div className="bg-white border-b-2 border-galya-accent sticky top-0 z-10 shadow-md">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => navigate('/lessons')} className="flex items-center text-galya-brown hover:text-galya-brown-light transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-medium">Назад</span>
            </button>
            <span className="text-sm text-galya-brown-light font-medium">День {day} / 6</span>
          </div>
          
          <h1 className="text-xl font-bold text-galya-brown mb-3">{lesson.title}</h1>
          
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-galya-brown-light to-galya-brown h-2 rounded-full transition-all duration-300" style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}></div>
            </div>
            <span className="text-xs text-galya-brown-light whitespace-nowrap font-medium">{currentStep + 1}/{totalSteps}</span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-galya-beige">
          {renderContent()}
        </div>

        <div className="flex space-x-3">
          {currentStep > 0 && (
            <button onClick={handlePrev} className="flex-1 py-3 px-6 rounded-xl border-2 border-galya-brown-light text-galya-brown font-medium hover:bg-galya-beige transition-all">
              Назад
            </button>
          )}
          <button onClick={handleNext} className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-galya-brown to-galya-brown-light text-white font-medium hover:shadow-lg transition-all flex items-center justify-center">
            {isLastStep ? (
              <>
                <CheckCircle size={20} className="mr-2" />
                Завершити
              </>
            ) : showResult || currentContent.type !== 'quiz' ? (
              'Далі'
            ) : (
              'Відповісти'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}