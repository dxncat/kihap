"use client"

import { motion } from "framer-motion"
import { RankHistory, User } from "@/interfaces/types"
import { ProfileTabsRankHistory } from "./ProfileTabsRankHistory"
import { Stats } from "./Stats"

interface Props {
    user: User,
    rankHistory: RankHistory[]
}

export function ProfileTabs({ user, rankHistory }: Props) {

    const isStudent = user.role === "STUDENT"
    const isMaster = user.role === "MASTER"

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <Stats isMaster={isMaster} />

            {isStudent && (
                <ProfileTabsRankHistory user={user} rankHistory={rankHistory} />
            )}

        </motion.div>
    )
}
