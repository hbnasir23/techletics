// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { AlertCircle, Plus, Trash2, X, CheckCircle2 } from "lucide-react"
// import toast from "react-hot-toast"

// export interface Sport {
//   id: string
//   name: string
//   icon: string
//   type: 'solo' | 'doubles' | 'team'
//   teamSize?: number
//   maxSubstitutes?: number
//   totalTeams?: number
//   maxTeams?: number
//   description: string
// }

// interface TeamMember {
//   name: string
//   rollNo: string
// }

// interface TeamMemberErrors {
//   name?: string
//   rollNo?: string
// }

// interface SportRegistrationModalProps {
//   sport: Sport
//   isOpen: boolean
//   onClose: () => void
// }

// interface ValidationErrors {
//   captainName?: string
//   captainEmail?: string
//   captainRollNo?: string
//   section?: string
//   teamName?: string
//   teamMembers?: string
//   captainPhone?: string
// }

// export default function SportRegistrationModal({ sport, isOpen, onClose }: SportRegistrationModalProps) {
//   const [formData, setFormData] = useState({
//     captainName: "",
//     captainEmail: "",
//     captainRollNo: "",
//     section: "",
//     teamName: "",
//     captainPhone: "",
//   })
//   const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
//   const [errors, setErrors] = useState<ValidationErrors>({})
//   const [touched, setTouched] = useState<Record<string, boolean>>({})
//   const [teamMemberErrors, setTeamMemberErrors] = useState<TeamMemberErrors[]>([])
//   const [teamMemberTouched, setTeamMemberTouched] = useState<Array<{ name?: boolean; rollNo?: boolean }>>([])

//   // Student types for section validation
//   const studentTypes = ['FESE', 'SESE', 'TESE', 'BESE']

//   // Reset form when modal opens with new sport
//   useEffect(() => {
//     if (isOpen) {
//       resetForm()
//     }
//   }, [isOpen, sport.id])

//   const validateField = (field: string, value: string): string | undefined => {
//     switch (field) {
//       case 'captainName':
//         if (!value) return 'Name is required'
//         if (value.length < 3) return 'Name must be at least 3 characters'
//         if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name must contain letters only'
//         return undefined

//       case 'captainEmail':
//         if (!value) return 'Email is required'
//         const emailRegex = /^[a-zA-Z0-9._%+-]+@cloud\.neduet\.edu\.pk$/
//         if (!emailRegex.test(value)) return 'Must be a valid @cloud.neduet.edu.pk email'
//         return undefined

//       case 'captainRollNo':
//         if (!value) return 'Roll number is required'
//         const rollNoRegex = /^SE-\d{5}$/
//         if (!rollNoRegex.test(value)) return 'Must match format: SE-23086'
//         return undefined

//       case 'section':
//         if (!value) return 'Section is required'
//         const sectionRegex = /^(FESE|SESE|TESE|BESE)-[A-B]$/
//         if (!sectionRegex.test(value)) return 'Must match format: FESE-A or FESE-B'
//         return undefined

//       case 'teamName':
//         if (sport.type !== 'solo' && !value) return 'Team name is required'
//         if (sport.type !== 'solo' && value.length < 3) return 'Team name must be at least 3 characters'
//         return undefined

//       case 'captainPhone':
//         if (!value) return 'Phone number is required'
//         const phoneRegex = /^03\d{9}$/
//         if (!phoneRegex.test(value)) return 'Must be a valid phone number (e.g., 03XXXXXXXXX)'
//         return undefined

//       default:
//         return undefined
//     }
//   }

//   const validateTeamMemberField = (field: 'name' | 'rollNo', value: string): string | undefined => {
//     switch (field) {
//       case 'name':
//         if (!value) return 'Name is required'
//         if (value.length < 3) return 'Name must be at least 3 characters'
//         if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name must contain letters only'
//         return undefined

//       case 'rollNo':
//         if (!value) return 'Roll number is required'
//         const rollNoRegex = /^SE-\d{5}$/
//         if (!rollNoRegex.test(value)) return 'Must match format: SE-23086'
//         return undefined

//       default:
//         return undefined
//     }
//   }

//   const handleFieldChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
    
//     // Clear error when user starts typing
//     if (errors[field as keyof ValidationErrors]) {
//       setErrors(prev => ({ ...prev, [field]: undefined }))
//     }
//   }

//   const handleSectionChange = (value: string) => {
//     // Auto-format section input
//     const upperValue = value.toUpperCase()
    
//     // If user types a dash, help them format correctly
//     if (upperValue.includes('-')) {
//       const parts = upperValue.split('-')
//       if (parts.length === 2) {
//         const studentType = parts[0]
//         const section = parts[1]
        
//         // Validate student type
//         if (studentTypes.includes(studentType)) {
//           // Only allow A or B for section
//           if (section === '' || section === 'A' || section === 'B') {
//             handleFieldChange('section', upperValue)
//             return
//           } else {
//             // Replace invalid section with empty
//             handleFieldChange('section', studentType + '-')
//             return
//           }
//         }
//       }
//     }
    
//     handleFieldChange('section', upperValue)
//   }

//   const handleEmailChange = (value: string) => {
//     // Auto-complete @cloud.neduet.edu.pk when user types @
//     if (value.includes('@') && !value.includes('@cloud.neduet.edu.pk')) {
//       const parts = value.split('@')
//       if (parts.length === 2 && parts[1] === '') {
//         value = parts[0] + '@cloud.neduet.edu.pk'
//       }
//     }
//     handleFieldChange('captainEmail', value)
//   }

//   const handleBlur = (field: string) => {
//     setTouched(prev => ({ ...prev, [field]: true }))
//     const error = validateField(field, formData[field as keyof typeof formData])
//     if (error) {
//       setErrors(prev => ({ ...prev, [field]: error }))
//     }
//   }

//   const handleTeamMemberBlur = (index: number, field: 'name' | 'rollNo') => {
//     const newTouched = [...teamMemberTouched]
//     if (!newTouched[index]) {
//       newTouched[index] = {}
//     }
//     newTouched[index][field] = true
//     setTeamMemberTouched(newTouched)

//     const value = teamMembers[index][field]
//     const error = validateTeamMemberField(field, value)
    
