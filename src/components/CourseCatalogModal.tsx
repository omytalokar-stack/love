import React from 'react';
import { X, Check, Award, Clock, BookOpen, ShieldCheck, Building2, CheckCircle2, Landmark } from 'lucide-react';
import { Course, Language } from '../types';
import { COURSES, SYLLABUS_MODULES, ORG_DETAILS } from '../data/coursesData';

interface CourseCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: (courseId: string) => void;
  lang: Language;
}

export const CourseCatalogModal: React.FC<CourseCatalogModalProps> = ({
  isOpen,
  onClose,
  onSelectCourse,
  lang
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-slate-300">
        
        {/* Header - Official Government Navy & Amber */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#002244] via-[#003366] to-[#001f3f] text-white border-b border-amber-400">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg border border-amber-400/50">
              <BookOpen className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg font-serif text-white">
                {lang === 'hi'
                  ? 'शासकीय नोंदणीकृत सौंदर्य शास्त्र कोर्स अभ्यासक्रम (Syllabus)'
                  : 'Official Government Registered Soundarya Shastra Syllabus'}
              </h3>
              <p className="text-xs text-slate-200">
                {lang === 'hi'
                  ? '१००% प्रॅक्टिकल व थेट मॉडेल ट्रेनिंग • प्रिंसेस ब्युटी पार्लर, संभाजी नगर, अकोट'
                  : '100% Practical Training at Princess Beauty Parlour, Sambhaji Nagar, Akot'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 bg-[#f8fafc]">
          
          {/* Main 13 Modules Highlights Grid */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#002244] border-b border-slate-200 pb-3 font-serif">
              <Award className="w-4 h-4 text-[#003366]" />
              <span>{lang === 'hi' ? 'संस्थेची वैशिष्ट्ये • सर्व १३ प्रॅक्टिकल विषय' : 'Course Syllabus Modules (All 13 Practical Topics)'}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {SYLLABUS_MODULES.map((mod, idx) => (
                <div key={mod.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#003366] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <div className="truncate">
                    <span className="text-xs font-bold text-slate-900 block truncate">{mod.nameHi}</span>
                    <span className="text-[10px] text-slate-500 block truncate">{mod.nameEn}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Courses List */}
          {COURSES.map(course => (
            <div
              key={course.id}
              className="p-5 md:p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#003366] transition space-y-4 shadow-2xs"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold bg-blue-50 text-[#003366] border border-blue-200 px-2.5 py-0.5 rounded-md">
                      {lang === 'hi' ? course.badgeHi : course.badge}
                    </span>
                    <span className="text-xs text-slate-600 font-medium">
                      ⏱ {lang === 'hi' ? course.durationHi : course.duration}
                    </span>
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-[#002244] font-serif">
                    {lang === 'hi' ? course.nameHi : course.name}
                  </h4>
                  <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                    📜 {lang === 'hi' ? course.certificationTypeHi : course.certificationType}
                  </p>
                </div>

                {/* Price & Select */}
                <div className="flex items-center gap-4 self-end md:self-auto">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through">₹{course.originalFee.toLocaleString('en-IN')}</span>
                    <div className="text-xl font-black text-[#003366] font-mono">
                      ₹{course.subsidizedFee.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      शासकीय सवलत फी
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectCourse(course.id);
                      onClose();
                    }}
                    className="px-5 py-2.5 bg-[#e65100] hover:bg-[#d84315] text-white font-bold text-xs rounded-xl shadow-md border border-amber-300 transition active:scale-95"
                  >
                    {lang === 'hi' ? 'हा कोर्स निवडा' : 'Select Course'}
                  </button>
                </div>
              </div>

              {/* Topics Syllabus Grid */}
              <div className="text-xs">
                <h5 className="font-bold text-[#002244] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-serif">
                  <Award className="w-3.5 h-3.5 text-[#003366]" />
                  <span>{lang === 'hi' ? 'प्रॅक्टिकल व थिअरी अभ्यासक्रम' : 'Key Syllabus Modules'}</span>
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {(lang === 'hi' ? course.topicsHi : course.topics).map((topic, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Scheme Notice */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#003366]">शासकीय सवलत योजना सूचना:</p>
              <p className="mt-0.5 text-slate-700">
                "{ORG_DETAILS.schemeNotice}"
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition border border-slate-300"
          >
            {lang === 'hi' ? 'बंद करा (Close)' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
