import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Lock, Key, X, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Credentials
  const ADMIN_ID = 'om';
  const ADMIN_PASSWORD = 'pange';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
      setIsLoading(false);
      setId('');
      setPassword('');
      onLoginSuccess();
    } else {
      setError('अमान्य ID किंवा पासवर्ड (Invalid ID or Password)');
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#002244] to-[#003366] text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-400/20 rounded-xl flex items-center justify-center border border-amber-400/40">
                    <ShieldCheck className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black">ॲडमिन प्रवेश</h2>
                    <p className="text-amber-200 text-xs font-medium">Admin Portal Access</p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1.5 hover:bg-white/10 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                <p className="text-sm text-slate-600 text-center font-medium">
                  सर्व रजिस्ट्रेशन फॉर्म व तपशील पहा
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-gap-2"
                    >
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700 font-medium">{error}</p>
                    </motion.div>
                  )}

                  {/* ID Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      <Lock className="w-4 h-4 inline mr-2 text-[#003366]" />
                      ॲडमिन ID
                    </label>
                    <input
                      type="text"
                      value={id}
                      onChange={(e) => {
                        setId(e.target.value);
                        setError('');
                      }}
                      placeholder="आपली ID प्रविष्ट करा"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent transition text-sm font-medium"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      <Key className="w-4 h-4 inline mr-2 text-[#003366]" />
                      पासवर्ड
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                      }}
                      placeholder="आपला पासवर्ड प्रविष्ट करा"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent transition text-sm font-medium"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !id || !password}
                    className="w-full py-2.5 bg-gradient-to-r from-[#002244] to-[#003366] text-white font-bold rounded-xl hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        सत्यापन चल रहा है...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        प्रवेश करा
                      </>
                    )}
                  </button>

                  {/* Cancel Button */}
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition text-sm"
                  >
                    रद्द करा
                  </button>
                </form>

                {/* Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900 space-y-1">
                  <p className="font-semibold">📋 आपण येथून:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>सर्व नोंदणीकृत अर्जदारांची माहिती पहा</li>
                    <li>अर्जाचे तपशील दाखवा</li>
                    <li>अर्जांची स्थिती अपडेट करा</li>
                    <li>प्रिंट व डाउनलोड सुविधा</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
