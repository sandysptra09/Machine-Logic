'use client'

import React from 'react'
import { FaTwitter, FaLinkedinIn, FaGoogle } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className="max-w-5xl mx-auto bg-black text-gray-400 pt-16 pb-8 px-6">
            <div className="grid md:grid-cols-2 gap-12">

                <div className="md:col-span-1">
                    <h2 className="text-white text-2xl font-semibold mb-4">
                        <span className="font-normal">Machine</span>Logic.
                    </h2>
                    <p className="text-sm">
                        Jelajahi dunia logika Boolean dengan mesin slot interaktif yang seru. Uji kemampuan berpikir
                        logismu dan pelajari operasi logika sambil bermain!.
                    </p>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <ul className="space-y-2">
                            <li>Beranda</li>
                            <li>Kuis</li>
                            <li>Papan Score</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold italic mb-2">Lorem</h4>
                        <p className="text-sm">
                            Commodo augue cras facilisis viverra ut egestas mauris tellus viverra.
                            Nam sed risus ornare lacinia eu.
                        </p>
                    </div>
                </div>


            </div>

            <hr className="border-t border-gray-700 my-8 max-w-5xl mx-auto" />

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                <p>&copy;  MachineLogic. All Rights Reserved.</p>
                <div className="flex gap-4 text-white text-lg">
                    <FaTwitter className="hover:text-gray-400 cursor-pointer" />
                    <FaLinkedinIn className="hover:text-gray-400 cursor-pointer" />
                    <FaGoogle className="hover:text-gray-400 cursor-pointer" />
                </div>
            </div>
        </footer>
    )
}
