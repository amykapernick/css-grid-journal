import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

export const BlogPostTemplate = ({ content, title, slug, tags, createDate, updateDate, siteUrl }) => {
	return (
		<article>
			<header>
				<h1>{title}</h1>
				<div>
					<time dateTime={updateDate}>{updateDate}</time>
				</div>
			</header>
			<main dangerouslySetInnerHTML={{ __html: content }}></main>
		</article>
	)
}

BlogPostTemplate.propTypes = {
	content: PropTypes.node.isRequired,
	title: PropTypes.string,
}

const BlogPost = ({ data }) => {
	const { markdownRemark: post } = data,

		blogPost = {
			content: post.html,
			title: post.frontmatter.title,
			slug: post.fields.slug,
			createDate: post.frontmatter.createDate,
			updateDate: post.frontmatter.updateDate,
			tags: post.frontmatter.tags,
			siteUrl: data.site.siteMetadata.siteUrl
		},

		meta = {
			name: post.frontmatter.title + ' | ' + data.site.siteMetadata.title,
			slug: data.site.siteMetadata.siteUrl + post.fields.slug,
		}

	return (
		<Layout meta={meta}>
			<BlogPostTemplate {...blogPost} />
		</Layout>
	)
}

BlogPost.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.object,
	}),
}

export default BlogPost

export const pageQuery = graphql`
    query BlogPostByID($id: String!) {
        site {
            siteMetadata {
                title
                siteUrl
            }
        }
        markdownRemark(id: { eq: $id }) {
            id
            fields {
                slug
            }
            html
            frontmatter {
                createDate(formatString: "DD MMM YYYY")
                updateDate(formatString: "DD MMM YYYY")
                title
                tags
            }
        }
    }
`
