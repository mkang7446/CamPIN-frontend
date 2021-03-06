import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityForm from '../CommunityForm/CommunityForm';
import API_URL from '../../apiConfig';

const CommunityCreate = ({ loggedIn }) => {
  const initialPostData = {
    title: '',
    body: '',
    category: '',
    photo: '',
  };

  const navigate = useNavigate();

  const [newPost, setNewPost] = useState(initialPostData);

  const handleChange = (event) => {
    setNewPost((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleFileUpload = (event) => {
    setNewPost({ ...newPost, photo: event.target.files[0] });
  };

  const createPost = async (event) => {
    event.preventDefault();
    const formData = new FormData(document.getElementById('form-'));

    try {
      const response = await fetch(API_URL + 'posts/', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 201) {
        navigate('/posts');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '50px', textAlign: 'center', marginTop: '20px' }}>
        New Post
      </h1>
      <CommunityForm
        handleSubmit={createPost}
        handleChange={handleChange}
        handleFileUpload={handleFileUpload}
        formData={createPost}
      />
    </div>
  );
};

export default CommunityCreate;
