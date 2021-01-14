import React, { useEffect, useState } from 'react'
import "./Nav.scss";

function Nav() {
    const [show, handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false)
        });
        return () => {
            window.removeEventListener('scroll')
        }
    }, [])
    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png" alt="Netflix Logo" className="nav__logo" />
            <img src="https://occ-0-778-360.1.nflxso.net/dnm/api/v6/0RO1pLmU93-gdXvuxd_iYjzPqkc/AAAABX_rw4AsQHSZUDkLmXZ0oJiMY_FHo5H1ypuql1B-1MmzVs0KtnT8yKfBhHx3NAral02mY95osMTLF6_KNAeIKlM.png?r=f08" alt="" className="nav__avatar" />
        </div>
    )
}

export default Nav;
