import { useState, useEffect } from 'react'
import { User, LogOut, LogIn, Mail, Phone, ChevronLeft, Loader2, Key } from 'lucide-react'
import { useMedwise } from '../context/MedwiseContext'
import { ACHIEVEMENTS } from '../hooks/useGamification'
import { supabase } from '../utils/supabase'

export default function Auth() {
  const { user, loading: contextLoading, achievements, showToast } = useMedwise()
  const [view, setView] = useState('selection') // selection, email, phone, otp
  const [authMode, setAuthMode] = useState('login') // login, signup
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ username: '', email: '', password: '', phone: '', otp: '' })
  const [timer, setTimer] = useState(0)

  // Handle OTP Resend Timer
  useEffect(() => {
    let interval
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000)
    }
    return () => clearInterval(interval)
  }, [timer])

  // Combined Email/Password Login
  const handleEmailAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (authMode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: { username: formData.username }
          }
        })
        if (error) throw error
        setView('otp')
        setTimer(60)
        showToast('6-digit code sent to your email!', 'success')
      } else {
        // Direct Login
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        })
        if (error) throw error
        showToast('Welcome back!', 'success')
      }
    } catch (error) {
      showToast(error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  // Combined Phone Authentication
  const handlePhoneAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // 1. Strip all non-numeric characters (except leading + for already formatted numbers)
    let cleaned = formData.phone.trim();
    const hasPlus = cleaned.startsWith('+');
    cleaned = cleaned.replace(/\D/g, ''); 
    
    let formattedPhone = hasPlus ? '+' + cleaned : cleaned;

    // 2. Nigerian logic: If starts with 0 (e.g. 080...) and is 11 digits, replace 0 with +234
    if (!hasPlus && formattedPhone.startsWith('0') && formattedPhone.length >= 10) {
      formattedPhone = '+234' + formattedPhone.substring(1);
    } 
    // 3. Fallback: If no + and no 0, just prepend +234
    else if (!hasPlus && !formattedPhone.startsWith('+')) {
      formattedPhone = '+234' + formattedPhone;
    }

    // DEBUG ALERT
    console.log('Starting phone auth for:', formattedPhone)

    try {
      // Create a timeout promise to detect hangs
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out. Please check your internet or Supabase dashboard.')), 15000)
      );

      const authRequest = authMode === 'signup' 
        ? supabase.auth.signUp({
            phone: formattedPhone,
            password: formData.password,
            options: { data: { username: formData.username || 'User' } }
          })
        : supabase.auth.signInWithPassword({
            phone: formattedPhone,
            password: formData.password
          });

      // Race the request against our timeout
      const { data, error } = await Promise.race([authRequest, timeoutPromise]);
      
      if (error) {
        console.error('Auth Error Object:', error)
        throw error
      }

      console.log('Auth Success Data:', data)

      if (authMode === 'signup') {
        setFormData(prev => ({ ...prev, phone: formattedPhone }))
        setView('otp')
        setTimer(60)
        showToast('SMS code sent to ' + formattedPhone, 'success')
      } else {
        showToast('Welcome back!', 'success')
      }
    } catch (error) {
      console.error('CRITICAL PHONE ERROR:', error)
      // HARD ALERT so user can see it no matter what
      alert('AUTHENTICATION ERROR: ' + error.message)
      showToast(error.message || 'Authentication failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleOTPSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const isEmail = !!formData.email && !formData.phone
      const { error } = await supabase.auth.verifyOtp({
        email: isEmail ? formData.email : undefined,
        phone: !isEmail ? formData.phone : undefined,
        token: formData.otp,
        type: isEmail ? 'signup' : 'sms'
      })
      if (error) throw error
      showToast('Account verified! Welcome to MedWise.', 'success')
    } catch (error) {
      showToast(error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleViewChange = (newView) => {
    // Clear data from the other method to prevent logic confusion
    if (newView === 'email') setFormData({ ...formData, phone: '', otp: '' })
    if (newView === 'phone') setFormData({ ...formData, email: '', otp: '' })
    setView(newView)
  }

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      try {
        await supabase.auth.signOut()
        localStorage.clear()
        window.location.href = '/' // Force a clean redirect to home/login
      } catch (error) {
        showToast('Logout failed: ' + error.message, 'error')
      }
    }
  }

  if (contextLoading) return null // Handled in App.jsx

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-[#064E3B] via-[#059669] to-[#10B981]">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden p-8 border border-white/20">
            
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4 shadow-inner text-blue-600">
                <User size={32} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">MedWise Nigeria</h1>
              <p className="text-gray-500 mt-2 font-medium">Safe Medication, Better Health.</p>
              
              <div className="mt-8 flex bg-gray-100 p-1 rounded-2xl w-fit mx-auto shadow-inner">
                <button onClick={() => setAuthMode('login')} className={`px-6 py-2 rounded-xl text-xs font-black tracking-widest transition-all ${authMode === 'login' ? 'bg-white shadow-md text-primaryScale' : 'text-gray-500'}`}>LOGIN</button>
                <button onClick={() => setAuthMode('signup')} className={`px-6 py-2 rounded-xl text-xs font-black tracking-widest transition-all ${authMode === 'signup' ? 'bg-white shadow-md text-primaryScale' : 'text-gray-500'}`}>SIGN UP</button>
              </div>
            </div>

            <div className="space-y-6">
              {view === 'selection' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <button onClick={() => handleViewChange('email')} className="w-full flex items-center justify-between p-5 rounded-2xl border-2 border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all group role-button">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <Mail size={24} />
                      </div>
                      <div className="text-left">
                        <span className="block font-bold text-gray-800 text-lg leading-tight">{authMode === 'login' ? 'Email Login' : 'Email Signup'}</span>
                        <span className="text-xs text-gray-500 font-medium">{authMode === 'login' ? 'Access your account' : 'Verify with code'}</span>
                      </div>
                    </div>
                    <ChevronLeft size={20} className="rotate-180 text-gray-300 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button onClick={() => handleViewChange('phone')} className="w-full flex items-center justify-between p-5 rounded-2xl border-2 border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all group">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <Phone size={24} />
                      </div>
                      <div className="text-left">
                        <span className="block font-bold text-gray-800 text-lg leading-tight">{authMode === 'login' ? 'Phone Login' : 'Phone Signup'}</span>
                        <span className="text-xs text-gray-500 font-medium">No email required</span>
                      </div>
                    </div>
                    <ChevronLeft size={20} className="rotate-180 text-gray-300 group-hover:translate-x-1 transition-transform" />
                  </button>


                  <div className="relative my-8 px-4 text-center">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] bg-white px-3 relative z-10">Verification Required</span>
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100"></div>
                  </div>
                </div>
              )}

              {/* Email/Phone Auth Form */}
              {(view === 'email' || view === 'phone') && (
                <form onSubmit={view === 'email' ? handleEmailAuth : handlePhoneAuth} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <header className="flex items-center justify-between mb-6">
                    <button type="button" onClick={() => setView('selection')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors flex items-center text-xs font-bold text-gray-400 border border-gray-100 pr-4">
                      <ChevronLeft size={18} /> BACK
                    </button>
                    <div className="flex items-center space-x-2">
                       <span className="text-[10px] font-black text-primary uppercase tracking-widest">{authMode} mode</span>
                       <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    </div>
                  </header>

                  <h2 className="text-2xl font-black text-gray-900 ml-1 tracking-tight">
                    {view === 'email' ? 'Email Method' : 'Phone Method'}
                  </h2>

                  {authMode === 'signup' && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] ml-1">Choose Username</label>
                      <input type="text" required className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium" placeholder="e.g. HealthHero" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] ml-1">{view === 'email' ? 'Your Email' : 'Your Phone Number'}</label>
                    <input type={view === 'email' ? 'email' : 'tel'} required className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium uppercase text-sm tracking-widest placeholder:normal-case placeholder:tracking-normal" placeholder={view === 'email' ? 'email@example.com' : '+234...'} value={view === 'email' ? formData.email : formData.phone} onChange={e => setFormData({...formData, [view]: e.target.value})} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] ml-1">Password</label>
                    <div className="relative">
                      <input type="password" required minLength={6} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium" placeholder="Minimum 6 characters" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                      <Key className="absolute right-4 top-4 text-gray-300" size={20} />
                    </div>
                  </div>

                  <button disabled={loading} type="submit" className="btn-primary w-full py-5 mt-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center space-x-3 group active:scale-95 transition-all">
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />}
                    <span className="font-bold uppercase tracking-widest">{authMode === 'login' ? 'Login' : 'Start Signup'}</span>
                  </button>
                </form>
              )}

              {/* OTP Input for Signup Verification */}
              {view === 'otp' && (
                <form onSubmit={handleOTPSubmit} className="space-y-6">
                  <header className="flex items-center justify-between mb-6">
                    <button type="button" onClick={() => setView(formData.email ? 'email' : 'phone')} className="flex items-center text-xs font-bold text-gray-400 hover:text-primary transition-colors">
                      <ChevronLeft size={14} className="mr-1" /> CHANGE {formData.email ? 'EMAIL' : 'PHONE'}
                    </button>
                    <div className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-black uppercase tracking-tighter shadow-sm">VERIFYING</div>
                  </header>

                  <div className="text-center">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Enter Code</h2>
                    <p className="text-xs text-gray-500 mt-2 font-medium leading-relaxed">We sent a secure code to<br/><span className="font-bold text-gray-800">{formData.email || formData.phone}</span></p>
                  </div>
                  
                  <input 
                    type="text" 
                    required 
                    maxLength={8} 
                    className="w-full p-6 text-center text-3xl font-black tracking-[0.2em] bg-gray-50 border-none rounded-3xl focus:ring-2 focus:ring-primary/20 transition-all outline-none shadow-inner" 
                    placeholder="ΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇó" 
                    value={formData.otp} 
                    onChange={e => setFormData({...formData, otp: e.target.value.replace(/[^0-9]/g, '')})} 
                  />

                  <button disabled={loading} type="submit" className="btn-primary w-full py-4 rounded-2xl shadow-xl flex items-center justify-center space-x-2 transition-all active:scale-95 group">
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <div className="w-5 h-5 rounded-full bg-white text-primary flex items-center justify-center text-[10px] font-black group-hover:scale-110 transition-transform">Γ£ô</div>}
                    <span className="font-bold uppercase tracking-widest text-sm">Verify & Sign In</span>
                  </button>

                  <div className="text-center pt-2">
                    {timer > 0 ? (
                      <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        <Loader2 size={12} className="animate-spin" />
                        <span>Resend in {timer}s</span>
                      </div>
                    ) : (
                      <button type="button" onClick={formData.email ? handleEmailAuth : handlePhoneAuth} className="text-xs text-primary font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Resend Verification Code</button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Profile Drawer (Simplified for Dashboard Overlay)
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-white/50 group transition-all hover:scale-105">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <User size={24} />
          </div>
          <div>
            <p className="font-bold text-gray-900 leading-none mb-1">{user.username}</p>
            <div className="flex items-center text-[10px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-full uppercase tracking-tighter">LVL {user.level} ΓÇó {user.points} XP</div>
          </div>
        </div>

        <div className="hidden group-hover:block mt-4 pt-4 border-t border-gray-100 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="space-y-1.5 px-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Badges Earned</p>
            <div className="flex flex-wrap gap-2">
              {achievements.length === 0 ? <span className="text-[10px] text-gray-400 italic">No achievements yet</span> : achievements.slice(0, 4).map(a => {
                const achMetadata = Object.values(ACHIEVEMENTS).find(ach => ach.id === a.id?.toLowerCase());
                return (
                  <div key={a.id} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-lg" title={achMetadata?.name || 'Achievement'}>
                    {achMetadata?.name?.split(' ')[0] || '≡ƒÅå'}
                  </div>
                );
              })}
            </div>
          </div>

          <button onClick={handleLogout} className="w-full flex items-center justify-center p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-xs font-bold uppercase tracking-widest">
            <LogOut size={14} className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  )
}
