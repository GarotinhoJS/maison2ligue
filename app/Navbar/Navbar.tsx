"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './Navbar.css';
import { Navigation } from "./Navigation";

const Navbar = () => {


  return (
    <div>
      <nav className= "Navbar" id="navbar">
        <h1 className='navbar-logo'>
          M2LIGUE
        </h1>
        <ul className='stylenav'>
          {Navigation.map((item, index) => (
            <li key={index}>
              <Link href={item.cName}>{item.titre}</Link>
            </li>
          ))}
          <li>
            <Link href="/api/auth/signin">Se connecter</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
