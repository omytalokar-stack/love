import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Phone,
  Eye,
  CheckCircle2,
  Clock,
  Printer,
  Trash2,
  Plus,
  RefreshCw,
  Award,
  Calendar,
  Share2,
  Instagram,
  FileSpreadsheet,
  Check,
  ShieldCheck,
  X,
  MapPin,
  Landmark,
  Building2
} from 'lucide-react';
import { CandidateRegistration, Language } from '../types';
import { getSavedCandidates, updateCandidateStatus, deleteCandidate, saveCandidate, generateRegistrationNumber } from '../utils/storage';
import { COURSES, ORG_DETAILS } from '../data/coursesData';

interface AdminPortalProps {
  lang: Language;
  onOpenCard: (candidate: CandidateRegistration) => void;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  lang,
  onOpenCard,
  onClose
}) => {
  const [candidates, setCandidates] = useState<CandidateRegistration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [courseFilter, setCourseFilter] = useState<string>('ALL');
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateRegistration | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const loadData = async () => {
    const data = await getSavedCandidates();
    setCandidates(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (
    id: string,
    newStatus: 'Approved' | 'Verified' | 'Pending Verification',
    feeStatus?: 'Pending at Center' | 'Token Paid' | 'Full Paid'
  ) => {
    const updated = await updateCandidateStatus(id, newStatus, feeStatus);
    setCandidates(updated);
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate({
        ...selectedCandidate,
        status: newStatus,
        ...(feeStatus ? { feePaidStatus: feeStatus } : {})
      });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove application for ${name}?`)) {
      const updated = await deleteCandidate(id);
      setCandidates(updated);
      if (selectedCandidate?.id === id) {
        setIsDetailModalOpen(false);
        setSelectedCandidate(null);
      }
    }
  };

  // Export to CSV / Excel format
  const exportToCSV = () => {
    if (candidates.length === 0) return;

    const headers = [
      'Reg Number',
      'Full Name',
      'First Name',
      'Middle Name',
      'Surname',
      'Mobile Number',
      'WhatsApp',
      'Age',
      'Education',
      'Occupation',
      'Reason For Joining',
      'Course',
      'Batch Timing',
      'State',
      'District',
      'Taluka',
      'Pincode',
      'Address',
      'Instagram ID',
      'Govt Subsidy Applied',
      'Status',
      'Fee Status',
      'Applied Date'
    ];

    const rows = candidates.map(c => [
      `"${c.regNumber}"`,
      `"${c.fullName}"`,
      `"${c.firstName}"`,
      `"${c.middleName || ''}"`,
      `"${c.lastName}"`,
      `"${c.mobileNumber}"`,
      `"${c.whatsappNumber}"`,
      c.age,
      `"${c.educationQualification}"`,
      `"${c.currentOccupation}"`,
      `"${c.reasonForJoining} ${c.customReason || ''}"`,
      `"${c.courseName}"`,
      `"${c.batchTiming}"`,
      `"${c.state}"`,
      `"${c.district}"`,
      `"${c.taluka}"`,
      `"${c.pincode}"`,
      `"${c.streetAddress.replace(/"/g, '""')}"`,
      `"${c.instagramId || ''}"`,
      c.govtSubsidyApplied ? 'YES' : 'NO',
      `"${c.status}"`,
      `"${c.feePaidStatus}"`,
      `"${new Date(c.appliedAt).toLocaleDateString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Princess_Parlour_Candidates_Akot_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered list
  const filteredCandidates = candidates.filter(c => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.mobileNumber.includes(searchTerm) ||
      c.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.taluka.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.courseName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    const matchesCourse = courseFilter === 'ALL' || c.courseId === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  // Direct WhatsApp message from admin to student
  const sendWhatsAppWelcome = (c: CandidateRegistration) => {
    const msg = encodeURIComponent(
      `Namaste ${c.firstName} ji,\n\n` +
      `🏛️ *${ORG_DETAILS.parlourName.toUpperCase()}*\n` +
      `📍 *पत्ता:* ${ORG_DETAILS.parlourAddress}\n` +
      `🏛️ *सहकार्य:* ${ORG_DETAILS.regdOrgName} (${ORG_DETAILS.govtRegNumber})\n\n` +
      `आपला *सौंदर्य शास्त्र प्रमाणपत्र कोर्स (फी ₹२,०००/-)* चा प्रवेश अर्ज यशस्वीरीत्या प्राप्त झाला आहे!\n\n` +
      `🆔 *नोंदणी क्रमांक (Reg ID):* ${c.regNumber}\n` +
      `📚 *कोर्स:* ${c.courseName}\n` +
      `⏰ *बॅच वेळ:* ${c.batchTiming}\n` +
      `📍 *पत्ता:* ${c.taluka}, ${c.district}\n\n` +
      `आपल्याला सर्व विषयांचे परिपूर्ण प्रॅक्टिकल प्रशिक्षण व अधिकृत शासकीय प्रमाणपत्र दिले जाईल. पुढील माहितीसाठी प्रिंसेस ब्युटी पार्लर (अकोट) येथे संपर्क साधा.`
    );
    window.open(`https://api.whatsapp.com/send?phone=91${c.whatsappNumber || c.mobileNumber}&text=${msg}`, '_blank');
  };

  return (
    <div className="bg-[#f3f6fa] text-slate-900 min-h-screen p-4 md:p-8 space-y-6">
      
      {/* Top Admin Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-300">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF9933] text-slate-950 text-xs font-bold uppercase tracking-wider mb-2 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            प्रिंसेस ब्युटी पार्लर (अकोट) • अधिकृत ॲडमिन डेस्क
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#002244] font-serif tracking-tight">
            {lang === 'hi' ? 'उमेदवार प्रवेश व्यवस्थापन पोर्टल' : 'Candidate Admission Management Portal'}
          </h2>
          <p className="text-xs md:text-sm text-slate-600">
            {lang === 'hi'
              ? 'सर्व नोंदणीकृत विद्यार्थिनींचे अर्ज पहा, आय-कार्ड प्रिंट करा व एक्सेल डाऊनलोड करा.'
              : 'Review applications, live camera photos, verify documents and export candidate records.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportToCSV}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{lang === 'hi' ? 'CSV/एक्सेल डाउनलोड' : 'Export to CSV/Excel'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-[#003366] hover:bg-[#002244] text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 transition shadow-2xs"
          >
            <X className="w-4 h-4" />
            <span>{lang === 'hi' ? 'पोर्टल बंद करा' : 'Exit Admin View'}</span>
          </button>
        </div>
      </div>

      {/* Analytics Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-xs font-semibold">Total Applications</div>
          <div className="text-3xl font-black text-[#002244] mt-1">{candidates.length}</div>
          <span className="text-[11px] text-slate-600 font-medium">All registered students</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-xs font-semibold">Approved & Verified</div>
          <div className="text-3xl font-black text-emerald-600 mt-1">
            {candidates.filter(c => c.status === 'Approved').length}
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">Ready for batch</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-xs font-semibold">Govt Subsidy Applied</div>
          <div className="text-3xl font-black text-[#e65100] mt-1">
            {candidates.filter(c => c.govtSubsidyApplied).length}
          </div>
          <span className="text-[11px] text-amber-700 font-medium">₹2,000 Fee Scheme</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-xs font-semibold">Live Camera Captured</div>
          <div className="text-3xl font-black text-[#003366] mt-1">
            {candidates.filter(c => c.photoSource === 'camera').length}
          </div>
          <span className="text-[11px] text-slate-600 font-medium">Direct face verification</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={lang === 'hi' ? 'नाव, मोबाईल, तालुका, नोंदणी क्र. ने शोधा...' : 'Search by Name, Reg No, Mobile, Taluka...'}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:bg-white"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#003366]" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Verified">Verified</option>
            <option value="Pending Verification">Pending</option>
          </select>
        </div>

        {/* Course Filter */}
        <div>
          <select
            value={courseFilter}
            onChange={e => setCourseFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none max-w-xs truncate"
          >
            <option value="ALL">All Courses</option>
            {COURSES.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Candidate Cards / Table */}
      <div className="space-y-3">
        {filteredCandidates.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500">
            <Users className="w-12 h-12 mx-auto mb-2 text-slate-400" />
            <p className="text-sm font-semibold">{lang === 'hi' ? 'कोणताही अर्ज सापडला नाही' : 'No candidates match your search.'}</p>
          </div>
        ) : (
          filteredCandidates.map(cand => (
            <div
              key={cand.id}
              className="bg-white hover:border-[#003366] border border-slate-200 rounded-2xl p-4 md:p-5 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs"
            >
              {/* Left: Photo + Name + Reg No */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-16 rounded-xl border border-slate-300 overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={cand.photoBase64 || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt={cand.fullName}
                    className="w-full h-full object-cover"
                  />
                  <span className={`absolute bottom-0 inset-x-0 text-[8px] font-bold text-center text-white py-0.5 ${cand.photoSource === 'camera' ? 'bg-emerald-700' : 'bg-slate-700'}`}>
                    {cand.photoSource === 'camera' ? 'LIVE' : 'FILE'}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#003366] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {cand.regNumber}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {new Date(cand.appliedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 mt-1 font-serif">
                    {cand.fullName}
                  </h4>

                  <p className="text-xs text-[#003366] font-semibold line-clamp-1">
                    {cand.courseName}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600 mt-1">
                    <span>📍 {cand.taluka}, {cand.district} ({cand.state})</span>
                    <span>• Age: {cand.age} Yrs</span>
                    <span>• Occ: {cand.currentOccupation}</span>
                    {cand.instagramId && (
                      <span className="text-pink-600 font-medium">@{cand.instagramId}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex flex-wrap items-center gap-2 self-end md:self-center">
                {/* Status selector */}
                <select
                  value={cand.status}
                  onChange={e => handleStatusChange(cand.id, e.target.value as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none ${
                    cand.status === 'Approved'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : cand.status === 'Verified'
                      ? 'bg-blue-50 text-[#003366] border-blue-300'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}
                >
                  <option value="Pending Verification">Pending</option>
                  <option value="Verified">Verified</option>
                  <option value="Approved">Approved</option>
                </select>

                {/* WhatsApp button */}
                <button
                  onClick={() => sendWhatsAppWelcome(cand)}
                  className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white transition shadow-2xs"
                  title="WhatsApp Candidate"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {/* Print/View Card */}
                <button
                  onClick={() => onOpenCard(cand)}
                  className="px-3.5 py-2 bg-[#e65100] hover:bg-[#d84315] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition border border-amber-300"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'प्रवेश पत्र पहा' : 'View ID Card'}</span>
                </button>

                {/* View Full Detail Modal */}
                <button
                  onClick={() => {
                    setSelectedCandidate(cand);
                    setIsDetailModalOpen(true);
                  }}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition border border-slate-300"
                  title="Full Details"
                >
                  <Eye className="w-4 h-4" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(cand.id, cand.fullName)}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 transition border border-slate-300"
                  title="Delete Application"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Candidate Full Profile Detail Modal */}
      {isDetailModalOpen && selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white border border-slate-300 rounded-2xl overflow-hidden shadow-2xl p-6 text-slate-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#003366] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold">
                  {selectedCandidate.regNumber}
                </span>
                <span className="font-bold text-sm font-serif">Application Details</span>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-20 h-24 rounded-xl border-2 border-[#003366] overflow-hidden shrink-0 shadow-xs bg-slate-100">
                <img
                  src={selectedCandidate.photoBase64}
                  alt={selectedCandidate.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-serif">{selectedCandidate.fullName}</h3>
                <p className="text-xs text-[#003366] font-semibold">{selectedCandidate.courseName}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                  <span>Age: {selectedCandidate.age} Yrs</span>
                  <span>• {selectedCandidate.currentOccupation}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Phone</span>
                <p className="font-semibold text-slate-900 mt-0.5">+91 {selectedCandidate.mobileNumber}</p>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">WhatsApp</span>
                <p className="font-semibold text-slate-900 mt-0.5">+91 {selectedCandidate.whatsappNumber}</p>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Batch Timing</span>
                <p className="font-semibold text-slate-900 mt-0.5">{selectedCandidate.batchTiming}</p>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Instagram</span>
                <p className="font-semibold text-pink-600 mt-0.5">{selectedCandidate.instagramId ? `@${selectedCandidate.instagramId}` : 'Not provided'}</p>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 text-[10px] uppercase block">Full Address</span>
                <p className="text-slate-700 mt-0.5">
                  {selectedCandidate.streetAddress}, {selectedCandidate.taluka}, {selectedCandidate.district}, {selectedCandidate.state} - {selectedCandidate.pincode}
                </p>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 text-[10px] uppercase block">Goal / Reason for joining</span>
                <p className="text-[#003366] font-medium mt-0.5">{selectedCandidate.reasonForJoining} {selectedCandidate.customReason ? `(${selectedCandidate.customReason})` : ''}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  onOpenCard(selectedCandidate);
                }}
                className="px-5 py-2.5 bg-[#e65100] hover:bg-[#d84315] text-white font-bold rounded-xl text-xs flex items-center gap-2 border border-amber-300 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Card</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
