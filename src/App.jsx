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
  { id: 1, question: "What is your full legal name?", field: "fullName" },
  { id: 2, question: "Please spell your last name.", field: "lastNameSpelling" },
  { id: 3, question: "What is your date of birth?", field: "dob" },
  { id: 4, question: "What is your current address?", field: "address" },
  { id: 5, question: "When did this accident happen?", field: "accidentDate" },
  { id: 6, question: "What time did it occur?", field: "accidentTime" },
  { id: 7, question: "Where exactly did this happen? Please provide the intersection or address.", field: "accidentLocation" },
  { id: 8, question: "What were the road and weather conditions?", field: "conditions" },
  { id: 9, question: "In your own words, tell me what happened.", field: "description" },
  { id: 10, question: "Who do you believe was at fault and why?", field: "fault" },
  { id: 11, question: "Describe your vehicle - make, model, year, and color.", field: "yourVehicle" },
  { id: 12, question: "Describe the other vehicle involved.", field: "otherVehicle" },
  { id: 13, question: "Were there any passengers in your vehicle?", field: "passengers" },
  { id: 14, question: "Did you get any information about the other driver?", field: "otherDriver" },
  { id: 15, question: "Were there any witnesses? If so, did you get their information?", field: "witnesses" },
  { id: 16, question: "Did police respond to the scene? Do you have a report number?", field: "policeReport" },
  { id: 17, question: "Describe your injuries.", field: "injuries" },
  { id: 18, question: "What medical treatment have you received so far?", field: "medicalTreatment" },
  { id: 19, question: "Is there anything else you'd like to add about this accident?", field: "additionalInfo" }
];

