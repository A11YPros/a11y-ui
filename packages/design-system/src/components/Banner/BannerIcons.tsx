import React from 'react';

type BannerIconProps = React.SVGProps<SVGSVGElement>;

function BaseIcon(props: BannerIconProps) {
	return (
		<svg
			viewBox="0 0 20 20"
			width="18"
			height="18"
			aria-hidden="true"
			focusable="false"
			{...props}
		/>
	);
}

export function BannerInfoIcon(props: BannerIconProps) {
	return (
		<BaseIcon {...props}>
			<circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
			<path d="M10 8V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
			<circle cx="10" cy="5.75" r="1" fill="currentColor" />
		</BaseIcon>
	);
}

export function BannerSuccessIcon(props: BannerIconProps) {
	return (
		<BaseIcon {...props}>
			<circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
			<path
				d="M6.5 10.25L8.9 12.65L13.5 8.05"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.9"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</BaseIcon>
	);
}

export function BannerWarningIcon(props: BannerIconProps) {
	return (
		<BaseIcon {...props}>
			<path
				d="M10 3.5L17 16.5H3L10 3.5Z"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinejoin="round"
			/>
			<path d="M10 7.5V11.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
			<circle cx="10" cy="14.25" r="1" fill="currentColor" />
		</BaseIcon>
	);
}

export function BannerErrorIcon(props: BannerIconProps) {
	return (
		<BaseIcon {...props}>
			<circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
			<path d="M10 6.5V11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
			<circle cx="10" cy="13.75" r="1" fill="currentColor" />
		</BaseIcon>
	);
}

export function BannerCriticalIcon(props: BannerIconProps) {
	return (
		<BaseIcon {...props}>
			<path
				d="M10 2.75L15.75 5V10L10 17.25L4.25 10V5L10 2.75Z"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinejoin="round"
			/>
			<path d="M10 6.5V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
			<circle cx="10" cy="13.25" r="1" fill="currentColor" />
		</BaseIcon>
	);
}

export function BannerCloseIcon(props: BannerIconProps) {
	return (
		<BaseIcon {...props}>
			<path
				d="M5 5L15 15M15 5L5 15"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</BaseIcon>
	);
}
