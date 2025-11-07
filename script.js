// Daily tier list items with unique tags
const dailyItems = [
    { id: 'apple', name: 'Apple', color: '#ff6b6b' },
    { id: 'banana', name: 'Banana', color: '#ffe66d' },
    { id: 'grape', name: 'Grape', color: '#9b59b6' },
    { id: 'orange', name: 'Orange', color: '#ff8c42' },
    { id: 'strawberry', name: 'Strawberry', color: '#ee6055' },
    { id: 'watermelon', name: 'Watermelon', color: '#06d6a0' },
    { id: 'pineapple', name: 'Pineapple', color: '#ffd23f' },
    { id: 'cherry', name: 'Cherry', color: '#e63946' },
    { id: 'blueberry', name: 'Blueberry', color: '#4361ee' },
    { id: 'kiwi', name: 'Kiwi', color: '#90ee90' },
    { id: 'mango', name: 'Mango', color: '#ffba08' },
    { id: 'peach', name: 'Peach', color: '#ffcdb2' }
];

// State management
let currentTierList = {};
let savedLists = [];
let selectedListsForComparison = [];

// Initialize the application
function init() {
    loadSavedLists();
    renderItems();
    setupDragAndDrop();
    setupEventListeners();
}

// Render items in the pool
function renderItems() {
    const itemsPool = document.getElementById('itemsPool');
    itemsPool.innerHTML = '';
    
    dailyItems.forEach(item => {
        const itemEl = createItemElement(item);
        itemsPool.appendChild(itemEl);
    });
}

// Create an item element
function createItemElement(item) {
    const itemEl = document.createElement('div');
    itemEl.className = 'item';
    itemEl.draggable = true;
    itemEl.dataset.itemId = item.id;
    itemEl.style.background = item.color;
    
    const img = document.createElement('div');
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.display = 'flex';
    img.style.alignItems = 'center';
    img.style.justifyContent = 'center';
    img.style.fontSize = '2rem';
    img.textContent = item.name[0].toUpperCase();
    
    const tag = document.createElement('div');
    tag.className = 'item-tag';
    tag.textContent = item.name;
    
    itemEl.appendChild(img);
    itemEl.appendChild(tag);
    
    return itemEl;
}

// Setup drag and drop functionality
function setupDragAndDrop() {
    let draggedElement = null;
    
    // Item drag events
    document.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('item')) {
            draggedElement = e.target;
            e.target.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        }
    });
    
    document.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('item')) {
            e.target.classList.remove('dragging');
        }
    });
    
    // Tier items container events
    const tierContainers = document.querySelectorAll('.tier-items');
    const itemsPool = document.getElementById('itemsPool');
    const allDropZones = [...tierContainers, itemsPool];
    
    allDropZones.forEach(zone => {
        let dragCounter = 0;
        
        zone.addEventListener('dragenter', (e) => {
            e.preventDefault();
            dragCounter++;
            zone.classList.add('drag-over');
        });
        
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });
        
        zone.addEventListener('dragleave', (e) => {
            dragCounter--;
            if (dragCounter === 0) {
                zone.classList.remove('drag-over');
            }
        });
        
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            dragCounter = 0;
            zone.classList.remove('drag-over');
            
            if (draggedElement && zone !== draggedElement.parentElement) {
                zone.appendChild(draggedElement);
                updateCurrentTierList();
            }
        });
    });
}

