'use client'

import { useSpring, animated } from '@react-spring/web'
import {
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  MapPinIcon,
  TagIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns'
import React from 'react'

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  type: 'meeting' | 'deadline' | 'milestone'
  attendees: string[]
  project?: string
}

const events: Event[] = [
  {
    id: 1,
    title: 'Project Kickoff Meeting',
    description: 'Initial meeting to discuss project goals and timeline',
    date: '2024-03-15',
    time: '10:00 AM - 11:30 AM',
    location: 'Conference Room A',
    type: 'meeting',
    attendees: ['Sarah Wilson', 'Michael Chen', 'Emily Rodriguez'],
    project: 'Website Redesign'
  },
  {
    id: 2,
    title: 'Design Review',
    description: 'Review of new website design concepts',
    date: '2024-03-15',
    time: '2:00 PM - 3:00 PM',
    location: 'Design Studio',
    type: 'meeting',
    attendees: ['Sarah Wilson', 'David Kim'],
    project: 'Website Redesign'
  },
  {
    id: 3,
    title: 'API Documentation Deadline',
    description: 'Final documentation for API integration',
    date: '2024-03-16',
    time: '5:00 PM',
    location: 'Remote',
    type: 'deadline',
    attendees: ['Michael Chen'],
    project: 'API Integration'
  },
  {
    id: 4,
    title: 'User Research Milestone',
    description: 'Completion of initial user research phase',
    date: '2024-03-17',
    time: '3:00 PM - 4:00 PM',
    location: 'Research Lab',
    type: 'milestone',
    attendees: ['Emily Rodriguez', 'David Kim'],
    project: 'User Research Study'
  }
]

const typeColors = {
  meeting: 'bg-blue-100 text-blue-800',
  deadline: 'bg-red-100 text-red-800',
  milestone: 'bg-green-100 text-green-800'
}

const typeIcons = {
  meeting: UserGroupIcon,
  deadline: ClockIcon,
  milestone: CalendarIcon
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
  const fadeIn = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 }
  })

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  const getEventsForDay = (date: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), date))
  }

  const filteredEvents = events.filter(event => event.date === selectedDate)

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Calendar</h1>
            <p className="mt-2 text-sm text-gray-700">
              View and manage your upcoming events and deadlines.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <animated.div style={fadeIn} className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {format(currentDate, 'MMMM yyyy')}
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevMonth}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="bg-gray-50 py-2 text-center text-sm font-semibold text-gray-900"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {days.map((day) => {
                const dayEvents = getEventsForDay(day)
                const isSelected = format(day, 'yyyy-MM-dd') === selectedDate
                return (
                  <div
                    key={day.toString()}
                    onClick={() => setSelectedDate(format(day, 'yyyy-MM-dd'))}
                    className={`min-h-[120px] bg-white p-2 cursor-pointer hover:bg-gray-50 ${
                      !isSameMonth(day, currentDate) ? 'bg-gray-50' : ''
                    } ${isSelected ? 'ring-2 ring-indigo-600' : ''}`}
                  >
                    <div
                      className={`text-sm ${
                        isToday(day)
                          ? 'bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center'
                          : 'text-gray-900'
                      }`}
                    >
                      {format(day, 'd')}
                    </div>
                    <div className="mt-1 space-y-1">
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded truncate ${typeColors[event.type]}`}
                        >
                          <div className="flex items-center gap-1">
                            {React.createElement(typeIcons[event.type], { className: "h-3 w-3" })}
                            <span className="truncate">{event.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </animated.div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Events for {format(new Date(selectedDate), 'MMMM d, yyyy')}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {filteredEvents.map((event) => {
                const TypeIcon = typeIcons[event.type]
                return (
                  <animated.div
                    key={event.id}
                    style={fadeIn}
                    className="relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-medium text-gray-900">{event.title}</h2>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeColors[event.type]}`}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{event.description}</p>

                      <div className="mt-4 space-y-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <ClockIcon className="h-5 w-5 text-gray-400" />
                          <span className="ml-1.5">{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPinIcon className="h-5 w-5 text-gray-400" />
                          <span className="ml-1.5">{event.location}</span>
                        </div>
                        {event.project && (
                          <div className="flex items-center text-sm text-gray-500">
                            <TagIcon className="h-5 w-5 text-gray-400" />
                            <span className="ml-1.5">{event.project}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-900">Attendees</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {event.attendees.map((attendee) => (
                            <span
                              key={attendee}
                              className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                            >
                              {attendee}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </animated.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 