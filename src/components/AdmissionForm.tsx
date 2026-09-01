import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  User,
  Phone,
  MapPin,
  Camera,
  Upload,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  Award,
  Instagram,
  RefreshCw,
  Building2,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Store,
  Crown,
  Banknote,
  Smile,
  Scissors,
  Home,
  UserCheck,
  Edit3,
  Landmark
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CandidateRegistration, Language, LocationState } from '../types';
import { COURSES, OCCUPATIONS, REASONS_FOR_JOINING, QUALIFICATIONS, ORG_DETAILS } from '../data/coursesData';
import { CameraCaptureModal } from './CameraCaptureModal';
import { saveCandidate, generateRegistrationNumber } from '../utils/storage';

// Detailed District & Taluka list for Maharashtra & nearby areas
const MAHARASHTRA_LOCATIONS: LocationState[] = [
  {
    name: 'Maharashtra',
    districts: [
      {
        name: 'Akola (अकोला)',
        talukas: ['Akot (अकोट)', 'Telhara (तेल्हारा)', 'Akola (अकोला)', 'Balapur (बाळापूर)', 'Patur (पातूर)', 'Murtizapur (मूर्तिजापूर)', 'Barshitakli (बार्शीटाकळी)']
      },
      {
        name: 'Amravati (अमरावती)',
        talukas: ['Daryapur (दर्यापूर)', 'Anjangaon Surji (अंजनगाव सुर्जी)', 'Achalpur (अचलपूर)', 'Amravati (अमरावती)', 'Chandur Bazar (चांदूर बाजार)', 'Morshi (मोर्शी)', 'Warud (वरुड)', 'Dharni (धारणी)', 'Chikhaldara (चिखलदरा)']
      },
      {
        name: 'Buldhana (बुलढाणा)',
        talukas: ['Shegaon (शेगाव)', 'Khamgaon (खामगाव)', 'Jalgaon Jamod (जळगाव जामोद)', 'Sangrampur (संग्रामपूर)', 'Malkapur (मलकापूर)', 'Buldhana (बुलढाणा)', 'Mehkar (मेहकर)', 'Chikhli (चिखली)']
      },
      {
        name: 'Washim (वाशिम)',
        talukas: ['Risod (रिसोड)', 'Malegaon (मालेगाव)', 'Washim (वाशिम)', 'Mangrulpir (मंगरूळपीर)', 'Karanja (कारंजा)', 'Manora (मानोरा)']
      },
      {
        name: 'Yavatmal (यवतमाळ)',
        talukas: ['Yavatmal (यवतमाळ)', 'Pusad (पुसद)', 'Umarkhed (उमरखेड)', 'Darwha (दारव्हा)', 'Digras (दिग्रस)', 'Ner (नेर)', 'Wani (वणी)']
      },
      {
        name: 'Nagpur (नागपूर)',
        talukas: ['Nagpur (नागपूर)', 'Katol (काटोल)', 'Saoner (सावनेर)', 'Ramtek (रामटेक)', 'Umred (उमरेड)', 'Hingna (हिंगणा)', 'Kamptee (कामठी)']
      },
      {
        name: 'Chhatrapati Sambhajinagar / Aurangabad',
        talukas: ['Aurangabad (औरंगाबाद)', 'Paithan (पैठण)', 'Vaijapur (वैजापूर)', 'Gangapur (गंगापूर)', 'Kannad (कन्नड)', 'Sillod (सिल्लोड)']
      },
      {
        name: 'Pune (पुणे)',
        talukas: ['Pune City (पुणे शहर)', 'Haveli (हवेली)', 'Pimpri-Chinchwad (पिंपरी-चिंचवड)', 'Baramati (बारामती)', 'Shirur (शिरूर)', 'Khed (खेड)', 'Maval (मावळ)', 'Daund (दौंड)']
      },
      {
        name: 'Mumbai / Thane (मुंबई / ठाणे)',
        talukas: ['Mumbai City', 'Mumbai Suburban', 'Thane', 'Kalyan', 'Dombivli', 'Navi Mumbai', 'Bhiwandi']
      },
      {
        name: 'Other Maharashtra District / इतर जिल्हा',
        talukas: ['Other Taluka / इतर तालुका']
      }
    ]
  },
  {
    name: 'Madhya Pradesh (Nearby Border Districts)',
    districts: [
      {
        name: 'Burhanpur (बुरहानपूर)',
        talukas: ['Burhanpur', 'Nepanagar', 'Kharkalan']
      },
      {
        name: 'Khandwa (खंडवा)',
        talukas: ['Khandwa', 'Pandhana', 'Punasa']
      },
      {
        name: 'Betul (बैतुल)',
        talukas: ['Betul', 'Bhainsdehi', 'Multai']
      }
    ]
  },
  {
    name: 'Other State / अन्य राज्य',
    districts: [
      {
        name: 'Other District / अन्य जिला',
        talukas: ['Other Taluka / तहसील']
      }
    ]
  }
];

