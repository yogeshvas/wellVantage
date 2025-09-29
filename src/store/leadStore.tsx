/** @format */

import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface Note {
  date: string;
  note: string;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: "Male" | "Female" | "Non-binary/Other" | "";
  dob: string;
  height: number | null;
  weight: number | null;
  activityLevel:
    | "Sedentary"
    | "Lightly active"
    | "Moderately active"
    | "Very active"
    | "";
  wellnessGoals: string;
  primaryFitnessFocus:
    | "Gym workouts"
    | "Yoga"
    | "Meditation"
    | "Nutrition"
    | "Recovery"
    | "";
  preferredGymTime: "Morning" | "Afternoon" | "Evening" | "Late evening" | "";
  preferredWorkoutIntensity: "Light" | "Moderate" | "High" | "";
  medicalConcerns:
    | "Diabetes"
    | "Hypertension"
    | "Asthma"
    | "Others"
    | "None"
    | "";
  medicalConcernsOther?: string;
  previousGymExperience: "Yes" | "No" | "";
  inquiryDate: string;
  assignedTo: "Ram" | "Sham" | "Ghanshayam" | "";
  interestLevel: "Hot" | "Warm" | "Cold" | "";
  followUpStatus:
    | "New Inquiry"
    | "Needs Follow-Up"
    | "Engaged"
    | "Converted"
    | "Archived"
    | "";
  preferredPackage: "Basic" | "Premium" | "VIP" | "";
  preferredPtPackage: "None" | "Starter" | "Pro" | "Elite" | "";
  howHeard:
    | "Social Media"
    | "Word of Mouth"
    | "Walk-in"
    | "WellVantage B2C App"
    | "";
  notes: Note[];
  lastInteraction: string;
  createdAt: string;
  status: "active" | "archived";
}

interface LeadStore {
  leads: Lead[];
  addLead: (lead: Omit<Lead, "id" | "notes" | "createdAt" | "status">) => void;
  updateLead: (id: string, updated: Partial<Lead>) => void;
  archiveLead: (id: string) => void;
  unarchiveLead: (id: string) => void;
  addNote: (id: string, note: Note) => void;
}

const today = "2025-09-30";

