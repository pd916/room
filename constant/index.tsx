import { Book, LayoutDashboard, School, Settings, TextQuoteIcon } from "lucide-react";


export const TeahcerRoutes = [
    {id: 1, label:"Dashboard", icon: LayoutDashboard, link:"/"},
    {id: 2, label:"Classes", icon: School, link:"/dashboard/classes"},
    {id: 4, label:"Student/Reports", icon: Book, link:"/dashboard/assignments"},
    {id: 5, label:"Settings", icon: Settings, link:"/dashboard/settings"},
]

export const StudentRoutes = [
    {id: 1, label:"Dashboard", icon: LayoutDashboard, link:"/"},
    {id: 2, label:"Upcoming Class", icon: School, link:"/dashboard/classes"},
    {id: 3, label:"Assignments", icon: TextQuoteIcon, link:"/dashboard/assignments"},
    {id: 4, label:"Grade/Reports", icon: Book, link:"/dashboard/reports"},
]

export const announcements = [
  {
    id: 1,
    title: "Quiz Rescheduled",
    description: "Tomorrow's quiz is moved to Friday due to a holiday.",
    date: "June 20, 2025"
  },
  {
    id: 2,
    title: "Assignment Reminder",
    description: "Submit Chapter 3 exercises by midnight tonight.",
    date: "June 18, 2025"
  },
  {
    id: 3,
    title: "Live Class Today",
    description: "Don’t forget the live session at 5 PM today.",
    date: "June 17, 2025"
  }
];

export const classes = [
  {
    id: "cls1",
    title: "Mathematics - Algebra Basics",
    isPublished: true,
    isUpcoming: false,
  },
  {
    id: "cls2",
    title: "Science - Introduction to Physics",
    isPublished: false,
    isUpcoming: true,
  },
  {
    id: "cls3",
    title: "History - Ancient Civilizations",
    isPublished: true,
    isUpcoming: false,
  },
  {
    id: "cls4",
    title: "English - Essay Writing",
    isPublished: true,
    isUpcoming: true,
  },
  {
    id: "cls5",
    title: "Computer - Basics of HTML",
    isPublished: false,
    isUpcoming: false,
  },
  {
    id: "cls6",
    title: "Urdu - Poetry and Literature",
    isPublished: true,
    isUpcoming: false,
  },
  {
    id: "cls7",
    title: "Geography - Climate Zones",
    isPublished: false,
    isUpcoming: true,
  },
  {
    id: "cls8",
    title: "Islamiat - Pillars of Islam",
    isPublished: true,
    isUpcoming: false,
  },
  {
    id: "cls9",
    title: "Biology - Cell Structure",
    isPublished: false,
    isUpcoming: true,
  },
  {
    id: "cls10",
    title: "Chemistry - Atomic Theory",
    isPublished: true,
    isUpcoming: false,
  }
];

export const upcomingClasses = [
  {
    id: "class1",
    title: "Introduction to JavaScript",
    startTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    isPublished: true,
    enrollments: [
      { userId: "user1", classId: "class1" },
      { userId: "user2", classId: "class1" },
    ],
  },
  {
    id: "class2",
    title: "Advanced React Patterns",
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    isPublished: true,
    enrollments: [
      { userId: "user3", classId: "class2" },
      { userId: "user4", classId: "class2" },
    ],
  },
  {
    id: "class3",
    title: "UI/UX Best Practices",
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
    isPublished: true,
    enrollments: [
      { userId: "user1", classId: "class3" },
    ],
  },
  {
    id: "class4",
    title: "Deploying with Vercel",
    startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    isPublished: true,
    enrollments: [],
  },
];

export const gradeReports = [
  {
    id: "report1",
    classTitle: "Introduction to JavaScript",
    quizTitle: "JS Basics Quiz",
    score: 85,
    total: 100,
    grade: "B",
    date: new Date("2025-06-10"),
  },
  {
    id: "report2",
    classTitle: "Advanced React Patterns",
    quizTitle: "Hooks & State Management",
    score: 92,
    total: 100,
    grade: "A",
    date: new Date("2025-06-15"),
  },
  {
    id: "report3",
    classTitle: "UI/UX Best Practices",
    quizTitle: "Design Principles Quiz",
    score: 76,
    total: 100,
    grade: "C+",
    date: new Date("2025-06-18"),
  },
  {
    id: "report4",
    classTitle: "Deploying with Vercel",
    quizTitle: "Deployment Strategy Quiz",
    score: 100,
    total: 100,
    grade: "A+",
    date: new Date("2025-06-20"),
  },
];

