import { useTranslation } from "react-i18next";
import './App.css';

function BottomNav({ activeTab, setActiveTab, cartCount }) {
  const { t } = useTranslation();

  const navItems = [
    { id: 'shop', icon: 'category', label: t('shop') },
    { id: 'blogs', icon: 'calendar', label: t('blogs') }, // Using calendar icon for blogs/news
    { id: 'cart', icon: 'cart', label: t('yourCart'), badge: cartCount },
    { id: 'profile', icon: 'user', label: t('contact') }
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => setActiveTab(item.id)}
        >
          <div className="icon-container">
            <svg width="24" height="24">
              <use xlinkHref={`#${item.icon}`}></use>
            </svg>
            {item.badge > 0 && (
              <span className="badge-count">{item.badge}</span>
            )}
          </div>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export default BottomNav;
