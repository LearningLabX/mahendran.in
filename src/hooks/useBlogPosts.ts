
import { useState, useEffect } from 'react';
import blogData from '@/data/blogPosts.json';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  gradient?: string;
  hasCodeSnippets?: boolean;
  date: string;
  readTime: string;
  content?: string[];
  coverImage?: string;
  author?: string;
}

export const useBlogPosts = (categoryFilter?: string | null) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Load posts from JSON
    const allPosts = blogData.posts;
    const allCategories = blogData.categories;

    // Map data to ensure coverImage is set from image property
    const processedPosts = allPosts.map(post => ({
      ...post,
      coverImage: post.image // Ensure coverImage is available
    }));

    setCategories(allCategories);
    
    if (categoryFilter) {
      setPosts(processedPosts.filter(post => post.category === categoryFilter));
    } else {
      setPosts(processedPosts);
    }
  }, [categoryFilter]);

  return {
    posts,
    categories,
    totalPosts: posts.length
  };
};
