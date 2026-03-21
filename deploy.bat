@echo off
cd /d "C:\Users\jude k\Git\medwise-nigeria-main"
echo.
echo Setting up Git configuration...
git config --global user.email "judekangan@gmail.com"
git config --global user.name "Jude Kangan"
echo.
echo Checking Git status...
git status
echo.
echo Initializing repository...
git init
echo.
echo Adding files...
git add .
echo.
echo Creating commit...
git commit -m "Add gamification, auth, dark mode, expanded content, and localStorage persistence"
echo.
echo Setting up remote...
git remote remove origin
git remote add origin https://github.com/judekangan-glitch/medwise-nigeria.git
echo.
echo Pushing to GitHub...
git push -u origin main
echo.
echo Deployment complete!
pause
