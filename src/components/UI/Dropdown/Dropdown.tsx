import React, { ChangeEvent } from 'react';

import styles from './Dropdown.module.css';

type Option = { [key: string]: string };

interface DropdownProps {
	name: string;
	options: Option;
	classNames?: string[];
	onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = (props: DropdownProps) => {
	let classNames = [styles.Dropdown];
	if (props.classNames) {
		classNames.push(...props.classNames);
	}

	let options = Object.keys(props.options).map((option) => {
		return (
			<option key={option} value={option}>
				{props.options[option]}
			</option>
		);
	});

	return (
		<select
			name={props.name}
			className={classNames.join(' ')}
			onChange={props.onChange}
		>
			{options}
		</select>
	);
};

export default Dropdown;
