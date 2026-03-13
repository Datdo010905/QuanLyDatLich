import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
//import css
import './assets/css/style.css';

//import layout
import TopBar from './components/layout/TopBar';
import Header from './components/layout/Header';
import Menu from './components/layout/Menu';
import Footer from './components/layout/Footer';
import Chatbot1 from './components/ui/Chatbot1';
import Chatbot2 from './components/ui/Chatbot2';

//import pages

import HomePage from './pages/HomePage';
import About from './pages/AboutPage';
import Toptho from './pages/TopthoPage';
import Login from './pages/LoginPage';
import Forgot from './pages/ForgotPage';
import Signup from './pages/SignupPage';
import DatLichPage from './pages/DatLichPage';
import LichSuPage from './pages/LichSuPage';
import DichVuDetailsPage from './pages/DichVuDetailsPage';

const MainLayout = ({ menus }: { menus: any[] }) => {
  return (
    <>
      <TopBar />
      <Header />
      <Menu menus={menus} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Chatbot1 />
      <Chatbot2 />
    </>
  );
};

class App extends React.Component<any, any> {
  menus = [
    { url: "/home", name: "Trang chủ"},
    { url: "/toptho", name: "Top thợ" },
    { url: "/about", name: "Về 30Shine" },
    { url: "#timmap", name: "30Shine gần nhất", href: "#timmap" },
    { url: "#nucuoidv", name: "Nụ cười dịch vụ", href: "#nucuoidv" },
    { url: "#cuocthi", name: "Cuộc thi 30Shine", href: "#cuocthi" },
    { url: "#saotoasang", name: "Sao toả sáng", href: "#saotoasang" },
  ];
  render(): React.ReactNode {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<MainLayout menus={this.menus} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/toptho" element={<Toptho />} />
          <Route path="/about" element={<About />} />
          <Route path="/datlich" element={<DatLichPage />} />
          <Route path="/lichsu" element={<LichSuPage />} />
          <Route path="/dichvuchitiet" element={<DichVuDetailsPage />} />
        </Route>

      </Routes>
    );
  };
};

export default App;