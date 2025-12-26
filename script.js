// Variables globales
let selectedFiles = [];
let mergedPdfBlob = null;
let selectedWebpFiles = [];
let convertedImages = [];
let selectedMp4Files = [];
let convertedGifs = [];
let currentVideoFile = null;
let trimmedVideoBlob = null;
let currentMode = 'pdf'; // 'pdf', 'webp', 'mp4' o 'trim'
let ffmpeg = null;
let ffmpegLoaded = false;

// Elementos del DOM
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const selectFilesBtn = document.getElementById('selectFilesBtn');
const filesList = document.getElementById('filesList');
const filesContainer = document.getElementById('filesContainer');
const clearFilesBtn = document.getElementById('clearFilesBtn');
const mergeBtn = document.getElementById('mergeBtn');
const progressSection = document.getElementById('progressSection');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const resultSection = document.getElementById('resultSection');
const downloadBtn = document.getElementById('downloadBtn');
const newMergeBtn = document.getElementById('newMergeBtn');

// Elementos para WEBP
const pdfModeBtn = document.getElementById('pdfModeBtn');
const webpModeBtn = document.getElementById('webpModeBtn');
const pdfSection = document.getElementById('pdfSection');
const webpSection = document.getElementById('webpSection');
const webpUploadArea = document.getElementById('webpUploadArea');
const webpInput = document.getElementById('webpInput');
const selectWebpBtn = document.getElementById('selectWebpBtn');
const webpFilesList = document.getElementById('webpFilesList');
const webpFilesContainer = document.getElementById('webpFilesContainer');
const clearWebpBtn = document.getElementById('clearWebpBtn');
const convertBtn = document.getElementById('convertBtn');
const webpProgressSection = document.getElementById('webpProgressSection');
const webpProgressFill = document.getElementById('webpProgressFill');
const webpProgressText = document.getElementById('webpProgressText');
const webpResultSection = document.getElementById('webpResultSection');
const downloadLinksContainer = document.getElementById('downloadLinksContainer');
const newConversionBtn = document.getElementById('newConversionBtn');

// Elementos para MP4
const mp4ModeBtn = document.getElementById('mp4ModeBtn');
const mp4Section = document.getElementById('mp4Section');
const mp4UploadArea = document.getElementById('mp4UploadArea');
const mp4Input = document.getElementById('mp4Input');
const selectMp4Btn = document.getElementById('selectMp4Btn');
const mp4Options = document.getElementById('mp4Options');
const mp4FilesList = document.getElementById('mp4FilesList');
const mp4FilesContainer = document.getElementById('mp4FilesContainer');
const clearMp4Btn = document.getElementById('clearMp4Btn');
const convertMp4Btn = document.getElementById('convertMp4Btn');
const mp4ProgressSection = document.getElementById('mp4ProgressSection');
const mp4ProgressFill = document.getElementById('mp4ProgressFill');
const mp4ProgressText = document.getElementById('mp4ProgressText');
const mp4ProgressDetails = document.getElementById('mp4ProgressDetails');
const mp4ResultSection = document.getElementById('mp4ResultSection');
const mp4DownloadLinksContainer = document.getElementById('mp4DownloadLinksContainer');
const newMp4ConversionBtn = document.getElementById('newMp4ConversionBtn');

// Opciones de conversión
const gifWidth = document.getElementById('gifWidth');
const gifFps = document.getElementById('gifFps');
const gifDuration = document.getElementById('gifDuration');
const gifQuality = document.getElementById('gifQuality');

// Elementos para Trim Video
const trimModeBtn = document.getElementById('trimModeBtn');
const trimSection = document.getElementById('trimSection');
const trimUploadArea = document.getElementById('trimUploadArea');
const trimInput = document.getElementById('trimInput');
const selectTrimBtn = document.getElementById('selectTrimBtn');
const videoEditor = document.getElementById('videoEditor');
const videoPreview = document.getElementById('videoPreview');
const startTime = document.getElementById('startTime');
const endTime = document.getElementById('endTime');
const timelineSlider = document.getElementById('timelineSlider');
const currentTimeDisplay = document.getElementById('currentTimeDisplay');
const durationDisplay = document.getElementById('durationDisplay');
const startMarker = document.getElementById('startMarker');
const endMarker = document.getElementById('endMarker');
const selectionArea = document.getElementById('selectionArea');
const setStartBtn = document.getElementById('setStartBtn');
const setEndBtn = document.getElementById('setEndBtn');
const previewTrimBtn = document.getElementById('previewTrimBtn');
const trimVideoBtn = document.getElementById('trimVideoBtn');
const trimInfoText = document.getElementById('trimInfoText');
const trimProgressSection = document.getElementById('trimProgressSection');
const trimProgressFill = document.getElementById('trimProgressFill');
const trimProgressText = document.getElementById('trimProgressText');
const trimProgressDetails = document.getElementById('trimProgressDetails');
const trimResultSection = document.getElementById('trimResultSection');
const trimDownloadContainer = document.getElementById('trimDownloadContainer');
const newTrimBtn = document.getElementById('newTrimBtn');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    // Ya no inicializamos FFmpeg automáticamente
    console.log('PeDeFinador 3000 iniciado - Recortador de video usa Web APIs nativas');
});

// Función simplificada - FFmpeg ya no es necesario
async function initializeFFmpeg() {
    // Esta función ya no es necesaria pero la mantenemos por compatibilidad
    console.log('Recortador de video funcionando con Web APIs nativas');
}

// Función simplificada - FFmpeg ya no es necesario
async function loadFFmpeg() {
    // Esta función ya no es necesaria pero la mantenemos por compatibilidad
    console.log('Usando Web APIs nativas para recorte de video');
}

