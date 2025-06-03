'use client'

import { useSpring, animated } from '@react-spring/web'
import { 
  ChartBarIcon, 
  ClipboardDocumentListIcon, 
  UserGroupIcon, 
  CalendarIcon 
} from '@heroicons/react/24/outline'

const stats = [
  { name: 'Total Projects', value: '12', icon: ClipboardDocumentListIcon },
  { name: 'Team Members', value: '24', icon: UserGroupIcon },
  { name: 'Tasks Completed', value: '156', icon: ChartBarIcon },
  { name: 'Upcoming Deadlines', value: '8', icon: CalendarIcon },
]

export default function Home() {
  // Simple fade-in animation for cards
  const fadeIn = useSpring({ from: { opacity: 0, y: 20 }, to: { opacity: 1, y: 0 }, config: { tension: 200, friction: 20 } })

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Dashboard
          </h1>
          
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <animated.div
                  key={stat.name}
                  style={{ ...fadeIn, transform: fadeIn.y.to(y => `translateY(${y}px)`) }}
                  className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
                >
                  <dt>
                    <div className="absolute rounded-md bg-indigo-500 p-3">
                      <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
                  </dt>
                  <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </dd>
                </animated.div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <animated.div style={fadeIn} className="rounded-lg bg-white shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Recent Projects</h2>
                <div className="mt-6 flow-root">
                  <ul role="list" className="-my-5 divide-y divide-gray-200">
                    {[1, 2, 3].map((project) => (
                      <li key={project} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              Project {project}
                            </p>
                            <p className="truncate text-sm text-gray-500">
                              In progress
                            </p>
                          </div>
                          <div>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Active
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </animated.div>

            <animated.div style={fadeIn} className="rounded-lg bg-white shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Upcoming Tasks</h2>
                <div className="mt-6 flow-root">
                  <ul role="list" className="-my-5 divide-y divide-gray-200">
                    {[1, 2, 3].map((task) => (
                      <li key={task} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              Task {task}
                            </p>
                            <p className="truncate text-sm text-gray-500">
                              Due in 2 days
                            </p>
                          </div>
                          <div>
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                              Pending
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </animated.div>
          </div>
        </div>
      </main>
    </div>
  )
}