//     const newErrors = [...teamMemberErrors]
//     if (!newErrors[index]) {
//       newErrors[index] = {}
//     }
//     newErrors[index][field] = error
//     setTeamMemberErrors(newErrors)
//   }

//   const validateForm = (): boolean => {
//     const newErrors: ValidationErrors = {}

//     // Validate all captain fields
//     Object.keys(formData).forEach(field => {
//       const error = validateField(field, formData[field as keyof typeof formData])
//       if (error) {
//         newErrors[field as keyof ValidationErrors] = error
//       }
//     })

//     // Validate team members
//     if (sport.type !== 'solo') {
//       if (teamMembers.length < getRequiredMembersCount()) {
//         newErrors.teamMembers = `Please add all ${sport.type === 'doubles' ? 'partner' : 'team members'} (${teamMembers.length}/${getRequiredMembersCount()} added)`
//       } else {
//         // Check each team member
//         const memberErrors: TeamMemberErrors[] = []
//         let hasError = false

//         teamMembers.forEach((member, index) => {
//           const nameError = validateTeamMemberField('name', member.name)
//           const rollNoError = validateTeamMemberField('rollNo', member.rollNo)
          
//           memberErrors[index] = {
//             name: nameError,
//             rollNo: rollNoError
//           }

//           if (nameError || rollNoError) {
//             hasError = true
//           }
//         })

//         setTeamMemberErrors(memberErrors)

//         if (hasError) {
//           newErrors.teamMembers = 'Please fix all team member errors'
//         }
//       }
//     }

//     setErrors(newErrors)
//     setTouched({
//       captainName: true,
//       captainEmail: true,
//       captainRollNo: true,
//       section: true,
//       teamName: true,
//       captainPhone: true,
//     })

//     // Mark all team members as touched
//     if (sport.type !== 'solo') {
//       const allTouched = teamMembers.map(() => ({ name: true, rollNo: true }))
//       setTeamMemberTouched(allTouched)
//     }

//     // Show first error as toast
//     const firstError = Object.values(newErrors)[0]
//     if (firstError) {
//       toast.error(firstError)
//       return false
//     }

//     return true
//   }

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       return
//     }

//     const loadingToast = toast.loading('Registering...')

//     try {
//       const submissionData = {
//         sportName: sport.name,
//         sportType: sport.type,
//         section: formData.section,
//         teamName: formData.teamName || undefined,
//         captain: {
//           name: formData.captainName,
//           email: formData.captainEmail,
//           rollNo: formData.captainRollNo,
//           phone: formData.captainPhone,
//         },
//         teamMembers: sport.type !== 'solo' ? teamMembers : undefined,
//       }

//       console.log("Submitting registration:", submissionData)

//       const response = await fetch('/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(submissionData),
//       })

//       const data = await response.json()

//       toast.dismiss(loadingToast)

//       if (!response.ok) {
//         toast.error(data.error || 'Registration failed')
//         console.error('Registration error:', data)
//         return
//       }

//       console.log('Registration successful:', data)
//       toast.success('Registration successful! 🎉')
      
//       // Reset form and close modal
//       resetForm()
//       setTimeout(() => {
//         onClose()
//       }, 1500)
//     } catch (error) {
//       toast.dismiss(loadingToast)
//       console.error('Request error:', error)
//       toast.error('An unexpected error occurred')
//     }
//   }

//   const addTeamMember = () => {
//     const maxMembers = sport.type === 'doubles' 
//       ? 1 
//       : (sport.teamSize || 0) - 1

//     if (teamMembers.length < maxMembers) {
//       setTeamMembers([...teamMembers, { name: "", rollNo: "" }])
//       setTeamMemberErrors([...teamMemberErrors, {}])
//       setTeamMemberTouched([...teamMemberTouched, {}])
      
//       // Clear team members error when adding
//       if (errors.teamMembers) {
//         setErrors(prev => ({ ...prev, teamMembers: undefined }))
//       }
//     }
//   }

//   const removeTeamMember = (index: number) => {
//     setTeamMembers(teamMembers.filter((_, i) => i !== index))
//     setTeamMemberErrors(teamMemberErrors.filter((_, i) => i !== index))
//     setTeamMemberTouched(teamMemberTouched.filter((_, i) => i !== index))
//   }

//   const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
//     const updated = [...teamMembers]
//     updated[index][field] = value
//     setTeamMembers(updated)

//     // Clear error when user starts typing
//     if (teamMemberErrors[index]?.[field]) {
//       const newErrors = [...teamMemberErrors]
//       if (newErrors[index]) {
//         newErrors[index][field] = undefined
//       }
//       setTeamMemberErrors(newErrors)
//     }
//   }

//   const resetForm = () => {
//     setFormData({
//       captainName: "",
//       captainEmail: "",
//       captainRollNo: "",
//       section: "",
//       teamName: "",
//       captainPhone: "",
//     })
//     setTeamMembers([])
//     setErrors({})
//     setTouched({})
//     setTeamMemberErrors([])
//     setTeamMemberTouched([])
//   }

//   const getRequiredMembersCount = () => {
//     if (sport.type === 'solo') return 0
//     if (sport.type === 'doubles') return 1
//     return (sport.teamSize || 0) - 1
//   }

//   const isTeamComplete = () => {
//     if (sport.type === 'solo') return true
//     return teamMembers.length === getRequiredMembersCount()
//   }

//   const isFormValid = () => {
//     // Check all required fields are filled and valid
//     const allFieldsValid = Object.keys(formData).every(field => {
//       const error = validateField(field, formData[field as keyof typeof formData])
//       return !error
//     })

//     if (!allFieldsValid) return false

//     // Check team completion
//     if (sport.type !== 'solo') {
//       if (!isTeamComplete()) return false
      
//       // Check all team members are valid
//       const allMembersValid = teamMembers.every(member => {
//         const nameError = validateTeamMemberField('name', member.name)
//         const rollNoError = validateTeamMemberField('rollNo', member.rollNo)
//         return !nameError && !rollNoError
//       })
      
//       if (!allMembersValid) return false
//     }

//     return true
//   }

//   const getSportTypeBadge = () => {
//     const badges = {
//       solo: { label: "SOLO", color: "bg-blue-500/20 text-blue-400 border-blue-400/50" },
//       doubles: { label: "DOUBLES", color: "bg-purple-500/20 text-purple-400 border-purple-400/50" },
//       team: { label: "TEAM", color: "bg-green-500/20 text-green-400 border-green-400/50" }
//     }
//     return badges[sport.type]
//   }

