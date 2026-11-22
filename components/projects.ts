// Every project on the site lives here: the card on the home page and its detail page.

export type Figure = { file: string; alt: string; caption: string };

export type Section =
  | { kind: "text"; heading: string; lead?: string; paragraphs?: string[]; bullets?: string[] }
  | { kind: "steps"; heading: string; steps: { title: string; text: string }[] }
  | { kind: "results"; heading: string; tiles: { value: string; label: string }[]; bullets?: string[] }
  | { kind: "figure"; heading: string; figure: Figure }
  | { kind: "checklist"; heading: string; intro?: string; items: string[] };

export type Project = {
  slug: string;
  group: "research" | "build";
  // card
  meta: string;
  status: string;
  statusAccent?: boolean;
  title: string;
  cardText: string;
  metric: string;
  metricNote: string;
  card: { file: string; alt: string; fit?: "cover" | "contain" };
  // detail page
  kicker: string;
  summary: string;
  mascot: { pose: string; line: string };
  facts: { label: string; value: string }[];
  links?: { label: string; href: string }[];
  tags: string[];
  sections: Section[];
};

export const projects: Project[] = [
  /* ------------------------------------------------------------------ FRB */
  {
    slug: "frb-lensing",
    group: "research",
    meta: "ASTROPHYSICS · NOV 2026",
    status: "Submitted · ICAIIC 2027",
    statusAccent: true,
    title: "AI Detection of Gravitationally Lensed Fast Radio Bursts",
    cardText:
      "A 259k-parameter Siamese network that tells a lensed copy of a fast radio burst from an ordinary repeat, trained on semi-synthetic data built from 981 real CHIME bursts.",
    metric: "+0.226 recall",
    metricNote: "over the best baseline at 1% false positives",
    card: { file: "frb-card.png", alt: "Real CHIME bursts next to their simulated lensed copies" },
    kicker: "CASE STUDY · ASTROPHYSICS × DEEP LEARNING",
    summary:
      "A fast radio burst lensed by a foreground galaxy reaches Earth twice, days to months apart, and the two copies differ only by propagation effects. Many FRBs also repeat on their own, so a second, similar burst is ambiguous. I built a benchmark and a Siamese network that recognises lensed copies among the bursts of repeating sources.",
    mascot: { pose: "surprised", line: "Same burst… seen twice?!" },
    facts: [
      { label: "STATUS", value: "Submitted to ICAIIC 2027" },
      { label: "TIMELINE", value: "Nov 2026" },
      { label: "DATA", value: "981 bursts from 83 repeaters, CHIME/FRB Catalog 2" },
      { label: "MODEL", value: "259k-parameter Siamese network with a correlation layer" },
    ],
    links: [
      {
        label: "View code on GitHub ↗",
        href: "https://github.com/PatthamonCharaschimpleekul/AI-Detection-of-Gravitationally-Lensed-Fast-Radio-Bursts",
      },
    ],
    tags: ["Python", "PyTorch", "Siamese networks", "Simulation", "Pre-registration", "Grouped cross-validation"],
    sections: [
      {
        kind: "figure",
        heading: "The idea",
        figure: {
          file: "frb-concept.png",
          alt: "Diagram of a repeating FRB lensed by a galaxy, and a timeline of when a transit telescope records each copy",
          caption:
            "(a) A galaxy-lensed repeating FRB: every burst arrives twice, Δt apart, the second copy with a new propagation imprint. (b) A transit telescope like CHIME sees each source for only minutes a day, so it records both copies only when they land in its window.",
        },
      },
      {
        kind: "text",
        heading: "Why it matters",
        lead: "Lensed repeating FRBs are one of the cleanest future routes to the Hubble constant — but only once they can be found.",
        paragraphs: [
          "A lensed copy is the same emission event seen twice; an intrinsic repeat is a new event from the same source. Gravity does not distort the burst, but each image crosses different gas in the lens galaxy, so it picks up slightly different scattering, scintillation and dispersion.",
          "No confirmed lensed FRB exists yet, so there are no real positive examples to train on. The task is pairwise verification with three hard parts: positives must be simulated honestly, the negatives include impostors that share a propagation imprint, and decisions must hold at a 1% false-positive rate.",
        ],
      },
      {
        kind: "checklist",
        heading: "Research questions",
        items: [
          "Discrimination — can a Siamese encoder separate lensed copies from intrinsic repeats better than cross-correlation and physics- or feature-based baselines, under realistic propagation and instrument effects?",
          "Search — combining pair scores with a timing test (constant delay and flux ratio), is any CHIME Catalog 2 repeater consistent with being lensed?",
          "Forecast — how many lensed repeaters should transit surveys and all-sky monitors find with this method?",
        ],
      },
      {
        kind: "figure",
        heading: "Workflow",
        figure: {
          file: "frb-workflow.png",
          alt: "Five-step workflow: real CHIME data, pair simulator, Siamese correlation net, validation without real positives, deployment",
          caption:
            "From 981 real bursts to deployment: a pair simulator makes four kinds of pairs, the Siamese correlation net scores them, and validation runs without any real positive example.",
        },
      },
      {
        kind: "steps",
        heading: "Approach",
        steps: [
          {
            title: "Real data everywhere it exists",
            text: "Burst templates, repeater burst lists, noise and RFI all come from real CHIME Catalog 2 dynamic spectra (400–800 MHz, ~1 ms). Only the lensing itself is simulated.",
          },
          {
            title: "Pair simulator",
            text: "A singular-isothermal-sphere lens population and CHIME’s real exposure decide which copies are recorded. Each copy gets its own time shift, ΔDM, scattering and scintillation.",
          },
          {
            title: "Four classes, including impostors",
            text: "Pairs are lensed, intrinsic repeat, unrelated, or impostor — two different bursts that share a spectral envelope or scintillation pattern, the case a naive model confuses.",
          },
          {
            title: "Siamese correlation network",
            text: "One shared encoder, a differentiable correlation layer that aligns the two feature maps, soft alignment, fusion and a 4-class head — 259k parameters.",
          },
          {
            title: "Pre-registered test",
            text: "All 80 eligible sources split by source, every source scored by a model that never saw it, run once with frozen code and hashed sets.",
          },
        ],
      },
      {
        kind: "figure",
        heading: "The model",
        figure: {
          file: "frb-arch.png",
          alt: "Architecture diagram: two bursts pass through a shared encoder, a correlation layer, soft alignment and fusion into four output scores",
          caption:
            "Both bursts go through one shared encoder. The correlation layer measures how well their feature maps line up over ±24 time lags, soft alignment shifts one onto the other, and the fused maps give four class scores.",
        },
      },
      {
        kind: "figure",
        heading: "What the classes look like",
        figure: {
          file: "frb-examples.png",
          alt: "Four pairs of dynamic spectra: lensed, repeat, impostor and unrelated",
          caption: "One test pair per class (top burst A, bottom burst B). The impostor shares a propagation imprint, so it looks almost like a lensed pair.",
        },
      },
      {
        kind: "results",
        heading: "Results",
        tiles: [
          { value: "0.436", label: "Recall at 1% false positives, all 80 sources (best baseline: 0.211)" },
          { value: "+0.226", label: "Paired gain over the baseline (95% CI +0.067 to +0.403)" },
          { value: "1.0%", label: "False-positive rate on 18,585 real cross-source pairs" },
        ],
        bullets: [
          "Ablations show that both the alignment step and impostor training are needed.",
          "Two copies of a real burst are recognised about as often as two copies of its template, and the whole pipeline reproduces on a second machine.",
          "Survey geometry, not the classifier, limits discovery: a transit telescope records both copies for only about 2% of lenses, and an all-sky monitor would find about 50× more lensed repeaters from the same sources.",
        ],
      },
      {
        kind: "text",
        heading: "Limitations",
        bullets: [
          "Strong scattering in the lens galaxy (τ₆₀₀ = 3 ms) cuts recall sharply — stated in the paper.",
          "The positive class has no real counterpart yet, so every positive result is on simulated lensing over real bursts.",
          "With 83 repeaters, the expected number of lensed sources in Catalog 2 is far below one: a null search is the expected outcome.",
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- AMPAI */
  {
    slug: "ampai",
    group: "research",
    meta: "PHYSICS-INFORMED ML · SEP–NOV 2026",
    status: "Submitted · AI2ASE @ AAAI-27",
    statusAccent: true,
    title: "AMPAI: Auditing Mismatched Priors and Inputs in Physics-Informed Inversion",
    cardText:
      "Found that a common shortcut in physics-informed ML benchmarks roughly doubles the apparent benefit of physics constraints, and proposed a 5-point checklist to avoid it.",
    metric: "2,360 PINN runs",
    metricNote: "pre-registered, frozen seeds",
    card: { file: "ampai-card.png", alt: "Heat map of the true wave-breaking dissipation field over range and time" },
    kicker: "CASE STUDY · PHYSICS-INFORMED MACHINE LEARNING",
    summary:
      "Synthetic twins are the standard test of whether a physics-informed neural network (PINN) can recover a quantity that is never observed. I showed that a common shortcut in building them — computing the forcing from the truth’s own balance — roughly doubles the apparent benefit of a physical constraint, then measured what remains once it is removed.",
    mascot: { pose: "angry", line: "The benchmark leaked the answer!" },
    facts: [
      { label: "STATUS", value: "Submitted to AI2ASE @ AAAI-27 (15 Nov 2026)" },
      { label: "TIMELINE", value: "Sep – Nov 2026" },
      { label: "TRAININGS", value: "1,440 twin · 120 leak test · 720 leak-free · 80 Ian" },
      { label: "VALIDATION", value: "Hurricane Ian (2022), 4 NDBC buoys" },
    ],
    tags: ["Python", "PyTorch", "PINNs", "Pre-registration", "Ocean waves", "ERA5 / NDBC data"],
    sections: [
      {
        kind: "text",
        heading: "The question",
        lead: "Does adding physics to a neural network really help — or does the benchmark leak the answer?",
        paragraphs: [
          "The target is wave-breaking dissipation S_ds in the bulk wave-energy balance, reconstructed from sparse buoy wave heights. It is never measured directly, so the only way to score a model is a synthetic twin where the truth is known.",
          "The physical prior is an entropy-production closure, which turns out to be algebraically the Craig–Banner breaking-flux scale. The question is how much this prior really helps when it is not exactly right.",
        ],
      },
      {
        kind: "figure",
        heading: "Set-up",
        figure: {
          file: "ampai-setup.png",
          alt: "Four panels: true wave height with buoy positions, true dissipation, closure error, and the noisy buoy data the network sees",
          caption:
            "The synthetic twin: true wave height with buoy lines (a), true dissipation (b), closure error at the largest mismatch (c), and the noisy buoy data the network actually sees (d).",
        },
      },
      {
        kind: "figure",
        heading: "The network",
        figure: {
          file: "ampai-architecture.png",
          alt: "Network diagram: Fourier features into an MLP with two heads, trained on energy balance, buoy data and an entropy term",
          caption:
            "One network, two heads (wave energy and dissipation), trained on the energy balance, the buoys and — in the constrained arm only — the entropy closure, with a scheduled weight.",
        },
      },
      {
        kind: "text",
        heading: "How the leak was found",
        paragraphs: [
          "The first pre-registered twin looked like a clear win: the closure cut dissipation error by 68% at 31% mismatch, in 50 of 50 paired ensembles. A code audit then showed that this twin built the growth term from the truth’s own energy balance — so the forcing already carried the true dissipation.",
          "A leak test made the forcing agree with the closure instead. The constrained network then simply returned the closure’s own error, and an apparent truth-free warning signal disappeared. A leak-free twin, with wind input computed on the network’s own wave field, measured the real benefit.",
        ],
      },
      {
        kind: "figure",
        heading: "Benefit vs mismatch",
        figure: {
          file: "ampai-dose.png",
          alt: "Scatter plots of paired gain against closure mismatch for dissipation, extrapolation, wave height and buoy misfit",
          caption: "Paired gain of the constrained over the unconstrained network as the closure gets less accurate — the benefit shrinks and finally reverses.",
        },
      },
      {
        kind: "results",
        heading: "Results",
        tiles: [
          { value: "68% → 38%", label: "Apparent vs leak-free benefit of the physics constraint at ~30% mismatch" },
          { value: "0.300", label: "Constrained error in the leak test — vs 0.307 for the closure alone" },
          { value: "2,360", label: "Pre-registered PINN trainings, frozen seeds and code hashes" },
        ],
        bullets: [
          "The leak-free benefit holds in every ensemble at 30% mismatch, is lost when wind input is over-estimated by 20%, and turns adverse at 45% mismatch.",
          "On Hurricane Ian, leave-one-buoy-out on four buoys shows no detectable benefit — as the leak-free twin predicts.",
        ],
      },
      {
        kind: "figure",
        heading: "Leak test and real storm",
        figure: {
          file: "ampai-leakfree.png",
          alt: "Three panels: leak test bar chart, leak-free twin gain curves, and Hurricane Ian held-out buoy errors",
          caption:
            "(a) With forcing that agrees with the closure, the constrained model only matches the closure. (b) The leak-free gain shrinks with closure mismatch and input error. (c) Hurricane Ian, held-out buoys.",
        },
      },
      {
        kind: "checklist",
        heading: "A checklist for synthetic twins",
        intro: "The paper’s practical contribution, for anyone testing physics-informed inversion:",
        items: [
          "Generate the truth with forcing that does not contain the target term.",
          "Report a prior-only (closure-only) baseline next to the constrained model.",
          "Run a leak ablation: replace the forcing by one that agrees with the prior, and check that skill falls.",
          "Vary the error of the forcing parameterization in both directions.",
          "Test any truth-free diagnostic in the leak-free set-up before relying on it.",
        ],
      },
    ],
  },

  /* --------------------------------------------------------------- Eddies */
  {
    slug: "ocean-eddies",
    group: "research",
    meta: "OCEAN FORECASTING · NOV 2026 –",
    status: "Manuscript in prep · AGU",
    title: "Subsurface Eddy Structure in AI vs Physics-Based Ocean Forecasts",
    cardText:
      "Benchmarking GLO12, WenHai, XiHe, GLONET and LangYa inside satellite-detected Kuroshio eddies at 1–10 day leads, with Argo floats as ground truth.",
    metric: "6,074 Argo profiles",
    metricNote: "as ground truth",
    card: { file: "eddy-card.png", alt: "Temperature cross-sections of one cyclone from Argo floats and three forecast systems" },
    kicker: "CASE STUDY · AI WEATHER MODELS FOR THE OCEAN",
    summary:
      "AI ocean forecasts are judged mostly at the surface. I test how well they reproduce what happens below it: the 0–500 m structure of mesoscale eddies in the Kuroshio Extension, over 1–10 day leads, against real Argo float profiles.",
    mascot: { pose: "curious", line: "What’s under the surface?" },
    facts: [
      { label: "STATUS", value: "Manuscript in preparation (AGU journal)" },
      { label: "TIMELINE", value: "Nov 2026 – present" },
      { label: "REGION", value: "Kuroshio Extension, 25–45°N, 130–170°E" },
      { label: "RUNS", value: "52 weekly forecast runs of 2024 per system" },
    ],
    tags: ["Python", "xarray", "py-eddy-tracker", "Copernicus Marine", "CRPS / RMSE", "Bootstrap"],
    sections: [
      {
        kind: "text",
        heading: "Why eddies",
        lead: "Eddies carry heat below the surface. A forecast can look good at the top and still get the inside wrong.",
        paragraphs: [
          "AI ocean models (WenHai, XiHe, GLONET, LangYa) are mostly scored on surface and gridded fields. This project compares them with the physics-based GLO12 and asks whether their eddies have the right strength and depth underneath, using the only direct truth available: Argo floats that happened to drift through an eddy.",
        ],
      },
      {
        kind: "figure",
        heading: "The data",
        figure: {
          file: "eddy-map.png",
          alt: "Map of the Kuroshio Extension with Argo profiles coloured by whether they fall inside anticyclones, cyclones or outside eddies",
          caption:
            "2024 Argo profiles in the Kuroshio Extension: 749 inside anticyclones, 1,092 inside cyclones and 4,233 outside eddies, over sea-surface-height contours.",
        },
      },
      {
        kind: "steps",
        heading: "Pipeline",
        steps: [
          { title: "Observed eddies", text: "Eddies detected in satellite sea-surface height (DUACS ADT) with one shared detector; strong eddies only (radius ≥ 50 km, amplitude ≥ 5 cm)." },
          { title: "Argo truth", text: "6,074 quality-controlled profiles from 115 floats, as anomalies against the WOA23 climatology and a local outside-eddy background." },
          { title: "Forecast extraction", text: "Temperature from GLO12, WenHai, XiHe, GLONET and LangYa plus a persistence baseline, at the same places and times, leads 1–9 days." },
          { title: "Composite scoring", text: "Profiles pooled in eddy coordinates; eddy strength as a 100–400 m regression slope (1.0 = observed), plus CRPS, RMSE and win rate." },
          { title: "Checks", text: "A synthetic perfect forecast with 0.5 °C noise recovers slope 1.00; headline results hold under three bootstrap units and leave-one-month-out." },
        ],
      },
      {
        kind: "figure",
        heading: "One eddy, five forecasts",
        figure: {
          file: "eddy-section.png",
          alt: "Temperature cross-sections through an observed cyclone from Argo floats, four forecast systems and persistence",
          caption: "An observed cyclone (159.2°E, 33.5°N, 18 Sep 2024): Argo floats against each forecast system at 7–8 day lead and persistence.",
        },
      },
      {
        kind: "figure",
        heading: "Eddy strength",
        figure: {
          file: "eddy-strength.png",
          alt: "Heat maps of eddy strength for each forecast system by lead time, for anticyclones and cyclones",
          caption: "Subsurface eddy strength by system and lead (1.0 = full observed anomaly). XiHe’s cyclones stand out as too weak at every lead.",
        },
      },
      {
        kind: "results",
        heading: "Findings so far (2024, temperature)",
        tiles: [
          { value: "0.74", label: "XiHe cyclone strength — too weak vs GLO12 and persistence (p < 0.01)" },
          { value: "55–60%", label: "In-eddy cases where WenHai beats persistence" },
          { value: "~58%", label: "In-eddy cases where GLONET loses to persistence" },
        ],
        bullets: [
          "WenHai is the only system that clearly beats persistence for anticyclones at 7–9 day leads; LangYa behaves like GLO12.",
          "XiHe also detects the fewest forecast eddies (65% matched). No system makes eddies shallower.",
          "Lower RMSE does not mean better eddy structure: surface amplitude and surface RMSE do not predict subsurface strength.",
        ],
      },
      {
        kind: "figure",
        heading: "Surface vs subsurface",
        figure: {
          file: "eddy-surface.png",
          alt: "Scatter plot of subsurface eddy strength against surface amplitude ratio for each system",
          caption: "Surface amplitude ratio against subsurface strength for matched eddies. Being right at the surface does not guarantee being right below it.",
        },
      },
      {
        kind: "figure",
        heading: "Who beats persistence?",
        figure: {
          file: "eddy-winrate.png",
          alt: "Heat map of win rates against persistence for five forecast systems, by eddy type and lead time",
          caption: "How often each forecast is closer to Argo than persistence, by eddy type and lead. Blue beats persistence; * marks significant differences.",
        },
      },
      {
        kind: "text",
        heading: "Next",
        bullets: [
          "Replicate on 2023 and 2025 (about 28 GB of forecasts per year).",
          "Add salinity — a first pilot on the steric runs is done.",
          "Write the manuscript for an AGU journal (GRL or JGR: Oceans).",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------ BioLock-PM */
  {
    slug: "biolock-pm",
    group: "research",
    meta: "MATERIALS · ML SURROGATE · CAD",
    status: "Petty patent pending",
    statusAccent: true,
    title: "BioLock-PM: AI-Optimized PALF Pleated Filter",
    cardText:
      "Pineapple-leaf-fiber air filters for AC outdoor units, designed with a physics model plus an ML surrogate. Captured PM2.5 is locked into bio-bricks.",
    metric: "98.01% capture",
    metricNote: "at a 5.46 Pa pressure drop",
    card: { file: "palf-card.png", alt: "3D render of the AI-optimized pleated PALF filter media" },
    kicker: "CASE STUDY · MATERIALS × ML OPTIMIZATION",
    summary:
      "BioLock-PM turns ordinary air-conditioner outdoor units into a city-wide air-purification network. A filter made from pineapple leaf fiber (PALF) and a natural binder captures PM2.5, and used filters are locked into cement-based bricks instead of going back into the air.",
    mascot: { pose: "happy", line: "Pineapple leaves vs PM2.5!" },
    facts: [
      { label: "STATUS", value: "Petty patent pending (no. 2603002204)" },
      { label: "COPYRIGHT", value: "No. 480525" },
      { label: "COST", value: "Under US$1.50 per unit (estimate)" },
      { label: "TOOLS", value: "Python, scikit-learn, CadQuery, Fusion 360" },
    ],
    tags: ["Python", "scikit-learn", "Darcy’s law", "CadQuery", "Fusion 360", "Circular economy"],
    sections: [
      {
        kind: "text",
        heading: "The problem",
        lead: "Standard HEPA filters are synthetic plastic, and their air resistance makes AC compressors work harder.",
        paragraphs: [
          "The design had to capture fine particles while keeping pressure drop far below the 50 Pa compressor-safety threshold — using agricultural waste instead of plastic, and costing almost nothing per unit.",
        ],
        bullets: [
          "Bio-sandwich filter: layered PALF coated with natural Yang oil, which is tacky and water-repellent, to trap micro-particles without synthetic waste.",
          "Passive bypass valve: a mechanical reed valve opens by itself if the filter clogs, protecting the AC unit with no electronics.",
          "Tool-free installation with flexible rubber magnets.",
        ],
      },
      {
        kind: "figure",
        heading: "The pleated panel",
        figure: {
          file: "palf-card.png",
          alt: "3D render of the pleated filter media",
          caption: "Pleated filter media generated by CAD scripting, rendered from the project’s STL file. A 16.6 mm pitch and 25 mm depth give about three times the flat area.",
        },
      },
      {
        kind: "steps",
        heading: "Approach",
        steps: [
          { title: "Physics model", text: "Darcy’s law links thickness, permeability (set by PALF density and fiber orientation) and airflow to pressure drop." },
          { title: "ML surrogate", text: "A model trained on simulated designs searches the design space far faster than the physics code, with bootstrap uncertainty on every prediction." },
          { title: "Choosing the design", text: "The pick balances capture, material use and airflow-safety margin: the thinnest medium that still reaches full capture, since extra thickness only adds pressure drop." },
          { title: "Pleat geometry", text: "The chosen design is generated as pleated CAD geometry by script (CadQuery), then finished in Fusion 360 for manufacturing." },
          { title: "Dust-to-brick", text: "After a 30-day filtration cycle, saturated filters are shredded into a cement–sand matrix to make non-structural bio-bricks." },
        ],
      },
      {
        kind: "results",
        heading: "Results",
        tiles: [
          { value: "98.01%", label: "Capture efficiency" },
          { value: "5.46 Pa", label: "Pressure drop — far under the 50 Pa safety limit" },
          { value: "~3×", label: "Filter area from pleating" },
        ],
      },
      {
        kind: "figure",
        heading: "How good is the surrogate?",
        figure: {
          file: "palf-pred.png",
          alt: "Predicted versus actual pressure drop and capture efficiency, with residual plots",
          caption: "The ML surrogate against the physics model: predicted vs actual pressure drop and capture efficiency (top) and residuals (bottom).",
        },
      },
      {
        kind: "figure",
        heading: "Uncertainty",
        figure: {
          file: "palf-uncertainty.png",
          alt: "Pressure drop and capture efficiency against filter thickness with bootstrap intervals",
          caption: "Prediction against filter thickness at 2.5 m/s airflow, shaded 90% bootstrap interval. Capture saturates early, so thinner media wins.",
        },
      },
      {
        kind: "figure",
        heading: "Other form factors",
        figure: {
          file: "palf-purifier.png",
          alt: "3D render of a cylindrical purifier: pleated media inside a frame",
          caption: "The same media generated for a cylindrical purifier, rendered from the project’s STL files.",
        },
      },
    ],
  },

  /* ------------------------------------------------- Patient Digital Twin */
  {
    slug: "patient-digital-twin",
    group: "research",
    meta: "GRAPH ML · AI FOR eHEALTH",
    status: "Paper in progress",
    title: "Patient Digital Twin: Graph Learning for Organ-Level Adverse Drug Events",
    cardText:
      "Predicts which of eight organ systems a drug will affect, from a drug–gene–organ graph plus patient attributes. On drugs it has never seen, it beats every baseline.",
    metric: "0.643 AUROC",
    metricNote: "on unseen drugs",
    card: { file: "twin-card.png", alt: "Bar chart: graph plus patient model 0.643, gradient boosting 0.625, patient features only 0.583", fit: "contain" },
    kicker: "CASE STUDY · GRAPH MACHINE LEARNING FOR HEALTH",
    summary:
      "The organ-level consequences of a prescription may depend on the patient. Given a drug and basic patient attributes, I predict which of eight organ systems appear in an FDA adverse-event report, and test whether a mechanism graph adds anything beyond drug identity, chemical structure and patient data.",
    mascot: { pose: "worried", line: "Research only — not for treatment!" },
    facts: [
      { label: "STATUS", value: "Paper in progress" },
      { label: "DATA", value: "309,424 FDA FAERS reports (2025), 1,167 drugs" },
      { label: "GRAPH", value: "Drug–gene–organ, from ChEMBL mechanisms + CTD" },
      { label: "MODEL", value: "Heterogeneous GraphSAGE (PyTorch Geometric)" },
    ],
    tags: ["Python", "PyTorch Geometric", "RDKit", "ChEMBL", "CTD", "Streamlit", "Three.js"],
    sections: [
      {
        kind: "text",
        heading: "The question",
        lead: "Does knowing how a drug works help predict where it will cause harm — for a drug the model has never seen?",
        paragraphs: [
          "Each FAERS report is turned into eight labels (liver, heart, nervous, kidney, lung, gastrointestinal, skin, blood). The model sees the drug, the patient’s basic attributes and a heterogeneous graph linking drugs to their target genes and genes to organ-level diseases.",
          "To be honest about novelty, models are tested on three splits that get harder: later reports for known drugs, drugs held out entirely, and whole therapeutic classes held out.",
        ],
      },
      {
        kind: "steps",
        heading: "Approach",
        steps: [
          { title: "Build the dataset", text: "309,424 FAERS reports from 2025, cleaned and mapped to 1,167 drugs and eight organ systems." },
          { title: "Build the graph", text: "Drug–target links from ChEMBL mechanisms and curated gene–disease associations from CTD, mapped to organs." },
          { title: "Compare signals", text: "Drug identity, chemical fingerprints (RDKit), patient attributes, gradient boosting and the graph model, each over 10 seeds." },
          { title: "Stress-test the gain", text: "Shuffle drug–target edges, remove CTD links that could encode drug knowledge, and bootstrap at drug level." },
        ],
      },
      {
        kind: "figure",
        heading: "Main result",
        figure: {
          file: "twin-auroc.png",
          alt: "Grouped bar chart of macro AUROC for three models across three evaluation splits",
          caption: "Macro AUROC (mean ± sd over 10 seeds). The graph helps most where it should: drugs the model has never seen.",
        },
      },
      {
        kind: "results",
        heading: "What I found",
        tiles: [
          { value: "+0.018", label: "AUROC over gradient boosting on unseen drugs (95% CI 0.011–0.024)" },
          { value: "+0.060", label: "AUROC over patient features alone on unseen drugs (95% CI 0.049–0.067)" },
          { value: "0.732", label: "Best AUROC on seen drugs — drug identity + patient" },
        ],
        bullets: [
          "Seen drugs: report history is the strongest signal; the graph adds nothing.",
          "Unseen drugs: the graph beats every comparator. Shuffling drug–target links removes the gain, so it comes from real mechanism information.",
          "Unseen drug classes: the graph still beats patient features (+0.017) but only matches gradient boosting; adding chemical fingerprints does not help.",
          "Mechanism graphs help new drugs from known classes, not new classes.",
        ],
      },
      {
        kind: "figure",
        heading: "Per organ",
        figure: {
          file: "twin-organs.png",
          alt: "Bar chart of AUROC per organ system on unseen drugs for gradient boosting and the graph model",
          caption: "AUROC per organ system on unseen drugs: graph + patient against gradient boosting.",
        },
      },
      {
        kind: "text",
        heading: "The demo and its limits",
        paragraphs: [
          "An interactive Streamlit pipeline runs the graph end to end, and a WebGL / Three.js 3D patient dashboard shows multi-organ risk alerts.",
          "Ranking patients who take the same drug stays at 0.56–0.59 AUROC. This is a research prototype: the results do not support individual clinical use.",
        ],
      },
    ],
  },

  /* --------------------------------------------------------------- PC Town */
  {
    slug: "pc-town",
    group: "build",
    meta: "DESKTOP APP · PYTHON + CANVAS",
    status: "Side project",
    title: "PC Town",
    cardText:
      "Watch your computer come alive as a tiny pixel-art RPG town: the busiest processes walk the streets, and the HUD shows real CPU, RAM, disk, network and battery.",
    metric: "1 Python file",
    metricNote: "server + game, zero RAM when closed",
    card: { file: "pctown-card.png", alt: "Pixel-art town where each house and character is a running process" },
    kicker: "BUILD · SYSTEM MONITOR AS A GAME",
    summary:
      "Task Manager is a wall of numbers. PC Town turns it into a little town: the six processes using the most CPU become characters who run faster the harder they work, each app type gets its own house, and factory smoke and visitors show disk and network traffic.",
    mascot: { pose: "smug", line: "My laptop has residents now." },
    facts: [
      { label: "TYPE", value: "Desktop tool (Windows)" },
      { label: "STACK", value: "Python, psutil, Win32 via ctypes, HTML Canvas" },
      { label: "PRIVACY", value: "Localhost only — no data leaves the machine" },
      { label: "TESTS", value: "pytest unit + integration" },
    ],
    tags: ["Python", "psutil", "ctypes / Win32", "HTML Canvas", "pytest"],
    sections: [
      {
        kind: "figure",
        heading: "Demo",
        figure: {
          file: "pctown-demo.gif",
          alt: "Animated pixel-art town with characters walking between houses",
          caption: "Recorded live with a Chrome DevTools screencast and ffmpeg. Labels show each process and its window title.",
        },
      },
      {
        kind: "text",
        heading: "What it does",
        bullets: [
          "6 characters = the 6 processes using the most CPU — busy ones run, idle ones fall asleep (zZz).",
          "Houses look different by app type: browser (satellite dish), media (speaker), game (joystick roof), dev tool (chimney with a blinking light) or chat (envelope).",
          "Factory smoke shows disk activity; visitors walking across town show network traffic; the HUD shows real CPU, RAM, disk, network and battery.",
          "Click a house or character for a 30-second CPU graph, window title, role, parent process, uptime and full command line.",
          "Pin a house so it stays, hide it, or kill the process — kill needs two confirmations.",
        ],
      },
      {
        kind: "steps",
        heading: "How it works",
        steps: [
          { title: "Sampler thread", text: "psutil reads CPU, RAM, disk, network, battery and top processes once a second; window titles come from Win32 EnumWindows through ctypes, with no extra dependency." },
          { title: "Local server", text: "A ThreadingHTTPServer on 127.0.0.1 serves the game, a JSON status API, a heartbeat and pin/hide/kill endpoints; a single-instance lock stops it running twice." },
          { title: "Canvas game", text: "Pure HTML Canvas at 60 fps; values arrive at 1 Hz and are interpolated so characters move smoothly on any display scale." },
          { title: "Heartbeat watchdog", text: "Close the browser tab and the server shuts itself down within about 5 seconds — no service, nothing in startup." },
        ],
      },
      {
        kind: "results",
        heading: "Design choices",
        tiles: [
          { value: "0 MB", label: "RAM and CPU used when the town is closed" },
          { value: "60 fps", label: "Canvas rendering, smoothed 1 Hz data" },
          { value: "2×", label: "Safety on kill: confirm twice + server checks the PID" },
        ],
      },
    ],
  },
];

export const researchProjects = projects.filter((p) => p.group === "research");
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
