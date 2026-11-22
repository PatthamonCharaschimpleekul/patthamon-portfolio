import { Footer, Nav } from "./Chrome";
import { projects, type Project, type Section } from "./projects";
import { defaultLinks, type SiteLinks } from "./site";

function SectionBlock({ s, n, links }: { s: Section; n: number; links: SiteLinks }) {
  const label = `${String(n).padStart(2, "0")} — ${s.heading.toUpperCase()}`;
  if (s.kind === "figure") {
    return (
      <section className="cs-block">
        <h2 className="cs-label">{label}</h2>
        <figure className="cs-figure">
          <div className="frame">
            <img src={links.figure(s.figure.file)} alt={s.figure.alt} loading="lazy" />
          </div>
          <figcaption>{s.figure.caption}</figcaption>
        </figure>
      </section>
    );
  }
  return (
    <section className="cs-row">
      <h2>{label}</h2>
      <div className="cs-content">
        {s.kind === "text" && (
          <>
            {s.lead && <p className="cs-statement">{s.lead}</p>}
            {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
            {s.bullets && (
              <ul className="cs-bullets">
                {s.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            )}
          </>
        )}
        {s.kind === "steps" && (
          <ol className="steps">
            {s.steps.map((st, i) => (
              <li key={st.title}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{st.title}</strong>
                  <span className="body">{st.text}</span>
                </div>
              </li>
            ))}
          </ol>
        )}
        {s.kind === "results" && (
          <>
            <div className="results">
              {s.tiles.map((t) => (
                <div key={t.label}>
                  <strong>{t.value}</strong>
                  <span>{t.label}</span>
                </div>
              ))}
            </div>
            {s.bullets && (
              <ul className="cs-bullets">
                {s.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            )}
          </>
        )}
        {s.kind === "checklist" && (
          <>
            {s.intro && <p className="body" style={{ fontSize: 17 }}>{s.intro}</p>}
            <ol className="checklist">
              {s.items.map((it) => <li key={it}>{it}</li>)}
            </ol>
          </>
        )}
      </div>
    </section>
  );
}

export default function ProjectDetail({ project, links = defaultLinks }: { project: Project; links?: SiteLinks }) {
  const i = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(i + 1) % projects.length];
  const sectionsBeforeResults = project.sections.findIndex((s) => s.kind === "results");
  return (
    <div className="container">
      <Nav links={links} backLink />

      <section className="cs-hero">
        <div className="cs-hero-top">
          <div className="cs-hero-text">
            <p className="kicker">{project.kicker}</p>
            <h1 className="h1">{project.title}</h1>
          </div>
          <div className="mascot-say">
            <span className="bubble">{project.mascot.line}</span>
            <img src={links.asset(`${project.mascot.pose}.png`)} alt="" />
          </div>
        </div>
        <p className="lead" style={{ marginTop: 28, maxWidth: 820 }}>{project.summary}</p>
        <dl className="meta-grid">
          {project.facts.map((f) => (
            <div key={f.label}>
              <dt className="mono-label">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="tags" style={{ marginBottom: 24 }}>
          {project.tags.map((t) => (
            <span key={t} className="pill pill-muted">{t}</span>
          ))}
        </div>
        <div className="btn-row">
          {project.links?.map((l) => (
            <a key={l.href} href={l.href} className="btn btn-primary">{l.label}</a>
          ))}
          {sectionsBeforeResults >= 0 && (
            <a href="#results" className="btn btn-outline">Jump to results</a>
          )}
        </div>
      </section>

      {project.sections.map((s, n) => (
        <div key={s.heading} id={s.kind === "results" ? "results" : undefined}>
          <SectionBlock s={s} n={n + 1} links={links} />
        </div>
      ))}

      <a href={links.project(next.slug)} className="next-card">
        <img src={links.asset("peek.png")} alt="" className="next-peek" />
        <span>
          <span className="mono-label">NEXT PROJECT</span>
          <span className="title">{next.title}</span>
        </span>
        <span className="arrow">→</span>
      </a>

      <Footer links={links} />
    </div>
  );
}
