"use client"

import type React from "react"

import { useState, useMemo, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Truck,
  Fuel,
  Search,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  Plus,
  RefreshCw,
  Download,
  Calendar,
  Utensils,
  X,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Play,
  CheckCircle,
} from "lucide-react"

interface InstallationTask {
  day: number
  vehicleNo: number | null
  vehicleType: string
  location: string
  timeSlot: string
  fuelTanks: number
  progress: number
  status: "completed" | "in-progress" | "pending" | "travel" | "lunch"
  team?: string
  equipment?: string
}

interface TaskModalProps {
  task: InstallationTask | null
  isOpen: boolean
  onClose: () => void
}

const INSTALLATION_DATA: InstallationTask[] = [
  // Bahir Dar - Days 1-8
  {
    day: 1,
    vehicleNo: 1,
    vehicleType: "FORD/D/P/UP RANGER",
    location: "Bahir Dar",
    timeSlot: "8:30 AM - 11:30 AM",
    fuelTanks: 1,
    progress: 100,
    status: "completed",
    team: "Team Alpha",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 1,
    vehicleNo: null,
    vehicleType: "",
    location: "Bahir Dar",
    timeSlot: "11:30 AM - 1:30 PM",
    fuelTanks: 0,
    progress: 0,
    status: "lunch",
    team: "Team Alpha",
    equipment: "Lunch Break",
  },
  {
    day: 1,
    vehicleNo: 2,
    vehicleType: "FORD/D/P/UP RANGER",
    location: "Bahir Dar",
    timeSlot: "1:30 PM - 5:30 PM",
    fuelTanks: 1,
    progress: 100,
    status: "completed",
    team: "Team Alpha",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 2,
    vehicleNo: 3,
    vehicleType: "FORD/D/P/UP RANGER",
    location: "Bahir Dar",
    timeSlot: "8:30 AM - 11:30 AM",
    fuelTanks: 1,
    progress: 100,
    status: "completed",
    team: "Team Alpha",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 2,
    vehicleNo: null,
    vehicleType: "",
    location: "Bahir Dar",
    timeSlot: "11:30 AM - 1:30 PM",
    fuelTanks: 0,
    progress: 0,
    status: "lunch",
    team: "Team Alpha",
    equipment: "Lunch Break",
  },
  {
    day: 2,
    vehicleNo: 4,
    vehicleType: "FORD/D/P/UP RANGER",
    location: "Bahir Dar",
    timeSlot: "1:30 PM - 5:30 PM",
    fuelTanks: 1,
    progress: 100,
    status: "completed",
    team: "Team Alpha",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 3,
    vehicleNo: 5,
    vehicleType: "MAZDA/PICKUP W9AT",
    location: "Bahir Dar",
    timeSlot: "8:30 AM - 11:30 AM",
    fuelTanks: 1,
    progress: 85,
    status: "in-progress",
    team: "Team Alpha",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 3,
    vehicleNo: null,
    vehicleType: "",
    location: "Bahir Dar",
    timeSlot: "11:30 AM - 1:30 PM",
    fuelTanks: 0,
    progress: 0,
    status: "lunch",
    team: "Team Alpha",
    equipment: "Lunch Break",
  },
  {
    day: 3,
    vehicleNo: 6,
    vehicleType: "Mercedes bus MCV260",
    location: "Bahir Dar",
    timeSlot: "1:30 PM - 5:30 PM",
    fuelTanks: 1,
    progress: 75,
    status: "in-progress",
    team: "Team Alpha",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 4,
    vehicleNo: 7,
    vehicleType: "Toyota land cruiser",
    location: "Bahir Dar",
    timeSlot: "8:30 AM - 11:30 AM",
    fuelTanks: 1,
    progress: 60,
    status: "in-progress",
    team: "Team Alpha",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 4,
    vehicleNo: null,
    vehicleType: "",
    location: "Bahir Dar",
    timeSlot: "11:30 AM - 1:30 PM",
    fuelTanks: 0,
    progress: 0,
    status: "lunch",
    team: "Team Alpha",
    equipment: "Lunch Break",
  },
  {
    day: 4,
    vehicleNo: 8,
    vehicleType: "MAZDA/PICKUP W9AT",
    location: "Bahir Dar",
    timeSlot: "1:30 PM - 5:30 PM",
    fuelTanks: 1,
    progress: 45,
    status: "pending",
    team: "Team Alpha",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 5,
    vehicleNo: 9,
    vehicleType: "Mercedes bus MCV260",
    location: "Bahir Dar",
    timeSlot: "8:30 AM - 11:30 AM",
    fuelTanks: 1,
    progress: 30,
    status: "pending",
    team: "Team Alpha",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 5,
    vehicleNo: null,
    vehicleType: "",
    location: "Bahir Dar",
    timeSlot: "11:30 AM - 1:30 PM",
    fuelTanks: 0,
    progress: 0,
    status: "lunch",
    team: "Team Alpha",
    equipment: "Lunch Break",
  },
  {
    day: 5,
    vehicleNo: 10,
    vehicleType: "UD truck CV86BLLDL",
    location: "Bahir Dar",
    timeSlot: "1:30 PM - 5:30 PM",
    fuelTanks: 2,
    progress: 20,
    status: "pending",
    team: "Team Alpha",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 6,
    vehicleNo: 11,
    vehicleType: "Mitsubishi K777JENSU",
    location: "Bahir Dar",
    timeSlot: "8:30 AM - 11:30 AM",
    fuelTanks: 1,
    progress: 15,
    status: "pending",
    team: "Team Alpha",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 6,
    vehicleNo: null,
    vehicleType: "",
    location: "Bahir Dar",
    timeSlot: "11:30 AM - 1:30 PM",
    fuelTanks: 0,
    progress: 0,
    status: "lunch",
    team: "Team Alpha",
    equipment: "Lunch Break",
  },
  {
    day: 6,
    vehicleNo: 12,
    vehicleType: "Terios j120cg",
    location: "Bahir Dar",
    timeSlot: "1:30 PM - 5:30 PM",
    fuelTanks: 1,
    progress: 10,
    status: "pending",
    team: "Team Alpha",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 7,
    vehicleNo: 13,
    vehicleType: "MAZDA/PICKUP BT-50",
    location: "Bahir Dar",
    timeSlot: "8:30 AM - 11:30 AM",
    fuelTanks: 1,
    progress: 5,
    status: "pending",
    team: "Team Alpha",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 7,
    vehicleNo: null,
    vehicleType: "",
    location: "Bahir Dar",
    timeSlot: "11:30 AM - 1:30 PM",
    fuelTanks: 0,
    progress: 0,
    status: "lunch",
    team: "Team Alpha",
    equipment: "Lunch Break",
  },
  {
    day: 7,
    vehicleNo: 14,
    vehicleType: "mitsubishi (k777jensl)",
    location: "Bahir Dar",
    timeSlot: "1:30 PM - 5:30 PM",
    fuelTanks: 1,
    progress: 0,
    status: "pending",
    team: "Team Alpha",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 8,
    vehicleNo: 15,
    vehicleType: "Cherry c7180elkkhb0018",
    location: "Bahir Dar",
    timeSlot: "8:30 AM - 11:30 AM",
    fuelTanks: 1,
    progress: 0,
    status: "pending",
    team: "Team Alpha",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 8,
    vehicleNo: null,
    vehicleType: "",
    location: "Bahir Dar",
    timeSlot: "11:30 AM - 1:30 PM",
    fuelTanks: 0,
    progress: 0,
    status: "lunch",
    team: "Team Alpha",
    equipment: "Lunch Break",
  },

  // Day 9 - Travel/logistics day
  {
    day: 9,
    vehicleNo: null,
    vehicleType: "",
    location: "Travel",
    timeSlot: "Travel/logistics day",
    fuelTanks: 0,
    progress: 0,
    status: "travel",
    team: "Team Alpha",
    equipment: "Travel Day",
  },

  // Kombolcha - Days 10-12
  {
    day: 10,
    vehicleNo: 16,
    vehicleType: "FORD/D/P/UP RANGER",
    location: "Kombolcha",
    timeSlot: "8:30 AM - 11:30 AM",
    fuelTanks: 1,
    progress: 0,
    status: "pending",
    team: "Team Beta",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 10,
    vehicleNo: null,
    vehicleType: "",
    location: "Kombolcha",
    timeSlot: "11:30 AM - 1:30 PM",
    fuelTanks: 0,
    progress: 0,
    status: "lunch",
    team: "Team Beta",
    equipment: "Lunch Break",
  },
  {
    day: 10,
    vehicleNo: 17,
    vehicleType: "MAZDA/R/D/UP BT-50",
    location: "Kombolcha",
    timeSlot: "1:30 PM - 5:30 PM",
    fuelTanks: 1,
    progress: 0,
    status: "pending",
    team: "Team Beta",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 11,
    vehicleNo: 18,
    vehicleType: "Mercedes bus MCV5115",
    location: "Kombolcha",
    timeSlot: "8:30 AM - 11:30 AM",
    fuelTanks: 1,
    progress: 0,
    status: "pending",
    team: "Team Beta",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 11,
    vehicleNo: null,
    vehicleType: "",
    location: "Kombolcha",
    timeSlot: "11:30 AM - 1:30 PM",
    fuelTanks: 0,
    progress: 0,
    status: "lunch",
    team: "Team Beta",
    equipment: "Lunch Break",
  },
  {
    day: 11,
    vehicleNo: 19,
    vehicleType: "Toyota Pickup LN166L-PRMDS",
    location: "Kombolcha",
    timeSlot: "1:30 PM - 5:30 PM",
    fuelTanks: 1,
    progress: 0,
    status: "pending",
    team: "Team Beta",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 12,
    vehicleNo: 20,
    vehicleType: "Mitsubishi K34)JUNJJC",
    location: "Kombolcha",
    timeSlot: "8:30 AM - 11:30 AM",
    fuelTanks: 1,
    progress: 0,
    status: "pending",
    team: "Team Beta",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 12,
    vehicleNo: null,
    vehicleType: "",
    location: "Kombolcha",
    timeSlot: "11:30 AM - 1:30 PM",
    fuelTanks: 0,
    progress: 0,
    status: "lunch",
    team: "Team Beta",
    equipment: "Lunch Break",
  },
  {
    day: 12,
    vehicleNo: 21,
    vehicleType: "UD truck CV86BLLDL",
    location: "Kombolcha",
    timeSlot: "1:30 PM - 5:30 PM",
    fuelTanks: 2,
    progress: 0,
    status: "pending",
    team: "Team Beta",
    equipment: "GPS + Fuel Sensor",
  },

  // Addis Ababa - Days 13-14
  {
    day: 13,
    vehicleNo: 22,
    vehicleType: "FORD/D/P/UP RANGER",
    location: "Addis Ababa",
    timeSlot: "8:30 AM - 11:30 AM",
    fuelTanks: 1,
    progress: 0,
    status: "pending",
    team: "Team Gamma",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 13,
    vehicleNo: null,
    vehicleType: "",
    location: "Addis Ababa",
    timeSlot: "11:30 AM - 1:30 PM",
    fuelTanks: 0,
    progress: 0,
    status: "lunch",
    team: "Team Gamma",
    equipment: "Lunch Break",
  },
  {
    day: 13,
    vehicleNo: 23,
    vehicleType: "MAZDA/PICKUP-626",
    location: "Addis Ababa",
    timeSlot: "1:30 PM - 5:30 PM",
    fuelTanks: 1,
    progress: 0,
    status: "pending",
    team: "Team Gamma",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 14,
    vehicleNo: 24,
    vehicleType: "Cherry c7180elkkhb0018",
    location: "Addis Ababa",
    timeSlot: "8:30 AM - 11:30 AM",
    fuelTanks: 1,
    progress: 0,
    status: "pending",
    team: "Team Gamma",
    equipment: "GPS + Fuel Sensor",
  },
  {
    day: 14,
    vehicleNo: null,
    vehicleType: "",
    location: "Addis Ababa",
    timeSlot: "11:30 AM - 1:30 PM",
    fuelTanks: 0,
    progress: 0,
    status: "lunch",
    team: "Team Gamma",
    equipment: "Lunch Break",
  },
]

