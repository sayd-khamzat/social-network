import './App.css';
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import {Routes, Route} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import UserProfileContainer from "./components/Users/UserProfile/UserProfileContainer";
import Login from "./components/Login/Login";
import HeaderContainer from "./components/Header/HeaderContainer";
import {useEffect} from "react";
import {connect} from "react-redux";
import {initializedAppTC} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));

function App(props) {

    useEffect(() => {
        props.initializedApp();
    }, [])

    if (!props.initialized) {
        return <Preloader/>
    }
    return (
        <div className='app-wrapper'>
            <React.Suspense fallback={<Preloader/>}>
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
            </React.Suspense>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}

export default connect(mapStateToProps, {initializedApp: initializedAppTC})(App);
