/*Libs*/
import React, {useState} from 'react';
import {Link} from "react-router-dom";

/*Styles*/
import logo from '../../favicon.ico';
import styles from './sidenav.module.scss';

/*Data*/
import {SIDENAV_ITEMS} from "./SIDENAV_ITEMS";

interface NavbarProps {
    onToggle: (toggle: boolean) => void;
}

export const Sidenav: React.FC<NavbarProps> = ({onToggle}) => {

    const screenWith = window.innerWidth;
    const [isNavbarIsOpen, setIsNavbarIsOpen] = useState<boolean>(true);
    const [isNavbarIsPinned, setIsNavbarIsPinned] = useState<boolean>(true);

    const canExpandOnHover = (event: any, isExpand: boolean) => {

        event.preventDefault();
        if (isNavbarIsPinned || screenWith <= 768) { return false; }
        setIsNavbarIsOpen(isExpand);
        onToggle(isExpand);

    }

    const sideNavItem = () => {

        let sideNavItems = [];

        for (const item of SIDENAV_ITEMS) {
            sideNavItems.push((
                <li key={item.id}>
                    <Link to={item.link}>
                        <div className={styles.liContainer}>
                            <i className={`pi pi-${item.icon} ${styles.menuIcon}`}></i>
                            <span className={styles.menuItem} data-expanded-only={isNavbarIsOpen ? 'true' : 'false'}>{item.labels.en}</span>
                        </div>
                    </Link>
                </li>
            ))
        }

        return sideNavItems;
    }

    return (
        <>
            <div className={`${styles.sidenav} ${isNavbarIsOpen ? styles.expanded + ' sidenav-expanded' : ''} ${isNavbarIsPinned ? 'sidenav-pinned' : ''}`} onMouseOver={(event) => canExpandOnHover(event, true)} onMouseLeave={(event) => canExpandOnHover(event, false)}>
                <i className={`pi pi-bookmark ${styles.pinnedIcon} ${isNavbarIsPinned ? styles.active : ''}`}
                   onClick={() => setIsNavbarIsPinned((prevState) => !prevState)}
                    data-expanded-only={isNavbarIsOpen ? 'true' : 'false'}>
                </i>
                <div className={styles.titleContainer}>
                    <img src={logo} height="25" alt={"logo React"}/>
                    <div className={styles.title} data-expanded-only={isNavbarIsOpen ? 'true' : 'false'}>
                        <span className={styles.first}>Alten Shop</span>
                    </div>
                </div>
                <ul>
                    {sideNavItem()}
                </ul>
            </div>
        </>
    );
};