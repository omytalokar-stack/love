import mongoose, { Schema, Document } from 'mongoose';

export interface ICandidateRegistration extends Document {
  id: string;
  regNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  mobileNumber: string;
  whatsappNumber: string;
  age: number;
  streetAddress: string;
  state: string;
  district: string;
  taluka: string;
  pincode: string;
  currentOccupation: string;
  reasonForJoining: string;
  courseId: string;
  courseName: string;
  batchTiming: string;
  educationQualification: string;
  instagramId: string;
  photoBase64: string;
  photoSource: 'camera' | 'gallery';
  appliedAt: Date;
  status: 'Pending' | 'Verified' | 'Approved' | 'Rejected';
  govtSubsidyApplied: boolean;
  feePaidStatus: string;
  remarks: string;
  createdAt: Date;
  updatedAt: Date;
}

const candidateSchema = new Schema<ICandidateRegistration>(
  {
    id: { type: String, required: true, unique: true, index: true },
    regNumber: { type: String, required: true, unique: true, index: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true, index: true },
    whatsappNumber: { type: String },
    age: { type: Number, required: true },
    streetAddress: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    taluka: { type: String, required: true },
    pincode: { type: String, required: true },
    currentOccupation: { type: String },
    reasonForJoining: { type: String },
    courseId: { type: String, required: true, index: true },
    courseName: { type: String, required: true },
    batchTiming: { type: String },
    educationQualification: { type: String },
    instagramId: { type: String },
    photoBase64: { type: String },
    photoSource: { type: String, enum: ['camera', 'gallery'] },
    appliedAt: { type: Date, default: Date.now, index: true },
    status: {
      type: String,
      enum: ['Pending', 'Verified', 'Approved', 'Rejected'],
      default: 'Pending',
      index: true,
    },
    govtSubsidyApplied: { type: Boolean, default: false },
    feePaidStatus: { type: String, default: 'Not Paid' },
    remarks: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export const CandidateModel = mongoose.model<ICandidateRegistration>(
  'CandidateRegistration',
  candidateSchema
);
