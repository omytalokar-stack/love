import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Sparkles,
  MapPin,
  Building2,
  FileCheck,
  Banknote,
  GraduationCap,
  Landmark,
  BookOpen,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { Language } from '../types';
import { ORG_DETAILS, SYLLABUS_MODULES } from '../data/coursesData';

interface GovtBannerAndHighlightsProps {
  lang: Language;
  onApplyClick: () => void;
}

export const GovtBannerAndHighlights: React.FC<GovtBannerAndHighlightsProps> = ({
  lang,
  onApplyClick
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const highlights = [
    {
      icon: MapPin,
      color: 'text-[#003366] bg-blue-50 border-blue-200',
      title: lang === 'hi' ? 'मुख्य केंद्र: प्रिंसेस ब्युटी पार्लर' : 'Main Center: Princess Parlour',
      desc: lang === 'hi' ? 'संभाजी नगर, अकोट (जि. अकोला) येथे थेट प्रॅक्टिकल' : 'Sambhaji Nagar, Akot (Dist. Akola) practical training'
    },
    {
      icon: Banknote,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      title: lang === 'hi' ? 'संपूर्ण कोर्स फी फक्त ₹२,०००/-' : 'Complete Course Fee ₹2,000',
      desc: lang === 'hi' ? 'सर्व प्रॅक्टिकल विषयांसाठी नाममात्र शासकीय सवलत फी' : 'Nominal fees with complete hands-on practical in Akot'
    },
    {
      icon: Landmark,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      title: lang === 'hi' ? 'शासकीय नोंदणीकृत प्रमाणपत्र' : 'Govt. Registered Certificate',
      desc: lang === 'hi' ? 'मुक्ता शिक्षण प्रसारक मंडळ अकोला (र.नं. ४४२५/१५)' : 'Mukta Shikshan Prasarak Mandal Akola (Reg. No. 4425/15)'
    },
    {
      icon: Briefcase,
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      title: lang === 'hi' ? 'शासकीय योजना व स्वयंरोजगार' : 'Govt. Schemes & Self-Employment',
      desc: lang === 'hi' ? 'स्वतःचे पार्लर सुरू करण्यासाठी संस्था संपूर्ण मार्गदर्शन करेल' : 'Guidance to avail govt scheme loans & launch own salon'
    }
  ];

  const faqs = [
    {
      q: 'प्रशिक्षण केंद्र कुठे आहे आणि पत्ता काय आहे?',
      a: 'मुख्य प्रशिक्षण केंद्र "प्रिंसेस ब्युटी पार्लर", संभाजी नगर, अकोट (जि. अकोला) येथे आहे. येथे सर्व विषयांचे थेट प्रात्यक्षिक (Practical) व मॉडेलवर सराव करून घेतला जातो.'
    },
    {
      q: 'कोर्सची एकूण फी किती आहे व काही छुपे शुल्क आहे का?',
      a: 'कोर्सची संपूर्ण सवलत फी फक्त ₹२,०००/- (दोन हजार रुपये) आहे. यात सर्व प्रॅक्टिकल विषय व परीक्षा शुल्क समाविष्ट आहे.'
    },
    {
      q: 'कोर्स पूर्ण झाल्यावर कोणते प्रमाणपत्र मिळेल?',
      a: 'कोर्स यशस्वीरीत्या पूर्ण केल्यावर मुक्ता शिक्षण प्रसारक मंडळ अकोला (महाराष्ट्र गव्हें र.नं. ४४२५/१५, मुंबई एफ/नं. ३६१५/१५) चे अधिकृत शासकीय नोंदणीकृत प्रमाणपत्र दिले जाईल.'
    },
    {
      q: 'या प्रमाणपत्राचा काय फायदा होईल?',
      a: 'या प्रमाणपत्राच्या आधारे आपण स्वतःचे ब्युटी पार्लर सुरू करू शकता तसेच शासनाच्या विविध स्वयंरोजगार कर्ज योजना व महिला अनुदानाचा लाभ घेऊ शकता.'
    },
    {
      q: 'कोर्समध्ये कोणकोणते प्रॅक्टिकल विषय शिकवले जातील?',
      a: 'थ्रेडिंग, वॅक्सिंग, फेशिअल, ब्लीच, हेअर कट, केमिकल डाय, मेंदी डाय, पेडीक्युर, मॅनीक्युर, स्ट्रेटनिंग, हेअर स्टाईल, मेकअप, साडी ड्रेपिंग, हेअर सेटिंग इत्यादी सर्व १३+ विषयांचे परिपूर्ण प्रॅक्टिकल शिकवले जाईल.'
    }
  ];

  return (
    <section className="space-y-8 my-8">
      
      {/* Official Slogan & Organization Banner - Government Portal Style Card */}
      <div className="bg-white border-2 border-[#003366]/20 rounded-2xl p-6 shadow-sm text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#002244] text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 shadow-xs">
          <Landmark className="w-3.5 h-3.5 text-amber-400" />
          <span>{ORG_DETAILS.slogan}</span>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-black text-[#002244] font-serif">
          {ORG_DETAILS.parlourName}
        </h3>
        
        <p className="text-xs sm:text-sm font-bold text-[#003366] mt-1 flex items-center justify-center gap-1">
          <MapPin className="w-4 h-4 text-amber-600" />
          <span>{ORG_DETAILS.parlourAddress}</span>
        </p>

        <p className="text-xs text-slate-600 mt-1 font-medium">
          अधिकृत सहकार्य: <strong className="text-slate-900 font-bold">{ORG_DETAILS.regdOrgName}</strong> ({ORG_DETAILS.govtRegNumber}) • {ORG_DETAILS.headOffice}
        </p>
      </div>

      {/* 4 Pillars Grid - Official Govt Portal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-[#003366] transition flex items-start gap-3.5"
            >
              <div className={`p-3 rounded-xl border ${item.color} shrink-0 shadow-xs`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#002244] text-sm leading-snug">{item.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete Requested Modules Syllabus Display Box (संस्थेची वैशिष्ट्ये) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-300 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003366] uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4 text-[#003366]" />
              <span>{lang === 'hi' ? 'संस्थेची वैशिष्ट्ये • संपूर्ण प्रॅक्टिकल अभ्यासक्रम' : 'Course Syllabus & Special Features'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#002244] font-serif">
              सौंदर्य शास्त्र प्रमाणपत्र कोर्स - प्रॅक्टिकल मॉड्युल्स
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              प्रशिक्षण केंद्र: <strong className="text-[#003366]">प्रिंसेस ब्युटी पार्लर, संभाजी नगर, अकोट</strong> • फी फक्त ₹२,०००/-
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#002244] to-[#003366] text-white px-5 py-3 rounded-xl border border-amber-400/50 shadow-md text-center shrink-0">
            <span className="text-[10px] text-amber-300 block uppercase font-bold tracking-wider">संपूर्ण कोर्स फी</span>
            <span className="text-2xl font-black text-amber-300 font-mono">₹२,०००/-</span>
          </div>
        </div>

        {/* 13 Syllabus Topics Grid from Pamphlet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {SYLLABUS_MODULES.map((mod, index) => (
            <div
              key={mod.id}
              className="p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-[#003366] hover:bg-blue-50/50 transition flex items-center gap-3 shadow-2xs group"
            >
              <div className="w-7 h-7 rounded-lg bg-[#003366] text-white flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-[#e65100] transition shadow-2xs">
                {index + 1}
              </div>
              <div className="truncate">
                <span className="text-xs sm:text-sm font-bold text-slate-900 block truncate">{mod.nameHi}</span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium block truncate">{mod.nameEn}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Government Scheme Benefit Notice from Pamphlet */}
        <div className="bg-gradient-to-r from-[#002244] via-[#003366] to-[#002244] text-white p-5 rounded-xl border border-amber-400/40 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-white/10 border border-white/20 text-amber-300 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-base text-amber-300 font-serif">
                शासकीय योजना व स्वयंरोजगार मार्गदर्शन
              </h4>
              <p className="text-xs sm:text-sm text-slate-100 mt-1 leading-relaxed">
                "{ORG_DETAILS.schemeNotice}"
              </p>
            </div>
          </div>

          <button
            onClick={onApplyClick}
            className="px-6 py-3 bg-[#e65100] hover:bg-[#d84315] text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-md active:scale-95 transition shrink-0 border border-amber-300"
          >
            अकोट येथे प्रवेश घ्या (Apply at Akot)
          </button>
        </div>
      </div>

      {/* Govt Authorization Certificate Proof Card */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#002244] via-[#003366] to-[#001f3f] text-white p-6 md:p-9 overflow-hidden shadow-lg border-2 border-amber-400/60">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-amber-300/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>प्रशिक्षण केंद्र: संभाजी नगर, अकोट</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-serif text-white leading-tight">
              {ORG_DETAILS.parlourName}
            </h3>

            <p className="text-sm text-slate-100 leading-relaxed">
              प्रिंसेस ब्युटी पार्लर (संभाजी नगर, अकोट, जि. अकोला) यांनी <strong>मुक्ता शिक्षण प्रसारक मंडळ अकोला</strong> (महाराष्ट्र गव्हें र.नं. ४४२५/१५, मुंबई एफ/नं. ३६१५/१५) यांच्याशी करार केला असून, अकोट व परिसरातील महिलांसाठी अधिकृत सौंदर्य शास्त्र कोर्स सुरू केला आहे. कोर्स पूर्ण झाल्यावर शासकीय नोंदणीकृत अधिकृत प्रमाणपत्र दिले जाईल.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-xs border border-white/15 text-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>सर्व विषयांचे परिपूर्ण प्रॅक्टिकल प्रशिक्षण</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-xs border border-white/15 text-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>शासकीय विविध योजनांचा लाभ</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-xs border border-white/15 text-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>स्वयंरोजगार सुरू करण्यासाठी १००% मार्गदर्शन</span>
              </div>
            </div>
          </div>

          {/* Action Box */}
          <div className="lg:col-span-4 bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-xs text-center space-y-3 shadow-md">
            <div className="w-14 h-14 mx-auto rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xl shadow-md">
              <Landmark className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase block tracking-wider">प्रवेश देणे सुरु आहे</span>
              <span className="text-xl font-black text-white font-serif block mt-0.5">संभाजी नगर, अकोट</span>
              <span className="text-xs text-slate-200 block">एकूण फी: फक्त ₹२,०००/-</span>
            </div>
            <button
              onClick={onApplyClick}
              className="w-full py-3 px-4 bg-[#e65100] hover:bg-[#d84315] text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-md transition active:scale-95 border border-amber-300"
            >
              {lang === 'hi' ? 'ऑनलाइन फॉर्म भरा (Apply Now)' : 'Fill Application Form'}
            </button>
          </div>

        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <HelpCircle className="w-5 h-5 text-[#003366]" />
          <h4 className="font-bold text-lg text-[#002244] font-serif">
            {lang === 'hi' ? 'वारंवार विचारले जाणारे प्रश्न (FAQ)' : 'Frequently Asked Questions'}
          </h4>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-800 hover:bg-slate-100 transition"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#003366] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#003366] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed bg-white border-t border-slate-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