const getStatusColor = (status: InstallationTask["status"]): string => {
  const statusColors = {
    completed: "bg-green-500",
    "in-progress": "bg-yellow-500",
    pending: "bg-gray-400",
    travel: "bg-blue-500",
    lunch: "bg-orange-500",
  } as const
  return statusColors[status]
}

const getStatusIcon = (status: InstallationTask["status"]): React.ReactNode => {
  const statusIcons = {
    completed: <CheckCircle className="h-4 w-4" aria-label="Completed" />,
    "in-progress": <Play className="h-4 w-4" aria-label="In Progress" />,
    pending: <AlertCircle className="h-4 w-4" aria-label="Pending" />,
    travel: <MapPin className="h-4 w-4" aria-label="Travel Day" />,
    lunch: <Utensils className="h-4 w-4" aria-label="Lunch Break" />,
  } as const
  return statusIcons[status]
}

const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose }) => {
  if (!task) return null

  return (
    <div open={isOpen} onOpenChange={onClose}>
      <div className="max-w-2xl">
        <div>
          <div className="flex items-center gap-2">
            {getStatusIcon(task.status)}
            {task.vehicleNo ? `Vehicle #${task.vehicleNo} Installation` : "Travel Day"}
            <Badge variant="outline" className="ml-auto">
              Day {task.day}
            </Badge>
          </div>
        </div>
        <div className="space-y-6 p-6">
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground font-medium">Schedule</p>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Day {task.day}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{task.timeSlot}</span>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground font-medium">Location</p>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="font-medium">{task.location}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground font-medium">Team</p>
                <div className="flex items-center gap-2 mt-1">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="font-medium">{task.team}</span>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground font-medium">Equipment</p>
                <div className="flex items-center gap-2 mt-1">
                  <Truck className="h-4 w-4 text-orange-600" />
                  <span className="font-medium">{task.equipment}</span>
                </div>
              </div>
            </div>
          </div>

          {task.vehicleNo && (
            <>
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Vehicle Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Vehicle Type</p>
                    <p className="font-medium">{task.vehicleType}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Fuel Tanks</p>
                    <p className="font-medium">
                      {task.fuelTanks} tank{task.fuelTanks > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Installation Progress</h4>
                  <span className="text-sm font-medium">{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-3" />
                <div className="grid grid-cols-4 gap-2 mt-4 text-xs">
                  <div
                    className={`p-2 rounded text-center ${task.progress >= 25 ? "bg-green-100 text-green-800" : "bg-gray-100"}`}
                  >
                    GPS Setup
                  </div>
                  <div
                    className={`p-2 rounded text-center ${task.progress >= 50 ? "bg-green-100 text-green-800" : "bg-gray-100"}`}
                  >
                    Fuel Sensor
                  </div>
                  <div
                    className={`p-2 rounded text-center ${task.progress >= 75 ? "bg-green-100 text-green-800" : "bg-gray-100"}`}
                  >
                    Testing
                  </div>
                  <div
                    className={`p-2 rounded text-center ${task.progress >= 100 ? "bg-green-100 text-green-800" : "bg-gray-100"}`}
                  >
                    Complete
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function InstallationSchedule() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [scheduleStartDate, setScheduleStartDate] = useState<Date>(new Date())
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)

  const [selectedTask, setSelectedTask] = useState<InstallationTask | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [currentWeek, setCurrentWeek] = useState<number>(0)
  const [viewMode, setViewMode] = useState<"grid" | "calendar">("calendar")
  const [expandedTask, setExpandedTask] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [draggedTask, setDraggedTask] = useState<InstallationTask | null>(null)
  const [hoveredDay, setHoveredDay] = useState<number | null>(null)
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set())
  const [showTaskDetails, setShowTaskDetails] = useState<boolean>(false)

  const locations = ["all", "Bahir Dar", "Kombolcha", "Addis Ababa", "Travel"] as const

  const getScheduleDate = useCallback(
    (dayNumber: number) => {
      const scheduleDate = new Date(scheduleStartDate)
      scheduleDate.setDate(scheduleDate.getDate() + dayNumber - 1)
      return scheduleDate
    },
    [scheduleStartDate],
  )

  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }, [])

  const DatePickerModal = () => {
    if (!showDatePicker) return null

    const today = new Date()
    const currentMonth = scheduleStartDate.getMonth()
    const currentYear = scheduleStartDate.getFullYear()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()
    const startingDayOfWeek = firstDayOfMonth.getDay()

    const handleDateSelect = (day: number) => {
      const newDate = new Date(currentYear, currentMonth, day)
      setScheduleStartDate(newDate)
      setShowDatePicker(false)
    }

    const navigateMonth = (direction: "prev" | "next") => {
      const newDate = new Date(scheduleStartDate)
      newDate.setMonth(currentMonth + (direction === "next" ? 1 : -1))
      setScheduleStartDate(newDate)
    }

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Select Schedule Start Date</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowDatePicker(false)} className="hover:bg-gray-100">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")} className="hover:bg-gray-100">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h4 className="font-medium text-gray-900">
              {scheduleStartDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h4>
            <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")} className="hover:bg-gray-100">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="p-2" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const isToday =
                today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear
              const isSelected = scheduleStartDate.getDate() === day

              return (
                <button
                  key={day}
                  onClick={() => handleDateSelect(day)}
                  className={`p-2 text-sm rounded-lg transition-all duration-200 hover:scale-105 ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-lg"
                      : isToday
                        ? "bg-blue-100 text-blue-600 font-medium"
                        : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setScheduleStartDate(today)
                setShowDatePicker(false)
              }}
              className="flex-1"
            >
              Today
            </Button>
            <Button size="sm" onClick={() => setShowDatePicker(false)} className="flex-1">
              Done
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const filteredData = useMemo(() => {
    return INSTALLATION_DATA.filter((task) => {
      const matchesLocation = selectedLocation === "all" || task.location === selectedLocation
      const matchesSearch =
        searchQuery === "" ||
        task.vehicleType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.vehicleNo && task.vehicleNo.toString().includes(searchQuery))
      return matchesLocation && matchesSearch
    })
  }, [selectedLocation, searchQuery])

  const weekDays = useMemo(() => {
    const startDay = currentWeek * 7 + 1
    return Array.from({ length: 7 }, (_, i) => startDay + i).filter((day) => day <= 14)
  }, [currentWeek])

  const totalWeeks = Math.ceil(14 / 7)

  const handleTaskClick = useCallback((task: InstallationTask, event: React.MouseEvent) => {
    event.stopPropagation()
    if (event.ctrlKey || event.metaKey) {
      const taskId = `${task.day}-${task.vehicleNo}`
      setSelectedTasks((prev) => {
        const newSelected = new Set(prev)
        if (newSelected.has(taskId)) {
          newSelected.delete(taskId)
        } else {
          newSelected.add(taskId)
        }
        return newSelected
      })
    } else {
      setSelectedTask(task)
      setShowTaskDetails(true)
    }
  }, [])

  const handleTaskDoubleClick = useCallback((task: InstallationTask) => {
    setExpandedTask((prev) => (prev === task.vehicleNo ? null : task.vehicleNo))
  }, [])

  const handleDragStart = useCallback((task: InstallationTask, event: React.DragEvent) => {
    setDraggedTask(task)
    event.dataTransfer.effectAllowed = "move"
  }, [])

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const handleDrop = useCallback(
    (targetDay: number, event: React.DragEvent) => {
      event.preventDefault()
      if (draggedTask && draggedTask.day !== targetDay) {
        // Here you would update the task's day in your data
        console.log(`Moving task from day ${draggedTask.day} to day ${targetDay}`)
      }
      setDraggedTask(null)
    },
    [draggedTask],
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showTaskDetails) {
        setShowTaskDetails(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [showTaskDetails])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">GPS Installation</h1>
              <p className="text-sm text-gray-500">Schedule Manager</p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              aria-label="Search vehicles"
            />
          </div>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">
              {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h3>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newDate = new Date(currentDate)
                  newDate.setMonth(newDate.getMonth() - 1)
                  setCurrentDate(newDate)
                }}
                className="hover:bg-gray-100 transition-colors duration-200"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newDate = new Date(currentDate)
                  newDate.setMonth(newDate.getMonth() + 1)
                  setCurrentDate(newDate)
                }}
                className="hover:bg-gray-100 transition-colors duration-200"
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-blue-700 mb-1">Schedule Start Date</p>
                <p className="text-sm text-blue-900 font-medium">{formatDate(scheduleStartDate)}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDatePicker(true)}
                className="text-blue-600 hover:bg-blue-100 transition-all duration-200"
              >
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-xs">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-center text-gray-500 font-medium p-1">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
              const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth()
              const isScheduleDay = day <= 14

              return (
                <button
                  key={day}
                  className={`p-1 text-center rounded transition-all duration-200 hover:scale-105 ${
                    isToday
                      ? "bg-blue-600 text-white font-bold shadow-lg"
                      : isScheduleDay
                        ? "text-blue-600 font-medium hover:bg-blue-100"
                        : "text-gray-400 hover:bg-gray-100"
                  }`}
                  aria-label={`Day ${day}`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>

        {/* Schedule Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">My Schedule</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="hover:bg-gray-100 transition-all duration-200"
            >
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>

          <div
            className={`space-y-2 transition-all duration-300 ${showFilters ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden"}`}
          >
            {[
              { name: "GPS Installation", count: 18, color: "bg-blue-500" },
              { name: "Fuel Sensor", count: 18, color: "bg-green-500" },
              { name: "Lunch Break", count: 12, color: "bg-orange-500" },
              { name: "Travel Day", count: 1, color: "bg-purple-500" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color} shadow-sm`} />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {item.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Location Categories */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-3">Locations</h3>
          <div className="space-y-1">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:scale-[1.02] ${
                  selectedLocation === location
                    ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="capitalize">{location}</span>
                  <Badge variant="outline" className="text-xs">
                    {location === "all"
                      ? filteredData.length
                      : filteredData.filter((t) => t.location === location).length}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Installation Calendar</h2>
              <p className="text-gray-500 mt-1">
                {filteredData.length} total entries • {filteredData.filter((t) => t.status === "completed").length}{" "}
                completed • {filteredData.filter((t) => t.status === "lunch").length} lunch breaks
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 shadow-sm">
                <Button
                  variant={viewMode === "calendar" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("calendar")}
                  className="transition-all duration-200 hover:scale-105"
                  aria-pressed={viewMode === "calendar"}
                >
                  <CalendarDays className="h-4 w-4" />
                  Calendar
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="transition-all duration-200 hover:scale-105"
                  aria-pressed={viewMode === "grid"}
                >
                  <Grid3X3 className="h-4 w-4" />
                  Grid
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="hover:scale-105 transition-all duration-200 bg-transparent"
                aria-label="Refresh data"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:scale-105 transition-all duration-200 bg-transparent"
                aria-label="Download schedule"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                className="hover:scale-105 transition-all duration-200 shadow-lg"
                aria-label="Add new installation"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Installation
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          {viewMode === "calendar" ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
              {/* Calendar Header */}
              <div className="border-b border-gray-200 p-4 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Week {currentWeek + 1} of {totalWeeks}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
                      disabled={currentWeek === 0}
                      className="hover:scale-105 transition-all duration-200 disabled:opacity-50"
                      aria-label="Previous week"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentWeek(Math.min(totalWeeks - 1, currentWeek + 1))}
                      disabled={currentWeek === totalWeeks - 1}
                      className="hover:scale-105 transition-all duration-200 disabled:opacity-50"
                      aria-label="Next week"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-8 min-h-[600px]">
                {/* Time Column */}
                <div className="border-r border-gray-200 bg-gradient-to-b from-gray-50 to-gray-100">
                  <div className="h-12 border-b border-gray-200 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                  {["8:30-11:30 AM", "11:30-1:30 PM", "1:30-5:30 PM"].map((time, index) => (
                    <div key={time} className="h-24 border-b border-gray-200 flex items-center justify-center p-2">
                      <div className="text-xs text-gray-600 text-center font-medium">{time}</div>
                    </div>
                  ))}
                </div>

                {/* Day Columns */}
                {weekDays.map((dayNum, dayIndex) => {
                  const dayTasks = filteredData.filter((task) => task.day === dayNum)
                  const scheduleDate = getScheduleDate(dayNum)

                  return (
                    <div
                      key={dayNum}
                      className={`border-r border-gray-200 relative transition-all duration-200 ${
                        hoveredDay === dayNum ? "bg-blue-50" : ""
                      }`}
                      onMouseEnter={() => setHoveredDay(dayNum)}
                      onMouseLeave={() => setHoveredDay(null)}
                    >
                      <div className="h-12 border-b border-gray-200 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-900">Day {dayNum}</div>
                          <div className="text-xs text-gray-500">{formatDate(scheduleDate)}</div>
                        </div>
                      </div>

                      {/* Time Slots */}
                      <div className="relative">
                        {Array.from({ length: 3 }).map((_, timeIndex) => (
                          <div key={timeIndex} className="h-24 border-b border-gray-100" />
                        ))}

                        {/* Tasks */}
                        <div className="absolute inset-0 p-1 space-y-1">
                          {dayTasks.map((task, taskIndex) => {
                            const taskId = `${task.day}-${task.vehicleNo}`
                            const isSelected = selectedTasks.has(taskId)
                            const isExpanded = expandedTask === task.vehicleNo

                            const colors = {
                              completed:
                                "bg-green-100 border-green-300 text-green-800 hover:bg-green-200 shadow-green-100",
                              "in-progress":
                                "bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200 shadow-yellow-100",
                              pending: "bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200 shadow-blue-100",
                              travel:
                                "bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200 shadow-purple-100",
                              lunch:
                                "bg-orange-100 border-orange-300 text-orange-800 hover:bg-orange-200 shadow-orange-100",
                            }

                            return (
                              <div
                                key={taskIndex}
                                draggable={task.vehicleNo !== null}
                                onDragStart={(e) => handleDragStart(task, e)}
                                className={`p-1.5 rounded-lg border cursor-pointer transition-all duration-300 group ${
                                  colors[task.status]
                                } ${isSelected ? "ring-2 ring-blue-500 scale-105 shadow-lg" : "hover:shadow-lg hover:scale-105"} ${
                                  isExpanded ? "z-10 scale-110 shadow-xl" : ""
                                }`}
                                onClick={(e) => handleTaskClick(task, e)}
                                onDoubleClick={() => handleTaskDoubleClick(task)}
                                style={{
                                  transform: isSelected ? "translateY(-2px)" : "",
                                  boxShadow: isSelected ? "0 8px 25px rgba(0,0,0,0.15)" : "",
                                }}
                              >
                                <div className="flex items-center gap-1 mb-1">
                                  {task.status === "lunch" ? (
                                    <Utensils className="h-3 w-3 flex-shrink-0" />
                                  ) : task.status === "travel" ? (
                                    <MapPin className="h-3 w-3 flex-shrink-0" />
                                  ) : (
                                    <Truck className="h-3 w-3 flex-shrink-0" />
                                  )}
                                  <span className="text-xs font-medium truncate">
                                    {task.vehicleNo ? `${task.vehicleType} ${task.vehicleNo}` : task.vehicleType}
                                  </span>
                                </div>

                                {task.status !== "lunch" && task.status !== "travel" && (
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1">
                                      <Fuel className="h-2.5 w-2.5 flex-shrink-0" />
                                      <span className="text-xs">{task.fuelTanks}L</span>
                                    </div>
                                    <Progress value={task.progress} className="h-1.5 bg-white/50" />
                                  </div>
                                )}

                                <div className="flex items-center justify-between mt-1">
                                  <span className="text-xs opacity-75">{task.timeSlot}</span>
                                  <div className="flex -space-x-1">
                                    {task.team?.split(" ").map((member, i) => (
                                      <Avatar key={i} className="w-4 h-4 border border-white">
                                        <AvatarFallback className="text-xs bg-white/80">
                                          {member.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            // ... existing grid view code ...
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredData.map((task, index) => {
                const taskId = `${task.day}-${task.vehicleNo}`
                const isSelected = selectedTasks.has(taskId)
                const scheduleDate = getScheduleDate(task.day)

                return (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                      isSelected ? "ring-2 ring-blue-500 shadow-lg scale-105" : ""
                    }`}
                    onClick={(e) => handleTaskClick(task, e)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">
                          Day {task.day} - {formatDate(scheduleDate)}
                        </CardTitle>
                        <Badge variant={task.status === "completed" ? "default" : "secondary"} className="text-xs">
                          {task.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          {task.status === "lunch" ? (
                            <Utensils className="h-4 w-4 text-orange-600" />
                          ) : task.status === "travel" ? (
                            <MapPin className="h-4 w-4 text-purple-600" />
                          ) : (
                            <Truck className="h-4 w-4 text-blue-600" />
                          )}
                          <span className="font-medium">
                            {task.vehicleNo ? `${task.vehicleType} ${task.vehicleNo}` : task.vehicleType}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-3 w-3" />
                          <span>{task.location}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-3 w-3" />
                          <span>{task.timeSlot}</span>
                        </div>

                        {task.status !== "lunch" && task.status !== "travel" && (
                          <>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Fuel className="h-3 w-3" />
                              <span>{task.fuelTanks}L Tank</span>
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                              </div>
                              <Progress value={task.progress} className="h-2" />
                            </div>
                          </>
                        )}

                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3 text-gray-400" />
                          <div className="flex -space-x-1">
                            {task.team?.split(" ").map((member, i) => (
                              <Avatar key={i} className="w-6 h-6 border-2 border-white">
                                <AvatarFallback className="text-xs">{member.charAt(0)}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <DatePickerModal />

      {/* Task Details Modal */}
      {selectedTask && showTaskDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
            {/* ... existing modal content ... */}
          </div>
        </div>
      )}
    </div>
  )
}
