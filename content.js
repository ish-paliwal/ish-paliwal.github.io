/*
  ALL SITE COPY LIVES HERE.
  Anything starting with "PLACEHOLDER" or wrapped in [BRACKETS] is a stand-in —
  replace it with the real thing. Leave a link's href as "" to show it as "coming soon".
*/
window.SITE = {
  // Hero tag box (shown uppercase, after a "// ")
  tagline: "ECE @ UT AUSTIN — [TAGLINE PLACEHOLDER: WHAT YOU BUILD, IN YOUR VOICE]",

  // Text shown in the terminal-style status line under the hero board
  statusDefault: "SELECT A COMPONENT TO ROUTE SIGNAL",
  modules: {
    projects:   { ref: "U2", label: "PROJECTS",   hint: "builds, prototypes, and experiments" },
    experience: { ref: "U3", label: "EXPERIENCE", hint: "internships, research, and leadership" },
    skills:     { ref: "Y1", label: "SKILLS",     hint: "languages, tools, and lab gear" },
    contact:    { ref: "J1", label: "CONTACT",    hint: "say hi, send some signal" }
  },

  projects: [
    {
      id: "PRJ-01",
      title: "PROJECT NAME 01",
      year: "20XX",
      desc: "PLACEHOLDER — One line on what it does and why it's interesting.",
      stack: ["[STACK]", "[GOES]", "[HERE]"],
      links: [{ label: "SOURCE", href: "" }, { label: "WRITE-UP", href: "" }]
    },
    {
      id: "PRJ-02",
      title: "PROJECT NAME 02",
      year: "20XX",
      desc: "PLACEHOLDER — One line on what it does and why it's interesting.",
      stack: ["[STACK]", "[GOES]", "[HERE]"],
      links: [{ label: "SOURCE", href: "" }]
    },
    {
      id: "PRJ-03",
      title: "PROJECT NAME 03",
      year: "20XX",
      desc: "PLACEHOLDER — One line on what it does and why it's interesting.",
      stack: ["[STACK]", "[GOES]", "[HERE]"],
      links: [{ label: "DEMO", href: "" }]
    }
  ],

  experience: [
    {
      dates: "[MON 20XX] — [PRESENT]",
      role: "[ROLE TITLE]",
      org: "[ORGANIZATION]",
      bullets: [
        "PLACEHOLDER — What you did, with a number if you have one.",
        "PLACEHOLDER — What changed because you did it."
      ]
    },
    {
      dates: "[MON 20XX] — [MON 20XX]",
      role: "[ROLE TITLE]",
      org: "[ORGANIZATION]",
      bullets: [
        "PLACEHOLDER — What you did, with a number if you have one."
      ]
    }
  ],

  // Shown as a bill of materials. prefix = reference designator letter.
  skills: [
    { group: "LANGUAGES", prefix: "L", items: ["[ADD SKILL]", "[ADD SKILL]", "[ADD SKILL]"] },
    { group: "HARDWARE & EDA", prefix: "H", items: ["[ADD SKILL]", "[ADD SKILL]", "[ADD SKILL]"] },
    { group: "LAB & TEST GEAR", prefix: "T", items: ["[ADD SKILL]", "[ADD SKILL]", "[ADD SKILL]"] },
    { group: "SOFTWARE & TOOLS", prefix: "S", items: ["[ADD SKILL]", "[ADD SKILL]", "[ADD SKILL]"] }
  ],

  about: {
    bio: [
      "PLACEHOLDER — Two or three sentences about you, in your own voice. What you're studying, what you're drawn to, what you're working toward.",
      "PLACEHOLDER — Optional second paragraph: something personal that makes you more than a résumé."
    ],
    spec: [
      ["NAME", "Ishan Paliwal"],
      ["SCHOOL", "The University of Texas at Austin"],
      ["MAJOR", "Electrical & Computer Engineering"],
      ["GRAD", "[20XX]"],
      ["BASE", "Austin, TX"]
    ]
  },

  contact: [
    { label: "EMAIL",    text: "[YOU@EXAMPLE.COM]", href: "" },
    { label: "GITHUB",   text: "GITHUB.COM/ISH-PALIWAL", href: "https://github.com/ish-paliwal" },
    { label: "LINKEDIN", text: "[LINKEDIN.COM/IN/YOU]", href: "" },
    { label: "RESUME",   text: "[RESUME.PDF]", href: "" }
  ]
};
