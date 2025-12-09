import { useTranslation } from "react-i18next";

function LanguageSelector() {
    const { i18n } = useTranslation();
    const changeLg = (lang, name, description) => {
        localStorage.setItem('language', lang);
        localStorage.setItem('name', name);
        localStorage.setItem('description', description);
        i18n.changeLanguage(lang);
    };
    return (
        <div className="language-selector" style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => changeLg('en', 'nameEN', 'descriptionEN')} className="language-flag">
                <img src="images/langs/en.png" alt="English" width="30" height="20" />
            </button>
            -
            <button onClick={() => changeLg('fr', 'nameFR', 'descriptionFR')} className="language-flag">
                <img src="images/langs/fr.png" alt="French" width="30" height="20" />
            </button>
            -
            <button onClick={() => changeLg('ch', 'nameCH', 'descriptionCH')} className="language-flag">
                <img src="images/langs/cn.png" alt="Chinese" width="30" height="20" />
            </button>
        </div>
    );
}

export default LanguageSelector;
