export type Language = 'hi' | 'en';

export interface Course {
  id: string;
  name: string;
  nameHi: string;
  badge: string;
  badgeHi: string;
  duration: string;
  durationHi: string;
  originalFee: number;
  subsidizedFee: number;
  discountPercentage: number;
  level: string;
  levelHi: string;
  topics: string[];
  topicsHi: string[];
  certificationType: string;
  certificationTypeHi: string;
  image: string;
  popular?: boolean;
}

export interface CandidateRegistration {
  id: string;
  regNumber: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  fullName: string;
  mobileNumber: string;
  whatsappNumber: string;
  isWhatsappSame?: boolean;
  email?: string;
  age: number | string;
  streetAddress: string;
  state: string;
  district: string;
  taluka: string;
  pincode: string;
  currentOccupation: string;
  currentOccupationCustom?: string;
  reasonForJoining: string;
  customReason?: string;
  courseId: string;
  courseName: string;
  courseDuration?: string;
  batchTiming: string;
  educationQualification: string;
  instagramId?: string;
  photoBase64: string;
  photoSource: 'camera' | 'upload' | 'gallery' | 'default';
  appliedAt: string;
  status: 'Approved' | 'Verified' | 'Pending Verification';
  govtSubsidyApplied: boolean;
  feePaidStatus?: 'Pending at Center' | 'Token Paid' | 'Full Paid';
  parentOrGuardianName?: string;
  parentContact?: string;
  remarks?: string;
}

export interface LocationState {
  name: string;
  districts: {
    name: string;
    talukas: string[];
  }[];
}