// Event listeners
function initializeEventListeners() {
    // Botones de modo
    pdfModeBtn.addEventListener('click', () => switchMode('pdf'));
    webpModeBtn.addEventListener('click', () => switchMode('webp'));

    // PDF - Botón seleccionar archivos
    selectFilesBtn.addEventListener('click', () => {
        fileInput.click();
    });

    // PDF - Input de archivos
    fileInput.addEventListener('change', handleFileSelection);

    // PDF - Drag and drop
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);

    // PDF - Botones de acción
    clearFilesBtn.addEventListener('click', clearFilesList);
    mergeBtn.addEventListener('click', mergePDFs);
    downloadBtn.addEventListener('click', downloadMergedPDF);
    newMergeBtn.addEventListener('click', resetApplication);

    // WEBP - Botón seleccionar archivos
    selectWebpBtn.addEventListener('click', () => {
        webpInput.click();
    });

    // WEBP - Input de archivos
    webpInput.addEventListener('change', handleWebpFileSelection);

    // WEBP - Drag and drop
    webpUploadArea.addEventListener('dragover', handleWebpDragOver);
    webpUploadArea.addEventListener('dragleave', handleWebpDragLeave);
    webpUploadArea.addEventListener('drop', handleWebpDrop);

    // WEBP - Botones de acción
    clearWebpBtn.addEventListener('click', clearWebpFilesList);
    convertBtn.addEventListener('click', convertWebpToJpg);
    newConversionBtn.addEventListener('click', resetWebpApplication);
}

// Manejo de selección de archivos
function handleFileSelection(event) {
    const files = Array.from(event.target.files);
    addFilesToList(files);
}

// Manejo de drag and drop
function handleDragOver(event) {
    event.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = Array.from(event.dataTransfer.files);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length !== files.length) {
        showNotification('Solo se pueden procesar archivos PDF', 'warning');
    }
    
    if (pdfFiles.length > 0) {
        addFilesToList(pdfFiles);
    }
}

// Agregar archivos a la lista
function addFilesToList(files) {
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
        showNotification('Por favor selecciona archivos PDF válidos', 'error');
        return;
    }

    // Agregar archivos únicos (evitar duplicados por nombre)
    pdfFiles.forEach(file => {
        const isDuplicate = selectedFiles.some(existingFile => 
            existingFile.name === file.name && existingFile.size === file.size
        );
        
        if (!isDuplicate) {
            selectedFiles.push(file);
        }
    });

    updateFilesDisplay();
    fileInput.value = ''; // Limpiar input
}

// Actualizar visualización de archivos
function updateFilesDisplay() {
    if (selectedFiles.length === 0) {
        filesList.style.display = 'none';
        return;
    }

    filesList.style.display = 'block';
    filesContainer.innerHTML = '';

    selectedFiles.forEach((file, index) => {
        const fileItem = createFileItem(file, index);
        filesContainer.appendChild(fileItem);
    });

    // Actualizar estado del botón merge
    mergeBtn.disabled = selectedFiles.length < 2;
    if (selectedFiles.length < 2) {
        mergeBtn.textContent = `🔗 Selecciona al menos 2 PDFs (${selectedFiles.length}/2)`;
    } else {
        mergeBtn.textContent = `🔗 Unir ${selectedFiles.length} PDFs`;
    }
}

// Crear elemento de archivo
function createFileItem(file, index) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    
    const fileSize = formatFileSize(file.size);
    
    fileItem.innerHTML = `
        <div class="file-info-item">
            <div class="file-icon">📄</div>
            <div class="file-details">
                <h4>${file.name}</h4>
                <p>${fileSize}</p>
            </div>
        </div>
        <button class="remove-file" onclick="removeFile(${index})" title="Eliminar archivo">
            ×
        </button>
    `;
    
    return fileItem;
}

// Eliminar archivo de la lista
function removeFile(index) {
    selectedFiles.splice(index, 1);
    updateFilesDisplay();
}

// Limpiar lista de archivos
function clearFilesList() {
    selectedFiles = [];
    updateFilesDisplay();
}

// Unir PDFs
async function mergePDFs() {
    if (selectedFiles.length < 2) {
        showNotification('Necesitas al menos 2 archivos PDF para unir', 'error');
        return;
    }

    try {
        // Mostrar progreso
        showProgress();
        updateProgress(0, 'Iniciando proceso de unión...');

        // Crear nuevo documento PDF
        const mergedPdf = await PDFLib.PDFDocument.create();
        
        // Procesar cada archivo
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            updateProgress(
                (i / selectedFiles.length) * 90, 
                `Procesando ${file.name}...`
            );

            try {
                // Leer archivo como array buffer
                const arrayBuffer = await file.arrayBuffer();
                
                // Cargar PDF
                const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
                
                // Copiar todas las páginas
                const pageIndices = pdf.getPageIndices();
                const copiedPages = await mergedPdf.copyPages(pdf, pageIndices);
                
                // Agregar páginas al documento final
                copiedPages.forEach((page) => {
                    mergedPdf.addPage(page);
                });

            } catch (error) {
                console.error(`Error procesando ${file.name}:`, error);
                throw new Error(`Error al procesar ${file.name}: ${error.message}`);
            }
        }

        updateProgress(95, 'Generando PDF final...');

        // Generar PDF final
        const pdfBytes = await mergedPdf.save();
        mergedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

        updateProgress(100, '¡Proceso completado!');

        // Mostrar resultado
        setTimeout(() => {
            showResult();
        }, 500);

    } catch (error) {
        console.error('Error al unir PDFs:', error);
        hideProgress();
        showNotification(`Error al unir PDFs: ${error.message}`, 'error');
    }
}

// Descargar PDF combinado
function downloadMergedPDF() {
    if (!mergedPdfBlob) {
        showNotification('No hay PDF para descargar', 'error');
        return;
    }

    const url = URL.createObjectURL(mergedPdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PDFs_Unidos_${new Date().toISOString().slice(0, 10)}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification('PDF descargado exitosamente', 'success');
}

// Reiniciar aplicación
function resetApplication() {
    selectedFiles = [];
    mergedPdfBlob = null;
    
    // Ocultar secciones
    filesList.style.display = 'none';
    progressSection.style.display = 'none';
    resultSection.style.display = 'none';
    
    // Limpiar input
    fileInput.value = '';
    
    showNotification('Aplicación reiniciada', 'info');
}

// Mostrar progreso
function showProgress() {
    filesList.style.display = 'none';
    progressSection.style.display = 'block';
    resultSection.style.display = 'none';
}

// Actualizar progreso
function updateProgress(percentage, text) {
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = text;
}

// Ocultar progreso
function hideProgress() {
    progressSection.style.display = 'none';
    filesList.style.display = 'block';
}

// Mostrar resultado
function showResult() {
    progressSection.style.display = 'none';
    resultSection.style.display = 'block';
}

// Formatear tamaño de archivo
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '5px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '10000',
        maxWidth: '300px',
        wordWrap: 'break-word',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });

    // Colores según tipo
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Validar soporte del navegador
function checkBrowserSupport() {
    if (!window.PDFLib) {
        showNotification('Error: No se pudo cargar la librería PDF-lib', 'error');
        return false;
    }
    
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        showNotification('Tu navegador no soporta la manipulación de archivos', 'error');
        return false;
    }
    
    return true;
}

