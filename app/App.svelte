<script lang='ts'>
	import type { SearchData } from '../api/provider/tvdb/api/search'
	let query: string = ''
	let results: SearchData = []
	let debounce: NodeJS.Timeout | undefined

	async function searchSeries () {
		const response = await fetch(`/api/searchSeries`, {
			method: 'POST',
			body: JSON.stringify({ query })
		})
    const data = await response.json()
		console.log({ data })
		results = data.length ? data : []
	}

	function handleInput () {
		clearTimeout(debounce)
		debounce = setTimeout(searchSeries, 300)
	}
</script>

<div id='page'>
	<header>

	</header>
	<main id='search'>
		<h1>Search TV Series</h1>	
		<input type='text' name='query' placeholder='🔎' bind:value={query} on:keyup={handleInput} />
	</main>
	<section id='results'>
		{#each results as series}
			<div><img src={series.image_url} width='200px' height='auto' alt={series.name} /></div>
		{/each}
	</section>
	<section id='collection'>

	</section>
</div>

<style>
	#page {
		height: 100vh;
		width: 100vw;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: 100px repeat(3, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}

	header { grid-area: 1 / 1 / 2 / 4; }
	#search { grid-area: 2 / 2 / 3 / 3; }
	#results { grid-area: 3 / 1 / 4 / 4; }
	#collection { grid-area: 4 / 1 / 5 / 4; }
	
	section {
		padding: 1em;
		border-bottom: 1px solid #444;
	}

	input {
		background: #444;
		border: none;
		border-bottom: 1px solid #333;
		width: 100%;
		font-size: 2rem;
		line-height: 1.3em;
		color: white
	}

	h1 {
		font-size: 4em;
		font-weight: 100;
	}

	#results {
		justify-content: center;
		grid-template-columns: repeat(3, fit-content(33%));
		display: grid;
		grid-gap: 2em;
		align-content: center;
	}
</style>
