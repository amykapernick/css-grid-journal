import React, { Fragment } from 'react'
import { Link } from 'gatsby'

const Footer = () => (
	<Fragment>
		<nav>
			<Link to="/">Home</Link>
			<Link to="/contact">Contact Us</Link>
			<Link to="/support">Support</Link>
			<Link to="/pricing">Pricing</Link>
		</nav>
	</Fragment>
)

export default Footer
