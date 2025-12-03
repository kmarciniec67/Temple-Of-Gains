import React, { useState, useEffect } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import styles from "./Navbar.module.css"
import { IconContext } from "react-icons"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import { SidebarData } from "./SidebarData";
import { useTheme } from "../../../context/ThemeContext";

function NavBar() {
    const [sidebar, setSidebar] = useState(false);
    const { isDark, toggle } = useTheme();
    const navigate = useNavigate();

    // sidebar controls
        const toggleSidebar = () => setSidebar((s) => !s);
        const closeSidebar = () => setSidebar(false);

            // toggle a class on the document body so pages can react (push content aside)
            useEffect(() => {
                    if (typeof document !== "undefined" && document.body && document.body.classList) {
                        if (sidebar) document.body.classList.add("sidebar-open");
                        else document.body.classList.remove("sidebar-open");
                    }

                    return () => {
                        if (typeof document !== "undefined" && document.body && document.body.classList) {
                            document.body.classList.remove("sidebar-open");
                        }
                    };
            }, [sidebar]);
    const handleLogout = async () => {
        try {
            await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        } catch (err) {
            console.error("Błąd podczas wylogowywania:", err);
        } finally {
            localStorage.removeItem('user');
            navigate('/login');
        }
    };

    return (
        <>
            <IconContext.Provider value={{ size: "1.5em" }}>
                <header className={styles.navbar}>
                    <div className={styles.navBarContainer}>
                        {/* top-left hamburger */}
                        <button type="button" className={styles.menuBars} onClick={toggleSidebar} aria-label="Open menu">
                            <FaIcons.FaBars className={styles.menuBarsIcon} />
                        </button>
                        <h2 className={styles.navbarTitle}>Temple of Gains</h2>
                        <button className={`${styles.toggleThemeButton} ${styles.menuBars}`}
                            aria-label="Toggle theme"
                            onClick={toggle}
                            aria-pressed={isDark}
                            title={isDark ? "Przełącz na jasny" : "Przełącz na ciemny"}
                        >
                            {isDark ? <AiIcons.AiOutlineMoon /> : <AiIcons.AiOutlineSun />}
                        </button>
                    </div>
                </header>

                <nav className={sidebar ? `${styles.navMenu} ${styles.navMenuActive}` : styles.navMenu}>
                    <ul className={styles.navMenuItems}>
                        <li className={styles.navbarToggle}>
                            <button type="button" className={styles.menuBars} onClick={closeSidebar} aria-label="Close menu">
                                <AiIcons.AiOutlineClose className={styles.closeIcon} />
                            </button>
                        </li>

                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={styles[item.cName]}>
                                    <Link to={item.path} className={styles.navLink} onClick={closeSidebar}>
                                        {/* keep icon rendered if provided in SidebarData */}
                                        {item.icon && <span className={styles.icon}>{item.icon}</span>}
                                        <span className={styles.title}>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                        <button className={`${styles.menuBars} ${styles.logoutButton}`} onClick={handleLogout}>Wyloguj się</button>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}
    
export default NavBar;