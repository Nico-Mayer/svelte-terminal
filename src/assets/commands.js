export const commands = {
  help: {
    output: [
      " ",
      "<span class='glow'>whoami</span>       Who am I?</span>",
      "<span class='glow'>pokemon</span>      Get random Pokemon</span>",
      "<span class='glow'>projects</span>     View coding projects</span>",
      "<span class='glow'>github</span>       View project on GitHub</span>",
      "<span class='glow'>banner</span>       Render the banner</span>",
      "<span class='glow'>admin</span>        Enter password for admin rights</span>",
      "<span class='glow'>clear</span>        Clear terminal</span>",
      " ",
    ],
  },
  whois: {
    output: [
      " ",
      "Hey my name is nico, i am a student at Georg Simon Ohm university and this is my first svelte project :)",
      " ",
    ],
  },

  projects: {
    output: [
      " ",
      "<a class='link' target='_blank' href='https://github.com/Nico-Mayer/vide'>Vide</a>        Vite super light Beginner Starter Template",
      "<a class='link' target='_blank' href='https://p5vue-homepage.vercel.app/'>p5vue</a>       Simply add p5 to your Vue and Nuxt projects ✌️",
      "<a class='link' target='_blank' href='https://yuu-mi.vercel.app/'>Yuu.mi</a>      OP.gg inspired site using riot games api to track player data",
      " ",
    ],
  },
  github: {
    output: ["Opening repo..."],
  },
}
