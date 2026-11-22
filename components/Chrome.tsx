import { profile, type SiteLinks } from "./site";

export function Nav({ links, backLink = false }: { links: SiteLinks; backLink?: boolean }) {
  const home = links.home;
  const anchor = (id: string) => (backLink ? `${home}#${id}` : `#${id}`);
  return (
    <header className="nav">
      <a href={backLink ? home : "#top"} className="logo">
        <span className="logo-mark" />
        Patthamon C.
      </a>
      {backLink ? (
        <nav aria-label="Main" className="nav-links">
          <a href={home}>← All work</a>
        </nav>
      ) : (
        <nav aria-label="Main" className="nav-links">
          <a href={anchor("experience")}>Experience</a>
          <a href={anchor("research")}>Research</a>
          <a href={anchor("projects")}>Projects</a>
          <a href={anchor("about")}>About</a>
          <a href={anchor("contact")}>Contact</a>
          <a href={links.resume} className="btn btn-dark">Résumé ↗</a>
        </nav>
      )}
    </header>
  );
}

export function Footer({ links }: { links: SiteLinks }) {
  return (
    <footer className="footer">
      <div className="footer-mascot">
        <img src={links.asset("sleepy.png")} alt="" />
        <span>Thanks for scrolling all the way down.</span>
      </div>
      <div className="footer-row">
        <span>© 2026 {profile.name}</span>
        <span>Built with Next.js · Hosted on Vercel</span>
      </div>
    </footer>
  );
}
