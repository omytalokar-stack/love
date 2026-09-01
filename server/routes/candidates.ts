import { Router, Request, Response } from 'express';
import { CandidateModel } from '../models/Candidate';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Generate registration number
const generateRegistrationNumber = async (): Promise<string> => {
  const count = await CandidateModel.countDocuments();
  const year = new Date().getFullYear();
  return `GPA-${year}-${4102 + count}`;
};

// Save new candidate
router.post('/candidates', async (req: Request, res: Response) => {
  try {
    const candidateData = req.body;
    
    const regNumber = await generateRegistrationNumber();
    const id = `cand-${uuidv4().slice(0, 8)}`;

    const newCandidate = new CandidateModel({
      id,
      regNumber,
      ...candidateData,
      appliedAt: new Date(),
      status: 'Pending',
    });

    await newCandidate.save();

    res.status(201).json({
      success: true,
      message: 'Candidate registered successfully',
      data: newCandidate,
    });
  } catch (error: any) {
    console.error('Error saving candidate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save candidate',
      error: error.message,
    });
  }
});

// Get all candidates
router.get('/candidates', async (req: Request, res: Response) => {
  try {
    const { status, courseId, search } = req.query;

    let query: any = {};

    if (status) query.status = status;
    if (courseId) query.courseId = courseId;
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { mobileNumber: { $regex: search, $options: 'i' } },
        { regNumber: { $regex: search, $options: 'i' } },
      ];
    }

    const candidates = await CandidateModel.find(query)
      .sort({ appliedAt: -1 })
      .limit(1000);

    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates,
    });
  } catch (error: any) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch candidates',
      error: error.message,
    });
  }
});

// Get single candidate
router.get('/candidates/:id', async (req: Request, res: Response) => {
  try {
    const candidate = await CandidateModel.findOne({
      $or: [{ id: req.params.id }, { regNumber: req.params.id }],
    });

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found',
      });
    }

    res.status(200).json({
      success: true,
      data: candidate,
    });
  } catch (error: any) {
    console.error('Error fetching candidate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch candidate',
      error: error.message,
    });
  }
});

// Update candidate
router.put('/candidates/:id', async (req: Request, res: Response) => {
  try {
    const candidate = await CandidateModel.findOneAndUpdate(
      { $or: [{ id: req.params.id }, { regNumber: req.params.id }] },
      req.body,
      { new: true, runValidators: true }
    );

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Candidate updated successfully',
      data: candidate,
    });
  } catch (error: any) {
    console.error('Error updating candidate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update candidate',
      error: error.message,
    });
  }
});

// Delete candidate
router.delete('/candidates/:id', async (req: Request, res: Response) => {
  try {
    const candidate = await CandidateModel.findOneAndDelete({
      $or: [{ id: req.params.id }, { regNumber: req.params.id }],
    });

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Candidate deleted successfully',
      data: candidate,
    });
  } catch (error: any) {
    console.error('Error deleting candidate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete candidate',
      error: error.message,
    });
  }
});

// Get dashboard stats
router.get('/stats/dashboard', async (req: Request, res: Response) => {
  try {
    const totalCandidates = await CandidateModel.countDocuments();
    const approved = await CandidateModel.countDocuments({ status: 'Approved' });
    const verified = await CandidateModel.countDocuments({ status: 'Verified' });
    const pending = await CandidateModel.countDocuments({ status: 'Pending' });
    const rejected = await CandidateModel.countDocuments({ status: 'Rejected' });

    res.status(200).json({
      success: true,
      data: {
        totalCandidates,
        approved,
        verified,
        pending,
        rejected,
      },
    });
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats',
      error: error.message,
    });
  }
});

export default router;
