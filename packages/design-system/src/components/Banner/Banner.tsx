'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import './Banner.css';

export type BannerVariant = 'info' | 'success' | 'warning' | 'error' | 'critical';
export type AriaAttributes = { ariaLive: 'polite' | 'assertive' | 'off'; ariaAtomic: 'true' | 'false' };

export const AriaAttributesMap: Record<BannerVariant, AriaAttributes> = {
	info: { ariaLive: 'polite', ariaAtomic: 'false' },
	success: { ariaLive: 'polite', ariaAtomic: 'false' },
	warning: { ariaLive: 'assertive', ariaAtomic: 'true' },
	error: { ariaLive: 'assertive', ariaAtomic: 'true' },
	critical: { ariaLive: 'assertive', ariaAtomic: 'true' },
};

export type BannerProps = {
	ariaAtomic?: AriaAttributes['ariaAtomic'];
	ariaLive?: AriaAttributes['ariaLive'];
	children?: React.ReactNode;
	className?: string;
	isExposed?: boolean;
	onClose?: () => void;
	title: string;
	variant?: BannerVariant;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onClose' | 'title'>;

export const Banner = forwardRef<HTMLDivElement, BannerProps>((props, ref) => {
	const {
		ariaAtomic,
		ariaLive,
		children,
		className = '',
		isExposed = true,
		onClose,
		title,
		variant = 'info',
		...rest
	} = props;

	const [isExposedState, setIsExposedState] = useState(isExposed);
	const defaultAria = AriaAttributesMap[variant];
	const resolvedAriaLive = ariaLive ?? defaultAria.ariaLive;
	const resolvedAriaAtomic = ariaAtomic ?? defaultAria.ariaAtomic;

	useEffect(() => {
		setIsExposedState(isExposed);
	}, [isExposed]);

	const onCloseHandler = () => {
		setIsExposedState(false);
		if (onClose) {
			onClose();
		}
	};

	if (!isExposedState) {
		return null;
	}

	return (
		<div
			ref={ref}
			className={`banner banner--${variant} ${className}`}
			aria-live={resolvedAriaLive}
			aria-atomic={resolvedAriaAtomic}
			{...rest}
		>
			<div className="banner__content">
				<strong className="banner__title">{title}</strong>
				{children ? <div className="banner__body">{children}</div> : null}
			</div>
			{onClose ? (
				<button type="button" className="banner__close" onClick={onCloseHandler}>
					<svg
						className="banner__close-icon"
						viewBox="0 0 20 20"
						width="16"
						height="16"
						aria-hidden="true"
						focusable="false"
					>
						<path
							d="M5 5L15 15M15 5L5 15"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
					<span className="sr-only">Close</span>
				</button>
			) : null}
		</div>
	);

});

Banner.displayName = 'Banner';