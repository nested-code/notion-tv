<script lang='ts'>
  import 'carbon-components-svelte/css/g100.css'
  import { onMount } from 'svelte'
  import { ImageLoader, SkeletonPlaceholder } from 'carbon-components-svelte'
	import type { Series } from '../../api/functions/searchSeries'
  export let data: Series
  export let fetchImageSrc: () => Promise<string>
  let loading = true
  let imageSrc
  let error

  $: title = `${data.name}${data.year ? ` (${data.year})` : ''}`

  onMount(() => fetchImageSrc().then(src => {
    imageSrc = src
    loading = false
  }))
</script>

<div class='series'>
  <span class='series-image-title'>{title}</span>
  {#if loading}
    <div class='series-image-placeholder'>
      <SkeletonPlaceholder style='width: 100%; height: 100%' />
    </div>
  {:else}
    <div class='series-image'>
      <ImageLoader bind:error fadeIn src={imageSrc} alt='Series poster for {title}'>
        <div slot='error'>Error loading image.</div>
      </ImageLoader>
    </div>
  {/if}
</div>

<style>
  .series {
    position: relative;
    color: #9ab;
    background-clip: padding-box;
    background-image: linear-gradient(90deg,hsla(0,0%,100%,0) 0,hsla(0,0%,100%,.5) 50%,hsla(0,0%,100%,0));
    background-repeat: no-repeat;
    background-size: 100% 1px;
    border-radius: 4px;
    box-shadow: inset 0 0 0 1px rgba(221,238,255,.35);
    padding: 1px;
    overflow: hidden;
    transition: box-shadow .1s ease-in;
    width: 204px;
  }
  .series-image, .series-image-placeholder {
    display: block;
    width: 204px;
    height: 300px;
    position: relative;
  }
  .series-image {
    z-index: 2;
  }
  .series-image-placeholder {
    z-index: 0;
  }
  .series-image-title {
    line-height: 1.3em;
    display: block;
    padding: 1em;
    position: absolute;
    max-width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }
  
</style>
