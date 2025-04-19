document.addEventListener('DOMContentLoaded', function() {
    // Control del carrusel
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    
    // Duplicar las imágenes para efecto infinito
    if (slides.length > 0) {
        const firstSlide = slides[0].cloneNode(true);
        const secondSlide = slides[1].cloneNode(true);
        carouselTrack.appendChild(firstSlide);
        carouselTrack.appendChild(secondSlide);
    }
    
    // Pausar al hacer hover
    carouselTrack.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    carouselTrack.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
    
    // Hacer imágenes clickeables (ampliación)
    slides.forEach(slide => {
        slide.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            
            // Crear modal para vista ampliada
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '1000';
            modal.style.cursor = 'zoom-out';
            
            const modalImg = document.createElement('img');
            modalImg.src = imgSrc;
            modalImg.alt = imgAlt;
            modalImg.style.maxWidth = '90%';
            modalImg.style.maxHeight = '90%';
            modalImg.style.objectFit = 'contain';
            modalImg.style.borderRadius = '8px';
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            // Cerrar modal al hacer click
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    });
    
    // Navegación del menú
    const navItems = document.querySelectorAll('.main-nav li');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.querySelector('a').getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            // Remover clase active de todos los items
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Agregar clase active al item clickeado
            this.classList.add('active');
            
            // Acciones específicas
            if (this.textContent.includes('Cerrar Sesión')) {
                if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
                    window.location.href = 'index.html';
                }
            } else if (this.textContent.includes('Acerca de')) {
                // Aquí puedes implementar un modal con información
                alert('PreIntellectus - Plataforma educativa de simulacros gratuitos\nVersión 2025');
            }
        });
    });
    
    // Efecto de carga suave
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});