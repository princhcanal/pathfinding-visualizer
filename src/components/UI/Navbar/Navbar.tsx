import React, { RefObject } from 'react';

import styles from './Navbar.module.css';

interface NavbarProps {
	classNames?: string[];
	verticesRef: RefObject<HTMLDivElement>;
}

const Navbar = (props: NavbarProps) => {
	let classNames = [styles.Navbar];
	if (props.classNames) {
		classNames.push(...props.classNames);
	}

	return (
		<header className={classNames.join(' ')}>
			<h1 className={styles.Heading}>Pathfinding Visualizer</h1>
		</header>
	);
};

export default Navbar;
