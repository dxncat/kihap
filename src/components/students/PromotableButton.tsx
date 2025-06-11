"use client"

import { promoteRank } from "@/actions"
import { Button } from "../ui/button"
import { Student } from "@/interfaces/types"
import { ArrowUp } from "lucide-react"

export function PromoteButton({ student }: { student: Student }) {
    return (
        <Button
            size="sm"
            onClick={async () => {
                if (student.nextRank?.id !== undefined) {
                    await promoteRank(student.id, student.nextRank.id)
                    window.location.reload()
                }
            }}
        >
            <ArrowUp className="w-4 h-4 mr-2" />
            Promover
        </Button>
    )
}