// Generate case number
const generateCaseNumber = () => {
  const prefix = 'AG';
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${year}${month}-${random}`;
};

// Check if browser supports speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const speechSupported = !!SpeechRecognition;

// ============================================================================
// INTRO SLIDE - Joint Proposal
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
      padding: 'clamp(30px, 5vw, 50px)',
      maxWidth: '600px',
      width: '100%',
      border: '2px solid rgba(212, 175, 55, 0.3)'
    }}>
      <div style={{ fontSize: 'clamp(14px, 3vw, 18px)', color: COLORS.gold, letterSpacing: '3px', marginBottom: '20px' }}>
        JOINT PROPOSAL
      </div>
      
      <img src="/logo.jpg" alt="1-800-ASK-GARY" style={{ height: 'clamp(60px, 12vw, 100px)', marginBottom: '15px' }} />
      
      <div style={{ fontSize: 'clamp(16px, 3vw, 22px)', color: 'rgba(255,255,255,0.7)', margin: '20px 0' }}>
        in partnership with
      </div>
      
      <div style={{ color: COLORS.gold, fontSize: 'clamp(20px, 4vw, 32px)', fontWeight: '700', letterSpacing: '2px' }}>
        NOETIC DHARMA GROUP™
      </div>
      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(12px, 2vw, 16px)', marginTop: '8px' }}>
        Private Equity & Merchant Banking
      </div>
      
      <div style={{
        marginTop: '40px',
        padding: '20px',
        background: 'rgba(196, 30, 58, 0.2)',
        borderRadius: '12px',
        border: '1px solid rgba(196, 30, 58, 0.4)'
      }}>
        <div style={{ color: COLORS.white, fontSize: 'clamp(18px, 3.5vw, 26px)', fontWeight: '600', marginBottom: '10px' }}>
          Voice-First Case Intake Portal™
        </div>
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(13px, 2.5vw, 16px)' }}>
          Revolutionary AI-Powered Accident Onboarding
        </div>
      </div>
      
      <div style={{
        marginTop: '30px',
        padding: '15px',
        background: 'rgba(212, 175, 55, 0.15)',
        borderRadius: '10px',
        border: '1px dashed rgba(212, 175, 55, 0.5)'
      }}>
        <div style={{ color: COLORS.gold, fontSize: 'clamp(12px, 2vw, 14px)', fontWeight: '600' }}>
          ⚠️ DEMONSTRATION PURPOSES ONLY
        </div>
      </div>
    </div>
    
    <button
      onClick={onNext}
      style={{
        marginTop: '30px',
        padding: '18px 50px',
        fontSize: 'clamp(16px, 3vw, 20px)',
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
// HOW USERS ACCESS - Billboard, Text, Email, Website
// ============================================================================
const AccessSlide = ({ onNext, onBack }) => (
  <div style={{
    minHeight: '100dvh',
    background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.black} 100%)`,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px'
  }}>
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h2 style={{ color: COLORS.gold, fontSize: 'clamp(20px, 4vw, 32px)', margin: 0 }}>
        How Clients Access The Portal
      </h2>
    </div>
    
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
      {/* Billboard */}
      <div style={{
        background: 'linear-gradient(135deg, #1a3a5c 0%, #0d2137 100%)',
        borderRadius: '16px',
        padding: '20px',
        border: '2px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ fontSize: '40px' }}>🛣️</div>
          <div>
            <div style={{ color: COLORS.white, fontSize: '18px', fontWeight: '600' }}>Billboard / Advertising</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '5px' }}>
              "Injured? Text GARY to 55555" or scan QR code
            </div>
          </div>
        </div>
        <div style={{
          marginTop: '15px',
          background: COLORS.primary,
          borderRadius: '8px',
          padding: '15px',
          textAlign: 'center'
        }}>
          <div style={{ color: COLORS.white, fontSize: '22px', fontWeight: '700' }}>1-800-ASK-GARY</div>
          <div style={{ color: COLORS.gold, fontSize: '14px', marginTop: '5px' }}>Start Your Case Online Now!</div>
        </div>
      </div>
      
      {/* Call Center Text */}
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      }}>
        <div style={{ fontSize: '40px' }}>📱</div>
        <div>
          <div style={{ color: COLORS.white, fontSize: '18px', fontWeight: '600' }}>Call Center Sends Text</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '5px' }}>
            After calling, rep texts link to complete intake
          </div>
        </div>
      </div>
      
      {/* Website */}
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      }}>
        <div style={{ fontSize: '40px' }}>🌐</div>
        <div>
          <div style={{ color: COLORS.white, fontSize: '18px', fontWeight: '600' }}>Website Portal</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '5px' }}>
            Accessed directly from 1800askgary.com
          </div>
        </div>
      </div>
      
      {/* Email */}
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      }}>
        <div style={{ fontSize: '40px' }}>📧</div>
        <div>
          <div style={{ color: COLORS.white, fontSize: '18px', fontWeight: '600' }}>Email Link</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '5px' }}>
            Follow-up email with secure portal link
          </div>
        </div>
      </div>
    </div>
    
    <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
      <button onClick={onBack} style={{ flex: 1, padding: '15px', fontSize: '16px', background: 'rgba(255,255,255,0.2)', color: COLORS.white, border: 'none', borderRadius: '10px', cursor: 'pointer' }}>← BACK</button>
      <button onClick={onNext} style={{ flex: 1, padding: '15px', fontSize: '16px', background: COLORS.primary, color: COLORS.white, border: 'none', borderRadius: '10px', cursor: 'pointer' }}>NEXT →</button>
    </div>
  </div>
);

