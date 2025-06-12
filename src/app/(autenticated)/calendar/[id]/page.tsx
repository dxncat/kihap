import { getSessionById, getStudentAttendance, getStudentsByRankId } from "@/actions";
import { Card, CardContent } from "@/components";
import { getBeltColor } from "@/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
    params: {
        id: string;
    };
}

export default async function Profile({ params }: Props) {
    const { id } = params; // params ya es un objeto, no una promesa

    const session_to = await getSessionById(id)

    if (!session_to) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-red-500">Session not found</h1>
            </div>
        );
    }

    const students = await getStudentsByRankId(session_to.rankId)

    if (!students) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-red-500">No students found for this session</h1>
            </div>
        );
    }

    const attendance = await getStudentAttendance({ sessionId: id, studentId: students[0].id })
    if ('error' in attendance) {
        console.log('Attendance error:', attendance.error);
    } else {
        console.log('Attendance data:', attendance);
    }


    return (
        <div className="min-h-screen mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {students.map((student) => {

                    return (
                        <Card
                            key={student.id}
                            className={`bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300`}
                        >
                            <CardContent className="p-4 md:p-6">
                                <div className="flex items-start space-x-4">
                                    <Image
                                        src={student.User.image || "https://avatar.iran.liara.run/public"}
                                        alt={student.User.name}
                                        width={60}
                                        height={60}
                                        className="rounded-full"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-white font-semibold truncate">{student.User.name}</h3>
                                        </div>

                                        <Badge className={`${getBeltColor(student.Rank.name)} mb-3 text-xs whitespace-normal break-words`}>{student.Rank.name}</Badge>

                                        <div className="mt-4 flex gap-2">
                                            <Button
                                                className="flex-1 bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 w-full"
                                                size="sm"
                                            >
                                                Marcar como asistido
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}