import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import Header from './header'
import Footer from './footer'

import '../scss/global.css'

const Layout = ({ children, meta, className }) => (
		<Fragment>
			<Meta {...meta} />
			<div class={'root ' + className}>
				<header>{<Header />}</header>
				{children}
				<footer>{<Footer />}</footer>
			</div>
		</Fragment>
	),
	Meta = ({ name, description, slug, image }) => {
		let siteUrl = 'https://silly-yonath-f5368a.netlify.com'

		return (
			<Helmet>
				<title>{name}</title>
				<meta name="description" content={description} />
				<link rel="canonical" href={siteUrl + slug} />

				{/* Facebook */}
				<meta property="og:url" content={siteUrl + slug} />

				<meta property="og:title" content={name} />
				<meta property="og:image" content={image} />
				<meta property="og:description" content={description} />

				{/* Twitter */}
				<meta name="twitter:url" content={siteUrl + slug} />
				<meta name="twitter:title" content={name} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={image} />
			</Helmet>
		)
	}

export default Layout
