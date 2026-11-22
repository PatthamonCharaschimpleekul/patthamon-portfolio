import { Footer, Nav } from "./Chrome";
import { getProject, researchProjects, type Project } from "./projects";
import { defaultLinks, profile, type SiteLinks } from "./site";

const stats = [
  { num: "02", label: "degrees in parallel" },
  { num: "08", label: "AI-agent features shipped at SCG" },
  { num: "02", label: "papers submitted (ICAIIC 2027, AAAI-27 workshop)" },
  { num: "02", label: "pending petty patents" },
];

const skills = [
  { label: "PROGRAMMING", items: "Python · TypeScript · JavaScript · C · C++ · HTML/CSS · SQL" },
  {
    label: "AI & LLM",
    items:
      "LLM orchestration · Agentic tool-calling · RAG · LLM-as-a-judge · Knowledge-graph extraction · Prompt engineering · LiteLLM · MCP",
  },
  {
    label: "LIBRARIES & FRAMEWORKS",
    items:
      "Pandas · NumPy · scikit-learn · OpenCV · Matplotlib · FastAPI · Flask · Streamlit · React · Tailwind CSS · Tauri · ECharts · Vite",
  },
  { label: "TESTING & TOOLS", items: "Pytest · Vitest · Playwright · Linux (Ubuntu) · Git & Git flow" },
];

type SmallBuild = { meta: string; status: string; title: string; text: string };

const smallBuilds: SmallBuild[] = [
  {
    meta: "ROBOTICS · ON-DEVICE LLM",
    status: "In progress",
    title: "Companion robot",
    text: "A small two-legged humanoid with arms and a camera head, running a local Qwen LLM so it can follow spoken commands and chat — no laptop tether.",
  },
  {
    meta: "ILLUSTRATION",
    status: "On sale",
    title: "LINE sticker sets",
    text: "Original character stickers — including this site’s mascot — designed and published on LINE Creators Market.",
  },
];

function Pill({ text, accent }: { text: string; accent?: boolean }) {
  return <span className={`pill ${accent ? "pill-accent" : "pill-muted"}`}>{text}</span>;
}

function ProjectCard({ p, links }: { p: Project; links: SiteLinks }) {
  return (
    <a href={links.project(p.slug)} className="card card-link">
      <div className={`card-figure${p.card.fit === "contain" ? " contain" : ""}`}>
        <img src={links.figure(p.card.file)} alt={p.card.alt} loading="lazy" />
      </div>
      <div className="card-body">
        <div className="meta-row">
          <span className="mono-label">{p.meta}</span>
          <Pill text={p.status} accent={p.statusAccent} />
        </div>
        <h3 className="h3">{p.title}</h3>
        <p className="body">{p.cardText}</p>
        <p className="metric">
          {p.metric}
          <span>{p.metricNote}</span>
        </p>
        <span className="card-cta">Read more →</span>
      </div>
    </a>
  );
}

