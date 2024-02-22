import axios from "axios";

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


const BASE_URL = "http://localhost:8080";

export const addPost = async (postData: Post): Promise<Post> => {
    try {
        const response = await axios.post<Post>(`${BASE_URL}/posts`, postData);
        return response.data;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};

export const getPosts = async (): Promise<Post[]> => {
    try {
        const response = await axios.get<Post[]>(`${BASE_URL}/posts`);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const updateLike = async (postId: number) => {
    try {
        const response1 = await axios.get(`${BASE_URL}/posts/${postId}`);
        response1.data.like+=1
        const response = await axios.patch(`${BASE_URL}/posts/${postId}`,response1.data);
        return response.data;
    } catch (error) {
        console.error('Error updating like:', error);
        throw error;
    }
};

export const updateDislike = async (postId: number) => {
    try {
        const response1 = await axios.get(`${BASE_URL}/posts/${postId}`);
        if(response1.data.dislike!<0){
            response1.data.dislike-=1
            }
        const response = await axios.patch(`${BASE_URL}/posts/${postId}`,response1.data);
     
        return response.data;
    } catch (error) {
        console.error('Error updating dislike:', error);
        throw error;
    }
};

export const deleteProduct = async (postId: number) => {
    try {
        const response = await axios.delete(`${BASE_URL}/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};