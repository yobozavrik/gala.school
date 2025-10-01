function Lessons() {
  const [testMode, setTestMode] = useState(false); // Тестовий режим
  
  const lessons = [
    { day: 1, title: 'Знайомство з компанією', description: 'Історія, цінності, місія', status: 'in_progress', reward: 500, icon: '🏢' },
    { day: 2, title: 'Продуктова лінійка', description: 'Пельмені, вареники, хінкалі', status: testMode ? 'not_started' : 'locked', reward: 500, icon: '🥟' },
    { day: 3, title: 'Робота з касою Poster', description: 'Касова дисципліна', status: testMode ? 'not_started' : 'locked', reward: 500, icon: '💳' },
    { day: 4, title: 'Техніка продажу', description: 'Презентація, допродажі', status: testMode ? 'not_started' : 'locked', reward: 500, icon: '💼' },
    { day: 5, title: 'Робота з клієнтами', description: 'Типи клієнтів, конфлікти', status: testMode ? 'not_started' : 'locked', reward: 500, icon: '😊' },
    { day: 6, title: 'Фінальний іспит', description: 'Перевірка знань', status: testMode ? 'not_started' : 'locked', reward: 500, icon: '🎓' }
  ];

  const getStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle className="text-green-500" size={28} />;
    if (status === 'in_progress') return <Circle className="text-galya-red" size={28} />;
    if (status === 'not_started') return <Circle className="text-gray-400" size={28} />;
    return <Lock className="text-gray-400" size={28} />;
  };

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

      {/* Переключатель тестового режиму */}
      <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-blue-900">Тестовий режим</p>
            <p className="text-xs text-blue-700">Всі дні відкриті для перегляду</p>
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
          <strong>Підказка:</strong> Завершуйте уроки по порядку. Кожен наступний день відкривається після завершення попереднього.
        </p>
      </div>
    </div>
  );
}