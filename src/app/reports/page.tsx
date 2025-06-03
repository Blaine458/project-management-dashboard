'use client'

import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

interface MetricCard {
  title: string
  value: string | number
  change: number
  icon: typeof ChartBarIcon
  trend: 'up' | 'down'
  description: string
}

interface ProjectStatus {
  name: string
  progress: number
  status: 'on-track' | 'at-risk' | 'delayed'
  team: string[]
  deadline: string
  budget: {
    spent: number
    total: number
  }
}

const metrics: MetricCard[] = [
  {
    title: 'Project Completion Rate',
    value: '87%',
    change: 12,
    icon: CheckCircleIcon,
    trend: 'up',
    description: 'Projects completed on time'
  },
  {
    title: 'Team Productivity',
    value: '92%',
    change: 5,
    icon: UserGroupIcon,
    trend: 'up',
    description: 'Average team efficiency'
  },
  {
    title: 'Budget Utilization',
    value: '78%',
    change: -3,
    icon: CurrencyDollarIcon,
    trend: 'down',
    description: 'Budget spent vs allocated'
  },
  {
    title: 'Time Tracking',
    value: '94%',
    change: 8,
    icon: ClockIcon,
    trend: 'up',
    description: 'Hours logged vs estimated'
  }
]

const projects: ProjectStatus[] = [
  {
    name: 'Website Redesign',
    progress: 75,
    status: 'on-track',
    team: ['Sarah Wilson', 'Michael Chen'],
    deadline: '2024-05-15',
    budget: {
      spent: 45000,
      total: 60000
    }
  },
  {
    name: 'Mobile App Development',
    progress: 45,
    status: 'at-risk',
    team: ['Emily Rodriguez', 'David Kim'],
    deadline: '2024-06-30',
    budget: {
      spent: 65000,
      total: 120000
    }
  },
  {
    name: 'API Integration',
    progress: 90,
    status: 'on-track',
    team: ['Michael Chen'],
    deadline: '2024-04-30',
    budget: {
      spent: 28000,
      total: 30000
    }
  },
  {
    name: 'Data Migration',
    progress: 30,
    status: 'delayed',
    team: ['David Kim', 'Sarah Wilson'],
    deadline: '2024-05-30',
    budget: {
      spent: 40000,
      total: 50000
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
  'delayed': ExclamationCircleIcon
}

const ReportsPage: React.FC = () => {
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
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Reports</h1>
            <p className="mt-2 text-sm text-gray-700">
              Track project performance, team productivity, and key metrics.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Export Report
            </button>
          </div>
        </div>

        <animated.div style={fadeIn} className="mt-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.title}
                className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow-sm sm:px-6 sm:pt-6"
              >
                <dt>
                  <div className="absolute rounded-md bg-indigo-500 p-3">
                    <metric.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <p className="ml-16 truncate text-sm font-medium text-gray-500">{metric.title}</p>
                </dt>
                <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                  <p
                    className={`ml-2 flex items-baseline text-sm font-semibold ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {metric.trend === 'up' ? (
                      <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" />
                    ) : (
                      <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" />
                    )}
                    <span className="sr-only">{metric.trend === 'up' ? 'Increased' : 'Decreased'} by</span>
                    {metric.change}%
                  </p>
                </dd>
                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <span className="font-medium text-gray-500">{metric.description}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Project Status */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h2>
            <div className="overflow-hidden bg-white shadow-sm rounded-lg">
              <ul role="list" className="divide-y divide-gray-200">
                {projects.map((project) => {
                  const StatusIcon = statusIcons[project.status]
                  return (
                    <li key={project.name}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <p className="truncate text-sm font-medium text-indigo-600">{project.name}</p>
                            <div className={`ml-2 flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[project.status]}`}>
                              <StatusIcon className="mr-1 h-4 w-4" />
                              {project.status.replace('-', ' ')}
                            </div>
                          </div>
                          <div className="ml-2 flex flex-shrink-0">
                            <p className="text-sm text-gray-500">
                              Deadline: {new Date(project.deadline).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <UserGroupIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                              {project.team.join(', ')}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                            <p>
                              ${project.budget.spent.toLocaleString()} / ${project.budget.total.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                              <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-100">
                                  Progress
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-semibold inline-block text-indigo-600">
                                  {project.progress}%
                                </span>
                              </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                              <div
                                style={{ width: `${project.progress}%` }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Team Performance</h3>
                <div className="mt-5">
                  <div className="space-y-4">
                    {['Sarah Wilson', 'Michael Chen', 'Emily Rodriguez', 'David Kim'].map((member) => (
                      <div key={member} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-indigo-600">
                              {member.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="ml-3 text-sm text-gray-500">{member}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">92%</span>
                          <span className="ml-2 text-sm text-green-600">↑ 5%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Resource Allocation</h3>
                <div className="mt-5">
                  <div className="space-y-4">
                    {['Design', 'Development', 'Product Management', 'Quality Assurance'].map((department) => (
                      <div key={department} className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{department}</span>
                        <div className="flex items-center">
                          <div className="w-32 bg-gray-100 rounded-full h-2.5">
                            <div
                              className="bg-indigo-500 h-2.5 rounded-full"
                              style={{ width: `${Math.random() * 100}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-900">
                            {Math.floor(Math.random() * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </animated.div>
      </div>
    </div>
  )
}

export default ReportsPage 