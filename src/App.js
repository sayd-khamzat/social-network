import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Routes, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import UserProfileContainer from "./components/Users/UserProfile/UserProfileContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Login from "./components/Login/Login";
import HeaderContainer from "./components/Header/HeaderContainer";
import {useEffect} from "react";
import {connect} from "react-redux";
import {initializedAppTC} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

function App(props) {

    useEffect(() => {
        props.initializedApp();
    }, [])

    if (!props.initialized) {
        debugger
        return <Preloader/>
    }
    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path='/profile' element={<ProfileContainer/>}/>
                    <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                    <Route path='/users' element={<UsersContainer/>}/>
                    <Route path='/users/:userId?' element={<UserProfileContainer/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}

export default connect(mapStateToProps, {initializedApp: initializedAppTC})(App);
