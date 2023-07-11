import * as api from '../api';

// Action Creators
export const getPosts = () => async(dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: 'FETCH_ALL', payload: data })
        
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = () => async (dispatch) => {
    try {
        //makes post api request to backend server
        const { data } = await api.createPost();
        dispatch({type: 'CREATE', payload: data});
        
    } catch (error) {
        console.log(error.message);
    }
}