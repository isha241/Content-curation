import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { XMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

export default function CreatePostPage() {
  const navigate = useNavigate();
  const { addPost } = useContent();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    addPost({
      title: formData.title,
      content: formData.content,
      tags: formData.tags,
      author: 'Current User' // In a real app, this would come from auth
    });

    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-600 rounded-lg">
              <PencilSquareIcon className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create a New Post
            </h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base placeholder:text-gray-400 px-4 py-3"
                placeholder="Write a descriptive title"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                Content
              </label>
              <textarea
                name="content"
                id="content"
                rows={8}
                value={formData.content}
                onChange={handleChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base placeholder:text-gray-400 px-4 py-3"
                placeholder="Write your post content here..."
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-2">
                Tags
              </label>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white group"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 p-0.5 rounded-full hover:bg-white/20 transition-colors"
                      >
                        <XMarkIcon className="h-4 w-4 text-white/80" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base placeholder:text-gray-400 px-4 py-3"
                    placeholder="Add relevant tags to your post"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-medium rounded-lg text-white hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md hover:shadow-lg"
                  >
                    Add Tag
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-medium rounded-lg text-white hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md hover:shadow-lg"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 