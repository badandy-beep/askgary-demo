/* © 2025 Noetic Dharma Group, LLC | www.noeticdharma.com | CONFIDENTIAL & PROPRIETARY | Unauthorized use prohibited */
import { useState, useRef, useEffect } from 'react';

const COLORS = {
  primary: '#C41E3A',
  navy: '#0A1628',
  gold: '#D4AF37',
  white: '#FFFFFF',
  black: '#000000',
  green: '#28a745',
  red: '#dc3545'
};

const QUESTIONS = [
  { id: 1, question: "What is your full legal name?" },
  { id: 2, question: "Please spell your last name." },
  { id: 3, question: "What is your date of birth?" },
  { id: 4, question: "What is your current address?" },
  { id: 5, question: "When did this accident happen?" },
  { id: 6, question: "What time did it occur?" },
  { id: 7, question: "Where exactly did this happen?" },
  { id: 8, question: "What were the road and weather conditions?" },
  { id: 9, question: "In your own words, tell me what happened." },
  { id: 10, question: "Who do you believe was at fault and why?" },
  { id: 11, question: "Describe your vehicle - make, model, year, and color." },
  { id: 12, question: "Describe the other vehicle involved." },
  { id: 13, question: "Were there any passengers in your vehicle?" },
  { id: 14, question: "Did you get information about the other driver?" },
  { id: 15, question: "Were there any witnesses?" },
  { id: 16, question: "Did police respond? Do you have a report number?" },
  { id: 17, question: "Describe your injuries." },
  { id: 18, question: "What medical treatment have you received?" },
  { id: 19, question: "Is there anything else you'd like to add?" }
];

const generateCaseNumber = () => {
  const year = new Date().getFullYear().toString().slice(-2);
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `AG-${year}${month}-${random}`;
};

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const speechSupported = !!SpeechRecognition;

// ============================================================================
// INTRO SLIDE
// ============================================================================
const IntroSlide = ({ onNext }) => (
  <div style={{
    minHeight: '100dvh',
    background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.black} 100%)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px 20px',
    textAlign: 'center'
  }}>
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      borderRadius: '24px',
      padding: '30px 25px',
      maxWidth: '500px',
      width: '100%',
      border: '2px solid rgba(212, 175, 55, 0.3)'
    }}>
      <div style={{ fontSize: '14px', color: COLORS.gold, letterSpacing: '3px', marginBottom: '15px' }}>
        JOINT PROPOSAL
      </div>
      
      <img src="/logo.jpg" alt="1-800-ASK-GARY" style={{ height: '60px', maxWidth: '80%', objectFit: 'contain', marginBottom: '15px' }} />
      
      <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', margin: '15px 0' }}>
        in partnership with
      </div>
      
      <div style={{ color: COLORS.gold, fontSize: '22px', fontWeight: '700', letterSpacing: '2px' }}>
        NOETIC DHARMA GROUP™
      </div>
      
      <div style={{
        marginTop: '25px',
        padding: '18px',
        background: 'rgba(196, 30, 58, 0.2)',
        borderRadius: '12px'
      }}>
        <div style={{ color: COLORS.white, fontSize: '20px', fontWeight: '600' }}>
          Voice-First Case Intake Portal™
        </div>
      </div>
      
      <div style={{
        marginTop: '20px',
        padding: '10px',
        background: 'rgba(212, 175, 55, 0.15)',
        borderRadius: '8px',
        border: '1px dashed rgba(212, 175, 55, 0.5)'
      }}>
        <div style={{ color: COLORS.gold, fontSize: '12px' }}>
          ⚠️ DEMONSTRATION PURPOSES ONLY
        </div>
      </div>
    </div>
    
    <button
      onClick={onNext}
      style={{
        marginTop: '25px',
        padding: '18px 50px',
        fontSize: '18px',
        fontWeight: '600',
        background: COLORS.primary,
        color: COLORS.white,
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer'
      }}
    >
      BEGIN DEMO →
    </button>
  </div>
);

