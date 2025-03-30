import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { ArrowUpIcon, ArrowDownIcon, ChatBubbleLeftIcon, FireIcon, ClockIcon, ChartBarIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

function PostCard({ post }) {
  const { upvotePost, downvotePost, deletePost } = useContent();
  const score = post.upvotes - post.downvotes;
  const isAuthor = post.author === 'Current User'; // In a real app, check against actual user

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-100">
      {/* Voting Section */}
      <div className="flex">
        <div className="flex flex-col items-center py-6 px-4 bg-gradient-to-b from-gray-50 to-blue-50 rounded-l-lg">
          <button
            onClick={() => upvotePost(post.id)}
            className="group relative"
          >
            <div className="absolute -inset-2 bg-blue-50 rounded-lg scale-0 transition-all group-hover:scale-100" />
            <div className="relative flex flex-col items-center gap-1">
              <ArrowUpIcon className="h-6 w-6 text-gray-500 group-hover:text-blue-600 transition-colors" />
              <span className="text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Upvote
              </span>
            </div>
          </button>
          <div className="my-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
            <span className="text-lg font-bold text-white">
              {score}
            </span>
          </div>
          <button
            onClick={() => downvotePost(post.id)}
            className="group relative"
          >
            <div className="absolute -inset-2 bg-red-50 rounded-lg scale-0 transition-all group-hover:scale-100" />
            <div className="relative flex flex-col items-center gap-1">
              <ArrowDownIcon className="h-6 w-6 text-gray-500 group-hover:text-red-600 transition-colors" />
              <span className="text-xs font-medium text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Downvote
              </span>
            </div>
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start">
            <Link to={`/post/${post.id}`} className="block group flex-1">
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                {post.title}
              </h2>
              <p className="mt-2 text-gray-600 line-clamp-2 leading-relaxed">{post.content}</p>
              <div className="mt-4 flex items-center space-x-6">
                <div className="flex items-center text-sm text-gray-500">
                  <ChatBubbleLeftIcon className="h-5 w-5 mr-1.5 text-blue-400" />
                  {post.comments.length} comments
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  Posted by <span className="font-medium text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text ml-1">{post.author}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 hover:from-blue-500/20 hover:to-purple-500/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
            {isAuthor && (
              <div className="flex items-start space-x-2 ml-4">
                <Link
                  to={`/post/${post.id}/edit`}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition-colors group"
                  title="Edit post"
                >
                  <PencilSquareIcon className="h-5 w-5 text-gray-700 group-hover:text-blue-600" />
                </Link>
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-red-100 transition-colors group"
                  title="Delete post"
                >
                  <TrashIcon className="h-5 w-5 text-gray-700 group-hover:text-red-600" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { posts, sortBy, setSortBy, selectedTag, setSelectedTag, getAllTags } = useContent();
  const tags = getAllTags();

  const getSortIcon = (type) => {
    switch (type) {
      case 'hot':
        return <FireIcon className="h-5 w-5" />;
      case 'new':
        return <ClockIcon className="h-5 w-5" />;
      case 'top':
        return <ChartBarIcon className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-40">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-white rounded-lg border-2 border-gray-200 py-3 pl-4 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-colors"
            >
              <option value="hot">🔥 Hot</option>
              <option value="new">⏰ New</option>
              <option value="top">📈 Top</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <Link
            to="/create"
            className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md hover:shadow-lg"
          >
            Create Post
          </Link>
        </div>
      </div>

      {/* Tags Section */}
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-sm font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-4">
          Filter by Tags
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              !selectedTag
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            All Posts
          </button>
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map(post => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="text-center py-16 bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-md">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6">
              <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              No posts found
            </h3>
            <p className="mt-2 text-gray-600">Get started by creating a new post.</p>
            <div className="mt-8">
              <Link
                to="/create"
                className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md hover:shadow-lg"
              >
                Create Post
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 