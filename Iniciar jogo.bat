@echo off
REM ============================================================
REM BRIAN: A MANSÃO DE BLACKWOOD - Iniciar Jogo
REM ============================================================
REM Este script inicia o jogo em seu navegador padrão

echo.
echo ================================
echo BRIAN: A MANSAO DE BLACKWOOD
echo ================================
echo.

REM Obtém o diretório atual
setlocal enabledelayedexpansion
set "GAME_DIR=%~dp0"
set "INDEX_FILE=%GAME_DIR%index.html"

REM Verifica se o arquivo index.html existe
if not exist "%INDEX_FILE%" (
    echo ERRO: Arquivo index.html nao encontrado!
    echo Certifique-se de que o arquivo esta no diretorio: %GAME_DIR%
    pause
    exit /b 1
)

echo Iniciando o jogo...
echo.

REM Tenta abrir com o navegador padrão do Windows
start "" "%INDEX_FILE%"

REM Aguarda um momento
timeout /t 2 /nobreak

echo.
echo ============================================
echo Jogo iniciado! O navegador deve abrir...
echo.
echo Se o navegador nao abriu, tente abrir
echo manualmente o arquivo: %INDEX_FILE%
echo.
echo Divirta-se! ;-)
echo ============================================
echo.

pause
