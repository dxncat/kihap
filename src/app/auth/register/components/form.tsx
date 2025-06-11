"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, UserPlus } from "lucide-react"
import { RegisterFormMaster } from "./master-form"
import { StudentRegistrationForm } from "./student-form"

export function LoginForm() {
    const [activeTab, setActiveTab] = useState("instructor")

    return (
        <Card className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-md border-white/10">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="instructor" className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span className="hidden sm:inline">Instructor</span>
                        <span className="sm:hidden">Instructor</span>
                    </TabsTrigger>
                    <TabsTrigger value="student" className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        <span className="hidden sm:inline">Estudiante</span>
                        <span className="sm:hidden">Estudiante</span>
                    </TabsTrigger>
                </TabsList>

                {/* Student Registration Form */}
                <TabsContent value="student">
                    <StudentRegistrationForm />
                </TabsContent>

                {/* Instructor Registration Form */}
                <TabsContent value="instructor">
                    <RegisterFormMaster />
                </TabsContent>
            </Tabs>
        </Card>
    )
}
