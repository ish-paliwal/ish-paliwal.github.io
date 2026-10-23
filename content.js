/*
  ALL SITE COPY LIVES HERE.
  Anything starting with "PLACEHOLDER" or wrapped in [BRACKETS] is a stand-in —
  replace it with the real thing. Leave a link's href as "" to show it as "coming soon".
*/
window.SITE = {
  // Hero tag box (shown uppercase, after a "// ")
  tagline: "ECE @ UT AUSTIN — CREATING AT THE BOUNDARY BETWEEN HARDWARE DESIGN AND SOFTWARE ARCHITECTURE.",

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
    { group: "HARDWARE & EDA", prefix: "H", items: ["PCB design", "Design validation", "Embedded systems", "FPGAs"] },
    { group: "LAB & TEST GEAR", prefix: "T", items: ["[ADD SKILL]", "[ADD SKILL]", "[ADD SKILL]"] },
    { group: "SOFTWARE & TOOLS", prefix: "S", items: ["[ADD SKILL]", "[ADD SKILL]", "[ADD SKILL]"] }
  ],

  about: {
    bio: [
      "Hi, I'm Ishan, an Electrical and Computer Engineering student at UT Austin. I create at the boundary between hardware design and software architecture. I build systems engineered for speed, efficiency, and real-world impact: PCBs, design validation, embedded, FPGAs and more.",
      "In my free time I enjoy playing sports especially basketball and pickleball, exploring the outdoors, trying new food, and watching bollywood movies."
    ],
    spec: [
      ["NAME", "Ishan Paliwal"],
      ["SCHOOL", "The University of Texas at Austin"],
      ["MAJOR", "Electrical & Computer Engineering"],
      ["GRAD", "2030"],
      ["BASE", "Austin, TX"]
    ]
  },

  contact: [
    { label: "EMAIL",    text: "ish.paliwal@gmail.com", href: "mailto:ish.paliwal@gmail.com" },
    { label: "UT EMAIL", text: "ish.paliwal@utexas.edu", href: "mailto:ish.paliwal@utexas.edu" },
    { label: "GITHUB",   text: "GITHUB.COM/ISH-PALIWAL", href: "https://github.com/ish-paliwal" },
    { label: "LINKEDIN", text: "LINKEDIN.COM/IN/ISHAN-PALIWAL", href: "https://linkedin.com/in/ishan-paliwal/" },
    { label: "RESUME",   text: "RESUME", href: "https://www.overleaf.com/read/nrcwpxstrpsr#07f22e" }
  ]
};
