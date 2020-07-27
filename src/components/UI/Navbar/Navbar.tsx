import React, { RefObject } from 'react';
import styles from './Navbar.module.css';

export interface NavbarProps {
	classNames?: string[];
	verticesRef: RefObject<HTMLDivElement>;
}

const Navbar = (props: NavbarProps) => {
	let classNames = [styles.Navbar];
	if (props.classNames) {
		classNames.push(...props.classNames);
	}

	return (
		<header className={classNames.join(' ')} id='Header'>
			<h1 className={styles.Heading} id='Heading'>
				Pathfinding Visualizer
			</h1>
		</header>
	);
};

export default Navbar;
