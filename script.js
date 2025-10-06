// Beginner-friendly ES6 script wiring theme, role switch, modals, and smooth scroll

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const body = document.getElementById('mode');
    const themeToggle = document.getElementById('systeme-mode');
    const roleContent = document.getElementById('role-content');
    const roleButtons = document.querySelectorAll('.role-btn');
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('modal-title');
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    // State
    const THEME_KEY = 'site-theme';
    let currentRole = 'hse';
    let lastSavedTheme = (() => {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved) return saved;
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    })();

    // Role button styling (hoisted function so it's available to applyTheme)
    function updateRoleButtonsStyle() {
        const hseBtn = document.querySelector('.role-btn[data-role="hse"]');
        const devBtn = document.querySelector('.role-btn[data-role="dev"]');
        if (!hseBtn || !devBtn) return;
        hseBtn.classList.remove('bg-primary', 'bg-blue-600', 'text-white');
        devBtn.classList.remove('bg-primary', 'bg-blue-600', 'text-white');
        const isDark = body.classList.contains('dark');
        if (currentRole === 'hse') {
            if (isDark) hseBtn.classList.add('bg-primary', 'text-white');
            else hseBtn.classList.add('bg-blue-600', 'text-white');
        } else {
            if (isDark) devBtn.classList.add('bg-primary', 'text-white');
            else devBtn.classList.add('bg-blue-600', 'text-white');
        }
    }

    // THEME
    const applyTheme = (theme) => {
        if (theme === 'dark') body.classList.add('dark');
        else body.classList.remove('dark');
        localStorage.setItem(THEME_KEY, theme);
        if (themeToggle) themeToggle.textContent = theme === 'dark' ? 'Light' : 'Dark';
        updateRoleButtonsStyle();
    };

    applyTheme(lastSavedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const next = body.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(next);
            lastSavedTheme = next;
        });
    }

    // SMOOTH SCROLL
    anchorLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ROLE SWITCH
    const animateRoleChange = () => {
        if (!roleContent) return;
        roleContent.classList.add('opacity-0', 'translate-y-2', 'transition', 'duration-300');
        setTimeout(() => roleContent.classList.remove('opacity-0', 'translate-y-2'), 120);
    };

    // (definition moved above)

    roleButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            roleButtons.forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            currentRole = btn.dataset.role || 'hse';
            animateRoleChange();
            // Policy: Dev forces light look; HSE restores saved theme
            if (currentRole === 'dev') applyTheme('light');
            else applyTheme(lastSavedTheme || 'dark');
        });
    });

    // MODAL
    let previousActive = null;

    const trapFocus = (container) => {
        previousActive = document.activeElement;
        const focusables = container.querySelectorAll('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        if (focusables.length) focusables[0].focus();
        const handler = (e) => {
            if (e.key !== 'Tab') return;
            const focusable = Array.from(focusables).filter((el) => el.offsetParent !== null);
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        };
        container.addEventListener('keydown', handler);
        container._trapHandler = handler;
    };

    const releaseFocus = () => {
        if (previousActive) previousActive.focus();
        if (modal._trapHandler) {
            modal.removeEventListener('keydown', modal._trapHandler);
            modal._trapHandler = null;
        }
    };

    const closeModal = () => {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        releaseFocus();
    };

    const getContent = (type, role) => {
        if (type === 'experience') {
            return role === 'hse'
                ? { title: 'Expériences — Profil HSE', html: `<ul>
                    <li><span class="font-bold">SAG — Stage ouvrier:</span> sensibilisation HSSE, contrôle EPI</li>
                    <li>Audit interne: cartographie des risques, plan d\'actions</li>
                    <li><span class="font-bold">PNUD - Bénévole (Be In):</span> Enquête sur le terrain</li>
                    <li>Participation à la mise en œuvre de projet</li>
                    <li>Rédaction de rapports d’activités</li>
                    </ul>` 
                }
                : { title: 'Expériences — Profil Dév', html: `<ul>
                    <li><span class="font-bold">GUI-Food:</span> app web présentation/commandes (OIF/DCLIC/SIMPLON)</li>
                    <li><span class="font-bold">Sites vitrines:</span> intégration responsive, performance</li>
                       <ul>
                            <li><span class="font-bold">Formateur aux logiciels</span></li>
                            <li>Pack office</li>
                            <li>Adobe (Photoshop, Illustrator)</li>
                            <li>ArcGis, MapSource, Global Mapper, Google Earth Pro, GPS</li>
                            <li class="font-bold">Référence : <a href="tel: +224628591902" title="M Keita">+224 628 59 19 02</a></li>
                       </ul>
                    </ul>` 
                };
        }
        if (type === 'skills') {
            return role === 'hse'
                ? { title: 'Compétences — Profil HSE', html: `<ul>
                        <li>Normes HSSE, évaluations des risques</li>
                        <li>Gestion des déchets, ICPE (bases)</li>
                        <li>Rapports et procédures</li>
                    </ul>` }
                : { title: 'Compétences — Profil Dév', html: `<ul>
                        <li>HTML, CSS, JavaScript (ES6+)</li>
                        <li>Node.js, API REST (bases)</li>
                        <li>Git, déploiement Render</li>
                    </ul>` 
                };
        }
        if (type === 'contact') {
            return { title: 'Contact', html: '<p>Envoyez-moi un message :</p><ul><li><a href="mailto:mconde043@gmail.com">mconde043@gmail.com</a></li><li><a href="tel:+224627369541">+224 627 36 95 41</a></li><li><a href="https://wa.me/224627369541" target="_blank" rel="noopener">WhatsApp</a></li></ul>' };
        }
        return { title: 'Infos', html: '<p>Contenu non disponible.</p>' };
    };

    document.querySelectorAll('[data-open]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-open');
            const content = getContent(type, currentRole);
            modalTitle.textContent = content.title;
            modalBody.innerHTML = content.html;
            modal.classList.remove('hidden');
            modal.setAttribute('aria-hidden', 'false');
            trapFocus(modal);
        });
    });

    document.addEventListener('click', (e) => {
        const t = e.target;
        if (t && (t.matches('[data-close="modal"]') || t.classList.contains('modal-backdrop'))) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
            closeModal();
        }
    });

    // Final init
    updateRoleButtonsStyle();
});

