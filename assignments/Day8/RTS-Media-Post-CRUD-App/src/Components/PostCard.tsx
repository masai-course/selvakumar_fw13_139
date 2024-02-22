// Components/PostCard.tsx
import React from 'react';

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

interface PostCardProps {
    post: Post;
    onLike: () => void;
    onDislike: () => void;
    onDelete: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onDislike, onDelete }) => {
    return (
        <div className="post-card">
            <img src={post.image} alt={post.name} className="post-image" />
            <p className="input.post-name">{post.name}</p>
            <p className="input.post-image">{post.author}</p>
            <p className="input.post-author">{post.content}</p>
            <p className="input.post-content">{post.category}</p>
            <button onClick={onLike} data-testid="like-button">Like</button>
            <button onClick={onDislike} data-testid="dislike-button">Dislike</button>
            <p className="post-like">{post.like}</p>
            <p className="post-dislike">{post.dislike}</p>
            <button onClick={onDelete} data-testid="delete-button">Delete</button>
        </div>
    );
};

export {PostCard};
