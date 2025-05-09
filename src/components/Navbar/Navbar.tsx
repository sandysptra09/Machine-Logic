'use client'

import React from 'react'

// import components from heroui
import {
    Navbar as Navbars,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
} from "@heroui/react"

export const AcmeLogo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default function Navbar() {

    // initialize state for menu open/close
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        {
            title: "Beranda",
            path: "/",
        },
        {
            title: "Slot Machine",
            path: "/slot-machine",
        },
        {
            title: "Gate Puzzle",
            path: "/gate-puzzle",
        },

    ];

    return (
        <Navbars onMenuOpenChange={setIsMenuOpen} className='bg-black text-white p-2'>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <h2 className="text-white font-semibold">
                        <span className="font-normal">Machine</span>Logic.
                    </h2>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-8" justify="center">
                {menuItems.map((item, index) => (
                    <NavbarItem key={index}>
                        <Link className='text-sm text-white hover:text-gray-300 transition-all duration-200' href={item.path}>
                            {item.title}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarMenu className='bg-black'>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={index} className='p-4 mt-4'>
                        <Link className="w-full text-sm text-white" href={item.path}>
                            {item.title}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbars>
    )
}
