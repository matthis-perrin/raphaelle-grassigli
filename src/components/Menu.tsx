import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import styles from './Menu.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {RouteComponentProps} from 'react-router';
import {
  accueilRoute,
  methodeRoute,
  documentationsRoute,
  tarifsRoute,
  contactRoute,
} from '../routes';

interface MenuLinkProps {
  onClick?: () => void;
  destination: string;
  content: string | JSX.Element;
  className: string;
  selectedClassName: string;
}

export class MenuLinkInternal extends React.Component<RouteComponentProps<{}> & MenuLinkProps, {}> {
  render() {
    const {pathname} = this.props.history.location;
    const wrapLinkClass = (className: string, isSelected: boolean): string =>
      `${className} ${isSelected ? this.props.selectedClassName : ''}`;

    const handleClick = () => {
      this.props.history.push(this.props.destination);
      if (this.props.onClick) {
        this.props.onClick();
      }
    };

    return (
      <Link
        onClick={handleClick}
        to={this.props.destination}
        className={wrapLinkClass(this.props.className, pathname === this.props.destination)}
      >
        {this.props.content}
      </Link>
    );
  }
}

export const MenuLink = withRouter(MenuLinkInternal);

export function Menu(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <MenuLink
        destination={accueilRoute}
        className={styles.icon}
        selectedClassName={styles.selected}
        content={<FontAwesomeIcon icon={faHome} className={styles.icon} />}
      />
      <MenuLink
        destination={methodeRoute}
        className={styles.text}
        selectedClassName={styles.selected}
        content="Méthode"
      />
      <MenuLink
        destination={documentationsRoute}
        className={styles.text}
        selectedClassName={styles.selected}
        content="Documentations"
      />
      <MenuLink
        destination={tarifsRoute}
        className={styles.text}
        selectedClassName={styles.selected}
        content="Tarifs"
      />
      <MenuLink
        destination={contactRoute}
        className={styles.text}
        selectedClassName={styles.selected}
        content="Contact"
      />
    </div>
  );
}
