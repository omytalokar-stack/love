import React from 'react';
import { ShieldCheck, Globe, BookOpen, UserCheck, Award, MapPin, Building2, Landmark, Phone, Bell, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { ORG_DETAILS } from '../data/coursesData';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onApplyClick: () => void;
  onOpenCatalog: () => void;
  onToggleAdmin: () => void;
  isAdminOpen: boolean;
  registeredCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  onApplyClick,
  onOpenCatalog,
  onToggleAdmin,
  isAdminOpen,
  registeredCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-300 shadow-md">
      
      {/* Indian National / State Govt Portal Top Tricolor Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808] border-b border-slate-200" />

      {/* Top Sarkari Utilities Bar - Official Govt Header Top Bar */}
      <div className="bg-[#002244] text-white text-[11px] py-1.5 px-4 border-b border-[#001833]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Govt Recognition Left Mark */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#FF9933] text-slate-950 font-black px-2 py-0.5 rounded text-[9.5px] uppercase tracking-wider shadow-xs">
              <Landmark className="w-3 h-3 text-slate-950" />
              <span>महाराष्ट्र शासन मान्यता प्राप्त</span>
            </div>
            <span className="text-slate-200 font-medium hidden sm:inline text-[11px]">
              रजि. क्र. ४४२५/१५ • मुंबई एफ/नं. ३६१५/१५ | शासकीय सवलत योजना
            </span>
          </div>

          {/* Quick Govt Portal Tools: Helpline, Enrolled count, Accessibility, Lang */}
          <div className="flex items-center gap-3 sm:gap-5 text-slate-200 shrink-0 font-medium text-xs">
            <div className="hidden md:flex items-center gap-1 text-amber-300">
              <Phone className="w-3 h-3 text-amber-400" />
              <span className="font-bold text-[11px]">हेल्पलाईन: +91 94228 60465</span>
            </div>

            <div className="flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{registeredCount}+ {lang === 'hi' ? 'नोंदणीकृत प्रवेश' : 'Enrolled'}</span>
            </div>

            {/* Language Switch Button */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold rounded bg-[#003366] text-amber-300 hover:bg-[#004080] border border-amber-400/40 transition shadow-xs"
              title="भाषा निवडा (Switch Language)"
            >
              <Globe className="w-3 h-3" />
              <span>{lang === 'hi' ? 'English' : 'मराठी / हिंदी'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Government Portal Header - Authentic Sarkari Portal Emblem & Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* State Govt Emblem & Registered Academy Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onApplyClick}>
          {/* Government Ashoka / Emblem Seal */}
          <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-[#002b54] to-[#001f3f] p-1.5 flex flex-col items-center justify-center text-white shadow-md border-2 border-amber-400 shrink-0 text-center">
            <Landmark className="w-6 h-6 text-amber-400" />
            <span className="text-[7.5px] font-black text-amber-300 tracking-tighter uppercase leading-none mt-0.5">
              GOVT. REGD
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] bg-red-100 text-red-900 border border-red-300 font-extrabold px-2 py-0.2 rounded tracking-wide">
                🏛️ अधिकृत केंद्र: संभाजी नगर, अकोट
              </span>
              <span className="text-[10px] bg-blue-50 text-[#003366] border border-blue-200 font-bold px-2 py-0.2 rounded hidden sm:inline">
                {ORG_DETAILS.regdOrgName}
              </span>
            </div>
            
            <h1 className="text-base sm:text-xl font-black text-[#002244] font-serif leading-tight mt-0.5">
              {lang === 'hi' ? 'प्रिंसेस ब्युटी पार्लर व कौशल्य प्रशिक्षण केंद्र' : 'Princess Beauty Parlour & Skill Training Center'}
            </h1>
            
            <p className="text-[11px] text-slate-600 font-medium flex items-center gap-1.5">
              <span className="font-bold text-[#003366]">संभाजी नगर, अकोट (जि. अकोला)</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-700 font-semibold hidden md:inline">शासकीय नोंदणीकृत प्रमाणपत्र व स्वयंरोजगार मार्गदर्शन</span>
            </p>
          </div>
        </div>

        {/* Official Header Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Course Syllabus Button */}
          <button
            onClick={onOpenCatalog}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[#003366] bg-blue-50 hover:bg-blue-100 font-bold text-xs transition border border-blue-200 shadow-xs"
          >
            <BookOpen className="w-4 h-4 text-[#003366]" />
            <span>{lang === 'hi' ? 'अभ्यासक्रम व सवलत (फी ₹२,०००)' : 'Syllabus & Fee (₹2,000)'}</span>
          </button>

          {/* Primary Sarkari Apply Button */}
          <button
            onClick={onApplyClick}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#e65100] via-[#f57c00] to-[#e65100] hover:from-[#d84315] hover:to-[#ef6c00] text-white font-black text-xs shadow-md flex items-center gap-1.5 transition active:scale-95 border border-amber-300"
          >
            <Award className="w-4 h-4 text-amber-200" />
            <span>{lang === 'hi' ? 'अकोट येथे प्रवेश घ्या' : 'Apply at Akot'}</span>
          </button>

          {/* Sarkari Admin Desk Login Button - Icon Only */}
          <button
            onClick={onToggleAdmin}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center transition hover:shadow-lg ${
              isAdminOpen
                ? 'bg-[#002244] text-amber-300 border-amber-400 shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
            }`}
            title="शासकीय ॲडमिन डेस्क लॉगिन (Admin Portal Login)"
          >
            <ShieldCheck className="w-5 h-5" />
          </button>

        </div>

      </div>

      {/* Official Flash Notice Ticker (शासकीय परिपत्रक / सूचना) */}
      <div className="bg-[#fff9e6] border-t border-amber-300 px-4 py-1.5 text-xs text-amber-950 flex items-center gap-2 overflow-hidden">
        <div className="flex items-center gap-1 bg-[#d97706] text-white font-extrabold px-2 py-0.5 rounded text-[10px] shrink-0 uppercase tracking-wider shadow-2xs">
          <Bell className="w-3 h-3 text-white animate-bounce" />
          <span>शासकीय सूचना</span>
        </div>
        <div className="truncate font-semibold text-slate-800 text-[11.5px]">
          {lang === 'hi'
            ? '📢 सौंदर्य शास्त्र प्रमाणपत्र कोर्स २०२५-२६: संभाजी नगर, अकोट येथे थ्रेडिंग, वॅक्सिंग, फेशिअल, मेकअप प्रॅक्टिकल बॅचेस सुरू • एकूण सवलत फी फक्त ₹२,०००/- • अधिकृत प्रमाणपत्र.'
            : '📢 Soundarya Shastra Certificate Course 2025-26: Akot Training Center admissions open with subsidized fee ₹2,000 only.'}
        </div>
      </div>

    </header>
  );
};
