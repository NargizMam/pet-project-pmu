import { CssBaseline } from '@mui/material';
import AppToolbar from './components/AppToolBar/AppToolbar.tsx';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import Register from './features/Users/Register.tsx';
import Login from './features/Users/Login.tsx';
import MainPage from './features/MainPage/MainPage.tsx';
import Footer from './components/Footer/Footer.tsx';
import MasterList from './features/Masters/MasterList.tsx';
import AdminDashBoard from './features/DashBoard/AdminDashBoard.tsx';
import BookingCalendar from './features/BookCalendar/BookingCalendar.tsx';

function App() {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <Container sx={{ marginBottom: '150px'}}>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/calendar" element={<BookingCalendar/>}/>
          <Route path="/masters" element={<MasterList/>}/>
          <Route path="/admins" element={<AdminDashBoard/>}/>
          <Route path="*" element={<h1>Not found</h1>}/>
        </Routes>
      </Container>
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default App