export default function Home({ links = defaultLinks }: { links?: SiteLinks }) {
  return (
    <div id="top" className="container">
      <Nav links={links} />

      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">
            <span className="dot" />
            OPEN TO INTERNSHIPS · COMPUTER &amp; AI
          </p>
          <h1 className="h1">Building AI for the ocean, the sky, and the products in between.</h1>
          <p className="lead">
            I’m Patthamon — a dual-degree student in Artificial Intelligence and Industrial Technology. I build AI for
            science and for real products: from ocean forecasts and lensed radio bursts to the multi-agent RAG systems I
            shipped as a Data &amp; AI intern at SCG Chemicals.
          </p>
          <div className="btn-row">
            <a href="#experience" className="btn btn-primary">See my work</a>
            <a href={profile.github} className="btn btn-outline">GitHub ↗</a>
            <a href={profile.linkedin} className="btn btn-outline">LinkedIn ↗</a>
          </div>
        </div>
        <div className="hero-art">
          <div className="blob">
            <img src={links.asset("happy.png")} alt="Mascot, a cheerful girl with dark purple hair and little horns" />
          </div>
          <span className="float-badge light">Data &amp; AI Intern · SCG Chemicals</span>
          <span className="float-badge dark">2 papers submitted</span>
        </div>
      </section>

      <section aria-label="At a glance" className="stats">
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <span className="stat-num">{s.num}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ---------- experience ---------- */}
      <section id="experience" className="section">
        <div className="section-head">
          <div>
            <p className="kicker">01 — EXPERIENCE</p>
            <h2 className="h2">Internship</h2>
          </div>
          <div className="head-right">
            <img src={links.asset("neutral.png")} alt="" className="section-mascot" />
            <a href={links.resume} className="link-accent">Full résumé ↗</a>
          </div>
        </div>
        <div className="exp-wrap">
          <article className="exp-card">
            <div className="exp-top">
              <div>
                <h3 className="exp-role">Data &amp; AI Intern</h3>
                <span className="exp-company">SCG Chemicals</span>
              </div>
              <span className="exp-dates">Jul 2026 – Oct 2026</span>
            </div>
            <div className="exp-block">
              <h4>
                AILY Cowork <span>— enterprise AI-agent desktop app, extended from open-source OpenWorker</span>
              </h4>
              <ul className="bullets">
                <li>Shipped 8 production AI-agent features in a full-stack desktop app (Python, React/TypeScript, Rust/Tauri).</li>
                <li>Built an LLM knowledge graph, a multi-LLM Debate Mode, Office file export, and a Thai-localized Windows port.</li>
              </ul>
            </div>
            <div className="exp-block">
              <h4>
                Video Knowledge Base <span>— multi-agent RAG over text, images and video</span>
              </h4>
              <ul className="bullets">
                <li>Built a multi-agent RAG system (LangGraph) with parallel multimodal retrieval across text, image OCR and video transcripts.</li>
                <li>Engineered keyword scoring and an LLM-as-a-Judge filter for cited, grounded answers, streamed via async FastAPI (SSE) with ffmpeg clip extraction.</li>
                <li>Cut cost with multi-model routing (LiteLLM) and added a RAG evaluation loop (faithfulness / relevance) with human feedback.</li>
              </ul>
            </div>
            <div className="tags">
              {["Python", "React / TypeScript", "Rust / Tauri", "LangGraph", "FastAPI", "LiteLLM", "SQLite"].map((t) => (
                <Pill key={t} text={t} />
              ))}
            </div>
          </article>

          <aside aria-label="Internship availability" className="avail">
            <img src={links.asset("smug.png")} alt="" />
            <span className="label"><i />AVAILABLE</span>
            <h3>Looking for my next internship</h3>
            <p>Computer &amp; AI roles — software, data, ML or LLM engineering. Thai, English and Chinese (HSK 4).</p>
            <a href="#contact" className="btn btn-white">Get in touch</a>
          </aside>
        </div>
      </section>

      {/* ---------- research ---------- */}
      <section id="research" className="section">
        <div className="section-head">
          <div>
            <p className="kicker">02 — RESEARCH</p>
            <h2 className="h2">Research projects</h2>
            <p className="body">Real datasets, pre-registered experiments, and honest baselines.</p>
          </div>
          <img src={links.asset("think.png")} alt="" className="section-mascot" />
        </div>
        <div className="grid-research">
          {researchProjects.map((p) => (
            <ProjectCard key={p.slug} p={p} links={links} />
          ))}
        </div>
      </section>

      {/* ---------- projects ---------- */}
      <section id="projects" className="section">
        <div className="section-head">
          <div>
            <p className="kicker">03 — PROJECTS</p>
            <h2 className="h2">Things I build</h2>
            <p className="body">Tools and side projects, from desktop apps to robots and stickers.</p>
          </div>
          <img src={links.asset("curious.png")} alt="" className="section-mascot" />
        </div>
        <div className="grid-projects">
          <ProjectCard p={getProject("pc-town")!} links={links} />
          {smallBuilds.map((p) => (
            <article key={p.title} className="card card-plain">
              <div className="meta-row">
                <span className="mono-label">{p.meta}</span>
                <Pill text={p.status} />
              </div>
              <h3 className="h3">{p.title}</h3>
              <p className="body">{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- about ---------- */}
      <section id="about" className="section about">
        <div className="about-text">
          <p className="kicker">04 — ABOUT</p>
          <h2 className="h2">Two degrees, one habit: making things work.</h2>
          <p>
            I study Artificial Intelligence and Industrial Technology at the same time, so I care about AI that works
            outside the notebook — in production apps, on real hardware, and on real data from the ocean and the sky.
          </p>
          <div className="skills">
            {skills.map((s) => (
              <div key={s.label}>
                <span className="mono-label">{s.label}</span>
                <p>{s.items}</p>
              </div>
            ))}
          </div>
        </div>
        <div id="resume" className="edu">
          <img src={links.asset("shy.png")} alt="" className="edu-mascot" />
          <span className="mono-label">EDUCATION</span>
          <div className="edu-item">
            <strong>Bachelor of Intelligent Systems Science and Engineering</strong>
            <span>Major: Artificial Intelligence</span>
            <em>Harbin Engineering University · 2024 – present</em>
          </div>
          <div className="edu-item">
            <strong>B.Sc. Industrial Technology</strong>
            <span>Production Engineering Technology and Management</span>
            <em>Sukhothai Thammathirat Open University · 2024 – present</em>
          </div>
          <span className="mono-label" style={{ marginTop: 20 }}>LANGUAGES</span>
          <p className="body" style={{ color: "var(--ink)", marginTop: 6 }}>Thai (native) · English (intermediate) · Chinese (HSK 4)</p>
          <a href={links.resume} className="btn btn-primary">Download résumé (PDF)</a>
        </div>
      </section>

      {/* ---------- contact ---------- */}
      <section id="contact" className="contact">
        <div className="contact-inner">
          <p className="kicker">05 — CONTACT</p>
          <h2>Have an internship or a weird dataset? Let’s talk.</h2>
          <a href={`mailto:${profile.email}`} className="contact-email">{profile.email}</a>
          <div className="btn-row">
            <a href={profile.github} className="btn btn-outline">GitHub ↗</a>
            <a href={profile.linkedin} className="btn btn-outline">LinkedIn ↗</a>
            <a href={links.resume} className="btn btn-dark">Résumé ↗</a>
          </div>
        </div>
        <img src={links.asset("peek.png")} alt="" className="contact-mascot" />
      </section>

      <Footer links={links} />
    </div>
  );
}
