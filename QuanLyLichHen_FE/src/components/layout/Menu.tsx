import { Link } from "react-router-dom";
import React from "react";
interface MenuType {
  url: string;
  name: string;
}
interface MenuProps {
  menus: MenuType[];
}
//Function Component 
const Menu: React.FC<MenuProps> = ({ menus }) => {
  return (
    <div id="menu">
      <div id="menu-item">
        <ul>
          <li>
            <div> 
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
              </svg>
            </div>
            <ul>
              <li><Link className="me_item" to="/toptho">Top thợ 30Shine</Link></li>
              <li><Link className="me_item" to="/about">Về 30Shine</Link></li>       
              <li><a className="me_item" href="#timmap">30Shine gần nhất</a></li>
              <li><a className="me_item" href="#nucuoidv">Nụ cười dịch vụ</a></li>
              <li><a className="me_item" href="#">Lên đầu trang</a></li>
              <li><a className="me_item" href="#support">Xuống cuối trang</a></li>
            </ul>
          </li>
          
          {/* Lặp mảng menus động */}
          {menus.map((x: MenuType, index: number) => (
            <li key={index}>
              <Link to={x.url}>{x.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;