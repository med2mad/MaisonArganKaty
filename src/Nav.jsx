import './i18n';
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function Nav() {
    const { t, i18n } = useTranslation();
    const changeLg = (lang, name, description) => {
        localStorage.setItem('language', lang);
        localStorage.setItem('name', name);
        localStorage.setItem('description', description);
        i18n.changeLanguage(lang);
    };

    // Load saved language preference on component mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);

    return (
        <>
            <ul className="navbar-nav justify-content-end menu-list list-unstyled d-flex gap-md-3 mb-0">
                <li className="nav-item dropdown">
                    <a href="#shopid" className="nav-link">{t('shop')}</a>
                </li>
                <li className="nav-item">
                    <a href="#blogsid" className="nav-link">{t('blogs')}</a>
                </li>
                <li className="nav-item">
                    <a href="#footerid" className="nav-link">{t('contact')}</a>
                </li>
                <li className="nav-item">
                    <a href="javascript:void(0)" className="nav-link"> | </a>
                </li>
                {/* <li className="nav-item">
                    <a href="/admin" className="nav-link"> qwdwd </a>
                </li> */}
            </ul>

            <div style={{ display: 'flex', marginLeft: '10px' }}>
                <ul className="navbar-nav justify-content-end menu-list list-unstyled d-flex gap-md-3 mb-0">
                    <li className="nav-item">
                        <a href="javascript:void(0)" style={{ cursor: 'default' }} className="nav-link">
                            {t('languages')}:
                        </a>
                    </li>
                </ul>

                <div className="language-selector">
                    <button onClick={() => changeLg('en', 'nameEN', 'descriptionEN')} className="language-flag">
                        <img
                            src="images/langs/en.png"
                            alt="English"
                            width="20"
                            height="15"
                        />
                    </button>
                    <button onClick={() => changeLg('fr', 'nameFR', 'descriptionFR')} className="language-flag">
                        <img
                            src="images/langs/fr.png"
                            alt="French"
                            width="20"
                            height="15"
                        />
                    </button>
                    <button onClick={() => changeLg('ch', 'nameCH', 'descriptionCH')} className="language-flag">
                        <img
                            src="images/langs/cn.png"
                            alt="Chinese"
                            width="20"
                            height="15"
                        />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Nav;