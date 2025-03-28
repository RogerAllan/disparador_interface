import styles from '../styles/Header.module.css';

const Header = () => {

  return (
    <header className={styles.header}>
      <div className={styles.intro}>
        <div className={styles.profile}>
          <div className={styles.brand}>
            <h1>Disparador Solares</h1>
          </div>
        </div>
        
          {/* Support Button */}
          <button className={styles.button}>
            <a 
              href="https://www.whatsapp.com/chat?phone=5547988731921" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.button}
            >
              Suporte
            </a>
          </button>
        </div>
      
    </header>
  );
};

export default Header;