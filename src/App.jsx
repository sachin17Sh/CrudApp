import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './pages/signUp/SignUp';
import SignIn from './pages/signIn/SignIn';
import Home from './pages/home/Home'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
  );
};

export default App;
