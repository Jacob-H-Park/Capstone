import axios from 'axios';

const SET_POSTS = "SET_POSTS"
const CREATE_POST = 'CREATE_POST'
const DELETE_POST = 'DELETE_POST'
const UPDATE_POST = 'UPDATE_POST'

const _setPost = (posts) => {
    return {type: SET_POSTS, posts}
}

const _createPost = (post) => {
    return {
      type: CREATE_POST,
      post
    }
}

const _deletePost = (postId) => {
   return {
      type: DELETE_POST,
      postId 
   } 
}

const _updatePost = (post) => {
    return {
       type: UPDATE_POST,
       post 
    }
}


export const loadPosts = () => {
  return async(dispatch) => {
     try {
         const token = window.localStorage.getItem("token");
         if(token) {
             const {data} = await axios.get('/api/posts', {
                 headers: {
                     authorization: token,
                 }
             })
             dispatch(_setPost(data))
         }
     } catch (ex) {
        console.log(ex) 
     }
  }
}


export const createPost = post => {
    return async (dispatch) => {
        try {
           const token = window.localStorage.getItem("token");
           if(token) {
               const { data } = await axios.post('/api/posts', post, {
                   headers: {
                       authorization: token,
                   }
               });
               dispatch(_createPost(data))
           } 
        } catch (ex) {
           console.log(ex) 
        }
    }
}

export const deletePost = (post) => {
    return async (dispatch) => {
        try {
           const token = window.localStorage.getItem("token");
           if(token) {
               await axios.delete(`/api/posts/${post.id}`, {
                   headers: {
                       authorization: token,
                   }
               })
           } 
           dispatch(_deletePost(post));
        } catch (ex) {
           console.log(ex) 
        } 
    }
}

export const updatePost = (postId, post) => {
    return async (dispatch) => {
       try {
           const token = window.localStorage.getItem("token");
           if(token) {
               const {data} = await axios.put(`/api/posts/${postId}`, post, {
                   headers: { 
                       authorization: token 
                  }
               })
               dispatch(_updatePost(data))
           }
       } catch (ex) {
           console.log(ex)
       }
    }
}



const posts = (state = [], action) => {
   if(action.type === SET_POSTS) {
      return action.posts;
   }
   if(action.type === CREATE_POST) {
       return [...state, action.post]
   } 
   if (action.type === DELETE_POST) {
       return [...state.filter((post) => post.id !== action.post.id)];
   }
   if (action.type === UPDATE_POST) {
       return state = state.map(post => post.id === action.post.id ? action.post : post)
   }
   return state;
}

export default posts;