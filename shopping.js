// ==UserScript==
// @name         Ex. Vat Prices
// @namespace    https://martincarlin.uk
// @version      0.1
// @description  Converts prices on Google Shopping to show prices excluding and including VAT
// @author       Martin Carlin
// @match        https://www.google.co.uk/*
// @match        https://www.google.co.uk/shopping/*
// @match        https://www.google.com/*
// @match        https://www.google.com/shopping/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var searchText = '£';
    var excludedTerms = 'delivery';

    document.body.addEventListener('click', run, true);

    run();

    function run() {

        // add warning banner to top of the page
        let d = document.createElement('div');
        let t = document.createTextNode('EX. VAT PRICES ON');
        d.appendChild(t);
        d.style.position = 'fixed';
        d.style.top = '0px';
        d.style.left = '0px';
        d.style.padding = '5px';
        d.style.background = 'red';
        d.style.color = 'white';
        d.style.fontSize = '14px';
        d.style.fontWeight = 'bold';
        d.style.zIndex = '9000';
        document.getElementsByTagName('body')[0].appendChild(d);

        // main shopping page
        var centerColumn = document.getElementById('search');

        if (centerColumn != null) {
            var tags = centerColumn.getElementsByTagName('span');
            var bTags = centerColumn.getElementsByTagName('b');
            
            if (tags.length) {
                updateTags(tags);
            }

            if (bTags.length) {
                updateTags(bTags);
            }
        }

        // shopping product page (https://www.google.co.uk/shopping/product/...)
        var table = document.getElementById('os-sellers-table');

        if (table != null) {
            var tableTags = table.getElementsByTagName('span');
            
            if (tableTags.length) {
                updateTags(tableTags);
            }
        }
    }
    

    function updateTags(tags) {
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].textContent.includes(searchText) && !tags[i].textContent.includes(excludedTerms) && tags[i].dataset.calculated != 1) {
                let price = parseFloat(tags[i].textContent.replace(/[^0-9.-]+/g, '')).toFixed(2);
                let exVatPrice = parseFloat(price / 1.2).toFixed(2);
                tags[i].textContent = `£${exVatPrice} (£${price} ex vat)`;
                tags[i].style.background = 'yellow';
                tags[i].dataset.calculated = 1;
            }
        }
    }
    
})();