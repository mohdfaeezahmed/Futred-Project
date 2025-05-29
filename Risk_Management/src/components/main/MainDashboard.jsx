import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Calendar,
  User,
  BarChart3,
  Filter,
  ArrowRight,
} from "lucide-react";
import logo from '../../assets/logout.png';
// Dummy employee data with scores
const employeesData = [
  {
    id: 1,
    username: "Naruto",
    name: "Naruto Uzumaki",
    department: "Engineering",
    position: "Senior Developer",
    salary: 85000,
    joinDate: "2022-03-15",
    leavesTaken: 12,
    totalLeaves: 25,
    workingHours: 42,
    expectedHours: 40,
    projectsCompleted: 8,
    projectsDelayed: 1,
    performanceScore: 8.5,
    absenceRate: 3.2,
    overtimeHours: 15,
    email: "naruto.uzumaki@company.com",
    phone: "+1-234-567-8901",
    scores: {
      mentalHealth: 85,
      efficiency: 90,
      skillGap: 78,
      workLifeBalance: 88,
      growth: 92,
      ethics: 80,
      inclusion: 87,
      attrition: 65,
    },
  },
  {
    id: 2,
    username: "Sasuke",
    name: "Sasuke Uchiha",
    department: "Marketing",
    position: "Marketing Manager",
    salary: 72000,
    joinDate: "2021-08-20",
    leavesTaken: 18,
    totalLeaves: 25,
    workingHours: 38,
    expectedHours: 40,
    projectsCompleted: 12,
    projectsDelayed: 3,
    performanceScore: 7.2,
    absenceRate: 5.8,
    overtimeHours: 8,
    email: "sasuke.uchiha@company.com",
    phone: "+1-234-567-8902",
    scores: {
      mentalHealth: 70,
      efficiency: 85,
      skillGap: 88,
      workLifeBalance: 65,
      growth: 78,
      ethics: 90,
      inclusion: 75,
      attrition: 80,
    },
  },
  {
    id: 3,
    username: "Sakura",
    name: "Sakura Haruno",
    department: "Finance",
    position: "Financial Analyst",
    salary: 68000,
    joinDate: "2023-01-10",
    leavesTaken: 8,
    totalLeaves: 20,
    workingHours: 41,
    expectedHours: 40,
    projectsCompleted: 15,
    projectsDelayed: 0,
    performanceScore: 9.1,
    absenceRate: 1.5,
    overtimeHours: 22,
    email: "sakura.haruno@company.com",
    phone: "+1-234-567-8903",
    scores: {
      mentalHealth: 92,
      efficiency: 88,
      skillGap: 85,
      workLifeBalance: 90,
      growth: 87,
      ethics: 95,
      inclusion: 89,
      attrition: 75,
    },
  },
  {
    id: 4,
    username: "Kakashi",
    name: "Kakashi Hatake",
    department: "HR",
    position: "HR Manager",
    salary: 78000,
    joinDate: "2020-11-05",
    leavesTaken: 22,
    totalLeaves: 25,
    workingHours: 35,
    expectedHours: 40,
    projectsCompleted: 6,
    projectsDelayed: 4,
    performanceScore: 6.8,
    absenceRate: 8.1,
    overtimeHours: 2,
    email: "kakashi.hatake@company.com",
    phone: "+1-234-567-8904",
    scores: {
      mentalHealth: 60,
      efficiency: 70,
      skillGap: 92,
      workLifeBalance: 55,
      growth: 65,
      ethics: 88,
      inclusion: 85,
      attrition: 90,
    },
  },
  {
    id: 5,
    username: "Gaara",
    name: "Gaara of the Sand",
    department: "Engineering",
    position: "DevOps Engineer",
    salary: 92000,
    joinDate: "2022-07-12",
    leavesTaken: 10,
    totalLeaves: 25,
    workingHours: 44,
    expectedHours: 40,
    projectsCompleted: 11,
    projectsDelayed: 1,
    performanceScore: 8.8,
    absenceRate: 2.1,
    overtimeHours: 28,
    email: "gaara.sand@company.com",
    phone: "+1-234-567-8905",
    scores: {
      mentalHealth: 78,
      efficiency: 95,
      skillGap: 82,
      workLifeBalance: 72,
      growth: 88,
      ethics: 85,
      inclusion: 80,
      attrition: 70,
    },
  },
  {
    id: 6,
    username: "Hinata",
    name: "Hinata Hyuga",
    department: "Design",
    position: "UI/UX Designer",
    salary: 65000,
    joinDate: "2021-02-14",
    leavesTaken: 15,
    totalLeaves: 25,
    workingHours: 39,
    expectedHours: 40,
    projectsCompleted: 18,
    projectsDelayed: 2,
    performanceScore: 8.2,
    absenceRate: 4.2,
    overtimeHours: 12,
    email: "hinata.hyuga@company.com",
    phone: "+1-234-567-8906",
    scores: {
      mentalHealth: 88,
      efficiency: 82,
      skillGap: 90,
      workLifeBalance: 85,
      growth: 80,
      ethics: 92,
      inclusion: 95,
      attrition: 60,
    },
  },
  {
    id: 7,
    username: "Shikamaru",
    name: "Shikamaru Nara",
    department: "Strategy",
    position: "Strategic Analyst",
    salary: 75000,
    joinDate: "2020-09-30",
    leavesTaken: 20,
    totalLeaves: 25,
    workingHours: 36,
    expectedHours: 40,
    projectsCompleted: 14,
    projectsDelayed: 1,
    performanceScore: 8.7,
    absenceRate: 6.5,
    overtimeHours: 5,
    email: "shikamaru.nara@company.com",
    phone: "+1-234-567-8907",
    scores: {
      mentalHealth: 75,
      efficiency: 88,
      skillGap: 95,
      workLifeBalance: 78,
      growth: 82,
      ethics: 90,
      inclusion: 88,
      attrition: 85,
    },
  },
  {
    id: 8,
    username: "Rock_Lee",
    name: "Rock Lee",
    department: "Operations",
    position: "Operations Manager",
    salary: 70000,
    joinDate: "2021-12-01",
    leavesTaken: 8,
    totalLeaves: 25,
    workingHours: 48,
    expectedHours: 40,
    projectsCompleted: 22,
    projectsDelayed: 0,
    performanceScore: 9.5,
    absenceRate: 1.2,
    overtimeHours: 35,
    email: "rock.lee@company.com",
    phone: "+1-234-567-8908",
    scores: {
      mentalHealth: 95,
      efficiency: 98,
      skillGap: 70,
      workLifeBalance: 60,
      growth: 85,
      ethics: 88,
      inclusion: 92,
      attrition: 55,
    },
  },
  {
    id: 9,
    username: "Itachi",
    name: "Itachi Uchiha",
    department: "Design",
    position: "Designer",
    salary: 78494,
    joinDate: "2020-07-10",
    leavesTaken: 8,
    totalLeaves: 25,
    workingHours: 45,
    expectedHours: 40,
    projectsCompleted: 18,
    projectsDelayed: 5,
    performanceScore: 9.3,
    absenceRate: 1.3,
    overtimeHours: 40,
    email: "itachi.ninja@company.com",
    phone: "+1-234-567-8909",
    scores: {
      mentalHealth: 42,
      efficiency: 63,
      skillGap: 52,
      workLifeBalance: 58,
      growth: 43,
      ethics: 48,
      inclusion: 58,
      attrition: 50,
    },
  },
  {
    id: 10,
    username: "Neji",
    name: "Neji Hyuga",
    department: "Operations",
    position: "Analyst",
    salary: 101110,
    joinDate: "2021-01-13",
    leavesTaken: 6,
    totalLeaves: 25,
    workingHours: 40,
    expectedHours: 40,
    projectsCompleted: 7,
    projectsDelayed: 4,
    performanceScore: 9.7,
    absenceRate: 6.2,
    overtimeHours: 12,
    email: "neji.ninja@company.com",
    phone: "+1-234-567-8910",
    scores: {
      mentalHealth: 61,
      efficiency: 51,
      skillGap: 60,
      workLifeBalance: 49,
      growth: 59,
      ethics: 59,
      inclusion: 40,
      attrition: 65,
    },
  },
  {
    id: 11,
    username: "Temari",
    name: "Temari",
    department: "Marketing",
    position: "Manager",
    salary: 76927,
    joinDate: "2023-05-29",
    leavesTaken: 16,
    totalLeaves: 25,
    workingHours: 35,
    expectedHours: 40,
    projectsCompleted: 17,
    projectsDelayed: 0,
    performanceScore: 8.4,
    absenceRate: 6.2,
    overtimeHours: 26,
    email: "temari.ninja@company.com",
    phone: "+1-234-567-8911",
    scores: {
      mentalHealth: 48,
      efficiency: 63,
      skillGap: 55,
      workLifeBalance: 51,
      growth: 44,
      ethics: 65,
      inclusion: 50,
      attrition: 45,
    },
  },
  {
    id: 12,
    username: "Kiba",
    name: "Kiba Inuzuka",
    department: "Marketing",
    position: "Designer",
    salary: 72741,
    joinDate: "2019-07-27",
    leavesTaken: 16,
    totalLeaves: 25,
    workingHours: 50,
    expectedHours: 40,
    projectsCompleted: 8,
    projectsDelayed: 1,
    performanceScore: 6.9,
    absenceRate: 2.7,
    overtimeHours: 23,
    email: "kiba.ninja@company.com",
    phone: "+1-234-567-8912",
    scores: {
      mentalHealth: 64,
      efficiency: 44,
      skillGap: 42,
      workLifeBalance: 45,
      growth: 47,
      ethics: 46,
      inclusion: 41,
      attrition: 60,
    },
  },
  {
    id: 13,
    username: "Ino",
    name: "Ino Yamanaka",
    department: "HR",
    position: "Engineer",
    salary: 89521,
    joinDate: "2023-10-28",
    leavesTaken: 8,
    totalLeaves: 25,
    workingHours: 42,
    expectedHours: 40,
    projectsCompleted: 5,
    projectsDelayed: 2,
    performanceScore: 6.0,
    absenceRate: 4.9,
    overtimeHours: 30,
    email: "ino.ninja@company.com",
    phone: "+1-234-567-8913",
    scores: {
      mentalHealth: 50,
      efficiency: 42,
      skillGap: 59,
      workLifeBalance: 46,
      growth: 40,
      ethics: 47,
      inclusion: 58,
      attrition: 52,
    },
  },
  {
    id: 14,
    username: "Choji",
    name: "Choji Akimichi",
    department: "Marketing",
    position: "Manager",
    salary: 78300,
    joinDate: "2019-01-23",
    leavesTaken: 9,
    totalLeaves: 25,
    workingHours: 40,
    expectedHours: 40,
    projectsCompleted: 11,
    projectsDelayed: 5,
    performanceScore: 7.1,
    absenceRate: 7.1,
    overtimeHours: 11,
    email: "choji.ninja@company.com",
    phone: "+1-234-567-8914",
    scores: {
      mentalHealth: 61,
      efficiency: 45,
      skillGap: 43,
      workLifeBalance: 52,
      growth: 44,
      ethics: 56,
      inclusion: 60,
      attrition: 57,
    },
  },
  {
    id: 15,
    username: "Tenten",
    name: "Tenten",
    department: "Operations",
    position: "Consultant",
    salary: 98298,
    joinDate: "2019-06-23",
    leavesTaken: 16,
    totalLeaves: 25,
    workingHours: 46,
    expectedHours: 40,
    projectsCompleted: 17,
    projectsDelayed: 3,
    performanceScore: 9.6,
    absenceRate: 2.7,
    overtimeHours: 38,
    email: "tenten.ninja@company.com",
    phone: "+1-234-567-8915",
    scores: {
      mentalHealth: 57,
      efficiency: 65,
      skillGap: 62,
      workLifeBalance: 50,
      growth: 58,
      ethics: 46,
      inclusion: 48,
      attrition: 41,
    },
  },
  {
    id: 16,
    username: "Kurenai",
    name: "Kurenai Yuhi",
    department: "Design",
    position: "Analyst",
    salary: 117042,
    joinDate: "2022-01-27",
    leavesTaken: 5,
    totalLeaves: 25,
    workingHours: 35,
    expectedHours: 40,
    projectsCompleted: 14,
    projectsDelayed: 1,
    performanceScore: 9.4,
    absenceRate: 8.7,
    overtimeHours: 1,
    email: "kurenai.ninja@company.com",
    phone: "+1-234-567-8916",
    scores: {
      mentalHealth: 48,
      efficiency: 61,
      skillGap: 54,
      workLifeBalance: 57,
      growth: 47,
      ethics: 58,
      inclusion: 64,
      attrition: 50,
    },
  },
  {
    id: 17,
    username: "Asuma",
    name: "Asuma Sarutobi",
    department: "HR",
    position: "Manager",
    salary: 68959,
    joinDate: "2023-09-28",
    leavesTaken: 6,
    totalLeaves: 25,
    workingHours: 35,
    expectedHours: 40,
    projectsCompleted: 11,
    projectsDelayed: 0,
    performanceScore: 6.5,
    absenceRate: 9.9,
    overtimeHours: 18,
    email: "asuma.ninja@company.com",
    phone: "+1-234-567-8917",
    scores: {
      mentalHealth: 47,
      efficiency: 41,
      skillGap: 53,
      workLifeBalance: 44,
      growth: 59,
      ethics: 59,
      inclusion: 60,
      attrition: 51,
    },
  },
  {
    id: 18,
    username: "Might",
    name: "Might Guy",
    department: "Design",
    position: "Engineer",
    salary: 88375,
    joinDate: "2022-06-22",
    leavesTaken: 10,
    totalLeaves: 25,
    workingHours: 41,
    expectedHours: 40,
    projectsCompleted: 20,
    projectsDelayed: 0,
    performanceScore: 8.0,
    absenceRate: 1.3,
    overtimeHours: 10,
    email: "might.ninja@company.com",
    phone: "+1-234-567-8918",
    scores: {
      mentalHealth: 62,
      efficiency: 49,
      skillGap: 47,
      workLifeBalance: 50,
      growth: 43,
      ethics: 52,
      inclusion: 55,
      attrition: 63,
    },
  },
  {
    id: 19,
    username: "Konan",
    name: "Konan",
    department: "Marketing",
    position: "Developer",
    salary: 112408,
    joinDate: "2023-04-13",
    leavesTaken: 11,
    totalLeaves: 25,
    workingHours: 49,
    expectedHours: 40,
    projectsCompleted: 6,
    projectsDelayed: 2,
    performanceScore: 7.4,
    absenceRate: 2.1,
    overtimeHours: 12,
    email: "konan.ninja@company.com",
    phone: "+1-234-567-8919",
    scores: {
      mentalHealth: 42,
      efficiency: 59,
      skillGap: 61,
      workLifeBalance: 47,
      growth: 45,
      ethics: 60,
      inclusion: 41,
      attrition: 48,
    },
  },
  {
    id: 20,
    username: "Nagato",
    name: "Nagato Uzumaki",
    department: "Engineering",
    position: "Manager",
    salary: 113779,
    joinDate: "2023-05-11",
    leavesTaken: 14,
    totalLeaves: 25,
    workingHours: 43,
    expectedHours: 40,
    projectsCompleted: 7,
    projectsDelayed: 2,
    performanceScore: 9.2,
    absenceRate: 1.4,
    overtimeHours: 12,
    email: "nagato.ninja@company.com",
    phone: "+1-234-567-8920",
    scores: {
      mentalHealth: 64,
      efficiency: 48,
      skillGap: 51,
      workLifeBalance: 42,
      growth: 53,
      ethics: 55,
      inclusion: 50,
      attrition: 60,
    },
  },
  {
    id: 21,
    username: "Kisame",
    name: "Kisame Hoshigaki",
    department: "Design",
    position: "Manager",
    salary: 119663,
    joinDate: "2023-12-12",
    leavesTaken: 20,
    totalLeaves: 25,
    workingHours: 42,
    expectedHours: 40,
    projectsCompleted: 8,
    projectsDelayed: 1,
    performanceScore: 9.6,
    absenceRate: 7.2,
    overtimeHours: 23,
    email: "kisame.ninja@company.com",
    phone: "+1-234-567-8921",
    scores: {
      mentalHealth: 51,
      efficiency: 50,
      skillGap: 40,
      workLifeBalance: 44,
      growth: 61,
      ethics: 58,
      inclusion: 64,
      attrition: 63,
    },
  },
  {
    id: 22,
    username: "Zabuza",
    name: "Zabuza Momochi",
    department: "Strategy",
    position: "Manager",
    salary: 79392,
    joinDate: "2021-03-30",
    leavesTaken: 5,
    totalLeaves: 25,
    workingHours: 49,
    expectedHours: 40,
    projectsCompleted: 17,
    projectsDelayed: 5,
    performanceScore: 7.0,
    absenceRate: 4.3,
    overtimeHours: 29,
    email: "zabuza.ninja@company.com",
    phone: "+1-234-567-8922",
    scores: {
      mentalHealth: 56,
      efficiency: 64,
      skillGap: 58,
      workLifeBalance: 59,
      growth: 58,
      ethics: 42,
      inclusion: 50,
      attrition: 65,
    },
  },
  {
    id: 23,
    username: "Haku",
    name: "Haku",
    department: "Operations",
    position: "Analyst",
    salary: 97751,
    joinDate: "2023-05-16",
    leavesTaken: 18,
    totalLeaves: 25,
    workingHours: 50,
    expectedHours: 40,
    projectsCompleted: 10,
    projectsDelayed: 2,
    performanceScore: 7.3,
    absenceRate: 3.4,
    overtimeHours: 31,
    email: "haku.ninja@company.com",
    phone: "+1-234-567-8923",
    scores: {
      mentalHealth: 42,
      efficiency: 62,
      skillGap: 43,
      workLifeBalance: 44,
      growth: 45,
      ethics: 47,
      inclusion: 59,
      attrition: 41,
    },
  },
  {
    id: 24,
    username: "Yamato",
    name: "Yamato",
    department: "Engineering",
    position: "Developer",
    salary: 99647,
    joinDate: "2019-06-23",
    leavesTaken: 14,
    totalLeaves: 25,
    workingHours: 47,
    expectedHours: 40,
    projectsCompleted: 5,
    projectsDelayed: 1,
    performanceScore: 8.4,
    absenceRate: 9.9,
    overtimeHours: 0,
    email: "yamato.ninja@company.com",
    phone: "+1-234-567-8924",
    scores: {
      mentalHealth: 48,
      efficiency: 46,
      skillGap: 62,
      workLifeBalance: 59,
      growth: 54,
      ethics: 49,
      inclusion: 48,
      attrition: 62,
    },
  },
  {
    id: 25,
    username: "Sai",
    name: "Sai",
    department: "Marketing",
    position: "Manager",
    salary: 66722,
    joinDate: "2019-05-10",
    leavesTaken: 18,
    totalLeaves: 25,
    workingHours: 38,
    expectedHours: 40,
    projectsCompleted: 10,
    projectsDelayed: 5,
    performanceScore: 6.9,
    absenceRate: 5.8,
    overtimeHours: 23,
    email: "sai.ninja@company.com",
    phone: "+1-234-567-8925",
    scores: {
      mentalHealth: 53,
      efficiency: 62,
      skillGap: 52,
      workLifeBalance: 42,
      growth: 64,
      ethics: 44,
      inclusion: 53,
      attrition: 59,
    },
  },
  {
    id: 26,
    username: "Jiraiya",
    name: "Jiraiya",
    department: "Design",
    position: "Consultant",
    salary: 68099,
    joinDate: "2019-08-01",
    leavesTaken: 9,
    totalLeaves: 25,
    workingHours: 48,
    expectedHours: 40,
    projectsCompleted: 13,
    projectsDelayed: 1,
    performanceScore: 7.0,
    absenceRate: 9.5,
    overtimeHours: 38,
    email: "jiraiya.ninja@company.com",
    phone: "+1-234-567-8926",
    scores: {
      mentalHealth: 47,
      efficiency: 40,
      skillGap: 45,
      workLifeBalance: 44,
      growth: 62,
      ethics: 45,
      inclusion: 51,
      attrition: 47,
    },
  },
  {
    id: 27,
    username: "Tsunade",
    name: "Tsunade",
    department: "Engineering",
    position: "Designer",
    salary: 64793,
    joinDate: "2019-07-10",
    leavesTaken: 10,
    totalLeaves: 25,
    workingHours: 36,
    expectedHours: 40,
    projectsCompleted: 12,
    projectsDelayed: 3,
    performanceScore: 7.1,
    absenceRate: 9.8,
    overtimeHours: 12,
    email: "tsunade.ninja@company.com",
    phone: "+1-234-567-8927",
    scores: {
      mentalHealth: 47,
      efficiency: 43,
      skillGap: 51,
      workLifeBalance: 41,
      growth: 65,
      ethics: 63,
      inclusion: 62,
      attrition: 42,
    },
  },
  {
    id: 28,
    username: "Orochimaru",
    name: "Orochimaru",
    department: "Operations",
    position: "Designer",
    salary: 96490,
    joinDate: "2020-01-21",
    leavesTaken: 19,
    totalLeaves: 25,
    workingHours: 45,
    expectedHours: 40,
    projectsCompleted: 20,
    projectsDelayed: 5,
    performanceScore: 8.5,
    absenceRate: 8.6,
    overtimeHours: 40,
    email: "orochimaru.ninja@company.com",
    phone: "+1-234-567-8928",
    scores: {
      mentalHealth: 55,
      efficiency: 49,
      skillGap: 46,
      workLifeBalance: 43,
      growth: 63,
      ethics: 46,
      inclusion: 42,
      attrition: 40,
    },
  },
  {
    id: 29,
    username: "Minato",
    name: "Minato Namikaze",
    department: "HR",
    position: "Manager",
    salary: 96283,
    joinDate: "2023-07-16",
    leavesTaken: 10,
    totalLeaves: 25,
    workingHours: 46,
    expectedHours: 40,
    projectsCompleted: 8,
    projectsDelayed: 4,
    performanceScore: 8.5,
    absenceRate: 6.5,
    overtimeHours: 35,
    email: "minato.ninja@company.com",
    phone: "+1-234-567-8929",
    scores: {
      mentalHealth: 71,
      efficiency: 62,
      skillGap: 66,
      workLifeBalance: 66,
      growth: 61,
      ethics: 67,
      inclusion: 63,
      attrition: 64,
    },
  },
  {
    id: 30,
    username: "Kushina",
    name: "Kushina Uzumaki",
    department: "Finance",
    position: "Engineer",
    salary: 110044,
    joinDate: "2020-06-01",
    leavesTaken: 12,
    totalLeaves: 25,
    workingHours: 39,
    expectedHours: 40,
    projectsCompleted: 12,
    projectsDelayed: 3,
    performanceScore: 9.0,
    absenceRate: 7.1,
    overtimeHours: 40,
    email: "kushina.ninja@company.com",
    phone: "+1-234-567-8930",
    scores: {
      mentalHealth: 64,
      efficiency: 65,
      skillGap: 72,
      workLifeBalance: 68,
      growth: 68,
      ethics: 66,
      inclusion: 61,
      attrition: 73,
    },
  },
  {
    id: 31,
    username: "Obito",
    name: "Obito Uchiha",
    department: "Finance",
    position: "Engineer",
    salary: 118720,
    joinDate: "2019-05-12",
    leavesTaken: 10,
    totalLeaves: 25,
    workingHours: 47,
    expectedHours: 40,
    projectsCompleted: 14,
    projectsDelayed: 1,
    performanceScore: 7.3,
    absenceRate: 9.1,
    overtimeHours: 21,
    email: "obito.ninja@company.com",
    phone: "+1-234-567-8931",
    scores: {
      mentalHealth: 71,
      efficiency: 65,
      skillGap: 74,
      workLifeBalance: 69,
      growth: 67,
      ethics: 74,
      inclusion: 62,
      attrition: 64,
    },
  },
  {
    id: 32,
    username: "Madara",
    name: "Madara Uchiha",
    department: "Engineering",
    position: "Analyst",
    salary: 110572,
    joinDate: "2020-10-19",
    leavesTaken: 18,
    totalLeaves: 25,
    workingHours: 37,
    expectedHours: 40,
    projectsCompleted: 8,
    projectsDelayed: 4,
    performanceScore: 6.3,
    absenceRate: 6.9,
    overtimeHours: 15,
    email: "madara.ninja@company.com",
    phone: "+1-234-567-8932",
    scores: {
      mentalHealth: 67,
      efficiency: 66,
      skillGap: 72,
      workLifeBalance: 72,
      growth: 61,
      ethics: 63,
      inclusion: 66,
      attrition: 65,
    },
  },
  {
    id: 33,
    username: "Hashirama",
    name: "Hashirama Senju",
    department: "Strategy",
    position: "Engineer",
    salary: 78622,
    joinDate: "2023-01-06",
    leavesTaken: 17,
    totalLeaves: 25,
    workingHours: 38,
    expectedHours: 40,
    projectsCompleted: 17,
    projectsDelayed: 0,
    performanceScore: 6.4,
    absenceRate: 2.5,
    overtimeHours: 35,
    email: "hashirama.ninja@company.com",
    phone: "+1-234-567-8933",
    scores: {
      mentalHealth: 63,
      efficiency: 74,
      skillGap: 61,
      workLifeBalance: 74,
      growth: 69,
      ethics: 69,
      inclusion: 74,
      attrition: 60,
    },
  },
  {
    id: 34,
    username: "Tobirama",
    name: "Tobirama Senju",
    department: "HR",
    position: "Analyst",
    salary: 93489,
    joinDate: "2022-05-04",
    leavesTaken: 11,
    totalLeaves: 25,
    workingHours: 41,
    expectedHours: 40,
    projectsCompleted: 5,
    projectsDelayed: 0,
    performanceScore: 9.5,
    absenceRate: 8.5,
    overtimeHours: 28,
    email: "tobirama.ninja@company.com",
    phone: "+1-234-567-8934",
    scores: {
      mentalHealth: 60,
      efficiency: 74,
      skillGap: 60,
      workLifeBalance: 74,
      growth: 67,
      ethics: 64,
      inclusion: 69,
      attrition: 65,
    },
  },
  {
    id: 35,
    username: "Hiruzen",
    name: "Hiruzen Sarutobi",
    department: "Strategy",
    position: "Manager",
    salary: 95690,
    joinDate: "2023-06-21",
    leavesTaken: 13,
    totalLeaves: 25,
    workingHours: 45,
    expectedHours: 40,
    projectsCompleted: 18,
    projectsDelayed: 0,
    performanceScore: 6.4,
    absenceRate: 7.9,
    overtimeHours: 34,
    email: "hiruzen.ninja@company.com",
    phone: "+1-234-567-8935",
    scores: {
      mentalHealth: 73,
      efficiency: 64,
      skillGap: 71,
      workLifeBalance: 70,
      growth: 62,
      ethics: 67,
      inclusion: 66,
      attrition: 72,
    },
  },
  {
    id: 36,
    username: "Shino",
    name: "Shino Aburame",
    department: "Design",
    position: "Manager",
    salary: 115658,
    joinDate: "2019-06-20",
    leavesTaken: 15,
    totalLeaves: 25,
    workingHours: 46,
    expectedHours: 40,
    projectsCompleted: 6,
    projectsDelayed: 4,
    performanceScore: 9.7,
    absenceRate: 2.1,
    overtimeHours: 16,
    email: "shino.ninja@company.com",
    phone: "+1-234-567-8936",
    scores: {
      mentalHealth: 66,
      efficiency: 72,
      skillGap: 60,
      workLifeBalance: 67,
      growth: 71,
      ethics: 73,
      inclusion: 64,
      attrition: 73,
    },
  },
  {
    id: 37,
    username: "Anko",
    name: "Anko Mitarashi",
    department: "Marketing",
    position: "Designer",
    salary: 104643,
    joinDate: "2019-09-17",
    leavesTaken: 11,
    totalLeaves: 25,
    workingHours: 41,
    expectedHours: 40,
    projectsCompleted: 14,
    projectsDelayed: 4,
    performanceScore: 9.0,
    absenceRate: 9.5,
    overtimeHours: 1,
    email: "anko.ninja@company.com",
    phone: "+1-234-567-8937",
    scores: {
      mentalHealth: 69,
      efficiency: 72,
      skillGap: 73,
      workLifeBalance: 74,
      growth: 62,
      ethics: 74,
      inclusion: 72,
      attrition: 61,
    },
  },
  {
    id: 38,
    username: "Iruka",
    name: "Iruka Umino",
    department: "Strategy",
    position: "Analyst",
    salary: 88739,
    joinDate: "2021-05-18",
    leavesTaken: 5,
    totalLeaves: 25,
    workingHours: 42,
    expectedHours: 40,
    projectsCompleted: 6,
    projectsDelayed: 2,
    performanceScore: 7.5,
    absenceRate: 7.0,
    overtimeHours: 21,
    email: "iruka.ninja@company.com",
    phone: "+1-234-567-8938",
    scores: {
      mentalHealth: 64,
      efficiency: 74,
      skillGap: 72,
      workLifeBalance: 68,
      growth: 63,
      ethics: 67,
      inclusion: 72,
      attrition: 64,
    },
  },
  {
    id: 39,
    username: "Moegi",
    name: "Moegi",
    department: "Design",
    position: "Engineer",
    salary: 110826,
    joinDate: "2019-11-17",
    leavesTaken: 6,
    totalLeaves: 25,
    workingHours: 48,
    expectedHours: 40,
    projectsCompleted: 12,
    projectsDelayed: 5,
    performanceScore: 7.6,
    absenceRate: 8.2,
    overtimeHours: 3,
    email: "moegi.ninja@company.com",
    phone: "+1-234-567-8939",
    scores: {
      mentalHealth: 74,
      efficiency: 69,
      skillGap: 74,
      workLifeBalance: 69,
      growth: 62,
      ethics: 71,
      inclusion: 74,
      attrition: 64,
    },
  },
  {
    id: 40,
    username: "Udon",
    name: "Udon",
    department: "Engineering",
    position: "Designer",
    salary: 82024,
    joinDate: "2020-11-05",
    leavesTaken: 5,
    totalLeaves: 25,
    workingHours: 47,
    expectedHours: 40,
    projectsCompleted: 20,
    projectsDelayed: 2,
    performanceScore: 6.2,
    absenceRate: 6.6,
    overtimeHours: 21,
    email: "udon.ninja@company.com",
    phone: "+1-234-567-8940",
    scores: {
      mentalHealth: 72,
      efficiency: 61,
      skillGap: 67,
      workLifeBalance: 74,
      growth: 74,
      ethics: 60,
      inclusion: 61,
      attrition: 72,
    },
  },
  {
    id: 41,
    username: "Konohamaru",
    name: "Konohamaru",
    department: "Engineering",
    position: "Manager",
    salary: 114998,
    joinDate: "2023-03-18",
    leavesTaken: 9,
    totalLeaves: 25,
    workingHours: 37,
    expectedHours: 40,
    projectsCompleted: 20,
    projectsDelayed: 1,
    performanceScore: 9.4,
    absenceRate: 6.8,
    overtimeHours: 31,
    email: "konohamaru.ninja@company.com",
    phone: "+1-234-567-8941",
    scores: {
      mentalHealth: 70,
      efficiency: 60,
      skillGap: 70,
      workLifeBalance: 63,
      growth: 71,
      ethics: 62,
      inclusion: 60,
      attrition: 68,
    },
  },
  {
    id: 42,
    username: "Shisui",
    name: "Shisui Uchiha",
    department: "Operations",
    position: "Analyst",
    salary: 61616,
    joinDate: "2021-01-28",
    leavesTaken: 8,
    totalLeaves: 25,
    workingHours: 49,
    expectedHours: 40,
    projectsCompleted: 14,
    projectsDelayed: 3,
    performanceScore: 9.0,
    absenceRate: 1.8,
    overtimeHours: 19,
    email: "shisui.ninja@company.com",
    phone: "+1-234-567-8942",
    scores: {
      mentalHealth: 68,
      efficiency: 65,
      skillGap: 60,
      workLifeBalance: 71,
      growth: 74,
      ethics: 62,
      inclusion: 72,
      attrition: 63,
    },
  },
  {
    id: 43,
    username: "Karin",
    name: "Karin",
    department: "HR",
    position: "Manager",
    salary: 114384,
    joinDate: "2021-03-27",
    leavesTaken: 5,
    totalLeaves: 25,
    workingHours: 42,
    expectedHours: 40,
    projectsCompleted: 11,
    projectsDelayed: 2,
    performanceScore: 8.3,
    absenceRate: 6.6,
    overtimeHours: 32,
    email: "karin.ninja@company.com",
    phone: "+1-234-567-8943",
    scores: {
      mentalHealth: 67,
      efficiency: 70,
      skillGap: 72,
      workLifeBalance: 68,
      growth: 68,
      ethics: 68,
      inclusion: 65,
      attrition: 70,
    },
  },
  {
    id: 44,
    username: "Suigetsu",
    name: "Suigetsu Hozuki",
    department: "Marketing",
    position: "Developer",
    salary: 114527,
    joinDate: "2020-06-28",
    leavesTaken: 20,
    totalLeaves: 25,
    workingHours: 45,
    expectedHours: 40,
    projectsCompleted: 7,
    projectsDelayed: 3,
    performanceScore: 7.1,
    absenceRate: 3.8,
    overtimeHours: 11,
    email: "suigetsu.ninja@company.com",
    phone: "+1-234-567-8944",
    scores: {
      mentalHealth: 89,
      efficiency: 79,
      skillGap: 75,
      workLifeBalance: 94,
      growth: 94,
      ethics: 92,
      inclusion: 81,
      attrition: 95,
    },
  },
  {
    id: 45,
    username: "Jugo",
    name: "Jugo",
    department: "Finance",
    position: "Manager",
    salary: 65492,
    joinDate: "2022-08-15",
    leavesTaken: 12,
    totalLeaves: 25,
    workingHours: 45,
    expectedHours: 40,
    projectsCompleted: 6,
    projectsDelayed: 0,
    performanceScore: 8.1,
    absenceRate: 2.2,
    overtimeHours: 34,
    email: "jugo.ninja@company.com",
    phone: "+1-234-567-8945",
    scores: {
      mentalHealth: 78,
      efficiency: 79,
      skillGap: 89,
      workLifeBalance: 90,
      growth: 95,
      ethics: 100,
      inclusion: 84,
      attrition: 85,
    },
  },
  {
    id: 46,
    username: "Omoi",
    name: "Omoi",
    department: "Engineering",
    position: "Consultant",
    salary: 73411,
    joinDate: "2019-06-11",
    leavesTaken: 15,
    totalLeaves: 25,
    workingHours: 36,
    expectedHours: 40,
    projectsCompleted: 18,
    projectsDelayed: 1,
    performanceScore: 7.2,
    absenceRate: 8.5,
    overtimeHours: 5,
    email: "omoi.ninja@company.com",
    phone: "+1-234-567-8946",
    scores: {
      mentalHealth: 81,
      efficiency: 75,
      skillGap: 81,
      workLifeBalance: 99,
      growth: 98,
      ethics: 91,
      inclusion: 93,
      attrition: 87,
    },
  },
  {
    id: 47,
    username: "Karui",
    name: "Karui",
    department: "Marketing",
    position: "Analyst",
    salary: 102690,
    joinDate: "2020-09-09",
    leavesTaken: 17,
    totalLeaves: 25,
    workingHours: 41,
    expectedHours: 40,
    projectsCompleted: 20,
    projectsDelayed: 5,
    performanceScore: 6.1,
    absenceRate: 2.8,
    overtimeHours: 32,
    email: "karui.ninja@company.com",
    phone: "+1-234-567-8947",
    scores: {
      mentalHealth: 93,
      efficiency: 87,
      skillGap: 98,
      workLifeBalance: 77,
      growth: 89,
      ethics: 92,
      inclusion: 100,
      attrition: 86,
    },
  },
  {
    id: 48,
    username: "Darui",
    name: "Darui",
    department: "Operations",
    position: "Engineer",
    salary: 96726,
    joinDate: "2020-04-30",
    leavesTaken: 6,
    totalLeaves: 25,
    workingHours: 35,
    expectedHours: 40,
    projectsCompleted: 17,
    projectsDelayed: 1,
    performanceScore: 6.0,
    absenceRate: 1.2,
    overtimeHours: 21,
    email: "darui.ninja@company.com",
    phone: "+1-234-567-8948",
    scores: {
      mentalHealth: 94,
      efficiency: 87,
      skillGap: 96,
      workLifeBalance: 76,
      growth: 98,
      ethics: 85,
      inclusion: 77,
      attrition: 100,
    },
  },
  {
    id: 49,
    username: "Killer",
    name: "Killer Bee",
    department: "Design",
    position: "Developer",
    salary: 118317,
    joinDate: "2021-06-28",
    leavesTaken: 12,
    totalLeaves: 25,
    workingHours: 45,
    expectedHours: 40,
    projectsCompleted: 8,
    projectsDelayed: 4,
    performanceScore: 7.2,
    absenceRate: 1.0,
    overtimeHours: 36,
    email: "killer.ninja@company.com",
    phone: "+1-234-567-8949",
    scores: {
      mentalHealth: 93,
      efficiency: 80,
      skillGap: 78,
      workLifeBalance: 80,
      growth: 98,
      ethics: 90,
      inclusion: 98,
      attrition: 100,
    },
  },
  {
    id: 50,
    username: "A",
    name: "A (Fourth Raikage)",
    department: "Marketing",
    position: "Manager",
    salary: 118687,
    joinDate: "2021-12-05",
    leavesTaken: 15,
    totalLeaves: 25,
    workingHours: 50,
    expectedHours: 40,
    projectsCompleted: 13,
    projectsDelayed: 3,
    performanceScore: 7.5,
    absenceRate: 1.7,
    overtimeHours: 29,
    email: "a.ninja@company.com",
    phone: "+1-234-567-8950",
    scores: {
      mentalHealth: 89,
      efficiency: 86,
      skillGap: 82,
      workLifeBalance: 82,
      growth: 89,
      ethics: 80,
      inclusion: 82,
      attrition: 80,
    },
  },
  {
    id: 51,
    username: "Mei",
    name: "Mei Terumi",
    department: "Finance",
    position: "Manager",
    salary: 112095,
    joinDate: "2020-08-20",
    leavesTaken: 9,
    totalLeaves: 25,
    workingHours: 35,
    expectedHours: 40,
    projectsCompleted: 20,
    projectsDelayed: 2,
    performanceScore: 9.6,
    absenceRate: 3.1,
    overtimeHours: 34,
    email: "mei.ninja@company.com",
    phone: "+1-234-567-8951",
    scores: {
      mentalHealth: 79,
      efficiency: 83,
      skillGap: 76,
      workLifeBalance: 81,
      growth: 99,
      ethics: 98,
      inclusion: 82,
      attrition: 90,
    },
  },
  {
    id: 52,
    username: "Chojuro",
    name: "Chojuro",
    department: "Marketing",
    position: "Manager",
    salary: 114937,
    joinDate: "2022-12-15",
    leavesTaken: 11,
    totalLeaves: 25,
    workingHours: 42,
    expectedHours: 40,
    projectsCompleted: 5,
    projectsDelayed: 5,
    performanceScore: 8.7,
    absenceRate: 3.0,
    overtimeHours: 30,
    email: "chojuro.ninja@company.com",
    phone: "+1-234-567-8952",
    scores: {
      mentalHealth: 98,
      efficiency: 98,
      skillGap: 89,
      workLifeBalance: 96,
      growth: 98,
      ethics: 91,
      inclusion: 87,
      attrition: 75,
    },
  },
  {
    id: 53,
    username: "Kurotsuchi",
    name: "Kurotsuchi",
    department: "Operations",
    position: "Developer",
    salary: 104300,
    joinDate: "2020-09-25",
    leavesTaken: 14,
    totalLeaves: 25,
    workingHours: 45,
    expectedHours: 40,
    projectsCompleted: 11,
    projectsDelayed: 4,
    performanceScore: 7.2,
    absenceRate: 5.6,
    overtimeHours: 10,
    email: "kurotsuchi.ninja@company.com",
    phone: "+1-234-567-8953",
    scores: {
      mentalHealth: 77,
      efficiency: 94,
      skillGap: 81,
      workLifeBalance: 80,
      growth: 76,
      ethics: 94,
      inclusion: 99,
      attrition: 92,
    },
  },
  {
    id: 54,
    username: "Onoki",
    name: "Onoki",
    department: "Operations",
    position: "Designer",
    salary: 61675,
    joinDate: "2021-05-12",
    leavesTaken: 13,
    totalLeaves: 25,
    workingHours: 40,
    expectedHours: 40,
    projectsCompleted: 11,
    projectsDelayed: 0,
    performanceScore: 9.7,
    absenceRate: 2.9,
    overtimeHours: 22,
    email: "onoki.ninja@company.com",
    phone: "+1-234-567-8954",
    scores: {
      mentalHealth: 81,
      efficiency: 86,
      skillGap: 99,
      workLifeBalance: 97,
      growth: 98,
      ethics: 95,
      inclusion: 84,
      attrition: 78,
    },
  },
  {
    id: 55,
    username: "Kankuro",
    name: "Kankuro",
    department: "HR",
    position: "Developer",
    salary: 103850,
    joinDate: "2021-03-05",
    leavesTaken: 10,
    totalLeaves: 25,
    workingHours: 41,
    expectedHours: 40,
    projectsCompleted: 17,
    projectsDelayed: 0,
    performanceScore: 6.2,
    absenceRate: 4.4,
    overtimeHours: 2,
    email: "kankuro.ninja@company.com",
    phone: "+1-234-567-8955",
    scores: {
      mentalHealth: 83,
      efficiency: 85,
      skillGap: 95,
      workLifeBalance: 88,
      growth: 90,
      ethics: 77,
      inclusion: 84,
      attrition: 83,
    },
  },
  {
    id: 56,
    username: "Hanabi",
    name: "Hanabi Hyuga",
    department: "Engineering",
    position: "Analyst",
    salary: 69621,
    joinDate: "2021-03-26",
    leavesTaken: 5,
    totalLeaves: 25,
    workingHours: 46,
    expectedHours: 40,
    projectsCompleted: 9,
    projectsDelayed: 0,
    performanceScore: 8.6,
    absenceRate: 2.7,
    overtimeHours: 30,
    email: "hanabi.ninja@company.com",
    phone: "+1-234-567-8956",
    scores: {
      mentalHealth: 83,
      efficiency: 75,
      skillGap: 76,
      workLifeBalance: 82,
      growth: 77,
      ethics: 98,
      inclusion: 80,
      attrition: 89,
    },
  },
  {
    id: 57,
    username: "Sumire",
    name: "Sumire Kakei",
    department: "Design",
    position: "Consultant",
    salary: 107301,
    joinDate: "2022-02-14",
    leavesTaken: 11,
    totalLeaves: 25,
    workingHours: 39,
    expectedHours: 40,
    projectsCompleted: 20,
    projectsDelayed: 3,
    performanceScore: 7.0,
    absenceRate: 9.0,
    overtimeHours: 0,
    email: "sumire.ninja@company.com",
    phone: "+1-234-567-8957",
    scores: {
      mentalHealth: 78,
      efficiency: 93,
      skillGap: 76,
      workLifeBalance: 91,
      growth: 85,
      ethics: 97,
      inclusion: 88,
      attrition: 98,
    },
  },
  {
    id: 58,
    username: "Boruto",
    name: "Boruto Uzumaki",
    department: "Marketing",
    position: "Consultant",
    salary: 115044,
    joinDate: "2023-01-27",
    leavesTaken: 5,
    totalLeaves: 25,
    workingHours: 38,
    expectedHours: 40,
    projectsCompleted: 17,
    projectsDelayed: 0,
    performanceScore: 6.4,
    absenceRate: 7.0,
    overtimeHours: 12,
    email: "boruto.ninja@company.com",
    phone: "+1-234-567-8958",
    scores: {
      mentalHealth: 86,
      efficiency: 100,
      skillGap: 100,
      workLifeBalance: 95,
      growth: 89,
      ethics: 87,
      inclusion: 89,
      attrition: 96,
    },
  },
];

