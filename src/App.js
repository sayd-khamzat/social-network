import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Dialogs from "./components/Dialogs/Dialogs";

function App(props) {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path='/profile' element={<Profile postsData={props.state.profilePage.postsData}
                                                             addPost={props.addPost}/>}/>
                    <Route path='/dialogs/*' element={<Dialogs dialogsData={props.state.dialogsPage.dialogsData}
                                                               messagesData={props.state.dialogsPage.messagesData}/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
