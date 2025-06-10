import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { QuizQuestion } from "./_component/QuizQuestion"
import { CreateQuestion } from "./_component/CreaQuestion"

const QuizId = async ({
    params
}: {params: {quizId: string, classId: string}}) => {
    const {quizId, classId} = await params
    console.log(quizId, classId, 'yes')

    const quiz  = await db.quiz.findUnique({
        where: {
            id: params.quizId,
            classId : params.classId
        },
        include:{
            questions:true
        }
    })

    if(!quiz) {
        return redirect("/")
    }

    const requiredFields = [
        quiz.title,
        quiz.questions.some((item) => item.question),
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    const isComplete = requiredFields.every(Boolean)

    return (
        <>
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="w-full">
                    <Link href={`/dashboard/settings/${params.classId}`}
                     className="flex items-center text-sm hover:opacity-75 transition mb-6">
                        <ArrowLeft className="h-4 w-4 mr-2"/>
                        Back to class setup
                    </Link>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-medium">quiz Creation</h1>
                            <span className="text-sm text-slate-700">Complete all fields {completionText}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full">
                    <QuizQuestion
                    initialData={quiz}
                    classId={params.classId}
                    quizId={params.quizId}
                    />
                    <CreateQuestion
                    initialData={quiz}
                    classId={params.classId}
                    quizId={params.quizId}
                    />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default QuizId;