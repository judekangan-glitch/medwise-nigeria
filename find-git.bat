@echo off
echo Searching for Git installation...
dir "C:\Program Files" /b | findstr Git
dir "C:\Program Files (x86)" /b | findstr Git
echo.
echo Checking common Git paths...
if exist "C:\Program Files\Git\bin\git.exe" echo Found: C:\Program Files\Git\bin\git.exe
if exist "C:\Program Files\Git\cmd\git.exe" echo Found: C:\Program Files\Git\cmd\git.exe
if exist "C:\Program Files (x86)\Git\bin\git.exe" echo Found: C:\Program Files (x86)\Git\bin\git.exe
if exist "C:\Program Files (x86)\Git\cmd\git.exe" echo Found: C:\Program Files (x86)\Git\cmd\git.exe
echo.
pause
