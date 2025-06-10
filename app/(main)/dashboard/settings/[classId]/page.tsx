import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Banner from "./_component/Banner";
import { LayoutDashboard } from "lucide-react";
import TitleData from "./_component/TitleData";
import SelectSubject from "./_component/SelectSubject";
import InviteCode from "./_component/InviteCode";
import SelectTime from "./_component/SelectTime";
import { QuizSection } from "./_component/QuizSection";
import Announcement from "./quiz/[quizId]/_component/Announcement";
import { Actions } from "./_component/Action";

const page = async ({params}:{params:{classId:string}}) => {
    const classData = await db.class.findUnique({
        where:{
            id:params.classId
        },
        include:{
            quizzes: {
                orderBy: {
                    title: 'asc'
                }
            },
            announcements:{
                orderBy: {
                    title: 'asc'
                }
            },
            attendance:true,
            enrollments:true

        }
    })

    if(!classData) {
        return redirect('/')
    }

    const requiredFields = [
        classData.title,
        classData.subject,
        classData.inviteCode,
        classData.startTime,
        classData.quizzes.some(quiz => quiz.title) //We're looking one chapter atleast published
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`

    const isComplete = requiredFields.every(Boolean)

    return (
        <>
            {!classData.isPublished && (
                <Banner
                label="This Class unpublished!"
                />
            )}
            <div className='p-2'>
                <div className="flex items-center justify-between">
                <h1 className='text-2xl font-medium'>
                    Create Class
                </h1>
                <span className='text-sm text-slate-700'>
                    Complete all fields {completionText}
                </span>
                <Actions
                disabled={!isComplete}
                classId={params.classId}
                isPublished={classData.isPublished}
                />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
                <div>
                <div className='flex items-center gap-c-2'>
                    <LayoutDashboard/>
                    <h2 className='text-xl'>
                        Customize your class
                    </h2>
                </div>

                <TitleData
                initialData={classData} 
                classId={classData?.id}
                />

                < SelectSubject
                initialData={classData}
                classId={classData?.id}
                />

                <InviteCode
                initialData={classData}
                classId={classData.id}
                />
                </div>

                <div className="flex flex-col mt-8">
                    <SelectTime
                    initialData={classData}
                    classId={classData.id}
                    />
                    <QuizSection
                    initialData={classData}
                    classId={classData.id}
                    />

                    <Announcement
                    initialData={classData}
                    classId={classData.id}
                    />
                </div>
            </div>
        </>
    )
}

export default page;