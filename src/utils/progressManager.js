// Ключі для LocalStorage
const STORAGE_KEYS = {
  USER_PROGRESS: 'galya_user_progress',
  USER_INFO: 'galya_user_info',
  COMPLETED_LESSONS: 'galya_completed_lessons',
  QUIZ_SCORES: 'galya_quiz_scores'
};

// Отримати прогрес користувача
export const getUserProgress = () => {
  try {
    const progress = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    return progress ? JSON.parse(progress) : getDefaultProgress();
  } catch (error) {
    console.error('Помилка читання прогресу:', error);
    return getDefaultProgress();
  }
};

// Прогрес за замовчуванням
const getDefaultProgress = () => ({
  currentDay: 1,
  completedDays: [],
  totalDays: 6,
  moneyEarned: 0,
  totalMoney: 3000,
  startDate: new Date().toISOString(),
  lastActivity: new Date().toISOString()
});

// Зберегти прогрес
export const saveUserProgress = (progress) => {
  try {
    progress.lastActivity = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
    return true;
  } catch (error) {
    console.error('Помилка збереження прогресу:', error);
    return false;
  }
};

// Завершити урок
export const completeLesson = (dayNumber, quizScore = 0) => {
  const progress = getUserProgress();
  
  // Якщо урок ще не завершений
  if (!progress.completedDays.includes(dayNumber)) {
    progress.completedDays.push(dayNumber);
    progress.completedDays.sort((a, b) => a - b);
    progress.moneyEarned += 500; // 500 грн за урок
    
    // Оновити поточний день
    progress.currentDay = Math.min(dayNumber + 1, progress.totalDays);
    
    // Зберегти результат тесту
    saveQuizScore(dayNumber, quizScore);
    
    saveUserProgress(progress);
  }
  
  return progress;
};

// Зберегти результат тесту
export const saveQuizScore = (dayNumber, score) => {
  try {
    const scores = getQuizScores();
    scores[`day${dayNumber}`] = {
      score,
      date: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(scores));
  } catch (error) {
    console.error('Помилка збереження результату тесту:', error);
  }
};

// Отримати результати тестів
export const getQuizScores = () => {
  try {
    const scores = localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES);
    return scores ? JSON.parse(scores) : {};
  } catch (error) {
    return {};
  }
};

// Перевірити чи урок доступний
export const isLessonAvailable = (dayNumber) => {
  const progress = getUserProgress();
  
  // День 1 завжди доступний
  if (dayNumber === 1) return true;
  
  // Інші дні доступні якщо попередній завершений
  return progress.completedDays.includes(dayNumber - 1);
};

// Отримати статус уроку
export const getLessonStatus = (dayNumber) => {
  const progress = getUserProgress();
  
  if (progress.completedDays.includes(dayNumber)) {
    return 'completed';
  }
  
  if (progress.currentDay === dayNumber) {
    return 'in_progress';
  }
  
  if (isLessonAvailable(dayNumber)) {
    return 'not_started';
  }
  
  return 'locked';
};

// Скинути прогрес (для тестування)
export const resetProgress = () => {
  localStorage.removeItem(STORAGE_KEYS.USER_PROGRESS);
  localStorage.removeItem(STORAGE_KEYS.QUIZ_SCORES);
  return getDefaultProgress();
};

// Експортувати прогрес (для майбутньої синхронізації)
export const exportProgress = () => {
  return {
    progress: getUserProgress(),
    quizScores: getQuizScores(),
    exportDate: new Date().toISOString()
  };
};

// Імпортувати прогрес (для майбутньої синхронізації)
export const importProgress = (data) => {
  try {
    if (data.progress) {
      localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(data.progress));
    }
    if (data.quizScores) {
      localStorage.setItem(STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(data.quizScores));
    }
    return true;
  } catch (error) {
    console.error('Помилка імпорту прогресу:', error);
    return false;
  }
};