//   if (!isOpen) return null

//   const badge = getSportTypeBadge()

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
//       <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-lg border border-cyan-500/30 shadow-2xl">
//         {/* Header */}
//         <div className="sticky top-0 z-10 bg-slate-900 border-b border-slate-700 p-6">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
          
//           <div className="flex items-center gap-4">
//             <span className="text-5xl">{sport.icon}</span>
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <h2 className="text-3xl font-bold text-cyan-400">{sport.name}</h2>
//                 <span className={`text-xs font-bold px-2 py-1 rounded border ${badge.color}`}>
//                   {badge.label}
//                 </span>
//               </div>
//               <p className="text-gray-400">{sport.description}</p>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {/* Important Notice */}
//           {sport.type !== 'solo' && (
//             <div className="mb-6 p-4 rounded-lg border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-sm">
//               <div className="flex gap-3">
//                 <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
//                 <div className="space-y-1 text-sm text-gray-300">
//                   <p className="font-bold text-cyan-300">Important Registration Guidelines:</p>
//                   <ul className="list-disc list-inside space-y-0.5 ml-2 text-xs">
//                     <li>Only the team captain should fill this registration</li>
//                     <li>All team members must be from the same section</li>
//                     <li>No inter-section teams allowed</li>
//                     <li>Provide complete details of all team members</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="space-y-6">
//             {/* Captain/Player Details */}
//             <div>
//               <h3 className="text-lg font-bold text-magenta-300 mb-4">
//                 {sport.type === 'solo' ? 'Player Details' : 'Captain Details'}
//               </h3>

//               <div className="space-y-4">
//                 {/* Name Field */}
//                 <div>
//                   <label className="block text-sm font-bold text-cyan-300 mb-2">
//                     {sport.type === 'solo' ? 'Full Name' : 'Captain Name'} *
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value={formData.captainName}
//                       onChange={(e) => handleFieldChange('captainName', e.target.value)}
//                       onBlur={() => handleBlur('captainName')}
//                       className={`w-full px-4 py-2 rounded-lg bg-slate-800/50 border ${
//                         touched.captainName && errors.captainName
//                           ? 'border-red-500 focus:border-red-400'
//                           : touched.captainName && !errors.captainName && formData.captainName
//                           ? 'border-green-500 focus:border-green-400'
//                           : 'border-slate-700 focus:border-cyan-400'
//                       } text-white placeholder-gray-500 focus:outline-none transition-colors duration-300`}
//                       placeholder="Enter full name"
//                     />
//                     {touched.captainName && !errors.captainName && formData.captainName && (
//                       <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
//                     )}
//                   </div>
//                   {touched.captainName && errors.captainName && (
//                     <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
//                       <AlertCircle className="w-3 h-3" />
//                       {errors.captainName}
//                     </p>
//                   )}
//                 </div>

//                 {/* Email Field */}
//                 <div>
//                   <label className="block text-sm font-bold text-cyan-300 mb-2">Email Address *</label>
//                   <div className="relative">
//                     <input
//                       type="email"
//                       value={formData.captainEmail}
//                       onChange={(e) => handleEmailChange(e.target.value)}
//                       onBlur={() => handleBlur('captainEmail')}
//                       className={`w-full px-4 py-2 rounded-lg bg-slate-800/50 border ${
//                         touched.captainEmail && errors.captainEmail
//                           ? 'border-red-500 focus:border-red-400'
//                           : touched.captainEmail && !errors.captainEmail && formData.captainEmail
//                           ? 'border-green-500 focus:border-green-400'
//                           : 'border-slate-700 focus:border-cyan-400'
//                       } text-white placeholder-gray-500 focus:outline-none transition-colors duration-300`}
//                       placeholder="yourname@cloud.neduet.edu.pk"
//                     />
//                     {touched.captainEmail && !errors.captainEmail && formData.captainEmail && (
//                       <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
//                     )}
//                   </div>
//                   {touched.captainEmail && errors.captainEmail && (
//                     <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
//                       <AlertCircle className="w-3 h-3" />
//                       {errors.captainEmail}
//                     </p>
//                   )}
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-4">
//                   {/* Roll Number Field */}
//                   <div>
//                     <label className="block text-sm font-bold text-cyan-300 mb-2">Roll Number *</label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         value={formData.captainRollNo}
//                         onChange={(e) => handleFieldChange('captainRollNo', e.target.value)}
//                         onBlur={() => handleBlur('captainRollNo')}
//                         className={`w-full px-4 py-2 rounded-lg bg-slate-800/50 border ${
//                           touched.captainRollNo && errors.captainRollNo
//                             ? 'border-red-500 focus:border-red-400'
//                             : touched.captainRollNo && !errors.captainRollNo && formData.captainRollNo
//                             ? 'border-green-500 focus:border-green-400'
//                             : 'border-slate-700 focus:border-cyan-400'
//                         } text-white placeholder-gray-500 focus:outline-none transition-colors duration-300`}
//                         placeholder="SE-23086"
//                       />
//                       {touched.captainRollNo && !errors.captainRollNo && formData.captainRollNo && (
//                         <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
//                       )}
//                     </div>
//                     {touched.captainRollNo && errors.captainRollNo && (
//                       <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
//                         <AlertCircle className="w-3 h-3" />
//                         {errors.captainRollNo}
//                       </p>
//                     )}
//                   </div>

