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
                    <Route path='/profile' element={<Profile profilePage={props.state.profilePage}
                                                             addPost={props.addPost}
                                                             updateNewPostText={props.updateNewPostText}/>}/>
                    <Route path='/dialogs/*' element={<Dialogs dialogsData={props.state.dialogsPage.dialogsData}
                                                               messagesData={props.state.dialogsPage.messagesData}/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
