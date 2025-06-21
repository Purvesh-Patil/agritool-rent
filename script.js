// ----- Save Tool to LocalStorage (used in add.html) -----
document.getElementById('toolForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const tool = {
    name: document.getElementById('name').value.trim(),
    category: document.getElementById('category').value.trim(),
    price: document.getElementById('price').value.trim(),
    owner: document.getElementById('owner').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    location: document.getElementById('location').value.trim(),
    time: new Date().toLocaleString()
  };

  if (tool.name && tool.category && tool.price && tool.owner && tool.phone && tool.location) {
    const tools = JSON.parse(localStorage.getItem('tools')) || [];
    tools.push(tool);
    localStorage.setItem('tools', JSON.stringify(tools));
    alert('✅ Tool added successfully!');
    window.location.href = 'index.html';
  } else {
    alert('❌ Please fill all fields!');
  }
});

// ----- Load & Filter Tools on index.html -----
const toolList = document.getElementById('toolList');
const searchBox = document.getElementById('searchBox');
const categoryFilter = document.getElementById('categoryFilter');

const tools = JSON.parse(localStorage.getItem('tools')) || [];

function displayTools(filteredTools) {
  const html = filteredTools.map(tool => `
    <div class="tool-card">
      <h3>${tool.name} <span class="category">(${tool.category})</span></h3>
      <p><strong>Price:</strong> ${tool.price}</p>
      <p><strong>Owner:</strong> ${tool.owner}</p>
      <p><strong>Location:</strong> ${tool.location}</p>
      <a class="rent-btn" href="https://wa.me/91${tool.phone}?text=I'm interested in renting your ${encodeURIComponent(tool.name)}" target="_blank">
        📲 Rent Now
      </a>
      <button class="delete-btn" onclick="deleteTool(${index})">🗑️ Delete</button>
    </div>
  `).join('');

  toolList.innerHTML = html || "<p>❌ No matching tools found.</p>";
}

function filterTools() {
  const search = searchBox?.value.toLowerCase() || "";
  const category = categoryFilter?.value || "";

  const filtered = tools.filter(tool => {
    return (
      tool.name.toLowerCase().includes(search) &&
      (category === "" || tool.category === category)
    );
  });

  displayTools(filtered);
}

// ----- On Page Load -----
if (toolList) {
  if (tools.length === 0) {
    toolList.innerHTML = "<p>😕 No tools available. Be the first to <a href='add.html'>Post a Tool</a></p>";
  } else {
    displayTools(tools);
  }

  // Add filter listeners
  searchBox?.addEventListener('input', filterTools);
  categoryFilter?.addEventListener('change', filterTools);
}

function deleteTool(index){
    if(confirm("Are you sure you want to delete this tool?")){
        tools.splice(index, 1);
        localStorage.setItem('tools',JSON.stringify(tools));
        displayTools(tools);
    }
}

document.getElementById('clearAll')?.addEventListener('click', () =>{
    if(confirm("This will delete all tools. Are you sure?")){
        localStorage.removeItem('tools');
        window.location.reload();
    }
});