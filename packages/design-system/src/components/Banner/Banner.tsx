'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import {
	BannerCloseIcon,
	BannerCriticalIcon,
	BannerErrorIcon,
	BannerInfoIcon,
	BannerSuccessIcon,
	BannerWarningIcon,
} from './BannerIcons';
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
	isDismissible?: boolean;
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
		isDismissible = false,
		isExposed = true,
		onClose,
		title,
		variant = 'info',
		...rest
	} = props;

	const ICON_MAP: Record<BannerVariant, React.ReactElement> = {
		info: <BannerInfoIcon className="banner__variant-icon" />,
		success: <BannerSuccessIcon className="banner__variant-icon" />,
		warning: <BannerWarningIcon className="banner__variant-icon" />,
		error: <BannerErrorIcon className="banner__variant-icon" />,
		critical: <BannerCriticalIcon className="banner__variant-icon" />,
	};

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
			<div className="banner__content-wrap">
				<span className="banner__icon-wrap">{ICON_MAP[variant]}</span>
				<div className="banner__content">
					<strong className="banner__title">{title}</strong>
					{children ? <div className="banner__body">{children}</div> : null}
				</div>
			</div>
			{isDismissible ? (
				<button type="button" className="banner__close" onClick={onCloseHandler}>
					<BannerCloseIcon className="banner__close-icon" />
					<span className="sr-only">Close</span>
				</button>
			) : null}
		</div>
	);

});

Banner.displayName = 'Banner';