import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { AdmissionForm } from './components/AdmissionForm';
import { AdmissionCardModal } from './components/AdmissionCardModal';
import { CourseCatalogModal } from './components/CourseCatalogModal';
import { AdminPortal } from './components/AdminPortal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { GovtBannerAndHighlights } from './components/GovtBannerAndHighlights';
import { SuccessCelebration } from './components/SuccessCelebration';
import { CandidateRegistration, Language } from './types';
import { getSavedCandidates } from './utils/storage';
import { COURSES, ORG_DETAILS } from './data/coursesData';
import { ShieldCheck, Award, Sparkles, CheckCircle2, Flame, Camera, MapPin, Building2, Landmark, HelpCircle, PhoneCall, FileText } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('hi');
  const [selectedCourseForForm, setSelectedCourseForForm] = useState<string>('saundarya-shastra-certificate');
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [activeCardCandidate, setActiveCardCandidate] = useState<CandidateRegistration | null>(null);
  const [submittedCandidate, setSubmittedCandidate] = useState<CandidateRegistration | null>(null);
  const [candidatesList, setCandidatesList] = useState<CandidateRegistration[]>([]);

  // Load registered candidates count
  useEffect(() => {
    const loadCandidates = async () => {
      const list = await getSavedCandidates();
      setCandidatesList(list);
    };
    loadCandidates();
  }, [submittedCandidate]);

  const handleFormSuccess = (candidate: CandidateRegistration) => {
    setSubmittedCandidate(candidate);
    setActiveCardCandidate(candidate);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyNowClick = () => {
    setIsAdminOpen(false);
    setIsAdminLoginOpen(false);
    setSubmittedCandidate(null);
    const formEl = document.getElementById('admission-form-section');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleAdminClick = () => {
    setIsAdminLoginOpen(true);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoginOpen(false);
    setIsAdminOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f3f6fa] text-slate-900 font-sans selection:bg-[#003366] selection:text-white">
      
      {/* Sticky Government Portal Header */}
      <Header
        lang={lang}
        onToggleLang={() => setLang(prev => (prev === 'hi' ? 'en' : 'hi'))}
        onApplyClick={handleApplyNowClick}
        onOpenCatalog={() => setIsCatalogOpen(true)}
        onToggleAdmin={handleAdminClick}
        isAdminOpen={isAdminOpen}
        registeredCount={candidatesList.length + 140}
      />

      {/* Main Content Area */}
      {isAdminOpen ? (
        <AdminPortal
          lang={lang}
          onOpenCard={cand => {
            setActiveCardCandidate(cand);
            setIsCardModalOpen(true);
          }}
          onClose={() => setIsAdminOpen(false)}
        />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-8">
          
          {/* Top Hero Banner - Official Maharashtra Government Portal Gazette Header */}
          <div className="relative rounded-2xl bg-gradient-to-r from-[#002244] via-[#003366] to-[#001f3f] text-white p-6 sm:p-9 overflow-hidden shadow-lg border-2 border-amber-400">
            {/* Subtle background security patterns */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl space-y-4">
              
              {/* Official Badges Band */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF9933] text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>महाराष्ट्र शासन मान्यता प्राप्त</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-amber-300 text-xs font-bold">
                  <span>रजि. क्र. ४४२५/१५ • मुंबई एफ/नं. ३६१५/१५</span>
                </div>
              </div>

              {/* Gazette Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-serif leading-tight tracking-tight">
                {lang === 'hi' ? (
                  <>
                    सौंदर्य शास्त्र प्रमाणपत्र कोर्स - <span className="text-amber-300">अकोट केंद्रात प्रवेश सुरू २०२५-२६</span>
                  </>
                ) : (
                  <>
                    Soundarya Shastra Certificate Course - <span className="text-amber-300">Akot Center Admission Open</span>
                  </>
                )}
              </h1>

              {/* Official Description matching government pamphlet */}
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium bg-black/20 p-3.5 rounded-xl border border-white/15 backdrop-blur-xs">
                {lang === 'hi'
                  ? 'मुख्य प्रशिक्षण केंद्र: प्रिंसेस ब्युटी पार्लर (संभाजी नगर, अकोट, जि. अकोला) यांनी मुक्ता शिक्षण प्रसारक मंडळ अकोला यांच्याशी सहकार्य करून महिलांच्या स्वयंरोजगारासाठी सौंदर्य शास्त्र कोर्स सुरू केला आहे. थ्रेडिंग, वॅक्सिंग, फेशिअल, ब्लीच, हेअर कट, मेकअप इत्यादी सर्व विषयांचे प्रॅक्टिकल प्रशिक्षण व अधिकृत शासकीय प्रमाणपत्र मिळेल.'
                  : 'Main Training Center: Princess Beauty Parlour, Sambhaji Nagar, Akot (Affiliated with Mukta Shikshan Prasarak Mandal Akola, Reg. No. 4425/15). Complete practical training in beauty aesthetics and govt registered certification.'}
              </p>

              {/* Quick Govt Portal Highlights Ticker */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <div className="bg-amber-400 text-slate-950 border border-amber-300 px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm">
                  <Flame className="w-4 h-4 text-slate-950" />
                  <span>एकूण सवलत फी फक्त ₹२,०००/-</span>
                </div>
                <div className="bg-emerald-900/80 border border-emerald-400/60 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>शासकीय नोंदणीकृत प्रमाणपत्र</span>
                </div>
                <div className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 text-amber-200">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>संभाजी नगर, अकोट केंद्र</span>
                </div>
                <div className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 text-sky-200">
                  <Camera className="w-4 h-4 text-sky-300" />
                  <span>लाईव्ह कॅमेरा / गॅलरी फोटो</span>
                </div>
              </div>

            </div>
          </div>

          {/* If form just submitted, show Success Celebration view, otherwise show Form */}
          <AnimatePresence mode="wait">
            {submittedCandidate ? (
              <SuccessCelebration
                key="success"
                candidate={submittedCandidate}
                lang={lang}
                onViewCard={() => setIsCardModalOpen(true)}
                onReset={() => setSubmittedCandidate(null)}
              />
            ) : (
              <motion.div
                key="form"
                id="admission-form-section"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AdmissionForm
                  onSuccess={handleFormSuccess}
                  lang={lang}
                  selectedCourseId={selectedCourseForForm}
                  onOpenCourseCatalog={() => setIsCatalogOpen(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Government Authorization & Highlights Section */}
          <GovtBannerAndHighlights
            lang={lang}
            onApplyClick={handleApplyNowClick}
          />

        </main>
      )}

      {/* Printable & Downloadable Admission ID Card Modal */}
      <AdmissionCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        candidate={activeCardCandidate}
        lang={lang}
      />

      {/* Course Catalog & Syllabus Modal */}
      <CourseCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectCourse={courseId => {
          setSelectedCourseForForm(courseId);
          handleApplyNowClick();
        }}
        lang={lang}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Government Portal Official Footer */}
      <footer className="bg-[#001f3f] text-slate-300 border-t-4 border-[#FF9933] pt-10 pb-8 mt-16 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Main Parlour Info */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#003366] to-[#002244] flex items-center justify-center text-white font-bold border border-amber-400 shadow-md text-lg">
                  <Landmark className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base font-serif">
                    {ORG_DETAILS.parlourName}
                  </h4>
                  <p className="text-xs text-amber-300 font-medium">
                    📍 {ORG_DETAILS.parlourAddress}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                अधिकृत सहकार्य: <strong className="text-white">{ORG_DETAILS.regdOrgName}</strong> ({ORG_DETAILS.govtRegNumber}) • सौंदर्य शास्त्र प्रमाणपत्र कोर्स • प्रवेश देणे सुरु आहे • एकूण फी फक्त ₹२,०००/-
              </p>
              <div className="text-[11px] text-amber-300 font-mono">
                मुख्यालय: {ORG_DETAILS.headOffice}
              </div>
            </div>

            {/* Col 2: Courses */}
            <div className="space-y-2 text-xs">
              <h5 className="font-bold text-amber-300 uppercase tracking-wider text-xs font-serif border-b border-slate-700 pb-1">
                अभ्यासक्रम (Syllabus)
              </h5>
              <ul className="space-y-1.5 text-slate-300">
                <li className="hover:text-amber-300 cursor-pointer transition" onClick={() => setIsCatalogOpen(true)}>
                  • थ्रेडिंग, वॅक्सिंग, फेशिअल, ब्लीच
                </li>
                <li className="hover:text-amber-300 cursor-pointer transition" onClick={() => setIsCatalogOpen(true)}>
                  • हेअर कट, केमिकल डाय, मेंदी डाय
                </li>
                <li className="hover:text-amber-300 cursor-pointer transition" onClick={() => setIsCatalogOpen(true)}>
                  • पेडीक्युर व मॅनीक्युर, स्ट्रेटनिंग
                </li>
                <li className="hover:text-amber-300 cursor-pointer transition" onClick={() => setIsCatalogOpen(true)}>
                  • हेअर स्टाईल, मेकअप, ड्रेपिंग, हेअर सेटिंग
                </li>
              </ul>
            </div>

            {/* Col 3: Helpline */}
            <div className="space-y-2 text-xs">
              <h5 className="font-bold text-amber-300 uppercase tracking-wider text-xs font-serif border-b border-slate-700 pb-1">
                प्रशिक्षण केंद्र व संपर्क
              </h5>
              <p className="text-slate-200">
                पार्लर: <strong className="text-amber-300">प्रिंसेस ब्युटी पार्लर</strong>
              </p>
              <p className="text-slate-200">
                पत्ता: <strong className="text-amber-300">संभाजी नगर, अकोट</strong>
              </p>
              <p className="text-slate-200">
                कोर्स फी: <strong className="text-emerald-400 font-mono text-sm">फक्त ₹२,०००/-</strong>
              </p>
              <p className="text-slate-300 text-[11px] mt-2 bg-slate-900/60 p-2 rounded border border-slate-700">
                "ह्या प्रमाणपत्रावर आपण स्वतःचे पार्लर टाकू शकता किंवा शासकीय विविध योजनांचा लाभ घेऊ शकता."
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
            <p>© २०२५-२०२६ प्रिंसेस ब्युटी पार्लर, अकोट • सहकार्य: मुक्ता शिक्षण प्रसारक मंडळ अकोला. सर्व हक्क राखीव.</p>
            <div className="flex items-center gap-4">
              <span>महाराष्ट्र शासन रजि. क्र. ४४२५/१५</span>
              <span>•</span>
              <span>मुंबई एफ/नं. ३६१५/१५</span>
              <span>•</span>
              <span>संभाजी नगर, अकोट</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
