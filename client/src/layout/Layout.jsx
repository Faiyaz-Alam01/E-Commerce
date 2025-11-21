import Footer from '@/Components/Footer'
import Topbar from '@/Components/Topbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<div className='min-h-screen flex flex-col'>
			<Topbar />
			<main className='flex-1'>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default Layout
