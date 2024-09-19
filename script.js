document.addEventListener('DOMContentLoaded', function() {
    // Dynamisch den Seitentitel setzen
    document.title = `Lebenslauf - ${personalData.name}`;

    // Profilbild setzen
    const profileImage = personalData.profileImage || 'assets/bild_linkedin.jpg';

    // Tabs und Inhalte generieren
    const tabs = [
        { id: 'profil', label: 'Profil', icon: 'person' },
        { id: 'faehigkeiten', label: 'Fähigkeiten', icon: 'star' },
        { id: 'berufspraxis', label: 'Berufspraxis', icon: 'work' },
        { id: 'bildung', label: 'Bildung', icon: 'school' },
        { id: 'projekte', label: 'Projekte', icon: 'folder' }
    ];

    const contentDiv = document.querySelector('.content');
    const navTabs = document.getElementById('nav-tabs');

    tabs.forEach((tab, index) => {
        // Navigation Tabs erstellen
        const navItem = document.createElement('li');
        navItem.classList.add('tab-link');
        if (index === 0) navItem.classList.add('active');
        navItem.setAttribute('data-tab', tab.id);
        navItem.innerHTML = `
            <span class="material-icons">${tab.icon}</span>
            <span class="tab-label">${tab.label}</span>
        `;
        navTabs.appendChild(navItem);

        // Tab-Inhalte erstellen
        const tabContent = document.createElement('div');
        tabContent.classList.add('tab-content');
        if (index === 0) tabContent.classList.add('active');
        tabContent.id = tab.id;

        let sectionContent = '';

        switch (tab.id) {
            case 'profil':
                sectionContent = `
                    <section id="profil">
                        <h1>${personalData.name}</h1>
                        <img src="${profileImage}" alt="Profilfoto">
                        <p>${personalData.description}</p>
                        <a href="M-Schlinkheider_Lebenslauf_2024.pdf" class="download-button" download>
                           Lebenslauf herunterladen
                        </a>
                    </section>
                `;
                break;
            case 'faehigkeiten':
                sectionContent = `
                    <section id="faehigkeiten">
                        ${generateSkillsSection(skillsData)}
                    </section>
                `;
                break;
            case 'berufspraxis':
                sectionContent = `
                    <section id="berufspraxis">
                        <h2>Berufspraxis</h2>
                        ${generateExperienceSection(experienceData)}
                    </section>
                `;
                break;
            case 'bildung':
                sectionContent = `
                    <section id="bildung">
                        <h2>Bildung</h2>
                        ${generateEducationSection(educationData)}
                    </section>
                `;
                break;
            case 'projekte':
                sectionContent = `
                    <section>
                        <h2>Projekte</h2>
                        ${generateProjectsSection(projectsData)}
                    </section>
                `;
                break;
        }

        tabContent.innerHTML = sectionContent;
        contentDiv.appendChild(tabContent);
    });

    // Kontaktinformationen
    const contactInfoDiv = document.querySelector('.contact-info');
    contactInfoDiv.innerHTML = `
        <p><strong>E-Mail:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
        <p><strong>Tel.:</strong> ${contactData.phone}</p>
        <p><strong>LinkedIn:</strong> <a href="${contactData.linkedin}">${personalData.name}</a></p>
    `;

    // Tab-Navigation Funktionalität
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Entferne 'active' Klasse von allen Links
            tabLinks.forEach(function(link) {
                link.classList.remove('active');
            });

            // Füge 'active' Klasse zum angeklickten Link hinzu
            this.classList.add('active');

            // Verstecke alle Tab-Inhalte
            tabContents.forEach(function(content) {
                content.classList.remove('active');
            });

            // Zeige den ausgewählten Tab-Inhalt
            document.getElementById(tabId).classList.add('active');

            // Keine Akkordeon-Initialisierung hier mehr
        });
    });

    // Akkordeon-Funktionalität initialisieren
    initAccordions();
});

