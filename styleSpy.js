{
    const govCatalog = [
        {"class":"govuk-accordion", "name":"Accordion", "component":"accordion"},
        {"class":"govuk-back-link", "name":"Back link", "component":"back-link"},
        {"class":"govuk-breadcrumbs", "name":"Breadcrumbs", "component":"breadcrumbs"},
        {"class":"govuk-button", "name":"Button", "component":"button"},
        {"class":"govuk-character-count", "name":"Character count", "component":"character-count"},
        {"class":"govuk-checkboxes", "name":"Checkboxes", "component":"checkboxes"},
        {"class":"govuk-cookie-banner", "name":"Cookie Banner", "component":"cookie-banner"},
        {"class":"govuk-date-input", "name":"Date input", "component":"date-input"},
        {"class":"govuk-details", "name":"Details", "component":"details"},
        {"class":"govuk-form-group--error", "name":"Error message", "component":"error-message"},
        {"class":"govuk-error-summary", "name":"Error summary", "component":"error-summary"},
        {"class":"govuk-fieldset", "name":"Fieldset", "component":"fieldset"},
        {"class":"govuk-file-upload", "name":"File upload", "component":"file-upload"},
        {"class":"govuk-footer", "name":"Footer", "component":"footer"},
        {"class":"govuk-header", "name":"Header", "component":"header"},
        {"class":"govuk-inset-text", "name":"Inset text", "component":"inset-text"},
        {"class":"govuk-notification-banner", "name":"Notification banner", "component":"notification-banner"},
        {"class":"govuk-panel", "name":"Panel", "component":"panel"},
        {"class":"govuk-phase-banner", "name":"Phase banner", "component":"phase-banner"},
        {"class":"govuk-radios", "name":"Radios", "component":"radios"},
        {"class":"govuk-select", "name":"Select", "component":"select"},
        {"class":"govuk-skip-link", "name":"Skip link", "component":"skip-link"},
        {"class":"govuk-summary-list", "name":"Summary list", "component":"summary-list"},
        {"class":"govuk-table", "name":"Table", "component":"table"},
        {"class":"govuk-tabs", "name":"Tabs", "component":"tabs"},
        {"class":"govuk-tag", "name":"Tag", "component":"tag"},
        {"class":"govuk-input", "name":"Text input", "component":"text-input"},
        {"class":"govuk-textarea", "name":"Textarea", "component":"textarea"},
        {"class":"govuk-warning-text", "name":"Warning text", "component":"warning-text"}
    ];
   
    const hmrcCatalog = [
        {"class":"hmrc-header", "name":"Account header", "component":"account-header"},
        {"class":"hmrc-account-menu", "name":"Account menu", "component":"account-header"},
        {"class":"hmrc-list-with-actions", "name":"Add to list", "component":"add-to-a-list"},
        {"class":"hmrc-banner", "name":"Banner", "component":"hmrc-banner"}, 
        {"class":"hmrc-internal-header", "name":"Internal header", "component":"internal-header"}, 
        {"class":"hmrc-notification-badge", "name":"Notification badge", "component":"notification-badge"}, 
        {"class":"hmrc-page-heading", "name":"Page heading", "component":"page-heading"}, 
        {"class":"hmrc-timeout-dialog", "name":"Service timeout", "component":"service-timeout"}, 
        {"class":"hmrc-sign-out-nav", "name":"Sign out", "component":"sign-out"}, 
        {"class":"hmrc-timeline", "name":"Timeline", "component":"timeline"}, 
        {"class":"hmrc-language-select", "name":"Welsh language toggle", "component":"welsh-language-toggle"}  
    ];

    // Stylesheet
    if (!document.getElementById('style-spy')) {
        let style = document.createElement('style');
        style.innerHTML =
        `
        .stylespy-link {
            color: black;
            border: 1px solid black; 
            background: lightyellow; 
            font-family: Arial,sans-serif;
            font-size: 16px;
            font-weight: normal;
            padding: 10px 12px; 
            position: absolute; 
            width: 1px;
            height: 1px;
            margin: 0;
            overflow: hidden;
            clip: rect(0 0 0 0);
            -webkit-clip-path: inset(50%);
            clip-path: inset(50%);
        }
        .stylespy-link--show,
        .stylespy-link:focus {
            overflow: auto;
            z-index: 99999999;
            width: auto;
            height: auto;
            margin: inherit;
            clip: auto ;
            -webkit-clip-path: none;
            clip-path: none;
        }
        `;
        style.id = 'style-spy';
        document.head.appendChild(style);
    }

    scanPage('hmrc', hmrcCatalog, 'HMRC', 'https://design.tax.service.gov.uk/hmrc-design-patterns/');
    scanPage('govuk', govCatalog, 'GOV.UK', 'https://design-system.service.gov.uk/components/');

    function scanPage(prefix, catalog, designSystem, designSystemURL) {
        let elementCount = 0;

        for (let div of document.querySelectorAll('[class*=' + prefix + '-]')) { 

            if (div.getAttribute('data-stylespy')) {
                continue;
            }

            let classes = div.getAttribute('class');
            let result = identifyElement(catalog, "class", classes);
    
            if (result.length > 0) {
                outlineComponent(div, result, prefix, designSystem, designSystemURL);

                elementCount++;
            }
        }

        console.log("Number of " + prefix + " definitions: ", elementCount);
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

        div.appendChild(link);
    }    
}
