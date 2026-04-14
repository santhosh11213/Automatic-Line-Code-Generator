document.addEventListener('DOMContentLoaded', function() {
    loadHistory();
    updatePagination();
});

document.getElementById('generate-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const brand = document.getElementById('brand-select').value;
    const subbrand = document.getElementById('subbrand-select').value;
    const product = document.getElementById('product-select').value;
    const count = parseInt(document.getElementById('count-input').value);

    if (!brand || !subbrand || !product || count < 1) {
        alert('Please fill all fields correctly.');
        return;
    }

    const serialCounter = getSerialCounter();
    const barcodes = [];

    for (let i = 0; i < count; i++) {
        const serial = String(serialCounter + i).padStart(3, '0');
        const code = `${brand.slice(0,3)}${subbrand.slice(0,3)}${product.slice(0,3)}${serial}`;
        barcodes.push(code);
    }

    setSerialCounter(serialCounter + count);

    const barcodeContainer = document.getElementById('barcodeContainer');
    barcodeContainer.innerHTML = '';

    barcodes.forEach(function(code) {
        const card = document.createElement('div');
        card.className = 'barcode-card';
        card.innerHTML = `
            <svg class="barcode-svg" data-value="${code}"></svg>
            <p>${code}</p>
        `;
        barcodeContainer.appendChild(card);
    });

    document.querySelectorAll('.barcode-svg').forEach(function(svg) {
        const code = svg.getAttribute('data-value');
        try {
            JsBarcode(svg, code, {
                format: 'CODE128',
                width: 1.5,
                height: 60,
                displayValue: false,
                margin: 8,
                lineColor: '#000000',
                background: '#ffffff'
            });
        } catch (error) {
            console.error('JsBarcode error:', error);
        }
    });

    const history = getHistory();
    const now = new Date();
    history.unshift({
        timestamp: now.toISOString(),
        count: count,
        codes: barcodes
    });

    setHistory(history);
    loadHistory();
    updatePagination();
});

function getHistory() {
    const history = localStorage.getItem('barcodeHistory');
    return history ? JSON.parse(history) : [];
}

function setHistory(history) {
    localStorage.setItem('barcodeHistory', JSON.stringify(history));
}

function getSerialCounter() {
    const counter = localStorage.getItem('barcodeSerialCounter');
    return counter ? parseInt(counter) : 1;
}

function setSerialCounter(value) {
    localStorage.setItem('barcodeSerialCounter', value);
}

let currentPage = 1;
const itemsPerPage = 10;

function loadHistory() {
    const history = getHistory();
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageHistory = history.slice(start, end);

    const list = document.getElementById('history-list');
    list.innerHTML = '';

    if (pageHistory.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No history yet';
        li.style.color = '#999';
        list.appendChild(li);
        return;
    }

    pageHistory.forEach(function(item) {
        const date = new Date(item.timestamp);
        const li = document.createElement('li');
        li.innerHTML = `<strong>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</strong> - ${item.count} barcodes<br><small style="color:#666;">Last: ${item.codes[item.codes.length - 1]}</small>`;
        list.appendChild(li);
    });
}

function updatePagination() {
    const history = getHistory();
    const totalPages = Math.max(1, Math.ceil(history.length / itemsPerPage));

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageDisplay = document.getElementById('page-display');

    pageDisplay.textContent = `Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

document.getElementById('prev-btn').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        loadHistory();
        updatePagination();
    }
});

document.getElementById('next-btn').addEventListener('click', function() {
    const history = getHistory();
    const totalPages = Math.ceil(history.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        loadHistory();
        updatePagination();
    }
});
