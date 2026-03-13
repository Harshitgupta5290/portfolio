// @flow strict
import { blogsData } from '@/utils/data/blogs-data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export async function generateStaticParams() {
  return blogsData.map((blog) => ({ slug: blog.slug }));
}

export function generateMetadata({ params }) {
  const blog = blogsData.find((b) => b.slug === params.slug);
  if (!blog) return {};
  return {
    title: blog.title,
    description: blog.description,
    authors: [{ name: "Harshit Gupta" }],
    keywords: blog.tags,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      publishedTime: blog.published_at,
      authors: ["Harshit Gupta"],
      tags: blog.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
    },
  };
}

export default function BlogPost({ params }) {
  const blog = blogsData.find((b) => b.slug === params.slug);
  if (!blog) notFound();

  return (
    <div className="py-8 max-w-3xl mx-auto px-4">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-[#16f2b3] hover:gap-3 transition-all duration-200 mb-8"
      >
        <FaArrowLeft size={13} />
        All Posts
      </Link>

      <div className="mb-6">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {blog.tags?.map((tag, i) => (
            <span
              key={i}
              className="text-xs border border-[#2a2e5a] text-gray-300 bg-[#0d1224] rounded-full px-2.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-4">
          {blog.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>
            {new Date(blog.published_at).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'long', year: 'numeric',
            })}
          </span>
          <span>·</span>
          <span>{blog.reading_time_minutes} min read</span>
          <span>·</span>
          <span className="text-gray-500">Harshit Gupta</span>
        </div>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full mb-8" />

      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full mt-12 mb-8" />

      <div className="flex justify-between items-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#16f2b3] hover:gap-3 transition-all duration-200"
        >
          <FaArrowLeft size={13} />
          Back to All Posts
        </Link>
        <p className="text-xs text-gray-500">Written by Harshit Gupta</p>
      </div>
    </div>
  );
}
