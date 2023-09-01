import { useTranslation } from 'react-i18next';

const StickyNavbar = ({setSearchQuery, setFilterSchool, setIsSearched}) => {
    const [t, i18n] = useTranslation('navbar');

    return (
        <div className="sticky-navbar" >
            <nav className='sticky-navbar-buttons'>
                <button onClick={() => {
                    setFilterSchool(null);
                    setSearchQuery(null);
                    setIsSearched(false);
                }}>{t('home')}</button>
                <button>{t('clubs')}</button>
                <button>{t('events')}</button>
                <button>{t('profile')}</button>

            </nav>
        </div>
        
    );
}
 
export default StickyNavbar;