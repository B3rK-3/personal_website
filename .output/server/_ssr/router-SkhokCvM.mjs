import { c as createRouter$1, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, u as useLocation, H as HeadContent, S as Scripts, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
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
const ASCII_ART = `																			   ÆÆÆÆÆÆ         ÆÆÆÆÆÆÆÆÆÆÆÆÆÆ±         ¾ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆC                                          
																				Í‚…°‹         ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ         ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                                  
																																			vÃÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                             
																												   ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                          
																												   ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                       
																																   HÆÆÆÆÆÆÆÆÆÆ                                               ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                    
																								«èÆÆÆÆÆÆÆÆÆÆ                         ÆÆÆÆÆÆÆÆÆÆÆ                                                  ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                  
																							(nGgÆÆÆÆÆÆÆÆÆÆÆÆ                   ÆÆÆÆ   ¾ÆÆÆÆÆÆÆÆÆÆ                                                     ÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                
																												$ÆÆÆÆõ     ÆÆÆÆÆ        ÆÆÆÆÆÆÆÆÆÆÆ                                                      ÆÆÆÆÆÆÆÆÆÆÆÆÆ              
																											ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ            mÆÆÆÆÆÆÆÆÆÆ         ÆÆÆÆÆÆÆ                                        ÆÆÆÆÆÆÆÆÆÆÆ             
																  ¦nÝÆÆÆÆÆÆÆÆÆÆ)                          CÆÆÆÆÆ       ÆÆÆÆÆ               ÆÆÆÆÆÆÆÆÆÆÆ   ÆÆÆÆÆÆÆÆ              ³ÆÆÆÆÆÆÆÆÆ                     ÆÆÆÆÆÆÆÆÆÆÆ           
																;IÆÆÆÆÆÆÆÆÆÆÆÆÆ        ÆÆÆÆÆÆÆÆ          ÆÆÆÆ           ÆÆ             ÅÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ           ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                 ÆÆÆÆÆÆÆÆÆÆ          
																				   ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ      ÆÆÆ           ÆÆ                       ´ ˆ·²”?uçTFq          ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ              ÆÆÆÆÆÆÆÆÆÆ         
																				}ÆÆÆÆÆ          òÆÆÆÆ   ÆÆÆ            Æ                                           ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ              ÆÆÆÆÆÆÆÆÆ        
																   òÆÆÆ@       ÆÆÆÆ                 ÆÆÆ ÆÆÆUÆ                   ÆÆÆÆÆÆÆÆÆÆÆÆÆÆ     ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ             ÆÆÆÆÆÆÆÆÆ       
						 „ÞÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                    ÆÆÆÆÆÆÆÆÆÆÆÆÆ  ÆÆÆ                    rÆÆÆÆÆÆÆÆÆÆÆ                                                                          ÆÆÆÆÆÆÆÆÆÆÆÆÆÆ            ÆÆÆÆÆÆÆÆÆ      
								   %£êÆÆÆÆ                   ÆÆÆÆ         ÆÆÆÆÆÆ                    ÆÆÆ          1Æ                                           ÆÆÆÆÆÆÆÆÆÆÆÆ                    ÆÆÆÆÆÆÆÆÆÆÆÆÆ           ÆÆÆÆÆÆÆÆÆ     
															ÆÆÆ              ÆÆþ                   Æ                                            ’ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                         ÆÆÆÆÆÆÆÆÆÆÆ           ÆÆÆÆÆÆÆÆÆ    
												  ÆÆÆÆÆÆÆÆÆÆÆ                 Æ                                                   ÆÆÆÆÆÆÆ       q[          ÆÆÆÆÆÆÆÆÆÆ                             ÆÆÆÆÆÆÆÆÆÆ          ÆÆÆÆÆÆÆÆÆ    
												ÆÆÆÆÆƒ    êÆÆÆÆÆÆÆÆÆÆÆÆ        Æ                                     ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                       ÆÆÆÆÆÆÆÆÆú                               ÆÆÆÆÆÆÆÆÆÆ          ÆÆÆÆÆÆÆÆÆ   
											  ÆÆÆÆ               ²                           ÆÆÆÆÆÆÆÆÆ             ÆÆÆÆ        ÆÆÆ       ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                                  ÆÆÆÆÆÆÆÆÆÆ          ÆÆÆÆÆÆÆÆÆ  
								   RÆÆÆÆÌ    ÆÆÆ                        ÝÃÆÆÆÆÆÆÆÆ8      ÆÆš        ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ            Æ        ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆE                                   ÆÆÆÆÆÆÆÆÆ           ÆÆÆÆÆÆÆÆ  
							   ÆÆÆÆÆ  JÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆO                                                          ÆÆÆ              Æ                      ÛÆÆÆÆÆÆÆÆ                                     ÆÆÆÆÆÆÆÆÆ          ÆÆÆÆÆÆÆÆÆ 
							 ÆÛ                                                             Æ3                   ÆÆ&                                     ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ          ÆÆÆÆÆÆÆÆÆ 
				 ÆÆÆÆÆÆ                                                                  ÆÆ                  ÆÆÆÆÆÆÆ                       ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆKÀÆÆÆÆÆÆÆÆÆêÆÆÆÆÆÆÆœÆÆÀêÆÆHÆÆQÆÆÆRÆÆÆÆÆÆKÆÆÆRÆÆÁÆÆÆ          xÆÆÆÆÆÆÆÆ 
ÆÆW   æÆÆÆÆÆ>  >ÆÆÆÆÆÆ  ÆÆÆÆÆ     (ÆÆÆÆÆÆÆÆÆ        °ÆÆÆÆÆÆS       ÆÆ3                    ÆÆÆ                 ÆÆÆÆ   ÆÆj                                    ÆÆÆÆÆÆæÆÆÁÆÆÆÆÆÄÄÆÆæRÆÆÆÆÆÆQÆÆÛÆÆåÆÆÆÆÆÆÆÆÆÆKÆÆÆæÆÆÆÆÆÆ       %ÆÆÆÆÆÆÆÆ 
		 ýÆÆÆ           ÆÆÆÆÆÆÆÆÆÆ    úÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ          ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                 ÆÆ         ’                5ÆÆÆÆÆÆÆÆ          ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ          $ÆÆÆÆÆÆÆÆ 
										  ÆÆÆÆÆ         ÆÆÆ                           ÆÆ                  Æ                      ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ        ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ          ÆÆÆÆÆÆÆÆÆ 
														 ÆÆÆÆr             Æ          ÆÆ                                                          >      ÆÆÆÆÆÆÆÆÆ                                                        ÆÆÆÆÆÆÆÆÆ 
						   }ÙÆÆÆÆÆÆÆ                       ÆÆÆÆÆÆÆÞ¹vÆÆÆÆÆû     ÆÆ    ÆÆÆ                                 ØÆÆä                            ÆÆÆÆÆÆÆÆ9                                                       ÆÆÆÆÆÆÆÆ  
					 ·íÆÆÆÆÆÆÆÆÆÆÆÆÆ¸                          ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ      ÆÆ2     Æ                              ÆÆÆ¬     ÆÆÆÆ   ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                                   0&©žñ§ûhhûû§ñááPdqÚÆÆÆÆÆÆÆÆÆ  
											  ¯            ÆÆÆÆÆÆÆ~    |¶ÆÆÆÆÆÆÆÆ         Æ   ìÆ                                ÆÆÆ                        ÆÆÆÆÆÆÆÆÆ                                ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ   
												 eÆÆÆÆÆÆÆÆÆÆ&                 ÆÆÆ             ÆÆ                            ÆÆÆÆÆÆÆÆÆ                       ÆÆÆÆÆÆÆÆÆÆ                             ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ    
																			   ÆÆÆ             ÆÆ                         ÆÆ       ÆÆÆ              ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ‡                         ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÇ     
															 8ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ            ÆÆÆ              Æ         …          ÆÆÆÆÆá                   ÆÆÆÆÆÆÆÆÆÆÆÆ                     ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ      
								ÆÆÆÆÆÆÆÆÆÆÆÆÆÆ™          ÆÆÆÆÆÆÆÆ      ›ÆÆÆÆÆÆÆÆÆÆÆÆÆ            ÆÆÆÆ        ÆÆÆÆ                                                                          ÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                           
											xÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                       ÆÆÆÆÆÆ       ¼ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                                   ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                             
																					  ÆÆÆÆÆÆÆÆÆÆÆÆÆw   ´ÆÆ    ÆÆÆ                                                  ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                               
																  rÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ    ÆÆÆ                   ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÌ         ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ              ÆÆÆÆÆÆÆÆÆÆ         
																										ÆÆÆ      mÆÆÆÆÆdÆ­       •     ÿÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ           ðÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                ÆÆÆÆÆÆÆÆÆÆÆ           
																										 ÆÆÆ                                ÆÆÆÆÆÆÆÆÆÆª  ÆÆÆÆÆÆÆÆ              ÆÆÆÆÆÆÆÆÆÆu                    ÆÆÆÆÆÆÆÆÆÆÆ           
																					Æ²                    ÆÆÆÆ                            ÆÆÆÆÆÆÆÆÆÆÆ        ÆÆÆÆÆÆÆ                                       bÆÆÆÆÆÆÆÆÆÆÆ             
																					  ÆÆÆÆ             MÆÆÆÆÆÆÆÆÆÆ      ÆÆÆÆÆÆÆÆÆ       ‚ÆÆÆÆÆÆÆÆÆÆj                 º                                   ÆÆÆÆÆÆÆÆÆÆÆÆÆ              
													   ÆÆÆÆÆÆÆÆÆ                         ØÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ           ÆÆÆÆÆÆÆÆÆÆÆ                                                    ÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                
																														  ÆÆÆ        ‰ÆÆÆÆÆÆÆÆÆÆ„                                                 ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ                  
																															ÆÆÆÆ    ÆÆÆÆÆÆÆÆÆÆÆ                                             ìÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ					
																								   ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ      ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ						
																															   }9ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ							
																																		  }öSÃÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ								
																			…ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ>           ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ 								    
																										   ÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆÆ											 `;
function TerminalLoader({
  onComplete
}) {
  const [logs, setLogs] = reactExports.useState([]);
  const [isGlitching, setIsGlitching] = reactExports.useState(false);
  const [isVisible, setIsVisible] = reactExports.useState(true);
  const navigate = useNavigate();
  const mounted = reactExports.useRef(true);
  const aborted = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "n" || e.key === "N") {
        if (aborted.current) return;
        aborted.current = true;
        setIsGlitching(true);
        setLogs((prev) => {
          const newLogs = [...prev];
          if (newLogs.length > 0) {
            const lastLine = newLogs[newLogs.length - 1];
            if (lastLine.endsWith("█")) {
              newLogs[newLogs.length - 1] = lastLine.slice(0, -1);
            }
          }
          return [...newLogs, ">", ">", "> ABORTED.█"];
        });
        setTimeout(() => {
          if (mounted.current) {
            onComplete();
            navigate({ to: "/secret-location" });
          }
        }, 800);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const addLog = (text) => {
      setLogs((prev) => [...prev, text]);
    };
    const appendToLastLog = (text) => {
      setLogs((prev) => {
        const newLogs = [...prev];
        if (newLogs.length > 0) {
          newLogs[newLogs.length - 1] += text;
        }
        return newLogs;
      });
    };
    const replaceLastCharOfLastLog = (char) => {
      setLogs((prev) => {
        const newLogs = [...prev];
        if (newLogs.length > 0) {
          const lastLine = newLogs[newLogs.length - 1];
          newLogs[newLogs.length - 1] = lastLine.slice(0, -1) + char;
        }
        return newLogs;
      });
    };
    const flashCursor = async (count = 3) => {
      const CURSOR = "█";
      const ON_DELAY = 200;
      const OFF_DELAY = 100;
      for (let i = 0; i < count; i++) {
        if (aborted.current || !mounted.current) return;
        appendToLastLog(CURSOR);
        await new Promise((r) => setTimeout(r, ON_DELAY));
        if (aborted.current || !mounted.current) return;
        setLogs((prev) => {
          const newLogs = [...prev];
          if (newLogs.length > 0) {
            newLogs[newLogs.length - 1] = newLogs[newLogs.length - 1].slice(
              0,
              -1
            );
          }
          return newLogs;
        });
        await new Promise((r) => setTimeout(r, OFF_DELAY));
      }
    };
    const typeText = async (text, isNewLine = false) => {
      if (aborted.current || !mounted.current) return;
      if (isNewLine) {
        addLog("");
      }
      for (let i = 0; i < text.length; i++) {
        if (aborted.current || !mounted.current) return;
        appendToLastLog("█");
        await new Promise(
          (resolve) => setTimeout(resolve, Math.floor(Math.random() * 40) + 10)
        );
        if (aborted.current || !mounted.current) return;
        replaceLastCharOfLastLog(text[i]);
      }
    };
    const typeInstantly = (text, isNewLine = false) => {
      if (aborted.current || !mounted.current) return;
      if (isNewLine) {
        addLog(text);
      } else {
        appendToLastLog(text);
      }
    };
    const runSequence = async () => {
      typeInstantly("> BOOTING KERNEL v4.0.2", true);
      await typeText("...");
      await new Promise((r) => setTimeout(r, 400));
      if (aborted.current || !mounted.current) return;
      typeInstantly("> MEMORY", true);
      await flashCursor(2);
      typeInstantly(" OK");
      await new Promise((r) => setTimeout(r, 100));
      if (aborted.current || !mounted.current) return;
      typeInstantly("> CPU", true);
      await flashCursor(2);
      typeInstantly(" OK");
      await new Promise((r) => setTimeout(r, 100));
      if (aborted.current || !mounted.current) return;
      typeInstantly("> FETCHING PORTFOLIO_DATA [", true);
      const totalHashes = 10;
      for (let i = 0; i < totalHashes; i++) {
        if (aborted.current || !mounted.current) return;
        appendToLastLog("-");
        let random;
        random = Math.random() * 100;
        await new Promise((r) => setTimeout(r, random));
        replaceLastCharOfLastLog("#");
        random = Math.random() * 100;
        await new Promise((r) => setTimeout(r, random));
      }
      typeInstantly("]");
      await new Promise((r) => setTimeout(r, 200));
      if (aborted.current || !mounted.current) return;
      typeInstantly("loader@website:~$ ", true);
      await new Promise((r) => setTimeout(r, 400));
      await typeText("cat portfolio.html");
      await new Promise((r) => setTimeout(r, 500));
      if (!aborted.current && mounted.current) {
        setIsVisible(false);
        setTimeout(() => {
          if (mounted.current) {
            const currentPath = window.location.pathname;
            if (currentPath === "/" || currentPath === "") {
              navigate({ to: "/portfolio" });
            }
            onComplete();
          }
        }, 500);
      }
    };
    runSequence();
    return () => {
      mounted.current = false;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate, onComplete]);
  if (!isVisible && !isGlitching) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `fixed inset-0 z-50 bg-black text-white font-mono p-4 flex flex-col transition-opacity duration-500 ${!isVisible ? "opacity-0 pointer-events-none" : "opacity-100"} ${isGlitching ? "animate-pulse" : ""}`,
      children: [
        isGlitching && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-red-900/20 z-10 pointer-events-none mix-blend-overlay flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-9xl font-bold text-red-600 animate-bounce", children: "SYSTEM FAILURE" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mb-2 ", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-[4px] leading-none whitespace-pre overflow-hidden text-right opacity-50", children: ASCII_ART }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full border-b-2 border-dashed border-white/50 mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-white/30 pb-2 mb-4 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: "[ SYSTEM OVERRIDE ]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-pulse", children: "Press 'N' to abort sequence..." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden", children: logs.map((log, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1", children: log }, index)) })
      ]
    }
  );
}
const appCss = "/assets/styles-DJuoZJC8.css";
const Route$3 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "TanStack Start Starter"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  const location = useLocation();
  const [loading, setLoading] = reactExports.useState(() => {
    if (location.pathname === "/portfolio" || location.pathname.startsWith("/portfolio") || location.pathname === "/secret-location" || location.pathname.startsWith("/secret-location")) {
      return false;
    }
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("bypass") === "1") {
        return false;
      }
    }
    if (location.search?.bypass === "1") {
      return false;
    }
    return true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(TerminalLoader, { onComplete: () => setLoading(false) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`,
          children
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$2 = () => import("./secret-location-BJG6l4Zx.mjs");
const Route$2 = createFileRoute("/secret-location")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./portfolio-CTY7vds3.mjs");
const Route$1 = createFileRoute("/portfolio")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BFqXY6kE.mjs");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SecretLocationRoute = Route$2.update({
  id: "/secret-location",
  path: "/secret-location",
  getParentRoute: () => Route$3
});
const PortfolioRoute = Route$1.update({
  id: "/portfolio",
  path: "/portfolio",
  getParentRoute: () => Route$3
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$3
});
const rootRouteChildren = {
  IndexRoute,
  PortfolioRoute,
  SecretLocationRoute
};
const routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
function createRouter() {
  const router2 = createRouter$1({
    routeTree,
    defaultPreload: "intent"
  });
  return router2;
}
const getRouter = createRouter;
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createRouter,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  ASCII_ART as A,
  router as r
};
