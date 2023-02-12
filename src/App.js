import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {Routes, Route} from "react-router-dom";
import Dialogs from "./components/Dialogs/Dialogs";

function App(props) {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path='/profile' element={<Profile profilePage={props.store.getState().profilePage}
                                                             dispatch={props.store.dispatch.bind(props.store)}/>}/>
                    <Route path='/dialogs/*' element={<Dialogs dialogsPage={props.store.getState().dialogsPage}
                                                               dispatch={props.store.dispatch.bind(props.store)}/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
