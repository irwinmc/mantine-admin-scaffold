import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './lang/en.json';
import jp from './lang/jp.json';
import zh_cn from './lang/zh_cn.json';

const resources = {
	en: {
		translation: en,
	},
	jp: {
		translation: jp,
	},
	zh_cn: {
		translation: zh_cn,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: 'en',
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