const generateDummyLeads = (): Lead[] => {
  const firstNames = [
    "Aarav",
    "Vihaan",
    "Advik",
    "Ananya",
    "Diya",
    "Aryan",
    "Ishaan",
    "Sai",
    "Myra",
    "Aadhya",
    "Krishna",
    "Reyansh",
    "Sofia",
    "Aarush",
    "Vivaan",
    "Anika",
    "Anvi",
    "Dhruv",
    "Kabir",
    "Pari",
    "Yuvaan",
    "Aayat",
    "Atharv",
    "Parth",
    "Ira",
    "Rudra",
    "Zara",
    "Aayansh",
    "Kyra",
    "Rohan",
  ] as const;

  const lastNames = [
    "Sharma",
    "Verma",
    "Gupta",
    "Kumar",
    "Singh",
    "Patel",
    "Reddy",
    "Mehta",
    "Jain",
    "Malhotra",
    "Choudhary",
    "Aggarwal",
    "Das",
    "Rao",
    "Chauhan",
    "Tiwari",
    "Mishra",
    "Yadav",
    "Pandey",
    "Joshi",
  ] as const;

  const wellnessGoals = [
    "Weight Loss",
    "Muscle Gain",
    "General Fitness",
    "Stress Relief",
    "Improved Flexibility",
    "Cardiovascular Health",
    "Strength Training",
    "Body Toning",
    "Posture Correction",
    "Sports Performance",
  ] as const;

  const interestLevels = ["Hot", "Warm", "Cold"] as const;
  const followUpStatuses = [
    "New Inquiry",
    "Needs Follow-Up",
    "Engaged",
    "Converted",
  ] as const;
  const assignedToOptions = ["Ram", "Sham", "Ghanshayam"] as const;

  const leads: Lead[] = [];

  for (let i = 0; i < 45; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const interestLevel = interestLevels[Math.floor(Math.random() * 3)];
    const followUpStatus = followUpStatuses[Math.floor(Math.random() * 4)];
    const assignedTo = assignedToOptions[Math.floor(Math.random() * 3)];

    const lead: Lead = {
      id: uuidv4(),
      firstName,
      lastName,
      phone: `+91 ${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      gender: ["Male", "Female", "Non-binary/Other"][
        Math.floor(Math.random() * 3)
      ] as Lead["gender"],
      dob: `19${Math.floor(80 + Math.random() * 20)}-${String(
        Math.floor(Math.random() * 12) + 1
      ).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(
        2,
        "0"
      )}`,
      height: 150 + Math.floor(Math.random() * 50),
      weight: 50 + Math.floor(Math.random() * 50),
      activityLevel: [
        "Sedentary",
        "Lightly active",
        "Moderately active",
        "Very active",
      ][Math.floor(Math.random() * 4)] as Lead["activityLevel"],
      wellnessGoals:
        wellnessGoals[Math.floor(Math.random() * wellnessGoals.length)],
      primaryFitnessFocus: [
        "Gym workouts",
        "Yoga",
        "Meditation",
        "Nutrition",
        "Recovery",
      ][Math.floor(Math.random() * 5)] as Lead["primaryFitnessFocus"],
      preferredGymTime: ["Morning", "Afternoon", "Evening", "Late evening"][
        Math.floor(Math.random() * 4)
      ] as Lead["preferredGymTime"],
      preferredWorkoutIntensity: ["Light", "Moderate", "High"][
        Math.floor(Math.random() * 3)
      ] as Lead["preferredWorkoutIntensity"],
      medicalConcerns: ["Diabetes", "Hypertension", "Asthma", "Others", "None"][
        Math.floor(Math.random() * 5)
      ] as Lead["medicalConcerns"],
      previousGymExperience: ["Yes", "No"][
        Math.floor(Math.random() * 2)
      ] as Lead["previousGymExperience"],
      inquiryDate: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(
        2,
        "0"
      )}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      assignedTo,
      interestLevel,
      followUpStatus,
      preferredPackage: ["Basic", "Premium", "VIP"][
        Math.floor(Math.random() * 3)
      ] as Lead["preferredPackage"],
      preferredPtPackage: ["None", "Starter", "Pro", "Elite"][
        Math.floor(Math.random() * 4)
      ] as Lead["preferredPtPackage"],
      howHeard: [
        "Social Media",
        "Word of Mouth",
        "Walk-in",
        "WellVantage B2C App",
      ][Math.floor(Math.random() * 4)] as Lead["howHeard"],
      notes: [
        { date: today, note: "Lead created." },
        { date: today, note: "Initial contact made." },
      ],
      lastInteraction: `2025-${String(
        Math.floor(Math.random() * 12) + 1
      ).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(
        2,
        "0"
      )}`,
      createdAt: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(
        2,
        "0"
      )}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      status: i < 35 ? "active" : "archived",
    };

    leads.push(lead);
  }

  return leads;
};

export const useLeadStore = create<LeadStore>((set) => ({
  leads: generateDummyLeads(),
  addLead: (newLead) =>
    set((state) => ({
      leads: [
        ...state.leads,
        {
          ...newLead,
          id: uuidv4(),
          notes: [{ date: today, note: "Lead created." }],
          createdAt: today,
          status: "active",
        },
      ],
    })),
  updateLead: (id, updated) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === id ? { ...lead, ...updated, lastInteraction: today } : lead
      ),
    })),
  archiveLead: (id) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === id
          ? { ...lead, status: "archived", followUpStatus: "Archived" }
          : lead
      ),
    })),
  unarchiveLead: (id) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === id
          ? { ...lead, status: "active", followUpStatus: "New Inquiry" }
          : lead
      ),
    })),
  addNote: (id, newNote) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === id ? { ...lead, notes: [...lead.notes, newNote] } : lead
      ),
    })),
}));
