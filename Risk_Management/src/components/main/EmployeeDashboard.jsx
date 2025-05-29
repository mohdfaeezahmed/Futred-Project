import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";

const simulateGSAP = {
  timeline: () => ({
    from: () => ({ delay: () => ({ stagger: () => ({}) }) }),
    to: () => ({ delay: () => ({ stagger: () => ({}) }) }),
    fromTo: () => ({ delay: () => ({ stagger: () => ({}) }) }),
  }),
  from: () => {},
  to: () => {},
  fromTo: () => {},
  set: () => {},
};

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

const fieldIcons = {
  mentalHealth: "🧠",
  efficiency: "⚡",
  skillGap: "📈",
  workLifeBalance: "⚖️",
  growth: "🌱",
  ethics: "🤝",
  inclusion: "🌈",
  attrition: "👥",
};

const fieldDescriptions = {
  mentalHealth: "Employee mental wellbeing and stress levels",
  efficiency: "Productivity metrics and performance indicators",
  skillGap: "Alignment between skills and role requirements",
  workLifeBalance: "Work-life balance satisfaction scores",
  growth: "Career development and advancement opportunities",
  ethics: "Ethical workplace practices and integrity",
  inclusion: "Diversity, equity, and inclusion measures",
  attrition: "Employee retention and turnover indicators",
};

