{
    const govCatalog = [
        {"class":"govuk-accordion", "name":"Accordion", "component":"accordion", "label":"beforebegin"},
        {"class":"govuk-back-link", "name":"Back link", "component":"back-link", "label":"beforebegin"},
        {"class":"govuk-breadcrumbs", "name":"Breadcrumbs", "component":"breadcrumbs", "label":"beforebegin"},
        {"class":"govuk-button", "name":"Button", "component":"button", "label":"afterend"},
        {"class":"govuk-character-count", "name":"Character count", "component":"character-count", "label":"beforebegin"},
        {"class":"govuk-checkboxes", "name":"Checkboxes", "component":"checkboxes", "label":"beforebegin"},
        {"class":"govuk-cookie-banner", "name":"Cookie Banner", "component":"cookie-banner", "label":"beforebegin"},
        {"class":"govuk-date-input", "name":"Date input", "component":"date-input", "label":"beforebegin"},
        {"class":"govuk-details", "name":"Details", "component":"details", "label":"beforebegin"},
        {"class":"govuk-form-group--error", "name":"Error message", "component":"error-message", "label":"beforebegin"},
        {"class":"govuk-error-summary", "name":"Error summary", "component":"error-summary", "label":"beforebegin"},
        {"class":"govuk-fieldset", "name":"Fieldset", "component":"fieldset", "label":"beforebegin"},
        {"class":"govuk-file-upload", "name":"File upload", "component":"file-upload", "label":"beforebegin"},
        {"class":"govuk-footer", "name":"Footer", "component":"footer", "label":"beforebegin"},
        {"class":"govuk-header", "name":"Header", "component":"header", "label":"beforebegin"},
        {"class":"govuk-inset-text", "name":"Inset text", "component":"inset-text", "label":"beforebegin"},
        {"class":"govuk-notification-banner", "name":"Notification banner", "component":"notification-banner", "label":"beforebegin"},
        {"class":"govuk-panel", "name":"Panel", "component":"panel", "label":"beforebegin"},
        {"class":"govuk-phase-banner", "name":"Phase banner", "component":"phase-banner", "label":"beforebegin"},
        {"class":"govuk-radios", "name":"Radios", "component":"radios", "label":"beforebegin"},
        {"class":"govuk-select", "name":"Select", "component":"select", "label":"beforebegin"},
        {"class":"govuk-skip-link", "name":"Skip link", "component":"skip-link", "label":"beforebegin"},
        {"class":"govuk-summary-list", "name":"Summary list", "component":"summary-list", "label":"beforebegin"},
        {"class":"govuk-table", "name":"Table", "component":"table", "label":"beforebegin"},
        {"class":"govuk-tabs", "name":"Tabs", "component":"tabs", "label":"beforebegin"},
        {"class":"govuk-tag", "name":"Tag", "component":"tag", "label":"beforebegin"},
        {"class":"govuk-input", "name":"Text input", "component":"text-input", "label":"afterend"},
        {"class":"govuk-textarea", "name":"Textarea", "component":"textarea", "label":"beforebegin"},
        {"class":"govuk-warning-text", "name":"Warning text", "component":"warning-text", "label":"beforebegin"}
    ];
   
    const hmrcCatalog = [
        {"class":"hmrc-header", "name":"Account header", "component":"account-header", "label":"afterend"},
        {"class":"hmrc-account-menu", "name":"Account menu", "component":"account-header", "label":"beforebegin"},
        {"class":"hmrc-list-with-actions", "name":"Add to list", "component":"add-to-a-list", "label":"beforebegin"},
        {"class":"hmrc-banner", "name":"Banner", "component":"hmrc-banner", "label":"beforebegin"}, 
        {"class":"hmrc-internal-header", "name":"Internal header", "component":"internal-header", "label":"afterend"}, 
        {"class":"hmrc-notification-badge", "name":"Notification badge", "component":"notification-badge", "label":"beforebegin"}, 
        {"class":"hmrc-page-heading", "name":"Page heading", "component":"page-heading", "label":"beforebegin"}, 
        {"class":"hmrc-timeout-dialog", "name":"Service timeout", "component":"service-timeout", "label":"beforebegin"}, 
        {"class":"hmrc-sign-out-nav", "name":"Sign out", "component":"sign-out", "label":"beforebegin"}, 
        {"class":"hmrc-timeline", "name":"Timeline", "component":"timeline", "label":"beforebegin"}, 
        {"class":"hmrc-language-select", "name":"Welsh language toggle", "component":"welsh-language-toggle", "label":"beforebegin"}  
    ];

    // Stylesheet
    const spy = document.getElementById('style-spy');
    if (!spy) {
        let style = document.createElement('style');
        style.innerHTML =
        `
        .stylespy-link {
            color: #fff;
            background: #A4235F;
            border-bottom: 4px solid #A4235F;
            display: inline-block;
            font-family: Arial,sans-serif;
            font-size: 14px;
            font-weight: normal;
            outline: none;
            padding: 8px 12px 4px 12px;
            text-decoration: none;
        }
        .stylespy-link:hover {
            text-decoration: underline;
        }
        .stylespy-link:focus {
            background-color: #fd0;
            color: #0b0c0c;
            border-color: #0b0c0c;
        }
        `;
        style.id = 'style-spy';
        document.head.appendChild(style);

        scanPage('hmrc', hmrcCatalog, 'HMRC', 'https://design.tax.service.gov.uk/hmrc-design-patterns/');
        scanPage('govuk', govCatalog, 'GOV.UK', 'https://design-system.service.gov.uk/components/');
    }
    else {
        spy.remove();
        document.querySelectorAll('.stylespy-link').forEach(function(link) {
            link.remove();
        });
        document.querySelectorAll('[data-stylespy]').forEach(function(component) {
            component.removeAttribute('style');
            component.setAttribute('data-stylespy', 'none');
        });
    }

    function scanPage(prefix, catalog, designSystem, designSystemURL) {
        for (let div of document.querySelectorAll('[class*=' + prefix + '-]')) { 

            const dataStyleSpy = div.getAttribute('data-stylespy');
            if (dataStyleSpy && (dataStyleSpy.value === 'govuk' || dataStyleSpy.value === 'hmrc')) {
                continue;
            }

            let classes = div.getAttribute('class');
            let result = identifyElement(catalog, "class", classes);
    
            if (result.length > 0) {
                outlineComponent(div, result, prefix, designSystem, designSystemURL);
            }
        }
    }

    function identifyElement(array, key, value) {
        const classes = value.split(' ');
        return array.filter(function (items) {
            for (let i = 0; i < classes.length; i++) { 
                if (classes[i] === items[key]) {
                    return items[key];
                }
            }
        });
    };

    function outlineComponent(div, result, prefix, designSystem, designSystemURL) {
        let infobox = document.createElement('div');
        let contains = [];

        contains.push = div.getAttribute('class');

        infobox.innerHTML = contains.join(", ");

        div.style.outline = '3px dashed #d53880';

        div.appendChild(infobox);

        div.setAttribute('data-stylespy', prefix);

        addDesignSystemLink(div, result, designSystem, designSystemURL);
    }

    function addDesignSystemLink(div, result, designSystem, designSystemURL) {
        let link = document.createElement('a');

        link.style = `
            left: ${div.getBoundingClientRect().left};
            top: ${div.getBoundingClientRect().top};`;

            link.setAttribute('class', 'stylespy-link');
            link.href = designSystemURL + result[0].component;
            link.text = designSystem + ' ' + result[0].name;
            link.target = '_blank';
        
        div.addEventListener('mouseover', x => {
            link.classList.add('stylespy-link--show');
        });

        div.addEventListener('mouseout', x => {
            link.classList.remove('stylespy-link--show');
        });

        div.insertAdjacentHTML(result[0].label, link.outerHTML);
    }    
}
