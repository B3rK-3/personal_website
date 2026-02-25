import { createFileRoute } from '@tanstack/react-router'
import { Github, Linkedin, Mail, MapPin, Terminal } from 'lucide-react'
import resumeData from '../data/resume.json'

// Strict format interface for the resume data
interface ResumeData {
  personalInfo: {
    name: string
    title: string
    location: string
    email: string
    phone: string
    github: string
    linkedin: string
    website: string
  }
  navLinks: {
    resumePdf: string
  }
  education: Array<{
    institution: string
    college: string
    degree: string
    startDate: string
    endDate: string
    gpa: string
    courses: Array<string>
  }>
  experience: Array<{
    role: string
    company: string
    companyType: string
    location: string
    startDate: string
    endDate: string
    highlights: Array<string>
  }>
  projects: Array<{
    name: string
    techStack: Array<string>
    description: string
  }>
  skills: {
    languages: Array<string>
    machineLearning: Array<string>
    systemsTools: Array<string>
  }
  awardsAndLeadership: Array<{
    title: string
    description: string
  }>
}

const data = resumeData as ResumeData

export const Route = createFileRoute('/')({
  component: Portfolio,
})

function Portfolio() {
  const {
    personalInfo,
    education,
    experience,
    projects,
    skills,
    awardsAndLeadership,
    navLinks,
  } = data

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono selection:bg-green-900 selection:text-green-100">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
        {/* Header Section */}
        <header className="border-b border-white pb-4 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1
                className="text-4xl font-bold mb-2 glitch-text cursor-default"
                data-text={personalInfo.name.toUpperCase()}
              >
                {personalInfo.name.toUpperCase()}
              </h1>
              <p className="text-gray-400">{personalInfo.title}</p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <MapPin size={16} /> {personalInfo.location}
              </p>
              <div className="flex gap-4 mt-1">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  title="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-white transition-colors"
                  title="Email"
                >
                  <Mail size={20} />
                </a>
                <a
                  href="/secret-location"
                  className="hover:text-white transition-colors"
                  title="Terminal"
                >
                  <Terminal size={20} />
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation / Actions */}
        <div className="flex gap-4 mb-8 text-sm">
          <a
            href={navLinks.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors"
          >
            [ VIEW ORIGINAL PDF ]
          </a>
          <a
            href="/portfolio"
            className="border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors"
          >
            [ VIEW SPATIAL GUI ]
          </a>
        </div>

        {/* Experience Section */}
        <section>
          <h2 className="text-xl font-bold border-b border-gray-700 mb-4 pb-1 text-green-500">
            &gt; WORK EXPERIENCE
          </h2>
          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <div key={idx} className="group">
                <div className="flex flex-col sm:flex-row justify-between mb-2">
                  <h3 className="font-bold text-white 3s-hover:text-green-400 transition-colors text-lg">
                    {exp.role} @ {exp.company}
                  </h3>
                  <span className="text-gray-400 whitespace-nowrap">
                    [ {exp.startDate.toUpperCase()} -{' '}
                    {exp.endDate.toUpperCase()} ]
                  </span>
                </div>
                <p className="text-gray-400 mb-3 text-base italic">
                  {exp.companyType} — {exp.location}
                </p>
                <ul className="list-disc list-outside text-gray-400 space-y-2 ml-4 leading-relaxed">
                  {exp.highlights.map((point, pIdx) => (
                    <li key={pIdx}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h2 className="text-xl font-bold border-b border-gray-700 mb-4 pb-1 text-green-500">
            &gt; EDUCATION
          </h2>
          <div className="space-y-6">
            {education.map((edu, idx) => (
              <div key={idx}>
                <div className="flex flex-col sm:flex-row justify-between mb-2">
                  <h3 className="font-bold">{edu.institution}</h3>
                  <span className="text-gray-400 text-sm">
                    [ {edu.startDate.toUpperCase()} -{' '}
                    {edu.endDate.toUpperCase()} ]
                  </span>
                </div>
                <p className="text-gray-300">
                  {edu.college} | {edu.degree}
                </p>
                <p className="text-gray-400 text-[15px] mt-1">GPA: {edu.gpa}</p>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  <span className="text-gray-400">Relevant Courses:</span>{' '}
                  {edu.courses.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <h2 className="text-xl font-bold border-b border-gray-700 mb-4 pb-1 text-green-500">
            &gt; PROJECTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="border border-gray-800 p-5 hover:border-green-500 transition-all hover:bg-zinc-900/30 group"
              >
                <h3 className="font-bold mb-3 text-white group-hover:text-green-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[12px] px-2 py-0.5 border border-emerald-900 text-gray-400 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h2 className="text-xl font-bold border-b border-gray-700 mb-4 pb-1 text-green-500">
            &gt; SKILLS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-bold mb-3 text-gray-300 border-l-2 border-green-900 pl-2">
                Languages
              </h3>
              <p className="text-gray-400 leading-relaxed uppercase tracking-wider text-xs">
                {skills.languages.join(', ')}
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-gray-300 border-l-2 border-green-900 pl-2">
                Machine Learning
              </h3>
              <p className="text-gray-400 leading-relaxed uppercase tracking-wider text-xs">
                {skills.machineLearning.join(', ')}
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-gray-300 border-l-2 border-green-900 pl-2">
                Systems & Tools
              </h3>
              <p className="text-gray-400 leading-relaxed uppercase tracking-wider text-xs">
                {skills.systemsTools.join(', ')}
              </p>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section>
          <h2 className="text-xl font-bold border-b border-gray-700 mb-4 pb-1 text-green-500">
            &gt; AWARDS & LEADERSHIP
          </h2>
          <ul className="space-y-4">
            {awardsAndLeadership.map((item, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-green-800 text-sm mt-0.5">
                  0{idx + 1}
                </span>
                <div>
                  <span className="font-bold text-gray-300">{item.title}:</span>{' '}
                  <span className="text-gray-400 text-sm">
                    {item.description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-900 text-center">
          <p className="text-[10px] text-gray-700 tracking-[0.5em] uppercase">
            End of Transmission
          </p>
        </footer>
      </div>
    </div>
  )
}
