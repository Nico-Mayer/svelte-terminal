<script>
  // @ts-nocheck
  import { onMount } from "svelte"
  import { clickOutside } from "./composables/clickOutside"
  import { commands } from "./assets/commands"
  import { text } from "svelte/internal"

  // Variables

  const banner = [
    "   _____           ____          ______                    _             __",
    "  / ___/   _____  / / /____     /_  __/__  _________ ___  (_)___  ____ _/ /",
    "  \\__ \\ | / / _ \\/ / __/ _ \\     / / / _ \\/ ___/ __ `__ \\/ / __ \\/ __ `/ /",
    " ___/ / |/ /  __/ / /_/  __/    / / /  __/ /  / / / / / / / / / / /_/ / /",
    "/____/|___/\\___/_/\\__/\\___/    /_/  \\___/_/  /_/ /_/ /_/_/_/ /_/\\__,_/_/",
    "<span class='text-[#EBCB8B]'>__________________________________________________________________________</span>",
    "                                                       <span class='glow'>@github/nico-mayer</span>",
    "<span class='text-[#EBCB8B]'>Type <span class='glow'>'help'</span> to ger a list of all available commands.",
  ]

  let admin = false
  let input
  let pwInput
  let content
  let cmd = ""
  let preCmds = []
  let preCmdsIndex = preCmds.length
  let cmdTitle = "guest@nimawg.com:# ~"

  let pwMode = false
  let password = "adminPW"
  let usrPwInput = ""
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
        addLine(banner[i], ["line", "mb-4"])
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

  function handlePwCheck(e) {
    if (e.key == "Enter") {
      if (usrPwInput === password) {
        admin = true
        cmdTitle = "admin >>>"
        addLine(" ", ["line"])
        addLine("admin mode enabeld!", ["line", "text-[#D08770]", "pl-4"])
        addLine("<span class='glow'>sudo</span> command enabled!", [
          "line",
          "pl-4",
        ])
        addLine(" ", ["line"])
      } else {
        addLine("wrong password", ["line", "text-[#BF616A]"])
      }
      pwMode = false
      usrPwInput = ""
      setTimeout(() => input.focus(), 1)
    }
  }

  function handleInput(e) {
    if (e.key === "Enter") {
      if (cmd !== "" && preCmds[preCmds.length - 1] !== cmd) {
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
          addLine(`${cmdTitle} ${cmd}`, ["line"])
          renderBanner()
          break
        case "admin":
          if (!admin) {
            addLine(`${cmdTitle} ${cmd}`, ["line"])
            pwMode = true
            setTimeout(() => pwInput.focus(), 1)
          } else {
            addLine(`${cmdTitle} ${cmd}`, ["line"])
            addLine("u are already admin", ["line", "pl-4"])
          }

          break
        case "sudo":
          if (admin) {
            addLine("execute rickroll...", ["line", "glow"])
            setTimeout(() => {
              openLink("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
            }, 2000)
          } else {
            addLine(`${cmdTitle} ${cmd}`, ["line"])
            addLine("you need admin rights to use this command", [
              "line",
              "text-[#BF616A]",
            ])
          }

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
    on:click={() => {
      if (pwMode) {
        pwInput.focus()
      } else input.focus()
    }}
    on:click_outside={() => {
      if (pwMode) {
        pwInput.focus()
      } else input.focus()
    }}
  >
    <div id="content" bind:this={content} />
    {#if !pwMode}
      <div class="flex ">
        <span class={admin ? "text-[#D08770]" : ""}>{cmdTitle}</span>
        <input
          bind:value={cmd}
          bind:this={input}
          on:keydown={handleInput}
          class="flex flex-1 bg-transparent outline-none pl-4 text-[#A3BE8C] "
          type="text"
        />
      </div>
    {:else}
      <div class="flex col">
        <span>Password:</span>
        <input
          bind:value={usrPwInput}
          bind:this={pwInput}
          on:keydown={handlePwCheck}
          class="flex flex-1 bg-transparent outline-none pl-4 text-[#5E81AC] "
          type="text"
        />
      </div>
    {/if}
  </div>
</main>