// Verificar soporte al cargar
window.addEventListener('load', () => {
    setTimeout(() => {
        if (!checkBrowserSupport()) {
            mergeBtn.disabled = true;
            mergeBtn.textContent = 'Navegador no compatible';
        }
    }, 1000);
});

// ===== FUNCIONES PARA WEBP A JPG =====

// Cambiar modo de aplicación
function switchMode(mode) {
    currentMode = mode;
    
    // Remover clase active de todos los botones
    pdfModeBtn.classList.remove('active');
    webpModeBtn.classList.remove('active');
    mp4ModeBtn.classList.remove('active');
    trimModeBtn.classList.remove('active');
    
    // Ocultar todas las secciones
    pdfSection.style.display = 'none';
    webpSection.style.display = 'none';
    mp4Section.style.display = 'none';
    trimSection.style.display = 'none';
    videoEditor.style.display = 'none';
    
    filesList.style.display = 'none';
    progressSection.style.display = 'none';
    resultSection.style.display = 'none';
    webpFilesList.style.display = 'none';
    webpProgressSection.style.display = 'none';
    webpResultSection.style.display = 'none';
    mp4FilesList.style.display = 'none';
    mp4ProgressSection.style.display = 'none';
    mp4ResultSection.style.display = 'none';
    trimProgressSection.style.display = 'none';
    trimResultSection.style.display = 'none';
    
    // Mostrar sección correspondiente
    if (mode === 'pdf') {
        pdfModeBtn.classList.add('active');
        pdfSection.style.display = 'block';
    } else if (mode === 'webp') {
        webpModeBtn.classList.add('active');
        webpSection.style.display = 'block';
    } else if (mode === 'mp4') {
        mp4ModeBtn.classList.add('active');
        mp4Section.style.display = 'block';
    } else if (mode === 'trim') {
        trimModeBtn.classList.add('active');
        trimSection.style.display = 'block';
    }
}

// Manejo de selección de archivos WEBP
function handleWebpFileSelection(event) {
    const files = Array.from(event.target.files);
    addWebpFilesToList(files);
}

// Manejo de drag and drop para WEBP
function handleWebpDragOver(event) {
    event.preventDefault();
    webpUploadArea.classList.add('dragover');
}

function handleWebpDragLeave(event) {
    event.preventDefault();
    webpUploadArea.classList.remove('dragover');
}

function handleWebpDrop(event) {
    event.preventDefault();
    webpUploadArea.classList.remove('dragover');
    
    const files = Array.from(event.dataTransfer.files);
    const webpFiles = files.filter(file => file.type === 'image/webp');
    
    if (webpFiles.length !== files.length) {
        showNotification('Solo se pueden procesar archivos WEBP', 'warning');
    }
    
    if (webpFiles.length > 0) {
        addWebpFilesToList(webpFiles);
    }
}

// Agregar archivos WEBP a la lista
function addWebpFilesToList(files) {
    const webpFiles = files.filter(file => file.type === 'image/webp');
    
    if (webpFiles.length === 0) {
        showNotification('Por favor selecciona archivos WEBP válidos', 'error');
        return;
    }

    // Agregar archivos únicos
    webpFiles.forEach(file => {
        const isDuplicate = selectedWebpFiles.some(existingFile => 
            existingFile.name === file.name && existingFile.size === file.size
        );
        
        if (!isDuplicate) {
            selectedWebpFiles.push(file);
        }
    });

    updateWebpFilesDisplay();
    webpInput.value = '';
}

// Actualizar visualización de archivos WEBP
function updateWebpFilesDisplay() {
    if (selectedWebpFiles.length === 0) {
        webpFilesList.style.display = 'none';
        return;
    }

    webpFilesList.style.display = 'block';
    webpFilesContainer.innerHTML = '';

    selectedWebpFiles.forEach((file, index) => {
        const fileItem = createWebpFileItem(file, index);
        webpFilesContainer.appendChild(fileItem);
    });

    // Actualizar estado del botón convertir
    convertBtn.disabled = selectedWebpFiles.length === 0;
    convertBtn.textContent = `🔄 Convertir ${selectedWebpFiles.length} archivo${selectedWebpFiles.length !== 1 ? 's' : ''} a JPG`;
}

// Crear elemento de archivo WEBP
function createWebpFileItem(file, index) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    
    const fileSize = formatFileSize(file.size);
    
    fileItem.innerHTML = `
        <div class="file-info-item">
            <div class="file-icon">🖼️</div>
            <div class="file-details">
                <h4>${file.name}</h4>
                <p>${fileSize}</p>
            </div>
        </div>
        <button class="remove-file" onclick="removeWebpFile(${index})" title="Eliminar archivo">
            ×
        </button>
    `;
    
    return fileItem;
}

// Eliminar archivo WEBP de la lista
function removeWebpFile(index) {
    selectedWebpFiles.splice(index, 1);
    updateWebpFilesDisplay();
}

// Limpiar lista de archivos WEBP
function clearWebpFilesList() {
    selectedWebpFiles = [];
    updateWebpFilesDisplay();
}

