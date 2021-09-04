<script lang='ts'>
	import type { Series } from '../api/functions/searchSeries'
	import SeriesCard from './components/SeriesCard.svelte'

	let input: string = ''
	let results: Series[] = []
	let debounce: NodeJS.Timeout | undefined
	const debounceTime = 500

	const searchSeries = (query: string) => {
		results = []
		return fetch(`/api/searchSeries`, {
			method: 'POST',
			body: JSON.stringify({ query })
		})
			.then(res => res.json())
			.then(data => results = data)
	}

	const makeFetchImageSrc = (id: string, url?: string) =>
		() => url
			? fetch(`/api/imageFetch`, {
					method: 'POST',
					body: JSON.stringify({ id, url })
				})
					.then(res => res.json())
					.then(data => data?.location)
			: Promise.resolve()

	// Debounce reactively searching on input changes
	$: {
		clearTimeout(debounce)
		debounce = setTimeout(() => searchSeries(input), debounceTime)
	}
</script>

<div id='page'>
	<header>

	</header>
	<main id='search'>
		<h1>Search TV Series</h1>	
		<input type='text' name='query' placeholder='🔎' bind:value={input} />
	</main>
	<section id='results'>
		{#each results as series}
			<SeriesCard data={series} fetchImageSrc={makeFetchImageSrc(series.tvdb_id, series.image_url)} />
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
		grid-template-columns: repeat(5, fit-content(20%));
		display: grid;
		grid-gap: 2em;
		align-content: center;
	}
</style>
