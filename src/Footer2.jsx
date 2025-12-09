import { useTranslation } from "react-i18next";

function Footer() {
    const {t} = useTranslation();

    return (
        <>
            <footer id="footerid" className="py-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="footer-menu">
                                <img src="/images/logo.png" alt="logo" style={{width:"200px"}} />
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="footer-menu">
                                <h5 className="widget-title">{t('socialMedia')}</h5>
                                <ul className="menu-list list-unstyled">
                                    <li className="row align-items-center">
                                        <div className="col-2">
                                            <a target="_blank" href="https://www.instagram.com/katytrips?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="btn btn-outline-light">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M17.34 5.46a1.2 1.2 0 1 0 1.2 1.2a1.2 1.2 0 0 0-1.2-1.2Zm4.6 2.42a7.59 7.59 0 0 0-.46-2.43a4.94 4.94 0 0 0-1.16-1.77a4.7 4.7 0 0 0-1.77-1.15a7.3 7.3 0 0 0-2.43-.47C15.06 2 14.72 2 12 2s-3.06 0-4.12.06a7.3 7.3 0 0 0-2.43.47a4.78 4.78 0 0 0-1.77 1.15a4.7 4.7 0 0 0-1.15 1.77a7.3 7.3 0 0 0-.47 2.43C2 8.94 2 9.28 2 12s0 3.06.06 4.12a7.3 7.3 0 0 0 .47 2.43a4.7 4.7 0 0 0 1.15 1.77a4.78 4.78 0 0 0 1.77 1.15a7.3 7.3 0 0 0 2.43.47C8.94 22 9.28 22 12 22s3.06 0 4.12-.06a7.3 7.3 0 0 0 2.43-.47a4.7 4.7 0 0 0 1.77-1.15a4.85 4.85 0 0 0 1.16-1.77a7.59 7.59 0 0 0 .46-2.43c0-1.06.06-1.4.06-4.12s0-3.06-.06-4.12ZM20.14 16a5.61 5.61 0 0 1-.34 1.86a3.06 3.06 0 0 1-.75 1.15a3.19 3.19 0 0 1-1.15.75a5.61 5.61 0 0 1-1.86.34c-1 .05-1.37.06-4 .06s-3 0-4-.06a5.73 5.73 0 0 1-1.94-.3a3.27 3.27 0 0 1-1.1-.75a3 3 0 0 1-.74-1.15a5.54 5.54 0 0 1-.4-1.9c0-1-.06-1.37-.06-4s0-3 .06-4a5.54 5.54 0 0 1 .35-1.9A3 3 0 0 1 5 5a3.14 3.14 0 0 1 1.1-.8A5.73 5.73 0 0 1 8 3.86c1 0 1.37-.06 4-.06s3 0 4 .06a5.61 5.61 0 0 1 1.86.34a3.06 3.06 0 0 1 1.19.8a3.06 3.06 0 0 1 .75 1.1a5.61 5.61 0 0 1 .34 1.9c.05 1 .06 1.37.06 4s-.01 3-.06 4ZM12 6.87A5.13 5.13 0 1 0 17.14 12A5.12 5.12 0 0 0 12 6.87Zm0 8.46A3.33 3.33 0 1 1 15.33 12A3.33 3.33 0 0 1 12 15.33Z"/></svg>
                                            </a>
                                        </div>
                                        <div className="col"><a target="_blank" href="https://www.instagram.com/katytrips?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="nav-link">{t('instagram')}</a></div>
                                    </li>
                                    <li className="row align-items-center">
                                        <div className="col-2">
                                            <a target="_blank" href="https://www.linkedin.com/in/leghdaich-keltoum-at-shanghai-international-studies-university-40803b1b7/" className="btn btn-outline-light">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M20.47 2H3.53a1.45 1.45 0 0 0-1.47 1.43v17.14A1.45 1.45 0 0 0 3.53 22h16.94a1.45 1.45 0 0 0 1.47-1.43V3.43A1.45 1.45 0 0 0 20.47 2ZM8.09 18.74h-2.8V9.91h2.8v8.83ZM6.59 8.48a1.56 1.56 0 1 1 0-3.12a1.57 1.57 0 1 1 0 3.12Zm12.32 10.26h-2.8v-4.6c0-1.08-.02-2.48-1.51-2.48s-1.75 1.18-1.75 2.41v4.67H9.45V9.91h2.69v1.28h.04a3.07 3.07 0 0 1 2.76-1.51c2.95 0 3.5 1.94 3.5 4.46v5.6Z"/></svg>
                                            </a>
                                        </div>
                                        <div className="col"><a target="_blank" href="https://www.linkedin.com/in/leghdaich-keltoum-at-shanghai-international-studies-university-40803b1b7/" className="nav-link">{t('linkedin')}</a></div>
                                    </li>
                                    <li className="row align-items-center">
                                        <div className="col-2">
                                            <a target="_blank" href="https://www.youtube.com/@katytrips4177" className="btn btn-outline-light">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M23 9.71a8.5 8.5 0 0 0-.91-4.13a2.92 2.92 0 0 0-1.72-1A78.36 78.36 0 0 0 12 4.27a78.45 78.45 0 0 0-8.34.3a2.87 2.87 0 0 0-1.46.74c-.9.83-1 2.25-1.1 3.45a48.29 48.29 0 0 0 0 6.48a9.55 9.55 0 0 0 .3 2a3.14 3.14 0 0 0 .71 1.36a2.86 2.86 0 0 0 1.49.78a45.18 45.18 0 0 0 6.5.33c3.5.05 6.57 0 10.2-.28a2.88 2.88 0 0 0 1.53-.78a2.49 2.49 0 0 0 .61-1a10.58 10.58 0 0 0 .52-3.4c.04-.56.04-3.94.04-4.54ZM9.74 14.85V8.66l5.92 3.11c-1.66.92-3.85 1.96-5.92 3.08Z"/></svg>
                                            </a>
                                        </div>
                                        <div className="col"><a target="_blank" href="https://www.youtube.com/@katytrips4177" className="nav-link">{t('youtube')}</a></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-6">
                            <div className="footer-menu">
                                <h5 className="widget-title">{t('links')}</h5>
                                <ul className="menu-list list-unstyled">
                                    <li className="menu-item">
                                        <a href="#shopid" className="nav-link">{t('shop')}</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#blogsid" className="nav-link">{t('blogs')}</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="#headerid" className="nav-link">{t('toTheTop')}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div className="footer-menu">
                                <h5 className="widget-title">{t('contact')}</h5>
                                <ul className="menu-list list-unstyled">
                                    <li className="menu-item">
                                        <a href="javascript:void(0)" className="nav-link" style={{cursor:'default'}}>{t('email2')} : kelthoum.leghdaich@gmail.com</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="javascript:void(0)" className="nav-link" style={{cursor:'default'}}>{t('tel')} : +212638496232</a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="javascript:void(0)" className="nav-link" style={{cursor:'default'}}>{t('address')} : Casablanca oulfa, Morocco</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div id="footer-bottom">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 copyright">
                            <p>{t('copyright')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;