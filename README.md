
# MedWise Nigeria

[![Live Demo](https://img.shields.io/badge/Live%20Demo-medwise--nigeria.vercel.app-brightgreen)](https://medwise-nigeria.vercel.app/)


**Quick Start:**
- Visit [https://medwise-nigeria.vercel.app/](https://medwise-nigeria.vercel.app/) and click "Get Started".
- Simple login with username (email optional). Works on desktop and mobile.

**From Education to Verification - Your Complete Medication Safety Companion**

A comprehensive medication safety platform combating antibiotic resistance and counterfeit medications in Nigeria through education, verification, and adherence tracking.

## 🎯 Problem Statement

Nigeria faces two critical healthcare challenges:
1. **Antibiotic Resistance**: Over 70% inappropriate antibiotic use leading to drug-resistant infections
2. **Counterfeit Medications**: 30-40% of medications in markets are fake or substandard

MedWise Nigeria addresses both through a three-pillar approach.

## 🏆 Competition Entry

Built for the **3MTT Knowledge Showcase 2026** under the **Education** pillar.

### Judging Criteria Alignment
- ✅ **Technical Quality (25%)**: Clean React architecture, responsive design
- ✅ **Innovation & Originality (20%)**: First integrated antibiotic stewardship + verification platform
- ✅ **Functionality & Usability (20%)**: Fully functional MVP with interactive features
- ✅ **Learning Application (20%)**: Leverages medical laboratory science expertise
- ✅ **Presentation & Clarity (15%)**: Clear user flows, professional design


## 📸 Screenshots
![Home Screen](Screenshots%20for%20organisation/home.png)
*Home page: Welcome and onboarding*

![Learn Module](Screenshots%20for%20organisation/learn.png)
*Education hub: Modules and quizzes*

![Symptom Checker](Screenshots%20for%20organisation/checker.png)
*Interactive symptom checker: Evidence-based guidance*

![Verification](Screenshots%20for%20organisation/verify.png)
*Medication verification: NAFDAC code checking*

![Reminders](Screenshots%20for%20organisation/reminders.png)
*Smart Reminders: Medication adherence with SMS & Push alerts*

## 🚀 Features

### 1. LEARN Module
- **Interactive Symptom Checker**: Evidence-based decision tree for antibiotic necessity
- **Educational Modules**: 
  - Antibiotic Basics
  - The Resistance Crisis
  - Proper Antibiotic Use
- **Gamified Learning**: Quizzes and progress tracking

### 2. VERIFY Module
- **NAFDAC Code Verification**: Check medication authenticity
- **Counterfeit Detection**: Database of verified medications
- **Community Reporting**: Report suspected fakes

### 3. TRACK & REMIND Module
- **Medication Adherence Tracker**: Never miss a dose with smart alerts
- **Browser Notifications**: Native push alerts for desktop and mobile
- **Twilio SMS Integration**: Automated text reminders for medication schedules
- **Gamified Adherence**: Earn points and XP for completing courses


### 4. MULTILINGUAL Core
- **Native Localization**: The entire platform translates instantly between 5 Nigerian languages (English, Pidgin, Hausa, Yoruba, and Igbo).
- **Deep Translation**: Database models, Symptom definitions, and UI alerts are fully mapped.

## 🏗️ 7-Pillar Architecture
MedWise Nigeria is built on seven core technical and functional pillars:
1. **Education**: Evidence-based learning modules and quizzes.
2. **Verification**: Instant NAFDAC code checking for drug authenticity.
3. **Adherence**: Smart reminders and tracking to ensure full treatment courses.
4. **Localization**: Breaking language barriers with 5-language native support.
5. **Persistence**: Robust cloud sync via Supabase (Anonymous + Authenticated).
6. **Notification**: Multi-channel alerts (Browser Push + Twilio SMS).
7. **Accessibility**: Offline-first PWA design for inclusive healthcare access.

## ♿ Accessibility & Inclusion
- **Bridging Linguistic Divides**: First healthcare app to prioritize and ship native Pidgin, Hausa, Yoruba, and Igbo translations.
- **Offline-First PWA**: Installs natively to any Android or iOS device. Core features handle offline conditions gracefully.
- **Cloud Infrastructure**: 
  - **Supabase Backend**: Real-time data persistence and secure user management.
  - **Twilio Communications**: Automated SMS delivery for medication adherence.
- Dark mode support and highly responsive mobile-first UI.
- All features work with or without login, with seamless data merging on authentication.

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Backend/Auth**: Supabase
- **SMS Service**: Twilio API
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm

### Local Development

1. **Clone or download the project**

2. **Install dependencies**:
```bash
cd medwise-nigeria
npm install
```

3. **Run development server**:
```bash
npm run dev
```

4. **Open browser**: http://localhost:5173

## 🌐 Deployment to Vercel (FREE)

### Step 1: Build for Production
```bash
npm run build
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)
```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy (run from project root)
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name? medwise-nigeria
# - Directory? ./
# - Want to override settings? No

# Production deployment
vercel --prod
```

#### Option B: Using Vercel Dashboard
1. Go to https://vercel.com
2. Sign in with GitHub account
3. Click "Import Project"
4. Import the `medwise-nigeria` folder
5. Vercel auto-detects Vite settings
6. Click "Deploy"

### Step 3: Get Your Live URL
After deployment, Vercel provides a URL like:
`https://medwise-nigeria.vercel.app`

## 📁 Project Structure

```
medwise-nigeria/
├── src/
│   ├── components/
│   │   └── Navigation.jsx       # Main navigation component
│   ├── pages/
│   │   ├── Home.jsx             # Landing page
│   │   ├── Learn.jsx            # Learning hub
│   │   ├── SymptomChecker.jsx   # Interactive symptom assessment
│   │   ├── EducationModule.jsx  # Detailed education content
│   │   ├── Verify.jsx           # Medication verification
│   │   └── Track.jsx            # Adherence tracking
│   ├── App.jsx                  # Main app component with routing
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles + Tailwind
├── index.html                   # HTML entry point
├── package.json                 # Dependencies
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
└── postcss.config.js            # PostCSS configuration
```

## 📄 Solution Brief

**JUDE KANGAN DANKWAM**  
3MTT Fellow ID: FE/23/77283616

### Problem
Nigeria faces a dual healthcare crisis: rampant antibiotic resistance—driven by over 70% inappropriate use—and a flood of counterfeit medications, with up to 40% of drugs in circulation being fake or substandard. These silent threats endanger lives, undermine trust in healthcare, and fuel preventable deaths nationwide.

### Users
- **Primary:** Everyday Nigerians seeking safe, effective medication guidance.
- **Secondary:** Healthcare workers, pharmacy staff, and public health advocates striving for safer communities.

### Build
- **Modern Frontend:** React + Vite for blazing-fast, seamless user experience.
- **Backend Sync**: Supabase cloud persistence for points, progress, and schedules.
- **Messaging**: Integrated Twilio SMS for automated adherence reminders.
- **Responsive Design:** Tailwind CSS ensures accessibility on any device.
- **Medical Intelligence:** Evidence-based decision trees and expert content.
- **Inclusive Architecture:** Native multi-language support (English, Pidgin, Hausa, Yoruba, Igbo) bridging the digital divide.
- **PWA-Ready:** Installs like an app, features native mobile push notifications and offline support.

### Impact
- **Empowers Smarter Choices:** Transforms how Nigerians learn about, use, and verify medications.
- **Reduces Resistance:** Drives behavioral change in antibiotic use, curbing resistance.
- **Detects Fakes:** Enables instant verification and community reporting of counterfeit drugs.
- **Builds Trust:** Fosters a culture of safety, accountability, and health literacy.

### Scalability
- **Pilot:** University of Jos—proven with real students and healthcare trainees.
- **Expansion:** Ready for rollout to universities, pharmacies, and clinics nationwide.
- **National Vision:** Designed for partnership with NAFDAC, Ministry of Health, and public health campaigns—scalable to millions.

## 🔬 Medical Credibility

Built by Jude Kangan Dangwam, 500-level Medical Laboratory Science student, University of Jos, currently researching "Nasal Carriage and Antibiotic Susceptibility Profile of *Staphylococcus aureus* Among Healthcare Students."

This platform applies real medical research to solve real healthcare problems.

## 🚨 Important Notes

- Currently verifying 10,076 nafdac registered drugs
- For official verification, users directed to contact NAFDAC
- Symptom checker provides general guidance only, not medical diagnosis
- Platform encourages professional medical consultation


## 🤖 AI/Tool Disclosure
This project used AI tools for:
- Code assistance (GitHub Copilot, ChatGPT)
- Content/quiz generation (where applicable)
All AI-generated content was reviewed and edited for accuracy and relevance.

## 📞 Contact

**Developer**: Jude Kangan Dangwam  
**Institution**: University of Jos, Nigeria  
**Program**: 3MTT NextGen Cohort  
**Submission**: Education Pillar

## 📜 License

Built for educational purposes as part of 3MTT Knowledge Showcase 2026.

---

**Built with ❤️ for Nigerian healthcare safety**
