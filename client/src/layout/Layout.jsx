import Footer from '@/Components/Footer'
import Topbar from '@/Components/Topbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = ({children}) => {
  return (
	<div>
		<Topbar />
		<main>
			<Outlet />
		</main>
		<Footer />
	</div>
  )
}

export default Layout
