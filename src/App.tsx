import './App.css'
import React from "react"
import Navbar from "./components/Navbar/Navbar"
import {Routes, Route, Navigate} from "react-router-dom"
import UsersContainer from "./components/Users/UsersContainer"
import UserProfileContainer from "./components/Users/UserProfile/UserProfileContainer"
import Login from "./components/Login/Login"
import HeaderContainer from "./components/Header/HeaderContainer"
import {useEffect} from "react"
import {connect} from "react-redux"
import {initializedAppTC} from "./redux/app-reducer"
import Preloader from "./components/common/Preloader/Preloader"
import {AppStateType} from "./redux/redux-store"

const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))

type PropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    initializedApp: () => void
}

const App: React.FC<PropsType & MapDispatchPropsType> = (props) => {

    useEffect(() => {
        props.initializedApp()
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
                        <Route path='/' element={<Navigate to='/profile' />} />
                        <Route path='/profile' element={<ProfileContainer/>}/>
                        <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                        <Route path='/users' element={<UsersContainer pageTitle='samurai'/>}/>
                        <Route path='/users/:userId?' element={
                            // @ts-ignore
                            <UserProfileContainer/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='*' element={<div>404 NOT FOUND</div>}/>
                    </Routes>
                </div>
            </React.Suspense>
        </div>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        initialized: state.app.initialized
    }
}

export default connect(mapStateToProps, {initializedApp: initializedAppTC})(App)
