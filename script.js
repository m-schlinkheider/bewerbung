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
                    </section>
                `;
                break;
            case 'faehigkeiten':
                sectionContent = `
                    <section>
                        ${generateSkillsSection(skillsData)}
                    </section>
                `;
                break;
            case 'berufspraxis':
                sectionContent = `
                    <section>
                        <h2>Berufspraxis</h2>
                        ${generateExperienceSection(experienceData)}
                    </section>
                `;
                break;
            case 'bildung':
                sectionContent = `
                    <section>
                        <h2>Bildung</h2>
                        ${generateEducationSection(educationData)}
                    </section>
                `;
                break;
            case 'projekte':
                sectionContent = `
                    <section>
                        <h2>Projekte</2>
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
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Telefon:</strong> ${contactData.phone}</p>
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
        });
    });
});

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
            html += `<li>${item}</li>`;
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
            <div class="job">
                <h3>${exp.position}</h3>
                <p><strong>Unternehmen:</strong> ${exp.company}</p>
                <p><strong>Zeitraum:</strong> ${exp.period}</p>
                ${exp.details ? `<p><strong>Details:</strong> ${exp.details}</p>` : ''}
                ${exp.tasks ? `<ul>${exp.tasks.map(task => `<li>${task}</li>`).join('')}</ul>` : ''}
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

    // Akkordeon-Funktionalität hinzufügen
    setTimeout(() => {
        const acc = document.getElementsByClassName('accordion');
        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener('click', function() {
                // Toggle zwischen aktivem und inaktivem Zustand
                this.classList.toggle('active');

                // Panel ein- oder ausblenden
                const panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }
    }, 0);

    return html;
}

function generateProjectsSection(projects) {
    let html = '';
    projects.forEach(project => {
        html += `
            <div class="project">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${project.details ? `<h4>Details</h4><p>${project.details}</p>` : ''}
                ${project.technologies ? `<p><strong>Kenntnisse:</strong> ${project.technologies.join(', ')}</p>` : ''}
            </div>
        `;
    });
    return html;
}
