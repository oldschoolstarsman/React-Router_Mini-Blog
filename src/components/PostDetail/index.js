import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import posts from 'src/data/posts';
import categories from 'src/data/categories';
import { getPostBySlug, getCategoryByLabel } from 'src/data/selectors';

// const PostDetail = ({ match }) => {
//   console.log(match.params.slug);
const PostDetail = ({
  match: {
    params: {
      slug,
    },
  },
}) => {
  // ici j'ai accès au slug, je vais chercher à récuperer un post selon son slug
  // je fais appel à mes selector pour manipuler mes données de manière réutilisable
  const postContent = getPostBySlug(posts, slug);
  const postCategory = getCategoryByLabel(categories, postContent.category);
  return (
    <article className="articles">
      <h1 className="articles-title">{postContent.title}</h1>
      <p className="articles-content">{postContent.content}</p>
      <footer className="article-footer">
        <Link to={postCategory.route} className="article-button">Retour à la catégorie</Link>
      </footer>
    </article>
  );
};

PostDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PostDetail;
