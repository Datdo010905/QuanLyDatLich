import React from "react";
import TopBarAdmin from "./TopBarAdmin";
import Sidebar from "./Sidebar";
import { Route, Routes, Outlet } from 'react-router-dom';
import '../../assets/css/admin.css';

const AdminLayout = () => {
    return (
        <>
            <div className="admin-layout">
                <Sidebar />
                <main className="main">
                    <TopBarAdmin />
                    <section className="content">
                        <Outlet />
                    </section>
                </main>
            </div>
        </>
    );
};

export default AdminLayout;