//                   {/* Phone Number Field */}
//                   <div>
//                     <label className="block text-sm font-bold text-cyan-300 mb-2">Phone Number *</label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         value={formData.captainPhone}
//                         onChange={(e) => handleFieldChange('captainPhone', e.target.value)}
//                         onBlur={() => handleBlur('captainPhone')}
//                         className={`w-full px-4 py-2 rounded-lg bg-slate-800/50 border ${
//                           touched.captainPhone && errors.captainPhone
//                             ? 'border-red-500 focus:border-red-400'
//                             : touched.captainPhone && !errors.captainPhone && formData.captainPhone
//                             ? 'border-green-500 focus:border-green-400'
//                             : 'border-slate-700 focus:border-cyan-400'
//                         } text-white placeholder-gray-500 focus:outline-none transition-colors duration-300`}
//                         placeholder="03XXXXXXXXX"
//                       />
//                       {touched.captainPhone && !errors.captainPhone && formData.captainPhone && (
//                         <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
//                       )}
//                     </div>
//                     {touched.captainPhone && errors.captainPhone && (
//                       <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
//                         <AlertCircle className="w-3 h-3" />
//                         {errors.captainPhone}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-4">
//                   {/* Section Field */}
//                   <div>
//                     <label className="block text-sm font-bold text-cyan-300 mb-2">Section *</label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         value={formData.section}
//                         onChange={(e) => handleSectionChange(e.target.value)}
//                         onBlur={() => handleBlur('section')}
//                         className={`w-full px-4 py-2 rounded-lg bg-slate-800/50 border ${
//                           touched.section && errors.section
//                             ? 'border-red-500 focus:border-red-400'
//                             : touched.section && !errors.section && formData.section
//                             ? 'border-green-500 focus:border-green-400'
//                             : 'border-slate-700 focus:border-cyan-400'
//                         } text-white placeholder-gray-500 focus:outline-none transition-colors duration-300`}
//                         placeholder="e.g., FESE-A or FESE-B"
//                       />
//                       {touched.section && !errors.section && formData.section && (
//                         <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
//                       )}
//                     </div>
//                     {touched.section && errors.section && (
//                       <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
//                         <AlertCircle className="w-3 h-3" />
//                         {errors.section}
//                       </p>
//                     )}
//                     <p className="mt-1 text-xs text-gray-500">
//                       Valid types: FESE, SESE, TESE, BESE (Section: A or B)
//                     </p>
//                   </div>

//                   {/* Team Name Field */}
//                   {sport.type !== 'solo' && (
//                     <div>
//                       <label className="block text-sm font-bold text-cyan-300 mb-2">Team Name *</label>
//                       <div className="relative">
//                         <input
//                           type="text"
//                           value={formData.teamName}
//                           onChange={(e) => handleFieldChange('teamName', e.target.value)}
//                           onBlur={() => handleBlur('teamName')}
//                           className={`w-full px-4 py-2 rounded-lg bg-slate-800/50 border ${
//                             touched.teamName && errors.teamName
//                               ? 'border-red-500 focus:border-red-400'
//                               : touched.teamName && !errors.teamName && formData.teamName
//                               ? 'border-green-500 focus:border-green-400'
//                               : 'border-slate-700 focus:border-cyan-400'
//                           } text-white placeholder-gray-500 focus:outline-none transition-colors duration-300`}
//                           placeholder="Enter team name"
//                         />
//                         {touched.teamName && !errors.teamName && formData.teamName && (
//                           <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
//                         )}
//                       </div>
//                       {touched.teamName && errors.teamName && (
//                         <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
//                           <AlertCircle className="w-3 h-3" />
//                           {errors.teamName}
//                         </p>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Team Members Section */}
//             {sport.type !== 'solo' && (
//               <div className="border-t border-slate-700 pt-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-bold text-magenta-300">
//                     {sport.type === 'doubles' ? 'Partner Details' : 'Team Members'}
//                   </h3>
//                   <span className={`text-sm px-3 py-1 rounded ${
//                     isTeamComplete() 
//                       ? 'bg-green-950/30 border border-green-500/30 text-green-300'
//                       : 'bg-slate-800 text-gray-400'
//                   }`}>
//                     {teamMembers.length} / {getRequiredMembersCount()} added
//                   </span>
//                 </div>

//                 {formData.section && (
//                   <div className="mb-4 p-3 rounded-lg bg-yellow-950/20 border border-yellow-500/30">
//                     <p className="text-sm text-yellow-300">
//                       <AlertCircle className="w-4 h-4 inline mr-1" />
//                       All members must be from section: <strong>{formData.section}</strong>
//                     </p>
//                   </div>
//                 )}

//                 {errors.teamMembers && (
//                   <div className="mb-4 p-3 rounded-lg bg-red-950/20 border border-red-500/30">
//                     <p className="text-sm text-red-300 flex items-center gap-2">
//                       <AlertCircle className="w-4 h-4" />
//                       {errors.teamMembers}
//                     </p>
//                   </div>
//                 )}

//                 <div className="space-y-3 mb-4">
//                   {teamMembers.map((member, index) => (
//                     <div key={index} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700">
//                       <div className="flex justify-between items-center mb-3">
//                         <span className="text-sm font-bold text-cyan-300">
//                           {sport.type === 'doubles' ? 'Partner' : `Member ${index + 1}`}
//                         </span>
//                         <button 
//                           type="button" 
//                           onClick={() => removeTeamMember(index)} 
//                           className="text-red-400 hover:text-red-300 transition-colors"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                       <div className="grid md:grid-cols-2 gap-3">
//                         {/* Member Name */}
//                         <div>
//                           <div className="relative">
//                             <input
//                               type="text"
//                               value={member.name}
//                               onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
//                               onBlur={() => handleTeamMemberBlur(index, 'name')}
//                               className={`w-full px-3 py-2 rounded-lg bg-slate-800/50 border ${
//                                 teamMemberTouched[index]?.name && teamMemberErrors[index]?.name
//                                   ? 'border-red-500 focus:border-red-400'
//                                   : teamMemberTouched[index]?.name && !teamMemberErrors[index]?.name && member.name
//                                   ? 'border-green-500 focus:border-green-400'
//                                   : 'border-slate-700 focus:border-cyan-400'
//                               } text-white placeholder-gray-500 focus:outline-none transition-colors duration-300`}
//                               placeholder="Member name"
//                             />
//                             {teamMemberTouched[index]?.name && !teamMemberErrors[index]?.name && member.name && (
//                               <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
//                             )}
//                           </div>
//                           {teamMemberTouched[index]?.name && teamMemberErrors[index]?.name && (
//                             <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
//                               <AlertCircle className="w-3 h-3" />
//                               {teamMemberErrors[index].name}
//                             </p>
//                           )}
//                         </div>

