// Context/Jobcontext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import uuid from 'react-native-uuid';

const API_URL = 'https://empllo.com/api/v1';

export interface Job {
    id: string;
    title: string;
    companyName: string;
    companyLogo: string;
    workModel: string;
}

interface JobContextType {
    jobs: Job[];
    savedJobs: Job[];
    fetchJobs: () => Promise<void>;
    saveJob: (job: Job) => void;
    removeJob: (jobId: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [savedJobs, setSavedJobs] = useState<Job[]>([]);

    // Fetch Jobs from API
    const fetchJobs = async () => {
        try {
            const response = await axios.get(API_URL);
            if (response.data && Array.isArray(response.data.jobs)) {
                const jobsWithId = response.data.jobs.map((job: any) => ({
                    id: uuid.v4().toString(),
                    title: job.title || 'No Title',
                    companyName: job.companyName || 'Unknown Company',
                    workModel: job.workModel || 'Unknown',
                    companyLogo: job.companyLogo || '',
                }));
                setJobs(jobsWithId);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    // Save Job to Favorites (No duplicates allowed)
    const saveJob = (job: Job) => {
        setSavedJobs((prevJobs) => {
            if (prevJobs.some((saved) => saved.id === job.id)) {
                return prevJobs;
            }
            return [...prevJobs, job];
        });
    };

    // Remove Job from Saved
    const removeJob = (jobId: string) => {
        setSavedJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    };

    return (
        <JobContext.Provider value={{ jobs, savedJobs, fetchJobs, saveJob, removeJob }}>
            {children}
        </JobContext.Provider>
    );
};

// ✅ FIXED: Corrected the incorrect `Jobcontext` reference  
export const useJobcontext = () => {
    const context = useContext(JobContext); // ✅ Correct reference  
    if (!context) {
        throw new Error('useJobContext must be used within a JobProvider');
    }
    return context;
};
