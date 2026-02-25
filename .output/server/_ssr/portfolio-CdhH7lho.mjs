import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { r as resumeData } from "./resume-D4OLojd1.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const data = resumeData;
const NAV_ITEMS = [
  "Home",
  "Experience",
  "Projects",
  "Research",
  "Terminal"
];
const ITEM_HEIGHT = 80;
const NAV_GUTTER_HALF = ITEM_HEIGHT / 2;
const SNAP_SPRING = { type: "spring", stiffness: 180, damping: 28 };
const wrapIndex = (idx, length) => (idx % length + length) % length;
function SpatialGUI() {
  const [activeIndex, setActiveIndex] = reactExports.useState(0);
  const scrollLock = reactExports.useRef(false);
  const navigate = reactExports.useCallback((dir) => {
    if (scrollLock.current) return;
    setActiveIndex((prev) => {
      const next = prev + dir;
      scrollLock.current = true;
      setTimeout(() => scrollLock.current = false, 600);
      return next;
    });
  }, []);
  const goToAbsolute = reactExports.useCallback((idx) => {
    if (scrollLock.current) return;
    scrollLock.current = true;
    setTimeout(() => scrollLock.current = false, 600);
    setActiveIndex(idx);
  }, []);
  reactExports.useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      if (e.deltaY === 0) return;
      navigate(e.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [navigate]);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "j") navigate(1);
      if (e.key === "ArrowUp" || e.key === "k") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);
  const trueIndex = wrapIndex(activeIndex, NAV_ITEMS.length);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen w-screen bg-black text-white overflow-hidde2.5%lative font-mono", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "absolute top-[2.5%] right-12 z-50 text-right pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-[0.25em] uppercase text-white", children: data.personalInfo.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-zinc-600 tracking-[0.4em] mt-1 uppercase", children: data.personalInfo.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 right-12 z-50 flex gap-6 text-[14px] text-zinc-600 tracking-widest uppercase pointer-events-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: data.personalInfo.github,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "hover:text-white transition-colors duration-300",
          children: "Github"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: data.personalInfo.linkedin,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "hover:text-white transition-colors duration-300",
          children: "LinkedIn"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `mailto:${data.personalInfo.email}`,
          className: "hover:text-white transition-colors duration-300",
          children: "Email"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/portfolio",
          className: "hover:text-white transition-colors duration-300",
          children: "Portfolio"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 left-12 z-50 text-[14px] text-zinc-600 tracking-widest uppercase pointer-events-none font-mono", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: String(trueIndex + 1).padStart(2, "0") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1", children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: String(NAV_ITEMS.length).padStart(2, "0") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[30%_10%_60%] h-full w-full relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationWheel, { activeIndex, onSelect: goToAbsolute }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GeometricGutter, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContentStage, { activeIndex })
    ] })
  ] });
}
function NavigationWheel({
  activeIndex,
  onSelect
}) {
  const windowRange = Array.from({ length: 7 }, (_, k) => activeIndex - 3 + k);
  const opacityWithDist = [1, 0.85, 0.65, 0.4, 0.2];
  const scaleWithDist = [1, 0.85, 0.6, 0.5, 0.2];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full w-full flex flex-col items-end justify-center overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute pointer-events-none border-t border-b border-white z-20",
        style: {
          top: `calc(50% - ${NAV_GUTTER_HALF}px)`,
          height: ITEM_HEIGHT,
          width: `calc(80%)`
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-1/2 left-10 w-full",
        style: { transform: "translateY(-50%)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "relative w-full",
            animate: { y: -activeIndex * ITEM_HEIGHT - ITEM_HEIGHT / 2 },
            transition: SNAP_SPRING,
            children: windowRange.map((absIdx) => {
              const wrappedIdx = wrapIndex(absIdx, NAV_ITEMS.length);
              const item = NAV_ITEMS[wrappedIdx];
              const dist = Math.abs(absIdx - activeIndex);
              const isActive = dist === 0;
              const opacity = opacityWithDist[dist];
              const scale = scaleWithDist[dist];
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "absolute w-full flex items-center justify-center cursor-pointer",
                  style: { top: absIdx * ITEM_HEIGHT, height: ITEM_HEIGHT },
                  initial: { scale: 0, opacity: 0 },
                  animate: { opacity, scale },
                  transition: SNAP_SPRING,
                  onClick: () => onSelect(absIdx),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-[2vw] uppercase tracking-[0.3em] font-black transition-colors duration-150 ${isActive ? "text-white" : "text-zinc-600"}`,
                      children: item
                    }
                  )
                },
                absIdx
              );
            })
          }
        )
      }
    )
  ] });
}
function GeometricGutter() {
  const svgRef = reactExports.useRef(null);
  const [height, setHeight] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!svgRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      setHeight(rect.height);
    });
    observer.observe(svgRef.current);
    return () => observer.disconnect();
  }, []);
  const center = height / 2;
  const topY = center - NAV_GUTTER_HALF;
  const bottomY = center + NAV_GUTTER_HALF;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-full w-full z-20 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      ref: svgRef,
      className: "absolute top-0 left-0 w-full h-full",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "0",
            y1: topY,
            x2: "100%",
            y2: height * 0.1,
            stroke: "white",
            strokeWidth: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "0",
            y1: bottomY,
            x2: "100%",
            y2: height * 0.9,
            stroke: "white",
            strokeWidth: "1"
          }
        )
      ]
    }
  ) });
}
function ContentStage({ activeIndex }) {
  const windowRange = Array.from({ length: 7 }, (_, k) => activeIndex - 3 + k);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-full w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute left-0 w-[94%] border-t border-b border-white overflow-hidden",
      style: { top: "10%", height: "80%" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "relative w-full h-full",
          animate: { y: `${-activeIndex * 100}%` },
          transition: SNAP_SPRING,
          children: windowRange.map((absIdx) => {
            const wrappedIdx = wrapIndex(absIdx, NAV_ITEMS.length);
            const item = NAV_ITEMS[wrappedIdx];
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute left-0 w-full pl-12 mr-12 pb-12 flex items-center",
                style: { top: `${absIdx * 100}%`, height: "100%" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full overflow-y-auto max-h-full scrollbar-hide pr-4 pt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionContent, { section: item }) })
              },
              absIdx
            );
          })
        }
      )
    }
  ) });
}
function SectionContent({ section }) {
  switch (section) {
    case "Home":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(HomeContent, {});
    case "Experience":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ExperienceContent, {});
    case "Projects":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectsContent, {});
    case "Research":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ResearchContent, {});
    case "Terminal":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TerminalContent, {});
    default:
      return null;
  }
}
function HomeContent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-6xl font-black uppercase tracking-tight leading-none", children: [
      "Software ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-600", children: "Engineer" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-md leading-relaxed max-w-xl", children: data.personalInfo.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-[12px] tracking-widest uppercase text-zinc-600 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "border border-zinc-800 px-3 py-1", children: data.personalInfo.location }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "border border-zinc-800 px-3 py-1", children: data.education[0]?.institution })
    ] })
  ] });
}
function ExperienceContent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: data.experience.map((exp, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white uppercase tracking-wide", children: exp.role }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[13px] text-zinc-600 tracking-wider whitespace-nowrap ml-4", children: [
        exp.startDate,
        " — ",
        exp.endDate
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[13px] text-zinc-600 mb-2 tracking-wider", children: [
      exp.company,
      " · ",
      exp.location
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: exp.highlights.map((h, hIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "li",
      {
        className: "text-zinc-500 text-[14px] leading-relaxed pl-3 border-l border-zinc-800",
        children: h
      },
      hIdx
    )) })
  ] }, idx)) });
}
function ProjectsContent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: data.projects.map((proj, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-l border-zinc-800 pl-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white uppercase tracking-wide mb-1", children: proj.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-[14px] leading-relaxed mb-2", children: proj.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: proj.techStack.map((tech, tIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "text-[11px] px-2 py-0.5 border border-zinc-800 text-zinc-600 uppercase tracking-wider",
        children: tech
      },
      tIdx
    )) })
  ] }, idx)) });
}
function ResearchContent() {
  const researchExp = data.experience.find(
    (e) => e.companyType === "Research"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold uppercase tracking-wide", children: "Academic Research" }),
    researchExp && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-l border-zinc-800 pl-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[13px] text-zinc-600 tracking-wider mb-2", children: [
        researchExp.company,
        " · ",
        researchExp.startDate,
        " —",
        " ",
        researchExp.endDate
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: researchExp.highlights.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "li",
        {
          className: "text-zinc-500 text-[14px] leading-relaxed pl-3 border-l border-zinc-800",
          children: h
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-md text-white uppercase tracking-widest mb-2", children: "Awards & Publications" }),
      data.awardsAndLeadership.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-zinc-500 text-[14px] leading-relaxed mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-300 font-bold", children: [
          a.title,
          ":"
        ] }),
        " ",
        a.description
      ] }, i))
    ] })
  ] });
}
function TerminalContent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold uppercase tracking-wide", children: "Interactive Terminal" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-[14px] leading-relaxed max-w-md", children: "Access the full interactive terminal — run BASIC programs, play games, and explore the virtual filesystem." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/secret-location",
        className: "inline-block border border-white text-white text-[12px] uppercase tracking-widest px-5 py-2 hover:bg-white hover:text-black transition-colors duration-200",
        children: "Launch Terminal →"
      }
    )
  ] });
}
function Portfolio() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SpatialGUI, {});
}
export {
  Portfolio as component
};
