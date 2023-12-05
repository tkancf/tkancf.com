import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../consts';

export async function get({ url }) {
    const posts = await getCollection('blog');
    const rssFeed = await rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: url.origin,
        items: posts.map((post) => ({
            ...post.data,
            link: `${url.origin}/blog/${post.slug}/`,
        })),
    });

    return new Response(rssFeed.body, {
        headers: {
            'Content-Type': 'application/rss+xml',
        }
    });
}
