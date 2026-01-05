"use client"

import { useCallback, useEffect, useState } from "react"
import { Landing } from "@/entities/landing.entity"
import { AdminLandings } from "@/modules/admin/admin.module"
import { useRouter } from "next/navigation"
import { Admin } from "@/entities/admin.entity"

export default function AdminDashboard() {
  const [landings, setLandings] = useState<Landing[]>([])
  const [admin, setAdmin] = useState<Admin>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/admin')
      return
    }
  }, [router])

  const fetchLandings = useCallback(async () => {
    try {
      const response = await AdminLandings()
      if (response.success && response.data?.landings) {
        setLandings(response.data.landings)
        const user = localStorage.getItem('user')
        if (user) {
          setAdmin(JSON.parse(user))
        }
      } else {
        throw new Error("Failed to fetch landings")
      }
    } catch (error) {
      console.error("Error fetching landings:", error)
      setError("Failed to load landing page submissions. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLandings()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchLandings}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 relative">
          <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
            <span className="hidden md:block text-xl font-bold">Landing Page Submissions</span>
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 pt-4 hidden md:block">
            <img src="/logo-simple.svg" alt="Logo" className="h-12 w-auto" />
          </div>

          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-auto`}>
            <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
              <span className="text-gray-600">Welcome, {admin?.firstName} {admin?.lastName}</span>
              <button 
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/admin';
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex justify-center md:justify-end mb-4">
            <button
              onClick={() => {
                const headers = ['Last Name', 'First Name', 'Email', 'Position', 'Social Media', 'Created At', 'Updated At'];
                // const csvContent = [
                //   headers.join(','),
                //   ...landings.map(landing => [
                //     landing.lastName,
                //     landing.firstName,
                //     landing.email,
                //     landing.position,
                //     landing.socialMedia,
                //     new Date(landing.createdAt).toLocaleDateString(),
                //     new Date(landing.updatedAt).toLocaleDateString()
                //   ].join(','))
                // ].join('\n');

                // const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                // const link = document.createElement('a');
                // const url = URL.createObjectURL(blob);
                // link.setAttribute('href', url);
                // link.setAttribute('download', 'landing-submissions.csv');
                // link.style.visibility = 'hidden';
                // document.body.appendChild(link);
                // link.click();
                // document.body.removeChild(link);
              }}
              className="px-4 py-2 bg-[#000000] text-white rounded hover:bg-gray-800"
            >
              Export to CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <div className="block md:hidden">
              {landings.map((landing, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-xs font-medium text-[#6b7280]">Last Name:</div>
                    <div className="text-sm text-[#111827]">{landing.lastName}</div>
                    
                    <div className="text-xs font-medium text-[#6b7280]">First Name:</div>
                    <div className="text-sm text-[#111827]">{landing.firstName}</div>
                    
                    <div className="text-xs font-medium text-[#6b7280]">Email:</div>
                    <div className="text-sm text-[#111827] break-all">{landing.email}</div>
                    
                    <div className="text-xs font-medium text-[#6b7280]">Position:</div>
                    <div className="text-sm text-[#111827]">{landing.position}</div>
                    
                    <div className="text-xs font-medium text-[#6b7280]">Social Media:</div>
                    <div className="text-sm text-[#111827]">{landing.socialMedia}</div>
                    
                    <div className="text-xs font-medium text-[#6b7280]">Created At:</div>
                    <div className="text-sm text-[#111827]">
                      {new Date(landing.createdAt).toLocaleTimeString()} | {new Date(landing.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider">Last Name</th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider">First Name</th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider">Email</th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider">Position</th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider">Social Media</th>
                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-[#6b7280] uppercase tracking-wider">Created At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {landings.map((landing, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-[#111827]">{landing.lastName}</td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-[#111827]">{landing.firstName}</td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-[#111827]">{landing.email}</td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-[#111827]">{landing.position}</td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-[#111827]">{landing.socialMedia}</td>
                      <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-[#111827] text-center">
                        {new Date(landing.createdAt).toLocaleTimeString()} | {new Date(landing.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
