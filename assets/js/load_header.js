fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;

        // Reinitialize dropotron for the navigation menu
        if (typeof jQuery !== 'undefined') {
            $('#nav > ul').dropotron({ 
                alignment: 'right',
                mode: 'fade'
            });
        }
    })
    .catch(error => console.error('Error loading header:', error));