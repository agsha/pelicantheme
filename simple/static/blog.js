/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */


(() => {
    window.addEventListener('DOMContentLoaded', () => {
        console.log("fuck my ass");
        let promises = [];
        document.querySelectorAll('[inject-html]')
            .forEach(container => {
                console.log(container);
                console.log("fuck me");
                const template = container.getAttribute('inject-html');
                console.log("template is sssss"+template);
                const promise = fetch(template)
                    .then(response => response.text())
                    .then(data => container.innerHTML = data);
                promises.push(promise);
            });
        Promise.all(promises)
            .then(installDarkModeHandlers);
    })
})();


function installDarkModeHandlers() {
    'use strict'

    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme()
        if (storedTheme) {
            return storedTheme
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = theme => {
        if (theme === 'auto') {
            document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }

    setTheme(getPreferredTheme())


    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme()
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme())
        }
    })


    document.querySelectorAll('[data-bs-theme-value]')
        .forEach(toggle => {
            toggle.addEventListener('click', () => {
                const theme = toggle.getAttribute('data-bs-theme-value')
                setStoredTheme(theme)
                setTheme(theme)
                location.reload();
            })
        })
}