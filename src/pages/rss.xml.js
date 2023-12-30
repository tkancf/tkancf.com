import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
    site: context.site,
    items: blog.map((post) => ({
	  ...post.data,
      // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/blog/[slug]` routes
      link: `/blog/${post.slug}/`,
    })),
  });
}