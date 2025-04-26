
import { ArrowRight, Code } from "lucide-react";
import { Link } from "react-router-dom";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  category: string;
  readTime: string;
  hasCodeSnippets?: boolean;
};

type BlogCardProps = {
  post: BlogPost;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="group overflow-hidden flex flex-col">
      <Link to={`/blog/${post.id}`} className="overflow-hidden rounded-lg">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      
      <div className="mt-4 flex items-center space-x-2 text-xs">
        <span className="px-2 py-1 bg-secondary rounded-full font-medium">
          {post.category}
        </span>
        {post.hasCodeSnippets && (
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full font-medium flex items-center gap-1">
            <Code size={12} />
            Tutorial
          </span>
        )}
        <span className="text-muted-foreground">{post.date}</span>
        <span className="text-muted-foreground">&middot;</span>
        <span className="text-muted-foreground">{post.readTime}</span>
      </div>
      
      <h3 className="mt-2 text-xl font-bold">
        <Link 
          to={`/blog/${post.id}`}
          className="line-clamp-2 hover:text-primary transition-colors"
        >
          {post.title}
        </Link>
      </h3>
      
      <p className="mt-2 text-muted-foreground line-clamp-2">
        {post.excerpt}
      </p>
      
      <Link 
        to={`/blog/${post.id}`}
        className="mt-4 inline-flex items-center font-medium text-primary hover:underline"
      >
        Read More
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
}
