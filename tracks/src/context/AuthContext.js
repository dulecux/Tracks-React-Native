import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from 'react-native';
import { navigate } from "../navigationRef";


const authReducer = (state, action) => {

    switch(action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signup':
            return { errorMessage: '', token: action.payload };    
        default:
            return state;
    }
};

const signup = (dispatch) => {

    return async ({ email, password }) => {
        try {
            const response = await trackerApi.post('/signup', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signup', payload: response.data.token });

            navigate('TrackList');
        } catch (err) {
            dispatch({ type: 'add_error', payload: 'Something went wrong with sign up'});
        }
    };
};

const signin = (dispatch) => {

    return ({ email, password }) => {
        // make api request to sign in with that email and password

        // if we sign in, modify our state, and say that we are authenticated

        //if signing in fails, we probably need to reflect an error message somewhere
    };
};

const signout = (dispatch) => {

    return () => {
        //somehow sign out
    };
};

export const { Context, Provider} = createDataContext(
    authReducer, 
    { signup, signin, signout }, 
    { token: null, errorMessage: '' }
    );