// Update the current tier list state
function updateCurrentTierList() {
    currentTierList = {
        S: [],
        A: [],
        B: [],
        C: [],
        F: [],
        Never: []
    };
    
    const tierContainers = document.querySelectorAll('.tier-items');
    tierContainers.forEach(container => {
        const tier = container.dataset.tier;
        const items = container.querySelectorAll('.item');
        items.forEach(item => {
            currentTierList[tier].push(item.dataset.itemId);
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Save button
    document.getElementById('saveBtn').addEventListener('click', saveTierList);
    
    // Compare button
    document.getElementById('compareBtn').addEventListener('click', openCompareModal);
    
    // Reset button
    document.getElementById('resetBtn').addEventListener('click', resetTierList);
    
    // Modal close
    const modal = document.getElementById('compareModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Save the current tier list
function saveTierList() {
    updateCurrentTierList();
    
    const timestamp = new Date().toISOString();
    const listName = `Tier List ${savedLists.length + 1}`;
    
    const savedList = {
        id: `list_${Date.now()}`,
        name: listName,
        timestamp: timestamp,
        data: JSON.parse(JSON.stringify(currentTierList))
    };
    
    savedLists.push(savedList);
    localStorage.setItem('tierLists', JSON.stringify(savedLists));
    
    alert(`Tier list saved as "${listName}"!`);
}

// Load saved lists from localStorage
function loadSavedLists() {
    const stored = localStorage.getItem('tierLists');
    if (stored) {
        savedLists = JSON.parse(stored);
    }
}

// Reset the tier list
function resetTierList() {
    if (confirm('Are you sure you want to reset the tier list?')) {
        const itemsPool = document.getElementById('itemsPool');
        const allItems = document.querySelectorAll('.item');
        
        allItems.forEach(item => {
            itemsPool.appendChild(item);
        });
        
        updateCurrentTierList();
    }
}

// Open compare modal
function openCompareModal() {
    if (savedLists.length === 0) {
        alert('No saved lists to compare. Please save at least one tier list first.');
        return;
    }
    
    const modal = document.getElementById('compareModal');
    const container = document.getElementById('savedListsContainer');
    
    container.innerHTML = '';
    selectedListsForComparison = [];
    
    savedLists.forEach(list => {
        const listEl = document.createElement('div');
        listEl.className = 'saved-list-item';
        listEl.dataset.listId = list.id;
        
        const nameEl = document.createElement('div');
        nameEl.className = 'saved-list-name';
        nameEl.textContent = list.name;
        
        const dateEl = document.createElement('div');
        dateEl.className = 'saved-list-date';
        dateEl.textContent = new Date(list.timestamp).toLocaleString();
        
        listEl.appendChild(nameEl);
        listEl.appendChild(dateEl);
        
        listEl.addEventListener('click', () => {
            toggleListSelection(listEl, list);
        });
        
        container.appendChild(listEl);
    });
    
    document.getElementById('comparisonResult').innerHTML = '<p style="text-align: center; color: #aaa;">Select two lists to compare</p>';
    
    modal.style.display = 'block';
}

// Toggle list selection for comparison
function toggleListSelection(element, list) {
    const index = selectedListsForComparison.findIndex(l => l.id === list.id);
    
    if (index > -1) {
        selectedListsForComparison.splice(index, 1);
        element.classList.remove('selected');
    } else {
        if (selectedListsForComparison.length >= 2) {
            // Deselect the first one
            const firstList = selectedListsForComparison.shift();
            const firstEl = document.querySelector(`[data-list-id="${firstList.id}"]`);
            if (firstEl) firstEl.classList.remove('selected');
        }
        selectedListsForComparison.push(list);
        element.classList.add('selected');
    }
    
    if (selectedListsForComparison.length === 2) {
        compareSelectedLists();
    } else {
        document.getElementById('comparisonResult').innerHTML = '<p style="text-align: center; color: #aaa;">Select two lists to compare</p>';
    }
}

// Compare selected lists and calculate similarity
function compareSelectedLists() {
    const [list1, list2] = selectedListsForComparison;
    
    // Calculate similarity score
    const similarity = calculateSimilarity(list1.data, list2.data);
    
    // Generate comparison details
    const details = generateComparisonDetails(list1, list2);
    
    // Display results
    const resultContainer = document.getElementById('comparisonResult');
    resultContainer.innerHTML = `
        <div class="similarity-score">${similarity.toFixed(1)}%</div>
        <p style="text-align: center; color: #aaa; margin-bottom: 20px;">Similarity Score</p>
        <div class="comparison-details">
            <h4>Comparison: ${list1.name} vs ${list2.name}</h4>
            ${details}
        </div>
    `;
}

// Calculate similarity score between two tier lists
function calculateSimilarity(tierList1, tierList2) {
    const tiers = ['S', 'A', 'B', 'C', 'F', 'Never'];
    
    // Collect all unique items from both lists
    const allItems = new Set();
    tiers.forEach(tier => {
        (tierList1[tier] || []).forEach(item => allItems.add(item));
        (tierList2[tier] || []).forEach(item => allItems.add(item));
    });
    
    if (allItems.size === 0) return 100;
    
    // Count items in the same tier in both lists
    let matches = 0;
    tiers.forEach(tier => {
        const items1 = new Set(tierList1[tier] || []);
        const items2 = new Set(tierList2[tier] || []);
        
        items1.forEach(item => {
            if (items2.has(item)) {
                matches++;
            }
        });
    });
    
    return (matches / allItems.size) * 100;
}

// Generate detailed comparison
function generateComparisonDetails(list1, list2) {
    const tiers = ['S', 'A', 'B', 'C', 'F', 'Never'];
    let html = '<ul>';
    
    tiers.forEach(tier => {
        const items1 = list1.data[tier] || [];
        const items2 = list2.data[tier] || [];
        
        const matches = items1.filter(item => items2.includes(item));
        const onlyInList1 = items1.filter(item => !items2.includes(item));
        const onlyInList2 = items2.filter(item => !items1.includes(item));
        
        if (matches.length > 0 || onlyInList1.length > 0 || onlyInList2.length > 0) {
            html += `<li><strong>Tier ${tier}:</strong> `;
            
            if (matches.length > 0) {
                html += `${matches.length} match(es)`;
            }
            
            if (onlyInList1.length > 0 || onlyInList2.length > 0) {
                html += ` | ${onlyInList1.length + onlyInList2.length} difference(s)`;
            }
            
            html += '</li>';
        }
    });
    
    html += '</ul>';
    return html;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
