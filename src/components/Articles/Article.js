// imports npm
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// imports locaux

// composant
const Article = ({
  title,
  category,
  excerpt,
  slug,
}) => (
  // je mets ma classe article sur le lien englobant chaque article puisque j'ai besoin de cette classe sur le flex-item cad l'enfant direct du flex container
  <Link to={`/post/${slug}`} className="article">
    <article>
      <h2 className="article-title">{title}</h2>
      <h3 className="article-category">{category}</h3>
      <p>
        {excerpt}
      </p>
    </article>
  </Link>
);

Article.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

// export
export default Article;
