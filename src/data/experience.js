export const EXPERIENCE = [
  {
    _id: "exp-1",
    company: "Apex Cybernetics Corp",
    role: "Senior Frontend Engineer",
    duration: "2023 — PRESENT",
    current: true,
    accomplishments: [
      "Architected responsive micro-frontend components using React and Tailwind CSS.",
      "Engineered high-performance real-time analytics dashboards processing thousands of events/sec.",
      "Mentored junior developers and established standardized code review practices across team squads."
    ]
  },
  {
    _id: "exp-2",
    company: "Vanguard Systems Lab",
    // Base role / summary header if needed
    role: "Software Engineering Contractor",
    duration: "2021 — 2023",
    current: false,
    // Career progression sub-roles:
    roles: [
      {
        title: "Part-Time Independent Contractor",
        duration: "2022 — 2023",
        current: false,
        accomplishments: [
          "Delivered custom client-facing web application features and API integrations on a project contract basis.",
          "Optimized bundle size by 35% through tree-shaking and dynamic import code-splitting.",
          "Maintained and updated core legacy Node.js/Express REST microservices."
        ]
      },
      {
        title: "Software Engineer Intern",
        duration: "2021 — 2022",
        current: false,
        accomplishments: [
          "Developed UI component libraries following strict Figma design specs.",
          "Wrote automated unit and end-to-end test suites using Jest and React Testing Library.",
          "Collaborated with cross-functional teams during daily Agile/Scrum standups."
        ]
      }
    ],
    // Fallback/Legacy accomplishments list (optional)
    accomplishments: []
  },
  {
    _id: "exp-3",
    company: "Orbital Dynamics Ink",
    role: "Junior Web Developer",
    duration: "2020 — 2021",
    current: false,
    accomplishments: [
      "Built landing pages and internal admin tooling using React and modern CSS utilities.",
      "Fixed UI bugs and cross-browser rendering inconsistencies across mobile and desktop devices.",
      "Assisted senior engineers in migrating legacy jQuery scripts to modern React hooks."
    ]
  }
];