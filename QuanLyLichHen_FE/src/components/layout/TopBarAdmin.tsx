import React from "react";

const TopBarAdmin = () => {
    return (
        <>
            <header className="topbar">
                <button id="toggleSidebar" className="icon-btn"><i className="fas fa-bars"></i></button>
                <div className="topbar-right">
                    <input id="adminSearch" placeholder="Tìm: nhập ID cần tìm" aria-label="Tìm kiếm" />
                    <button className="icon-btn"><i className="fas fa-search"></i></button>
                </div>
            </header>
        </>
    );
};

export default TopBarAdmin;