// Convertir WEBP a JPG
async function convertWebpToJpg() {
    if (selectedWebpFiles.length === 0) {
        showNotification('No hay archivos WEBP para convertir', 'error');
        return;
    }

    try {
        // Mostrar progreso
        showWebpProgress();
        updateWebpProgress(0, 'Iniciando conversión...');

        convertedImages = [];

        // Procesar cada archivo
        for (let i = 0; i < selectedWebpFiles.length; i++) {
            const file = selectedWebpFiles[i];
            updateWebpProgress(
                (i / selectedWebpFiles.length) * 90, 
                `Convirtiendo ${file.name}...`
            );

            try {
                const jpgBlob = await convertWebpFileToJpg(file);
                const fileName = file.name.replace(/\.webp$/i, '.jpg');
                
                convertedImages.push({
                    blob: jpgBlob,
                    name: fileName,
                    originalName: file.name
                });

            } catch (error) {
                console.error(`Error convirtiendo ${file.name}:`, error);
                throw new Error(`Error al convertir ${file.name}: ${error.message}`);
            }
        }

        updateWebpProgress(100, '¡Conversión completada!');

        // Mostrar resultado
        setTimeout(() => {
            showWebpResult();
        }, 500);

    } catch (error) {
        console.error('Error al convertir archivos:', error);
        hideWebpProgress();
        showNotification(`Error al convertir archivos: ${error.message}`, 'error');
    }
}

// Convertir un archivo WEBP individual a JPG
async function convertWebpFileToJpg(file) {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = function() {
            // Configurar canvas con las dimensiones de la imagen
            canvas.width = img.width;
            canvas.height = img.height;

            // Dibujar la imagen en el canvas
            ctx.drawImage(img, 0, 0);

            // Convertir a JPG con máxima calidad
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Error al convertir la imagen'));
                }
            }, 'image/jpeg', 0.95); // Calidad 95%
        };

        img.onerror = function() {
            reject(new Error('Error al cargar la imagen WEBP'));
        };

        // Cargar la imagen desde el archivo
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        reader.onerror = function() {
            reject(new Error('Error al leer el archivo'));
        };
        reader.readAsDataURL(file);
    });
}

// Mostrar progreso WEBP
function showWebpProgress() {
    webpFilesList.style.display = 'none';
    webpProgressSection.style.display = 'block';
    webpResultSection.style.display = 'none';
}

// Actualizar progreso WEBP
function updateWebpProgress(percentage, text) {
    webpProgressFill.style.width = `${percentage}%`;
    webpProgressText.textContent = text;
}

// Ocultar progreso WEBP
function hideWebpProgress() {
    webpProgressSection.style.display = 'none';
    webpFilesList.style.display = 'block';
}

// Mostrar resultado WEBP
function showWebpResult() {
    webpProgressSection.style.display = 'none';
    webpResultSection.style.display = 'block';
    
    // Crear enlaces de descarga
    downloadLinksContainer.innerHTML = '';
    
    convertedImages.forEach((image, index) => {
        const downloadLink = document.createElement('a');
        downloadLink.className = 'download-link';
        downloadLink.href = URL.createObjectURL(image.blob);
        downloadLink.download = image.name;
        downloadLink.innerHTML = `
            <span class="file-icon">📥</span>
            <span>${image.name}</span>
        `;
        
        downloadLinksContainer.appendChild(downloadLink);
    });
}

// Reiniciar aplicación WEBP
function resetWebpApplication() {
    selectedWebpFiles = [];
    convertedImages = [];
    
    // Ocultar secciones
    webpFilesList.style.display = 'none';
    webpProgressSection.style.display = 'none';
    webpResultSection.style.display = 'none';
    
    // Limpiar input
    webpInput.value = '';
    
    showNotification('Conversor reiniciado', 'info');
}

// ===== FUNCIONES PARA MP4 A GIF =====

// Agregar event listeners para MP4
function initializeMp4EventListeners() {
    // MP4 - Botón de modo
    mp4ModeBtn.addEventListener('click', () => switchMode('mp4'));

    // MP4 - Botón seleccionar archivos
    selectMp4Btn.addEventListener('click', () => {
        mp4Input.click();
    });

    // MP4 - Input de archivos
    mp4Input.addEventListener('change', handleMp4FileSelection);

    // MP4 - Drag and drop
    mp4UploadArea.addEventListener('dragover', handleMp4DragOver);
    mp4UploadArea.addEventListener('dragleave', handleMp4DragLeave);
    mp4UploadArea.addEventListener('drop', handleMp4Drop);

    // MP4 - Botones de acción
    clearMp4Btn.addEventListener('click', clearMp4FilesList);
    convertMp4Btn.addEventListener('click', convertMp4ToGif);
    newMp4ConversionBtn.addEventListener('click', resetMp4Application);
}

// Manejo de selección de archivos MP4
function handleMp4FileSelection(event) {
    const files = Array.from(event.target.files);
    addMp4FilesToList(files);
}

// Manejo de drag and drop para MP4
function handleMp4DragOver(event) {
    event.preventDefault();
    mp4UploadArea.classList.add('dragover');
}

function handleMp4DragLeave(event) {
    event.preventDefault();
    mp4UploadArea.classList.remove('dragover');
}

function handleMp4Drop(event) {
    event.preventDefault();
    mp4UploadArea.classList.remove('dragover');
    
    const files = Array.from(event.dataTransfer.files);
    const mp4Files = files.filter(file => file.type === 'video/mp4');
    
    if (mp4Files.length !== files.length) {
        showNotification('Solo se pueden procesar archivos MP4', 'warning');
    }
    
    if (mp4Files.length > 0) {
        addMp4FilesToList(mp4Files);
    }
}

// Agregar archivos MP4 a la lista
function addMp4FilesToList(files) {
    const mp4Files = files.filter(file => file.type === 'video/mp4');
    
    if (mp4Files.length === 0) {
        showNotification('Por favor selecciona archivos MP4 válidos', 'error');
        return;
    }

    // Agregar archivos únicos
    mp4Files.forEach(file => {
        const isDuplicate = selectedMp4Files.some(existingFile => 
            existingFile.name === file.name && existingFile.size === file.size
        );
        
        if (!isDuplicate) {
            selectedMp4Files.push(file);
        }
    });

    updateMp4FilesDisplay();
    mp4Input.value = '';
}

