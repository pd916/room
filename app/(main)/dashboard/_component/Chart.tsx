"use client"

import {
Bar,
BarChart,
ResponsiveContainer,
XAxis,
YAxis
} from "recharts"
import { Card } from "@/components/ui/card";
import { ClassEnrollment, Profile } from "@prisma/client";

interface ClassEnrollmentWithProfile extends ClassEnrollment {
  profile: Profile
}

interface ChartProps {
    data: ClassEnrollmentWithProfile[] | null;
}
export const Chart = ({data}:ChartProps) => {
    const chartData = data?.map((item) => ({
    name: item?.profile?.name || "Unknown",
    total: 1, // Since each represents one student
  }))
    return (
        <Card className="mt-2 h-full w-full">
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} 
                    tickFormatter={(value) => `${value}`} />
                    <Bar 
                    dataKey="total"
                    fill="#0369a1"
                    radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}