//                         {/* Member Roll No */}
//                         <div>
//                           <div className="relative">
//                             <input
//                               type="text"
//                               value={member.rollNo}
//                               onChange={(e) => updateTeamMember(index, 'rollNo', e.target.value)}
//                               onBlur={() => handleTeamMemberBlur(index, 'rollNo')}
//                               className={`w-full px-3 py-2 rounded-lg bg-slate-800/50 border ${
//                                 teamMemberTouched[index]?.rollNo && teamMemberErrors[index]?.rollNo
//                                   ? 'border-red-500 focus:border-red-400'
//                                   : teamMemberTouched[index]?.rollNo && !teamMemberErrors[index]?.rollNo && member.rollNo
//                                   ? 'border-green-500 focus:border-green-400'
//                                   : 'border-slate-700 focus:border-cyan-400'
//                               } text-white placeholder-gray-500 focus:outline-none transition-colors duration-300`}
//                               placeholder="SE-23086"
//                             />
//                             {teamMemberTouched[index]?.rollNo && !teamMemberErrors[index]?.rollNo && member.rollNo && (
//                               <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
//                             )}
//                           </div>
//                           {teamMemberTouched[index]?.rollNo && teamMemberErrors[index]?.rollNo && (
//                             <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
//                               <AlertCircle className="w-3 h-3" />
//                               {teamMemberErrors[index].rollNo}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {teamMembers.length < getRequiredMembersCount() && (
//                   <Button
//                     type="button"
//                     onClick={addTeamMember}
//                     variant="outline"
//                     className="w-full border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/10 bg-transparent"
//                   >
//                     <Plus className="w-4 h-4 mr-2" />
//                     Add {sport.type === 'doubles' ? 'Partner' : 'Team Member'}
//                     {sport.type === 'team' && ` (${getRequiredMembersCount() - teamMembers.length} remaining)`}
//                   </Button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer with Actions */}
//         <div className="sticky bottom-0 bg-slate-900 border-t border-slate-700 p-6">
//           <div className="flex gap-3">
//             <Button
//               onClick={onClose}
//               variant="outline"
//               className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-800 bg-transparent"
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleSubmit}
//               disabled={!isFormValid()}
//               className="flex-1 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-cyan-500 disabled:hover:to-magenta-500"
//             >
//               Complete Registration
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, Plus, Trash2, X, CheckCircle2 } from "lucide-react"
import toast from "react-hot-toast"

export interface Sport {
  id: string
  name: string
  icon: string
  type: 'solo' | 'doubles' | 'team'
  teamSize?: number
  maxSubstitutes?: number
  totalTeams?: number
  maxTeams?: number
  description: string
}

interface TeamMember {
  name: string
  rollNo: string
}

interface TeamMemberErrors {
  name?: string
  rollNo?: string
}

interface SportRegistrationModalProps {
  sport: Sport
  gender: 'male' | 'female'
  isOpen: boolean
  onClose: () => void
}

interface ValidationErrors {
  captainName?: string
  captainEmail?: string
  captainRollNo?: string
  section?: string
  teamName?: string
  teamMembers?: string
  captainPhone?: string
}