// ============================================================================
// HOW USERS ACCESS
// ============================================================================
const AccessSlide = ({ onNext, onBack }) => (
  <div style={{
    minHeight: '100dvh',
    background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.black} 100%)`,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px'
  }}>
    <h2 style={{ color: COLORS.gold, fontSize: '24px', textAlign: 'center', margin: '0 0 20px' }}>
      How Clients Access The Portal
    </h2>
    
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
      {[
        { icon: '🛣️', title: 'Billboard / Advertising', desc: '"Text GARY to 55555" or scan QR' },
        { icon: '📱', title: 'Call Center Texts Link', desc: 'Rep sends portal link after call' },
        { icon: '🌐', title: 'Website Portal', desc: 'Direct access from 1800askgary.com' },
        { icon: '📧', title: 'Email Link', desc: 'Follow-up email with secure link' }
      ].map((item, i) => (
        <div key={i} style={{
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <div style={{ fontSize: '40px' }}>{item.icon}</div>
          <div>
            <div style={{ color: COLORS.white, fontSize: '18px', fontWeight: '600' }}>{item.title}</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '5px' }}>{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
    
    <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
      <button onClick={onBack} style={{ flex: 1, padding: '18px', fontSize: '18px', background: 'rgba(255,255,255,0.2)', color: COLORS.white, border: 'none', borderRadius: '12px', cursor: 'pointer' }}>← BACK</button>
      <button onClick={onNext} style={{ flex: 1, padding: '18px', fontSize: '18px', background: COLORS.primary, color: COLORS.white, border: 'none', borderRadius: '12px', cursor: 'pointer' }}>NEXT →</button>
    </div>
  </div>
);

// ============================================================================
// REGISTRATION
// ============================================================================
const RegistrationSlide = ({ onNext, onBack, userData, setUserData }) => {
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};
    if (!userData.firstName?.trim()) newErrors.firstName = true;
    if (!userData.lastName?.trim()) newErrors.lastName = true;
    if (!userData.email?.trim()) newErrors.email = true;
    if (!userData.phone?.trim()) newErrors.phone = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '18px',
    fontSize: '18px',
    background: 'rgba(255,255,255,0.1)',
    border: hasError ? '2px solid #dc3545' : '2px solid rgba(255,255,255,0.2)',
    borderRadius: '12px',
    color: COLORS.white,
    outline: 'none',
    marginTop: '8px'
  });
  
  return (
    <div style={{
      minHeight: '100dvh',
      background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.black} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <img src="/logo.jpg" alt="1-800-ASK-GARY" style={{ height: '50px', marginBottom: '10px' }} />
        <h2 style={{ color: COLORS.white, fontSize: '24px', margin: 0 }}>Start Your Case</h2>
      </div>
      
      <div style={{ flex: 1, maxWidth: '450px', margin: '0 auto', width: '100%' }}>
        {[
          { label: 'First Name', key: 'firstName', type: 'text', placeholder: 'John' },
          { label: 'Last Name', key: 'lastName', type: 'text', placeholder: 'Smith' },
          { label: 'Email', key: 'email', type: 'email', placeholder: 'john@email.com' },
          { label: 'Mobile Phone', key: 'phone', type: 'tel', placeholder: '(555) 555-5555' }
        ].map((field) => (
          <div key={field.key} style={{ marginBottom: '20px' }}>
            <label style={{ color: COLORS.gold, fontSize: '16px', fontWeight: '600' }}>{field.label} *</label>
            <input
              type={field.type}
              value={userData[field.key] || ''}
              onChange={(e) => setUserData({...userData, [field.key]: e.target.value})}
              style={inputStyle(errors[field.key])}
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '15px', marginTop: '20px', maxWidth: '450px', margin: '20px auto 0', width: '100%' }}>
        <button onClick={onBack} style={{ flex: 1, padding: '18px', fontSize: '18px', background: 'rgba(255,255,255,0.2)', color: COLORS.white, border: 'none', borderRadius: '12px', cursor: 'pointer' }}>← BACK</button>
        <button onClick={() => validate() && onNext()} style={{ flex: 2, padding: '18px', fontSize: '20px', fontWeight: '600', background: COLORS.green, color: COLORS.white, border: 'none', borderRadius: '12px', cursor: 'pointer' }}>SUBMIT →</button>
      </div>
    </div>
  );
};

// ============================================================================
// VERIFICATION CODE
// ============================================================================
const VerificationSlide = ({ onNext, onBack, userData }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  
  const handleSubmit = () => {
    if (code === '12345') {
      onNext();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };
  
  return (
    <div style={{
      minHeight: '100dvh',
      background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.black} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px 20px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '70px', marginBottom: '20px' }}>📱</div>
      
      <h2 style={{ color: COLORS.white, fontSize: '26px', margin: '0 0 15px' }}>
        Verify Your Phone
      </h2>
      
      {!sent ? (
        <>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '30px' }}>
            We'll send a code to {userData.phone}
          </p>
          <button
            onClick={() => setSent(true)}
            style={{
              padding: '20px 60px',
              fontSize: '20px',
              fontWeight: '600',
              background: COLORS.green,
              color: COLORS.white,
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer'
            }}
          >
            📤 SEND CODE
          </button>
        </>
      ) : (
        <div style={{ maxWidth: '350px', width: '100%' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '25px' }}>
            Enter the code sent to {userData.phone}
          </p>
          
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
            placeholder="_ _ _ _ _"
            style={{
              width: '100%',
              padding: '22px',
              fontSize: '36px',
              textAlign: 'center',
              letterSpacing: '15px',
              background: 'rgba(255,255,255,0.1)',
              border: error ? '3px solid #dc3545' : '3px solid rgba(255,255,255,0.3)',
              borderRadius: '16px',
              color: COLORS.white,
              outline: 'none'
            }}
          />
          
          {error && <div style={{ color: '#dc3545', fontSize: '16px', marginTop: '15px' }}>Wrong code. Try again.</div>}
          
          <button
            onClick={handleSubmit}
            disabled={code.length !== 5}
            style={{
              width: '100%',
              marginTop: '25px',
              padding: '20px',
              fontSize: '20px',
              fontWeight: '600',
              background: code.length === 5 ? COLORS.primary : 'rgba(255,255,255,0.2)',
              color: COLORS.white,
              border: 'none',
              borderRadius: '12px',
              cursor: code.length === 5 ? 'pointer' : 'not-allowed'
            }}
          >
            VERIFY →
          </button>
        </div>
      )}
      
      <button onClick={onBack} style={{ marginTop: '30px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '16px', cursor: 'pointer' }}>
        ← Back
      </button>
      
      <div style={{
        position: 'fixed',
        bottom: '20px',
        background: 'rgba(212, 175, 55, 0.2)',
        padding: '12px 25px',
        borderRadius: '10px',
        border: '1px dashed rgba(212, 175, 55, 0.5)'
      }}>
        <span style={{ color: COLORS.gold, fontSize: '14px' }}>🔑 DEMO CODE: <strong>12345</strong></span>
      </div>
    </div>
  );
};

// ============================================================================
// CASE CREATED
// ============================================================================
const CaseCreatedSlide = ({ onNext, userData, caseNumber }) => (
  <div style={{
    minHeight: '100dvh',
    background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.black} 100%)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px 20px',
    textAlign: 'center'
  }}>
    <div style={{ fontSize: '80px', marginBottom: '20px' }}>✅</div>
    
    <h1 style={{ color: COLORS.white, fontSize: '32px', margin: '0 0 15px' }}>
      Welcome, {userData.firstName}!
    </h1>
    
    <div style={{
      marginTop: '20px',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '20px',
      padding: '30px 50px',
      border: '3px solid rgba(212, 175, 55, 0.5)'
    }}>
      <div style={{ color: COLORS.gold, fontSize: '14px', letterSpacing: '2px', marginBottom: '10px' }}>
        YOUR CASE NUMBER
      </div>
      <div style={{ color: COLORS.white, fontSize: '36px', fontWeight: '700', letterSpacing: '3px' }}>
        {caseNumber}
      </div>
    </div>
    
    <div style={{
      marginTop: '30px',
      padding: '20px',
      background: 'rgba(40, 167, 69, 0.2)',
      borderRadius: '12px',
      maxWidth: '350px'
    }}>
      <div style={{ color: COLORS.white, fontSize: '16px' }}>
        📸 <strong>Screenshot this!</strong><br />
        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
          We'll also text and email it to you.
        </span>
      </div>
    </div>
    
    <button
      onClick={onNext}
      style={{
        marginTop: '40px',
        padding: '22px 60px',
        fontSize: '22px',
        fontWeight: '600',
        background: COLORS.primary,
        color: COLORS.white,
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer'
      }}
    >
      BEGIN INTAKE →
    </button>
  </div>
);

// ============================================================================
// HOW VOICE RECORDING WORKS - Instructions
// ============================================================================
const InstructionsSlide = ({ onNext, onBack }) => (
  <div style={{
    minHeight: '100dvh',
    background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.black} 100%)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px 20px',
    textAlign: 'center'
  }}>
    <h1 style={{ color: COLORS.white, fontSize: '28px', margin: '0 0 30px' }}>
      How This Works
    </h1>
    
    <div style={{ maxWidth: '400px', width: '100%' }}>
      {/* Step 1 */}
      <div style={{
        background: 'rgba(40, 167, 69, 0.2)',
        borderRadius: '20px',
        padding: '25px',
        marginBottom: '20px',
        border: '2px solid rgba(40, 167, 69, 0.5)'
      }}>
        <div style={{ fontSize: '60px', marginBottom: '10px' }}>🟢</div>
        <div style={{ color: COLORS.white, fontSize: '22px', fontWeight: '600' }}>
          Tap GREEN to START
        </div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginTop: '8px' }}>
          Then speak your answer out loud
        </div>
      </div>
      
      {/* Step 2 */}
      <div style={{
        background: 'rgba(220, 53, 69, 0.2)',
        borderRadius: '20px',
        padding: '25px',
        marginBottom: '20px',
        border: '2px solid rgba(220, 53, 69, 0.5)'
      }}>
        <div style={{ fontSize: '60px', marginBottom: '10px' }}>🔴</div>
        <div style={{ color: COLORS.white, fontSize: '22px', fontWeight: '600' }}>
          Tap RED to STOP
        </div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginTop: '8px' }}>
          When you're done speaking
        </div>
      </div>
      
      {/* Step 3 */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '20px',
        padding: '25px',
        border: '2px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{ fontSize: '60px', marginBottom: '10px' }}>👀</div>
        <div style={{ color: COLORS.white, fontSize: '22px', fontWeight: '600' }}>
          Review Your Answer
        </div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginTop: '8px' }}>
          You can re-record if needed
        </div>
      </div>
    </div>
    
    <div style={{
      marginTop: '30px',
      padding: '15px 25px',
      background: 'rgba(212, 175, 55, 0.15)',
      borderRadius: '12px'
    }}>
      <div style={{ color: COLORS.gold, fontSize: '16px' }}>
        🎙️ Uses your phone's microphone
      </div>
    </div>
    
    <div style={{ display: 'flex', gap: '15px', marginTop: '30px', width: '100%', maxWidth: '400px' }}>
      <button onClick={onBack} style={{ flex: 1, padding: '18px', fontSize: '18px', background: 'rgba(255,255,255,0.2)', color: COLORS.white, border: 'none', borderRadius: '12px', cursor: 'pointer' }}>← BACK</button>
      <button onClick={onNext} style={{ flex: 2, padding: '18px', fontSize: '20px', fontWeight: '600', background: COLORS.green, color: COLORS.white, border: 'none', borderRadius: '12px', cursor: 'pointer' }}>GOT IT! →</button>
    </div>
  </div>
);

// ============================================================================
// VOICE QUESTION - State Machine: ready → recording → review
// ============================================================================
const VoiceQuestionSlide = ({ question, questionNumber, totalQuestions, onNext, onBack, answers, setAnswers }) => {
  const [phase, setPhase] = useState('ready'); // ready, recording, review
  const [transcript, setTranscript] = useState('');
  const [interimText, setInterimText] = useState('');
  const recognitionRef = useRef(null);
  
  // Reset when question changes
  useEffect(() => {
    const savedAnswer = answers[questionNumber];
    if (savedAnswer) {
      setTranscript(savedAnswer);
      setPhase('review');
    } else {
      setTranscript('');
      setPhase('ready');
    }
    setInterimText('');
    
    // Cleanup recognition on question change
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
    };
  }, [questionNumber]);
  
  const startRecording = () => {
    if (!speechSupported) {
      setPhase('review');
      return;
    }
    
    setTranscript('');
    setInterimText('');
    setPhase('recording');
    
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';
    
    recognitionRef.current.onresult = (event) => {
      let final = '';
      let interim = '';
      
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript + ' ';
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      
      setTranscript(final.trim());
      setInterimText(interim);
    };
    
    recognitionRef.current.onerror = (event) => {
      console.error('Speech error:', event.error);
    };
    
    try {
      recognitionRef.current.start();
    } catch(e) {
      console.error('Could not start:', e);
      setPhase('review');
    }
  };
  
  const stopRecording = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e) {}
    }
    const finalText = (transcript + ' ' + interimText).trim();
    setTranscript(finalText);
    setInterimText('');
    setPhase('review');
  };
  
  const handleReRecord = () => {
    setTranscript('');
    setInterimText('');
    setPhase('ready');
  };
  
  const handleNext = () => {
    setAnswers(prev => ({...prev, [questionNumber]: transcript}));
    onNext();
  };
  
  const handleBack = () => {
    if (transcript) {
      setAnswers(prev => ({...prev, [questionNumber]: transcript}));
    }
    onBack();
  };
  
  // ========== READY STATE ==========
  if (phase === 'ready') {
    return (
      <div style={{
        minHeight: '100dvh',
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.black} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <img src="/logo.jpg" alt="" style={{ height: '35px' }} />
          <div style={{ color: COLORS.gold, fontSize: '16px', fontWeight: '600' }}>
            {questionNumber} of {totalQuestions}
          </div>
        </div>
        
        {/* Progress */}
        <div style={{ height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', marginBottom: '25px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(questionNumber / totalQuestions) * 100}%`, background: COLORS.gold, borderRadius: '4px' }} />
        </div>
        
        {/* Question */}
        <div style={{
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '20px',
          padding: '30px 25px',
          marginBottom: '30px'
        }}>
          <div style={{ color: COLORS.gold, fontSize: '14px', letterSpacing: '2px', marginBottom: '12px' }}>
            QUESTION {questionNumber}
          </div>
          <h2 style={{ color: COLORS.white, fontSize: '26px', fontWeight: '600', margin: 0, lineHeight: '1.4' }}>
            {question.question}
          </h2>
        </div>
        
        {/* Big Green START Button */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <button
            onClick={startRecording}
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: 'none',
              background: `linear-gradient(135deg, ${COLORS.green} 0%, #1a8a3a 100%)`,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 60px rgba(40, 167, 69, 0.4)'
            }}
          >
            <span style={{ fontSize: '70px' }}>🎙️</span>
            <span style={{ color: COLORS.white, fontSize: '22px', fontWeight: '700', marginTop: '10px' }}>
              START
            </span>
          </button>
          
          <div style={{ marginTop: '25px', color: 'rgba(255,255,255,0.6)', fontSize: '18px' }}>
            Tap to begin recording
          </div>
        </div>
        
        {/* Back button */}
        <button onClick={handleBack} style={{
          marginTop: '20px',
          padding: '16px',
          fontSize: '18px',
          background: 'rgba(255,255,255,0.15)',
          color: COLORS.white,
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer'
        }}>
          ← BACK
        </button>
      </div>
    );
  }
  
  // ========== RECORDING STATE ==========
  if (phase === 'recording') {
    return (
      <div style={{
        minHeight: '100dvh',
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.black} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <img src="/logo.jpg" alt="" style={{ height: '35px' }} />
          <div style={{ color: COLORS.red, fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              width: '12px', 
              height: '12px', 
              background: COLORS.red, 
              borderRadius: '50%',
              animation: 'pulse 1s infinite'
            }} />
            RECORDING
          </div>
        </div>
        
        {/* Question - smaller */}
        <div style={{
          background: 'rgba(220, 53, 69, 0.15)',
          borderRadius: '12px',
          padding: '15px 20px',
          marginBottom: '20px',
          border: '1px solid rgba(220, 53, 69, 0.3)'
        }}>
          <div style={{ color: COLORS.white, fontSize: '18px', margin: 0 }}>
            {question.question}
          </div>
        </div>
        
        {/* Live transcript */}
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px',
          overflow: 'auto'
        }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '10px' }}>
            What we're hearing...
          </div>
          <div style={{ color: COLORS.white, fontSize: '20px', lineHeight: '1.6' }}>
            {transcript} <span style={{ color: 'rgba(255,255,255,0.5)' }}>{interimText}</span>
            {!transcript && !interimText && <span style={{ color: 'rgba(255,255,255,0.4)' }}>Speak now...</span>}
          </div>
        </div>
        
        {/* Big Red STOP Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <button
            onClick={stopRecording}
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              border: 'none',
              background: `linear-gradient(135deg, ${COLORS.red} 0%, #a00 100%)`,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 60px rgba(220, 53, 69, 0.5)'
            }}
          >
            <span style={{ fontSize: '60px' }}>⏹️</span>
            <span style={{ color: COLORS.white, fontSize: '22px', fontWeight: '700', marginTop: '10px' }}>
              STOP
            </span>
          </button>
        </div>
        
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
          Tap when you're done speaking
        </div>
        
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}</style>
      </div>
    );
  }
  
  // ========== REVIEW STATE ==========
  return (
    <div style={{
      minHeight: '100dvh',
      background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.black} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <img src="/logo.jpg" alt="" style={{ height: '35px' }} />
        <div style={{ color: COLORS.gold, fontSize: '16px', fontWeight: '600' }}>
          {questionNumber} of {totalQuestions}
        </div>
      </div>
      
      {/* Progress */}
      <div style={{ height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', marginBottom: '20px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(questionNumber / totalQuestions) * 100}%`, background: COLORS.gold, borderRadius: '4px' }} />
      </div>
      
      {/* Question - smaller */}
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '15px 20px',
        marginBottom: '20px'
      }}>
        <div style={{ color: COLORS.white, fontSize: '16px' }}>
          Q{questionNumber}: {question.question}
        </div>
      </div>
      
      {/* Your Answer */}
      <div style={{ color: COLORS.gold, fontSize: '16px', marginBottom: '10px', fontWeight: '600' }}>
        ✓ YOUR ANSWER:
      </div>
      
      <div style={{
        flex: 1,
        background: COLORS.white,
        borderRadius: '16px',
        padding: '25px',
        marginBottom: '20px',
        overflow: 'auto'
      }}>
        {speechSupported ? (
          <p style={{ color: COLORS.navy, fontSize: '20px', lineHeight: '1.6', margin: 0 }}>
            "{transcript || '(No answer recorded)'}"
          </p>
        ) : (
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Type your answer here..."
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '20px',
              lineHeight: '1.6',
              resize: 'none',
              color: COLORS.navy
            }}
          />
        )}
      </div>
      
      {/* Buttons */}
      <div style={{ display: 'flex', gap: '15px' }}>
        <button
          onClick={handleReRecord}
          style={{
            flex: 1,
            padding: '20px',
            fontSize: '18px',
            fontWeight: '600',
            background: 'rgba(255,255,255,0.15)',
            color: COLORS.white,
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          🔄 RE-RECORD
        </button>
        
        <button
          onClick={handleNext}
          disabled={!transcript}
          style={{
            flex: 2,
            padding: '20px',
            fontSize: '20px',
            fontWeight: '700',
            background: transcript ? COLORS.green : 'rgba(255,255,255,0.2)',
            color: COLORS.white,
            border: 'none',
            borderRadius: '14px',
            cursor: transcript ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          {questionNumber === totalQuestions ? '✓ FINISH' : '✓ NEXT'}
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// COMPLETION
// ============================================================================
const CompletionSlide = ({ onNext, userData, caseNumber }) => (
  <div style={{
    minHeight: '100dvh',
    background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.black} 100%)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px 20px',
    textAlign: 'center'
  }}>
    <div style={{
      background: 'linear-gradient(135deg, #1a5a1a 0%, #0d3d0d 100%)',
      borderRadius: '24px',
      padding: '40px 30px',
      maxWidth: '450px',
      width: '100%'
    }}>
      <div style={{ fontSize: '70px', marginBottom: '15px' }}>🎉</div>
      
      <h1 style={{ color: COLORS.white, fontSize: '30px', margin: '0 0 15px' }}>
        Phase 1 Complete!
      </h1>
      
      <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '25px' }}>
        Your voice intake has been submitted.
      </p>
      
      <div style={{
        background: 'rgba(255,255,255,0.15)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '25px'
      }}>
        <div style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '2px', marginBottom: '8px' }}>
          CASE NUMBER
        </div>
        <div style={{ color: COLORS.white, fontSize: '26px', fontWeight: '700' }}>
          {caseNumber}
        </div>
      </div>
      
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            width: '55px',
            height: '55px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px'
          }}>
            👤
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ color: COLORS.gold, fontSize: '12px' }}>YOUR CASE MANAGER</div>
            <div style={{ color: COLORS.white, fontSize: '20px', fontWeight: '600' }}>Sarah Johnson</div>
          </div>
        </div>
      </div>
    </div>
    
    <div style={{ marginTop: '25px', color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>
      📱 Confirmation sent to {userData.phone}
    </div>
    
    <button
      onClick={onNext}
      style={{
        marginTop: '30px',
        padding: '20px 50px',
        fontSize: '20px',
        fontWeight: '600',
        background: COLORS.primary,
        color: COLORS.white,
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer'
      }}
    >
      CONTINUE →
    </button>
  </div>
);

// ============================================================================
// FAMILY ACCESS
// ============================================================================
const FamilyAccessSlide = ({ onNext, onSkip }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  return (
    <div style={{
      minHeight: '100dvh',
      background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.black} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      padding: '30px 20px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '60px', marginBottom: '15px' }}>👨‍👩‍👧</div>
      
      <h2 style={{ color: COLORS.white, fontSize: '26px', margin: '0 0 10px' }}>
        Add Family Access?
      </h2>
      
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '30px' }}>
        They can receive updates about your case
      </p>
      
      <div style={{ flex: 1, maxWidth: '400px', margin: '0 auto', width: '100%' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Family member's name"
          style={{
            width: '100%',
            padding: '20px',
            fontSize: '18px',
            background: 'rgba(255,255,255,0.1)',
            border: '2px solid rgba(255,255,255,0.2)',
            borderRadius: '12px',
            color: COLORS.white,
            marginBottom: '15px',
            textAlign: 'center'
          }}
        />
        
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Their phone number"
          style={{
            width: '100%',
            padding: '20px',
            fontSize: '18px',
            background: 'rgba(255,255,255,0.1)',
            border: '2px solid rgba(255,255,255,0.2)',
            borderRadius: '12px',
            color: COLORS.white,
            textAlign: 'center'
          }}
        />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '30px', maxWidth: '400px', margin: '30px auto 0', width: '100%' }}>
        <button
          onClick={onNext}
          disabled={!name || !phone}
          style={{
            padding: '20px',
            fontSize: '20px',
            fontWeight: '600',
            background: (name && phone) ? COLORS.green : 'rgba(255,255,255,0.2)',
            color: COLORS.white,
            border: 'none',
            borderRadius: '12px',
            cursor: (name && phone) ? 'pointer' : 'not-allowed'
          }}
        >
          ADD FAMILY MEMBER
        </button>
        <button
          onClick={onSkip}
          style={{
            padding: '18px',
            fontSize: '18px',
            background: 'transparent',
            color: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '12px',
            cursor: 'pointer'
          }}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// FINAL SCREEN
// ============================================================================
const FinalSlide = ({ caseNumber, userData }) => (
  <div style={{
    minHeight: '100dvh',
    background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.black} 100%)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px 20px',
    textAlign: 'center'
  }}>
    <img src="/logo.jpg" alt="1-800-ASK-GARY" style={{ height: '80px', marginBottom: '25px' }} />
    
    <div style={{ fontSize: '70px', marginBottom: '20px' }}>✅</div>
    
    <h1 style={{ color: COLORS.white, fontSize: '32px', margin: '0 0 15px' }}>
      Thank You, {userData.firstName}!
    </h1>
    
    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', maxWidth: '350px', lineHeight: '1.5' }}>
      Your case manager will contact you within 24 hours.
    </p>
    
    <div style={{
      marginTop: '30px',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '16px',
      padding: '25px 45px',
      border: '2px solid rgba(212, 175, 55, 0.4)'
    }}>
      <div style={{ color: COLORS.gold, fontSize: '14px', letterSpacing: '2px', marginBottom: '8px' }}>
        CASE NUMBER
      </div>
      <div style={{ color: COLORS.white, fontSize: '32px', fontWeight: '700' }}>
        {caseNumber}
      </div>
    </div>
    
    <div style={{
      marginTop: '30px',
      padding: '20px',
      background: 'rgba(40, 167, 69, 0.2)',
      borderRadius: '12px',
      maxWidth: '320px'
    }}>
      <div style={{ color: COLORS.white, fontSize: '15px' }}>
        Sign in anytime at<br />
        <strong style={{ color: COLORS.gold, fontSize: '17px' }}>my1800askgarycase.com</strong>
      </div>
    </div>
    
    <div style={{ marginTop: '50px', color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
      <span style={{ color: COLORS.gold }}>NOETIC DHARMA GROUP™</span><br />
      Private Equity & Merchant Banking
    </div>
  </div>
);

// ============================================================================
// MAIN APP
// ============================================================================
export default function App() {
  const [step, setStep] = useState('intro');
  const [userData, setUserData] = useState({});
  const [caseNumber, setCaseNumber] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  
  const handleVerified = () => {
    setCaseNumber(generateCaseNumber());
    setStep('caseCreated');
  };
  
  const handleQuestionNext = () => {
    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setStep('completion');
    }
  };
  
  const handleQuestionBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else {
      setStep('instructions');
    }
  };
  
  switch (step) {
    case 'intro':
      return <IntroSlide onNext={() => setStep('access')} />;
    case 'access':
      return <AccessSlide onNext={() => setStep('registration')} onBack={() => setStep('intro')} />;
    case 'registration':
      return <RegistrationSlide onNext={() => setStep('verification')} onBack={() => setStep('access')} userData={userData} setUserData={setUserData} />;
    case 'verification':
      return <VerificationSlide onNext={handleVerified} onBack={() => setStep('registration')} userData={userData} />;
    case 'caseCreated':
      return <CaseCreatedSlide onNext={() => setStep('instructions')} userData={userData} caseNumber={caseNumber} />;
    case 'instructions':
      return <InstructionsSlide onNext={() => setStep('questions')} onBack={() => setStep('caseCreated')} />;
    case 'questions':
      return (
        <VoiceQuestionSlide
          question={QUESTIONS[questionIndex]}
          questionNumber={questionIndex + 1}
          totalQuestions={QUESTIONS.length}
          onNext={handleQuestionNext}
          onBack={handleQuestionBack}
          answers={answers}
          setAnswers={setAnswers}
        />
      );
    case 'completion':
      return <CompletionSlide onNext={() => setStep('family')} userData={userData} caseNumber={caseNumber} />;
    case 'family':
      return <FamilyAccessSlide onNext={() => setStep('final')} onSkip={() => setStep('final')} />;
    case 'final':
      return <FinalSlide caseNumber={caseNumber} userData={userData} />;
    default:
      return <IntroSlide onNext={() => setStep('access')} />;
  }
}
