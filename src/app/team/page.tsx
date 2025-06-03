'use client'

import { useSpring, animated } from '@react-spring/web'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  ChatBubbleLeftRightIcon,
  StarIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react'

type Status = 'available' | 'busy' | 'away' | 'offline'

interface TeamMember {
  id: number
  name: string
  role: string
  department: string
  email: string
  phone: string
  avatar: string
  status: Status
  skills: string[]
  currentProjects: string[]
  performance: {
    rating: number
    completedTasks: number
    onTimeDelivery: number
  }
  availability: {
    hours: string
    timezone: string
  }
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Sarah Wilson',
    role: 'Senior Product Designer',
    department: 'Design',
    email: 'sarah.wilson@company.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'available',
    skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research'],
    currentProjects: ['Website Redesign', 'Mobile App UI'],
    performance: {
      rating: 4.8,
      completedTasks: 156,
      onTimeDelivery: 95,
    },
    availability: {
      hours: '9:00 AM - 6:00 PM EST',
      timezone: 'Eastern Time',
    }
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Lead Developer',
    department: 'Engineering',
    email: 'michael.chen@company.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'busy',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    currentProjects: ['API Development', 'System Architecture'],
    performance: {
      rating: 4.9,
      completedTasks: 203,
      onTimeDelivery: 98,
    },
    availability: {
      hours: '10:00 AM - 7:00 PM PST',
      timezone: 'Pacific Time',
    }
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    department: 'Product',
    email: 'emily.rodriguez@company.com',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'away',
    skills: ['Agile', 'Product Strategy', 'Data Analysis', 'Stakeholder Management'],
    currentProjects: ['Product Roadmap', 'Feature Planning'],
    performance: {
      rating: 4.7,
      completedTasks: 178,
      onTimeDelivery: 92,
    },
    availability: {
      hours: '8:00 AM - 5:00 PM CST',
      timezone: 'Central Time',
    }
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'UX Researcher',
    department: 'Design',
    email: 'david.kim@company.com',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'offline',
    skills: ['User Research', 'Usability Testing', 'Data Analysis', 'User Interviews'],
    currentProjects: ['User Research Study', 'UX Audit'],
    performance: {
      rating: 4.6,
      completedTasks: 145,
      onTimeDelivery: 90,
    },
    availability: {
      hours: '9:00 AM - 6:00 PM EST',
      timezone: 'Eastern Time',
    }
  }
]

const statusColors: Record<Status, string> = {
  available: 'bg-green-100 text-green-800',
  busy: 'bg-red-100 text-red-800',
  away: 'bg-yellow-100 text-yellow-800',
  offline: 'bg-gray-100 text-gray-800'
}

const statusIcons: Record<Status, ForwardRefExoticComponent<SVGProps<SVGSVGElement> & { title?: string; titleId?: string } & RefAttributes<SVGSVGElement>>> = {
  available: CheckCircleIcon,
  busy: XCircleIcon,
  away: ClockIcon,
  offline: XCircleIcon
}

export default function TeamPage() {
  const fadeIn = useSpring({ 
    from: { opacity: 0, y: 20 }, 
    to: { opacity: 1, y: 0 }, 
    config: { tension: 200, friction: 20 } 
  })

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Team</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all team members including their roles, skills, and current status.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {teamMembers.map((member) => {
            const StatusIcon = statusIcons[member.status]
            return (
              <animated.div
                key={member.id}
                style={fadeIn}
                className="relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="h-16 w-16 flex-shrink-0">
                      <img
                        className="h-16 w-16 rounded-full"
                        src={member.avatar}
                        alt={member.name}
                      />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-medium text-gray-900">{member.name}</h2>
                      <p className="text-sm text-gray-500">{member.role}</p>
                      <div className="mt-1 flex items-center">
                        <StatusIcon className={`h-4 w-4 ${statusColors[member.status].split(' ')[1]}`} />
                        <span className={`ml-1.5 text-xs font-medium ${statusColors[member.status]}`}>
                          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <StarIcon className="h-5 w-5 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium text-gray-900">{member.performance.rating}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.availability.hours}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-900">Skills</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-900">Current Projects</h3>
                      <ul className="mt-2 list-disc list-inside text-sm text-gray-500">
                        {member.currentProjects.map((project) => (
                          <li key={project}>{project}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-full bg-white p-1.5 text-gray-400 hover:text-gray-500"
                        >
                          <EnvelopeIcon className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-full bg-white p-1.5 text-gray-400 hover:text-gray-500"
                        >
                          <PhoneIcon className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-full bg-white p-1.5 text-gray-400 hover:text-gray-500"
                        >
                          <ChatBubbleLeftRightIcon className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.department}
                      </div>
                    </div>
                  </div>
                </div>
              </animated.div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 