// == Import : npm
import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import : local
import Menu from 'src/components/Menu';
import Footer from 'src/components/Footer';
import Articles from 'src/components/Articles';
import Error from 'src/components/Error';
import PostDetail from 'src/components/PostDetail';
import './app.scss';

import categories from 'src/data/categories';
import posts from 'src/data/posts';
import { filterPostsByCategory } from 'src/data/selectors';

// == Composant

class App extends React.Component {
  componentDidMount() {
    // j'initialise le titre tout de suite
    this.changeTitle();
    // je veux accéder à history dans les props
    const { history } = this.props;
    // le hoc a enrichi le composant
    // le hoc withRouter (voir en bas du fichier) nous met à disposition des props liées à l'historique et l'url
    // on récupère ici une prop history, c'est un objet possédant une méthode listen
    // listen est un moyen d'écouter tous les changements d'url, on transmet une fonction de rappel, un callback pour réagir
    // à chaque changement d'url on va changer le titre du document
    history.listen(this.changeTitle);
  }

  changeTitle = () => {
    console.log(window.location.pathname);
    // le switch permet de gérer au cas par cas un titre en fonction de window.location.pathname
    // piste d'améliration :
    // faire une fonction getTitleByPathname, c'est fonction prendrait en paramètre d'entrée le pathname et retournerai une chaine de caractère à mettre en titre
    switch (window.location.pathname) {
      case '/':
        document.title = 'Accueil - Bienvenue sur le blog';
        break;
      case '/angular':
        document.title = 'Angular - Tous les articles';
        break;
      default:
        document.title = 'Blog JS - Une autre page';
    }
  }

  render() {
    return (
      <div id="app">
        <Menu
          categories={categories}
        />
        {/*
          Le composant route permet de conditionner l'affichage d'un composant en fonction de l'url, attention comme pour NavLink, la comparaison entre l'url et le chemin se fait sur le début de la chaine, si on veut une comparaison exacte il faut la prop exact
          Si l'url matche avec le chemin de la route alors le composant est rendu
          On peut passer des props au composant
        */}
        {
          /*
          Le composant switch permet de prendre une à une chaque route à l'intérieur et s'arrête au premier match
          si une route matche on sort du switch sans regarder les suivantes
          on pourra donc mettre les routes les plus génériques en dernières
          par exemple géré le cas par défaut en dernier, une 404 si toutes les autres routes n'ont pas matché
          */
        }
        <Switch>
          {categories.map((category) => (
            <Route key={category.label} exact path={category.route}>
              <Articles
                active={category.label}
                posts={filterPostsByCategory(posts, category.label)}
              />
            </Route>
          ))}
          <Route
            // on peut spécifier un paramètre dynamique dans l'url à l'aide de :
            // react router ne vas pas chercher le mot slug, mais un mot quelqconque et l'extraire
            path="/post/:slug"
            // si on veut accéder au découpage de l'url accessible sur la Route dans le composant associé à la route plusieurs solutions :
            // - associer le composant avec la prop component, ainsi c'est la Route qui instancie le composant et lui transmet des props
            // => solution la plus simple, choisie ici, pratique on veut accéder aux données de l'url directement dans l'enfant et qu'on a pas de props à passer
            // - à l'aide de la prop render à qui on associe une fonction retournant le jsx à afficher quand la route est active, la fonction a accès aux données de l'url en paramètre
            // => pratique quand on a des props à passer également
            // - à l'aide du high order component withRouter directement sur PostDetail
            // => pratique quand on veut accéder aux données de l'url dans un composant qui n'est pas directement enfant d'une route
            component={PostDetail}
          />
          {/*
            le composant redirect permet de rediriger vers une nouvelle url
            de plus si on spécifie la prop from on peut faire en sorte de ne rediriger que les url qui matchent avec cette prop
          */}
          <Redirect from="/jquery" to="/autre" />
          <Route>
            <Error />
          </Route>
        </Switch>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape({
    listen: PropTypes.func.isRequired,
  }).isRequired,
};

// == Export
// withRouter : hoc = high order component = fonction qui retourne le composant qu'on lui transmet enrichi de props
export default withRouter(App);