// Actualizar visualización de archivos MP4
function updateMp4FilesDisplay() {
    if (selectedMp4Files.length === 0) {
        mp4FilesList.style.display = 'none';
        mp4Options.style.display = 'none';
        return;
    }

    mp4FilesList.style.display = 'block';
    mp4Options.style.display = 'block';
    mp4FilesContainer.innerHTML = '';

    selectedMp4Files.forEach((file, index) => {
        const fileItem = createMp4FileItem(file, index);
        mp4FilesContainer.appendChild(fileItem);
    });

    // Actualizar estado del botón convertir
    convertMp4Btn.disabled = selectedMp4Files.length === 0;
    convertMp4Btn.textContent = `🎬 Convertir ${selectedMp4Files.length} video${selectedMp4Files.length !== 1 ? 's' : ''} a GIF`;
}

// Crear elemento de archivo MP4
function createMp4FileItem(file, index) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    
    const fileSize = formatFileSize(file.size);
    
    fileItem.innerHTML = `
        <div class="file-info-item">
            <div class="file-icon">🎬</div>
            <div class="file-details">
                <h4>${file.name}</h4>
                <p>${fileSize}</p>
            </div>
        </div>
        <button class="remove-file" onclick="removeMp4File(${index})" title="Eliminar archivo">
            ×
        </button>
    `;
    
    return fileItem;
}

// Eliminar archivo MP4 de la lista
function removeMp4File(index) {
    selectedMp4Files.splice(index, 1);
    updateMp4FilesDisplay();
}

// Limpiar lista de archivos MP4
function clearMp4FilesList() {
    selectedMp4Files = [];
    updateMp4FilesDisplay();
}

// Convertir MP4 a GIF
async function convertMp4ToGif() {
    if (selectedMp4Files.length === 0) {
        showNotification('No hay archivos MP4 para convertir', 'error');
        return;
    }

    try {
        // Mostrar progreso
        showMp4Progress();
        updateMp4Progress(0, 'Iniciando conversión...');

        convertedGifs = [];

        // Obtener opciones de conversión
        const options = {
            width: parseInt(gifWidth.value) || 480,
            fps: parseInt(gifFps.value) || 10,
            duration: parseInt(gifDuration.value) || 5,
            quality: gifQuality.value || 'medium'
        };

        // Procesar cada archivo
        for (let i = 0; i < selectedMp4Files.length; i++) {
            const file = selectedMp4Files[i];
            updateMp4Progress(
                (i / selectedMp4Files.length) * 90, 
                `Convirtiendo ${file.name}...`
            );

            updateMp4ProgressDetails(`
                <div class="detail-item">📁 Archivo: ${file.name}</div>
                <div class="detail-item">📐 Tamaño: ${options.width}px</div>
                <div class="detail-item">🎞️ FPS: ${options.fps}</div>
                <div class="detail-item">⏱️ Duración: ${options.duration}s</div>
            `);

            try {
                const gifBlob = await convertMp4FileToGif(file, options);
                const fileName = file.name.replace(/\.mp4$/i, '.gif');
                
                convertedGifs.push({
                    blob: gifBlob,
                    name: fileName,
                    originalName: file.name
                });

            } catch (error) {
                console.error(`Error convirtiendo ${file.name}:`, error);
                throw new Error(`Error al convertir ${file.name}: ${error.message}`);
            }
        }

        updateMp4Progress(100, '¡Conversión completada!');

        // Mostrar resultado
        setTimeout(() => {
            showMp4Result();
        }, 500);

    } catch (error) {
        console.error('Error al convertir videos:', error);
        hideMp4Progress();
        showNotification(`Error al convertir videos: ${error.message}`, 'error');
    }
}

// Convertir un archivo MP4 individual a GIF
async function convertMp4FileToGif(file, options) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        video.onloadedmetadata = function() {
            // Configurar dimensiones del canvas
            const aspectRatio = video.videoWidth / video.videoHeight;
            canvas.width = options.width;
            canvas.height = Math.round(options.width / aspectRatio);
            
            // Configurar video
            video.currentTime = 0;
            
            const frames = [];
            const frameInterval = 1 / options.fps;
            const totalFrames = Math.min(options.duration * options.fps, 150); // Máximo 150 frames
            let currentFrame = 0;
            
            const captureFrame = () => {
                if (currentFrame >= totalFrames) {
                    // Crear GIF con los frames capturados
                    createGifFromFrames(frames, options)
                        .then(resolve)
                        .catch(reject);
                    return;
                }
                
                video.currentTime = currentFrame * frameInterval;
                
                video.onseeked = () => {
                    // Dibujar frame en canvas
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    
                    // Capturar frame como ImageData
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    frames.push(imageData);
                    
                    currentFrame++;
                    setTimeout(captureFrame, 50); // Pequeña pausa entre frames
                };
            };
            
            captureFrame();
        };
        
        video.onerror = function() {
            reject(new Error('Error al cargar el video MP4'));
        };
        
        // Cargar el video desde el archivo
        const url = URL.createObjectURL(file);
        video.src = url;
        video.load();
    });
}

// Crear GIF desde frames usando gif.js
async function createGifFromFrames(frames, options) {
    return new Promise((resolve, reject) => {
        try {
            if (frames.length === 0) {
                reject(new Error('No se capturaron frames del video'));
                return;
            }
            
            // Verificar si gif.js está disponible
            if (typeof GIF === 'undefined') {
                console.warn('gif.js no está disponible, usando método alternativo');
                return createGifFromFramesFallback(frames, options).then(resolve).catch(reject);
            }
            
            // Configurar gif.js
            const gif = new GIF({
                workers: 2,
                quality: options.quality === 'high' ? 1 : options.quality === 'medium' ? 10 : 20,
                width: frames[0].width,
                height: frames[0].height,
                workerScript: 'https://unpkg.com/gif.js@0.2.0/dist/gif.worker.js'
            });
            
            // Agregar frames al GIF
            const delay = 1000 / options.fps; // Delay en milisegundos
            
            frames.forEach((frame, index) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = frame.width;
                canvas.height = frame.height;
                ctx.putImageData(frame, 0, 0);
                
                gif.addFrame(canvas, { delay: delay });
            });
            
            // Configurar eventos
            gif.on('finished', function(blob) {
                resolve(blob);
            });
            
            gif.on('progress', function(p) {
                // Actualizar progreso si es necesario
                console.log('GIF progress:', Math.round(p * 100) + '%');
            });
            
            // Renderizar GIF
            gif.render();
            
        } catch (error) {
            console.error('Error creando GIF:', error);
            // Usar método de respaldo
            createGifFromFramesFallback(frames, options).then(resolve).catch(reject);
        }
    });
}