interface AdmissionFormProps {
  onSuccess: (candidate: CandidateRegistration) => void;
  lang: Language;
  selectedCourseId?: string;
  onOpenCourseCatalog: () => void;
}

export const AdmissionForm: React.FC<AdmissionFormProps> = ({
  onSuccess,
  lang,
  selectedCourseId = 'saundarya-shastra-certificate',
  onOpenCourseCatalog
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form Fields - Step 1: Personal Profile
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [educationQualification, setEducationQualification] = useState('10th Pass / १०वी (मॅट्रिक)');
  const [currentOccupation, setCurrentOccupation] = useState('Educated Unemployed / सुशिक्षित बेरोजगार महिला');
  const [customOccupation, setCustomOccupation] = useState('');
  const [reasonForJoining, setReasonForJoining] = useState('स्वतःचे ब्युटी पार्लर सुरू करून स्वयंरोजगार करायचा आहे');
  const [customReason, setCustomReason] = useState('');

  // Form Fields - Step 2: Contact, Address, Taluka, District, State, Pincode, Instagram
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isWhatsappSame, setIsWhatsappSame] = useState(true);
  const [streetAddress, setStreetAddress] = useState('');
  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [selectedDistrict, setSelectedDistrict] = useState('Akola (अकोला)');
  const [selectedTaluka, setSelectedTaluka] = useState('Akot (अकोट)');
  const [pincode, setPincode] = useState('444101');
  const [instagramId, setInstagramId] = useState('');

  // Form Fields - Step 3: Course Selection & Direct Photo Snap
  const [chosenCourseId, setChosenCourseId] = useState(selectedCourseId);
  const [photoBase64, setPhotoBase64] = useState('');
  const [photoSource, setPhotoSource] = useState<'camera' | 'upload' | 'default'>('camera');
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Dynamic Talukas based on state/district
  const currentDistricts = MAHARASHTRA_LOCATIONS.find(s => s.name === selectedState)?.districts || [];
  const currentTalukas = currentDistricts.find(d => d.name === selectedDistrict)?.talukas || [];

  const selectedCourse = COURSES.find(c => c.id === chosenCourseId) || COURSES[0];

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!firstName.trim()) errs.firstName = 'कृपया पहिले नाव टाका (First Name required)';
      if (!lastName.trim()) errs.lastName = 'कृपया आडनाव टाका (Surname required)';
      if (!age.trim()) {
        errs.age = 'कृपया वय टाका (Age required)';
      } else {
        const ageNum = parseInt(age, 10);
        if (isNaN(ageNum) || ageNum < 14 || ageNum > 75) {
          errs.age = 'वय १४ ते ७५ दरम्यान असावे (Age must be 14-75)';
        }
      }
    }

    if (step === 2) {
      if (!mobileNumber.trim() || mobileNumber.length !== 10) {
        errs.mobileNumber = '१० अंकी वैध मोबाईल नंबर टाका (10-digit mobile required)';
      }
      if (!isWhatsappSame && (!whatsappNumber.trim() || whatsappNumber.length !== 10)) {
        errs.whatsappNumber = '१० अंकी वैध व्हॉट्सॲप नंबर टाका';
      }
      if (!streetAddress.trim()) {
        errs.streetAddress = 'कृपया घराचा / गल्लीचा पत्ता टाका (Address required)';
      }
      if (!pincode.trim() || pincode.length !== 6) {
        errs.pincode = '६ अंकी पिनकोड टाका (6-digit Pincode required)';
      }
    }

    if (step === 3) {
      if (!photoBase64) {
        errs.photo = 'कृपया लाईव्ह कॅमेरा किंवा गॅलरीतून पासपोर्ट फोटो जोडा (Photo is required)';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      alert('कृपया सर्व आवश्यक माहिती अचूक भरा.');
      return;
    }

    setIsSubmitting(true);

    const regNumber = generateRegistrationNumber();
    const finalOccupation = currentOccupation === 'Other / अन्य' && customOccupation ? customOccupation : currentOccupation;
    const finalReason = reasonForJoining === 'Koi aur khaas wajah (Custom Reason)' && customReason ? customReason : reasonForJoining;

    const candidateData: CandidateRegistration = {
      id: `CAND-${Date.now()}`,
      regNumber,
      fullName: `${firstName.trim()} ${middleName.trim()} ${lastName.trim()}`.replace(/\s+/g, ' '),
      age,
      educationQualification,
      currentOccupation: finalOccupation,
      reasonForJoining: finalReason,
      customReason,
      mobileNumber,
      whatsappNumber: isWhatsappSame ? mobileNumber : whatsappNumber,
      isWhatsappSame,
      streetAddress,
      taluka: selectedTaluka,
      district: selectedDistrict,
      state: selectedState,
      pincode,
      instagramId: instagramId.trim(),
      courseId: selectedCourse.id,
      courseName: selectedCourse.nameHi,
      courseDuration: selectedCourse.duration,
      batchTiming: 'Not Applicable',
      photoBase64: photoBase64 || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      photoSource,
      appliedAt: new Date().toISOString(),
      status: 'Approved',
      govtSubsidyApplied: true
    };

    setTimeout(async () => {
      await saveCandidate(candidateData);
      setIsSubmitting(false);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }

      onSuccess(candidateData);
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoBase64(reader.result as string);
        setPhotoSource('upload');
        if (errors.photo) setErrors(prev => ({ ...prev, photo: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (base64Image: string) => {
    setPhotoBase64(base64Image);
    setPhotoSource('camera');
    if (errors.photo) setErrors(prev => ({ ...prev, photo: '' }));
  };

  const stepTitles = [
    { num: 1, titleHi: 'उमेदवार प्रोफाइल', titleEn: 'Profile' },
    { num: 2, titleHi: 'पत्ता व संपर्क', titleEn: 'Contact' },
    { num: 3, titleHi: 'कोर्स व फोटो', titleEn: 'Course & Photo' },
    { num: 4, titleHi: 'अंतिम पडताळणी', titleEn: 'Confirm & ID' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-slate-300 shadow-xl overflow-hidden">
      
      {/* Official Government Top Header Ribbon - Deep Navy */}
      <div className="bg-gradient-to-r from-[#002244] via-[#003366] to-[#001f3f] text-white p-5 sm:p-7 border-b border-amber-400 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF9933] text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
              <Landmark className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'शासकीय नोंदणीकृत प्रवेश अर्ज २०२५-२६' : 'Govt Registered Admission Form 2025-26'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-serif text-white">
              {lang === 'hi' ? 'प्रिंसेस ब्युटी पार्लर - ऑनलाइन प्रवेश नोंदणी' : 'Princess Beauty Parlour - Admission Form'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200">
              📍 संभाजी नगर, अकोट केंद्र • मुक्ता शिक्षण प्रसारक मंडळ अकोला (र.नं. ४४२५/१५) • फी फक्त ₹२,०००/-
            </p>
          </div>

          <div className="bg-black/30 border border-amber-400/50 rounded-xl p-3 text-center sm:text-right shrink-0 backdrop-blur-xs shadow-md">
            <span className="text-[10px] text-amber-300 font-bold uppercase block tracking-wider">शासकीय सवलत फी</span>
            <span className="text-2xl font-black text-amber-300 font-mono">₹२,०००/-</span>
            <span className="text-[10px] text-emerald-300 block font-semibold">१००% प्रॅक्टिकल मॉड्युल्स</span>
          </div>
        </div>

        {/* 4-Step Progress Indicator */}
        <div className="grid grid-cols-4 gap-2 mt-6 pt-4 border-t border-white/20">
          {stepTitles.map(step => {
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num;
            return (
              <div
                key={step.num}
                onClick={() => {
                  if (step.num < currentStep) setCurrentStep(step.num);
                }}
                className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold cursor-pointer transition ${
                  isActive
                    ? 'bg-[#FF9933] text-slate-950 font-black shadow-md'
                    : isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${
                    isActive
                      ? 'bg-slate-950 text-amber-300'
                      : isCompleted
                      ? 'bg-white text-emerald-800'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3" /> : step.num}
                </div>
                <span className="truncate hidden sm:inline">{lang === 'hi' ? step.titleHi : step.titleEn}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Container - Clean Government White Canvas */}
      <div className="p-6 sm:p-8 bg-white text-slate-900">
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Personal Profile, Name, Age, Occupation, Career Goal */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-[#002244] font-black text-lg font-serif">
                    <User className="w-5 h-5 text-[#003366]" />
                    <span>{lang === 'hi' ? '१. उमेदवाराची वैयक्तिक माहिती (Profile)' : '1. Candidate Personal Profile'}</span>
                  </div>
                  <span className="text-xs bg-blue-50 text-[#003366] font-bold px-3 py-1 rounded-full border border-blue-200">
                    {lang === 'hi' ? 'टप्पा १/४' : 'Step 1 of 4'}
                  </span>
                </div>

                {/* Name Breakdown: First, Middle, Surname */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {lang === 'hi' ? 'पहिले नाव (First Name)' : 'First Name'} <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={e => {
                        setFirstName(e.target.value);
                        if (errors.firstName) setErrors(prev => ({ ...prev, firstName: '' }));
                      }}
                      placeholder="उदा. राधिका / Radhika"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366] focus:bg-white transition placeholder-slate-400 ${
                        errors.firstName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.firstName && <p className="text-[11px] text-red-600 mt-1">{errors.firstName}</p>}
                  </div>

                  {/* Middle Name / Father / Husband */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {lang === 'hi' ? 'वडिलांचे / पतीचे नाव (Middle Name)' : 'Father / Husband Name'}
                    </label>
                    <input
                      type="text"
                      value={middleName}
                      onChange={e => setMiddleName(e.target.value)}
                      placeholder="उदा. ज्ञानेश्वर / Dnyaneshwar"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366] focus:bg-white transition placeholder-slate-400"
                    />
                  </div>

                  {/* Surname / Last Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {lang === 'hi' ? 'आडनाव (Surname / Last Name)' : 'Surname'} <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={e => {
                        setLastName(e.target.value);
                        if (errors.lastName) setErrors(prev => ({ ...prev, lastName: '' }));
                      }}
                      placeholder="उदा. देशमुख / Deshmukh"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366] focus:bg-white transition placeholder-slate-400 ${
                        errors.lastName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.lastName && <p className="text-[11px] text-red-600 mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Age & Qualification */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Age */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {lang === 'hi' ? 'वय वर्षे (Age in Years)' : 'Age'} <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="number"
                      min={14}
                      max={65}
                      value={age}
                      onChange={e => {
                        setAge(e.target.value);
                        if (errors.age) setErrors(prev => ({ ...prev, age: '' }));
                      }}
                      placeholder="उदा. 22"
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366] focus:bg-white transition placeholder-slate-400 ${
                        errors.age ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.age && <p className="text-[11px] text-red-600 mt-1">{errors.age}</p>}
                  </div>

                  {/* Education Qualification */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-[#003366]" />
                      <span>{lang === 'hi' ? 'शिक्षण (Education Qualification)' : 'Qualification'}</span>
                    </label>
                    <select
                      value={educationQualification}
                      onChange={e => setEducationQualification(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366]"
                    >
                      {QUALIFICATIONS.map(q => (
                        <option key={q.id} value={q.label}>
                          {q.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Current Occupation Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#003366]" />
                    <span>{lang === 'hi' ? 'सध्या काय करता? (Current Occupation)' : 'Current Status / Occupation'} <span className="text-red-500 font-bold">*</span></span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {OCCUPATIONS.map(occ => {
                      const isSelected = currentOccupation === occ.label;
                      return (
                        <button
                          key={occ.id}
                          type="button"
                          onClick={() => setCurrentOccupation(occ.label)}
                          className={`p-3 rounded-xl border text-xs font-medium text-left transition flex items-center gap-2 ${
                            isSelected
                              ? 'bg-blue-50 border-[#003366] text-[#002244] font-bold shadow-xs ring-1 ring-[#003366]'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#003366]' : 'bg-slate-400'}`} />
                          <span className="truncate">{occ.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  {currentOccupation === 'Other / अन्य' && (
                    <div className="mt-3">
                      <input
                        type="text"
                        value={customOccupation}
                        onChange={e => setCustomOccupation(e.target.value)}
                        placeholder={lang === 'hi' ? 'आपला सध्याचा व्यवसाय लिहा...' : 'Please specify your occupation...'}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#003366] placeholder-slate-400"
                      />
                    </div>
                  )}
                </div>

                {/* Reason for Joining / Career Goal */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#003366]" />
                    <span>{lang === 'hi' ? 'हा कोर्स करण्याचे मुख्य उद्दिष्ट (Main Career Goal)' : 'Reason for Joining'} <span className="text-red-500 font-bold">*</span></span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {REASONS_FOR_JOINING.map(reason => {
                      const isSelected = reasonForJoining === reason.titleHi || reasonForJoining === reason.title;
                      return (
                        <div
                          key={reason.id}
                          onClick={() => setReasonForJoining(lang === 'hi' ? reason.titleHi : reason.title)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start justify-between gap-2 ${
                            isSelected
                              ? 'bg-blue-50 border-[#003366] ring-1 ring-[#003366] shadow-xs text-[#002244]'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold text-[#003366]">
                              {lang === 'hi' ? reason.titleHi : reason.title}
                            </div>
                            <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                              {lang === 'hi' ? reason.descHi : reason.desc}
                            </p>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#003366] shrink-0 mt-1" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {reasonForJoining === 'Koi aur khaas wajah (Custom Reason)' && (
                    <div className="mt-3">
                      <textarea
                        rows={2}
                        value={customReason}
                        onChange={e => setCustomReason(e.target.value)}
                        placeholder={lang === 'hi' ? 'कृपया आपले कारण सविस्तर लिहा...' : 'Please write your reason...'}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#003366] placeholder-slate-400"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Address, Contact, Taluka, District, State, Pincode, Instagram */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-[#002244] font-black text-lg font-serif">
                    <MapPin className="w-5 h-5 text-[#003366]" />
                    <span>{lang === 'hi' ? '२. संपर्क क्रमांक व पत्ता (Contact & Address)' : '2. Contact & Address'}</span>
                  </div>
                  <span className="text-xs bg-blue-50 text-[#003366] font-bold px-3 py-1 rounded-full border border-blue-200">
                    {lang === 'hi' ? 'टप्पा २/४' : 'Step 2 of 4'}
                  </span>
                </div>

                {/* Mobile & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Mobile */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#003366]" />
                      <span>{lang === 'hi' ? 'मोबाईल नंबर (Mobile Number)' : 'Mobile Number'} <span className="text-red-500 font-bold">*</span></span>
                    </label>
                    <div className="relative flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-700 text-xs font-bold">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={mobileNumber}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, '');
                          setMobileNumber(val);
                          if (errors.mobileNumber) setErrors(prev => ({ ...prev, mobileNumber: '' }));
                        }}
                        placeholder="10 अंकी मोबाईल नंबर"
                        className={`w-full px-4 py-2.5 bg-slate-50 border rounded-r-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366] focus:bg-white transition placeholder-slate-400 ${
                          errors.mobileNumber ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
                        }`}
                      />
                    </div>
                    {errors.mobileNumber && <p className="text-[11px] text-red-600 mt-1">{errors.mobileNumber}</p>}
                  </div>

                  {/* WhatsApp Check & Number */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <span>{lang === 'hi' ? 'व्हॉट्सॲप नंबर (WhatsApp)' : 'WhatsApp Number'} <span className="text-red-500 font-bold">*</span></span>
                      </label>
                      <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer font-medium">
                        <input
                          type="checkbox"
                          checked={isWhatsappSame}
                          onChange={e => setIsWhatsappSame(e.target.checked)}
                          className="rounded text-[#003366] focus:ring-[#003366]"
                        />
                        <span>{lang === 'hi' ? 'मोबाईल नंबर सारखाच आहे' : 'Same as mobile'}</span>
                      </label>
                    </div>

                    {!isWhatsappSame && (
                      <div className="relative flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-700 text-xs font-bold">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          value={whatsappNumber}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, '');
                            setWhatsappNumber(val);
                            if (errors.whatsappNumber) setErrors(prev => ({ ...prev, whatsappNumber: '' }));
                          }}
                          placeholder="WhatsApp Number"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-r-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366] placeholder-slate-400"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {lang === 'hi' ? 'घर / गल्ली / परिसर पत्ता (Street Address)' : 'Address'} <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={e => {
                      setStreetAddress(e.target.value);
                      if (errors.streetAddress) setErrors(prev => ({ ...prev, streetAddress: '' }));
                    }}
                    placeholder="उदा. प्लॉट नं १२, संभाजी नगर, शिवाजी चौक जवळ..."
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#003366] focus:bg-white transition placeholder-slate-400 ${
                      errors.streetAddress ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.streetAddress && <p className="text-[11px] text-red-600 mt-1">{errors.streetAddress}</p>}
                </div>

                {/* State, District, Taluka, Pincode */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {/* State */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {lang === 'hi' ? 'राज्य (State)' : 'State'}
                    </label>
                    <select
                      value={selectedState}
                      onChange={e => {
                        setSelectedState(e.target.value);
                        const dists = MAHARASHTRA_LOCATIONS.find(s => s.name === e.target.value)?.districts || [];
                        if (dists.length > 0) {
                          setSelectedDistrict(dists[0].name);
                          setSelectedTaluka(dists[0].talukas[0] || '');
                        }
                      }}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#003366]"
                    >
                      {MAHARASHTRA_LOCATIONS.map(s => (
                        <option key={s.name} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* District */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {lang === 'hi' ? 'जिल्हा (District)' : 'District'}
                    </label>
                    <select
                      value={selectedDistrict}
                      onChange={e => {
                        setSelectedDistrict(e.target.value);
                        const tals = currentDistricts.find(d => d.name === e.target.value)?.talukas || [];
                        if (tals.length > 0) {
                          setSelectedTaluka(tals[0]);
                        }
                      }}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#003366]"
                    >
                      {currentDistricts.map(d => (
                        <option key={d.name} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Taluka */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {lang === 'hi' ? 'तालुका (Taluka)' : 'Taluka'} <span className="text-red-500 font-bold">*</span>
                    </label>
                    <select
                      value={selectedTaluka}
                      onChange={e => setSelectedTaluka(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#003366]"
                    >
                      {currentTalukas.map(t => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {lang === 'hi' ? 'पिनकोड (Pincode)' : 'Pincode'} <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={e => {
                        const val = e.target.value.replace(/\D/g, '');
                        setPincode(val);
                        if (errors.pincode) setErrors(prev => ({ ...prev, pincode: '' }));
                      }}
                      placeholder="उदा. 444101"
                      className={`w-full px-3 py-2.5 bg-slate-50 border rounded-xl text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#003366] focus:bg-white placeholder-slate-400 ${
                        errors.pincode ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.pincode && <p className="text-[11px] text-red-600 mt-1">{errors.pincode}</p>}
                  </div>
                </div>

                {/* Instagram ID (Optional) */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Instagram className="w-4 h-4 text-pink-600" />
                      <span>{lang === 'hi' ? 'इंस्टाग्राम आयडी (Instagram Profile)' : 'Instagram ID'}</span>
                    </label>
                    <span className="text-[11px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded">
                      {lang === 'hi' ? 'ऐच्छिक (Optional)' : 'Optional'}
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">@</span>
                    <input
                      type="text"
                      value={instagramId}
                      onChange={e => setInstagramId(e.target.value.replace('@', ''))}
                      placeholder="उदा. beauty_artist_riya"
                      className="w-full pl-8 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] placeholder-slate-400"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Course Selection, Batch Timing, Photo Direct Camera & Gallery */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-[#002244] font-black text-lg font-serif">
                    <Award className="w-5 h-5 text-[#003366]" />
                    <span>{lang === 'hi' ? '३. कोर्स व फोटो' : '3. Course & Photo'}</span>
                  </div>
                  <span className="text-xs bg-blue-50 text-[#003366] font-bold px-3 py-1 rounded-full border border-blue-200">
                    {lang === 'hi' ? 'टप्पा ३/४' : 'Step 3 of 4'}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {lang === 'hi' ? 'निवडलेला कोर्स (Selected Course)' : 'Selected Course'} <span className="text-red-500 font-bold">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={onOpenCourseCatalog}
                      className="text-xs text-[#003366] hover:underline font-bold self-start sm:self-auto"
                    >
                      {lang === 'hi' ? 'अभ्यासक्रम पहा' : 'View Syllabus'}
                    </button>
                  </div>

                  <div
                    className="p-4 rounded-2xl border border-[#003366]/20 bg-gradient-to-r from-blue-50 to-slate-50 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded">
                            {selectedCourse.duration}
                          </span>
                          <span className="text-[10px] text-emerald-700 font-bold">
                            शासकीय सवलत
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-base sm:text-lg leading-snug font-serif">
                          {lang === 'hi' ? selectedCourse.nameHi : selectedCourse.name}
                        </h4>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-slate-400 line-through block">₹{selectedCourse.originalFee.toLocaleString('en-IN')}</span>
                        <div className="text-xl font-black text-[#003366] font-mono">
                          ₹{selectedCourse.subsidizedFee.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] font-normal text-slate-500">{lang === 'hi' ? '(एकूण फी)' : '(Total Fee)'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Photo Upload: Camera Snap OR Gallery Upload */}
                <div className="p-5 bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-slate-900 rounded-2xl border-2 border-[#003366]/30 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="font-bold text-sm text-[#002244] flex items-center gap-2 font-serif">
                        <Camera className="w-4 h-4 text-[#003366]" />
                        <span>{lang === 'hi' ? 'उमेदवाराचा पासपोर्ट फोटो (Student Photo)' : 'Candidate Passport Photo'} <span className="text-red-500 font-bold">*</span></span>
                      </h4>
                      <p className="text-xs text-slate-600">
                        {lang === 'hi' ? 'कॅमेरा चालू करून थेट फोटो काढा किंवा गॅलरीतून निवडा' : 'Live Camera snap or Gallery upload'}
                      </p>
                    </div>
                    {photoBase64 && (
                      <span className="text-[11px] bg-emerald-600 text-white px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-2xs">
                        <Check className="w-3 h-3" />
                        {lang === 'hi' ? 'फोटो जोडली गेली' : 'Photo Attached'}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    {/* Photo Preview Box */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-32 h-36 rounded-xl border-2 border-dashed border-[#003366]/40 bg-white overflow-hidden relative flex items-center justify-center shadow-xs">
                        {photoBase64 ? (
                          <>
                            <img
                              src={photoBase64}
                              alt="Student Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => setPhotoBase64('')}
                              className="absolute top-1.5 right-1.5 bg-black/70 hover:bg-red-600 text-white p-1 rounded-full text-xs transition"
                              title="Delete Photo"
                            >
                              ✕
                            </button>
                          </>
                        ) : (
                          <div className="text-center p-3 text-slate-400">
                            <User className="w-10 h-10 mx-auto mb-1 text-slate-300" />
                            <span className="text-[10px] leading-tight block text-slate-500">
                              {lang === 'hi' ? 'फोटो येथे दिसेल' : 'Photo Preview'}
                            </span>
                          </div>
                        )}
                      </div>
                      {photoBase64 && (
                        <span className="text-[10px] text-slate-600 font-mono mt-1">
                          Source: {photoSource === 'camera' ? 'Live Camera' : 'Gallery Upload'}
                        </span>
                      )}
                    </div>

                    {/* Dual Action Buttons (Camera & Gallery) */}
                    <div className="sm:col-span-2 space-y-3">
                      {/* Button 1: Live Camera Snap */}
                      <button
                        type="button"
                        onClick={() => setIsCameraOpen(true)}
                        className="w-full py-3 px-4 bg-gradient-to-r from-[#002244] via-[#003366] to-[#002244] hover:from-[#001833] hover:to-[#002244] text-white font-bold rounded-xl text-sm shadow-md flex items-center justify-center gap-2.5 transition active:scale-[0.98] border border-amber-400/40"
                      >
                        <Camera className="w-5 h-5 text-amber-300" />
                        <span>{lang === 'hi' ? 'कॅमेरा चालू करून फोटो काढा (Open Camera)' : 'Take Photo via Live Camera'}</span>
                      </button>

                      {/* Button 2: Gallery File Upload */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-800 font-semibold rounded-xl text-sm border border-slate-300 flex items-center justify-center gap-2.5 transition shadow-2xs"
                      >
                        <Upload className="w-4 h-4 text-[#003366]" />
                        <span>{lang === 'hi' ? 'गॅलरीतून फोटो निवडा (Upload from Gallery)' : 'Choose from Gallery / Files'}</span>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />

                      <p className="text-[11px] text-slate-500 text-center">
                        {lang === 'hi'
                          ? 'टीप: हा फोटो आपल्या अधिकृत प्रवेश पत्रावर व प्रमाणपत्रावर प्रिंट केला जाईल.'
                          : 'Note: This photo will appear on your Student ID & Certificate.'}
                      </p>
                    </div>
                  </div>

                  {errors.photo && <p className="text-xs text-red-600 mt-2 font-medium">{errors.photo}</p>}
                </div>
              </motion.div>
            )}

            {/* STEP 4: Review Application & Submit with Confetti */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-[#002244] font-black text-lg font-serif">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>{lang === 'hi' ? '४. अर्जाची अंतिम पडताळणी व प्रवेश निश्चित' : '4. Final Review & Confirm Admission'}</span>
                  </div>
                  <span className="text-xs bg-blue-50 text-[#003366] font-bold px-3 py-1 rounded-full border border-blue-200">
                    {lang === 'hi' ? 'अंतिम टप्पा ४/४' : 'Final Step 4 of 4'}
                  </span>
                </div>

                {/* Summary Card */}
                <div className="bg-slate-50 p-5 md:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-4 pb-4 border-b border-slate-200">
                    <div className="w-20 h-24 rounded-xl border-2 border-[#003366] overflow-hidden shadow-xs shrink-0 bg-white">
                      <img
                        src={photoBase64 || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="text-center sm:text-left flex-1">
                      <span className="text-[10px] font-bold text-[#003366] uppercase tracking-wider">उमेदवाराचे नाव / Applicant Name</span>
                      <h3 className="text-xl font-black text-slate-900 font-serif">
                        {firstName} {middleName} {lastName}
                      </h3>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
                        <span className="text-xs bg-slate-200 text-slate-800 font-bold px-2.5 py-0.5 rounded">
                          वय: {age} वर्षे
                        </span>
                        <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded border border-emerald-200">
                          {currentOccupation}
                        </span>
                        {instagramId && (
                          <span className="text-xs bg-pink-50 text-pink-700 font-bold px-2.5 py-0.5 rounded border border-pink-200">
                            @{instagramId}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="text-xs font-bold text-[#003366] uppercase tracking-wider">निवडलेला कोर्स व प्रशिक्षण केंद्र</div>
                    <div className="text-base font-black text-slate-900 font-serif">
                      {lang === 'hi' ? selectedCourse.nameHi : selectedCourse.name}
                    </div>
                    <div className="flex flex-wrap items-center justify-between text-xs text-slate-700 gap-2">
                      <span className="text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                        एकूण फी: ₹{selectedCourse.subsidizedFee.toLocaleString('en-IN')}/-
                      </span>
                    </div>
                  </div>

                  {/* Address & Contact Summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-4 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">मोबाईल / WhatsApp</span>
                      <p className="font-bold text-slate-900 mt-0.5">+91 {mobileNumber}</p>
                      <p className="text-slate-500">WA: {isWhatsappSame ? mobileNumber : whatsappNumber}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">पत्ता व तालुका</span>
                      <p className="text-slate-700 mt-0.5">{streetAddress}</p>
                      <p className="font-bold text-slate-900">
                        {selectedTaluka}, {selectedDistrict}, {selectedState} - {pincode}
                      </p>
                    </div>
                  </div>

                  {/* Guarantee Box */}
                  <div className="bg-gradient-to-r from-[#002244] via-[#003366] to-[#002244] text-white p-4 rounded-xl flex items-center gap-3 border border-amber-400/40 shadow-sm">
                    <ShieldCheck className="w-8 h-8 text-amber-300 shrink-0" />
                    <div className="text-xs leading-snug">
                      <p className="font-bold text-amber-300">
                        {lang === 'hi' ? 'शासकीय नोंदणीकृत व १००% प्रॅक्टिकल खात्री' : 'Govt Registered & 100% Practical Guarantee'}
                      </p>
                      <p className="text-slate-200 text-[11px] mt-0.5">
                        {lang === 'hi'
                          ? 'अर्ज जमा करताच लगेच आपले डिजिटल प्रवेश पत्र (ID Card) तयार होईल.'
                          : 'Upon submission, your printable official admission letter will be generated instantly.'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Form Action Controls (Back / Next / Submit) */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center gap-1.5 transition border border-slate-300"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === 'hi' ? 'मागे (Back)' : 'Back'}</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-7 py-3 rounded-xl bg-[#e65100] hover:bg-[#d84315] text-white font-black text-sm shadow-md flex items-center gap-2 transition active:scale-[0.98] border border-amber-300"
              >
                <span>{lang === 'hi' ? 'पुढील पायरी (Next)' : 'Next Step'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:to-emerald-500 text-white font-black text-sm md:text-base shadow-xl flex items-center gap-2 transition active:scale-[0.98] disabled:opacity-50 border border-emerald-400"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{lang === 'hi' ? 'प्रवेश नोंदवला जात आहे...' : 'Generating Admission...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>{lang === 'hi' ? 'प्रवेश अर्ज जमा करा व ID Card मिळवा' : 'Submit Admission & Get ID'}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Live Camera Modal */}
      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
        lang={lang}
      />
    </div>
  );
};
