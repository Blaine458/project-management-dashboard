'use client'

import { useSpring, animated } from '@react-spring/web'
import {
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'

interface Project {
  id: number
  name: string
  description: string
  status: 'on-track' | 'at-risk' | 'delayed'
  progress: number
  team: {
    total: number
    members: string[]
  }
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  tasks: {
    total: number
    completed: number
  }
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website with modern design principles',
    status: 'on-track',
    progress: 75,
    team: {
      total: 5,
      members: ['Sarah Wilson', 'Michael Chen', 'Emily Rodriguez']
    },
    dueDate: '2024-04-15',
    priority: 'high',
    tasks: {
      total: 24,
      completed: 18
    }
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'Development of a new mobile application for iOS and Android',
    status: 'at-risk',
    progress: 45,
    team: {
      total: 8,
      members: ['Michael Chen', 'David Kim']
    },
    dueDate: '2024-05-30',
    priority: 'high',
    tasks: {
      total: 36,
      completed: 16
    }
  },
  {
    id: 3,
    name: 'API Integration',
    description: 'Integration of third-party APIs for enhanced functionality',
    status: 'on-track',
    progress: 90,
    team: {
      total: 3,
      members: ['Michael Chen']
    },
    dueDate: '2024-03-20',
    priority: 'medium',
    tasks: {
      total: 12,
      completed: 11
    }
  },
  {
    id: 4,
    name: 'User Research Study',
    description: 'Comprehensive user research for product improvement',
    status: 'delayed',
    progress: 30,
    team: {
      total: 4,
      members: ['Emily Rodriguez', 'David Kim']
    },
    dueDate: '2024-04-01',
    priority: 'medium',
    tasks: {
      total: 18,
      completed: 5
    }
  }
]

const statusColors = {
  'on-track': 'bg-green-100 text-green-800',
  'at-risk': 'bg-yellow-100 text-yellow-800',
  'delayed': 'bg-red-100 text-red-800'
}

const statusIcons = {
  'on-track': CheckCircleIcon,
  'at-risk': ExclamationCircleIcon,
  'delayed': ClockIcon
}

const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800'
}

export default function ProjectsPage() {
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
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Projects</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all projects including their status, progress, and team members.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {projects.map((project) => {
            const StatusIcon = statusIcons[project.status]
            return (
              <animated.div
                key={project.id}
                style={fadeIn}
                className="relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">{project.name}</h2>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityColors[project.priority]}`}>
                      {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{project.description}</p>

                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <StatusIcon className={`h-5 w-5 ${statusColors[project.status].split(' ')[1]}`} />
                        <span className={`ml-1.5 text-sm font-medium ${statusColors[project.status]}`}>
                          {project.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Due: {new Date(project.dueDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium text-gray-900">{project.progress}%</span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-indigo-600 transition-all duration-500 ease-out"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <UserGroupIcon className="h-5 w-5 text-gray-400" />
                          <span className="ml-1.5">{project.team.total} Team Members</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <ChartBarIcon className="h-5 w-5 text-gray-400" />
                          <span className="ml-1.5">{project.tasks.completed}/{project.tasks.total} Tasks</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-900">Team Members</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.team.members.map((member) => (
                          <span
                            key={member}
                            className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                          >
                            {member}
                          </span>
                        ))}
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