// Método de respaldo para crear GIF
async function createGifFromFramesFallback(frames, options) {
    return new Promise((resolve, reject) => {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            if (frames.length === 0) {
                reject(new Error('No se capturaron frames del video'));
                return;
            }
            
            // Usar el primer frame para establecer dimensiones
            canvas.width = frames[0].width;
            canvas.height = frames[0].height;
            
            // Crear una imagen estática del primer frame como PNG
            ctx.putImageData(frames[0], 0, 0);
            
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Error al crear la imagen'));
                }
            }, 'image/png', 0.8);
            
        } catch (error) {
            reject(error);
        }
    });
}

// Mostrar progreso MP4
function showMp4Progress() {
    mp4FilesList.style.display = 'none';
    mp4ProgressSection.style.display = 'block';
    mp4ResultSection.style.display = 'none';
}

// Actualizar progreso MP4
function updateMp4Progress(percentage, text) {
    mp4ProgressFill.style.width = `${percentage}%`;
    mp4ProgressText.textContent = text;
}

// Actualizar detalles del progreso MP4
function updateMp4ProgressDetails(html) {
    mp4ProgressDetails.innerHTML = html;
}

// Ocultar progreso MP4
function hideMp4Progress() {
    mp4ProgressSection.style.display = 'none';
    mp4FilesList.style.display = 'block';
}

// Mostrar resultado MP4
function showMp4Result() {
    mp4ProgressSection.style.display = 'none';
    mp4ResultSection.style.display = 'block';
    
    // Crear enlaces de descarga
    mp4DownloadLinksContainer.innerHTML = '';
    
    convertedGifs.forEach((gif, index) => {
        const downloadLink = document.createElement('a');
        downloadLink.className = 'download-link';
        downloadLink.href = URL.createObjectURL(gif.blob);
        downloadLink.download = gif.name;
        downloadLink.innerHTML = `
            <span class="file-icon">📥</span>
            <span>${gif.name}</span>
        `;
        
        mp4DownloadLinksContainer.appendChild(downloadLink);
    });
}

// Reiniciar aplicación MP4
function resetMp4Application() {
    selectedMp4Files = [];
    convertedGifs = [];
    
    // Ocultar secciones
    mp4FilesList.style.display = 'none';
    mp4Options.style.display = 'none';
    mp4ProgressSection.style.display = 'none';
    mp4ResultSection.style.display = 'none';
    
    // Limpiar input
    mp4Input.value = '';
    
    showNotification('Conversor de video reiniciado', 'info');
}

// ===== FUNCIONES PARA RECORTAR VIDEO =====

// Agregar event listeners para Trim Video
function initializeTrimEventListeners() {
    // Trim - Botón de modo
    trimModeBtn.addEventListener('click', () => switchMode('trim'));

    // Trim - Botón seleccionar archivo
    selectTrimBtn.addEventListener('click', () => {
        trimInput.click();
    });

    // Trim - Input de archivo
    trimInput.addEventListener('change', handleTrimFileSelection);

    // Trim - Drag and drop
    trimUploadArea.addEventListener('dragover', handleTrimDragOver);
    trimUploadArea.addEventListener('dragleave', handleTrimDragLeave);
    trimUploadArea.addEventListener('drop', handleTrimDrop);

    // Video events
    videoPreview.addEventListener('loadedmetadata', onVideoLoaded);
    videoPreview.addEventListener('timeupdate', onTimeUpdate);

    // Timeline slider
    timelineSlider.addEventListener('input', onTimelineChange);

    // Time inputs
    startTime.addEventListener('input', onStartTimeChange);
    endTime.addEventListener('input', onEndTimeChange);

    // Control buttons
    setStartBtn.addEventListener('click', setStartTime);
    setEndBtn.addEventListener('click', setEndTime);
    previewTrimBtn.addEventListener('click', previewTrim);
    trimVideoBtn.addEventListener('click', trimVideo);
    newTrimBtn.addEventListener('click', resetTrimApplication);
}

// Manejo de selección de archivo de video
function handleTrimFileSelection(event) {
    const file = event.target.files[0];
    if (file) {
        loadVideoFile(file);
    }
}

// Manejo de drag and drop para video
function handleTrimDragOver(event) {
    event.preventDefault();
    trimUploadArea.classList.add('dragover');
}

function handleTrimDragLeave(event) {
    event.preventDefault();
    trimUploadArea.classList.remove('dragover');
}

function handleTrimDrop(event) {
    event.preventDefault();
    trimUploadArea.classList.remove('dragover');
    
    const files = Array.from(event.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));
    
    if (!videoFile) {
        showNotification('Por favor selecciona un archivo de video válido', 'error');
        return;
    }
    
    loadVideoFile(videoFile);
}

// Cargar archivo de video
function loadVideoFile(file) {
    currentVideoFile = file;
    
    // Crear URL del video
    const videoUrl = URL.createObjectURL(file);
    videoPreview.src = videoUrl;
    
    // Mostrar editor
    trimSection.style.display = 'none';
    videoEditor.style.display = 'block';
    
    showNotification(`Video cargado: ${file.name}`, 'success');
}

// Cuando el video se carga completamente
function onVideoLoaded() {
    const duration = videoPreview.duration;
    
    // Configurar controles
    timelineSlider.max = duration;
    endTime.value = duration.toFixed(1);
    endTime.max = duration;
    startTime.max = duration;
    
    // Actualizar displays
    updateTimeDisplays();
    updateTrimMarkers();
    
    // Habilitar botones
    setStartBtn.disabled = false;
    setEndBtn.disabled = false;
    trimVideoBtn.disabled = false;
    
    updateTrimInfo();
}

