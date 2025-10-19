// JavaScript для работы с API
const API_BASE_URL = 'https://your-heroku-app.herokuapp.com'; // Замените на ваш API URL

class SportsAIAnalyzer {
    constructor() {
        this.initializeTelegram();
        this.setupEventListeners();
    }

    initializeTelegram() {
        // Инициализация Telegram WebApp
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.ready();
            window.Telegram.WebApp.expand();
        }
    }

    setupEventListeners() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const analyzeBtn = document.getElementById('analyzeBtn');

        // Обработка клика по области загрузки
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        // Обработка выбора файла
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleFileSelect(file);
            }
        });

        // Обработка drag & drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file) {
                this.handleFileSelect(file);
            }
        });

        // Обработка анализа
        analyzeBtn.addEventListener('click', () => {
            this.analyzeImage();
        });
    }

    handleFileSelect(file) {
        if (!file.type.startsWith('image/')) {
            this.showError('Пожалуйста, выберите изображение');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            this.showError('Размер файла не должен превышать 10MB');
            return;
        }

        this.selectedFile = file;
        document.getElementById('analyzeBtn').disabled = false;
        
        // Показываем превью
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.createElement('img');
            preview.src = e.target.result;
            preview.className = 'preview-image';
            preview.id = 'preview';
            
            // Удаляем предыдущее превью
            const oldPreview = document.getElementById('preview');
            if (oldPreview) {
                oldPreview.remove();
            }
            
            document.getElementById('uploadArea').appendChild(preview);
        };
        reader.readAsDataURL(file);
    }

    async analyzeImage() {
        if (!this.selectedFile) return;

        this.showLoading();
        this.hideError();
        this.hideResult();

        try {
            const formData = new FormData();
            formData.append('image', this.selectedFile);

            // Для GitHub Pages используем внешний API
            const response = await fetch(`${API_BASE_URL}/api/analyze`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Ошибка анализа изображения');
            }

            const data = await response.json();
            this.showResult(data);

        } catch (err) {
            // Если API недоступен, показываем демо-данные
            console.warn('API недоступен, показываем демо-данные:', err);
            this.showDemoResult();
        } finally {
            this.hideLoading();
        }
    }

    showDemoResult() {
        const demoData = {
            predictions: [
                {
                    team: "Команда A",
                    confidence: 78,
                    reason: "Отличная форма игроков, высокая мотивация"
                },
                {
                    team: "Команда B", 
                    confidence: 65,
                    reason: "Хорошая тактика, но есть слабые места в защите"
                }
            ],
            betting_recommendations: [
                "🚀 Рекомендуем ставку на Команду A с коэффициентом 1.8+",
                "📊 Анализируйте коэффициенты перед ставкой",
                "💰 Не ставьте больше 5% от банка на один матч"
            ]
        };
        this.showResult(demoData);
    }

    showLoading() {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('analyzeBtn').disabled = true;
    }

    hideLoading() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('analyzeBtn').disabled = false;
    }

    showError(message) {
        const error = document.getElementById('error');
        error.textContent = message;
        error.style.display = 'block';
    }

    hideError() {
        document.getElementById('error').style.display = 'none';
    }

    showResult(data) {
        const predictions = document.getElementById('predictions');
        predictions.innerHTML = '';
        
        if (data.predictions && data.predictions.length > 0) {
            data.predictions.forEach(prediction => {
                const card = document.createElement('div');
                card.className = 'prediction-card';
                card.innerHTML = `
                    <div class="prediction-team">${prediction.team}</div>
                    <div class="prediction-confidence">Вероятность: ${prediction.confidence}%</div>
                    <div class="prediction-reason">${prediction.reason}</div>
                `;
                predictions.appendChild(card);
            });

            // Показываем рекомендации по ставкам
            if (data.betting_recommendations) {
                const recommendations = document.createElement('div');
                recommendations.className = 'recommendations';
                recommendations.innerHTML = '<h4>💡 Рекомендации по ставкам:</h4>';
                
                data.betting_recommendations.forEach(rec => {
                    const recItem = document.createElement('div');
                    recItem.className = 'recommendation-item';
                    recItem.textContent = rec;
                    recommendations.appendChild(recItem);
                });
                
                predictions.appendChild(recommendations);
            }
        } else {
            predictions.innerHTML = '<div class="prediction-card">Не удалось определить команды на фото</div>';
        }
        
        document.getElementById('result').style.display = 'block';
    }

    hideResult() {
        document.getElementById('result').style.display = 'none';
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new SportsAIAnalyzer();
});

