import React from 'react';
import { useTranslation } from 'react-i18next';

export const Settings = () => {
	const { t, i18n } = useTranslation();

	return (
		<div className="sets-container">
			<div className="sets-popup">
				<div className="sets-header">
					<h1>{t('timer_setting')}</h1>
				</div>
			</div>
		</div>
	)
}