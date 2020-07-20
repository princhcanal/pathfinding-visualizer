import React, { useRef, MouseEvent } from 'react';

import styles from './Dropdown.module.css';

type Option = { [key: string]: string };

interface DropdownProps {
	name: string;
	options: Option;
	classNames?: string[];
	label?: string;
	onChange: (event: MouseEvent<HTMLLIElement>) => void;
}

const Dropdown = (props: DropdownProps) => {
	let classNames = [styles.Dropdown];
	if (props.classNames) {
		classNames.push(...props.classNames);
	}

	const optionsRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);

	let optionsStyles = [
		styles.Options,
		styles.OptionsHidden,
		styles.OptionsZIndex,
	];

	let optionStyles = [styles.Option, styles.OptionHidden];

	const handleDropdownToggle = () => {
		if (optionsRef.current && headingRef.current) {
			optionsRef.current.classList.toggle(styles.OptionsHidden);
			if (optionsRef.current.classList.contains(styles.OptionsZIndex)) {
				setTimeout(() => {
					if (optionsRef.current)
						optionsRef.current.classList.toggle(
							styles.OptionsZIndex
						);
				}, 3);
			} else {
				setTimeout(() => {
					if (optionsRef.current)
						optionsRef.current.classList.toggle(
							styles.OptionsZIndex
						);
				}, 100);
			}

			let options = optionsRef.current.children;
			for (let i = 0; i < options.length; i++) {
				options[i].children[0].classList.toggle(styles.OptionHidden);
			}
			headingRef.current.children[1].classList.toggle(styles.CaretRotate);
		}
	};

	const handleOptionClicked = (e: MouseEvent<HTMLLIElement>) => {
		if (headingRef.current) {
			props.onChange(e);
			headingRef.current.children[0].innerHTML =
				e.currentTarget.innerHTML;
			headingRef.current.click();
		}
	};

	let options = Object.keys(props.options).map((option) => {
		return (
			<span key={option}>
				<li
					key={option}
					value={option}
					onClick={handleOptionClicked}
					className={optionStyles.join(' ')}
				>
					{props.options[option]}
				</li>
			</span>
		);
	});

	return (
		<div className={styles.Dropdown}>
			<p className={styles.Label}>{props.label && props.label}</p>
			<ul className={styles.List}>
				<h1
					ref={headingRef}
					className={styles.Heading}
					onClick={handleDropdownToggle}
				>
					<span>Dijkstra</span>
					<span className={styles.Caret}>&#8227;</span>
				</h1>
				<div ref={optionsRef} className={optionsStyles.join(' ')}>
					{options}
				</div>
			</ul>
		</div>
	);
};

export default Dropdown;
