const totalSlots = 10;
let slots = Array(totalSlots).fill(null).map((_, i) => ({ id: i + 1, occupied: false, type: null, time: null }));

function render() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    let free = 0;

    slots.forEach(s => {
        const div = document.createElement('div');
        div.className = `slot ${s.occupied ? 'occupied' : ''}`;
        div.innerHTML = s.occupied 
            ? `<span class="vehicle-icon">${s.type === 'Car' ? '🚗' : '🏍️'}</span>Slot ${s.id}` 
            : `Slot ${s.id}<br>Empty`;
        grid.appendChild(div);
        if (!s.occupied) free++;
    });
    document.getElementById('available-slots').innerText = free;
}

function getParking() {
    const type = document.getElementById('vehicle-type').value;
    const firstFree = slots.find(s => !s.occupied);

    if (firstFree) {
        firstFree.occupied = true;
        firstFree.type = type;
        firstFree.time = new Date();
        addLog(`${type} parked in Slot ${firstFree.id}`);
        render();
    } else {
        alert("Parking Full!");
    }
}

function exitParking() {
    const slotId = prompt("Enter Slot Number to exit (1-10):");
    const slot = slots.find(s => s.id == slotId);

    if (slot && slot.occupied) {
        const duration = Math.round((new Date() - slot.time) / 1000);
        alert(`Vehicle: ${slot.type}\nTime Stayed: ${duration}s\nFee: $${(duration * 0.1).toFixed(2)}`);
        slot.occupied = false;
        slot.type = null;
        addLog(`${slot.type} exited from Slot ${slot.id}`);
        render();
    } else {
        alert("Invalid Slot or Slot already empty.");
    }
}

function addLog(msg) {
    const li = document.createElement('li');
    li.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
    document.getElementById('log-list').prepend(li);
}

render(); // Initialize display