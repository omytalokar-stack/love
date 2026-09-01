import React, { useRef } from 'react';
import { X, Printer, Download, Share2, Award, CheckCircle2, ShieldCheck, Phone, MapPin, Calendar, QrCode, Clock, Tag, Landmark, Building2 } from 'lucide-react';
import { CandidateRegistration, Language } from '../types';
import { ORG_DETAILS } from '../data/coursesData';

interface AdmissionCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: CandidateRegistration | null;
  lang: Language;
}

export const AdmissionCardModal: React.FC<AdmissionCardModalProps> = ({
  isOpen,
  onClose,
  candidate,
  lang
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !candidate) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🏛️ *${ORG_DETAILS.parlourName.toUpperCase()}*\n` +
      `📍 *पत्ता / Address:* ${ORG_DETAILS.parlourAddress}\n` +
      `🏛️ *सहकार्य / Affiliation:* ${ORG_DETAILS.regdOrgName} (${ORG_DETAILS.govtRegNumber})\n\n` +
      `📜 *सौंदर्य शास्त्र प्रमाणपत्र कोर्स - अधिकृत प्रवेश पत्र / Admission Receipt*\n\n` +
      `👤 *उमेदवाराचे नाव / Name:* ${candidate.fullName}\n` +
      `🆔 *नोंदणी क्रमांक / Reg ID:* ${candidate.regNumber}\n` +
      `📚 *कोर्स / Course:* ${candidate.courseName}\n` +
      `⏰ *बॅच वेळ / Batch:* ${candidate.batchTiming}\n` +
      `📍 *प्रशिक्षण केंद्र:* प्रिंसेस ब्युटी पार्लर, संभाजी नगर, अकोट\n` +
      `💰 *कोर्स फी / Total Fee:* ₹२,०००/- (शासकीय सवलत फी)\n` +
      `✅ *प्रवेश स्थिती / Status:* ${candidate.status}\n\n` +
      `अभिनंदन! प्रिंसेस ब्युटी पार्लर (अकोट) मध्ये आपला प्रवेश यशस्वीरीत्या निश्चित झाला आहे.`
    );
    window.open(`https://api.whatsapp.com/send?phone=91${candidate.whatsappNumber || candidate.mobileNumber}&text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-slate-300 print:shadow-none print:border-none print:max-w-none">
        
        {/* Top Control Bar (Hidden in Print) - Government Navy Blue */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#002244] to-[#003366] text-white border-b border-amber-500/40 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
            <span className="font-semibold text-sm text-slate-100">
              {lang === 'hi' ? 'प्रिंसेस ब्युटी पार्लर, अकोट • अधिकृत प्रवेश पत्र' : 'Princess Beauty Parlour Akot • Admission Slip'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppShare}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition shadow"
              title="Share on WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-amber-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition border border-white/20"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'प्रिंट / सेव PDF' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Certificate / Admission Letter Document */}
        <div ref={cardRef} className="p-6 md:p-8 bg-slate-50 text-slate-900 print:p-4">
          {/* Official Formal Navy & Gold Border Wrapper */}
          <div className="border-4 border-double border-[#003366] rounded-2xl p-5 md:p-7 relative overflow-hidden bg-white shadow-md">
            
            {/* Watermark Emblem background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <Landmark className="w-96 h-96 text-[#003366]" />
            </div>

            {/* Header / Authority Emblem */}
            <div className="text-center pb-4 border-b-2 border-slate-300 relative">
              <div className="inline-flex items-center justify-center gap-2 bg-[#003366] text-white text-[11px] md:text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-xs mb-2 border border-amber-400">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                शासकीय नोंदणीकृत • अधिकृत विद्यार्थी प्रवेश पत्र २०२५-२६
              </div>
              
              {/* PRIMARY FOCUS: PRINCESS BEAUTY PARLOUR AKOT */}
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-serif">
                {ORG_DETAILS.parlourName}
              </h1>
              
              <div className="inline-block bg-blue-50 text-[#003366] font-bold text-xs md:text-sm px-3 py-0.5 rounded-full border border-blue-200 mt-1">
                📍 {ORG_DETAILS.parlourAddress}
              </div>

              <p className="text-[11px] text-slate-600 mt-1.5 font-medium">
                अधिकृत सहकार्य: <strong>{ORG_DETAILS.regdOrgName}</strong> ({ORG_DETAILS.govtRegNumber})
              </p>

              <div className="absolute right-0 top-0 hidden md:block">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">नोंदणी क्रमांक (Reg No.)</span>
                  <span className="font-mono text-sm font-extrabold text-[#003366] bg-slate-100 px-2.5 py-0.5 rounded border border-slate-300">
                    {candidate.regNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* Document Sub-title */}
            <div className="py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-700 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="font-bold uppercase text-slate-900">कोर्स:</span>
                <span className="bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  सौंदर्य शास्त्र प्रमाणपत्र कोर्स (फी फक्त ₹२,०००/-)
                </span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[11px] text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-[#003366]" />
                <span>दिनांक: {new Date(candidate.appliedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-4">
              
              {/* Photo & Verified Badge (Column 1) */}
              <div className="flex flex-col items-center justify-start text-center">
                <div className="relative w-32 h-36 md:w-36 md:h-44 rounded-xl border-2 border-[#003366] p-1 bg-white shadow-md">
                  <img
                    src={candidate.photoBase64 || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={candidate.fullName}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow flex items-center gap-1 whitespace-nowrap border border-emerald-300">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    VERIFIED CANDIDATE
                  </div>
                </div>

                <div className="mt-4 text-[10px] text-slate-600">
                  <div className="font-semibold text-slate-900">छायाचित्र पडताळणी:</div>
                  <span className="uppercase text-[#003366] font-bold">{candidate.photoSource} Live Verified</span>
                </div>

                <div className="mt-2.5 p-2 bg-slate-50 rounded-lg w-full flex flex-col items-center border border-slate-200">
                  <QrCode className="w-12 h-12 text-[#003366]" />
                  <span className="text-[8px] font-mono text-slate-500 mt-1">अकोट केंद्र नोंदणी QR कोड</span>
                </div>
              </div>

              {/* Candidate Info Details (Columns 2, 3, 4) */}
              <div className="md:col-span-3 flex flex-col justify-between space-y-3.5">
                
                {/* Name & Occupation */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">उमेदवाराचे पूर्ण नाव (Applicant Full Name)</span>
                  <div className="text-xl md:text-2xl font-bold text-slate-900 font-serif">
                    {candidate.fullName}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded-md border border-slate-300">
                      वय: {candidate.age} वर्षे
                    </span>
                    <span className="bg-blue-50 text-[#003366] text-xs font-semibold px-2.5 py-0.5 rounded-md border border-blue-200">
                      व्यवसाय: {candidate.currentOccupation}
                    </span>
                    {candidate.educationQualification && (
                      <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-0.5 rounded-md border border-slate-200">
                        शिक्षण: {candidate.educationQualification}
                      </span>
                    )}
                  </div>
                </div>

                {/* Course & Batch Details Box */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#003366] uppercase">
                    <Award className="w-4 h-4 text-[#003366]" />
                    प्रवेश घेतलेला कोर्स व मुख्य केंद्र
                  </div>
                  <div className="text-sm md:text-base font-bold text-slate-900 mt-0.5 font-serif">
                    {candidate.courseName}
                  </div>
                  <div className="text-xs text-[#003366] font-semibold mt-0.5">
                    📍 प्रशिक्षण केंद्र: प्रिंसेस ब्युटी पार्लर, संभाजी नगर, अकोट
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#003366]" />
                      <span><strong>बॅच वेळ:</strong> {candidate.batchTiming}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="text-emerald-800 font-bold">
                        <strong>एकूण फी:</strong> ₹२,०००/- (पूर्ण पेड/निश्चित)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact & Location Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">मोबाईल व WhatsApp</span>
                    <div className="flex items-center gap-1.5 font-semibold text-slate-900 mt-0.5">
                      <Phone className="w-3.5 h-3.5 text-[#003366]" />
                      <span>+91 {candidate.mobileNumber}</span>
                      {candidate.whatsappNumber && candidate.whatsappNumber !== candidate.mobileNumber && (
                        <span className="text-slate-500 font-normal">/ WA: {candidate.whatsappNumber}</span>
                      )}
                    </div>
                    {candidate.instagramId && (
                      <div className="text-[11px] text-pink-700 font-medium mt-1">
                        Insta: @{candidate.instagramId.replace('@', '')}
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">कायमचा पत्ता व तालुका</span>
                    <div className="flex items-start gap-1.5 text-slate-700 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#003366] shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-tight">
                        <p>{candidate.streetAddress}</p>
                        <p className="font-semibold text-slate-900">
                          तालुका: {candidate.taluka}, जिल्हा: {candidate.district}, {candidate.state} - {candidate.pincode}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Career Objective / Reason */}
                {candidate.reasonForJoining && (
                  <div className="text-[11px] text-slate-800 bg-blue-50/50 px-3 py-1.5 rounded-lg border border-blue-100">
                    <strong className="text-[#003366] font-semibold">उद्दिष्ट / Reason:</strong>{' '}
                    <span>{candidate.reasonForJoining}</span>
                    {candidate.customReason && <span className="italic ml-1">({candidate.customReason})</span>}
                  </div>
                )}

              </div>
            </div>

            {/* Official Notice on Certificate */}
            <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-[10px] text-amber-950 leading-relaxed mb-3">
              <strong className="text-[#003366]">शासकीय सूचना:</strong> "{ORG_DETAILS.schemeNotice}"
            </div>

            {/* Bottom Govt Terms & Official Signatures */}
            <div className="pt-3 border-t-2 border-dashed border-slate-300 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              
              {/* Instructions */}
              <div className="md:col-span-2 text-[10px] text-slate-600 space-y-1">
                <p className="font-bold text-slate-900 uppercase">उमेदवारांसाठी महत्त्वाच्या सूचना:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                  <li>हे प्रवेश पत्र <strong>प्रिंसेस ब्युटी पार्लर, संभाजी नगर, अकोट</strong> येथे सादर करावे.</li>
                  <li>कोर्स पूर्ण झाल्यानंतर शासकीय नोंदणीकृत प्रमाणपत्र प्रदान केले जाईल.</li>
                  <li>शासकीय विविध योजनांचा लाभ व स्वयंरोजगार सुरू करण्यासाठी संस्थेचे मार्गदर्शन मिळेल.</li>
                </ul>
              </div>

              {/* Signature & Seal */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-36 h-12 flex items-center justify-center relative">
                  <div className="text-[#003366] font-serif italic text-xs font-bold rotate-[-2deg]">
                    प्रिंसेस ब्युटी पार्लर (अकोट)
                  </div>
                  {/* Circular seal stamp */}
                  <div className="absolute -right-2 top-0 w-12 h-12 rounded-full border-2 border-[#003366] flex items-center justify-center text-[7px] text-[#003366] font-bold text-center leading-tight rotate-12 opacity-90 pointer-events-none bg-white/70">
                    प्रिंसेस पार्लर<br/>संभाजी नगर<br/>अकोट
                  </div>
                </div>
                <div className="w-full border-t border-slate-400 pt-1">
                  <p className="text-[10px] font-bold text-slate-900">अधिकृत संचालक / केंद्र प्रमुख</p>
                  <p className="text-[9px] text-slate-600">प्रिंसेस ब्युटी पार्लर व अकॅडमी, अकोट</p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Bar Actions (Hidden in Print) */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="text-xs text-slate-700 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
            <span className="font-semibold text-emerald-800">प्रवेश निश्चित (Confirmed) • प्रिंसेस पार्लर अकोट</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs transition border border-slate-300"
            >
              {lang === 'hi' ? 'बंद करा (Close)' : 'Close'}
            </button>
            <button
              onClick={handlePrint}
              className="px-6 py-2.5 bg-gradient-to-r from-[#002244] to-[#003366] hover:from-[#001833] hover:to-[#002244] text-white font-bold rounded-xl text-xs shadow-md flex items-center gap-2 transition border border-amber-400/40"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              {lang === 'hi' ? 'प्रवेश पत्र प्रिंट करा' : 'Print Admission Letter'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
