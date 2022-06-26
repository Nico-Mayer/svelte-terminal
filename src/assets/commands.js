export const commands = {
  help: {
    output: [
      " ",
      "<span class='glow'>whois</span>        Who am I?</span>",
      "<span class='glow'>projects</span>     View coding projects</span>",
      "<span class='glow'>github</span>       View project on GitHub</span>",
      "<span class='glow'>banner</span>       Render the banner</span>",
      "<span class='glow'>clear</span>        Clear terminal</span>",
      " ",
    ],
  },
  whois: {
    output: ["you entered whois", "meister ich bins", "ich hoffe es geht"],
  },
  projects: {
    output: [
      " ",
      "<span class='glow'>Project 1</span>    Description to Project 1",
      "<span class='glow'>Project 2</span>    Description to Project 2",
      "<span class='glow'>Project 3</span>    Description to Project 3",
      " ",
    ],
  },
  github: {
    output: ["Opening repo..."],
  },
}
