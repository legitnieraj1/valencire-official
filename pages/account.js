import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Account() {
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    async function checkSession() {
      if (typeof window !== 'undefined' && window.supabase) {
        const supabase = window.supabase.createClient('https://crqeqejgdrjujsuvihsx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNycWVxZWpnZHJqdWpzdXZpaHN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NjMxMTgsImV4cCI6MjA4MjEzOTExOH0.0Cb4nLFM8g6Aq6XRglrrXNpKknGAf30GfHy0QMqmjbA');
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.push('/cart');
        }
      }
    }
    // Poll for supabase injection
    const timer = setTimeout(checkSession, 500);
    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    // Expose handleCredentialResponse to window for Google Callback
    window.handleCredentialResponse = async (response) => {
      try {
        if (!window.supabase) return;
        const supabase = window.supabase.createClient('https://crqeqejgdrjujsuvihsx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNycWVxZWpnZHJqdWpzdXZpaHN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NjMxMTgsImV4cCI6MjA4MjEzOTExOH0.0Cb4nLFM8g6Aq6XRglrrXNpKknGAf30GfHy0QMqmjbA');
        const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: response.credential,
        });

        if (error) throw error;
        alert('Logged in with Google as: ' + data.user.email);
        router.push('/cart');
      } catch (error) {
        alert('Error logging in with Google: ' + error.message);
      }
    };
  }, [router]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      if (!window.supabase) throw new Error("Connection error");
      const supabase = window.supabase.createClient('https://crqeqejgdrjujsuvihsx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNycWVxZWpnZHJqdWpzdXZpaHN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NjMxMTgsImV4cCI6MjA4MjEzOTExOH0.0Cb4nLFM8g6Aq6XRglrrXNpKknGAf30GfHy0QMqmjbA');
      
      const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
      });

      if (error) throw error;
      alert('Sign in successful! Welcome back.');
      router.push('/cart');
    } catch (error) {
      alert('Error signing in: ' + error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      if (!window.supabase) throw new Error("Connection error");
      const supabase = window.supabase.createClient('https://crqeqejgdrjujsuvihsx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNycWVxZWpnZHJqdWpzdXZpaHN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NjMxMTgsImV4cCI6MjA4MjEzOTExOH0.0Cb4nLFM8g6Aq6XRglrrXNpKknGAf30GfHy0QMqmjbA');
      
      const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
              data: {
                  first_name: firstName,
                  last_name: lastName
              }
          }
      });

      if (error) throw error;
      alert('Sign up successful! Please check your email for the confirmation link.');
      if (data.user) {
        router.push('/cart');
      } else {
        router.push('/');
      }
    } catch (error) {
      alert('Error signing up: ' + error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Valencire - Account</title>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
        <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" async></script>
      </Head>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .account-page-body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .auth-container {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border-radius: 32px;
            padding: 50px 40px;
            width: 100%;
            max-width: 450px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        .auth-logo { text-align: center; margin-bottom: 50px; }
        .auth-logo img { width: 120px; height: auto; filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)); cursor: pointer; }
        .auth-container h2 { text-align: center; color: #ffffff; font-size: 18px; font-weight: 400; letter-spacing: 3px; margin-bottom: 40px; text-transform: uppercase; }
        .tab-container { display: flex; gap: 8px; margin-bottom: 35px; }
        .tab { flex: 1; padding: 10px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15); color: rgba(255, 255, 255, 0.6); font-size: 13px; font-weight: 400; cursor: pointer; border-radius: 20px; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 1px; backdrop-filter: blur(10px); }
        .tab.active { background: rgba(255, 255, 255, 0.15); color: #ffffff; border-color: rgba(255, 255, 255, 0.3); }
        .form-content { display: none; }
        .form-content.active { display: block; }
        .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
        .input-group { margin-bottom: 20px; }
        .auth-container input { width: 100%; padding: 15px 20px; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.18); border-radius: 30px; color: #ffffff; font-size: 14px; outline: none; backdrop-filter: blur(10px); }
        .auth-container input::placeholder { color: rgba(255, 255, 255, 0.4); }
        .auth-container input:focus { border-color: rgba(255, 255, 255, 0.2); }
        .submit-btn { width: 100%; padding: 15px; background: #ffffff; border: none; border-radius: 30px; color: #1a0b2e; font-size: 13px; font-weight: 600; letter-spacing: 2px; cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; margin-top: 10px; }
        .submit-btn:hover { background: rgba(255, 255, 255, 0.9); }
        .divider { display: flex; align-items: center; margin: 30px 0; color: rgba(255, 255, 255, 0.4); font-size: 12px; }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: rgba(255, 255, 255, 0.1); }
        .divider span { padding: 0 15px; }
        .terms { text-align: center; margin-top: 25px; font-size: 11px; color: rgba(255, 255, 255, 0.4); line-height: 1.6; }
      `}} />

      <div className="account-page-body">
        <div className="auth-container">
            <div className="auth-logo">
                <Link href="/">
                  <img src="/LOGO BRO.png" alt="Logo" />
                </Link>
            </div>

            <div className="tab-container">
                <button className={`tab ${activeTab === 'signin' ? 'active' : ''}`} onClick={() => setActiveTab('signin')}>Sign In</button>
                <button className={`tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>Sign Up</button>
            </div>

            <div className={`form-content ${activeTab === 'signin' ? 'active' : ''}`}>
                <form onSubmit={handleSignIn}>
                    <div className="input-group">
                        <input type="email" placeholder="Email Address" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button className="submit-btn" type="submit">Sign In</button>
                </form>

                <div className="divider"><span>OR</span></div>
                
                <div id="g_id_onload"
                    data-client_id="141236445779-he08mhuqmas5jt6shcauj857qbh90c6l.apps.googleusercontent.com"
                    data-context="signin" data-ux_mode="popup" data-callback="handleCredentialResponse"
                    data-auto_prompt="false">
                </div>
                <div className="g_id_signin" data-type="standard" data-shape="pill" data-theme="outline"
                    data-text="continue_with" data-size="large" data-logo_alignment="left" data-width="370">
                </div>
            </div>

            <div className={`form-content ${activeTab === 'signup' ? 'active' : ''}`}>
                <form onSubmit={handleSignUp}>
                    <div className="input-row">
                        <input type="text" placeholder="First Name" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                        <input type="text" placeholder="Last Name" required value={lastName} onChange={e => setLastName(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <input type="email" placeholder="Email Address" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="input-row">
                        <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
                        <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                    <button className="submit-btn" type="submit">Create Account</button>
                </form>

                <div className="divider"><span>OR</span></div>
                <div className="g_id_signin" data-type="standard" data-shape="pill" data-theme="outline" data-text="signup_with"
                    data-size="large" data-logo_alignment="left" data-width="370">
                </div>

                <div className="terms">
                    By creating an account, you agree to our Terms & Privacy Policy.
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

Account.getLayout = function getLayout(page) {
  return page;
};
