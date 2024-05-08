import rosetta from 'rosetta';
import en from './translation/en';
import zh from './translation/zh';

const i18nHelper = rosetta({
    en,
    zh
});

i18nHelper.locale('en');
export default i18nHelper;