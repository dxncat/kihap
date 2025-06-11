"use client"

import { motion } from "framer-motion"
import { Rank, RankHistory, Student, User } from "@/interfaces/types"
import { StudentStats } from "./Stats"
import { StudentProfileTabsRankHistory } from "./ProfileTabsRankHistory"

interface Props {
    user: Student,
    rankHistory: RankHistory[],
    nextRank: Rank
}

export function StudentProfileTabs({ user, rankHistory, nextRank }: Props) {

    const isMaster = false

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <StudentStats isMaster={isMaster} />

            <StudentProfileTabsRankHistory user={user} rankHistory={rankHistory} nextRank={nextRank} />

        </motion.div>
    )
}
