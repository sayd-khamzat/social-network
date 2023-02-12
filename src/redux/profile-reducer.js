const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

const initialState = {
    postsData: [
        {id: 1, message: 'Post 1', likesCount: 10},
        {id: 2, message: 'Post 2', likesCount: 15},
        {id: 3, message: 'Post 3', likesCount: 30}
    ],
    newPostText: 'New Post'
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: state.postsData.length + 1,
                message: state.newPostText,
                likesCount: 15
            }
            state.postsData.push(newPost);
            state.newPostText = '';
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}

export const addPostAC = () => ({type: ADD_POST});
export const updateNewPostTextAC = (newText) => ({type: UPDATE_NEW_POST_TEXT, newText});

export default profileReducer;