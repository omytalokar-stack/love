import React, { useEffect, useRef, useState } from 'react';
import { Camera, RefreshCw, X, Check, FlipHorizontal, AlertCircle, Sparkles, Upload, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (base64Image: string) => void;
  lang: Language;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture,
  lang
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [flashEffect, setFlashEffect] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Initialize camera
  const startCamera = async (facing: 'user' | 'environment') => {
    setErrorMsg(null);
    setCapturedImage(null);
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facing,
          width: { ideal: 720 },
          height: { ideal: 720 }
        },
        audio: false
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setIsCameraActive(false);
      setErrorMsg(
        lang === 'hi'
          ? 'कॅमेरा चालू होऊ शकला नाही. कृपया ब्राऊझरवर कॅमेरा परवानगी द्या किंवा खाली गॅलरीतून फोटो अपलोड करा.'
          : 'Unable to access camera. Please allow camera permissions or upload a photo from gallery.'
      );
    }
  };

  useEffect(() => {
    if (isOpen) {
      startCamera(facingMode);
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  };

  const switchCamera = () => {
    const nextFacing = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextFacing);
  };

  const handleTakeSnap = () => {
    if (!videoRef.current || !canvasRef.current) return;

    // Trigger 3s timer for professional photo pose
    setIsCountingDown(true);
    setCountdown(3);

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCountingDown(false);
          performCapture();
          return 3;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const performCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 480;
    canvas.height = 480;

    // Center crop square
    const minDim = Math.min(video.videoWidth || 480, video.videoHeight || 480);
    const startX = ((video.videoWidth || 480) - minDim) / 2;
    const startY = ((video.videoHeight || 480) - minDim) / 2;

    // If front camera, mirror image for natural selfie
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, startX, startY, minDim, minDim, 0, 0, canvas.width, canvas.height);

    const base64 = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(base64);

    // Flash trigger
    setFlashEffect(true);
    setTimeout(() => setFlashEffect(false), 250);
  };

  const handleInstantSnap = () => {
    performCapture();
  };

  const handleConfirmPhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      stopCamera();
      onClose();
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera(facingMode);
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onCapture(reader.result);
          stopCamera();
          onClose();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border border-slate-300 rounded-2xl overflow-hidden shadow-2xl text-slate-900">
        {/* Header - Government Deep Navy */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-400 bg-gradient-to-r from-[#002244] via-[#003366] to-[#001f3f] text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#FF9933] text-slate-950 shadow-xs font-bold">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight text-white font-serif">
                {lang === 'hi' ? 'लाईव्ह पासपोर्ट फोटो काढा' : 'Take Official Student Photo'}
              </h3>
              <p className="text-xs text-slate-200 font-medium">
                {lang === 'hi' ? 'शासकीय आय-कार्ड व प्रमाणपत्रासाठी' : 'For Govt. ID Card & Certificate'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera View / Preview Screen */}
        <div className="relative aspect-square w-full bg-slate-950 flex items-center justify-center overflow-hidden">
          {/* Flash animation */}
          {flashEffect && (
            <div className="absolute inset-0 bg-white z-40 transition-opacity duration-200" />
          )}

          {/* Hidden Canvas for capture rendering */}
          <canvas ref={canvasRef} className="hidden" />

          {capturedImage ? (
            // Captured preview
            <div className="relative w-full h-full">
              <img
                src={capturedImage}
                alt="Captured Student Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-emerald-700 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-md">
                <Check className="w-3.5 h-3.5" />
                {lang === 'hi' ? 'फोटो कॅप्चर झाला' : 'Photo Captured'}
              </div>
            </div>
          ) : (
            // Live Video Feed
            <div className="relative w-full h-full flex items-center justify-center">
              {isCameraActive && (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${facingMode === 'user' ? '-scale-x-100' : ''}`}
                />
              )}

              {/* Countdown overlay */}
              {isCountingDown && (
                <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center z-30">
                  <div className="w-24 h-24 rounded-full bg-[#003366] border-4 border-[#FF9933] flex items-center justify-center text-4xl font-black text-white shadow-2xl animate-pulse">
                    {countdown}
                  </div>
                </div>
              )}

              {/* Face Guide Oval */}
              {!errorMsg && isCameraActive && (
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                  <div className="w-56 h-72 rounded-[48%] border-2 border-dashed border-[#FF9933] shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] flex items-center justify-center">
                    <div className="text-[11px] bg-slate-900/80 px-3 py-1 rounded-full text-[#FF9933] border border-[#FF9933]/40 backdrop-blur-xs font-bold">
                      {lang === 'hi' ? 'चेहरा या फ्रेममध्ये ठेवा' : 'Align face in oval'}
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-white bg-slate-900/90 px-3 py-1 rounded-full border border-slate-700 font-medium">
                    {lang === 'hi' ? 'कृपया सरळ पाहा व चांगला प्रकाश ठेवा' : 'Look straight with good lighting'}
                  </p>
                </div>
              )}

              {/* Error or No Camera Fallback */}
              {errorMsg && (
                <div className="p-6 text-center text-slate-300 max-w-sm">
                  <AlertCircle className="w-12 h-12 text-[#FF9933] mx-auto mb-3" />
                  <p className="text-sm font-medium text-slate-200 mb-4">{errorMsg}</p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => startCamera(facingMode)}
                      className="px-4 py-2.5 bg-[#FF9933] hover:bg-[#f57c00] text-slate-950 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow"
                    >
                      <RefreshCw className="w-4 h-4 text-slate-950" />
                      {lang === 'hi' ? 'पुन्हा प्रयत्न करा' : 'Retry Camera'}
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium flex items-center justify-center gap-2 border border-slate-600"
                    >
                      <Upload className="w-4 h-4" />
                      {lang === 'hi' ? 'गॅलरीतून फोटो निवडा' : 'Upload From Gallery'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          {capturedImage ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleRetake}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition border border-slate-300"
              >
                <RefreshCw className="w-4 h-4 text-[#003366]" />
                {lang === 'hi' ? 'पुन्हा काढा (Retake)' : 'Retake Photo'}
              </button>
              <button
                type="button"
                onClick={handleConfirmPhoto}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition border border-emerald-500"
              >
                <Check className="w-4 h-4" />
                {lang === 'hi' ? 'हा फोटो वापरा' : 'Use This Photo'}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              {/* Switch Camera */}
              <button
                type="button"
                onClick={switchCamera}
                disabled={!isCameraActive}
                className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 transition disabled:opacity-40 border border-slate-300 shadow-2xs"
                title="Switch Camera (Front/Back)"
              >
                <FlipHorizontal className="w-5 h-5 text-[#003366]" />
              </button>

              {/* Main Shutter Button */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTakeSnap}
                  disabled={!isCameraActive || isCountingDown}
                  className="px-5 py-2.5 rounded-xl bg-[#e65100] hover:bg-[#d84315] text-white font-black text-xs shadow-md flex items-center gap-2 transition disabled:opacity-40 border border-amber-300"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  {lang === 'hi' ? '३ सेकंदात फोटो घ्या' : 'Take 3s Photo'}
                </button>
                <button
                  type="button"
                  onClick={handleInstantSnap}
                  disabled={!isCameraActive || isCountingDown}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-xs font-bold text-white transition"
                >
                  {lang === 'hi' ? 'आताच घ्या' : 'Snap'}
                </button>
              </div>

              {/* Gallery upload alternative */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 transition border border-slate-300 shadow-2xs"
                title="Upload from gallery"
              >
                <Upload className="w-5 h-5 text-[#003366]" />
              </button>
            </div>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleGalleryUpload}
        />
      </div>
    </div>
  );
};
