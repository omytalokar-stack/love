import { CandidateRegistration } from '../types';

const STORAGE_KEY = 'govt_parlour_admissions_v1';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Check if API is available
const isAPIAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.ok;
  } catch {
    return false;
  }
};

export const INITIAL_CANDIDATES: CandidateRegistration[] = [
  {
    id: 'cand-001',
    regNumber: 'GPA-2025-4102',
    firstName: 'पूजा',
    middleName: 'रमेश',
    lastName: 'शर्मा',
    fullName: 'पूजा रमेश शर्मा',
    mobileNumber: '9823417890',
    whatsappNumber: '9823417890',
    age: 23,
    streetAddress: 'संभाजी नगर, मेन रोड, अकोट',
    state: 'Maharashtra',
    district: 'Akola',
    taluka: 'Akot',
    pincode: '444101',
    currentOccupation: 'Housewife / गृहिणी',
    reasonForJoining: 'Apna khud ka Beauty Parlour kholna hai (स्वयंरोजगार)',
    courseId: 'saundarya-shastra-certificate',
    courseName: 'सौंदर्य शास्त्र प्रमाणपत्र कोर्स (प्रिंसेस ब्युटी पार्लर, संभाजी नगर, अकोट)',
    batchTiming: 'Morning Batch (08:00 AM - 10:00 AM)',
    educationQualification: '12th Pass / १२वी',
    instagramId: 'poojasharma_akot',
    photoBase64: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    photoSource: 'camera',
    appliedAt: '2025-05-18T10:30:00Z',
    status: 'Approved',
    govtSubsidyApplied: true,
    feePaidStatus: 'Full Paid',
    remarks: 'शासकीय सवलत मंजूर. प्रिंसेस ब्युटी पार्लर संभाजी नगर, अकोट केंद्र.'
  },
  {
    id: 'cand-002',
    regNumber: 'GPA-2025-4103',
    firstName: 'स्नेहा',
    middleName: 'संतोष',
    lastName: 'देशमुख',
    fullName: 'स्नेहा संतोष देशमुख',
    mobileNumber: '9765432109',
    whatsappNumber: '9765432109',
    age: 21,
    streetAddress: 'गणेश मंदिर जवळ, अकोट',
    state: 'Maharashtra',
    district: 'Akola',
    taluka: 'Akot',
    pincode: '444101',
    currentOccupation: 'Student / विद्यार्थिनी',
    reasonForJoining: 'Professional Bridal Makeup Artist banna hai (ब्रायडल आर्टिस्ट)',
    courseId: 'saundarya-shastra-certificate',
    courseName: 'सौंदर्य शास्त्र प्रमाणपत्र कोर्स (प्रिंसेस ब्युटी पार्लर, संभाजी नगर, अकोट)',
    batchTiming: 'Late Morning (10:30 AM - 12:30 PM)',
    educationQualification: 'Graduate / पदवीधर',
    instagramId: 'sneha_bridal_art',
    photoBase64: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    photoSource: 'gallery',
    appliedAt: '2025-05-19T14:20:00Z',
    status: 'Verified',
    govtSubsidyApplied: true,
    feePaidStatus: 'Token Paid',
    remarks: 'प्रिंसेस ब्युटी पार्लर अकोट केंद्र प्रवेश निश्चित.'
  }
];

export async function getSavedCandidates(): Promise<CandidateRegistration[]> {
  try {
    // Try API first
    const apiAvailable = await isAPIAvailable();
    if (apiAvailable) {
      const response = await fetch(`${API_BASE_URL}/candidates`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const result = await response.json();
        return result.data || INITIAL_CANDIDATES;
      }
    }
  } catch (err) {
    console.warn('API fetch failed, falling back to localStorage:', err);
  }

  // Fallback to localStorage
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CANDIDATES));
      return INITIAL_CANDIDATES;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to parse candidates from localStorage', err);
    return INITIAL_CANDIDATES;
  }
}

export async function saveCandidate(candidate: CandidateRegistration): Promise<CandidateRegistration[]> {
  try {
    // Try API first
    const apiAvailable = await isAPIAvailable();
    if (apiAvailable) {
      const isUpdate = candidate.id && candidate.regNumber;
      const url = isUpdate 
        ? `${API_BASE_URL}/candidates/${candidate.id}`
        : `${API_BASE_URL}/candidates`;
      const method = isUpdate ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(candidate),
      });

      if (response.ok) {
        // Fetch updated list from API
        return await getSavedCandidates();
      }
    }
  } catch (err) {
    console.warn('API save failed, falling back to localStorage:', err);
  }

  // Fallback to localStorage
  const current = await getSavedCandidates();
  const existingIdx = current.findIndex(c => c.id === candidate.id || c.regNumber === candidate.regNumber);
  let updated: CandidateRegistration[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = candidate;
  } else {
    updated = [candidate, ...current];
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }
  return updated;
}

export async function updateCandidateStatus(
  id: string,
  status: 'Approved' | 'Verified' | 'Pending Verification',
  feePaidStatus?: 'Pending at Center' | 'Token Paid' | 'Full Paid'
): Promise<CandidateRegistration[]> {
  try {
    // Try API first
    const apiAvailable = await isAPIAvailable();
    if (apiAvailable) {
      const updateData: any = { status };
      if (feePaidStatus) updateData.feePaidStatus = feePaidStatus;

      const response = await fetch(`${API_BASE_URL}/candidates/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        // Fetch updated list from API
        return await getSavedCandidates();
      }
    }
  } catch (err) {
    console.warn('API update failed, falling back to localStorage:', err);
  }

  // Fallback to localStorage
  const current = await getSavedCandidates();
  const updated = current.map(item => {
    if (item.id === id) {
      return {
        ...item,
        status,
        ...(feePaidStatus ? { feePaidStatus } : {})
      };
    }
    return item;
  });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update candidate status', err);
  }
  return updated;
}

export async function deleteCandidate(id: string): Promise<CandidateRegistration[]> {
  try {
    // Try API first
    const apiAvailable = await isAPIAvailable();
    if (apiAvailable) {
      const response = await fetch(`${API_BASE_URL}/candidates/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Fetch updated list from API
        return await getSavedCandidates();
      }
    }
  } catch (err) {
    console.warn('API delete failed, falling back to localStorage:', err);
  }

  // Fallback to localStorage
  const current = await getSavedCandidates();
  const updated = current.filter(c => c.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete candidate', err);
  }
  return updated;
}

export function generateRegistrationNumber(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const currentYear = new Date().getFullYear();
  return `GPA-${currentYear}-${randomNum}`;
}