// Funktionen zum Initialisieren der Akkordeon-Funktionalität
function initAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(function(accordion) {
        // Verhindern, dass Event Listener mehrfach hinzugefügt werden
        if (!accordion.classList.contains('listener-added')) {
            accordion.addEventListener('click', function() {
                this.classList.toggle('active');

            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
        // Markiere das Akkordeon als mit Listener versehen
        accordion.classList.add('listener-added');
        }
    });
}

// Funktionen zum Generieren der Inhalte
function generateSkillsSection(skills) {
    let html = '';

    // Persönliche Stärken separat behandeln
    const personalStrengths = skills.find(skill => skill.category === 'Persönliche Stärken');
    if (personalStrengths) {
        html += `
            <div class="personal-strengths-container">
                <div class="strengths-list">
                    <h3>${personalStrengths.category}</h3>
                    <ul>
        `;       
        personalStrengths.items.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += `
                    </ul>
                </div>
                <div class="profile-image">
                    <img src="${personalData.profileImage || 'assets/bild_linkedin.jpg'}" alt="Profilfoto">
                </div>
            </div>
        `;
    }

    // Entferne Persönliche Stärken aus dem Array
    const otherSkills = skills.filter(skill => skill.category !== 'Persönliche Stärken');

    // Container für die nebeneinander angezeigten Kategorien
    html += '<div class="skills-container">';

    otherSkills.forEach(skillCategory => {
        html += `<div class="skill-column">
                <h3>${skillCategory.category}</h3>
                <ul>`;
        skillCategory.items.forEach(item => {
            html += `<li><span class="material-icons icon">check_circle</span>${item}</li>`;
        });
        html += '</ul></div>';
    });

    html += '</div>'; // Schließen des skills-container div

    return html;
}

function generateExperienceSection(experiences) {
    let html = '';

    experiences.forEach(exp => {
        html += `
            <button class="accordion">${exp.position} bei ${exp.company}</button>
            <div class="panel">
                <p><strong>Zeitraum:</strong> ${exp.period}</p>
                ${exp.details ? `<p><strong>Details:</strong> ${exp.details}</p>` : ''}
                ${exp.tasks && exp.tasks.length > 0 ? `<h4>Aufgaben:</h4><ul>${exp.tasks.map(task => `<li>${task}</li>`).join('')}</ul>` : ''}
            </div>
        `;
    });

    return html;
}

function generateEducationSection(education) {
    let html = '';
    education.forEach(category => {
        html += `
            <button class="accordion">${category.category}</button>
            <div class="panel">
        `;
        category.entries.forEach(edu => {
            html += `
                <div class="education">
                    <h3>${edu.degree}</h3>
                    <p><strong>Institution:</strong> ${edu.institution}</p>
                    <p><strong>Zeitraum:</strong> ${edu.period}</p>
                    ${edu.details ? `<p><strong>Details:</strong> ${edu.details}</p>` : ''}
                </div>
            `;
        });
        html += `</div>`;
    });

    return html;
}

function generateProjectsSection(projects) {
    let html = '';

    // Prüfen, ob Projekte nach Kategorien gruppiert sind
    if (projects.length > 0 && projects[0].projects) {
        // Projekte sind nach Kategorien gruppiert
        projects.forEach(category => {
            html += `
                <div class="project-category">
                    <h3>${category.category}</h3>
                    <div class="projects-container">
            `;
            category.projects.forEach(project => {
                html += `
                    <div class="project-card">
                        <h4>${project.title}</h4>
                        <p>${project.description}</p>
                        ${project.details ? `<p><strong>Details:</strong> ${project.details}</p>` : ''}
                        ${project.technologies && project.technologies.length > 0 ? `
                            <p><strong>Technologien:</strong> ${project.technologies.join(', ')}</p>
                        ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">Zum Projekt</a>` : ''}    
                        ` : ''}
                    </div>
                `;
            });
            html += `
                    </div>
                </div>
            `;
        });
    } else {
        // Projekte sind nicht nach Kategorien gruppiert
        html += '<div class="projects-container">';
        projects.forEach(project => {
            html += `
                <div class="project-card">
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    ${project.details ? `<p><strong>Details:</strong> ${project.details}</p>` : ''}
                    ${project.technologies && project.technologies.length > 0 ? `
                        <p><strong>Technologien:</strong> ${project.technologies.join(', ')}</p>
                    ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">Zum Projekt</a>` : ''}    
                    ` : ''}
                </div>
            `;
        });
        html += '</div>';
    }

    return html;
}
