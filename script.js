
        // Login dropdown toggle
        const loginBtn = document.getElementById('loginBtn');
        const loginDropdown = document.getElementById('loginDropdown');

        loginBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            loginDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            loginDropdown.classList.remove('active');
        });

        loginDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Login methods
        function loginWith(method) {
            alert(`Logging in with ${method}...`);
            loginDropdown.classList.remove('active');
        }

        // Face recognition functionality
        const faceLoginBtn = document.getElementById('faceLoginBtn');
        const faceModal = document.getElementById('faceModal');
        const closeModal = document.getElementById('closeModal');
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const captureBtn = document.getElementById('captureBtn');
        const statusMessage = document.getElementById('statusMessage');
        let stream = null;

        faceLoginBtn.addEventListener('click', async () => {
            faceModal.classList.add('active');
            loginDropdown.classList.remove('active');
            statusMessage.innerHTML = '<div class="status-message">Requesting camera permissions...</div>';
            
            // Stop any existing stream first
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                video.srcObject = null;
                stream = null;
            }
            
            try {
                // Always request fresh camera permissions
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { 
                        width: { ideal: 640 },
                        height: { ideal: 480 }
                    } 
                });
                video.srcObject = stream;
                statusMessage.innerHTML = '<div class="status-success">Camera ready! Position your face in the frame.</div>';
            } catch (err) {
                statusMessage.innerHTML = '<div class="status-error">Camera access denied. Please enable camera permissions in your browser settings.</div>';
                console.error('Error accessing camera:', err);
            }
        });

        closeModal.addEventListener('click', () => {
            faceModal.classList.remove('active');
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                video.srcObject = null;
            }
        });

        captureBtn.addEventListener('click', () => {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Simulate face recognition process
            statusMessage.innerHTML = '<div class="status-success">Face captured! Authenticating...</div>';
            
            setTimeout(() => {
                statusMessage.innerHTML = '<div class="status-success">✓ Authentication successful! Logging you in...</div>';
                
                setTimeout(() => {
                    faceModal.classList.remove('active');
                    if (stream) {
                        stream.getTracks().forEach(track => track.stop());
                        video.srcObject = null;
                    }
                    alert('Successfully logged in with face recognition!');
                }, 1500);
            }, 2000);
        });

        // Upload file function
        function uploadFile() {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.onchange = (e) => {
                const files = Array.from(e.target.files);
                alert(`Uploading ${files.length} file(s)...`);
            };
            input.click();
        }

        // Search functionality
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = e.target.value;
                if (searchTerm) {
                    alert(`Searching for: ${searchTerm}`);
                }
            }
        });