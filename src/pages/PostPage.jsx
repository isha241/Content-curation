import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { ArrowUpIcon, ArrowDownIcon, ArrowLeftIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

function Comment({ comment }) {
  return (
    <div className="border-l-2 border-gray-200 pl-4 py-3">
      <div className="flex items-center space-x-2 text-sm">
        <span className="font-medium text-gray-900">{comment.author}</span>
        <span className="text-gray-500">•</span>
        <time className="text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</time>
      </div>
      <p className="mt-2 text-gray-700 leading-relaxed">{comment.content}</p>
    </div>
  );
}

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, upvotePost, downvotePost, addComment } = useContent();
  const [commentText, setCommentText] = useState('');

  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Post Not Found</h2>
          <p className="mt-2 text-gray-600">The post you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addComment(post.id, commentText);
    setCommentText('');
  };

  const score = post.upvotes - post.downvotes;

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="group flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Posts
      </button>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Post Header */}
        <div className="flex p-6">
          {/* Voting Section */}
          <div className="flex flex-col items-center pr-6">
            <button
              onClick={() => upvotePost(post.id)}
              className="p-2 rounded-full hover:bg-blue-100 transition-colors group"
            >
              <ArrowUpIcon className="h-6 w-6 text-gray-500 group-hover:text-blue-600" />
            </button>
            <span className="text-xl font-bold text-gray-900 my-2">{score}</span>
            <button
              onClick={() => downvotePost(post.id)}
              className="p-2 rounded-full hover:bg-red-100 transition-colors group"
            >
              <ArrowDownIcon className="h-6 w-6 text-gray-500 group-hover:text-red-600" />
            </button>
          </div>

          {/* Post Content */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
            <div className="mt-3 flex items-center space-x-2 text-sm text-gray-500">
              <span className="font-medium text-gray-900">{post.author}</span>
              <span>•</span>
              <time>{new Date(post.createdAt).toLocaleDateString()}</time>
            </div>
            <div className="mt-6 prose prose-blue max-w-none text-gray-700 leading-relaxed">
              {post.content}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="border-t border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <ChatBubbleLeftIcon className="h-5 w-5 text-gray-400" />
              Comments ({post.comments.length})
            </h2>

            {/* Add Comment Form */}
            <form onSubmit={handleSubmitComment} className="mt-6">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add to the discussion..."
                rows={3}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400 text-sm"
                required
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Post Comment
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="mt-8 space-y-6">
              {post.comments.length > 0 ? (
                post.comments.map(comment => (
                  <Comment key={comment.id} comment={comment} />
                ))
              ) : (
                <p className="text-center text-gray-500 py-6">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 