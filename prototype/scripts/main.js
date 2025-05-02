document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let guides = [];
    const statusFlow = ['pending', 'transit', 'delivered'];
    const statusLabels = {
        'pending': 'Pendiente',
        'transit': 'En tránsito',
        'delivered': 'Entregado'
    };
    const statusClasses = {
        'pending': 'badge--pending',
        'transit': 'badge--transit',
        'delivered': 'badge--delivered'
    };

    // Elementos del DOM
    const form = document.querySelector('.form');
    const guideNumberInput = document.getElementById('guide-number');
    const originInput = document.getElementById('origin');
    const destinationInput = document.getElementById('destination');
    const recipientInput = document.getElementById('recipient');
    const creationDateInput = document.getElementById('creation-date');
    const statusSelect = document.getElementById('status');
    const searchInput = document.querySelector('.search__input');
    const searchBtn = document.querySelector('.search__btn');
    const tableBody = document.querySelector('tbody');
    const hamburgerBtn = document.querySelector('.header__hamburger');
    const navMenu = document.querySelector('.header__nav');
    const navLinks = document.querySelectorAll('.header__nav a');
    // Contadores del panel de estado
    const activeCountElement = document.querySelector('.status__card:first-child .status__card-count');
    const processCountElement = document.querySelector('.status__card:nth-child(2) .status__card-count');
    const transitCountElement = document.querySelector('.status__card:nth-child(3) .status__card-count');
    const deliveredCountElement = document.querySelector('.status__card:last-child .status__card-count');
    
    // Datos iniciales (simulados)
    const initialGuides = [
        {
            id: 'HGX-2023-001',
            number: 'HGX-2023-001',
            origin: 'Bogotá',
            destination: 'Medellín',
            recipient: 'Cliente Ejemplo 1',
            creationDate: '2023-10-10',
            status: 'delivered',
            lastUpdate: '2023-10-15',
            history: [
                { status: 'pending', date: '2023-10-10', time: '10:00' },
                { status: 'transit', date: '2023-10-12', time: '14:30' },
                { status: 'delivered', date: '2023-10-15', time: '09:15' }
            ]
        },
        {
            id: 'HGX-2023-002',
            number: 'HGX-2023-002',
            origin: 'Cali',
            destination: 'Barranquilla',
            recipient: 'Cliente Ejemplo 2',
            creationDate: '2023-10-09',
            status: 'transit',
            lastUpdate: '2023-10-14',
            history: [
                { status: 'pending', date: '2023-10-09', time: '08:00' },
                { status: 'transit', date: '2023-10-14', time: '11:45' }
            ]
        },
        {
            id: 'HGX-2023-003',
            number: 'HGX-2023-003',
            origin: 'Cartagena',
            destination: 'Bucaramanga',
            recipient: 'Cliente Ejemplo 3',
            creationDate: '2023-10-08',
            status: 'pending',
            lastUpdate: '2023-10-13',
            history: [
                { status: 'pending', date: '2023-10-08', time: '16:20' }
            ]
        },
        {
            id: 'HGX-2023-004',
            number: 'HGX-2023-004',
            origin: 'Pereira',
            destination: 'Manizales',
            recipient: 'Cliente Ejemplo 4',
            creationDate: '2023-10-07',
            status: 'transit',
            lastUpdate: '2023-10-12',
            history: [
                { status: 'pending', date: '2023-10-07', time: '09:30' },
                { status: 'transit', date: '2023-10-12', time: '13:15' }
            ]
        }
    ];

    // Inicialización
    function init() {
        guides = [...initialGuides];
        renderGuideList();
        updateStatusPanel();
        setupEventListeners();
    }
    
    // Configurar event listeners
    function setupEventListeners() {
        // Formulario de registro
        form.addEventListener('submit', handleFormSubmit);
        
        // Búsqueda
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') handleSearch();
        });
        
        // Menú hamburguesa
        hamburgerBtn.addEventListener('click', function() {
            this.classList.toggle('header__nav--active');
            navMenu.classList.toggle('header__nav--active');
            
            if (navMenu.classList.contains('header__nav--active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        //Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerBtn.classList.remove('header__nav--active');
                navMenu.classList.remove('header__nav--active');
                document.body.style.overflow = '';
            });
        });
    }

    // Manejar el envío del formulario
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validar campos
        if (!validateForm()) return;
        
        // Crear nueva guía
        const newGuide = {
            id: guideNumberInput.value.trim(),
            number: guideNumberInput.value.trim(),
            origin: originInput.value.trim(),
            destination: destinationInput.value.trim(),
            recipient: recipientInput.value.trim(),
            creationDate: creationDateInput.value,
            status: statusSelect.value,
            lastUpdate: getCurrentDateTime().date,
            history: [
                { 
                    status: statusSelect.value, 
                    date: getCurrentDateTime().date, 
                    time: getCurrentDateTime().time 
                }
            ]
        };
        
        // Agregar a la lista
        guides.push(newGuide);
        
        // Actualizar UI
        renderGuideList();
        updateStatusPanel();
        clearForm();
        
        // Mostrar mensaje de éxito
        showAlert('Guía registrada exitosamente', 'success');
    }

    // Validar formulario
    function validateForm() {
        let isValid = true;
        
        // Validar campos vacíos
        [
            guideNumberInput, 
            originInput, 
            destinationInput, 
            recipientInput, 
            creationDateInput
        ].forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                markFormField(input, isValid);
            } else {
                markFormField(input, isValid);
            }
        });
        
        // Validar estado seleccionado
        if (!statusSelect.value) {
            markFormField(statusSelect, isValid);
            isValid = false;
        } else {
            markFormField(statusSelect, isValid);
        }
        
        // Validar número de guía único
        if (guides.some(guide => guide.id === guideNumberInput.value.trim())) {
            isValid = false;
            markFormField(guideNumberInput, isValid);
            showAlert('El número de guía ya existe', 'error');
        }
        
        return isValid;
    }
    
    // Marcar campo como válido o inválido
    function markFormField(element, valid) {
        const className = valid === true ? 'valid' : 'invalid';
        element.classList.add(className);
        element.labels[0].classList.add(className);
    }

    // Limpiar formulario
    function clearForm() {
        form.reset();
        document.querySelectorAll('.form__group input, .form__group select').forEach(el => {
            el.style.borderColor = '#ddd';
        });
    }

    // Obtener fecha y hora actual
    function getCurrentDateTime() {
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return { date, time };
    }

    // Formatear fecha para mostrar
    function formatDate(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }    

    // Mostrar alerta
    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert alert--${type}`;
        alert.textContent = message;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.classList.add('alert--fade');
            setTimeout(() => alert.remove(), 500);
        }, 3000);
    }
    
    // Renderizar lista de guías
    function renderGuideList(filteredGuides = null) {
        const guidesToRender = filteredGuides || guides;
        tableBody.innerHTML = '';
        
        if (guidesToRender.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = `
                <td colspan="6" style="text-align: center;">No se encontraron guías</td>
            `;
            tableBody.appendChild(emptyRow);
            return;
        }
        
        guidesToRender.forEach(guide => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Número">${guide.number}</td>
                <td data-label="Estado">
                    <span class="status-badge ${statusClasses[guide.status]}">${statusLabels[guide.status]}</span>
                </td>
                <td data-label="Origen">${guide.origin}</td>
                <td data-label="Destino">${guide.destination}</td>
                <td data-label="Actualización">${formatDate(guide.lastUpdate)}</td>
                <td>
                    <div class="action-buttons">
                        <button ${guide.status === statusFlow[statusFlow.length - 1] ? 'disabled' : ''} class="action-btn action-btn--update" data-id="${guide.id}">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                        <button class="action-btn action-btn--history" data-id="${guide.id}">
                            <i class="fas fa-history"></i>
                        </button>
                    </div>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Agregar event listeners a los botones
        document.querySelectorAll('.action-btn--update').forEach(btn => {
            btn.addEventListener('click', function() {
                updateGuideStatus(this.dataset.id);
            });
        });
        
        document.querySelectorAll('.action-btn--history').forEach(btn => {
            btn.addEventListener('click', function() {
                showGuideHistory(this.dataset.id);
            });
        });
    }

    // Actualizar panel de estado
    function updateStatusPanel() {
        const activeCount = guides.length;
        const processCount = guides.filter(g => g.status === 'pending').length;
        const transitCount = guides.filter(g => g.status === 'transit').length;
        const deliveredCount = guides.filter(g => g.status === 'delivered').length;
        
        activeCountElement.textContent = activeCount;
        processCountElement.textContent = processCount;
        transitCountElement.textContent = transitCount;
        deliveredCountElement.textContent = deliveredCount;
    }

    // Actualizar estado de una guía
    function updateGuideStatus(guideId) {
        const guideIndex = guides.findIndex(g => g.id === guideId);
        if (guideIndex === -1) return;
        
        const currentStatus = guides[guideIndex].status;
        const currentStatusIndex = statusFlow.indexOf(currentStatus);
        
        // Verificar si se puede actualizar el estado
        if (currentStatusIndex === -1 || currentStatusIndex === statusFlow.length - 1) {
            showAlert('No se puede actualizar el estado de esta guía', 'error');
            return;
        }
        
        // Actualizar estado
        const newStatus = statusFlow[currentStatusIndex + 1];
        const currentDateTime = getCurrentDateTime();
        
        guides[guideIndex].status = newStatus;
        guides[guideIndex].lastUpdate = currentDateTime.date;
        guides[guideIndex].history.push({
            status: newStatus,
            date: currentDateTime.date,
            time: currentDateTime.time
        });
        
        // Actualizar UI
        renderGuideList();
        updateStatusPanel();
        showAlert('Estado actualizado exitosamente', 'success');
    }

    // Mostrar historial de una guía
function showGuideHistory(guideId) {
    const guide = guides.find(g => g.id === guideId);
    if (!guide) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal__content">
            <span class="modal__close">&times;</span>
            <h2>Historial de la guía ${guide.number}</h2>
            <div class="modal__body">
                <p><strong>Origen:</strong> ${guide.origin}</p>
                <p><strong>Destino:</strong> ${guide.destination}</p>
                <p><strong>Destinatario:</strong> ${guide.recipient}</p>
                
                <h3>Registro de cambios:</h3>
                <table class="history-table">
                    <thead>
                        <tr>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${guide.history.map(entry => `
                            <tr>
                                <td data-label="Estado">
                                    <span class="status-badge--modal ${statusClasses[entry.status]}">
                                        ${statusLabels[entry.status]}
                                    </span>
                                </td>
                                <td data-label="Fecha">${formatDate(entry.date)}</td>
                                <td data-label="Hora">${entry.time}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
        
        // Cerrar modal
        modal.querySelector('.modal__close').addEventListener('click', function() {
            modal.style.display = 'none';
            modal.remove();
        });
        
        // Cerrar al hacer clic fuera del contenido
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                modal.remove();
            }
        });
    }

    // Manejar búsqueda
    function handleSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (!searchTerm) {
            renderGuideList();
            return;
        }
        
        const filteredGuides = guides.filter(guide => 
            guide.number.toLowerCase().includes(searchTerm) ||
            guide.origin.toLowerCase().includes(searchTerm) ||
            guide.destination.toLowerCase().includes(searchTerm) ||
            guide.recipient.toLowerCase().includes(searchTerm) ||
            guide.status.toLowerCase().includes(searchTerm)
        );
        
        renderGuideList(filteredGuides);
    }

    init();
});