// ============================================================================
// REGISTRATION FORM
// ============================================================================
const RegistrationSlide = ({ onNext, onBack, userData, setUserData }) => {
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};
    if (!userData.firstName?.trim()) newErrors.firstName = 'Required';
    if (!userData.lastName?.trim()) newErrors.lastName = 'Required';
    if (!userData.email?.trim()) newErrors.email = 'Required';
    if (!userData.phone?.trim()) newErrors.phone = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validate()) {
      onNext();
    }
  };
  
  const inputStyle = {
    width: '100%',
    padding: '16px',
    fontSize: '18px',
    background: 'rgba(255,255,255,0.1)',
    border: '2px solid rgba(255,255,255,0.2)',
    borderRadius: '10px',
    color: COLORS.white,
    outline: 'none',
    marginTop: '8px'
  };
  
  return (
    <div style={{
      minHeight: '100dvh',
      background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.black} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src="/logo.jpg" alt="1-800-ASK-GARY" style={{ height: '50px', marginBottom: '10px' }} />
        <h2 style={{ color: COLORS.white, fontSize: 'clamp(20px, 4vw, 28px)', margin: 0 }}>
          Start Your Case
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '8px' }}>
          Please enter your information to begin
        </p>
      </div>
      
      <div style={{ flex: 1, maxWidth: '450px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: COLORS.gold, fontSize: '14px', fontWeight: '600' }}>First Name *</label>
          <input
            type="text"
            value={userData.firstName || ''}
            onChange={(e) => setUserData({...userData, firstName: e.target.value})}
            style={{...inputStyle, borderColor: errors.firstName ? COLORS.red : 'rgba(255,255,255,0.2)'}}
            placeholder="Enter your first name"
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: COLORS.gold, fontSize: '14px', fontWeight: '600' }}>Last Name *</label>
          <input
            type="text"
            value={userData.lastName || ''}
            onChange={(e) => setUserData({...userData, lastName: e.target.value})}
            style={{...inputStyle, borderColor: errors.lastName ? COLORS.red : 'rgba(255,255,255,0.2)'}}
            placeholder="Enter your last name"
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: COLORS.gold, fontSize: '14px', fontWeight: '600' }}>Email Address *</label>
          <input
            type="email"
            value={userData.email || ''}
            onChange={(e) => setUserData({...userData, email: e.target.value})}
            style={{...inputStyle, borderColor: errors.email ? COLORS.red : 'rgba(255,255,255,0.2)'}}
            placeholder="your@email.com"
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: COLORS.gold, fontSize: '14px', fontWeight: '600' }}>Mobile Phone *</label>
          <input
            type="tel"
            value={userData.phone || ''}
            onChange={(e) => setUserData({...userData, phone: e.target.value})}
            style={{...inputStyle, borderColor: errors.phone ? COLORS.red : 'rgba(255,255,255,0.2)'}}
            placeholder="(555) 555-5555"
          />
        </div>
        
        {Object.keys(errors).length > 0 && (
          <div style={{ color: COLORS.red, fontSize: '14px', marginBottom: '15px', textAlign: 'center' }}>
            Please fill in all required fields
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', gap: '15px', marginTop: '20px', maxWidth: '450px', margin: '20px auto 0', width: '100%' }}>
        <button onClick={onBack} style={{ flex: 1, padding: '16px', fontSize: '16px', background: 'rgba(255,255,255,0.2)', color: COLORS.white, border: 'none', borderRadius: '10px', cursor: 'pointer' }}>← BACK</button>
        <button onClick={handleSubmit} style={{ flex: 2, padding: '16px', fontSize: '18px', fontWeight: '600', background: COLORS.green, color: COLORS.white, border: 'none', borderRadius: '10px', cursor: 'pointer' }}>SUBMIT →</button>
      </div>
    </div>
  );
};

