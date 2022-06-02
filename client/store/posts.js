import axios from 'axios';


const CREATE_POST = 'CREATE_POST'

const _createPost = (post) => {
    return {
      type: CREATE_POST,
      post
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

const posts = (state = [], action) => {
   if(action.type === CREATE_POST) {
       return [...state, action.post]
   } 
   return state;
}

export default posts;