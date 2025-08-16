@echo off
echo 🚀 Запуск CleanCasino сервера...
echo.

REM Проверяем, установлен ли Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js не установлен. Пожалуйста, установите Node.js с https://nodejs.org/
    pause
    exit /b 1
)

REM Проверяем, установлены ли зависимости
if not exist "node_modules" (
    echo 📦 Устанавливаем зависимости...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Ошибка установки зависимостей
        pause
        exit /b 1
    )
)

REM Проверяем конфигурацию
if not exist "config.env" (
    echo ⚠️ Файл config.env не найден. Создайте его с настройками email.
    echo См. README.md для инструкций.
    pause
)

echo ✅ Запускаем сервер...
echo 📧 Email: neuron.holy@gmail.com
echo 🌐 Сайт: http://localhost:3000
echo 📊 API: http://localhost:3000/api/analytics/stats
echo.
echo Нажмите Ctrl+C для остановки сервера
echo.

npm start