// Dummy employee data with scores
const dummyEmployeeData = {
  1: {
    name: "Naruto Uzumaki",
    position: "Senior Developer",
    department: "Engineering",
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
  2: {
    name: "Sasuke Uchiha",
    position: "Marketing Manager",
    department: "Marketing",
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
  3: {
    name: "Sakura Haruno",
    position: "Financial Analyst",
    department: "Finance",
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
  4: {
    name: "Kakashi Hatake",
    position: "HR Manager",
    department: "HR",
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
  5: {
    name: "Gaara of the Sand",
    position: "DevOps Engineer",
    department: "Engineering",
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
  6: {
    name: "Hinata Hyuga",
    position: "UI/UX Designer",
    department: "Design",
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
  7: {
    name: "Shikamaru Nara",
    position: "Strategic Analyst",
    department: "Strategy",
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
  8: {
    name: "Rock Lee",
    position: "Operations Manager",
    department: "Operations",
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
  9: {
    name: "Itachi Uchiha",
    position: "Designer",
    department: "Design",
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
  10: {
    name: "Neji Hyuga",
    position: "Analyst",
    department: "Operations",
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
  11: {
    name: "Temari",
    position: "Manager",
    department: "Marketing",
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
  12: {
    name: "Kiba Inuzuka",
    position: "Developer",
    department: "Engineering",
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
  13: {
    name: "Ino Yamanaka",
    position: "Consultant",
    department: "Finance",
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
  14: {
    name: "Choji Akimichi",
    position: "Engineer",
    department: "Engineering",
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
  15: {
    name: "Tenten",
    position: "Designer",
    department: "Design",
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
  16: {
    name: "Kurenai Yuhi",
    position: "Manager",
    department: "HR",
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
  17: {
    name: "Asuma Sarutobi",
    position: "Consultant",
    department: "Strategy",
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
  18: {
    name: "Might Guy",
    position: "Engineer",
    department: "Operations",
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
  19: {
    name: "Konan",
    position: "Manager",
    department: "Finance",
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
  20: {
    name: "Nagato Uzumaki",
    position: "Analyst",
    department: "HR",
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
  21: {
    name: "Kisame Hoshigaki",
    position: "Engineer",
    department: "Engineering",
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
  22: {
    name: "Zabuza Momochi",
    position: "Consultant",
    department: "Strategy",
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
  23: {
    name: "Haku",
    position: "Developer",
    department: "Design",
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
  24: {
    name: "Yamato",
    position: "Manager",
    department: "Operations",
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
  25: {
    name: "Sai",
    position: "Designer",
    department: "Design",
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
  26: {
    name: "Jiraiya",
    position: "Developer",
    department: "Engineering",
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
  27: {
    name: "Tsunade",
    position: "Analyst",
    department: "Finance",
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
  28: {
    name: "Orochimaru",
    position: "Manager",
    department: "HR",
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
  29: {
    name: "Minato Namikaze",
    position: "Engineer",
    department: "Engineering",
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
  30: {
    name: "Kushina Uzumaki",
    position: "Manager",
    department: "Finance",
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
  31: {
    name: "Obito Uchiha",
    position: "Developer",
    department: "Strategy",
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
  32: {
    name: "Madara Uchiha",
    position: "Consultant",
    department: "HR",
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
  33: {
    name: "Hashirama Senju",
    position: "Analyst",
    department: "Engineering",
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
  34: {
    name: "Tobirama Senju",
    position: "Manager",
    department: "Operations",
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
  35: {
    name: "Hiruzen Sarutobi",
    position: "Engineer",
    department: "Strategy",
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
  36: {
    name: "Shino Aburame",
    position: "Analyst",
    department: "HR",
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
  37: {
    name: "Anko Mitarashi",
    position: "Consultant",
    department: "Finance",
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
  38: {
    name: "Iruka Umino",
    position: "Manager",
    department: "Engineering",
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
  39: {
    name: "Moegi",
    department: "Design",
    position: "Engineer",
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
  40: {
    name: "Udon",
    department: "Engineering",
    position: "Designer",
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
  41: {
    name: "Konohamaru",
    department: "Engineering",
    position: "Manager",
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
  42: {
    name: "Shisui Uchiha",
    department: "Operations",
    position: "Analyst",
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
  43: {
    name: "Karin",
    department: "HR",
    position: "Manager",
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
  44: {
    name: "Suigetsu Hozuki",
    department: "Marketing",
    position: "Developer",
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
  45: {
    name: "Jugo",
    department: "Finance",
    position: "Manager",
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
  46: {
    name: "Omoi",
    department: "Engineering",
    position: "Consultant",
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
  47: {
    name: "Karui",
    department: "Marketing",
    position: "Analyst",
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
  48: {
    name: "Darui",
    department: "Operations",
    position: "Engineer",
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
  49: {
    name: "Killer Bee",
    department: "Design",
    position: "Developer",
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
  50: {
    name: "A (Fourth Raikage)",
    department: "Marketing",
    position: "Manager",
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
  51: {
    name: "Mei Terumi",
    department: "Finance",
    position: "Manager",
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
  52: {
    name: "Chojuro",
    department: "Marketing",
    position: "Manager",
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
  53: {
    name: "Kurotsuchi",
    department: "Operations",
    position: "Developer",
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
  54: {
    name: "Onoki",
    department: "Operations",
    position: "Designer",
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
  55: {
    name: "Kankuro",
    department: "HR",
    position: "Developer",
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
  56: {
    name: "Hanabi Hyuga",
    department: "Engineering",
    position: "Analyst",
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
  57: {
    name: "Sumire Kakei",
    department: "Design",
    position: "Consultant",
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
  58: {
    name: "Boruto Uzumaki",
    department: "Marketing",
    position: "Consultant",
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
};

const FloatingParticle = ({
  delay = 0,
  size = "w-2 h-2",
  color = "bg-blue-300",
}) => (
  <div
    className={`absolute ${size} ${color} rounded-full opacity-20 animate-float`}
    style={{
      animationDelay: `${delay}s`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
);

const MetricCard = ({
  title,
  value,
  icon,
  color = "blue",
  subtitle,
  trend,
  trendDirection = "up",
}) => (
  <div className="group relative">
    {/* Glow Effect */}
    <div
      className={`absolute -inset-1 bg-gradient-to-r from-${color}-400 via-${color}-500 to-${color}-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition-all duration-500`}
    ></div>

    {/* Main Card */}
    <div
      className={`relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 hover:border-${color}-400/50 shadow-2xl hover:shadow-${color}-500/25 transition-all duration-500 hover:scale-105 animate-slide-up`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className={`absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-${color}-400 to-${color}-600 rounded-full blur-3xl`}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Header with Icon and Trend */}
        <div className="flex items-start justify-between mb-6">
          <div className="relative">
            <div
              className={`absolute inset-0 bg-${color}-500 rounded-2xl blur-lg opacity-50 animate-pulse`}
            ></div>
            <div
              className={`relative bg-gradient-to-br from-${color}-500/30 to-${color}-600/30 backdrop-blur-sm rounded-2xl p-4 border border-${color}-400/40`}
            >
              <span className="text-4xl">{icon}</span>
            </div>
          </div>

          {trend && (
            <div
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl ${
                trendDirection === "up"
                  ? "bg-green-500/20 border border-green-400/40 text-green-300"
                  : trendDirection === "down"
                  ? "bg-red-500/20 border border-red-400/40 text-red-300"
                  : "bg-gray-500/20 border border-gray-400/40 text-gray-300"
              }`}
            >
              <span className="text-sm font-bold">
                {trendDirection === "up"
                  ? "↗"
                  : trendDirection === "down"
                  ? "↘"
                  : "→"}
              </span>
              <span className="text-xs font-semibold">{trend}</span>
            </div>
          )}
        </div>

        {/* Value Display */}
        <div className="mb-4">
          <div
            className={`text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-${color}-300 to-${color}-500 mb-2 animate-counter`}
          >
            {value}
          </div>
          <div className="relative">
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            {subtitle && (
              <p className="text-gray-300 text-sm font-medium leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="relative">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Performance</span>
            <span className={`text-${color}-300 font-bold`}>
              {title === "Accuracy"
                ? value
                : title === "Active Metrics"
                ? "100%"
                : title === "Risk Factors"
                ? "25%"
                : "85%"}
            </span>
          </div>
          <div className="relative h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 h-full bg-gradient-to-r from-${color}-500 to-${color}-400 rounded-full transition-all duration-2000 ease-out`}
              style={{
                width:
                  title === "Accuracy"
                    ? value
                    : title === "Active Metrics"
                    ? "100%"
                    : title === "Risk Factors"
                    ? "25%"
                    : "85%",
              }}
            >
              <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Interactive Hover Effect */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-${color}-500/5 to-${color}-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        ></div>
      </div>
    </div>
  </div>
);

export default function RiskDashboard() {
  const { employeeId } = useParams();

  // Determine which employee data to use
  const initialEmployee =
    dummyEmployeeData[employeeId] || dummyEmployeeData["1"]; // Fallback to employee 1 if no ID is provided

  const [formData, setFormData] = useState({
    mentalHealth: initialEmployee?.scores?.mentalHealth || "",
    efficiency: initialEmployee?.scores?.efficiency || "",
    skillGap: initialEmployee?.scores?.skillGap || "",
    workLifeBalance: initialEmployee?.scores?.workLifeBalance || "",
    growth: initialEmployee?.scores?.growth || "",
    ethics: initialEmployee?.scores?.ethics || "",
    inclusion: initialEmployee?.scores?.inclusion || "",
    attrition: initialEmployee?.scores?.attrition || "",
  });

  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [focusedField, setFocusedField] = useState(null);
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef();
  const headerRef = useRef();
  const formRef = useRef();
  const particlesRef = useRef();

  useEffect(() => {
    setMounted(true);
  }, []);

  // New useEffect to update formData when initialEmployee changes
  useEffect(() => {
    if (initialEmployee && initialEmployee.scores) {
      setFormData({
        mentalHealth: initialEmployee.scores.mentalHealth || "",
        efficiency: initialEmployee.scores.efficiency || "",
        skillGap: initialEmployee.scores.skillGap || "",
        workLifeBalance: initialEmployee.scores.workLifeBalance || "",
        growth: initialEmployee.scores.growth || "",
        ethics: initialEmployee.scores.ethics || "",
        inclusion: initialEmployee.scores.inclusion || "",
        attrition: initialEmployee.scores.attrition || "",
      });
    }
  }, [initialEmployee]); // Dependency array includes initialEmployee

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateRiskScore = async () => {
    setIsCalculating(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    let total = 0;
    for (let key in formData) {
      const score = parseFloat(formData[key]);
      if (isNaN(score) || score < 0 || score > 100) {
        setIsCalculating(false);
        return alert("Please fill all fields with numbers between 0-100");
      }
      total += score * weights[key];
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

    setResult({ score: finalScore.toFixed(1), level, color });
    setIsCalculating(false);
  };

  useEffect(() => {
    if (result) {
      let start = 0;
      const end = parseFloat(result.score);
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setAnimatedScore(end);
          clearInterval(timer);
        } else {
          setAnimatedScore(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [result]);

  const getCompletionPercentage = () => {
    const filledFields = Object.values(formData).filter(
      (value) => value !== ""
    ).length;
    return (filledFields / Object.keys(formData).length) * 100;
  };

  const dotPatternSvg = encodeURIComponent(
    `<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#9C92AC" fill-opacity="0.1"><circle cx="30" cy="30" r="2"/></g></g></svg>`
  );

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,${dotPatternSvg}")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Floating Particles */}
      <div
        ref={particlesRef}
        className="fixed inset-0 pointer-events-none overflow-hidden"
      >
        {[...Array(20)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.5}
            size={Math.random() > 0.5 ? "w-3 h-3" : "w-2 h-2"}
            color={
              ["bg-blue-400", "bg-purple-400", "bg-pink-400", "bg-indigo-400"][
                Math.floor(Math.random() * 4)
              ]
            }
          />
        ))}
      </div>

      {/* Aurora Background Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-aurora-1"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-aurora-2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-aurora-3"></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Animated Header */}
          <div ref={headerRef} className="text-center mb-16 animate-fade-in-up">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-6 border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-4xl animate-bounce">📊</span>
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6 animate-gradient-x">
              Risk Intelligence
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 animate-fade-in-up delay-200">
              Advanced AI-powered employee risk assessment platform
            </p>

            {/* Employee Info */}
            {initialEmployee && (
              <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-6 animate-fade-in-up delay-300">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-3xl">
                    {initialEmployee.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl font-bold text-white">
                      {initialEmployee.name}
                    </h2>
                    <p className="text-gray-300">{initialEmployee.position}</p>
                    <p className="text-sm text-gray-400">
                      {initialEmployee.department}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Progress Indicator */}
            <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20 animate-fade-in-up delay-300">
              <div className="flex justify-between text-white mb-2">
                <span className="font-medium">Assessment Progress</span>
                <span className="font-bold">
                  {Math.round(getCompletionPercentage())}%
                </span>
              </div>
              <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${getCompletionPercentage()}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in-up delay-500">
            <MetricCard
              title="Active Metrics"
              value="8"
              icon="📈"
              color="blue"
            />
            <MetricCard
              title="Risk Factors"
              value="5"
              icon="⚠️"
              color="amber"
            />
            <MetricCard title="Employees" value="247" icon="👥" color="green" />
            <MetricCard title="Accuracy" value="94%" icon="🎯" color="purple" />
          </div>

          {/* Main Assessment Form */}
          <div
            ref={formRef}
            className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 md:p-12 mb-12 shadow-2xl animate-fade-in-up delay-700"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Risk Assessment Metrics
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {Object.keys(formData).map((key, index) => (
                <div
                  key={key}
                  className={`form-field group relative animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-3xl p-8 border-2 border-gradient-to-r from-cyan-400/30 via-blue-400/30 to-purple-400/30 hover:border-white/60 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/25 group-hover:bg-gradient-to-br group-hover:from-blue-500/10 group-hover:to-purple-500/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-blue-400/5 to-purple-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
                            <div
                              className="relative text-6xl animate-bounce bg-gradient-to-r from-white to-gray-200 rounded-full p-3"
                              style={{ animationDelay: `${index * 0.2}s` }}
                            >
                              {fieldIcons[key]}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 text-cyan-200 text-sm font-black px-4 py-2 rounded-2xl border-2 border-cyan-400/40 backdrop-blur-sm animate-pulse">
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
                                Weight: {weights[key]}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 font-black text-xl capitalize mb-3 animate-text-shimmer">
                          {key.replace(/([A-Z])/g, " $1")}
                        </label>
                        <p className="text-gray-200 text-base leading-relaxed font-medium bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                          {fieldDescriptions[key]}
                        </p>
                      </div>

                      <div className="relative">
                        <input
                          type="number"
                          name={key}
                          value={formData[key]}
                          onChange={handleChange}
                          onFocus={() => setFocusedField(key)}
                          onBlur={() => setFocusedField(null)}
                          min="0"
                          max="100"
                          placeholder="0-100"
                          className="w-full px-6 py-5 bg-gradient-to-r from-white/15 to-white/5 border-3 border-gradient-to-r from-cyan-400/40 via-blue-400/40 to-purple-400/40 rounded-2xl focus:border-cyan-400 focus:ring-6 focus:ring-cyan-400/30 focus:shadow-lg focus:shadow-cyan-400/20 outline-none transition-all duration-500 text-white text-2xl font-black placeholder-gray-300 backdrop-blur-lg hover:scale-105 focus:scale-105"
                        />

                        {formData[key] && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                          </div>
                        )}
                      </div>

                      {formData[key] && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-gray-300 mb-1">
                            <span>Score</span>
                            <span>{formData[key]}%</span>
                          </div>
                          <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                              style={{ width: `${formData[key]}%` }}
                            >
                              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculate Button */}
            <div className="text-center">
              <button
                onClick={calculateRiskScore}
                disabled={isCalculating}
                className="group relative inline-flex items-center justify-center px-16 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-black text-2xl rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  {isCalculating ? (
                    <>
                      <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent mr-4"></div>
                      <span className="animate-pulse">
                        Analyzing Risk Factors...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="mr-3 text-3xl animate-bounce">🚀</span>
                      <span>Calculate Risk Score</span>
                      <span className="ml-3 text-3xl animate-bounce delay-100">
                        ⚡
                      </span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Results Dashboard */}
          {result && (
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 md:p-12 shadow-2xl animate-scale-in">
              <div className="text-center mb-12">
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-8 border border-white/20">
                    <span className="text-6xl animate-bounce">
                      {result.level === "High"
                        ? "🚨"
                        : result.level === "Moderate"
                        ? "⚠️"
                        : "✅"}
                    </span>
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                  Risk Analysis Complete
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* Score Card */}
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-blue-500/30 text-center">
                  <h3 className="text-blue-300 text-xl font-bold mb-4">
                    Risk Score
                  </h3>
                  <div className="text-6xl md:text-7xl font-black text-white mb-4 animate-counter">
                    {animatedScore.toFixed(1)}
                  </div>
                  <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-2000"
                      style={{ width: `${animatedScore}%` }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                    </div>
                  </div>
                </div>

                {/* Risk Level Card */}
                <div
                  className={`bg-gradient-to-br from-${result.color}-500/20 to-${result.color}-600/20 rounded-2xl p-8 border border-${result.color}-500/30 text-center`}
                >
                  <h3
                    className={`text-${result.color}-300 text-xl font-bold mb-4`}
                  >
                    Risk Level
                  </h3>
                  <div
                    className={`text-4xl md:text-5xl font-black text-${result.color}-400 mb-4 animate-pulse`}
                  >
                    {result.level}
                  </div>
                  <div className="text-gray-300">
                    {result.level === "High"
                      ? "Immediate Action Required"
                      : result.level === "Moderate"
                      ? "Monitor Closely"
                      : "Excellent Performance"}
                  </div>
                </div>

                {/* Action Items */}
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-500/30">
                  <h3 className="text-purple-300 text-xl font-bold mb-4">
                    Next Steps
                  </h3>
                  <div className="space-y-3">
                    {result.level === "High" && (
                      <>
                        <div className="flex items-center text-white">
                          <span className="text-red-400 mr-2">🚨</span>
                          <span className="text-sm">
                            Schedule urgent review
                          </span>
                        </div>
                        <div className="flex items-center text-white">
                          <span className="text-orange-400 mr-2">📞</span>
                          <span className="text-sm">
                            Contact HR immediately
                          </span>
                        </div>
                      </>
                    )}
                    {result.level === "Moderate" && (
                      <>
                        <div className="flex items-center text-white">
                          <span className="text-yellow-400 mr-2">📊</span>
                          <span className="text-sm">Weekly monitoring</span>
                        </div>
                        <div className="flex items-center text-white">
                          <span className="text-blue-400 mr-2">💡</span>
                          <span className="text-sm">Improvement plan</span>
                        </div>
                      </>
                    )}
                    {result.level === "Low" && (
                      <>
                        <div className="flex items-center text-white">
                          <span className="text-green-400 mr-2">✅</span>
                          <span className="text-sm">Continue monitoring</span>
                        </div>
                        <div className="flex items-center text-white">
                          <span className="text-blue-400 mr-2">🎯</span>
                          <span className="text-sm">Maintain standards</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes aurora-1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        @keyframes aurora-2 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-30px, -30px) rotate(-120deg);
          }
          66% {
            transform: translate(20px, 20px) rotate(-240deg);
          }
        }

        @keyframes aurora-3 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(15px, -15px) rotate(180deg);
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-aurora-1 {
          animation: aurora-1 20s ease-in-out infinite;
        }
        .animate-aurora-2 {
          animation: aurora-2 25s ease-in-out infinite;
        }
        .animate-aurora-3 {
          animation: aurora-3 30s ease-in-out infinite;
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease-in-out infinite;
          background-size: 200% 200%;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
        }
        .animate-counter {
          animation: fade-in-up 1s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
}
