// Paths the pages link to. Next.js uses these defaults; the static preview overrides them.
export type SiteLinks = {
  home: string;
  project: (slug: string) => string;
  resume: string;
  asset: (file: string) => string;
  figure: (file: string) => string;
};

export const defaultLinks: SiteLinks = {
  home: "/",
  project: (slug) => `/projects/${slug}`,
  // Export your résumé from Canva as PDF and save it as public/resume.pdf
  resume: "/resume.pdf",
  asset: (file) => `/mascot/${file}`,
  figure: (file) => `/figures/${file}`,
};

export const profile = {
  name: "Patthamon Charaschimpleekul",
  email: "patthamon.chr@gmail.com",
  github: "https://github.com/PatthamonCharaschimpleekul",
  linkedin: "https://www.linkedin.com/in/patthamon-charaschimpleekul-3936033b6/",
  frbRepo:
    "https://github.com/PatthamonCharaschimpleekul/AI-Detection-of-Gravitationally-Lensed-Fast-Radio-Bursts",
  bioLogisticsApp: "https://intelligent-bio-logistics-ecosystem.streamlit.app",
};
