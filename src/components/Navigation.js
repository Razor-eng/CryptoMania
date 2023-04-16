import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav className='md:w-[40%]  mt-16 flex xs:w-[40%] justify-around align-middle border border-cyan rounded-lg'>
            <NavLink
                to="/"
                end
                className={
                    ({ isActive }) => {
                        return `w-full text-base text-center font-nunito m-2.5 border-0 cursor-pointer rounded capitalize font-semibold
                        ${isActive ? 'bg-cyan text-gray-300' : 'bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300'}
                        `
                    }
                }
            >
                crypto
            </NavLink>
            <NavLink
                to="/trending"
                className={
                    ({ isActive }) => {
                        return `w-full text-base text-center font-nunito m-2.5 border-0 cursor-pointer rounded capitalize font-semibold
                        ${isActive ? 'bg-cyan text-gray-300' : 'bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300'}
                        `
                    }
                }
            >
                trending
            </NavLink>
            <NavLink
                to="/saved"
                className={
                    ({ isActive }) => {
                        return `w-full text-base text-center font-nunito m-2.5 border-0 cursor-pointer rounded capitalize font-semibold
                        ${isActive ? 'bg-cyan text-gray-300' : 'bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300'}
                        `
                    }
                }
            >
                saved
            </NavLink>
        </nav>
    )
}

export default Navigation