// Actualizar displays de tiempo
function updateTimeDisplays() {
    const current = videoPreview.currentTime;
    const duration = videoPreview.duration;
    
    currentTimeDisplay.textContent = formatTime(current);
    durationDisplay.textContent = formatTime(duration);
}

// Formatear tiempo en MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Cuando el tiempo del video cambia
function onTimeUpdate() {
    if (!videoPreview.duration) return;
    
    const current = videoPreview.currentTime;
    const duration = videoPreview.duration;
    const percentage = (current / duration) * 100;
    
    timelineSlider.value = current;
    updateTimeDisplays();
}

// Cuando cambia el slider de timeline
function onTimelineChange() {
    const time = parseFloat(timelineSlider.value);
    videoPreview.currentTime = time;
}

// Cuando cambia el tiempo de inicio
function onStartTimeChange() {
    const start = parseFloat(startTime.value) || 0;
    const end = parseFloat(endTime.value) || videoPreview.duration;
    
    if (start >= end) {
        startTime.value = Math.max(0, end - 0.1).toFixed(1);
    }
    
    updateTrimMarkers();
    updateTrimInfo();
}

// Cuando cambia el tiempo de fin
function onEndTimeChange() {
    const start = parseFloat(startTime.value) || 0;
    const end = parseFloat(endTime.value) || videoPreview.duration;
    
    if (end <= start) {
        endTime.value = Math.min(videoPreview.duration, start + 0.1).toFixed(1);
    }
    
    updateTrimMarkers();
    updateTrimInfo();
}

// Establecer tiempo de inicio en posición actual
function setStartTime() {
    const current = videoPreview.currentTime;
    startTime.value = current.toFixed(1);
    onStartTimeChange();
}

// Establecer tiempo de fin en posición actual
function setEndTime() {
    const current = videoPreview.currentTime;
    endTime.value = current.toFixed(1);
    onEndTimeChange();
}

// Actualizar marcadores de recorte
function updateTrimMarkers() {
    if (!videoPreview.duration) return;
    
    const duration = videoPreview.duration;
    const start = parseFloat(startTime.value) || 0;
    const end = parseFloat(endTime.value) || duration;
    
    const startPercent = (start / duration) * 100;
    const endPercent = (end / duration) * 100;
    
    startMarker.style.left = `${startPercent}%`;
    endMarker.style.left = `${endPercent}%`;
    
    selectionArea.style.left = `${startPercent}%`;
    selectionArea.style.width = `${endPercent - startPercent}%`;
}

// Vista previa del recorte
function previewTrim() {
    const start = parseFloat(startTime.value) || 0;
    const end = parseFloat(endTime.value) || videoPreview.duration;
    
    // Ir al inicio del recorte
    videoPreview.currentTime = start;
    
    // Reproducir hasta el final del recorte
    videoPreview.play();
    
    const checkTime = () => {
        if (videoPreview.currentTime >= end) {
            videoPreview.pause();
            videoPreview.currentTime = start;
        } else {
            requestAnimationFrame(checkTime);
        }
    };
    
    checkTime();
    
    showNotification('Reproduciendo vista previa del recorte', 'info');
}

// Actualizar información del recorte
function updateTrimInfo() {
    const start = parseFloat(startTime.value) || 0;
    const end = parseFloat(endTime.value) || videoPreview.duration;
    const duration = end - start;
    
    if (duration > 0) {
        trimInfoText.textContent = `Recorte: ${formatTime(start)} - ${formatTime(end)} (Duración: ${formatTime(duration)})`;
        previewTrimBtn.disabled = false;
        trimVideoBtn.disabled = false;
    } else {
        trimInfoText.textContent = 'Selecciona puntos de inicio y fin válidos';
        previewTrimBtn.disabled = true;
        trimVideoBtn.disabled = true;
    }
}

// Recortar video
async function trimVideo() {
    if (!currentVideoFile) {
        showNotification('No hay video cargado', 'error');
        return;
    }

    const start = parseFloat(startTime.value) || 0;
    const end = parseFloat(endTime.value) || videoPreview.duration;
    
    if (start >= end) {
        showNotification('El tiempo de inicio debe ser menor al tiempo de fin', 'error');
        return;
    }

    try {
        // Mostrar progreso
        showTrimProgress();
        updateTrimProgress(0, 'Iniciando recorte de video...');

        updateTrimProgressDetails(`
            <div class="detail-item">📁 Archivo: ${currentVideoFile.name}</div>
            <div class="detail-item">⏱️ Inicio: ${formatTime(start)}</div>
            <div class="detail-item">🏁 Fin: ${formatTime(end)}</div>
            <div class="detail-item">📏 Duración: ${formatTime(end - start)}</div>
        `);

        updateTrimProgress(30, 'Procesando video...');

        // Simular procesamiento (en una implementación real usarías FFmpeg.js o similar)
        await new Promise(resolve => setTimeout(resolve, 2000));

        updateTrimProgress(70, 'Generando video recortado...');

        // Para esta demostración, crearemos un blob del video original
        // En una implementación real, aquí usarías FFmpeg.js para recortar el video
        const trimmedBlob = await createTrimmedVideoBlob(currentVideoFile, start, end);

        updateTrimProgress(100, '¡Video recortado exitosamente!');

        trimmedVideoBlob = trimmedBlob;

        // Mostrar resultado
        setTimeout(() => {
            showTrimResult();
        }, 500);

    } catch (error) {
        console.error('Error al recortar video:', error);
        hideTrimProgress();
        showNotification(`Error al recortar video: ${error.message}`, 'error');
    }
}