export default function SportRegistrationModal({ sport, gender, isOpen, onClose }: SportRegistrationModalProps) {
  const [formData, setFormData] = useState({
    captainName: "",
    captainEmail: "",
    captainRollNo: "",
    section: "",
    teamName: "",
    captainPhone: "",
  })
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [teamMemberErrors, setTeamMemberErrors] = useState<TeamMemberErrors[]>([])
  const [teamMemberTouched, setTeamMemberTouched] = useState<Array<{ name?: boolean; rollNo?: boolean }>>([])
  const [isDemoMode, setIsDemoMode] = useState(false);
  const demoTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Student types for section validation
  const studentTypes = ['FESE', 'SESE', 'TESE', 'BESE']

  // Reset form when modal opens with new sport
  useEffect(() => {
    if (isOpen) {
      resetForm()
    }
  }, [isOpen, sport.id])

  // Clear demo timeout when component unmounts or modal closes
  useEffect(() => {
    return () => {
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current)
      }
    }
  }, [])

  // Auto-clear demo data after 10 seconds
  useEffect(() => {
    if (isDemoMode) {
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current)
      }
      
      demoTimeoutRef.current = setTimeout(() => {
        setIsDemoMode(false)
        resetForm()
        toast.success('Demo data cleared')
      }, 8000)
    }
    
    return () => {
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current)
      }
    }
  }, [isDemoMode])

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case 'captainName':
        if (!value) return 'Name is required'
        if (value.length < 3) return 'Name must be at least 3 characters'
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name must contain letters only'
        return undefined

      case 'captainEmail':
        if (!value) return 'Email is required'
        const emailRegex = /^[a-zA-Z0-9._%+-]+@cloud\.neduet\.edu\.pk$/
        if (!emailRegex.test(value)) return 'Must be a valid @cloud.neduet.edu.pk email'
        return undefined

      case 'captainRollNo':
        if (!value) return 'Roll number is required'
        const rollNoRegex = /^SE-\d{5}$/
        if (!rollNoRegex.test(value)) return 'Must match format: SE-23086'
        return undefined

      case 'section':
        if (!value) return 'Section is required'
        const sectionRegex = /^(FESE|SESE|TESE|BESE)-[A-B]$/
        if (!sectionRegex.test(value)) return 'Must match format: FESE-A or FESE-B'
        return undefined

      case 'teamName':
        if (sport.type !== 'solo' && !value) return 'Team name is required'
        if (sport.type !== 'solo' && value.length < 3) return 'Team name must be at least 3 characters'
        return undefined

      case 'captainPhone':
        if (!value) return 'Phone number is required'
        const phoneRegex = /^03\d{9}$/
        if (!phoneRegex.test(value)) return 'Must be a valid phone number (e.g., 03XXXXXXXXX)'
        return undefined

      default:
        return undefined
    }
  }

  const validateTeamMemberField = (field: 'name' | 'rollNo', value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value) return 'Name is required'
        if (value.length < 3) return 'Name must be at least 3 characters'
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name must contain letters only'
        return undefined

      case 'rollNo':
        if (!value) return 'Roll number is required'
        const rollNoRegex = /^SE-\d{5}$/
        if (!rollNoRegex.test(value)) return 'Must match format: SE-23086'
        return undefined

      default:
        return undefined
    }
  }

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSectionChange = (value: string) => {
    // Auto-format section input
    const upperValue = value.toUpperCase()
    
    // If user types a dash, help them format correctly
    if (upperValue.includes('-')) {
      const parts = upperValue.split('-')
      if (parts.length === 2) {
        const studentType = parts[0]
        const section = parts[1]
        
        // Validate student type
        if (studentTypes.includes(studentType)) {
          // Only allow A or B for section
          if (section === '' || section === 'A' || section === 'B') {
            handleFieldChange('section', upperValue)
            return
          } else {
            // Replace invalid section with empty
            handleFieldChange('section', studentType + '-')
            return
          }
        }
      }
    }
    
    handleFieldChange('section', upperValue)
  }

  const handleEmailChange = (value: string) => {
    // Auto-complete @cloud.neduet.edu.pk when user types @
    if (value.includes('@') && !value.includes('@cloud.neduet.edu.pk')) {
      const parts = value.split('@')
      if (parts.length === 2 && parts[1] === '') {
        value = parts[0] + '@cloud.neduet.edu.pk'
      }
    }
    handleFieldChange('captainEmail', value)
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, formData[field as keyof typeof formData])
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }

  const handleTeamMemberBlur = (index: number, field: 'name' | 'rollNo') => {
    const newTouched = [...teamMemberTouched]
    if (!newTouched[index]) {
      newTouched[index] = {}
    }
    newTouched[index][field] = true
    setTeamMemberTouched(newTouched)

    const value = teamMembers[index][field]
    const error = validateTeamMemberField(field, value)
    
    const newErrors = [...teamMemberErrors]
    if (!newErrors[index]) {
      newErrors[index] = {}
    }
    newErrors[index][field] = error
    setTeamMemberErrors(newErrors)
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    // Validate all captain fields
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData])
      if (error) {
        newErrors[field as keyof ValidationErrors] = error
      }
    })

    // Validate team members
    if (sport.type !== 'solo') {
      if (teamMembers.length < getRequiredMembersCount()) {
        newErrors.teamMembers = `Please add all ${sport.type === 'doubles' ? 'partner' : 'team members'} (${teamMembers.length}/${getRequiredMembersCount()} added)`
      } else {
        // Check each team member
        const memberErrors: TeamMemberErrors[] = []
        let hasError = false

        teamMembers.forEach((member, index) => {
          const nameError = validateTeamMemberField('name', member.name)
          const rollNoError = validateTeamMemberField('rollNo', member.rollNo)
          
          memberErrors[index] = {
            name: nameError,
            rollNo: rollNoError
          }

          if (nameError || rollNoError) {
            hasError = true
          }
        })

        setTeamMemberErrors(memberErrors)

        if (hasError) {
          newErrors.teamMembers = 'Please fix all team member errors'
        }
      }
    }

    setErrors(newErrors)
    setTouched({
      captainName: true,
      captainEmail: true,
      captainRollNo: true,
      section: true,
      teamName: true,
      captainPhone: true,
    })

    // Mark all team members as touched
    if (sport.type !== 'solo') {
      const allTouched = teamMembers.map(() => ({ name: true, rollNo: true }))
      setTeamMemberTouched(allTouched)
    }

    // Show first error as toast
    const firstError = Object.values(newErrors)[0]
    if (firstError) {
      toast.error(firstError)
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    const loadingToast = toast.loading('Registering...')

    try {
      const submissionData = {
        sportName: sport.name,
        sportType: sport.type,
        gender: gender,
        section: formData.section,
        teamName: formData.teamName || undefined,
        captain: {
          name: formData.captainName,
          email: formData.captainEmail,
          rollNo: formData.captainRollNo,
          phone: formData.captainPhone,
        },
        teamMembers: sport.type !== 'solo' ? teamMembers : undefined,
      }

      console.log("Submitting registration:", submissionData)

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const data = await response.json()

      toast.dismiss(loadingToast)

      if (!response.ok) {
        toast.error(data.error || 'Registration failed')
        console.error('Registration error:', data)
        return
      }

      console.log('Registration successful:', data)
      toast.success('Registration successful! 🎉')
      
      // Reset form and close modal
      resetForm()
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (error) {
      toast.dismiss(loadingToast)
      console.error('Request error:', error)
      toast.error('An unexpected error occurred')
    }
  }

  const addTeamMember = () => {
    const maxMembers = sport.type === 'doubles' 
      ? 1 
      : (sport.teamSize || 0) - 1

    if (teamMembers.length < maxMembers) {
      setTeamMembers([...teamMembers, { name: "", rollNo: "" }])
      setTeamMemberErrors([...teamMemberErrors, {}])
      setTeamMemberTouched([...teamMemberTouched, {}])
      
      // Clear team members error when adding
      if (errors.teamMembers) {
        setErrors(prev => ({ ...prev, teamMembers: undefined }))
      }
    }
  }

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index))
    setTeamMemberErrors(teamMemberErrors.filter((_, i) => i !== index))
    setTeamMemberTouched(teamMemberTouched.filter((_, i) => i !== index))
  }

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...teamMembers]
    updated[index][field] = value
    setTeamMembers(updated)

    // Clear error when user starts typing
    if (teamMemberErrors[index]?.[field]) {
      const newErrors = [...teamMemberErrors]
      if (newErrors[index]) {
        newErrors[index][field] = undefined
      }
      setTeamMemberErrors(newErrors)
    }
  }

  const loadDemoData = () => {
    setIsDemoMode(!isDemoMode)
    
    if (!isDemoMode) {
      setFormData({
        captainName: "Enayat Ur Rehman",
        captainEmail: "rehman4603321@cloud.neduet.edu.pk",
        captainRollNo: "SE-23086",
        section: "TESE-B",
        teamName: sport.type !== 'solo' ? "Demo Team" : "",
        captainPhone: "03XXXXXXXXX",
      })

      if (sport.type === 'doubles') {
        setTeamMembers([{ name: "Partner Name", rollNo: "SE-23087" }])
      } else if (sport.type === 'team') {
        const demoMembers: TeamMember[] = []
        const requiredCount = getRequiredMembersCount()
        for (let i = 0; i < requiredCount; i++) {
          demoMembers.push({
            name: `Team Member ${i + 1}`,
            rollNo: `SE-${23087 + i}`
          })
        }
        setTeamMembers(demoMembers)
      }
      
      toast.success('Demo data loaded (will clear in 8 seconds)')
    } else {
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current)
      }
      resetForm()
    }
  }

  const resetForm = () => {
    setFormData({
      captainName: "",
      captainEmail: "",
      captainRollNo: "",
      section: "",
      teamName: "",
      captainPhone: "",
    })
    setTeamMembers([])
    setErrors({})
    setTouched({})
    setTeamMemberErrors([])
    setTeamMemberTouched([])
    setIsDemoMode(false)
  }

  const getRequiredMembersCount = () => {
    if (sport.type === 'solo') return 0
    if (sport.type === 'doubles') return 1
    return (sport.teamSize || 0) - 1
  }

  const isTeamComplete = () => {
    if (sport.type === 'solo') return true
    return teamMembers.length === getRequiredMembersCount()
  }

  const isFormValid = () => {
    // Check all required fields are filled and valid
    const allFieldsValid = Object.keys(formData).every(field => {
      const error = validateField(field, formData[field as keyof typeof formData])
      return !error
    })

    if (!allFieldsValid) return false

    // Check team completion
    if (sport.type !== 'solo') {
      if (!isTeamComplete()) return false
      
      // Check all team members are valid
      const allMembersValid = teamMembers.every(member => {
        const nameError = validateTeamMemberField('name', member.name)
        const rollNoError = validateTeamMemberField('rollNo', member.rollNo)
        return !nameError && !rollNoError
      })
      
      if (!allMembersValid) return false
    }

    return true
  }

  const getSportTypeBadge = () => {
    const badges = {
      solo: { label: "SOLO", color: "bg-blue-500/20 text-blue-400 border-blue-400/50" },
      doubles: { label: "DOUBLES", color: "bg-purple-500/20 text-purple-400 border-purple-400/50" },
      team: { label: "TEAM", color: "bg-green-500/20 text-green-400 border-green-400/50" }
    }
    return badges[sport.type]
  }

  if (!isOpen) return null

  const badge = getSportTypeBadge()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-lg border border-cyan-500/30 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-900 border-b border-slate-700 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-5xl">{sport.icon}</span>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-cyan-400">{sport.name}</h2>
                <span className={`text-xs font-bold px-2 py-1 rounded border ${badge.color}`}>
                  {badge.label}
                </span>
              </div>
              <p className="text-gray-400">{sport.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Important Notice */}
          <div className="mb-4 flex justify-end">
            <button 
              type="button" 
              onClick={loadDemoData} 
              className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {isDemoMode ? "Clear Demo" : "Load Demo"}
            </button>
          </div>
          {sport.type !== 'solo' && (
            <div className="mb-6 p-4 rounded-lg border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-sm">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-sm text-gray-300">
                  <p className="font-bold text-cyan-300">Important Registration Guidelines:</p>
                  <ul className="list-disc list-inside space-y-0.5 ml-2 text-xs">
                    <li>Only the team captain should fill this registration</li>
                    <li>All team members must be from the same section</li>
                    <li>No inter-section teams allowed</li>
                    <li>Provide complete details of all team members</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Captain/Player Details */}
            <div>
              <h3 className="text-lg font-bold text-magenta-300 mb-4">
                {sport.type === 'solo' ? 'Player Details' : 'Captain Details'}
              </h3>

              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-bold text-cyan-300 mb-2">
                    {sport.type === 'solo' ? 'Full Name' : 'Captain Name'} *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.captainName}
                      onChange={(e) => handleFieldChange('captainName', e.target.value)}
                      onBlur={() => handleBlur('captainName')}
                      className={`w-full px-4 py-2 rounded-lg bg-slate-800/50 border ${
                        touched.captainName && errors.captainName
                          ? 'border-red-500 focus:border-red-400'
                          : touched.captainName && !errors.captainName && formData.captainName
                          ? 'border-green-500 focus:border-green-400'
                          : 'border-slate-700 focus:border-cyan-400'
                      } text-white placeholder-gray-500 focus:outline-none transition-colors duration-300`}
                      placeholder="Enter full name"
                    />
                    {touched.captainName && !errors.captainName && formData.captainName && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {touched.captainName && errors.captainName && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.captainName}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-bold text-cyan-300 mb-2">Email Address *</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.captainEmail}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      onBlur={() => handleBlur('captainEmail')}
                      className={`w-full px-4 py-2 rounded-lg bg-slate-800/50 border ${
                        touched.captainEmail && errors.captainEmail
                          ? 'border-red-500 focus:border-red-400'
                          : touched.captainEmail && !errors.captainEmail && formData.captainEmail
                          ? 'border-green-500 focus:border-green-400'
                          : 'border-slate-700 focus:border-cyan-400'
                      } text-white placeholder-gray-500 focus:outline-none transition-colors duration-300`}
                      placeholder="yourname@cloud.neduet.edu.pk"
                    />
                    {touched.captainEmail && !errors.captainEmail && formData.captainEmail && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {touched.captainEmail && errors.captainEmail && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.captainEmail}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Roll Number Field */}
                  <div>
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Roll Number *</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.captainRollNo}
                        onChange={(e) => handleFieldChange('captainRollNo', e.target.value)}
                        onBlur={() => handleBlur('captainRollNo')}
                        className={`w-full px-4 py-2 rounded-lg bg-slate-800/50 border ${
                          touched.captainRollNo && errors.captainRollNo
                            ? 'border-red-500 focus:border-red-400'
                            : touched.captainRollNo && !errors.captainRollNo && formData.captainRollNo
                            ? 'border-green-500 focus:border-green-400'
                            : 'border-slate-700 focus:border-cyan-400'
                        } text-white placeholder-gray-500 focus:outline-none transition-colors duration-300`}
                        placeholder="SE-23086"
                      />
                      {touched.captainRollNo && !errors.captainRollNo && formData.captainRollNo && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {touched.captainRollNo && errors.captainRollNo && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.captainRollNo}
                      </p>
                    )}
                  </div>

                  {/* Phone Number Field */}
                  <div>
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Phone Number *</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.captainPhone}
                        onChange={(e) => handleFieldChange('captainPhone', e.target.value)}
                        onBlur={() => handleBlur('captainPhone')}
                        className={`w-full px-4 py-2 rounded-lg bg-slate-800/50 border ${
                          touched.captainPhone && errors.captainPhone
                            ? 'border-red-500 focus:border-red-400'
                            : touched.captainPhone && !errors.captainPhone && formData.captainPhone
                            ? 'border-green-500 focus:border-green-400'
                            : 'border-slate-700 focus:border-cyan-400'
                        } text-white placeholder-gray-500 focus:outline-none transition-colors duration-300`}
                        placeholder="03XXXXXXXXX"
                      />
                      {touched.captainPhone && !errors.captainPhone && formData.captainPhone && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {touched.captainPhone && errors.captainPhone && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.captainPhone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Section Field */}
                  <div>
                    <label className="block text-sm font-bold text-cyan-300 mb-2">Section *</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.section}
                        onChange={(e) => handleSectionChange(e.target.value)}
                        onBlur={() => handleBlur('section')}
                        className={`w-full px-4 py-2 rounded-lg bg-slate-800/50 border ${
                          touched.section && errors.section
                            ? 'border-red-500 focus:border-red-400'
                            : touched.section && !errors.section && formData.section
                            ? 'border-green-500 focus:border-green-400'
                            : 'border-slate-700 focus:border-cyan-400'
                        } text-white placeholder-gray-500 focus:outline-none transition-colors duration-300`}
                        placeholder="e.g., FESE-A or FESE-B"
                      />
                      {touched.section && !errors.section && formData.section && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {touched.section && errors.section && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.section}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Valid types: FESE, SESE, TESE, BESE (Section: A or B)
                    </p>
                  </div>

                  {/* Team Name Field */}
                  {sport.type !== 'solo' && (
                    <div>
                      <label className="block text-sm font-bold text-cyan-300 mb-2">Team Name *</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.teamName}
                          onChange={(e) => handleFieldChange('teamName', e.target.value)}
                          onBlur={() => handleBlur('teamName')}
                          className={`w-full px-4 py-2 rounded-lg bg-slate-800/50 border ${
                            touched.teamName && errors.teamName
                              ? 'border-red-500 focus:border-red-400'
                              : touched.teamName && !errors.teamName && formData.teamName
                              ? 'border-green-500 focus:border-green-400'
                              : 'border-slate-700 focus:border-cyan-400'
                          } text-white placeholder-gray-500 focus:outline-none transition-colors duration-300`}
                          placeholder="Enter team name"
                        />
                        {touched.teamName && !errors.teamName && formData.teamName && (
                          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                      </div>
                      {touched.teamName && errors.teamName && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.teamName}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Team Members Section */}
            {sport.type !== 'solo' && (
              <div className="border-t border-slate-700 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-magenta-300">
                    {sport.type === 'doubles' ? 'Partner Details' : 'Team Members'}
                  </h3>
                  <span className={`text-sm px-3 py-1 rounded ${
                    isTeamComplete() 
                      ? 'bg-green-950/30 border border-green-500/30 text-green-300'
                      : 'bg-slate-800 text-gray-400'
                  }`}>
                    {teamMembers.length} / {getRequiredMembersCount()} added
                  </span>
                </div>

                {formData.section && (
                  <div className="mb-4 p-3 rounded-lg bg-yellow-950/20 border border-yellow-500/30">
                    <p className="text-sm text-yellow-300">
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      All members must be from section: <strong>{formData.section}</strong>
                    </p>
                  </div>
                )}

                {errors.teamMembers && (
                  <div className="mb-4 p-3 rounded-lg bg-red-950/20 border border-red-500/30">
                    <p className="text-sm text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.teamMembers}
                    </p>
                  </div>
                )}

                <div className="space-y-3 mb-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-bold text-cyan-300">
                          {sport.type === 'doubles' ? 'Partner' : `Member ${index + 1}`}
                        </span>
                        <button 
                          type="button" 
                          onClick={() => removeTeamMember(index)} 
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {/* Member Name */}
                        <div>
                          <div className="relative">
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                              onBlur={() => handleTeamMemberBlur(index, 'name')}
                              className={`w-full px-3 py-2 rounded-lg bg-slate-800/50 border ${
                                teamMemberTouched[index]?.name && teamMemberErrors[index]?.name
                                  ? 'border-red-500 focus:border-red-400'
                                  : teamMemberTouched[index]?.name && !teamMemberErrors[index]?.name && member.name
                                  ? 'border-green-500 focus:border-green-400'
                                  : 'border-slate-700 focus:border-cyan-400'
                              } text-white placeholder-gray-500 focus:outline-none transition-colors duration-300`}
                              placeholder="Member name"
                            />
                            {teamMemberTouched[index]?.name && !teamMemberErrors[index]?.name && member.name && (
                              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                            )}
                          </div>
                          {teamMemberTouched[index]?.name && teamMemberErrors[index]?.name && (
                            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {teamMemberErrors[index].name}
                            </p>
                          )}
                        </div>

                        {/* Member Roll No */}
                        <div>
                          <div className="relative">
                            <input
                              type="text"
                              value={member.rollNo}
                              onChange={(e) => updateTeamMember(index, 'rollNo', e.target.value)}
                              onBlur={() => handleTeamMemberBlur(index, 'rollNo')}
                              className={`w-full px-3 py-2 rounded-lg bg-slate-800/50 border ${
                                teamMemberTouched[index]?.rollNo && teamMemberErrors[index]?.rollNo
                                  ? 'border-red-500 focus:border-red-400'
                                  : teamMemberTouched[index]?.rollNo && !teamMemberErrors[index]?.rollNo && member.rollNo
                                  ? 'border-green-500 focus:border-green-400'
                                  : 'border-slate-700 focus:border-cyan-400'
                              } text-white placeholder-gray-500 focus:outline-none transition-colors duration-300`}
                              placeholder="SE-23086"
                            />
                            {teamMemberTouched[index]?.rollNo && !teamMemberErrors[index]?.rollNo && member.rollNo && (
                              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                            )}
                          </div>
                          {teamMemberTouched[index]?.rollNo && teamMemberErrors[index]?.rollNo && (
                            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {teamMemberErrors[index].rollNo}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {teamMembers.length < getRequiredMembersCount() && (
                  <Button
                    type="button"
                    onClick={addTeamMember}
                    variant="outline"
                    className="w-full border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/10 bg-transparent"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add {sport.type === 'doubles' ? 'Partner' : 'Team Member'}
                    {sport.type === 'team' && ` (${getRequiredMembersCount() - teamMembers.length} remaining)`}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer with Actions */}
        <div className="sticky bottom-0 bg-slate-900 border-t border-slate-700 p-6">
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-800 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-cyan-500 disabled:hover:to-magenta-500"
            >
              Complete Registration
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
