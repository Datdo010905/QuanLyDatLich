import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header1 from './component/header1';
import Header from './component/header';
import About from './component/about';
import Footer from './component/footer';
import Product from './component/product';
import Datlich from './component/datlich';
import SlideShow from './component/slideshow';
import Chatbot1 from './component/chatbot1';
import Chatbot2 from './component/chatbot2';
import { Route, Routes, Outlet } from 'react-router-dom';
import Menu from './component/menu';
import Toptho from './component/toptho';
import Login from './pages/login';
import Forgot from './pages/forgot';
import Signup from './pages/signup';

const MainLayout = ({ menus }: { menus: any[] }) => {
  return (
    <>
      <body>
        <Header1 />
        <Header />
        <Menu menus={menus} />

        <div id="container">
          <SlideShow />
          <div className="clear"></div>
          <Datlich />
          <Outlet />
          <div className="clear"></div>
        </div>
        <div className="clear"></div>
        <Footer />
        <Chatbot1 />
        <Chatbot2 />
      </body>
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
          <Route path="/" element={<Product />} />
          <Route path="/home" element={<Product />} />
          <Route path="/toptho" element={<Toptho />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    );
  };
};

export default App;
