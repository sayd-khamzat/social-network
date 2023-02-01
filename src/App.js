import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Dialogs from "./components/Dialogs/Dialogs";

function App() {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <Routes>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/dialogs' element={<Dialogs/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
