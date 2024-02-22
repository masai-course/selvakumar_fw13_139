// AddPost.tsx

import React, { useState } from 'react';
import {Navbar} from '../Components/Navbar';
import { addPost } from '../api';

// Define the Post type
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


const AddPost: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        author: '',
        image: '',
        content: '',
        category: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
          // Create a new Post object with the formData and default values for id, like, and dislike
          const postData: Post = {
              ...formData,
              id: 0, // Set to 0 or null, assuming the server generates the ID
              like: 0, // Set to 0 initially
              dislike: 0, // Set to 0 initially
          };
          await addPost(postData);
          // Reset form data
          setFormData({
              name: '',
              author: '',
              image: '',
              content: '',
              category: ''
          });
      } catch (error) {
          console.error('Error adding post:', error);
      }
  };
  

    return (
        <div>
            <Navbar pageName="Add Post Page" />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="post-name"
                    required
                />
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="post-image"
                    required
                />
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Author"
                    className="post-author"
                    required
                />
                <input
                    type="text"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Content"
                    className="post-content"
                    required
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="post-category"
                    required
                >
                    <option value="">Select Category</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JS">JS</option>
                    <option value="React">React</option>
                </select>
                <button type="submit" className="submit-form">Add Post</button>
            </form>
        </div>
    );
};

export {AddPost};
