<script>
  // @ts-nocheck

  import { onMount } from "svelte"
  import { clickOutside } from "./composables/clickOutside"
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
  let cmd = ""
  let content
  let cmdTitle = "guest@nimawg.com:# ~"

  onMount(() => {
    for (let i = 0; i < banner.length; i++) {
      let line = document.createElement("p")
      line.innerHTML = banner[i]
      content.appendChild(line)

      line.classList.add("line")
    }
  })

  function handleClickOutside(event) {
    input.focus()
    console.log(input)
  }

  const commands = {
    help: {
      output: [
        "<span class='glow'>whois</span>        Who am I?</span>",
        "<span class='glow'>projects</span>     View coding projects</span>",
        "<span class='glow'>clear</span>        Clear terminal</span>",
      ],
    },
    whois: {
      output: ["you entered whois", "meister ich bins", "ich hoffe es geht"],
    },
  }

  function emptyLine() {
    let empty = document.createElement("p")
    empty.textContent = " "
    empty.classList.add("line")
    return empty
  }

  function renderOutput(data) {
    let prevCmd = document.createElement("p")
    prevCmd.textContent = `${cmdTitle} ${cmd}`
    prevCmd.classList.add("m-0", "whitespace-pre")
    content.appendChild(prevCmd)

    if (data) {
      content.appendChild(emptyLine())
      for (let i = 0; i < data.output.length; i++) {
        let child = document.createElement("p")
        child.innerHTML = data.output[i]
        content.appendChild(child)
        child.classList.add("line", "pl-4", "text-[#EBCB8B]")
      }
      content.appendChild(emptyLine())
    } else {
      let child = document.createElement("p")
      child.innerHTML = `<span class='text-[#B48EAD]' ><span class='text-[#BF616A]'>'${cmd}'</span> is a invalid command, type <span class='glow'>'help'</span> to see a list of available commands.</span>`
      child.classList.add("line", "pl-4")
      content.appendChild(child)
    }
  }

  function handleInput(e) {
    if (e.key === "Enter") {
      switch (cmd.toLowerCase()) {
        default:
          renderOutput(null)
          break
        case "help":
          renderOutput(commands.help)
          break
        case "whois":
          renderOutput(commands.whois)
          break
        case "clear":
          content.replaceChildren()
          break
      }

      cmd = ""
    }
  }
</script>

<main>
  <div
    id="mainWindow"
    class="w-screen font-mono text-[#8FBCBB] leading-tight px-[20px] py-[15px]"
    use:clickOutside
    on:click_outside={handleClickOutside}
  >
    <div id="content" bind:this={content} />
    <div class="flex">
      <span class="">{cmdTitle}</span>
      <input
        bind:value={cmd}
        bind:this={input}
        on:keypress={handleInput}
        class="flex flex-1 bg-transparent outline-none pl-4 text-[#5E81AC]"
        type="text"
      />
    </div>
  </div>
</main>
