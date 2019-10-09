// eslint-disable-next-line import/prefer-default-export
export const filterPostsByCategory = (posts, selectedCategory) => {
  let filteredPosts = posts;
  if (selectedCategory !== 'Accueil') {
    filteredPosts = posts.filter((currentPost) => {
      return currentPost.category === selectedCategory;
    });
  }
  return filteredPosts;
};

export const getPostBySlug = (posts, slug) => {
  // ici je pars d'une liste de poste (un tableau)
  // je veux extraire un poste (un objet du tableau) en fonction du slug
  // plutôt que d'utiliser filter qui retourne un tableau
  // j'utilise find qui fonctionne de manière similaire, cad qu'on transmet une fonction de rappel
  // dans cette fonction si on renvoie true on prend la valeur, sinon on prend pas la valeur
  // à la différence de filter, à la première valeur trouvée, on s'arrête, on récupère cette valeur
  // find : très pratique pour trouver une valeur dans un tableau
  const searchedPost = posts.find((post) => {
    return post.slug === slug;
  });
  return searchedPost;
};

export const getCategoryByLabel = (categories, label) => {
  const searchedCategory = categories.find((category) => {
    return category.label === label;
  });
  return searchedCategory;
};
