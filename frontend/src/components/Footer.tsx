import React from 'react';
// @ts-ignore: allow importing css without type declarations
import '../styles/footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="/termos" className="footer-link">Termos de Uso</a>
                <a href="/politica-privacidade" className="footer-link">Política de Privacidade</a>
            </div>
        </footer>
    );
}
