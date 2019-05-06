import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

import '../scss/grid.css'

import Tag from '../img/tag.svg'

export const NoteTemplate = ({ content, title, slug, tags, createDate, updateDate, siteUrl }) => {
	return (
		<Fragment>
			<main>
				<article>
					<header>
						<h1>{title}</h1>
						<time dateTime={updateDate}>{updateDate}</time>
					</header>
					<main dangerouslySetInnerHTML={{ __html: content }} />
				</article>
				<aside>
					<h3>Created On</h3>
					<time dateTime={createDate}>{createDate}</time>
					<h3>Tags</h3>
					<ul>
						{tags.map(tag => (
							<li key={tag}>
								{<Tag />}
								<a>{tag}</a>
							</li>
						))}
					</ul>
				</aside>
			</main>
		</Fragment>
	)
}

const Note = ({ data }) => {
	const { markdownRemark: note } = data,
		{ edges: notes } = data.allMarkdownRemark,
		noteDetails = {
			content: note.html,
			title: note.frontmatter.title,
			slug: note.fields.slug,
			createDate: note.frontmatter.createDate,
			updateDate: note.frontmatter.updateDate,
			tags: note.frontmatter.tags,
			siteUrl: data.site.siteMetadata.siteUrl,
		},
		meta = {
			name: note.frontmatter.title + ' | ' + data.site.siteMetadata.title,
			slug: data.site.siteMetadata.siteUrl + note.fields.slug,
		}

	return (
		<Layout meta={meta} className="app">
			<section>
				<nav>
					{notes.map(({ node: note }) => {
						return (
							<article key={note.id}>
								<header>
									<h2>
										<Link to={'/' + note.fields.slug}>
											{note.frontmatter.title}
										</Link>
									</h2>
									<time dateTime={note.frontmatter.updateDate}>
										{note.frontmatter.updateDate}
									</time>
								</header>
								<div>{note.excerpt}</div>
							</article>
						)
					})}
				</nav>
			</section>
			<NoteTemplate {...noteDetails} />
		</Layout>
	)
}

export default Note

export const pageQuery = graphql`
	query NoteByID($id: String!) {
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
