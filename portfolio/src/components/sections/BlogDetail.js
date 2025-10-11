import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import SEO from '../SEO';

const BlogDetail = () => {
  const { id } = useParams();
  const { data } = useData();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data?.blogs) {
      const foundBlog = data.blogs.find(b => b.id === parseInt(id) || b.id === id);
      setBlog(foundBlog);
      setLoading(false);
    }
  }, [id, data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Blog Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300 inline-block"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${blog.title} - Shakeb Ahmed`}
        description={blog.excerpt || blog.content?.substring(0, 160)}
        keywords={blog.tags?.join(', ')}
        image={blog.image}
      />
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/blog"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              {blog.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-400">
              <span>{blog.date || new Date(blog.created_at).toLocaleDateString()}</span>
              <span>•</span>
              <span>{blog.readTime || '5 min read'}</span>
              {blog.author && (
                <>
                  <span>•</span>
                  <span>By {blog.author}</span>
                </>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {blog.image && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div
              className="text-gray-300 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex justify-between items-center">
              <Link
                to="/blog"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300"
              >
                ← All Posts
              </Link>
              <div className="flex gap-4">
                {blog.githubUrl && blog.githubUrl !== '#' && (
                  <a
                    href={blog.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300"
                  >
                    View Code
                  </a>
                )}
              </div>
            </div>
          </footer>
        </article>
      </div>
    </>
  );
};

export default BlogDetail;

