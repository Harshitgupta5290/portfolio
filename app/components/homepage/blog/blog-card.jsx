// @flow strict
import Link from 'next/link';

const tagColors = [
  'text-[#16f2b3] border-[#16f2b3]',
  'text-violet-400 border-violet-400',
  'text-pink-400 border-pink-400',
  'text-amber-400 border-amber-400',
  'text-cyan-400 border-cyan-400',
];

const gradients = [
  'from-violet-900/60 to-[#0d1224]',
  'from-pink-900/60 to-[#0d1224]',
  'from-cyan-900/60 to-[#0d1224]',
];

function BlogCard({ blog, index = 0 }) {
  return (
    <Link href={`/blog/${blog.slug}`}>
      <div className="border border-[#1d293a] hover:border-[#464c6a] transition-all duration-500 bg-[#1b203e] rounded-lg relative group cursor-pointer h-full flex flex-col">
        <div className={`h-32 sm:h-40 lg:h-44 w-auto overflow-hidden rounded-t-lg bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center relative`}>
          <p className="text-white/10 text-7xl font-black uppercase leading-none select-none px-4 text-center">
            {blog.tags?.[0] ?? 'BLOG'}
          </p>
          <span className="absolute top-3 right-3 flex items-center gap-1 bg-[#0d1224]/80 border border-[#1b2c6840] text-gray-400 text-[10px] font-medium px-2 py-0.5 rounded-full">
            Harshit Gupta
          </span>
        </div>

        <div className="p-3 sm:p-4 flex flex-col flex-1">
          <div className="flex items-center justify-between text-[#16f2b3] text-xs mb-2">
            <span>
              {new Date(blog.published_at).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric',
              })}
            </span>
            <span>{blog.reading_time_minutes} min read</span>
          </div>

          <p className="text-base sm:text-lg font-medium text-white group-hover:text-violet-400 transition-colors duration-200 mb-2 line-clamp-2">
            {blog.title}
          </p>

          <p className="text-sm text-[#d3d8e8] line-clamp-3 flex-1 mb-3">
            {blog.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {blog.tags?.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className={`text-[10px] border rounded-full px-2 py-0.5 ${tagColors[i % tagColors.length]}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
