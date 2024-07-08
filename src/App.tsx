/*Libs*/
import React, {useRef, useState} from 'react';
import {Route, Routes} from "react-router-dom";

/*Styles*/
import "./styles.scss"
import "./App.scss";
import 'primeicons/primeicons.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";

/*Components*/
import {Sidenav} from "./layout/SideNav/Sidenav";
import {Navbar} from "./layout/Navbar/Navbar";
import {Footer} from "./layout/Footer/Footer";
import {Breadcrumb} from "./layout/Breadcrumb/Breadcrumb";
import {Products} from "./pages/Products/Products";
import {ProductsAdmin} from "./pages/ProductsAdmin/ProductsAdmin";
import {ToastProvider} from "./utils/ToastProvider";

const App: React.FC = () => {

    const [isNavbarExpanded, setIsNavbarExpanded] = useState(true);

    const toggleNavbar = (toggle: boolean) => {
        setIsNavbarExpanded(toggle);
    };

    return (
        <>
            <Navbar/>
            <div className="app-container">
                <Sidenav onToggle={toggleNavbar}/>
                <div className={`app-header ${isNavbarExpanded ? 'expanded' : ''}`}>
                    <Breadcrumb/>
                </div>
                <div className={`app-frame ${isNavbarExpanded ? 'expanded' : ''}`}>
                    <ToastProvider>
                        <Routes>
                            <Route path={'/products'} element={<Products/>}/>
                            <Route path={'/admin/products'} element={<ProductsAdmin/>}/>
                        </Routes>
                    </ToastProvider>
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default App;
