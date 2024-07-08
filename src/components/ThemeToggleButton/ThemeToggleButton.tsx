import styles from "./themeToggleButton.module.scss";
import {useState} from "react";

export const ThemeToggleButton = () => {

    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

    return (
        <>
            <div className={styles.switchModeContainer} title="Switch mode" onClick={() => setIsDarkMode((prevState) => !prevState)}>
                <input type="checkbox" className={styles.checkbox}/>
                <label htmlFor="toggle" className={styles.switch}></label>
            </div>
        </>
    );
};