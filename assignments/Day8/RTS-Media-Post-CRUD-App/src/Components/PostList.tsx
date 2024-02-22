// Components/PostList.tsx
import React, { useState, useEffect } from 'react';
import { getPosts, updateLike,deleteProduct,updateDislike } from '../api';
import {PostCard} from './PostCard';

interface Post {
    id: number;
    name: string;
    author: string;
    image: string;
    content: string;
    category: string;
    like: number;
    dislike: number;
}

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postData: Post[] = await getPosts();
                setPosts(postData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleLike = async(postId: number) => {
        // Implement like functionality
        try {
          console.log(postId,'id')
          await updateLike(postId);
          // Update the like count in the local state
          setPosts(prevPosts => prevPosts.map(post => post.id === postId ? { ...post, like: post.like + 1 } : post));
      } catch (error) {
          console.error('Error updating like:', error);
      }
    };

    const handleDislike = async (postId: number) => {
      try {
          await updateDislike(postId);
          // Update the dislike count in the local state
          setPosts(prevPosts => prevPosts.map(post => post.id === postId ? { ...post, dislike: post.dislike + 1 } : post));
      } catch (error) {
          console.error('Error updating dislike:', error);
      }
  };

  const handleDelete = async (postId: number) => {
      try {
          await deleteProduct(postId);
          // Remove the deleted post from the local state
          setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      } catch (error) {
          console.error('Error deleting post:', error);
      }
  };
    return (
        <div data-testid="post-list">
            {posts.map(post => (
                <PostCard
                    key={post.id}
                    post={post}
                    onLike={() => handleLike(post.id)}
                    onDislike={() => handleDislike(post.id)}
                    onDelete={() => handleDelete(post.id)}
                />
            ))}
        </div>
    );
};

export {PostList};