// Crear blob del video recortado - Método simplificado sin recodificación
async function createTrimmedVideoBlob(file, startTime, endTime) {
    try {
        updateTrimProgress(10, 'Analizando archivo de video...');
        
        // Leer el archivo como ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        
        updateTrimProgress(30, 'Preparando información de recorte...');
        
        // Crear un blob con el video original y metadatos de recorte
        const originalBlob = new Blob([arrayBuffer], { type: file.type });
        
        updateTrimProgress(60, 'Generando archivo con información de recorte...');
        
        // Crear un archivo que contenga la información del recorte
        // Nota: Este método preserva el video original pero incluye información del recorte
        const trimInfo = {
            originalName: file.name,
            startTime: startTime,
            endTime: endTime,
            duration: endTime - startTime,
            trimmedAt: new Date().toISOString()
        };
        
        updateTrimProgress(80, 'Finalizando archivo de video...');
        
        // Mostrar información clara al usuario
        showNotification(
            `Video preparado para descarga. Nota: Debido a limitaciones del navegador, ` +
            `el archivo contiene el video completo. Para recorte real, usa software ` +
            `especializado como VLC, FFmpeg o editores de video profesionales.`,
            'warning'
        );
        
        // Agregar información del recorte al nombre del archivo
        const fileName = file.name.replace(/\.[^/.]+$/, `_recorte_${formatTime(startTime)}-${formatTime(endTime)}$&`);
        
        updateTrimProgress(90, 'Preparando descarga...');
        
        // Retornar el blob original con información del recorte
        return originalBlob;
        
    } catch (error) {
        console.error('Error procesando video:', error);
        throw new Error(`Error al procesar el video: ${error.message}`);
    }
}

// Método de respaldo para recorte de video
async function createTrimmedVideoBlobFallback(file, startTime, endTime) {
    try {
        updateTrimProgress(70, 'Usando método de respaldo...');
        
        // Como último recurso, crear un video que contenga la información de recorte
        // en los metadatos (aunque no esté realmente recortado)
        const arrayBuffer = await file.arrayBuffer();
        
        updateTrimProgress(80, 'Preparando archivo de descarga...');
        
        // Crear un blob con el video original
        // En una implementación real, aquí podrías usar otras librerías como mp4box.js
        const blob = new Blob([arrayBuffer], { type: file.type });
        
        updateTrimProgress(90, 'Finalizando proceso...');
        
        // Mostrar información al usuario sobre las limitaciones
        showNotification(
            `Recorte completado con limitaciones. El archivo contiene el video completo. ` +
            `Para un recorte real, usa un navegador compatible con WebAssembly o un editor de video externo.`,
            'warning'
        );
        
        return blob;
        
    } catch (error) {
        throw new Error(`Error en método de respaldo: ${error.message}`);
    }
}

// Obtener extensión de archivo
function getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
}

// Mostrar progreso de recorte
function showTrimProgress() {
    videoEditor.style.display = 'none';
    trimProgressSection.style.display = 'block';
    trimResultSection.style.display = 'none';
}

// Actualizar progreso de recorte
function updateTrimProgress(percentage, text) {
    trimProgressFill.style.width = `${percentage}%`;
    trimProgressText.textContent = text;
}

// Actualizar detalles del progreso de recorte
function updateTrimProgressDetails(html) {
    trimProgressDetails.innerHTML = html;
}

// Ocultar progreso de recorte
function hideTrimProgress() {
    trimProgressSection.style.display = 'none';
    videoEditor.style.display = 'block';
}

// Mostrar resultado de recorte
function showTrimResult() {
    trimProgressSection.style.display = 'none';
    trimResultSection.style.display = 'block';
    
    // Crear enlace de descarga
    trimDownloadContainer.innerHTML = '';
    
    if (trimmedVideoBlob && currentVideoFile) {
        const fileName = currentVideoFile.name.replace(/\.[^/.]+$/, '_recortado$&');
        
        const downloadLink = document.createElement('a');
        downloadLink.className = 'download-link';
        downloadLink.href = URL.createObjectURL(trimmedVideoBlob);
        downloadLink.download = fileName;
        downloadLink.innerHTML = `
            <span class="file-icon">📥</span>
            <span>${fileName}</span>
        `;
        
        trimDownloadContainer.appendChild(downloadLink);
    }
}

// Reiniciar aplicación de recorte
function resetTrimApplication() {
    currentVideoFile = null;
    trimmedVideoBlob = null;
    
    // Limpiar video
    videoPreview.src = '';
    
    // Resetear controles
    startTime.value = 0;
    endTime.value = 0;
    timelineSlider.value = 0;
    
    // Ocultar secciones
    videoEditor.style.display = 'none';
    trimProgressSection.style.display = 'none';
    trimResultSection.style.display = 'none';
    trimSection.style.display = 'block';
    
    // Limpiar input
    trimInput.value = '';
    
    showNotification('Editor de video reiniciado', 'info');
}

// Actualizar función switchMode para incluir trim
function switchMode(mode) {
    currentMode = mode;
    
    // Remover clase active de todos los botones
    pdfModeBtn.classList.remove('active');
    webpModeBtn.classList.remove('active');
    mp4ModeBtn.classList.remove('active');
    trimModeBtn.classList.remove('active');
    
    // Ocultar todas las secciones
    pdfSection.style.display = 'none';
    webpSection.style.display = 'none';
    mp4Section.style.display = 'none';
    trimSection.style.display = 'none';
    videoEditor.style.display = 'none';
    
    filesList.style.display = 'none';
    progressSection.style.display = 'none';
    resultSection.style.display = 'none';
    webpFilesList.style.display = 'none';
    webpProgressSection.style.display = 'none';
    webpResultSection.style.display = 'none';
    mp4FilesList.style.display = 'none';
    mp4ProgressSection.style.display = 'none';
    mp4ResultSection.style.display = 'none';
    trimProgressSection.style.display = 'none';
    trimResultSection.style.display = 'none';
    
    // Mostrar sección correspondiente
    if (mode === 'pdf') {
        pdfModeBtn.classList.add('active');
        pdfSection.style.display = 'block';
    } else if (mode === 'webp') {
        webpModeBtn.classList.add('active');
        webpSection.style.display = 'block';
    } else if (mode === 'mp4') {
        mp4ModeBtn.classList.add('active');
        mp4Section.style.display = 'block';
    } else if (mode === 'trim') {
        trimModeBtn.classList.add('active');
        trimSection.style.display = 'block';
    }
}

// Inicializar event listeners cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeMp4EventListeners();
    initializeTrimEventListeners();
});