const weights = {
  mentalHealth: 15,
  efficiency: 20,
  skillGap: 15,
  workLifeBalance: 10,
  growth: 10,
  ethics: 10,
  inclusion: 10,
  attrition: 10,
};

const EmployeeRiskDashboard = ({ onEmployeeSelect }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filterRisk, setFilterRisk] = useState("all");
  const [employees] = useState(employeesData);

  const calculateRiskScore = (employee) => {
    let total = 0;
    for (let key in employee.scores) {
      const score = parseFloat(employee.scores[key]);
      if (!isNaN(score) && score >= 0 && score <= 100) {
        total += score * weights[key];
      }
    }

    const finalScore = total / 100;
    let level = "Low";
    let color = "emerald";

    if (finalScore < 60) {
      level = "High";
      color = "red";
    } else if (finalScore < 75) {
      level = "Moderate";
      color = "amber";
    }

    return {
      score: finalScore.toFixed(1),
      level,
      color,
    };
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterRisk === "all") return matchesSearch;

    const risk = calculateRiskScore(emp);
    return matchesSearch && risk.level.toLowerCase() === filterRisk;
  });

  const getRiskColor = (level) => {
    switch (level) {
      case "High":
        return "text-red-600 bg-red-50 border-red-200";
      case "Moderate":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case "High":
        return <AlertTriangle className="w-4 h-4" />;
      case "Moderate":
        return <TrendingUp className="w-4 h-4" />;
      case "Low":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <BarChart3 className="w-4 h-4" />;
    }
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    if (onEmployeeSelect) {
      onEmployeeSelect(employee);
    }
  };

  const handleGoToRiskAssessment = (employee) => {
    navigate(`/risk-assessment/${employee.id}`, {
      state: { employee },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
         <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Employee Risk Management Dashboard
            </h1>
            <p className="text-gray-600">
              Monitor employee performance, attendance, and risk factors
            </p>
          </div>
          <div className="h-10 w-10">
            <a href="/">
              <img
                src={logo}
                alt="Logo"
                style={{ height: "50px", cursor: "pointer" }}
              />
            </a>
          </div>
        </div>
       

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search employees by name, department, or position..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
              >
                <option value="all">All Risk Levels</option>
                <option value="high">High Risk</option>
                <option value="moderate">Moderate Risk</option>
                <option value="low">Low Risk</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Employee List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Employees ({filteredEmployees.length})
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredEmployees.map((employee) => {
                  const risk = calculateRiskScore(employee);
                  return (
                    <div
                      key={employee.id}
                      className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedEmployee?.id === employee.id
                          ? "bg-blue-50 border-l-4 border-blue-500"
                          : ""
                      }`}
                      onClick={() => handleEmployeeClick(employee)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                              {employee.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {employee.position} • {employee.department}
                            </p>
                            <p className="text-sm text-gray-500">
                              {employee.email}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(
                              risk.level
                            )}`}
                          >
                            {getRiskIcon(risk.level)}
                            {risk.level} Risk
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Score: {risk.score}/100
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Employee Details */}
          <div className="lg:col-span-1">
            {selectedEmployee ? (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {selectedEmployee.name}
                      </h2>
                      <p className="text-gray-600">
                        {selectedEmployee.position}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedEmployee.department}
                      </p>
                    </div>
                  </div>

                  {(() => {
                    const risk = calculateRiskScore(selectedEmployee);
                    return (
                      <div
                        className={`p-4 rounded-lg border ${getRiskColor(
                          risk.level
                        )}`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {getRiskIcon(risk.level)}
                          <span className="font-semibold">
                            {risk.level} Risk Employee
                          </span>
                        </div>
                        <p className="text-sm">Risk Score: {risk.score}/100</p>
                      </div>
                    );
                  })()}

                  {/* Risk Assessment Button */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleGoToRiskAssessment(selectedEmployee)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Go to Risk Assessment
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Basic Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Join Date:</span>
                        <span className="font-medium">
                          {new Date(
                            selectedEmployee.joinDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">
                          {selectedEmployee.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Assessment Scores */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Assessment Scores
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(selectedEmployee.scores).map(
                        ([key, value]) => (
                          <div key={key}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600 capitalize">
                                {key.replace(/_/g, " ")}:
                              </span>
                              <span className="font-medium">{value}/100</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  value >= 80
                                    ? "bg-green-500"
                                    : value >= 60
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${value}%` }}
                              ></div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Financial Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Financial Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Salary:</span>
                        <span className="font-medium">
                          ${selectedEmployee.salary.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Salary:</span>
                        <span className="font-medium">
                          ${(selectedEmployee.salary / 12).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Leave Management */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Leave Management
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Leaves Taken:</span>
                        <span className="font-medium">
                          {selectedEmployee.leavesTaken}/
                          {selectedEmployee.totalLeaves}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (selectedEmployee.leavesTaken /
                                selectedEmployee.totalLeaves) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Remaining:</span>
                        <span className="font-medium">
                          {selectedEmployee.totalLeaves -
                            selectedEmployee.leavesTaken}{" "}
                          days
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Absence Rate:</span>
                        <span className="font-medium">
                          {selectedEmployee.absenceRate}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Working Hours
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weekly Hours:</span>
                        <span className="font-medium">
                          {selectedEmployee.workingHours}h
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expected Hours:</span>
                        <span className="font-medium">
                          {selectedEmployee.expectedHours}h
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Overtime Hours:</span>
                        <span className="font-medium">
                          {selectedEmployee.overtimeHours}h
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hours Variance:</span>
                        <span
                          className={`font-medium ${
                            selectedEmployee.workingHours >
                            selectedEmployee.expectedHours
                              ? "text-orange-600"
                              : selectedEmployee.workingHours <
                                selectedEmployee.expectedHours
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {selectedEmployee.workingHours >
                          selectedEmployee.expectedHours
                            ? "+"
                            : ""}
                          {selectedEmployee.workingHours -
                            selectedEmployee.expectedHours}
                          h
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Performance Metrics
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Performance Score:
                        </span>
                        <span className="font-medium">
                          {selectedEmployee.performanceScore}/10
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Projects Completed:
                        </span>
                        <span className="font-medium">
                          {selectedEmployee.projectsCompleted}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Projects Delayed:</span>
                        <span className="font-medium">
                          {selectedEmployee.projectsDelayed}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Success Rate:</span>
                        <span className="font-medium">
                          {(
                            ((selectedEmployee.projectsCompleted -
                              selectedEmployee.projectsDelayed) /
                              selectedEmployee.projectsCompleted) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select an Employee
                </h3>
                <p className="text-gray-600">
                  Click on an employee from the list to view their detailed risk
                  analysis and information.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRiskDashboard;
