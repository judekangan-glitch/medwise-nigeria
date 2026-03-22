
# MedWise Nigeria

[![Live Demo](https://img.shields.io/badge/Live%20Demo-medwise--nigeria.vercel.app-brightgreen)](https://medwise-nigeria.vercel.app/)

**Quick Start:**
- Visit [https://medwise-nigeria.vercel.app/](https://medwise-nigeria.vercel.app/) and click "Get Started".
- No login required. Works on desktop and mobile.

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
![Home Screen](screenshots/home.png)
*Home page: Welcome and onboarding*

![Learn Module](screenshots/learn.png)
*Education hub: Modules and quizzes*

![Symptom Checker](screenshots/checker.png)
*Interactive symptom checker: Evidence-based guidance*

![Verification](screenshots/verify.png)
*Medication verification: NAFDAC code and fake drug alerts*

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

### 3. TRACK Module
- **Medication Adherence Tracker**: Never miss a dose
- **Progress Monitoring**: Visual progress bars
- **Course Completion Rewards**: Gamified adherence


## ♿ Accessibility & Inclusion
- Mobile-friendly responsive design
- Dark mode support
- All features work without login for privacy and inclusion
- (Optional: Add local language or text-to-speech if present)

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Deployment**: Vercel (FREE)

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

## 🎬 Demo Video Script (2-4 Minutes)

### Act 1: The Problem (0:00-0:45)
"I'm a Medical Laboratory Science student at University of Jos. In my research on antibiotic resistance, I discovered two silent killers threatening Nigerian healthcare..."

**Show stats**: 70% inappropriate use, 30-40% fake drugs

### Act 2: The Solution (0:45-2:30)
**Demo each module**:
1. LEARN: Show symptom checker workflow
2. VERIFY: Demonstrate NAFDAC code checking
3. TRACK: Walk through medication adherence

### Act 3: Impact (2:30-3:30)
"For every 100 users: X fewer resistance cases, Y fake drugs detected"

### Closing (3:30-4:00)
"This isn't just education. It's protection. It's the future of medication safety in Nigeria."

## 📄 Solution Brief (1 Page)

**Problem**: Dual crisis of antibiotic resistance and counterfeit medications

**Users**:
- Primary: Everyday Nigerians seeking medication guidance
- Secondary: Healthcare workers, pharmacy staff

**Build**:
- React + Vite (modern, fast)
- Tailwind CSS (responsive design)
- Evidence-based decision trees (medical expertise)
- PWA-ready for mobile access

**Impact**:
- Behavioral change in antibiotic use
- Fake drug detection and reporting
- Community-driven accountability

**Scalability**:
- Pilot: University of Jos students
- Expand: Other Nigerian universities
- National: Partner with NAFDAC, pharmacies, MOH

## 🔬 Medical Credibility

Built by Jude Kangan Dangwam, 500-level Medical Laboratory Science student, University of Jos, currently researching "Nasal Carriage and Antibiotic Susceptibility Profile of *Staphylococcus aureus* Among Healthcare Students."

This platform applies real medical research to solve real healthcare problems.

## 📊 Competitive Advantages

1. **Unique Integration**: Only platform combining education + verification
2. **Medical Expertise**: Built by someone studying the exact problem
3. **Real-World Grounded**: Based on actual field experience (Block Malaria, medical outreach)
4. **Sustainable**: No ongoing API costs, fully functional MVP
5. **Scalable**: Clear path from university pilot to national deployment

## 🚨 Important Notes

- NAFDAC verification uses demo data for MVP purposes
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
