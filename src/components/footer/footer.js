import '../../assets/css/footer.css';

export default function Footer() {
    return (
        <section className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-icons">
                        <span>
                            <a href="mailto:bernard.k.abaidoo@gmail.com" target="_blank" rel="noreferrer">
                                <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 435 435"><path fill="#46f8ff" d="M256.2 217.405h.18L435 380.27V54.73z" /><path fill="#9bfbff" d="M435 54.73H0L217.5 252.5z" /><path fill="#00e7f0" d="M256.2 217.405L217.5 252.5l-38.79-35.095L0 380.27h435L256.38 217.405z" /><path fill="#46f8ff" d="M0 54.73v325.54l178.71-162.865z" /></svg>
                            </a>
                        </span>
                        <span>
                            <a href="https://twitter.com/Kbillgreenz" target="_blank" rel="noreferrer">
                                <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 231.104 231.104"><path d="M4.453 173.33c9.763-1.192 19.663.092 29.426-1.512 4.904-.779 9.396-2.429 13.842-4.171-11-7.058-20.901-15.125-30.113-24.796-3.3-3.438-.917-9.213 3.896-9.35a46.097 46.097 0 0011.55-.917c-9.58-12.146-17.005-25.209-22.78-39.876-1.558-3.942 3.025-7.929 6.738-6.738 2.154.871 4.354 1.467 6.6 1.925-6.829-16.409-8.25-32.955-4.446-51.106.871-4.171 6.371-5.179 9.167-2.429 21.909 21.541 49.593 31.9 79.202 36.85-2.613-20.259 11.78-41.801 30.663-48.86 15.676-5.821 36.714-1.833 47.256 11.367 7.059-4.446 16.821-5.913 24.659-7.288 4.125-.688 8.113 3.346 5.684 7.425-2.842 4.767-5.546 9.854-8.525 14.713 6.05-1.788 12.284-2.888 18.517-3.667 4.492-.596 7.196 6.325 3.759 9.075-7.288 5.821-14.53 12.467-22.276 17.784-.229 51.472-15.263 94.649-61.235 123.937-38.319 24.477-109.546 20.352-142.867-12.97h-.046c-1.467-.367-2.246-1.467-2.521-2.658-1.283-1.925-.367-4.308 1.329-5.225.642-.78 1.467-1.376 2.521-1.513z" fill="#3fa9f5" /></svg>
                            </a>
                        </span>
                        <span>
                            <a href="https://github.com/billbern" target="_blank" rel="noreferrer">
                                <svg width="256" height="256" viewBox="0 -3.5 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet"><g fill="#161614"><path d="M127.505 0C57.095 0 0 57.085 0 127.505c0 56.336 36.534 104.13 87.196 120.99 6.372 1.18 8.712-2.766 8.712-6.134 0-3.04-.119-13.085-.173-23.739-35.473 7.713-42.958-15.044-42.958-15.044-5.8-14.738-14.157-18.656-14.157-18.656-11.568-7.914.872-7.752.872-7.752 12.804.9 19.546 13.14 19.546 13.14 11.372 19.493 29.828 13.857 37.104 10.6 1.144-8.242 4.449-13.866 8.095-17.05-28.32-3.225-58.092-14.158-58.092-63.014 0-13.92 4.981-25.295 13.138-34.224-1.324-3.212-5.688-16.18 1.235-33.743 0 0 10.707-3.427 35.073 13.07 10.17-2.826 21.078-4.242 31.914-4.29 10.836.048 21.752 1.464 31.942 4.29 24.337-16.497 35.029-13.07 35.029-13.07 6.94 17.563 2.574 30.531 1.25 33.743 8.175 8.929 13.122 20.303 13.122 34.224 0 48.972-29.828 59.756-58.22 62.912 4.573 3.957 8.648 11.717 8.648 23.612 0 17.06-.148 30.791-.148 34.991 0 3.393 2.295 7.369 8.759 6.117 50.634-16.879 87.122-64.656 87.122-120.973C255.009 57.085 197.922 0 127.505 0" /><path d="M47.755 181.634c-.28.633-1.278.823-2.185.389-.925-.416-1.445-1.28-1.145-1.916.275-.652 1.273-.834 2.196-.396.927.415 1.455 1.287 1.134 1.923m6.272 5.596c-.608.564-1.797.302-2.604-.589-.834-.889-.99-2.077-.373-2.65.627-.563 1.78-.3 2.616.59.834.899.996 2.08.36 2.65m4.304 7.159c-.782.543-2.06.034-2.849-1.1-.781-1.133-.781-2.493.017-3.038.792-.545 2.05-.055 2.85 1.07.78 1.153.78 2.513-.019 3.069m7.277 8.292c-.699.77-2.187.564-3.277-.488-1.114-1.028-1.425-2.487-.724-3.258.707-.772 2.204-.555 3.302.488 1.107 1.026 1.445 2.496.7 3.258m9.403 2.8c-.307.998-1.741 1.452-3.185 1.028-1.442-.437-2.386-1.607-2.095-2.616.3-1.005 1.74-1.478 3.195-1.024 1.44.435 2.386 1.596 2.086 2.612m10.703 1.187c.036 1.052-1.189 1.924-2.705 1.943-1.525.033-2.758-.818-2.774-1.852 0-1.062 1.197-1.926 2.721-1.951 1.516-.03 2.758.815 2.758 1.86m10.514-.403c.182 1.026-.872 2.08-2.377 2.36-1.48.27-2.85-.363-3.039-1.38-.184-1.052.89-2.105 2.367-2.378 1.508-.262 2.857.355 3.049 1.398" /></g></svg>
                            </a>
                        </span>
                    </div>
                    <div className="footer-text">
                        <p>
                            Created with
                            <span className="heart">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.003 512.003"><path d="M256.001 105.69c19.535-49.77 61.325-87.79 113.231-87.79 43.705 0 80.225 22.572 108.871 54.44 39.186 43.591 56.497 139.193-15.863 209.24-37.129 35.946-205.815 212.524-205.815 212.524S88.171 317.084 50.619 281.579c-73.066-69.084-56.629-164.66-15.863-209.24 28.919-31.629 65.165-54.44 108.871-54.44 51.905 0 92.839 38.021 112.374 87.791" fill="#e8594b" /></svg>
                            </span>
                            by me
                            <a href="https://github.com/billbern" target="_blank" rel="noreferrer">
                                <span className="tag">&lt;</span>
                                Billbern
                                <span className="tag">/&gt;</span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}