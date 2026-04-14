import { blogsData } from '@/utils/data/blogs-data';

const siteUrl = 'https://harshitgupta5290.github.io/portfolio';

export default function sitemap() {
  const blogUrls = blogsData.map((blog) => ({
    url: `${siteUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.published_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/projects`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...blogUrls,
  ];
}
