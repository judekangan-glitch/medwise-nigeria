@echo off
cd /d "C:\Users\jude k\Git\medwise-nigeria-main"
echo Initializing git repository...
git init
echo.
echo Adding files...
git add .
echo.
echo Creating commit...
git commit -m "Add gamification, auth, dark mode, expanded content, and localStorage persistence"
echo.
echo Setting up remote...
git remote add origin https://github.com/judekangan-glitch/medwise-nigeria.git
echo.
echo Pushing to GitHub (you may need to enter credentials)...
git push -u origin main
echo.
echo Done! Your changes should now be on GitHub.
pause
