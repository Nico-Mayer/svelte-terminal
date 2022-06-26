<script>
  // @ts-nocheck
  import { onMount } from "svelte"
  import { clickOutside } from "./composables/clickOutside"
  import { commands } from "./assets/commands"

  // Variables

  const banner = [
    " _______  .__                          _____                             ",
    " \\      \\ |__| ____  ____             /     \\ _____  ___.__. ___________ ",
    " /   |   \\|  |/ ___\\/  _ \\   ______  /   /  \\__  \\<   |  |/ __ _  __ \\",
    "/    |    \\  \\  \\__(  <_> ) /_____/ /    Y    \\/ __ \\___  \\  ___/|  | \\/",
    "\\____|__  /__|\\___  >____/          \\____|__  (____  / ____|\\___  >__|   ",
    "        \\/        \\/                        \\/     \\/\\/         \\/       ",
    "<span class='text-[#EBCB8B]'>Type <span class='glow'>'help'</span> to see a list of available commands</span>",
  ]
  let input
  let content
  let cmd = ""
  let preCmds = []
  let preCmdsIndex = preCmds.length
  let cmdTitle = "guest@nimawg.com:# ~"

  // Functions

  function addLine(text, style) {
    let line = document.createElement("p")
    line.innerHTML = text
    line.classList.add(...style)
    content.appendChild(line)
  }
  function renderBanner() {
    for (let i = 0; i < banner.length; i++) {
      if (i == banner.length - 1) {
        addLine(banner[i], ["line", "mb-8"])
      } else {
        addLine(banner[i], ["line"])
      }
    }
  }

  function openLink(url) {
    setTimeout(() => {
      window.open(url, "_blank").focus()
    }, 600)
  }

  function renderOutput(data) {
    addLine(`${cmdTitle} ${cmd}`, ["m-0", "whitespace-pre"])

    if (data) {
      for (let i = 0; i < data.output.length; i++) {
        addLine(data.output[i], ["line", "pl-4", "text-[#EBCB8B]"])
      }
    } else {
      let t = `<span class='text-[#BF616A]'>'${cmd}'</span> is a invalid command, type <span class='glow'>'help'</span> to see a list of available commands.`
      addLine(t, ["line", "pl-4", "text-[#B48EAD]", "mb-2"])
    }
  }

  function handleInput(e) {
    if (e.key === "Enter") {
      if (cmd !== "") {
        preCmds.push(cmd)
      }
      preCmdsIndex = 0
      switch (cmd.toLowerCase()) {
        default:
          renderOutput(null)
          break
        case "":
          addLine(`${cmdTitle} ${cmd}`, ["m-0", "whitespace-pre"])
          break
        case "help":
          renderOutput(commands.help)
          break
        case "whois":
          renderOutput(commands.whois)
          break
        case "projects":
          renderOutput(commands.projects)
          break
        case "github":
          renderOutput(commands.github)
          openLink("https://github.com/Nico-Mayer/svelte-terminal")
          break
        case "banner":
          renderBanner()
          break
        case "clear":
          content.replaceChildren()
          break
      }
      window.scrollTo(0, document.body.offsetHeight)
      cmd = ""
    }
    if (e.key === "ArrowUp") {
      cmd = preCmds[preCmds.length - 1 - preCmdsIndex]
      if (preCmdsIndex < preCmds.length - 1) {
        preCmdsIndex += 1
      }
    }
    if (e.key === "ArrowDown") {
      cmd = preCmds[preCmds.length - preCmdsIndex]
      if (preCmdsIndex > 0) {
        preCmdsIndex -= 1
      } else if (preCmdsIndex == 0) {
        cmd = ""
      }
    }
  }

  // Hooks
  onMount(() => {
    renderBanner()
  })
</script>

<main>
  <div
    id="mainWindow"
    class="w-fll font-mono text-[#8FBCBB] leading-tight px-[20px] py-[15px] overflow-x-hidden"
    use:clickOutside
    on:click={input.focus()}
    on:click_outside={input.focus()}
  >
    <div id="content" bind:this={content} />
    <div class="flex ">
      <span class="">{cmdTitle}</span>
      <input
        bind:value={cmd}
        bind:this={input}
        on:keydown={handleInput}
        class="bg-transparent outline-none pl-4 text-[#5E81AC] "
        type="text"
      />
    </div>
  </div>
</main>
