import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

export default class IndexPage extends React.Component {
	render () {
		const { data } = this.props,
			{ edges: posts } = data.allMarkdownRemark,

			meta = {
				name: data.site.siteMetadata.title,
				slug: data.site.siteMetadata.siteUrl,
			}

		return (
			<Layout meta={meta}>
				<div>
					{posts.map(({ node: post }) => {
						return (
							<article key={post.id}>
								<header>
									<h2>
										<Link to={`/${ post.fields.slug }`}>
											{post.frontmatter.title}
										</Link>
									</h2>
									<h6>{post.frontmatter.publishDate}</h6>
								</header>
								<div>{post.excerpt}</div>
							</article>
						)
					})}
				</div>
			</Layout>
		)
	}
}

IndexPage.propTypes = {
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.array,
		}),
	}),
}

export const pageQuery = graphql`
    query IndexQuery {
        site {
            siteMetadata {
                title
                siteUrl
            }
        }
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___updateDate] }
        ) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 100)
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
