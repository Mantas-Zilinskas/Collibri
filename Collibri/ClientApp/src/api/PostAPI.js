import axios from 'axios';

export const createPost = (post, addNewPost) => {

    fetch('/v1/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: post
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            return response.json();
        })
        .then(data => {
            console.log('Post created successfully:', data);
            addNewPost(data);
        })
        .catch(error => {
            console.error('Error creating post:', error.message);
        });
}

export const deleteAllPostsInSection = (sectionId) => {
    fetch(`/v1/posts/in-section?sectionId=${sectionId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete all posts');
            }
        })
        .then(() => {
            console.log('All posts deleted successfully:');
        })
        .catch(error => {
            console.error('Error deleting all posts:', error.message);
        });
}

export const fetchPosts = (sectionId, setPosts) => {
  axios.get(`/v1/posts?sectionId=${sectionId}`)
    .then(response => setPosts(response.data))
    .catch(error => {
      console.log(error.message);
    })
}

export const deletePost = (postId) => {
  return axios.delete(`/v1/posts?postId=${postId}`)
    .then(response => {
      if(response.data) {
        return response.data;
      } else {
        throw new Error("Unsuccessful request to delete.");
      }
    })
}

export const updatePost = (postId, postToUpdate) => {
  axios.put(`/v1/posts?postId=${postId}`, postToUpdate)
    .then()
    .catch(error => console.error('Error updating post: ', error))
}
