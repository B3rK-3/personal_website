import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { r as resumeData } from "./resume-DYukLGdF.mjs";
import { M as MapPin, L as Linkedin, G as Github, a as Mail, T as Terminal } from "../_libs/lucide-react.mjs";
const data = resumeData;
function Portfolio() {
  const {
    personalInfo,
    education,
    experience,
    projects,
    skills,
    awardsAndLeadership,
    navLinks
  } = data;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-black text-white p-8 font-mono selection:bg-green-900 selection:text-green-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-white pb-4 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-end gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-2 glitch-text cursor-default", "data-text": personalInfo.name.toUpperCase(), children: personalInfo.name.toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400", children: personalInfo.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start md:items-end gap-2 text-sm text-gray-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16 }),
          " ",
          personalInfo.location
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: personalInfo.linkedin, target: "_blank", rel: "noopener noreferrer", className: "hover:text-white transition-colors", title: "LinkedIn", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { size: 20 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: personalInfo.github, target: "_blank", rel: "noopener noreferrer", className: "hover:text-white transition-colors", title: "GitHub", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { size: 20 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${personalInfo.email}`, className: "hover:text-white transition-colors", title: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 20 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/secret-location", className: "hover:text-white transition-colors", title: "Terminal", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { size: 20 }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mb-8 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: navLinks.resumePdf, target: "_blank", rel: "noopener noreferrer", className: "border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors", children: "[ VIEW ORIGINAL PDF ]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/portfolio", className: "border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors", children: "[ VIEW SPATIAL GUI ]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold border-b border-gray-700 mb-4 pb-1 text-green-500", children: "> WORK EXPERIENCE" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: experience.map((exp, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-white 3s-hover:text-green-400 transition-colors text-lg", children: [
            exp.role,
            " @ ",
            exp.company
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-400 whitespace-nowrap", children: [
            "[ ",
            exp.startDate.toUpperCase(),
            " -",
            " ",
            exp.endDate.toUpperCase(),
            " ]"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 mb-3 text-base italic", children: [
          exp.companyType,
          " — ",
          exp.location
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc list-outside text-gray-400 space-y-2 ml-4 leading-relaxed", children: exp.highlights.map((point, pIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: point }, pIdx)) })
      ] }, idx)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold border-b border-gray-700 mb-4 pb-1 text-green-500", children: "> EDUCATION" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: education.map((edu, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: edu.institution }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-400 text-sm", children: [
            "[ ",
            edu.startDate.toUpperCase(),
            " -",
            " ",
            edu.endDate.toUpperCase(),
            " ]"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-300", children: [
          edu.college,
          " | ",
          edu.degree
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 text-[15px] mt-1", children: [
          "GPA: ",
          edu.gpa
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 mt-2 leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "Relevant Courses:" }),
          " ",
          edu.courses.join(", ")
        ] })
      ] }, idx)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold border-b border-gray-700 mb-4 pb-1 text-green-500", children: "> PROJECTS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: projects.map((project, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-gray-800 p-5 hover:border-green-500 transition-all hover:bg-zinc-900/30 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-3 text-white group-hover:text-green-400 transition-colors", children: project.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 mb-4 leading-relaxed", children: project.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: project.techStack.map((tech, tIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] px-2 py-0.5 border border-emerald-900 text-gray-400 rounded", children: tech }, tIdx)) })
      ] }, idx)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold border-b border-gray-700 mb-4 pb-1 text-green-500", children: "> SKILLS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-3 text-gray-300 border-l-2 border-green-900 pl-2", children: "Languages" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 leading-relaxed uppercase tracking-wider text-xs", children: skills.languages.join(", ") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-3 text-gray-300 border-l-2 border-green-900 pl-2", children: "Machine Learning" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 leading-relaxed uppercase tracking-wider text-xs", children: skills.machineLearning.join(", ") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-3 text-gray-300 border-l-2 border-green-900 pl-2", children: "Systems & Tools" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 leading-relaxed uppercase tracking-wider text-xs", children: skills.systemsTools.join(", ") })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold border-b border-gray-700 mb-4 pb-1 text-green-500", children: "> AWARDS & LEADERSHIP" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: awardsAndLeadership.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-800 text-sm mt-0.5", children: [
          "0",
          idx + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-gray-300", children: [
            item.title,
            ":"
          ] }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 text-sm", children: item.description })
        ] })
      ] }, idx)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-20 pt-8 border-t border-gray-900 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gray-700 tracking-[0.5em] uppercase", children: "End of Transmission" }) })
  ] }) });
}
export {
  Portfolio as component
};
