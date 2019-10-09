// imports npm
import React from 'react';
import PropTypes from 'prop-types';
// NavLink, comme le composant Link permet de placer des liens qui, au clic, vont faire un pushState et ajouter un élement à la pile de l'historique
// sauf qu'en plus NavLink gère une classe active quand l'url actuelle matche avec le chemin du lien
// la prop exact permet de faire la comparaison exactement (sans ça la comparaison se fait sur le début de la chaine)
import { NavLink } from 'react-router-dom';

// imports locaux
import './menu.scss';

// composant
const Menu = ({ categories }) => {
  return (
    <header>
      <nav className="nav">
        {
          categories.map((currentCategorie) => {
            return (
              <NavLink
                exact
                to={currentCategorie.route}
                key={currentCategorie.label}
                className="nav-link"
                activeClassName="nav-link--active"
              >
                {currentCategorie.label}
              </NavLink>
            );
          })
        }
      </nav>
    </header>
  );
};

Menu.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
    }),
  ).isRequired,
};


// export
export default Menu;
