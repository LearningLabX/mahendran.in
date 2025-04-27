
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
}

export const useBlogPosts = (categoryFilter?: string | null) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Load posts from JSON
    const allPosts = blogData.posts;
    const allCategories = blogData.categories;

    setCategories(allCategories);
    
    if (categoryFilter) {
      setPosts(allPosts.filter(post => post.category === categoryFilter));
    } else {
      setPosts(allPosts);
    }
  }, [categoryFilter]);

  return {
    posts,
    categories,
    totalPosts: posts.length
  };
};
