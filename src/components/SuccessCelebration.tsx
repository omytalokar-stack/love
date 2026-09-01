import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Printer, Share2, CheckCircle2, Award, Calendar, ShieldCheck, ArrowRight, PlusCircle, MapPin, Landmark } from 'lucide-react';
import { CandidateRegistration, Language } from '../types';
import { ORG_DETAILS } from '../data/coursesData';

interface SuccessCelebrationProps {
  candidate: CandidateRegistration;
  lang: Language;
  onViewCard: () => void;
  onReset: () => void;
}

export const SuccessCelebration: React.FC<SuccessCelebrationProps> = ({
  candidate,
  lang,
  onViewCard,
  onReset
}) => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `🏛️ *${ORG_DETAILS.parlourName.toUpperCase()}*\n` +
      `📍 *पत्ता:* ${ORG_DETAILS.parlourAddress}\n` +
      `📜 *सौंदर्य शास्त्र प्रमाणपत्र कोर्स - प्रवेश निश्चित झाला आहे*\n\n` +
      `👤 *नाव / Name:* ${candidate.fullName}\n` +
      `🆔 *नोंदणी क्रमांक / Reg ID:* ${candidate.regNumber}\n` +
      `📚 *कोर्स / Course:* ${candidate.courseName}\n` +
      `⏰ *बॅच / Batch:* ${candidate.batchTiming}\n` +
      `📍 *प्रशिक्षण केंद्र:* प्रिंसेस ब्युटी पार्लर, संभाजी नगर, अकोट\n` +
      `💰 *फी / Fee:* ₹२,०००/- (शासकीय सवलत फी)\n\n` +
      `प्रिंसेस ब्युटी पार्लर (अकोट) मध्ये माझा प्रवेश यशस्वीरीत्या नोंदवला गेला आहे!`
    );
    window.open(`https://api.whatsapp.com/send?phone=91${candidate.whatsappNumber || candidate.mobileNumber}&text=${text}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto my-8 bg-white rounded-2xl border border-slate-300 shadow-xl overflow-hidden text-slate-900"
    >
      {/* Top Banner - Government Deep Navy & Gold */}
      <div className="bg-gradient-to-r from-[#002244] via-[#003366] to-[#001f3f] text-white p-8 text-center relative overflow-hidden border-b border-amber-400">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-600 flex items-center justify-center text-white mb-3 shadow-lg ring-4 ring-white/20">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF9933] text-slate-950 text-xs font-black uppercase tracking-wider mb-2 shadow-xs">
          <Landmark className="w-3.5 h-3.5 text-slate-950" />
          <span>{lang === 'hi' ? 'अकोट केंद्रात प्रवेश निश्चित' : 'Admission Confirmed at Akot'}</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black font-serif text-white">
          {lang === 'hi' ? 'अभिनंदन! प्रिंसेस ब्युटी पार्लरमध्ये प्रवेश निश्चित' : 'Congratulations! Admission Confirmed'}
        </h2>
        
        <p className="text-slate-200 text-xs md:text-sm mt-1 max-w-md mx-auto">
          {lang === 'hi'
            ? 'प्रिंसेस ब्युटी पार्लर (संभाजी नगर, अकोट) चे अधिकृत प्रवेश पत्र तयार झाले आहे.'
            : 'Your official printable Student Admission Slip & ID Card for Akot Center is ready.'}
        </p>

        {/* Big Reg Number */}
        <div className="mt-4 inline-block bg-black/40 border border-amber-400/60 rounded-xl px-6 py-2.5 backdrop-blur-xs shadow-md">
          <span className="text-[10px] text-amber-300 font-bold uppercase block tracking-widest">नोंदणी क्रमांक (Registration Number)</span>
          <span className="font-mono text-xl md:text-2xl font-black text-amber-300 tracking-widest">
            {candidate.regNumber}
          </span>
        </div>
      </div>

      {/* Candidate Card Summary */}
      <div className="p-6 md:p-8 space-y-6 bg-white">
        
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-2xs">
          <div className="w-16 h-20 rounded-lg overflow-hidden border-2 border-[#003366] shadow-xs shrink-0 bg-white">
            <img
              src={candidate.photoBase64 || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={candidate.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900 font-serif">{candidate.fullName}</h4>
            <p className="text-xs text-[#003366] font-bold">{candidate.courseName}</p>
            <div className="flex items-center gap-1 text-xs text-slate-700 font-semibold mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>प्रशिक्षण केंद्र: प्रिंसेस ब्युटी पार्लर, संभाजी नगर, अकोट</span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              ⏰ बॅच वेळ: {candidate.batchTiming}
            </p>
          </div>
        </div>

        {/* Benefits Applied Box */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
          <div className="font-bold text-[#002244] uppercase flex items-center gap-1.5 font-serif">
            <Award className="w-4 h-4 text-[#003366]" />
            <span>{lang === 'hi' ? 'कोर्सची वैशिष्ट्ये व शासकीय लाभ:' : 'Course Highlights & Govt Benefits:'}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#003366]" />
              <span>थ्रेडिंग, वॅक्सिंग, फेशिअल, हेअर कट, मेकअप थेट प्रॅक्टिकल</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#003366]" />
              <span>मुक्ता शिक्षण प्रसारक मंडळ अकोला अधिकृत प्रमाणपत्र</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#003366]" />
              <span>शासकीय विविध योजनांचा लाभ व मार्गदर्शन</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#003366]" />
              <span>स्वतःचे पार्लर सुरू करण्यासाठी १००% मार्गदर्शन</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={onViewCard}
            className="w-full py-3.5 px-6 bg-[#e65100] hover:bg-[#d84315] text-white font-black rounded-xl text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-[0.98] border border-amber-300"
          >
            <Printer className="w-5 h-5" />
            <span>{lang === 'hi' ? 'अकोट प्रवेश पत्र (ID Card) पहा व प्रिंट करा' : 'View & Print Official Admission Card'}</span>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleWhatsApp}
              className="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-2xs transition"
            >
              <Share2 className="w-4 h-4" />
              <span>{lang === 'hi' ? 'WhatsApp वर शेअर करा' : 'Share on WhatsApp'}</span>
            </button>

            <button
              onClick={onReset}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition border border-slate-300"
            >
              <PlusCircle className="w-4 h-4 text-[#003366]" />
              <span>{lang === 'hi' ? 'दुसरा नवीन अर्ज भरा' : 'Register Another Candidate'}</span>
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
