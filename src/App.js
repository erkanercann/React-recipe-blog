import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LightBox from './components/LightBox';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import Management from './pages/Management';
import CategoryShow from './pages/CategoryShow';
import './scss/main.scss';
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/:category/:id" element={<DetailPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/management" element={<Management />}></Route>
                <Route path="/:category" element={<CategoryShow />}></Route>
            </Routes>
            <LightBox />
        </>
    );
}
export default App;
