/* ========================================
   EstateVR - Virtual Real Estate Tours
   JavaScript Application
   ======================================== */

// ========================================
// Property Data
// ========================================
const properties = [
    {
        id: 1,
        title: "Oceanview Villa",
        address: "2840 Pacific Coast Hwy, Malibu, CA",
        price: "$4,500,000",
        type: "villa",
        beds: 5,
        baths: 4.5,
        sqft: 4200,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
        agent: { name: "Jessica Chen", avatar: "https://i.pravatar.cc/150?img=5", online: true },
        featured: true,
        vr: true,
        rooms: [
            { name: "Living Room", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2048&q=80" },
            { name: "Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=2048&q=80" },
            { name: "Master Bedroom", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=2048&q=80" },
            { name: "Pool Deck", image: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=2048&q=80" }
        ]
    },
    {
        id: 2,
        title: "Downtown Loft",
        address: "451 Broadway, Manhattan, NY",
        price: "$1,200,000",
        type: "apartment",
        beds: 2,
        baths: 2,
        sqft: 1450,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
        agent: { name: "Marcus Johnson", avatar: "https://i.pravatar.cc/150?img=11", online: true },
        featured: false,
        vr: true,
        rooms: [
            { name: "Living Area", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=2048&q=80" },
            { name: "Kitchen", image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=2048&q=80" },
            { name: "Bedroom", image: "https://images.unsplash.com/photo-1505693416388-b0346efee539?w=2048&q=80" }
        ]
    },
    {
        id: 3,
        title: "Garden Estate",
        address: "892 Oak Valley Rd, Austin, TX",
        price: "$890,000",
        type: "house",
        beds: 4,
        baths: 3,
        sqft: 3100,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
        agent: { name: "Sarah Williams", avatar: "https://i.pravatar.cc/150?img=9", online: false },
        featured: false,
        vr: true,
        rooms: [
            { name: "Entry Hall", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2048&q=80" },
            { name: "Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=2048&q=80" },
            { name: "Backyard", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=2048&q=80" }
        ]
    },
    {
        id: 4,
        title: "Skyline Penthouse",
        address: "875 N Michigan Ave, Chicago, IL",
        price: "$3,100,000",
        type: "penthouse",
        beds: 3,
        baths: 3.5,
        sqft: 2800,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
        agent: { name: "David Park", avatar: "https://i.pravatar.cc/150?img=3", online: true },
        featured: true,
        vr: true,
        rooms: [
            { name: "Great Room", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2048&q=80" },
            { name: "Terrace", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=2048&q=80" },
            { name: "Master Suite", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=2048&q=80" }
        ]
    },
    {
        id: 5,
        title: "Modern Ranch",
        address: "2345 Desert Willow, Scottsdale, AZ",
        price: "$1,650,000",
        type: "house",
        beds: 4,
        baths: 3,
        sqft: 3500,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        agent: { name: "Elena Rodriguez", avatar: "https://i.pravatar.cc/150?img=16", online: true },
        featured: false,
        vr: false,
        rooms: []
    },
    {
        id: 6,
        title: "Lakefront Cottage",
        address: "78 Pine Shore Dr, Lake Tahoe, CA",
        price: "$2,200,000",
        type: "house",
        beds: 3,
        baths: 2.5,
        sqft: 2200,
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
        agent: { name: "Tom Bradley", avatar: "https://i.pravatar.cc/150?img=12", online: false },
        featured: false,
        vr: true,
        rooms: [
            { name: "Great Room", image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=2048&q=80" },
            { name: "Deck", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2048&q=80" }
        ]
    }
];

// ========================================
// State
// ========================================
let currentProperty = null;
let currentRoom = 0;
let vrMode = false;
let scene, camera, renderer, sphere, textureLoader;
let threeInitialized = false;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let targetRotation = { x: 0, y: 0 };
let currentRotation = { x: 0, y: 0 };

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    renderProperties(properties);
});

// ========================================
// Property Rendering
// ========================================
function renderProperties(list) {
    const grid = document.getElementById('property-grid');
    grid.innerHTML = list.map(p => `
        <div class="property-card" onclick="openVR(${p.id})">
            <div class="property-image">
                <img src="${p.image}" alt="${p.title}" loading="lazy"
                    onerror="this.src='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'">
                ${p.featured
            ? '<div class="property-badge featured">Featured</div>'
            : '<div class="property-badge">For Sale</div>'}
                ${p.vr ? `<div class="vr-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg> VR Tour
                </div>` : ''}
            </div>
            <div class="property-info">
                <div class="property-price">${p.price}</div>
                <div class="property-address">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    ${p.address}
                </div>
                <div class="property-features">
                    <div class="feature">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg> ${p.beds} beds
                    </div>
                    <div class="feature">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg> ${p.baths} baths
                    </div>
                    <div class="feature">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        </svg> ${p.sqft.toLocaleString()} sqft
                    </div>
                </div>
                <div class="property-footer">
                    <div class="agent-info">
                        <img src="${p.agent.avatar}" alt="${p.agent.name}" class="agent-avatar"
                            onerror="this.src='https://i.pravatar.cc/150?img=1'">
                        <div>
                            <div class="agent-name">${p.agent.name}</div>
                            ${p.agent.online
            ? '<div class="agent-status">Online</div>'
            : '<div style="font-size:12px;color:var(--text-light);">Offline</div>'}
                        </div>
                    </div>
                    <button class="btn btn-primary btn-sm">${p.vr ? 'Take VR Tour' : 'View Details'}</button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterProperties(type, el) {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    if (type === 'all') renderProperties(properties);
    else renderProperties(properties.filter(p => p.type === type));
}

// ========================================
// View Navigation
// ========================================
function showView(view) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('view-' + view).classList.add('active');
    event.target.classList.add('active');
}

function scrollToProperties() {
    document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
}

function showDashTab(tab, el) {
    document.querySelectorAll('.dash-tab').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
    document.getElementById('dash-' + tab).style.display = 'block';
    el.classList.add('active');
}

// ========================================
// Three.js VR Viewer Setup
// ========================================
function initThreeJS() {
    const container = document.getElementById('three-container');

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.set(0, 0, 0.1);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    // Texture loader
    textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    // Create sphere for 360° panorama
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Invert for inside view

    const material = new THREE.MeshBasicMaterial({
        color: 0x1a1a2e,
        side: THREE.FrontSide
    });

    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Mouse controls
    const canvas = renderer.domElement;

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);

    // Touch controls
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);

    // Device orientation for VR mode
    window.addEventListener('deviceorientation', onDeviceOrientation);

    // Resize handler
    window.addEventListener('resize', onWindowResize);

    // Start render loop
    animate();
}

function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
}

function onMouseMove(event) {
    if (!isDragging) return;

    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    targetRotation.y -= deltaX * 0.005;
    targetRotation.x -= deltaY * 0.005;

    // Clamp vertical rotation
    targetRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.x));

    previousMousePosition = { x: event.clientX, y: event.clientY };
}

function onMouseUp() {
    isDragging = false;
}

function onTouchStart(event) {
    if (event.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
}

function onTouchMove(event) {
    if (!isDragging || event.touches.length !== 1) return;
    event.preventDefault();

    const deltaX = event.touches[0].clientX - previousMousePosition.x;
    const deltaY = event.touches[0].clientY - previousMousePosition.y;

    targetRotation.y -= deltaX * 0.005;
    targetRotation.x -= deltaY * 0.005;

    targetRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.x));

    previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
}

function onTouchEnd() {
    isDragging = false;
}

function onDeviceOrientation(event) {
    if (!vrMode) return;

    const gamma = event.gamma; // Left/Right tilt
    const beta = event.beta;   // Front/Back tilt

    if (gamma !== null && beta !== null) {
        targetRotation.y = THREE.MathUtils.degToRad(gamma) * 2;
        targetRotation.x = THREE.MathUtils.degToRad(beta - 45) * 0.5;
        targetRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.x));
    }
}

function onWindowResize() {
    const container = document.getElementById('three-container');
    if (!container || !camera || !renderer) return;

    const w = container.offsetWidth;
    const h = container.offsetHeight;
    if (w === 0 || h === 0) return; // container still hidden/collapsed

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}

function animate() {
    requestAnimationFrame(animate);

    // Smooth interpolation
    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1;

    // Apply rotation to camera
    camera.rotation.x = currentRotation.x;
    camera.rotation.y = currentRotation.y;

    renderer.render(scene, camera);
}

// ========================================
// VR Tour Functions
// ========================================
function openVR(propertyId) {
    currentProperty = properties.find(p => p.id === propertyId);
    if (!currentProperty || !currentProperty.vr) {
        showToast('VR tour coming soon for this property!');
        return;
    }

    currentRoom = 0;
    document.getElementById('vr-viewer').classList.add('active');

    // Initialize Three.js lazily on first open so the container has real dimensions
    if (!threeInitialized) {
        initThreeJS();
        threeInitialized = true;
    } else {
        // Container was hidden; force renderer to pick up actual size
        onWindowResize();
    }

    updateVRTitle();
    updateInfoPanel();
    buildRoomSelector();
    loadPanorama(currentProperty.rooms[0].image);

    showToast('Drag to look around • Click hotspots to navigate');
}

function closeVR() {
    document.getElementById('vr-viewer').classList.remove('active');
    document.getElementById('chat-panel').classList.remove('active');
    if (document.fullscreenElement) document.exitFullscreen();
    vrMode = false;
}

function goToRoom(index) {
    if (index === currentRoom || index < 0 || index >= currentProperty.rooms.length) return;

    currentRoom = index;
    updateVRTitle();

    // Update thumbnails
    document.querySelectorAll('.room-thumb').forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });

    // Load new panorama with fade effect
    const container = document.getElementById('three-container');
    container.style.opacity = '0';
    container.style.transition = 'opacity 0.3s';

    setTimeout(() => {
        loadPanorama(currentProperty.rooms[index].image);
        container.style.opacity = '1';
    }, 300);
}

function updateVRTitle() {
    const room = currentProperty.rooms[currentRoom];
    document.getElementById('vr-title').textContent = `${currentProperty.title} - ${room.name}`;
}

function updateInfoPanel() {
    document.getElementById('info-title').textContent = currentProperty.title;
    document.getElementById('info-price').textContent = currentProperty.price;
}

function buildRoomSelector() {
    const selector = document.getElementById('room-selector');
    selector.innerHTML = currentProperty.rooms.map((r, i) => {
        // Use a smaller image for thumbnails to avoid CORS cache collision with TextureLoader
        const thumbUrl = r.image.replace('w=2048', 'w=200').replace('q=80', 'q=60');
        return `
            <div class="room-thumb ${i === 0 ? 'active' : ''}" onclick="goToRoom(${i})">
                <img src="${thumbUrl}" alt="${r.name}" loading="lazy"
                    crossorigin="anonymous"
                    onerror="this.src='https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=60'">
            </div>
        `;
    }).join('');
}

function loadPanorama(imageUrl) {
    textureLoader.load(
        imageUrl,
        (texture) => {
            // Use default UV mapping (not EquirectangularReflectionMapping which is for env maps)
            texture.encoding = THREE.sRGBEncoding;
            sphere.material.map = texture;
            sphere.material.color.set(0xffffff); // reset to white so texture shows true colors
            sphere.material.needsUpdate = true;
        },
        undefined,
        (error) => {
            console.warn('Failed to load panorama, using fallback:', error);
            // Create a procedural gradient texture as fallback
            const canvas = document.createElement('canvas');
            canvas.width = 2048;
            canvas.height = 1024;
            const ctx = canvas.getContext('2d');

            const gradient = ctx.createLinearGradient(0, 0, 0, 1024);
            gradient.addColorStop(0, '#1a365d');
            gradient.addColorStop(0.5, '#2c5282');
            gradient.addColorStop(1, '#4a5568');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 2048, 1024);

            // Add some "room" elements
            ctx.fillStyle = 'rgba(255,255,255,0.05)';
            for (let i = 0; i < 20; i++) {
                ctx.fillRect(Math.random() * 2048, Math.random() * 1024, 100 + Math.random() * 200, 50 + Math.random() * 100);
            }

            const fallbackTexture = new THREE.CanvasTexture(canvas);
            sphere.material.map = fallbackTexture;
            sphere.material.color.set(0xffffff);
            sphere.material.needsUpdate = true;
        }
    );
}

// ========================================
// Chat Functions
// ========================================
function toggleChat() {
    document.getElementById('chat-panel').classList.toggle('active');
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;

    const container = document.getElementById('chat-messages');
    container.innerHTML += `<div class="chat-msg user">${escapeHtml(msg)}</div>`;
    input.value = '';
    container.scrollTop = container.scrollHeight;

    // Auto-reply
    setTimeout(() => {
        const replies = [
            "That's a great question! The property has been recently renovated with premium finishes.",
            "I can schedule a private showing for you this weekend if you're interested.",
            "The neighborhood has excellent schools and is just 5 minutes from downtown.",
            "This property has been on the market for 12 days and we're seeing a lot of interest.",
            "Would you like me to send you the full property disclosure documents?",
            "The HOA fees are $450/month and include landscaping, pool maintenance, and security.",
            "Yes, the property comes with a 2-car garage and additional driveway parking.",
            "The kitchen was completely remodeled last year with Viking appliances and quartz countertops."
        ];
        const reply = replies[Math.floor(Math.random() * replies.length)];
        container.innerHTML += `<div class="chat-msg agent">${reply}</div>`;
        container.scrollTop = container.scrollHeight;
    }, 1000 + Math.random() * 1000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========================================
// VR Mode
// ========================================
function toggleVRMode() {
    vrMode = !vrMode;
    const container = document.getElementById('vr-viewer');

    if (vrMode) {
        container.requestFullscreen?.().catch(() => {
            showToast('Fullscreen not supported on this device');
        });
        showToast('VR Mode: Move your device to look around');

        // iOS device orientation permission
        if (typeof DeviceOrientationEvent !== 'undefined' &&
            typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(response => {
                    if (response !== 'granted') {
                        showToast('Device orientation permission denied');
                        vrMode = false;
                    }
                })
                .catch(() => {
                    showToast('Could not request device orientation');
                    vrMode = false;
                });
        }
    } else {
        document.exitFullscreen?.();
    }
}

// ========================================
// Utility Functions
// ========================================
function scheduleVisit() {
    showToast('Visit scheduled! Check your email for confirmation.');
}

function simulateUpload() {
    showToast('Processing 360° panoramas... This may take a few minutes.');
    setTimeout(() => showToast('VR tour published successfully!'), 2000);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========================================
// Keyboard Shortcuts
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const viewer = document.getElementById('vr-viewer');
        if (viewer.classList.contains('active')) {
            closeVR();
        }
    }
});
