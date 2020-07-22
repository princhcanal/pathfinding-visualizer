import React, {
	useRef,
	useImperativeHandle,
	forwardRef,
	MouseEvent,
	Ref,
	useEffect,
} from 'react';

import styles from './Dropdown.module.css';

type Option = { [key: string]: string };

export interface DropdownProps {
	name: string;
	options: Option;
	default: string;
	classNames?: string[];
	label?: string;
	width: string;
	onChange: (event: MouseEvent<HTMLLIElement>) => void;
}

const Dropdown = forwardRef(
	(
		props: DropdownProps,
		ref: Ref<{ heading: HTMLHeadingElement | null }>
	) => {
		let classNames = [styles.Dropdown];
		if (props.classNames) {
			classNames.push(...props.classNames);
		}

		const optionsRef = useRef<HTMLDivElement>(null);
		const headingRef = useRef<HTMLHeadingElement>(null);

		useImperativeHandle(ref, () => ({
			heading: headingRef.current,
		}));

		useEffect(() => {
			document.addEventListener('click', (e: any) => {
				if (
					e.target.parentElement &&
					e.target.parentElement.parentElement &&
					!e.target.parentElement.parentElement.classList.contains(
						styles.Dropdown
					) &&
					!e.target.parentElement.parentElement.classList.contains(
						styles.List
					)
				) {
					if (optionsRef.current && headingRef.current) {
						optionsRef.current.classList.add(styles.OptionsHidden);
						setTimeout(() => {
							if (optionsRef.current) {
								optionsRef.current.classList.add(
									styles.OptionsZIndex
								);
							}
						}, 200);
						let options = optionsRef.current.children;
						for (let i = 0; i < options.length; i++) {
							options[i].children[0].classList.add(
								styles.OptionHidden
							);
						}
						headingRef.current.children[1].classList.remove(
							styles.CaretRotate
						);
					}
				}
			});
		}, []);

		let optionsStyles = [
			styles.Options,
			styles.OptionsHidden,
			styles.OptionsZIndex,
		];

		let optionStyles = [styles.Option, styles.OptionHidden];

		const handleDropdownToggle = () => {
			if (optionsRef.current && headingRef.current) {
				optionsRef.current.classList.toggle(styles.OptionsHidden);
				if (
					optionsRef.current.classList.contains(styles.OptionsZIndex)
				) {
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
					options[i].children[0].classList.toggle(
						styles.OptionHidden
					);
				}
				headingRef.current.children[1].classList.toggle(
					styles.CaretRotate
				);
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
				<ul className={styles.List} /*style={{ width: props.width }}*/>
					<h1
						ref={headingRef}
						className={styles.Heading}
						onClick={handleDropdownToggle}
					>
						<span>{props.default}</span>
						<span className={styles.Caret}>&#8227;</span>
					</h1>
					<div
						ref={optionsRef}
						className={optionsStyles.join(' ')}
						// style={{ height: `${options.length * 2}rem` }}
					>
						{options}
					</div>
				</ul>
			</div>
		);
	}
);

export default Dropdown;
