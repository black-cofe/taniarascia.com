import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { slugify } from '../utils/helpers'

export default function Guides({ data, frontPage, includeTime }) {
  const LinkType = ({ guide, children }) =>
    guide.slug ? (
      <Link to={guide.slug} className="image-link">
        {children}
      </Link>
    ) : (
      <a href={guide.path} className="image-link">
        {children}
      </a>
    )

  return (
    <div className={frontPage ? 'guides front-page' : 'guides'}>
      {data.map((guide) => {
        return (
          <div className="guide" key={guide.id}>
            <div>
              <LinkType guide={guide}>
                <h2>{guide.title}</h2>
                {includeTime && <time>{guide.date}</time>}
                {guide.tags && (
                  <div className="tags" style={{ marginBottom: '1rem' }}>
                    {guide.tags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/tags/${slugify(tag)}`}
                        className={`tag-${tag}`}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </LinkType>
              {guide.description && <p>{guide.description}</p>}
            </div>
            <div>
              <LinkType guide={guide}>
                {guide.staticThumbnail ? (
                  <img
                    src={guide.staticThumbnail}
                    alt={guide.id}
                    height="50"
                    width="50"
                  />
                ) : (
                  <Img fixed={guide.thumbnail} />
                )}
              </LinkType>
            </div>
          </div>
        )
      })}
    </div>
  )
}
