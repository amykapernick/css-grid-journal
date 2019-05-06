import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

export default class IndexPage extends React.Component {
	render() {
		const { data } = this.props,
			{ edges: posts } = data.allMarkdownRemark,
			meta = {
				name: data.site.siteMetadata.title,
				slug: data.site.siteMetadata.siteUrl,
			}

		return (
			<Layout meta={meta}>
				<main class="grid">
					{posts.map(({ node: post }) => {
						return (
							<article key={post.id}>
								<header>
									<h2>
										<Link to={'/' + post.fields.slug}>
											{post.frontmatter.title}
										</Link>
									</h2>
									<time dateTime={post.frontmatter.updateDate}>
										{post.frontmatter.updateDate}
									</time>
								</header>
								<div>{post.excerpt}</div>
							</article>
						)
					})}
				</main>
			</Layout>
		)
	}
}

export const pageQuery = graphql`
	query IndexQuery {
		site {
			siteMetadata {
				title
				siteUrl
			}
		}
		allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___updateDate] }) {
			edges {
				node {
					id
					excerpt(pruneLength: 30)
					fields {
						slug
					}
					frontmatter {
						title
						createDate(formatString: "DD MMM YYYY")
						updateDate(formatString: "DD MMM YYYY")
						tags
					}
				}
			}
		}
	}
`
