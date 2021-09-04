<script lang='ts'>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
  import { seriesData } from '../../stories/data/series'
  import SeriesCard from './SeriesCard.svelte'
  import '../../public/global.css'
  const IMAGE_BUCKET = 'https://notion-tv-images.s3.ap.cloud-object-storage.appdomain.cloud/'
</script>

<Meta title='Series Card' component={SeriesCard} />

<Template let:args>
  <SeriesCard {...args} on:click={args.onClick} />
</Template>

<Story
  name='Loaded'
  args={{
    data: seriesData[0],
    fetchImageSrc: async () => `${IMAGE_BUCKET}${seriesData[0].tvdb_id}.jpg`
  }}
/>

<Story
  name='Loading'
  args={{
    data: seriesData[1],
    fetchImageSrc: () => new Promise((resolve, reject) => {})
  }}
/>

<!-- <Story
  name='Error'
  args={{
    size: 'large',
    label: 'Button',
  }}
/> -->
