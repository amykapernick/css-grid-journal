module.exports = {
	siteMetadata: {
		title: 'My Notebook',
		description: 'Notebook App that showcases CSS Grid',
		siteUrl: 'https://silly-yonath-f5368a.netlify.com',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sass',
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				include: './src/img/',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/img`,
				name: 'images',
			},
		},
		{
			resolve: `gatsby-plugin-google-tagmanager`,
			options: {
				id: 'GTM-WW45VBB',
				includeInDevelopment: true,
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/notes`,
				name: 'markdown-pages',
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							showCaptions: true,
							maxWidth: 1000,
							widthWebp: true,
						},
					},
					{
						resolve: `gatsby-remark-prettier`,
						options: {
							usePrettierrc: true,
						},
					},
				],
			},
		},
	],
}
