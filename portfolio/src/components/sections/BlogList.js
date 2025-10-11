import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const BlogList = () => {
  const { data } = useData();
  const blogs = data?.blogs || [];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Knowledge Transfer
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on AI, Machine Learning, and Software Engineering
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No blog posts available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500 transition-all duration-300 transform hover:scale-105 group"
              >
                {blog.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {blog.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {blog.excerpt || blog.content?.substring(0, 150) + '...'}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{blog.date || new Date(blog.created_at).toLocaleDateString()}</span>
                    <span>{blog.readTime || '5 min read'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;

