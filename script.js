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

    // Generate barcodes
    const barcodes = [];
    for (let i = 0; i < count; i++) {
        const code = `${brand.slice(0,2)}${subbrand.slice(0,2)}${product.slice(0,2)}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        barcodes.push(code);
    }

    // Display generated barcodes
    document.getElementById('output-code').textContent = barcodes.join('\n');

    // Add to history
    const history = getHistory();
    const now = new Date();
    history.unshift({
        timestamp: now.toISOString(),
        count: count
    });
    // Keep only last 100 or something, but for now all
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

let currentPage = 1;
const itemsPerPage = 10;

function loadHistory() {
    const history = getHistory();
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageHistory = history.slice(start, end);

    const list = document.getElementById('history-list');
    list.innerHTML = '';
    pageHistory.forEach(item => {
        const date = new Date(item.timestamp);
        const li = document.createElement('li');
        li.textContent = `${date.toLocaleDateString()} ${date.toLocaleTimeString()} - ${item.count} barcodes`;
        list.appendChild(li);
    });
}

function updatePagination() {
    const history = getHistory();
    const totalPages = Math.ceil(history.length / itemsPerPage);
    const select = document.getElementById('page-select');
    select.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i === currentPage) option.selected = true;
        select.appendChild(option);
    }

    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === totalPages;
}

document.getElementById('page-select').addEventListener('change', function() {
    currentPage = parseInt(this.value);
    loadHistory();
    updatePagination();
});

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