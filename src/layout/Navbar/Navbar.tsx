import styles from "./navbar.module.scss";
import {ThemeToggleButton} from "../../components/ThemeToggleButton/ThemeToggleButton";
import {Button} from 'primereact/button';

export const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.actions}>
                <ThemeToggleButton/>
                <div className={styles.userButton}>
                    <span>John Doe</span>
                    <Button icon="pi pi-user" rounded outlined severity="info" aria-label="User"/>
                </div>
            </div>
        </div>
    );
};