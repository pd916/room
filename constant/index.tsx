import { Book, LayoutDashboard, School, Settings, TextQuoteIcon } from "lucide-react";


export const TeahcerRoutes = [
    {id: 1, label:"Dashboard", icon: LayoutDashboard, link:"/"},
    {id: 2, label:"Classes", icon: School, link:"/dashboard/classes"},
    {id: 3, label:"Quizes", icon: TextQuoteIcon, link:"/quizes"},
    {id: 4, label:"Student/Reports", icon: Book, link:"/reports"},
    {id: 5, label:"Settings", icon: Settings, link:"/dashboard/settings"},
]

export const StudentRoutes = [
    {id: 1, label:"Dashboard", icon: LayoutDashboard, link:"/"},
    {id: 2, label:"Upcoming Class", icon: School, link:"/dashboard/classes"},
    {id: 3, label:"Assignments", icon: TextQuoteIcon, link:"/dashboard/assignments"},
    {id: 4, label:"Grade/Reports", icon: Book, link:"/dashboard/reports"},
]