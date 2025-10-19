# 🤖 SportPredict AI - Telegram Mini App

Telegram mini app для AI-анализа спортивных фото и прогнозов ставок.

## 🚀 Возможности

- 📸 **Загрузка фото матчей** - Drag & drop интерфейс
- 🧠 **AI-анализ** - Использует OpenAI Vision API для анализа изображений
- 📊 **Прогнозы** - Получайте рекомендации по ставкам
- 🎯 **Интеграция с Telegram** - Работает как WebApp в боте
- 📱 **Адаптивный дизайн** - Оптимизирован для мобильных устройств

## 🛠 Технологии

- **Frontend**: HTML5, CSS3, JavaScript, Telegram WebApp API
- **Backend**: Python Flask, OpenAI Vision API
- **AI**: GPT-4 Vision для анализа изображений
- **Deploy**: GitHub Pages, Heroku, или любой хостинг

## 📦 Установка

### 1. Клонирование и настройка

```bash
git clone <your-repo>
cd telegram_mini_app
pip install -r requirements.txt
```

### 2. Настройка переменных окружения

Скопируйте `env.example` в `.env` и заполните:

```env
# OpenAI API Key (обязательно для AI анализа)
OPENAI_API_KEY=sk-your-openai-api-key

# Telegram Bot Token
TELEGRAM_BOT_TOKEN=your-bot-token

# URL вашего mini app (после деплоя)
MINI_APP_URL=https://your-domain.com

# Опционально: API ключ для спортивных данных
SPORTS_API_KEY=your-sports-api-key
```

### 3. Запуск локально

```bash
python app.py
```

Приложение будет доступно по адресу: `http://localhost:5000`

## 🌐 Деплой

### Вариант 1: GitHub Pages (Бесплатно)

1. Загрузите файлы в GitHub репозиторий
2. Включите GitHub Pages в настройках репозитория
3. Ваш mini app будет доступен по адресу: `https://username.github.io/repository-name`

### Вариант 2: Heroku

```bash
# Установите Heroku CLI
# Создайте Procfile
echo "web: gunicorn app:app" > Procfile

# Деплой
heroku create your-app-name
git push heroku main
```

### Вариант 3: Любой хостинг

Просто загрузите файлы на ваш хостинг и настройте переменные окружения.

## 🤖 Интеграция с Telegram Bot

Обновите код вашего бота:

```python
# В keyboards/client.py
ikb.button(
    text="🤖 AI Анализ фото", 
    web_app=types.WebAppInfo(url="https://your-domain.com/")
)
```

## 📱 Использование

1. **Откройте mini app** в Telegram боте
2. **Загрузите фото** матча (drag & drop или клик)
3. **Нажмите "Анализировать"** - AI проанализирует изображение
4. **Получите прогноз** с рекомендациями по ставкам

## 🔧 API Endpoints

- `GET /` - Главная страница mini app
- `POST /api/analyze` - Анализ загруженного изображения
- `GET /api/health` - Проверка состояния сервиса
- `GET /api/sports-data` - Получение спортивных данных

## 🧠 AI Анализ

Приложение использует OpenAI Vision API для:

- Определения команд на фото
- Анализа формы игроков
- Оценки тактических особенностей
- Генерации прогнозов и рекомендаций

## 📊 Пример ответа API

```json
{
  "success": true,
  "predictions": [
    {
      "team": "Реал Мадрид",
      "confidence": 78,
      "reason": "Отличная форма игроков, высокая мотивация",
      "key_factors": ["Форма", "Мотивация", "Тактика"]
    }
  ],
  "betting_recommendations": [
    "🚀 Сильная ставка на Реал Мадрид (уверенность 78%)",
    "📊 Анализируйте коэффициенты перед ставкой"
  ],
  "analysis_time": "14:30:25"
}
```

## 🔒 Безопасность

- Все API ключи хранятся в переменных окружения
- Временные файлы автоматически удаляются
- CORS настроен для безопасности
- Валидация загружаемых файлов

## 🐛 Отладка

### Проверка логов

```bash
# Включите debug режим
export FLASK_DEBUG=True
python app.py
```

### Частые проблемы

1. **"Ошибка анализа изображения"** - Проверьте OPENAI_API_KEY
2. **"Файл не найден"** - Проверьте права доступа к папке uploads
3. **"CORS ошибка"** - Проверьте настройки Flask-CORS

## 📈 Развитие

### Планируемые функции

- [ ] Интеграция с реальными API спортивных данных
- [ ] История анализов пользователя
- [ ] Уведомления о результатах матчей
- [ ] Социальные функции (делиться прогнозами)
- [ ] Мобильное приложение

### Вклад в проект

1. Fork репозитория
2. Создайте feature branch
3. Внесите изменения
4. Создайте Pull Request

## 📞 Поддержка

- 📧 Email: support@your-domain.com
- 💬 Telegram: @your_support_bot
- 🐛 Issues: GitHub Issues

## 📄 Лицензия

MIT License - см. файл LICENSE для деталей.

---

**Создано с ❤️ для спортивных энтузиастов**