// ============================================================================
// VERIFICATION CODE - Enter code "texted" to phone
// ============================================================================
const VerificationSlide = ({ onNext, onBack, userData }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  
  const VALID_CODE = '12345';
  
  const handleSubmit = () => {
    if (code === VALID_CODE) {
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
      <div style={{ fontSize: '60px', marginBottom: '20px' }}>📱</div>
      
      <h2 style={{ color: COLORS.white, fontSize: 'clamp(22px, 4vw, 30px)', margin: '0 0 10px' }}>
        Verify Your Phone
      </h2>
      
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '30px', maxWidth: '350px' }}>
        {sent 
          ? `We sent a verification code to ${userData.phone}`
          : `We'll send a code to ${userData.phone}`
        }
      </p>
      
      {!sent ? (
        <button
          onClick={() => setSent(true)}
          style={{
            padding: '18px 50px',
            fontSize: '18px',
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
      ) : (
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '20px',
          padding: '30px',
          maxWidth: '350px',
          width: '100%',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ color: COLORS.gold, fontSize: '14px', marginBottom: '15px' }}>
            ENTER VERIFICATION CODE
          </div>
          
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
            placeholder="_ _ _ _ _"
            maxLength={5}
            style={{
              width: '100%',
              padding: '20px',
              fontSize: '32px',
              textAlign: 'center',
              letterSpacing: '12px',
              background: 'rgba(255,255,255,0.1)',
              border: error ? '2px solid #dc3545' : '2px solid rgba(255,255,255,0.3)',
              borderRadius: '12px',
              color: COLORS.white,
              outline: 'none'
            }}
          />
          
          {error && (
            <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '10px' }}>
              Invalid code. Please try again.
            </div>
          )}
          
          <button
            onClick={handleSubmit}
            disabled={code.length !== 5}
            style={{
              width: '100%',
              marginTop: '20px',
              padding: '18px',
              fontSize: '18px',
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
          
          <div style={{ marginTop: '20px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
            Didn't receive it? <span style={{ color: COLORS.gold, cursor: 'pointer' }}>Resend code</span>
          </div>
        </div>
      )}
      
      <button
        onClick={onBack}
        style={{
          marginTop: '30px',
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '14px',
          cursor: 'pointer'
        }}
      >
        ← Back to registration
      </button>
      
      {/* Demo hint */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(212, 175, 55, 0.2)',
        padding: '10px 20px',
        borderRadius: '8px',
        border: '1px dashed rgba(212, 175, 55, 0.5)'
      }}>
        <div style={{ color: COLORS.gold, fontSize: '12px' }}>
          🔑 DEMO CODE: <strong>12345</strong>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CASE CREATED - Show case number
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
    
    <h1 style={{ color: COLORS.white, fontSize: 'clamp(24px, 5vw, 36px)', margin: '0 0 10px' }}>
      Welcome, {userData.firstName}!
    </h1>
    
    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', marginBottom: '30px' }}>
      Your case has been created successfully.
    </p>
    
    <div style={{
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '20px',
      padding: '30px 40px',
      border: '3px solid rgba(212, 175, 55, 0.5)'
    }}>
      <div style={{ color: COLORS.gold, fontSize: '14px', letterSpacing: '2px', marginBottom: '10px' }}>
        YOUR CASE NUMBER
      </div>
      <div style={{ color: COLORS.white, fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: '700', letterSpacing: '3px' }}>
        {caseNumber}
      </div>
    </div>
    
    <div style={{
      marginTop: '30px',
      padding: '20px',
      background: 'rgba(40, 167, 69, 0.2)',
      borderRadius: '12px',
      border: '1px solid rgba(40, 167, 69, 0.5)',
      maxWidth: '400px'
    }}>
      <div style={{ color: COLORS.white, fontSize: '16px', lineHeight: '1.6' }}>
        📸 <strong>Screenshot this page!</strong><br />
        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
          Your case number will also be texted to {userData.phone} and emailed to {userData.email}
        </span>
      </div>
    </div>
    
    <button
      onClick={onNext}
      style={{
        marginTop: '40px',
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
      BEGIN INTAKE PROCESS →
    </button>
  </div>
);

// ============================================================================
// VOICE INTAKE QUESTION
// ============================================================================
const VoiceIntakeSlide = ({ question, questionNumber, totalQuestions, onNext, onBack, answers, setAnswers }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(answers[question.field] || '');
  const [hasRecorded, setHasRecorded] = useState(!!answers[question.field]);
  const recognitionRef = useRef(null);
  
  useEffect(() => {
    if (speechSupported) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }
        
        setTranscript(prev => {
          const newTranscript = prev + finalTranscript;
          if (interimTranscript) {
            return newTranscript + interimTranscript;
          }
          return newTranscript;
        });
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);
  
  const startRecording = () => {
    if (speechSupported && recognitionRef.current) {
      setTranscript('');
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };
  
  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setHasRecorded(true);
      setAnswers(prev => ({...prev, [question.field]: transcript}));
    }
  };
  
  const handleNext = () => {
    setAnswers(prev => ({...prev, [question.field]: transcript}));
    onNext();
  };
  
  const handleReRecord = () => {
    setTranscript('');
    setHasRecorded(false);
  };
  
  return (
    <div style={{
      minHeight: '100dvh',
      background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.black} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      padding: '15px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <img src="/logo.jpg" alt="1-800-ASK-GARY" style={{ height: '35px' }} />
        <div style={{ color: COLORS.gold, fontSize: '14px', fontWeight: '600' }}>
          Question {questionNumber} of {totalQuestions}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div style={{
        height: '6px',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '3px',
        marginBottom: '20px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${(questionNumber / totalQuestions) * 100}%`,
          background: COLORS.gold,
          borderRadius: '3px',
          transition: 'width 0.3s ease'
        }} />
      </div>
      
      {/* Question */}
      <div style={{
        background: 'rgba(196, 30, 58, 0.2)',
        borderRadius: '16px',
        padding: '25px',
        border: '2px solid rgba(196, 30, 58, 0.4)',
        marginBottom: '20px'
      }}>
        <div style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '2px', marginBottom: '10px' }}>
          QUESTION {questionNumber}
        </div>
        <h2 style={{
          color: COLORS.white,
          fontSize: 'clamp(20px, 4vw, 28px)',
          fontWeight: '600',
          margin: 0,
          lineHeight: '1.4'
        }}>
          {question.question}
        </h2>
      </div>
      
      {/* Recording Controls */}
      {!hasRecorded ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {!speechSupported ? (
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '25px',
              textAlign: 'center'
            }}>
              <div style={{ color: COLORS.gold, fontSize: '18px', marginBottom: '15px' }}>
                Voice recording not supported on this browser
              </div>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Type your answer here..."
                style={{
                  width: '100%',
                  minHeight: '150px',
                  padding: '15px',
                  fontSize: '16px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderRadius: '10px',
                  color: COLORS.white,
                  resize: 'vertical'
                }}
              />
              <button
                onClick={() => { setHasRecorded(true); setAnswers(prev => ({...prev, [question.field]: transcript})); }}
                style={{
                  marginTop: '15px',
                  padding: '15px 40px',
                  fontSize: '18px',
                  background: COLORS.green,
                  color: COLORS.white,
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                Save Answer
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={isRecording ? stopRecording : startRecording}
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  border: 'none',
                  background: isRecording 
                    ? `linear-gradient(135deg, ${COLORS.red} 0%, #a00 100%)`
                    : `linear-gradient(135deg, ${COLORS.green} 0%, #1a8a3a 100%)`,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isRecording 
                    ? '0 0 40px rgba(220, 53, 69, 0.5)'
                    : '0 0 40px rgba(40, 167, 69, 0.3)'
                }}
              >
                <span style={{ fontSize: '50px' }}>{isRecording ? '⏹️' : '🎙️'}</span>
                <span style={{ color: COLORS.white, fontSize: '14px', fontWeight: '600', marginTop: '8px' }}>
                  {isRecording ? 'STOP' : 'START'}
                </span>
              </button>
              
              <div style={{
                marginTop: '20px',
                color: isRecording ? COLORS.red : 'rgba(255,255,255,0.6)',
                fontSize: '16px',
                fontWeight: isRecording ? '600' : '400'
              }}>
                {isRecording ? '🔴 Recording... Speak now!' : 'Tap to start recording your answer'}
              </div>
              
              {transcript && (
                <div style={{
                  marginTop: '20px',
                  padding: '15px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  maxWidth: '100%',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '14px',
                  fontStyle: 'italic'
                }}>
                  {transcript}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: COLORS.gold, fontSize: '14px', marginBottom: '10px' }}>YOUR ANSWER:</div>
          <div style={{
            flex: 1,
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '12px',
            padding: '20px',
            color: COLORS.navy,
            fontSize: '18px',
            lineHeight: '1.6',
            overflow: 'auto'
          }}>
            "{transcript}"
          </div>
          
          <button
            onClick={handleReRecord}
            style={{
              marginTop: '15px',
              padding: '12px',
              fontSize: '14px',
              background: 'rgba(255,255,255,0.2)',
              color: COLORS.white,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            🔄 Re-record Answer
          </button>
        </div>
      )}
      
      {/* Navigation */}
      <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
        <button
          onClick={onBack}
          style={{
            flex: 1,
            padding: '16px',
            fontSize: '16px',
            background: 'rgba(255,255,255,0.2)',
            color: COLORS.white,
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer'
          }}
        >
          ← BACK
        </button>
        <button
          onClick={handleNext}
          disabled={!hasRecorded && !transcript}
          style={{
            flex: 2,
            padding: '16px',
            fontSize: '18px',
            fontWeight: '600',
            background: (hasRecorded || transcript) ? COLORS.primary : 'rgba(255,255,255,0.2)',
            color: COLORS.white,
            border: 'none',
            borderRadius: '10px',
            cursor: (hasRecorded || transcript) ? 'pointer' : 'not-allowed'
          }}
        >
          {questionNumber === totalQuestions ? 'COMPLETE →' : 'NEXT →'}
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// COMPLETION - Case Manager Assigned
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
      maxWidth: '500px',
      width: '100%'
    }}>
      <div style={{ fontSize: '70px', marginBottom: '15px' }}>🎉</div>
      
      <h1 style={{ color: COLORS.white, fontSize: 'clamp(24px, 5vw, 32px)', margin: '0 0 10px' }}>
        Phase 1 Complete!
      </h1>
      
      <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: '25px' }}>
        Your voice intake has been submitted successfully.
      </p>
      
      <div style={{
        background: 'rgba(255,255,255,0.15)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <div style={{ color: COLORS.gold, fontSize: '12px', letterSpacing: '2px', marginBottom: '8px' }}>
          CASE NUMBER
        </div>
        <div style={{ color: COLORS.white, fontSize: '24px', fontWeight: '700' }}>
          {caseNumber}
        </div>
      </div>
      
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '30px'
          }}>
            👤
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ color: COLORS.gold, fontSize: '12px' }}>YOUR CASE MANAGER</div>
            <div style={{ color: COLORS.white, fontSize: '18px', fontWeight: '600' }}>Sarah Johnson</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Senior Case Coordinator</div>
          </div>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', margin: 0 }}>
          Sarah will contact you within 24 hours to discuss next steps.
        </p>
      </div>
    </div>
    
    <div style={{
      marginTop: '25px',
      color: 'rgba(255,255,255,0.8)',
      fontSize: '14px'
    }}>
      📱 Confirmation sent to {userData.phone}<br />
      📧 Email sent to {userData.email}
    </div>
    
    <button
      onClick={onNext}
      style={{
        marginTop: '30px',
        padding: '18px 40px',
        fontSize: '18px',
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
  const [familyName, setFamilyName] = useState('');
  const [familyPhone, setFamilyPhone] = useState('');
  const [familyRelation, setFamilyRelation] = useState('');
  
  return (
    <div style={{
      minHeight: '100dvh',
      background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.black} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      padding: '30px 20px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <div style={{ fontSize: '50px', marginBottom: '15px' }}>👨‍👩‍👧</div>
        <h2 style={{ color: COLORS.white, fontSize: 'clamp(22px, 4vw, 30px)', margin: '0 0 10px' }}>
          Add Family Access
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>
          Grant a family member access to receive updates about your case
        </p>
      </div>
      
      <div style={{ flex: 1, maxWidth: '450px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: COLORS.gold, fontSize: '14px' }}>Family Member Name</label>
          <input
            type="text"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              marginTop: '8px',
              fontSize: '18px',
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '10px',
              color: COLORS.white
            }}
            placeholder="Enter their name"
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: COLORS.gold, fontSize: '14px' }}>Relationship</label>
          <select
            value={familyRelation}
            onChange={(e) => setFamilyRelation(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              marginTop: '8px',
              fontSize: '18px',
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '10px',
              color: COLORS.white
            }}
          >
            <option value="">Select relationship...</option>
            <option value="spouse">Spouse</option>
            <option value="parent">Parent</option>
            <option value="child">Adult Child</option>
            <option value="sibling">Sibling</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: COLORS.gold, fontSize: '14px' }}>Their Phone Number</label>
          <input
            type="tel"
            value={familyPhone}
            onChange={(e) => setFamilyPhone(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              marginTop: '8px',
              fontSize: '18px',
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '10px',
              color: COLORS.white
            }}
            placeholder="(555) 555-5555"
          />
        </div>
        
        <div style={{
          padding: '15px',
          background: 'rgba(212, 175, 55, 0.15)',
          borderRadius: '10px',
          border: '1px solid rgba(212, 175, 55, 0.3)'
        }}>
          <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
            ✓ They will receive text updates from your case manager<br />
            ✓ They can view your case status online<br />
            ✓ They will receive medical provider notifications
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '25px', maxWidth: '450px', margin: '25px auto 0', width: '100%' }}>
        <button
          onClick={onNext}
          disabled={!familyName || !familyPhone || !familyRelation}
          style={{
            padding: '18px',
            fontSize: '18px',
            fontWeight: '600',
            background: (familyName && familyPhone && familyRelation) ? COLORS.green : 'rgba(255,255,255,0.2)',
            color: COLORS.white,
            border: 'none',
            borderRadius: '12px',
            cursor: (familyName && familyPhone && familyRelation) ? 'pointer' : 'not-allowed'
          }}
        >
          ADD FAMILY MEMBER
        </button>
        <button
          onClick={onSkip}
          style={{
            padding: '15px',
            fontSize: '16px',
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
// PHASE 2 PREVIEW
// ============================================================================
const Phase2Slide = ({ caseNumber, userData }) => {
  const [showComplete, setShowComplete] = useState(false);
  
  if (showComplete) {
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
        <img src="/logo.jpg" alt="1-800-ASK-GARY" style={{ height: '80px', marginBottom: '25px' }} />
        
        <div style={{ fontSize: '70px', marginBottom: '20px' }}>✅</div>
        
        <h1 style={{ color: COLORS.white, fontSize: 'clamp(26px, 5vw, 38px)', margin: '0 0 15px' }}>
          Thank You, {userData.firstName}!
        </h1>
        
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', maxWidth: '400px', lineHeight: '1.6' }}>
          Your initial intake is complete. Your case manager will contact you shortly.
        </p>
        
        <div style={{
          marginTop: '35px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '25px 40px',
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
          maxWidth: '350px'
        }}>
          <div style={{ color: COLORS.white, fontSize: '14px' }}>
            Sign in anytime at<br />
            <strong style={{ color: COLORS.gold }}>my1800askgarycase.com</strong><br />
            to check your case status or complete Phase 2
          </div>
        </div>
        
        <div style={{ marginTop: '40px', color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
          <span style={{ color: COLORS.gold }}>NOETIC DHARMA GROUP™</span><br />
          Private Equity & Merchant Banking
        </div>
      </div>
    );
  }
  
  return (
    <div style={{
      minHeight: '100dvh',
      background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.black} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      padding: '30px 20px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <div style={{ fontSize: '50px', marginBottom: '15px' }}>📋</div>
        <h2 style={{ color: COLORS.white, fontSize: 'clamp(22px, 4vw, 30px)', margin: '0 0 10px' }}>
          Phase 2: Documentation
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>
          Optional - Complete now or return later
        </p>
      </div>
      
      <div style={{ flex: 1, maxWidth: '500px', margin: '0 auto', width: '100%' }}>
        <div style={{
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '25px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: COLORS.gold, fontSize: '18px', margin: '0 0 15px' }}>
            Documents Needed:
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: '📄', text: 'Police Report (if available)' },
              { icon: '🏥', text: 'Medical Records & Bills' },
              { icon: '📸', text: 'Photos of Damage/Injuries' },
              { icon: '📝', text: 'Insurance Information' },
              { icon: '🚗', text: 'Vehicle Registration' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                <span style={{ color: COLORS.white, fontSize: '16px' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{
          background: 'rgba(212, 175, 55, 0.15)',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid rgba(212, 175, 55, 0.3)'
        }}>
          <div style={{ color: COLORS.white, fontSize: '15px', lineHeight: '1.6' }}>
            ⏰ <strong>This step takes 10-15 minutes</strong><br />
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>
              You can sign back in anytime using your case number to complete this section.
            </span>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '25px', maxWidth: '500px', margin: '25px auto 0', width: '100%' }}>
        <button
          onClick={() => alert('Phase 2 would start here - document upload flow')}
          style={{
            padding: '18px',
            fontSize: '18px',
            fontWeight: '600',
            background: COLORS.green,
            color: COLORS.white,
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer'
          }}
        >
          START PHASE 2 NOW
        </button>
        <button
          onClick={() => setShowComplete(true)}
          style={{
            padding: '16px',
            fontSize: '16px',
            fontWeight: '600',
            background: COLORS.primary,
            color: COLORS.white,
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer'
          }}
        >
          I'LL COMPLETE THIS LATER →
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================
export default function App() {
  const [currentStep, setCurrentStep] = useState('intro');
  const [userData, setUserData] = useState({});
  const [caseNumber, setCaseNumber] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  
  const handleRegistrationComplete = () => {
    setCurrentStep('verification');
  };
  
  const handleVerificationComplete = () => {
    setCaseNumber(generateCaseNumber());
    setCurrentStep('caseCreated');
  };
  
  const handleQuestionNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentStep('completion');
    }
  };
  
  const handleQuestionBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setCurrentStep('caseCreated');
    }
  };
  
  switch (currentStep) {
    case 'intro':
      return <IntroSlide onNext={() => setCurrentStep('access')} />;
    
    case 'access':
      return <AccessSlide onNext={() => setCurrentStep('registration')} onBack={() => setCurrentStep('intro')} />;
    
    case 'registration':
      return <RegistrationSlide onNext={handleRegistrationComplete} onBack={() => setCurrentStep('access')} userData={userData} setUserData={setUserData} />;
    
    case 'verification':
      return <VerificationSlide onNext={handleVerificationComplete} onBack={() => setCurrentStep('registration')} userData={userData} />;
    
    case 'caseCreated':
      return <CaseCreatedSlide onNext={() => setCurrentStep('questions')} userData={userData} caseNumber={caseNumber} />;
    
    case 'questions':
      return (
        <VoiceIntakeSlide
          question={QUESTIONS[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={QUESTIONS.length}
          onNext={handleQuestionNext}
          onBack={handleQuestionBack}
          answers={answers}
          setAnswers={setAnswers}
        />
      );
    
    case 'completion':
      return <CompletionSlide onNext={() => setCurrentStep('family')} userData={userData} caseNumber={caseNumber} />;
    
    case 'family':
      return <FamilyAccessSlide onNext={() => setCurrentStep('phase2')} onSkip={() => setCurrentStep('phase2')} />;
    
    case 'phase2':
      return <Phase2Slide caseNumber={caseNumber} userData={userData} />;
    
    default:
      return <IntroSlide onNext={() => setCurrentStep('access')} />;
  }
}
