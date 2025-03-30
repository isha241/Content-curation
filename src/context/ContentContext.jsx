import React, { createContext, useContext, useState } from 'react';

const ContentContext = createContext();

// Mock initial data
const mockPosts = [
  {
    id: '1',
    title: 'Understanding React Hooks',
    content: 'A comprehensive guide to React Hooks and their use cases...',
    author: 'John Doe',
    createdAt: '2024-03-15T10:00:00Z',
    upvotes: 42,
    downvotes: 5,
    tags: ['react', 'javascript', 'programming'],
    comments: [
      {
        id: '1',
        content: 'Great explanation!',
        author: 'Jane Smith',
        createdAt: '2024-03-15T11:00:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Building Scalable APIs with Node.js',
    content: 'Best practices for building production-ready APIs...',
    author: 'Alice Johnson',
    createdAt: '2024-03-14T15:30:00Z',
    upvotes: 38,
    downvotes: 3,
    tags: ['nodejs', 'api', 'backend'],
    comments: []
  }
];

export function ContentProvider({ children }) {
  const [posts, setPosts] = useState(mockPosts);
  const [sortBy, setSortBy] = useState('hot'); // 'hot', 'new', 'top'
  const [selectedTag, setSelectedTag] = useState(null);

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      comments: []
    };
    setPosts([newPost, ...posts]);
  };

  const deletePost = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  const editPost = (postId, updatedData) => {
    setPosts(prevPosts => prevPosts.map(post =>
      post.id === postId
        ? { ...post, ...updatedData, updatedAt: new Date().toISOString() }
        : post
    ));
  };

  const upvotePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, upvotes: post.upvotes + 1 }
        : post
    ));
  };

  const downvotePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, downvotes: post.downvotes + 1 }
        : post
    ));
  };

  const addComment = (postId, comment) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? {
            ...post,
            comments: [...post.comments, {
              id: Date.now().toString(),
              content: comment,
              author: 'Current User', // In a real app, this would come from auth
              createdAt: new Date().toISOString()
            }]
          }
        : post
    ));
  };

  const getSortedPosts = () => {
    let sortedPosts = [...posts];
    
    if (selectedTag) {
      sortedPosts = sortedPosts.filter(post => 
        post.tags.includes(selectedTag)
      );
    }

    switch (sortBy) {
      case 'new':
        return sortedPosts.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
      case 'top':
        return sortedPosts.sort((a, b) => 
          (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
        );
      case 'hot':
      default:
        return sortedPosts.sort((a, b) => {
          const scoreA = (a.upvotes - a.downvotes) / Math.pow((Date.now() - new Date(a.createdAt)) / 3600000 + 2, 1.8);
          const scoreB = (b.upvotes - b.downvotes) / Math.pow((Date.now() - new Date(b.createdAt)) / 3600000 + 2, 1.8);
          return scoreB - scoreA;
        });
    }
  };

  const getAllTags = () => {
    const tags = new Set();
    posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };

  const value = {
    posts: getSortedPosts(),
    addPost,
    deletePost,
    editPost,
    upvotePost,
    downvotePost,
    addComment,
    sortBy,
    setSortBy,
    selectedTag,
    setSelectedTag,
    getAllTags
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
} 