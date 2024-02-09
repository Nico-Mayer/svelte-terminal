<script>
	// @ts-nocheck
	import { onMount } from 'svelte'
	import { art, banner } from './assets/asciiArt.js'
	import { commands } from './assets/commands'
	import { clickOutside } from './composables/clickOutside'

	for (let row = 0; row < art.length; row++) {
		console.log('%c' + art[row], 'color:green')
	}

	// Constants
	const password = import.meta.env.VITE_PASSWORD
	const passwordDE = import.meta.env.VITE_PASSWORD_DE
	const projects_api_utl = import.meta.env.VITE_PROJECTS_API_URL

	// Variables
	let admin = false
	let input
	let pwInput
	let content
	let cmd = ''
	let preCmds = []
	let preCmdsIndex = preCmds.length
	let cmdTitle = 'guest@nimawg.com:# ~'
	let pokemon
	let pwMode = false
	let usrPwInput = ''
	let projects = []

	// Lifecycle
	onMount(() => {
		renderBanner()
		fetchPokemon()
		fetchProjects()
	})

	// Functions
	async function fetchPokemon() {
		let id = Math.floor(Math.random() * 150)
		let url = `https://pokeapi.co/api/v2/pokemon/${id}/`
		const res = await fetch(url)
		const data = await res.json()
		pokemon = data
	}
	async function fetchProjects() {
		let url = projects_api_utl
		const res = await fetch(url)
		const data = await res.json()
		projects = JSON.parse(data)
	}

	function addLine(text, style) {
		let line = document.createElement('p')
		line.innerHTML = text
		line.classList.add(...style)
		content.appendChild(line)
	}

	function renderBanner() {
		for (let i = 0; i < banner.length; i++) {
			if (i == banner.length - 1) {
				addLine(banner[i], ['line', 'mb-4'])
			} else {
				addLine(banner[i], ['line'])
			}
		}
	}

	function openLink(url) {
		setTimeout(() => {
			window.open(url, '_blank').focus()
		}, 600)
	}

	function renderOutput(data) {
		if (data) {
			for (let i = 0; i < data.output.length; i++) {
				addLine(data.output[i], ['line', 'pl-4', 'text-[#EBCB8B]'])
			}
		} else {
			let t = `<span class='text-[#BF616A]'>'${cmd}'</span> is not valid, type <span class='glow'>'help'</span> to see a list of available commands.`
			addLine(t, ['line', , 'text-[#B48EAD]'])
		}
	}

	function handlePwCheck(e) {
		if (e.key == 'Enter') {
			if (usrPwInput === password || usrPwInput === passwordDE) {
				admin = true
				cmdTitle = 'admin >>>'
				addLine(' ', ['line'])
				addLine('Admin mode enabeld!', [
					'line',
					'text-[#EBCB8B]',
					'pl-4',
				])
				addLine("<span class='glow'>sudo</span> command enabled!", [
					'line',
					'pl-4',
				])
				addLine(' ', ['line'])
			} else {
				addLine('wrong password', ['line', 'text-[#BF616A]'])
			}
			pwMode = false
			usrPwInput = ''
			setTimeout(() => input.focus(), 1)
		}
	}

	function renderProjects() {
		addLine(' ', ['line'])
		for (let i = 0; i < projects.projects.length; i++) {
			let project = projects.projects[i]
			let name = `<a class='link' target='_blank' href=${project.link}>${project.name}</a> <pre/>`
			let description = `<span>${project.description}</span>`
			addLine(name + '\t' + description, [
				'line',
				'pl-4',
				'text-[#EBCB8B]',
			])
			addLine(' ', ['line'])
		}
		addLine(' ', ['line'])
	}

	function handleInput(e) {
		if (e.key === 'Enter') {
			if (cmd !== '' && preCmds[preCmds.length - 1] !== cmd) {
				preCmds.push(cmd)
			}
			preCmdsIndex = 0
			addLine(`${cmdTitle} <span class="text-[#A3BE8C]">${cmd}</span>`, [
				'line',
			])
			switch (cmd.toLowerCase().trim()) {
				default:
					renderOutput(null)
					break
				case '':
					break
				case 'help':
					renderOutput(commands.help)
					break
				case 'whoami':
					renderOutput(commands.whois)
					break
				case 'projects':
					renderProjects()
					break
				case 'github':
					renderOutput(commands.github)
					openLink('https://github.com/Nico-Mayer/svelte-terminal')
					break
				case 'banner':
					renderBanner()
					break
				case 'pokemon':
					console.log(pokemon)
					addLine(
						"<span class='text-[#B48EAD]'>NAME:</span>    " +
							pokemon.name,
						['line', 'ml-4', 'text-[#EBCB8B]']
					)
					addLine(
						"<span class='text-[#B48EAD]'>ID:</span>      " +
							pokemon.id,
						['line', 'ml-4', 'text-[#EBCB8B]']
					)
					addLine(
						"<span class='text-[#B48EAD]'>WEIGTH:</span>  " +
							pokemon.weight / 10 +
							' kg',
						['line', 'ml-4', 'text-[#EBCB8B]']
					)
					addLine(
						"<span class='text-[#B48EAD]'>HEIGHT:</span>  " +
							pokemon.height / 10 +
							' m',
						['line', 'ml-4', 'text-[#EBCB8B]']
					)
					let types = ''
					for (let i = 0; i < pokemon.types.length; i++) {
						types += pokemon.types[i].type.name + ' '
					}

					addLine(
						"<span class='text-[#B48EAD]'>TYPE:</span>    " + types,
						['line', 'ml-4', 'text-[#EBCB8B]']
					)
					fetchPokemon()
					break
				case 'admin':
					if (!admin) {
						pwMode = true
						setTimeout(() => pwInput.focus(), 1)
					} else {
						addLine('u are already admin', [
							'line',
							'pl-4',
							'text-[#B48EAD]',
						])
					}

					break
				case 'sudo':
					if (admin) {
						addLine('execute rickroll...', ['line', 'glow', 'pl-4'])
						setTimeout(() => {
							openLink(
								'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
							)
						}, 1000)
					} else {
						addLine('you need admin rights to use this command', [
							'line',
							'text-[#BF616A]',
							'pl-4',
						])
					}

					break
				case 'clear':
					content.replaceChildren()
					break
			}
			window.scrollTo(0, document.body.offsetHeight)
			cmd = ''
		}
		if (e.key === 'ArrowUp') {
			cmd = preCmds[preCmds.length - 1 - preCmdsIndex]
			if (preCmdsIndex < preCmds.length - 1) {
				preCmdsIndex += 1
			}
		}
		if (e.key === 'ArrowDown') {
			cmd = preCmds[preCmds.length - preCmdsIndex]
			if (preCmdsIndex > 0) {
				preCmdsIndex -= 1
			} else if (preCmdsIndex == 0) {
				cmd = ''
			}
		}
	}
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
		}}>
		<div id="content" bind:this={content} />
		{#if !pwMode}
			<div class="flex">
				<span>{cmdTitle}</span>
				<input
					bind:value={cmd}
					bind:this={input}
					on:keydown={handleInput}
					class="flex flex-1 bg-transparent outline-none pl-4 text-[#A3BE8C]"
					type="text" />
			</div>
		{:else}
			<div class="flex col">
				<span>Password:</span>
				<input
					bind:value={usrPwInput}
					bind:this={pwInput}
					on:keydown={handlePwCheck}
					class="flex flex-1 bg-transparent outline-none pl-4 text-[#A3BE8C]"
					type="password" />
			</div>
			<p class="opacity-50 text-[#D8DEE9]">
				hint: search where to find the bugs
			</p>
		{/if}
	</div>
</main>
