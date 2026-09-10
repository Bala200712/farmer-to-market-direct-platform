// Mann Mithra Application Controller & State Engine

let currentUser = {
  firstName: "Ramesh Kumar",
  username: "ramesh_farmer",
  role: "farmer",
  mobile: "9876543210",
  email: "ramesh.farmer@kisan.in",
  farmName: "Ramesh Organic Farms & Nursery",
  location: "Pollachi, Coimbatore - 642001",
  landArea: "4.5 Acres",
  fpo: "Pollachi Farmers Producer Co. (#TN-402)",
  soilHealth: "Grade A (High Organic Carbon)",
  bankName: "State Bank of India (SBI)",
  accountNumber: "XXXX-XXXX-4921",
  ifsc: "SBIN0001234",
  upi: "ramesh.farmer@sbi"
};

let currentRole = 'farmer';
let activeFarmerTab = 'home';
let activeConsumerTab = 'market';
let activeBulkTab = 'lots';
let activeChatTab = 'ai';

// Consumer Geolocation state (REQ #9)
let consumerCity = 'Coimbatore';
let sortNearest = true;
let filterOrganic = false;

// Voice Assistant state (REQ #5)
let isVoiceListening = false;
let speechRecognitionInstance = null;

// Live Order Tracking state (REQ #8)
let activeOrderTrackingStep = 2; // 1: Placed, 2: Packed, 3: Out for Delivery, 4: Delivered

let crops = [
  {
    id: "c1",
    nameEn: "Fresh Red Farm Tomatoes (Grade A)",
    nameTa: "நாட்டுத் தக்காளி (முதல் தரம்)",
    farmerName: "Ramesh Kumar",
    farmerBank: "SBI A/c XXXX4921",
    farmerUPI: "ramesh.farmer@sbi",
    category: "vegetables",
    grade: "Grade A",
    quantity: "500 kg",
    harvestDate: "08 Sep 2026",
    price: 28,
    bulkPrice: 22,
    farmCity: "Pollachi",
    farmLocation: "Pollachi, Coimbatore",
    distanceKm: {
      "Pollachi": 1.8,
      "Coimbatore": 38,
      "Tirupur": 62,
      "Erode": 105,
      "Salem": 168,
      "Madurai": 150,
      "Chennai": 510
    },
    isOrganic: true,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500"
  },
  {
    id: "c2",
    nameEn: "Coimbatore Country Tomatoes (Grade A)",
    nameTa: "கோயம்புத்தூர் தக்காளி (முதல் தரம்)",
    farmerName: "Ramesh Kumar",
    farmerBank: "SBI A/c XXXX4921",
    farmerUPI: "ramesh.farmer@sbi",
    category: "vegetables",
    grade: "Grade A",
    quantity: "350 kg",
    harvestDate: "07 Sep 2026",
    price: 30,
    bulkPrice: 24,
    farmCity: "Coimbatore",
    farmLocation: "Thondamuthur, Coimbatore",
    distanceKm: {
      "Coimbatore": 8.5,
      "Pollachi": 42,
      "Tirupur": 55,
      "Erode": 98,
      "Salem": 160,
      "Madurai": 210,
      "Chennai": 495
    },
    isOrganic: true,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500"
  },
  {
    id: "c3",
    nameEn: "Organic Salem Curcumin Turmeric",
    nameTa: "சேலம் விரலி மஞ்சள் (உயர் குர்குமின்)",
    farmerName: "Senthil Nathan",
    farmerBank: "Indian Bank A/c XXXX1892",
    farmerUPI: "senthil.turmeric@indianbk",
    category: "spices",
    grade: "Export Grade",
    quantity: "800 kg",
    harvestDate: "05 Sep 2026",
    price: 140,
    bulkPrice: 115,
    farmCity: "Salem",
    farmLocation: "Salem, Tamil Nadu",
    distanceKm: {
      "Salem": 3.5,
      "Erode": 65,
      "Tirupur": 115,
      "Coimbatore": 165,
      "Pollachi": 195,
      "Madurai": 230,
      "Chennai": 340
    },
    isOrganic: true,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500"
  },
  {
    id: "c4",
    nameEn: "Traditional Punjab Basmati Rice 1121",
    nameTa: "பாரம்பரிய பாசுமதி அரிசி 1121",
    farmerName: "Gurpreet Singh",
    farmerBank: "PNB A/c XXXX7741",
    farmerUPI: "gurpreet.farm@pnb",
    category: "grains",
    grade: "Premium Aged",
    quantity: "5000 kg",
    harvestDate: "01 Sep 2026",
    price: 95,
    bulkPrice: 78,
    farmCity: "Amritsar",
    farmLocation: "Amritsar, Punjab",
    distanceKm: {
      "Coimbatore": 2400,
      "Pollachi": 2440,
      "Chennai": 2200,
      "Salem": 2320,
      "Madurai": 2550,
      "Erode": 2350,
      "Tirupur": 2370
    },
    isOrganic: true,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500"
  },
  {
    id: "c5",
    nameEn: "Nashik Crisp Red Onions",
    nameTa: "நாசிக் சிவப்பு வெங்காயம்",
    farmerName: "Suresh Patil",
    farmerBank: "Bank of Maharashtra A/c XXXX6032",
    farmerUPI: "suresh.onion@mahbk",
    category: "vegetables",
    grade: "Grade A",
    quantity: "1200 kg",
    harvestDate: "06 Sep 2026",
    price: 35,
    bulkPrice: 28,
    farmCity: "Nashik",
    farmLocation: "Nashik, Maharashtra",
    distanceKm: {
      "Coimbatore": 1250,
      "Pollachi": 1290,
      "Chennai": 1180,
      "Salem": 1210,
      "Madurai": 1390,
      "Erode": 1230,
      "Tirupur": 1240
    },
    isOrganic: false,
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500"
  }
];

let cart = [];

let chatHistory = {
  ai: [
    { sender: 'bot', text: '👋 Welcome to Mann Mithra AI! Ask any question or click the 🎤 Voice Assistant to speak in Tamil or English.' }
  ],
  direct: [
    { sender: 'bot', text: '💬 Direct Trade Connect: Negotiate and chat directly with Farmers and Bulk Buyers.' },
    { sender: 'bot', text: '🏢 [Agro Wholesale Corp]: "Hello Farmer Ramesh, can you supply 500kg Grade A tomatoes for our Coimbatore mandi hub at ₹22/kg?"' }
  ]
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  initLucide();
  loginUserSession(currentUser);
  renderHomeMiniProduce();
  renderHomeActiveOrders();
  renderConsumerMarket();
  renderBulkLots();
  updateLiveOrderTracking();
});

function initLucide() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function showToast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${type === 'info' ? 'ℹ️' : '✅'}</span> <span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'all 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function handleBrandClick() {
  if (currentUser) {
    switchInterface(currentUser.role);
    if (currentUser.role === 'farmer') switchFarmerTab('home');
    if (currentUser.role === 'consumer') switchConsumerTab('market');
    if (currentUser.role === 'bulk_buyer') switchBulkTab('lots');
  } else {
    showAuthView('login');
  }
}

// ================= FARMER SUB-TABS ROUTER =================
function switchFarmerTab(tab) {
  activeFarmerTab = tab;
  ['btnTabHome', 'btnTabProduce', 'btnTabForecast', 'btnTabOrders', 'btnTabAccount'].forEach(id => {
    document.getElementById(id)?.classList.remove('active');
  });

  const tabBtnMap = {
    'home': 'btnTabHome',
    'produce': 'btnTabProduce',
    'forecast': 'btnTabForecast',
    'orders': 'btnTabOrders',
    'account': 'btnTabAccount'
  };
  document.getElementById(tabBtnMap[tab])?.classList.add('active');

  ['farmerTabHome', 'farmerTabProduce', 'farmerTabForecast', 'farmerTabOrders', 'farmerTabAccount'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  if (tab === 'home') {
    document.getElementById('farmerTabHome').style.display = 'block';
    renderHomeMiniProduce();
    renderHomeActiveOrders();
  } else if (tab === 'produce') {
    document.getElementById('farmerTabProduce').style.display = 'block';
    renderFarmerFullProduce();
  } else if (tab === 'forecast') {
    document.getElementById('farmerTabForecast').style.display = 'block';
    renderCropForecast('tomato');
    renderMandiRates();
  } else if (tab === 'orders') {
    document.getElementById('farmerTabOrders').style.display = 'block';
    renderFarmerFullOrders();
  } else if (tab === 'account') {
    document.getElementById('farmerTabAccount').style.display = 'block';
    renderFarmerAccount();
  }

  initLucide();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderHomeMiniProduce() {
  const container = document.getElementById('homeProduceMiniList');
  if (!container) return;
  const isTa = currentLang === 'ta';

  container.innerHTML = crops.slice(0, 3).map(crop => `
    <div style="display:flex; justify-content:space-between; align-items:center; padding:0.85rem 1rem; background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; margin-bottom:0.75rem;">
      <div style="display:flex; align-items:center; gap:0.85rem;">
        <img src="${crop.image}" style="width:48px; height:48px; object-fit:cover; border-radius:10px; border:1.5px solid #cbd5e1; flex-shrink:0;" alt="${crop.nameEn}">
        <div>
          <strong style="font-size:0.95rem; color:#0f172a;">${isTa ? crop.nameTa : crop.nameEn}</strong>
          <div style="font-size:0.8rem; color:#64748b;">${crop.quantity} &bull; ₹${crop.price}/kg</div>
          <div style="font-size:0.75rem; color:#15803d; font-weight:700;">🌾 Harvested: ${crop.harvestDate}</div>
        </div>
      </div>
      <span class="farmer-fpo-badge">${crop.grade}</span>
    </div>
  `).join('');
}

function renderHomeActiveOrders() {
  const container = document.getElementById('homeActiveOrdersList');
  if (!container) return;

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; padding:1rem; border:1.5px solid #e2e8f0; border-radius:14px; margin-bottom:0.75rem;">
      <div>
        <strong style="font-size:0.95rem; color:#0f172a;">Order #ORD-1082 - Fresh Farm Tomatoes (10 kg)</strong>
        <div style="font-size:0.8rem; color:#64748b;">Paid directly: ₹280 to SBI A/c XXXX4921 &bull; Anna Nagar Hub</div>
      </div>
      <button class="btn btn-primary btn-sm" id="btnPrep1082" onclick="togglePrepareOrder('btnPrep1082')">Prepare</button>
    </div>
    <div style="display:flex; justify-content:space-between; align-items:center; padding:1rem; border:1.5px solid #e2e8f0; border-radius:14px;">
      <div>
        <strong style="font-size:0.95rem; color:#0f172a;">Order #ORD-1083 - Bulk Lot Tomatoes (100 kg)</strong>
        <div style="font-size:0.8rem; color:#64748b;">Paid directly: ₹2,200 to SBI A/c XXXX4921 &bull; Wholesale Hub</div>
      </div>
      <button class="btn btn-outline btn-sm" id="btnPrep1083" onclick="togglePrepareOrder('btnPrep1083')">Prepare</button>
    </div>
  `;
}

function togglePrepareOrder(btnId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  if (btn.classList.contains('ready')) {
    btn.classList.remove('ready');
    btn.className = 'btn btn-outline btn-sm';
    btn.textContent = 'Prepare';
    showToast('Reverted to processing.', 'info');
  } else {
    btn.classList.add('ready');
    btn.className = 'btn btn-primary btn-sm';
    btn.textContent = 'Ready for Dispatch ✓';
    showToast('🎉 Order prepared and ready for dispatch!');
  }
}

function renderFarmerFullProduce() {
  const grid = document.getElementById('farmerFullProduceGrid');
  if (!grid) return;
  const isTa = currentLang === 'ta';

  grid.innerHTML = crops.map(crop => `
    <div class="crop-listing-card">
      <img src="${crop.image}" class="crop-listing-img" alt="${crop.nameEn}">
      <div class="crop-listing-body">
        <div style="font-size:0.75rem; font-weight:700; color:#15803d;">📍 ${crop.farmLocation}</div>
        <h3 style="font-size:1.1rem; font-weight:800; margin:0.3rem 0;">${isTa ? crop.nameTa : crop.nameEn}</h3>
        <div style="font-size:0.85rem; color:#64748b;">Stock: <strong>${crop.quantity}</strong> &bull; Grade: <strong>${crop.grade}</strong></div>
        <div class="harvest-date-badge">🌾 Harvested: ${crop.harvestDate}</div>
        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-top:auto; padding-top:0.75rem; border-top:1px dashed #e2e8f0;">
          <div>
            <span style="font-size:1.3rem; font-weight:800; color:#14532d;">₹${crop.price}</span>
            <span style="font-size:0.78rem; color:#64748b;">/kg</span>
          </div>
          <div style="font-size:0.8rem; font-weight:700; color:#3730a3;">Bulk: ₹${crop.bulkPrice}/kg</div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderCropForecast(cropKey, btn) {
  if (btn) {
    btn.parentElement.querySelectorAll('button').forEach(b => b.className = 'btn btn-outline btn-sm');
    btn.className = 'btn btn-primary btn-sm';
  }
  const container = document.getElementById('forecastDynamicCard');
  if (!container) return;

  const isTa = currentLang === 'ta';
  const forecasts = {
    tomato: {
      title: isTa ? "தக்காளி - AI தேவைக் கணிப்பு" : "Fresh Tomatoes - AI Forecast Analysis",
      rate: "₹28 / kg",
      surge: "+28% surge expected in 7 days",
      advisory: isTa ? "அடுத்த வாரத்தில் தேவை 28% உயரும். 400 கிலோவை அறுவடை செய்து தயாராக வைக்கவும்." : "Festival demand will drive tomato prices up by 28%. Prepare 400kg lot for optimal returns."
    },
    onion: {
      title: isTa ? "நாசிக் வெங்காயம் - AI தேவைக் கணிப்பு" : "Nashik Red Onions - AI Forecast Analysis",
      rate: "₹35 / kg",
      surge: "+20% steady demand",
      advisory: isTa ? "நாசிக் வரத்து சீராக உள்ளது. ஈரப்பதம் 10% க்குள் சேமித்தால் கூடுதல் லாபம் கிடைக்கும்." : "Steady demand across Coimbatore and Chennai mandis. Store below 10% moisture."
    },
    rice: {
      title: isTa ? "பாசுமதி அரிசி 1121 - AI தேவைக் கணிப்பு" : "Basmati Rice 1121 - AI Forecast Analysis",
      rate: "₹95 / kg",
      surge: "+6% export demand",
      advisory: isTa ? "ஏற்றுமதி நிறுவனங்கள் நேரடி கொள்முதலில் தீவிரமாக உள்ளன." : "Export orders active. 50kg bag packaging recommended."
    },
    turmeric: {
      title: isTa ? "சேலம் விரலி மஞ்சள் - AI தேவைக் கணிப்பு" : "Salem Curcumin Turmeric - AI Forecast Analysis",
      rate: "₹140 / kg",
      surge: "+14% pharmaceutical demand",
      advisory: isTa ? "சேலம் மஞ்சள் தூள் ஆலைகள் நேரடி ஒப்பந்தங்களை வழங்குகின்றன." : "High curcumin grade in heavy demand for direct procurement."
    }
  };

  const f = forecasts[cropKey] || forecasts.tomato;
  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
      <div>
        <h3 style="font-weight:800; font-size:1.2rem;">${f.title}</h3>
        <div style="font-size:0.85rem; color:#64748b;">Current Rate: <strong>${f.rate}</strong></div>
      </div>
      <span class="farmer-fpo-badge">${f.surge}</span>
    </div>
    <div style="background:#e8f5ed; border-radius:12px; padding:1rem; border-left:4px solid #15803d;">
      <strong>💡 AI Crop Advisory:</strong>
      <p style="margin-top:0.25rem; font-size:0.88rem;">${f.advisory}</p>
    </div>
  `;
}

function renderMandiRates() {
  const tbody = document.getElementById('mandiRatesTableBody');
  if (!tbody) return;
  tbody.innerHTML = `
    <tr style="border-bottom:1px solid #e2e8f0;">
      <td style="padding:0.85rem 1rem; font-weight:700;">Koyambedu Mandi (Chennai)</td>
      <td style="padding:0.85rem 1rem; font-weight:800; color:#15803d;">₹28 / kg</td>
      <td style="padding:0.85rem 1rem; font-weight:800; color:#14532d;">₹36 / kg (+28%)</td>
      <td style="padding:0.85rem 1rem;"><span class="farmer-fpo-badge">High Demand</span></td>
      <td style="padding:0.85rem 1rem;"><button class="btn btn-primary btn-sm" onclick="showToast('Dispatch route assigned to Koyambedu.')">Dispatch Lot</button></td>
    </tr>
    <tr style="border-bottom:1px solid #e2e8f0;">
      <td style="padding:0.85rem 1rem; font-weight:700;">Oddanchatram Mandi (Dindigul)</td>
      <td style="padding:0.85rem 1rem; font-weight:800; color:#15803d;">₹26 / kg</td>
      <td style="padding:0.85rem 1rem; font-weight:800; color:#14532d;">₹32 / kg (+23%)</td>
      <td style="padding:0.85rem 1rem;"><span class="farmer-fpo-badge">High Demand</span></td>
      <td style="padding:0.85rem 1rem;"><button class="btn btn-outline btn-sm" onclick="showToast('Mandi alert tracked.')">Track</button></td>
    </tr>
    <tr>
      <td style="padding:0.85rem 1rem; font-weight:700;">Madurai Central Market</td>
      <td style="padding:0.85rem 1rem; font-weight:800; color:#15803d;">₹27 / kg</td>
      <td style="padding:0.85rem 1rem; font-weight:800; color:#14532d;">₹34 / kg (+25%)</td>
      <td style="padding:0.85rem 1rem;"><span class="farmer-fpo-badge">Surge</span></td>
      <td style="padding:0.85rem 1rem;"><button class="btn btn-outline btn-sm" onclick="showToast('Mandi alert tracked.')">Track</button></td>
    </tr>
  `;
}

function renderFarmerFullOrders() {
  const container = document.getElementById('farmerFullOrdersList');
  if (!container) return;
  container.innerHTML = `
    <div style="background:#fff; border:1.5px solid #e2e8f0; border-radius:14px; padding:1.25rem; margin-bottom:1rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f1f5f9; padding-bottom:0.6rem;">
        <div>
          <strong style="font-size:1.05rem;">Order #ORD-1082</strong>
          <span style="font-size:0.82rem; color:#64748b; margin-left:0.5rem;">Buyer: Ananya S. (Verified Consumer 🛡️)</span>
        </div>
        <span class="farmer-fpo-badge" style="background:#dcfce7; color:#15803d;">Direct Paid: ₹280</span>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; margin:0.85rem 0; font-size:0.85rem;">
        <div><strong>Items:</strong> Fresh Red Farm Tomatoes (10 kg)</div>
        <div><strong>Delivery Hub:</strong> Anna Nagar Hub, Coimbatore</div>
        <div><strong>Paid To:</strong> SBI A/c XXXX4921 (Direct Payout)</div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:0.5rem;">
        <button class="btn btn-primary btn-sm" onclick="showToast('Order prepared and marked ready for hub transit!')">Mark Ready for Dispatch ✓</button>
      </div>
    </div>
  `;
}

function renderFarmerAccount() {
  document.getElementById('accFarmerName').textContent = currentUser.firstName;
  document.getElementById('accFarmName').textContent = currentUser.farmName;
  document.getElementById('accValName').textContent = currentUser.firstName;
  document.getElementById('accValMobile').textContent = "+91 " + currentUser.mobile;
  document.getElementById('accValEmail').textContent = currentUser.email;
  document.getElementById('accValLocation').textContent = currentUser.location;
  if (currentUser.bankName) document.getElementById('accValBank').textContent = currentUser.bankName;
  if (currentUser.accountNumber) document.getElementById('accValAccount').textContent = currentUser.accountNumber;
  if (currentUser.upi) document.getElementById('accValUPI').textContent = currentUser.upi;
}

function openEditProfileModal() {
  document.getElementById('editName').value = currentUser.firstName;
  document.getElementById('editMobile').value = currentUser.mobile;
  document.getElementById('editEmail').value = currentUser.email;
  document.getElementById('editLocation').value = currentUser.location;
  document.getElementById('editProfileModal').style.display = 'block';
}

function handleSaveProfile(e) {
  e.preventDefault();
  currentUser.firstName = document.getElementById('editName').value.trim();
  currentUser.mobile = document.getElementById('editMobile').value.trim();
  currentUser.email = document.getElementById('editEmail').value.trim();
  currentUser.location = document.getElementById('editLocation').value.trim();
  renderFarmerAccount();
  closeModal('editProfileModal');
  showToast('Farmer Profile updated successfully!');
}

// ================= PRODUCT PHOTO UPLOAD & PRESET MANAGEMENT (USER REQ #1) =================
const CROP_IMAGE_PRESETS = {
  tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80",
  onion: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=80",
  potato: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80",
  carrot: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=80",
  chilli: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=80",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80",
  turmeric: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80",
  banana: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80",
  mango: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop&q=80",
  coconut: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=500&auto=format&fit=crop&q=80"
};

let currentSelectedCropImage = null;

function handleCropImageFileSelected(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    currentSelectedCropImage = e.target.result;
    const previewBox = document.getElementById('addCropImagePreviewBox');
    const previewImg = document.getElementById('cropImagePreviewImg');
    if (previewBox && previewImg) {
      previewImg.src = currentSelectedCropImage;
      previewBox.style.display = 'block';
    }
    showToast('📸 Photo loaded from device! Ready to publish.');
  };
  reader.readAsDataURL(file);
}

function handleCropImageUrlInput(url) {
  url = url.trim();
  if (!url) return;
  currentSelectedCropImage = url;
  const previewBox = document.getElementById('addCropImagePreviewBox');
  const previewImg = document.getElementById('cropImagePreviewImg');
  if (previewBox && previewImg) {
    previewImg.src = url;
    previewBox.style.display = 'block';
  }
}

function selectCropPreset(key) {
  const url = CROP_IMAGE_PRESETS[key];
  if (!url) return;
  currentSelectedCropImage = url;

  const previewBox = document.getElementById('addCropImagePreviewBox');
  const previewImg = document.getElementById('cropImagePreviewImg');
  if (previewBox && previewImg) {
    previewImg.src = url;
    previewBox.style.display = 'block';
  }

  // Pre-fill crop name if currently empty
  const nameInput = document.getElementById('addCropName');
  if (nameInput && !nameInput.value.trim()) {
    const defaultNames = {
      tomato: "Fresh Farm Red Tomatoes (Grade A)",
      onion: "Nashik Crisp Red Onions",
      potato: "Golden Farm Potatoes",
      carrot: "Ooty Mountain Carrots",
      chilli: "Guntur Hot Red Chillies",
      rice: "Aged Basmati Rice 1121",
      turmeric: "Salem Curcumin Turmeric Roots",
      banana: "Fresh Hill Bananas (Poovan)",
      mango: "Ratnagiri Alphonso Mango (Hapus)",
      coconut: "Pollachi Fresh Sweet Coconuts"
    };
    nameInput.value = defaultNames[key] || "";
  }
  showToast(`Selected photo preset for ${key}!`);
}

function openAddProduceModal() {
  currentSelectedCropImage = null;
  const previewBox = document.getElementById('addCropImagePreviewBox');
  if (previewBox) previewBox.style.display = 'none';
  const imgInput = document.getElementById('addCropImageUrl');
  if (imgInput) imgInput.value = '';
  const fileInput = document.getElementById('addCropImageFile');
  if (fileInput) fileInput.value = '';
  document.getElementById('addProduceModal').style.display = 'block';
}

function handleQuickAddProduce(e) {
  e.preventDefault();
  const name = document.getElementById('addCropName').value.trim();
  const category = document.getElementById('addCropCategory')?.value || "vegetables";
  const qty = document.getElementById('addCropQty').value.trim();
  const price = document.getElementById('addCropPrice').value.trim();
  const bulkPrice = document.getElementById('addCropBulkPrice').value.trim() || Math.round(parseFloat(price) * 0.8);
  const harvestDate = document.getElementById('addCropHarvestDate')?.value.trim() || "Today (Fresh Farm Picked)";

  // Priority: 1. Uploaded/Chosen image, 2. Unsplash Tomato fallback
  const finalImage = currentSelectedCropImage || "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80";

  const newCrop = {
    id: "c" + Date.now(),
    nameEn: name,
    nameTa: name,
    farmerName: currentUser.firstName,
    farmerBank: currentUser.bankName + " A/c " + currentUser.accountNumber,
    farmerUPI: currentUser.upi,
    category: category,
    grade: "Grade A",
    quantity: qty + " kg",
    harvestDate: harvestDate,
    price: parseFloat(price),
    bulkPrice: parseFloat(bulkPrice),
    farmCity: "Pollachi",
    farmLocation: currentUser.location,
    distanceKm: {
      "Pollachi": 2.1,
      "Coimbatore": 38,
      "Tirupur": 62,
      "Erode": 105,
      "Salem": 168,
      "Madurai": 150,
      "Chennai": 510
    },
    isOrganic: true,
    image: finalImage
  };

  crops.unshift(newCrop);

  // Sync with Python backend if online
  fetch('/api/crops', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCrop)
  }).catch(() => {});

  closeModal('addProduceModal');

  // Re-render all views where produce is shown on front cards
  renderHomeMiniProduce();
  renderFarmerFullProduce();
  renderConsumerMarket();
  renderBulkLots();

  showToast("🌾 Crop listed to marketplace with photo successfully!");
}

// ================= CONSUMER INTERFACE & NEAREST FARMS (REQ #4, #7, #8, #9) =================
function switchConsumerTab(tab) {
  activeConsumerTab = tab;
  ['btnConsumerMarket', 'btnConsumerOrders', 'btnConsumerProfile'].forEach(id => {
    document.getElementById(id)?.classList.remove('active');
  });

  const btnMap = {
    'market': 'btnConsumerMarket',
    'orders': 'btnConsumerOrders',
    'profile': 'btnConsumerProfile'
  };
  document.getElementById(btnMap[tab])?.classList.add('active');

  ['consumerTabMarket', 'consumerTabOrders', 'consumerTabProfile'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  if (tab === 'market') {
    document.getElementById('consumerTabMarket').style.display = 'block';
    renderConsumerMarket();
  } else if (tab === 'orders') {
    document.getElementById('consumerTabOrders').style.display = 'block';
    updateLiveOrderTracking();
    renderConsumerPastOrders();
  } else if (tab === 'profile') {
    document.getElementById('consumerTabProfile').style.display = 'block';
  }

  initLucide();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function onConsumerLocationChange(city) {
  consumerCity = city;
  showToast(`Location set to ${city}. Recalculating nearest farms...`, 'info');
  renderConsumerMarket();
}

function toggleSortNearest(isNearest) {
  sortNearest = isNearest;
  document.getElementById('pillClosest')?.classList.toggle('active', isNearest);
  document.getElementById('pillAllFarms')?.classList.toggle('active', !isNearest);
  renderConsumerMarket();
}

function filterOrganicOnly(btn) {
  filterOrganic = !filterOrganic;
  btn.classList.toggle('active', filterOrganic);
  renderConsumerMarket();
}

function renderConsumerMarket() {
  const grid = document.getElementById('consumerMarketGrid');
  if (!grid) return;
  const isTa = currentLang === 'ta';

  let displayCrops = [...crops];
  if (filterOrganic) {
    displayCrops = displayCrops.filter(c => c.isOrganic);
  }

  // Calculate distance based on consumer city
  displayCrops.forEach(c => {
    c.computedDistance = (c.distanceKm && c.distanceKm[consumerCity]) ? c.distanceKm[consumerCity] : 15.0;
  });

  if (sortNearest) {
    displayCrops.sort((a, b) => a.computedDistance - b.computedDistance);
  }

  grid.innerHTML = displayCrops.map(crop => `
    <div class="crop-listing-card">
      <div style="position:relative;">
        <img src="${crop.image}" class="crop-listing-img" alt="${crop.nameEn}">
        <span style="position:absolute; top:10px; left:10px; background:rgba(0,0,0,0.7); color:#fff; padding:3px 8px; border-radius:6px; font-size:0.75rem; font-weight:700;">
          ${crop.computedDistance} km away
        </span>
        ${crop.isOrganic ? `<span style="position:absolute; top:10px; right:10px; background:#15803d; color:#fff; padding:3px 8px; border-radius:6px; font-size:0.75rem; font-weight:700;">🌿 Organic</span>` : ''}
      </div>
      <div class="crop-listing-body">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="font-size:0.75rem; font-weight:700; color:#15803d;">👨‍🌾 ${crop.farmerName}</div>
          <span class="farm-distance-pill">📍 ${crop.farmCity} (${crop.computedDistance} km)</span>
        </div>

        <h3 style="font-size:1.1rem; font-weight:800; margin:0.35rem 0;">${isTa ? crop.nameTa : crop.nameEn}</h3>

        <div class="harvest-date-badge">🌾 Harvested: ${crop.harvestDate}</div>

        <div style="font-size:0.75rem; color:#475569; margin:0.5rem 0; background:#f0fdf4; padding:4px 8px; border-radius:6px;">
          ✓ Direct Payment: <strong>${crop.farmerBank}</strong>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-top:auto; padding-top:0.75rem; border-top:1px dashed #e2e8f0;">
          <div>
            <span style="font-size:1.35rem; font-weight:800; color:#14532d;">₹${crop.price}</span>
            <span style="font-size:0.8rem; color:#64748b;">/kg</span>
          </div>
          <button class="btn btn-primary btn-sm" onclick="addToCart('${crop.id}')">
            + Add to Basket
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(cropId) {
  const crop = crops.find(c => c.id === cropId);
  if (!crop) return;
  cart.push(crop);
  document.getElementById('consumerCartCount').textContent = cart.length;
  showToast(`Added ${currentLang === 'ta' ? crop.nameTa : crop.nameEn} to basket!`);
}

function openCartModal() {
  const modal = document.getElementById('cartModal');
  const itemsContainer = document.getElementById('cartModalItems');
  const totalDisplay = document.getElementById('cartModalTotal');

  if (cart.length === 0) {
    itemsContainer.innerHTML = `<div style="text-align:center; padding:2rem; color:#64748b;">Your basket is empty.</div>`;
    totalDisplay.textContent = '₹0';
  } else {
    itemsContainer.innerHTML = cart.map((i, idx) => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:0.6rem 0; border-bottom:1px solid #f1f5f9;">
        <div>
          <strong>${currentLang === 'ta' ? i.nameTa : i.nameEn}</strong>
          <div style="font-size:0.75rem; color:#15803d;">Paid directly to Farmer: ${i.farmerName} (${i.farmerUPI})</div>
        </div>
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <strong style="color:#14532d;">₹${i.price}</strong>
          <button onclick="cart.splice(${idx},1); openCartModal(); document.getElementById('consumerCartCount').textContent = cart.length;" style="background:none; border:none; color:#ef4444; font-weight:700; cursor:pointer;">&times;</button>
        </div>
      </div>
    `).join('');
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    totalDisplay.textContent = `₹${total}`;
  }

  modal.style.display = 'block';
}

// FAST SEAMLESS DIRECT FARMER PAYMENT (REQ #2)
function handleDirectFarmerPayment() {
  if (cart.length === 0) return;
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  const farmerName = cart[0].farmerName;
  const farmerBank = cart[0].farmerBank;

  // Immediate smooth direct transfer simulation
  cart = [];
  document.getElementById('consumerCartCount').textContent = 0;
  closeModal('cartModal');

  // Activate tracking step 1 (Placed & Paid)
  activeOrderTrackingStep = 1;

  showToast(`🎉 Payment of ₹${total} successfully credited directly to Farmer ${farmerName}'s Account (${farmerBank})!`);
  
  // Switch to tracking tab automatically
  switchConsumerTab('orders');
}

// =================== MULTI-METHOD CHECKOUT PAYMENT ===================
let activePaymentMethod = 'online';

function openCheckoutPaymentModal(type) {
  if (cart.length === 0) {
    showToast('Your basket is empty!', 'error');
    return;
  }
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  const farmer = cart[0];
  const el = (id) => document.getElementById(id);

  if (el('payModalFarmerName'))  el('payModalFarmerName').textContent  = farmer.farmerName || '—';
  if (el('payModalFarmerBank'))  el('payModalFarmerBank').textContent  = farmer.farmerBank || '—';
  if (el('payModalFarmerUPI'))   el('payModalFarmerUPI').textContent   = farmer.farmerUPI  || '—';
  if (el('payModalTotalAmount')) el('payModalTotalAmount').textContent = `₹${total}`;

  activePaymentMethod = 'online';
  switchPaymentMethod('online');
  closeModal('cartModal');
  el('checkoutPaymentModal').style.display = 'block';
}

function switchPaymentMethod(method) {
  activePaymentMethod = method;
  ['online', 'cod', 'card'].forEach(m => {
    const capM = m.charAt(0).toUpperCase() + m.slice(1);
    const card    = document.getElementById('payMethodCard' + capM);
    const section = document.getElementById('paySection'    + capM);
    if (card)    card.classList.toggle('active', m === method);
    if (section) section.style.display = (m === method) ? 'block' : 'none';
  });
  const btn = document.getElementById('btnConfirmPayment');
  if (btn) {
    const labels = { online: '💸 Pay via UPI', cod: '📦 Confirm Cash on Delivery', card: '💳 Pay via Card' };
    btn.textContent = labels[method] || 'Confirm Payment';
  }
}

function selectUPIApp(appName) {
  showToast(`✅ ${appName} selected! Tap Confirm to complete payment.`);
}

function formatCardNumberInput(el) {
  let v = el.value.replace(/\D/g, '').substring(0, 16);
  el.value = v.match(/.{1,4}/g) ? v.match(/.{1,4}/g).join(' ') : v;
}

function formatCardExpiryInput(el) {
  let v = el.value.replace(/\D/g, '').substring(0, 4);
  if (v.length > 2) v = v.substring(0, 2) + '/' + v.substring(2);
  el.value = v;
}

function processPaymentSubmission() {
  if (cart.length === 0) return;
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  const farmer = cart[0];

  if (activePaymentMethod === 'card') {
    const name   = (document.getElementById('cardHolderName')  ? document.getElementById('cardHolderName').value  : '').trim();
    const num    = (document.getElementById('cardNumber')       ? document.getElementById('cardNumber').value       : '').replace(/\s/g, '');
    const expiry = (document.getElementById('cardExpiry')       ? document.getElementById('cardExpiry').value       : '').trim();
    const cvv    = (document.getElementById('cardCVV')          ? document.getElementById('cardCVV').value          : '').trim();
    if (!name || num.length < 16 || expiry.length < 5 || cvv.length < 3) {
      showToast('⚠️ Please fill all card details correctly.', 'error');
      return;
    }
  }

  const methodLabels = { online: 'UPI', cod: 'Cash on Delivery', card: 'Card' };
  const label = methodLabels[activePaymentMethod] || 'Payment';

  cart = [];
  document.getElementById('consumerCartCount').textContent = 0;
  closeModal('checkoutPaymentModal');

  activeOrderTrackingStep = 1;
  updateLiveOrderTracking();

  showToast('🎉 ₹' + total + ' paid via ' + label + ' to Farmer ' + farmer.farmerName + '! Order placed successfully.');
  switchConsumerTab('orders');
}

// =================== FARMER PROFILE PHOTO ===================
const FARMER_PHOTO_PRESETS = {
  farmer1: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200&auto=format&fit=crop&q=80',
  farmer2: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&auto=format&fit=crop&q=80',
  farmer3: 'https://images.unsplash.com/photo-1623428454614-abaf00244e52?w=200&auto=format&fit=crop&q=80',
  farmer4: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=200&auto=format&fit=crop&q=80'
};
let currentSelectedFarmerPhoto = null;

function handleFarmerPhotoFileSelected(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    currentSelectedFarmerPhoto = e.target.result;
    const box = document.getElementById('farmerPhotoPreviewBox');
    const img = document.getElementById('farmerPhotoPreviewImg');
    if (box && img) { img.src = currentSelectedFarmerPhoto; box.style.display = 'block'; }
    showToast('📸 Farmer photo loaded! Save profile to apply.');
  };
  reader.readAsDataURL(file);
}

function handleFarmerPhotoUrlInput(url) {
  url = (url || '').trim();
  if (!url) return;
  currentSelectedFarmerPhoto = url;
  const box = document.getElementById('farmerPhotoPreviewBox');
  const img = document.getElementById('farmerPhotoPreviewImg');
  if (box && img) { img.src = url; box.style.display = 'block'; }
}

function selectFarmerPreset(key) {
  const url = FARMER_PHOTO_PRESETS[key];
  if (!url) return;
  currentSelectedFarmerPhoto = url;
  const box = document.getElementById('farmerPhotoPreviewBox');
  const img = document.getElementById('farmerPhotoPreviewImg');
  if (box && img) { img.src = url; box.style.display = 'block'; }
}

// =================== CONSUMER PROFILE PHOTO ===================
const CONSUMER_PHOTO_PRESETS = {
  consumer1: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&auto=format&fit=crop&q=80',
  consumer2: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=80',
  consumer3: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
  consumer4: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
};
let currentSelectedConsumerPhoto = null;

function handleConsumerPhotoSelected(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    currentSelectedConsumerPhoto = e.target.result;
    const box = document.getElementById('consumerPhotoPreviewBox');
    const img = document.getElementById('consumerPhotoPreviewImg');
    if (box && img) { img.src = currentSelectedConsumerPhoto; box.style.display = 'block'; }
    showToast('📸 Photo loaded! Click Save to apply.');
  };
  reader.readAsDataURL(file);
}

function handleConsumerPhotoUrlInput(url) {
  url = (url || '').trim();
  if (!url) return;
  currentSelectedConsumerPhoto = url;
  const box = document.getElementById('consumerPhotoPreviewBox');
  const img = document.getElementById('consumerPhotoPreviewImg');
  if (box && img) { img.src = url; box.style.display = 'block'; }
}

function selectConsumerPreset(key) {
  const url = CONSUMER_PHOTO_PRESETS[key];
  if (!url) return;
  currentSelectedConsumerPhoto = url;
  const box = document.getElementById('consumerPhotoPreviewBox');
  const img = document.getElementById('consumerPhotoPreviewImg');
  if (box && img) { img.src = url; box.style.display = 'block'; }
}

function handleSaveConsumerProfile() {
  const nameInput = document.getElementById('consumerEditName');
  const name = nameInput ? nameInput.value.trim() : '';
  if (name) {
    currentUser.firstName = name;
    const disp = document.getElementById('consumerDisplayName');
    if (disp) disp.textContent = name;
  }
  if (currentSelectedConsumerPhoto) {
    const profileImg = document.getElementById('consumerProfileImg');
    if (profileImg) profileImg.src = currentSelectedConsumerPhoto;
    currentUser.photo = currentSelectedConsumerPhoto;
    currentSelectedConsumerPhoto = null;
  }
  showToast('✅ Consumer profile saved!');
}

// =================== BULK BUYER PROFILE PHOTO ===================
const BULK_LOGO_PRESETS = {
  bulk1: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&auto=format&fit=crop&q=80',
  bulk2: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&auto=format&fit=crop&q=80',
  bulk3: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=200&auto=format&fit=crop&q=80',
  bulk4: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&auto=format&fit=crop&q=80'
};
let currentSelectedBulkLogo = null;

function handleBulkLogoSelected(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    currentSelectedBulkLogo = e.target.result;
    const box = document.getElementById('bulkLogoPreviewBox');
    const img = document.getElementById('bulkLogoPreviewImg');
    if (box && img) { img.src = currentSelectedBulkLogo; box.style.display = 'block'; }
    showToast('📸 Company logo loaded! Click Save to apply.');
  };
  reader.readAsDataURL(file);
}

function handleBulkLogoUrlInput(url) {
  url = (url || '').trim();
  if (!url) return;
  currentSelectedBulkLogo = url;
  const box = document.getElementById('bulkLogoPreviewBox');
  const img = document.getElementById('bulkLogoPreviewImg');
  if (box && img) { img.src = url; box.style.display = 'block'; }
}

function selectBulkPreset(key) {
  const url = BULK_LOGO_PRESETS[key];
  if (!url) return;
  currentSelectedBulkLogo = url;
  const box = document.getElementById('bulkLogoPreviewBox');
  const img = document.getElementById('bulkLogoPreviewImg');
  if (box && img) { img.src = url; box.style.display = 'block'; }
}

function handleSaveBulkProfile() {
  const compInput = document.getElementById('bulkEditCompanyName');
  const comp = compInput ? compInput.value.trim() : '';
  if (comp) {
    currentUser.companyName = comp;
    const disp = document.getElementById('bulkCompanyDisplayName');
    if (disp) disp.textContent = comp;
  }
  if (currentSelectedBulkLogo) {
    const profileImg = document.getElementById('bulkBuyerProfileImg');
    if (profileImg) profileImg.src = currentSelectedBulkLogo;
    currentUser.logo = currentSelectedBulkLogo;
    currentSelectedBulkLogo = null;
  }
  showToast('✅ Company profile saved!');
}

// LIVE 4-STEP TRACKING ENGINE (REQ #8)
function updateLiveOrderTracking() {
  const line = document.getElementById('trackingProgressLine');
  const node1 = document.getElementById('stepNode1');
  const node2 = document.getElementById('stepNode2');
  const node3 = document.getElementById('stepNode3');
  const node4 = document.getElementById('stepNode4');

  const nodes = [node1, node2, node3, node4];
  nodes.forEach((n, idx) => {
    if (!n) return;
    n.className = 'stepper-node';
    if (idx + 1 < activeOrderTrackingStep) {
      n.classList.add('completed');
    } else if (idx + 1 === activeOrderTrackingStep) {
      n.classList.add('active');
    }
  });

  if (line) {
    const percentages = { 1: '0%', 2: '33%', 3: '66%', 4: '100%' };
    line.style.width = percentages[activeOrderTrackingStep] || '50%';
  }
}

function advanceTrackingSimulation() {
  if (activeOrderTrackingStep < 4) {
    activeOrderTrackingStep++;
    updateLiveOrderTracking();
    const stepNames = {
      2: "Step 2: Harvested and packed at the farm!",
      3: "Step 3: Farm-to-Door Delivery Vehicle is on the way!",
      4: "Step 4: Order Delivered Fresh to your doorstep! Enjoy healthy farm produce!"
    };
    showToast(stepNames[activeOrderTrackingStep]);
  } else {
    activeOrderTrackingStep = 1;
    updateLiveOrderTracking();
    showToast("Order tracking reset to Placed & Paid.", "info");
  }
}

function renderConsumerPastOrders() {
  const container = document.getElementById('consumerPastOrdersList');
  if (!container) return;
  container.innerHTML = `
    <div style="border-bottom:1px solid #f1f5f9; padding:0.75rem 0; display:flex; justify-content:space-between;">
      <div>
        <strong>Order #ORD-1045 - Organic Salem Turmeric (2 kg)</strong>
        <div style="font-size:0.78rem; color:#64748b;">Directly Paid ₹280 to Senthil Nathan (Indian Bank) &bull; Delivered on 04 Sep 2026</div>
      </div>
      <span class="farmer-fpo-badge">✓ Delivered Fresh</span>
    </div>
  `;
}

// ================= BULK BUYER INTERFACE & SUB-TABS (REQ #7) =================
function switchBulkTab(tab) {
  activeBulkTab = tab;
  ['btnBulkLots', 'btnBulkBids', 'btnBulkOrders', 'btnBulkProfile'].forEach(id => {
    document.getElementById(id)?.classList.remove('active');
  });

  const btnMap = {
    'lots': 'btnBulkLots',
    'bids': 'btnBulkBids',
    'orders': 'btnBulkOrders',
    'profile': 'btnBulkProfile'
  };
  document.getElementById(btnMap[tab])?.classList.add('active');

  ['bulkTabLots', 'bulkTabBids', 'bulkTabOrders', 'bulkTabProfile'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  if (tab === 'lots') {
    document.getElementById('bulkTabLots').style.display = 'block';
    renderBulkLots();
  } else if (tab === 'bids') {
    document.getElementById('bulkTabBids').style.display = 'block';
    renderBulkBids();
    runAIMatchingScan();
  } else if (tab === 'orders') {
    document.getElementById('bulkTabOrders').style.display = 'block';
    renderBulkOrdersList();
  } else if (tab === 'profile') {
    document.getElementById('bulkTabProfile').style.display = 'block';
  }

  initLucide();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderBulkLots() {
  const grid = document.getElementById('bulkLotsMarketGrid');
  if (!grid) return;
  const isTa = currentLang === 'ta';

  grid.innerHTML = crops.map(crop => `
    <div class="crop-listing-card">
      <img src="${crop.image}" class="crop-listing-img" alt="${crop.nameEn}">
      <div class="crop-listing-body">
        <div style="font-size:0.75rem; font-weight:800; color:#4338ca; text-transform:uppercase;">Wholesale Harvest Lot</div>
        <h3 style="font-size:1.15rem; font-weight:800; margin:0.35rem 0;">${isTa ? crop.nameTa : crop.nameEn}</h3>
        <div class="harvest-date-badge">🌾 Harvested: ${crop.harvestDate}</div>
        
        <div style="background:#eef2ff; border-radius:10px; padding:0.75rem; margin:0.75rem 0;">
          <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
            <span style="color:#64748b;">Retail:</span>
            <span style="text-decoration:line-through;">₹${crop.price}/kg</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-weight:800; color:#4338ca; font-size:1.15rem;">
            <span>Bulk Rate:</span>
            <span>₹${crop.bulkPrice}/kg</span>
          </div>
          <div style="font-size:0.75rem; color:#4338ca; margin-top:0.25rem;">Available: ${crop.quantity} &bull; Direct Farm: ${crop.farmLocation}</div>
        </div>

        <button class="btn btn-primary" style="background:#4338ca; width:100%; font-weight:700;" onclick="openBulkProcureModal('${crop.id}')">
          🏢 Procure Wholesale Lot (20% Advance) &rarr;
        </button>
      </div>
    </div>
  `).join('');
}

// ================= BULK BUYER RFQs & AI FARMER MATCHING (DIAGRAM DOMAIN 3 & AI ENGINE) =================
let rfqs = [
  {
    id: "RFQ-501",
    cropName: "Traditional Punjab Basmati Rice 1121",
    volume: "2500 kg (25 Quintals)",
    targetPrice: 75,
    location: "Koyambedu Wholesale Terminal, Chennai",
    dueDate: "2026-09-20",
    status: "Active Quotation",
    matchedFarmer: "Gurpreet Singh (Amritsar)",
    matchScore: 98
  },
  {
    id: "RFQ-502",
    cropName: "Country Grade A Fresh Tomatoes",
    volume: "1000 kg (10 Quintals)",
    targetPrice: 22,
    location: "Coimbatore Central Mandi",
    dueDate: "2026-09-15",
    status: "Active Quotation",
    matchedFarmer: "Ramesh Kumar (Pollachi)",
    matchScore: 96
  }
];

function openCreateRFQModal() {
  document.getElementById('createRFQModal').style.display = 'block';
}

function handleCreateRFQ(e) {
  e.preventDefault();
  const cropName = document.getElementById('rfqCropName').value.trim();
  const volume = document.getElementById('rfqVolume').value.trim();
  const targetPrice = parseFloat(document.getElementById('rfqTargetPrice').value.trim());
  const location = document.getElementById('rfqLocation').value.trim();
  const dueDate = document.getElementById('rfqDueDate').value || "Within 7 Days";

  const newRFQ = {
    id: "RFQ-" + Math.floor(500 + Math.random() * 500),
    cropName: cropName,
    volume: volume,
    targetPrice: targetPrice,
    location: location,
    dueDate: dueDate,
    status: "Tender Published",
    matchScore: 95
  };

  rfqs.unshift(newRFQ);

  fetch('/api/rfqs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newRFQ)
  }).catch(() => {});

  closeModal('createRFQModal');
  renderBulkBids();
  runAIMatchingScan();
  showToast("📋 Wholesale RFQ Tender published to registered farmers!");
}

function renderBulkBids() {
  const container = document.getElementById('bulkTendersList');
  if (!container) return;

  container.innerHTML = rfqs.map(rfq => `
    <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
      <div>
        <strong style="font-size: 1rem; color: #312e81;">Tender #${rfq.id}: ${rfq.volume} ${rfq.cropName}</strong>
        <div style="font-size: 0.82rem; color: #64748b; margin-top: 0.25rem;">
          Target Rate: <strong>₹${rfq.targetPrice}/kg</strong> &bull; Destination: ${rfq.location} &bull; Due: ${rfq.dueDate}
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span class="farmer-fpo-badge" style="background: #eef2ff; color: #4338ca;">${rfq.status}</span>
        <button class="btn btn-outline btn-sm" onclick="showToast('Reviewing direct farmer quotes for #${rfq.id}...')">View Quotes</button>
      </div>
    </div>
  `).join('');
}

function runAIMatchingScan() {
  const container = document.getElementById('aiFarmerMatchingList');
  if (!container) return;

  const matches = [
    {
      rfqTitle: "Basmati Rice 1121 Tender",
      farmerName: "Gurpreet Singh (Amritsar Farm, Punjab)",
      farmerPhoto: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80",
      produceAvailable: "5000 kg Premium Aged Basmati",
      matchScore: 98,
      quotedRate: "₹78 / kg",
      marketMandiRate: "₹95 / kg",
      savings: "₹42,500 Direct Farm Savings",
      fpo: "Amritsar Organic Paddy FPO (#PB-104)"
    },
    {
      rfqTitle: "Country Grade A Tomatoes Tender",
      farmerName: "Ramesh Kumar (Pollachi Farm, Coimbatore)",
      farmerPhoto: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80",
      produceAvailable: "500 kg Fresh Harvest",
      matchScore: 96,
      quotedRate: "₹22 / kg",
      marketMandiRate: "₹32 / kg",
      savings: "₹10,000 Direct Farm Savings",
      fpo: "Pollachi Farmers Producer Co. (#TN-402)"
    },
    {
      rfqTitle: "Salem Curcumin Turmeric Tender",
      farmerName: "Senthil Nathan (Salem Farm, Tamil Nadu)",
      farmerPhoto: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80",
      produceAvailable: "800 kg Export Grade Turmeric",
      matchScore: 94,
      quotedRate: "₹115 / kg",
      marketMandiRate: "₹145 / kg",
      savings: "₹24,000 Direct Farm Savings",
      fpo: "Salem Spice Growers Consortium (#TN-118)"
    }
  ];

  container.innerHTML = matches.map(m => `
    <div style="background: #ffffff; border: 1.5px solid #c7d2fe; border-radius: 12px; padding: 1rem; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.08); display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="font-size: 0.75rem; font-weight: 800; color: #4338ca; text-transform: uppercase;">${m.rfqTitle}</span>
          <span class="farmer-fpo-badge" style="background: #ecfdf5; color: #059669; font-weight: 800;">${m.matchScore}% Match ⭐</span>
        </div>
        <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 0.75rem;">
          <img src="${m.farmerPhoto}" style="width: 52px; height: 52px; border-radius: 10px; object-fit: cover; border: 1px solid #cbd5e1;" alt="${m.farmerName}">
          <div>
            <strong style="font-size: 0.95rem; color: #0f172a;">${m.farmerName}</strong>
            <div style="font-size: 0.75rem; color: #15803d; font-weight: 600;">${m.fpo}</div>
            <div style="font-size: 0.78rem; color: #64748b;">Supply: ${m.produceAvailable}</div>
          </div>
        </div>
        <div style="background: #f8fafc; border-radius: 8px; padding: 0.5rem 0.75rem; margin-bottom: 0.75rem; font-size: 0.8rem;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #64748b;">Direct Farmer Price:</span>
            <strong style="color: #15803d;">${m.quotedRate}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 0.2rem;">
            <span style="color: #64748b;">Market Mandi Price:</span>
            <span style="text-decoration: line-through; color: #94a3b8;">${m.marketMandiRate}</span>
          </div>
          <div style="color: #4338ca; font-weight: 700; margin-top: 0.35rem; font-size: 0.78rem; border-top: 1px dashed #e2e8f0; padding-top: 0.25rem;">
            💰 ${m.savings}
          </div>
        </div>
      </div>
      <button class="btn btn-primary btn-sm" style="background: #4338ca; width: 100%;" onclick="showToast('Connecting directly with Farmer ${m.farmerName} for B2B procurement contract!')">
        Connect &amp; Procure Direct &rarr;
      </button>
    </div>
  `).join('');
}

function renderBulkOrdersList() {
  const container = document.getElementById('bulkOrdersList');
  if (!container) return;
  container.innerHTML = bulkOrders.map(order => `
    <div style="border: 1.5px solid #cbd5e1; border-radius: 14px; padding: 1.25rem; background: #ffffff; margin-bottom: 1.25rem; box-shadow: 0 4px 14px rgba(0,0,0,0.04);">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1.5px solid #f1f5f9; padding-bottom: 0.85rem; margin-bottom: 1rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
            <span class="carrier-badge-chip">🚛 Dedicated Carrier</span>
            <strong style="font-size: 1.15rem; color: #1e1b4b;">Order #${order.id} &bull; ${order.cropName}</strong>
          </div>
          <div style="font-size: 0.84rem; color: #475569;">
            Direct Route: <strong>${order.origin}</strong> &rarr; <strong>${order.destination}</strong>
          </div>
        </div>
        <span class="farmer-fpo-badge" style="background: #dcfce7; color: #15803d; font-size: 0.82rem; padding: 6px 12px;">
          ✓ ${order.status}
        </span>
      </div>

      <!-- Financial & Advance Summary (REQ #3) -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; background: #f8fafc; border-radius: 10px; padding: 0.85rem; margin-bottom: 1rem; font-size: 0.85rem;">
        <div><span style="color:#64748b;">Farmer Payout:</span> <strong style="color:#15803d;">${order.farmerPayout}</strong></div>
        <div><span style="color:#64748b;">Advance Settled:</span> <strong style="color:#15803d;">${order.advancePaid}</strong></div>
        <div><span style="color:#64748b;">Mandi Gate Balance:</span> <strong style="color:#312e81;">${order.balanceDue}</strong></div>
        <div><span style="color:#64748b;">Consignment Volume:</span> <strong>${order.volume}</strong></div>
      </div>

      <!-- Transportation & Fleet Telemetry Details (REQ #4) -->
      <div style="background: #eef2ff; border: 1.5px solid #c7d2fe; border-radius: 12px; padding: 1rem; margin-bottom: 1rem;">
        <div style="font-weight: 800; color: #312e81; font-size: 0.92rem; margin-bottom: 0.6rem; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span>🚚</span>
            <span>Live Carrier Vehicle &amp; Driver Manifest:</span>
          </div>
          <span style="font-size: 0.78rem; background: #fff; color: #4338ca; padding: 2px 8px; border-radius: 6px; font-weight: 700;">
            ❄️ Temp: ${order.reeferTemp}
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.85rem; font-size: 0.85rem;">
          <div>
            <div style="color: #64748b; font-size: 0.75rem;">Vehicle Model &amp; Type:</div>
            <strong>${order.carrierName}</strong>
          </div>
          <div>
            <div style="color: #64748b; font-size: 0.75rem;">Vehicle Registration No:</div>
            <strong style="color: #1e1b4b; background: #fff; padding: 2px 8px; border-radius: 4px; border: 1px solid #c7d2fe; font-family: monospace; font-size: 0.9rem;">
              ${order.vehicleNumber}
            </strong>
          </div>
          <div>
            <div style="color: #64748b; font-size: 0.75rem;">Driver in Charge:</div>
            <strong>${order.driverName}</strong>
          </div>
          <div>
            <div style="color: #64748b; font-size: 0.75rem;">Contact Driver:</div>
            <a href="tel:${order.driverPhone}" class="btn btn-outline btn-sm" style="background:#fff; border-color:#4338ca; color:#4338ca; padding:2px 8px; font-size:0.75rem; text-decoration:none; display:inline-flex; align-items:center; gap:0.25rem;">
              📞 Call ${order.driverPhone}
            </a>
          </div>
        </div>
      </div>

      <!-- Route Stepper Timeline -->
      <div style="border-top: 1px dashed #e2e8f0; padding-top: 0.75rem;">
        <div style="font-size: 0.8rem; font-weight: 800; color: #334155; margin-bottom: 0.5rem;">📍 Real-Time Route Progress &amp; Mandi Milestones:</div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${order.gpsSteps.map(step => `
            <div style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.82rem;">
              <div style="width: 22px; height: 22px; border-radius: 50%; background: ${step.done ? '#15803d' : '#cbd5e1'}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 800;">
                ${step.done ? '✓' : '○'}
              </div>
              <div style="flex: 1;">
                <strong style="color: ${step.done ? '#0f172a' : '#64748b'};">${step.location}</strong>
                <span style="color: #64748b; font-size: 0.76rem; margin-left: 0.4rem;">(${step.time})</span>
                <div style="font-size: 0.75rem; color: #64748b;">${step.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// ================= AUTH MANAGEMENT & FARMER BANK REGISTRATION (REQ #3) =================
function showAuthView(view = 'login') {
  document.getElementById('authSection').style.display = 'flex';
  document.getElementById('farmerInterface').style.display = 'none';
  document.getElementById('consumerInterface').style.display = 'none';
  document.getElementById('bulkBuyerInterface').style.display = 'none';

  if (view === 'login') {
    document.getElementById('loginCard').style.display = 'block';
    document.getElementById('registerCard').style.display = 'none';
  } else {
    document.getElementById('loginCard').style.display = 'none';
    document.getElementById('registerCard').style.display = 'block';
  }
}

function selectRole(role) {
  currentRole = role;
  ['roleCardFarmer', 'roleCardConsumer', 'roleCardBulk'].forEach(id => {
    document.getElementById(id)?.classList.remove('selected');
  });

  const cardMap = {
    'farmer': 'roleCardFarmer',
    'consumer': 'roleCardConsumer',
    'bulk_buyer': 'roleCardBulk'
  };
  document.getElementById(cardMap[role])?.classList.add('selected');

  // Toggle farmer bank fields vs bulk buyer company fields (REQ #3)
  const farmerBankFields = document.getElementById('farmerBankFieldsSection');
  const bulkFields = document.getElementById('bulkBuyerFieldsSection');

  if (role === 'farmer') {
    farmerBankFields.style.display = 'block';
    bulkFields.style.display = 'none';
  } else if (role === 'bulk_buyer') {
    farmerBankFields.style.display = 'none';
    bulkFields.style.display = 'block';
  } else {
    farmerBankFields.style.display = 'none';
    bulkFields.style.display = 'none';
  }
}

function quickFillLogin(username, password) {
  document.getElementById('loginUsername').value = username;
  document.getElementById('loginPassword').value = password;
  handleLoginSubmit(new Event('submit'));
}

async function handleLoginSubmit(e) {
  if (e) e.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword')?.value || 'password123';

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const result = await res.json();
    if (result.success && result.user) {
      currentUser = result.user;
      loginUserSession(currentUser);
      showToast(`Welcome ${currentUser.firstName}! Logged in as ${currentUser.role.toUpperCase()}`);
      return;
    }
  } catch (err) {
    console.log("Local API fallback", err);
  }

  // Fallback demo user mapping if offline
  let user = {
    firstName: "Ramesh Kumar",
    username: username,
    role: "farmer",
    mobile: "9876543210",
    email: "ramesh.farmer@kisan.in",
    farmName: "Ramesh Organic Farms & Nursery",
    location: "Pollachi, Coimbatore - 642001",
    landArea: "4.5 Acres",
    fpo: "Pollachi Farmers Producer Co. (#TN-402)",
    soilHealth: "Grade A (High Organic Carbon)",
    bankName: "State Bank of India (SBI)",
    accountNumber: "XXXX-XXXX-4921",
    ifsc: "SBIN0001234",
    upi: "ramesh.farmer@sbi"
  };

  if (username.includes('buyer') || username.includes('ananya')) {
    user = { firstName: "Ananya S.", username: username, role: "consumer", mobile: "9840123456", email: "ananya.consumer@gmail.com" };
  } else if (username.includes('wholesale') || username.includes('bulk')) {
    user = {
      firstName: "Agro Wholesale Corp",
      companyName: "Agro Wholesale Traders Pvt Ltd",
      username: username,
      role: "bulk_buyer",
      mobile: "9811223344",
      email: "procurement@agrowholesale.in"
    };
  }

  currentUser = user;
  loginUserSession(user);
  showToast(`Welcome ${user.firstName}! Logged in as ${user.role.toUpperCase()}`);
}

// DIRECT DATABASE REGISTRATION (REQ #2)
async function handleRegisterSubmit(e) {
  e.preventDefault();
  const firstName = document.getElementById('regFirstName').value.trim();
  const mobile = document.getElementById('regMobile').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value;
  const roleRadio = document.querySelector('input[name="regRole"]:checked');
  const role = roleRadio ? roleRadio.value : 'farmer';

  let registrationPayload = {
    firstName,
    mobile,
    email,
    username,
    password,
    role
  };

  if (role === 'farmer') {
    const bankName = (document.getElementById('regFarmerBank')?.value || '').trim();
    const accountNum = (document.getElementById('regFarmerAccount')?.value || '').trim();
    const ifsc = (document.getElementById('regFarmerIFSC')?.value || '').trim();
    const upi = (document.getElementById('regFarmerUPI')?.value || '').trim();
    const village = (document.getElementById('regFarmerVillage')?.value || '').trim();

    if (!bankName || !accountNum || !ifsc || !upi) {
      showToast('⚠️ Please provide Bank Name, Account Number, IFSC, and UPI ID.', 'error');
      return;
    }

    registrationPayload.bankName = bankName;
    registrationPayload.accountNumber = accountNum;
    registrationPayload.ifsc = ifsc;
    registrationPayload.upi = upi;
    registrationPayload.location = village || "Coimbatore, Tamil Nadu";
    registrationPayload.farmName = firstName + " Organic Farm";
  } else if (role === 'bulk_buyer') {
    const compName = (document.getElementById('regCompanyName')?.value || '').trim();
    const gstin = (document.getElementById('regGSTIN')?.value || '').trim();
    const bType = document.getElementById('regBusinessType')?.value || "Wholesale Mandi Trader";

    if (!compName) {
      showToast('⚠️ Please provide your Company or Enterprise Name.', 'error');
      return;
    }

    registrationPayload.companyName = compName;
    registrationPayload.gstin = gstin || "33AAAAA0000A1Z5";
    registrationPayload.businessType = bType;
  } else {
    registrationPayload.address = "Coimbatore, Tamil Nadu";
  }

  // POST directly to server database.json
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationPayload)
    });

    const result = await res.json();
    if (!res.ok || !result.success) {
      showToast(result.message || 'Registration failed. Username may already exist.', 'error');
      return;
    }

    currentUser = result.user;
    loginUserSession(currentUser);
    showToast(`🎉 Account successfully created and saved to database for ${firstName}!`);
  } catch (err) {
    console.error("API error during registration", err);
    // Offline fallback
    currentUser = registrationPayload;
    loginUserSession(currentUser);
    showToast(`Account registered for ${firstName}!`);
  }
}

function loginUserSession(user) {
  localStorage.setItem('kisan_user', JSON.stringify(user));

  // Trigger app logo for 3 seconds on screen before unveiling role interface
  triggerSplashScreen(() => {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('userNavGroup').style.display = 'flex';
    document.getElementById('authNavButtons').style.display = 'none';

    document.getElementById('navUserName').textContent = user.firstName;
    const roleBadge = document.getElementById('navRoleBadge');
    
    if (user.role === 'farmer') {
      roleBadge.textContent = 'Farmers/FPOs';
      roleBadge.style.background = '#dcfce7';
      roleBadge.style.color = '#166534';
    } else if (user.role === 'consumer') {
      roleBadge.textContent = 'Consumer';
      roleBadge.style.background = '#fef3c7';
      roleBadge.style.color = '#92400e';
    } else {
      roleBadge.textContent = 'Bulk Buyer B2B';
      roleBadge.style.background = '#e0e7ff';
      roleBadge.style.color = '#3730a3';
    }

    switchInterface(user.role);
  });
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem('kisan_user');
  document.getElementById('userNavGroup').style.display = 'none';
  document.getElementById('authNavButtons').style.display = 'block';
  showAuthView('login');
  showToast("Logged out.", "info");
}

function switchInterface(role) {
  document.getElementById('farmerInterface').style.display = 'none';
  document.getElementById('consumerInterface').style.display = 'none';
  document.getElementById('bulkBuyerInterface').style.display = 'none';

  if (role === 'farmer') {
    document.getElementById('farmerInterface').style.display = 'block';
    switchFarmerTab('home');
  } else if (role === 'consumer') {
    document.getElementById('consumerInterface').style.display = 'block';
    switchConsumerTab('market');
  } else if (role === 'bulk_buyer') {
    document.getElementById('bulkBuyerInterface').style.display = 'block';
    switchBulkTab('lots');
  }

  initLucide();
}

// ================= CHATBOX & VOICE ASSISTANT (REQ #5) =================
function toggleChatbot() {
  const drawer = document.getElementById('chatbotDrawer');
  drawer.classList.toggle('active');
  if (drawer.classList.contains('active')) {
    document.getElementById('chatInputText').focus();
    renderChatMessages();
  }
}

function switchChatTab(tab) {
  activeChatTab = tab;
  document.getElementById('chatTabAI').classList.toggle('active', tab === 'ai');
  document.getElementById('chatTabDirect').classList.toggle('active', tab === 'direct');
  renderChatMessages();
}

function renderChatMessages() {
  const container = document.getElementById('chatMessagesBody');
  const messages = chatHistory[activeChatTab] || [];
  container.innerHTML = messages.map(msg => `
    <div class="chat-bubble ${msg.sender}">${msg.text}</div>
  `).join('');
  container.scrollTop = container.scrollHeight;
}

function sendQuickPrompt(promptText) {
  document.getElementById('chatInputText').value = promptText;
  handleChatSubmit(new Event('submit'));
}

// VOICE ASSISTANT MICROPHONE ENGINE (REQ #5)
function toggleVoiceAssistant() {
  const micBtn = document.getElementById('voiceMicBtn');
  const title = document.getElementById('voiceStatusTitle');
  const subtitle = document.getElementById('voiceStatusSubtitle');

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast("Web Speech Recognition is not supported in this browser. Please type your query.", "info");
    return;
  }

  if (isVoiceListening) {
    if (speechRecognitionInstance) speechRecognitionInstance.stop();
    isVoiceListening = false;
    micBtn.classList.remove('recording');
    title.textContent = "Voice Assistant";
    subtitle.textContent = "Click mic to speak in Tamil or English";
    return;
  }

  try {
    speechRecognitionInstance = new SpeechRecognition();
    speechRecognitionInstance.continuous = false;
    speechRecognitionInstance.interimResults = false;
    speechRecognitionInstance.lang = currentLang === 'ta' ? 'ta-IN' : 'en-IN';

    speechRecognitionInstance.onstart = () => {
      isVoiceListening = true;
      micBtn.classList.add('recording');
      title.textContent = "🎤 Listening now...";
      subtitle.textContent = "Speak clearly into your microphone...";
      showToast("Listening... Speak your question now!");
    };

    speechRecognitionInstance.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      document.getElementById('chatInputText').value = transcript;
      handleChatSubmit(new Event('submit'));
    };

    speechRecognitionInstance.onerror = (event) => {
      console.warn("Speech error", event.error);
      micBtn.classList.remove('recording');
      isVoiceListening = false;
      title.textContent = "Voice Assistant";
      subtitle.textContent = "Click mic to try speaking again";
    };

    speechRecognitionInstance.onend = () => {
      micBtn.classList.remove('recording');
      isVoiceListening = false;
      title.textContent = "Voice Assistant";
      subtitle.textContent = "Click mic to speak in Tamil or English";
    };

    speechRecognitionInstance.start();
  } catch (err) {
    console.error("Mic error", err);
    showToast("Microphone access error. Please check browser permissions.", "info");
  }
}

function handleChatSubmit(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('chatInputText');
  const query = input.value.trim();
  if (!query) return;

  chatHistory[activeChatTab].push({ sender: 'user', text: query });
  input.value = '';
  renderChatMessages();

  setTimeout(() => {
    let reply = "";
    const isTa = currentLang === 'ta';

    if (activeChatTab === 'ai') {
      const qLower = query.toLowerCase();
      if (qLower.includes('mandi') || qLower.includes('விலை') || qLower.includes('price')) {
        reply = isTa 
          ? "📊 இன்றைய கோயம்பேடு & ஒட்டன்சத்திரம் மண்டி விலை நிலவரம்: தக்காளி Grade A: ₹28 - ₹34/kg. அடுத்த வாரத்தில் தேவை 28% உயரும் என்று கணிக்கப்பட்டுள்ளது."
          : "📊 Live Mandi Update: Grade A Tomatoes trading at ₹28 - ₹34/kg in Koyambedu & Pollachi. Anticipating a 28% price surge in the next 7 days.";
      } else if (qLower.includes('curl') || qLower.includes('சுருட்டல்') || qLower.includes('disease') || qLower.includes('மருந்து')) {
        reply = isTa
          ? "🌿 தக்காளி இலை சுருட்டல் நோய்க்கு (Leaf Curl): வெள்ளை ஈக்களைக் கட்டுப்படுத்த மஞ்சள் ஒட்டும் பொறி (Yellow Sticky Trap) வைக்கவும் மற்றும் 5ml வேப்பெண்ணெய் 1 லிட்டர் நீரில் கலந்து தெளிக்கவும்."
          : "🌿 Tomato Leaf Curl Treatment: Control whiteflies using Yellow Sticky Traps. Spray 5ml Neem Oil + organic soap per liter of water early morning.";
      } else {
        reply = isTa
          ? `🌾 மண் மித்ரா AI: "${query}" என்ற உங்கள் கேள்விக்கு உடனடியாக வேளாண் ஆலோசனை தயாராகிறது. அருகிலுள்ள விவசாயிகளிடம் நேரடி ஆர்டர் செய்யலாம்.`
          : `🌾 Mann Mithra AI: Processing your question "${query}". You can connect directly with verified local farmers near you.`;
      }
    } else {
      reply = isTa
        ? "💬 [விவசாயி ரமேஷ் குமார்]: வணக்கம்! உங்கள் கோரிக்கை கிடைத்தது. எங்கள் பொள்ளாச்சி பண்ணையில் அறுவடை தயார் நிலையில் உள்ளது. நீங்கள் ஆப் மூலம் ஆர்டர் செய்யலாம்!"
        : "💬 [Farmer Ramesh Kumar]: Hello! Received your inquiry. Fresh harvest is packed and ready for dispatch at our Pollachi farm!";
    }

    chatHistory[activeChatTab].push({ sender: 'bot', text: reply });
    renderChatMessages();

    // Voice response if supported
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(reply.replace(/[^\w\s\u0B80-\u0BFF₹0-9.,-]/gi, ' '));
      utter.lang = isTa ? 'ta-IN' : 'en-IN';
      window.speechSynthesis.speak(utter);
    }
  }, 600);
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

// ================= BULK BUYER 20% ADVANCE PROCUREMENT ENGINE (REQ #3) =================
let selectedBulkProcureCrop = null;
let activeBulkAdvanceMethod = 'online';

function openBulkProcureModal(cropId) {
  const crop = crops.find(c => c.id === cropId) || crops[0];
  if (!crop) return;
  selectedBulkProcureCrop = crop;

  const isTa = currentLang === 'ta';
  const el = (id) => document.getElementById(id);

  if (el('bulkModalCropName')) el('bulkModalCropName').textContent = isTa ? crop.nameTa : crop.nameEn;
  if (el('bulkModalFarmerName')) el('bulkModalFarmerName').textContent = crop.farmerName;
  if (el('bulkModalFarmerLocation')) el('bulkModalFarmerLocation').textContent = crop.farmLocation;
  if (el('bulkModalRate')) el('bulkModalRate').textContent = `₹${crop.bulkPrice} / kg`;
  if (el('bulkModalQuantity')) el('bulkModalQuantity').textContent = `${crop.quantity}`;
  if (el('bulkModalFarmerUPI')) el('bulkModalFarmerUPI').textContent = crop.farmerUPI || 'ramesh.farmer@sbi';

  // Default procurement volume
  const volInput = el('bulkOrderVolumeInput');
  if (volInput) {
    volInput.value = parseInt(crop.quantity) || 500;
  }

  activeBulkAdvanceMethod = 'online';
  switchBulkAdvanceMethod('online');
  calculateBulkAdvanceTotals();

  el('bulkProcureModal').style.display = 'block';
}

function calculateBulkAdvanceTotals() {
  if (!selectedBulkProcureCrop) return;
  const volInput = document.getElementById('bulkOrderVolumeInput');
  const volume = Math.max(50, parseInt(volInput ? volInput.value : 500) || 50);
  const rate = selectedBulkProcureCrop.bulkPrice || 22;

  const totalValue = volume * rate;
  const advanceToken = Math.round(totalValue * 0.20); // 20% Advance Token
  const balanceDelivery = totalValue - advanceToken;   // 80% Balance on Delivery

  const el = (id) => document.getElementById(id);
  if (el('bulkTotalOrderValue')) el('bulkTotalOrderValue').textContent = `₹${totalValue.toLocaleString('en-IN')}`;
  if (el('bulkAdvanceTokenAmount')) el('bulkAdvanceTokenAmount').textContent = `₹${advanceToken.toLocaleString('en-IN')}`;
  if (el('bulkBalanceDeliveryAmount')) el('bulkBalanceDeliveryAmount').textContent = `₹${balanceDelivery.toLocaleString('en-IN')}`;

  const btn = el('btnConfirmBulkAdvance');
  if (btn) {
    const labels = {
      online: `Pay 20% Advance (₹${advanceToken.toLocaleString('en-IN')}) via UPI & Confirm Order →`,
      card: `Pay 20% Advance (₹${advanceToken.toLocaleString('en-IN')}) via Card & Confirm Order →`,
      cod: `Sign Mandi Agreement (Total ₹${totalValue.toLocaleString('en-IN')}) & Confirm Order →`
    };
    btn.textContent = labels[activeBulkAdvanceMethod] || `Pay 20% Advance (₹${advanceToken.toLocaleString('en-IN')}) & Confirm Order →`;
  }
}

function switchBulkAdvanceMethod(method) {
  activeBulkAdvanceMethod = method;
  ['online', 'card', 'cod'].forEach(m => {
    const cap = m.charAt(0).toUpperCase() + m.slice(1);
    const card = document.getElementById(`bulkPayMethod${cap}`);
    const form = document.getElementById(`bulkAdvanceForm${cap}`);
    if (card) card.classList.toggle('active', m === method);
    if (form) form.style.display = (m === method) ? 'block' : 'none';
  });
  calculateBulkAdvanceTotals();
}

async function processBulkProcureSubmission() {
  if (!selectedBulkProcureCrop) return;
  const crop = selectedBulkProcureCrop;
  const volInput = document.getElementById('bulkOrderVolumeInput');
  const volume = Math.max(50, parseInt(volInput ? volInput.value : 500) || 50);
  const totalValue = volume * crop.bulkPrice;
  const advanceToken = Math.round(totalValue * 0.20);
  const balanceDelivery = totalValue - advanceToken;

  if (activeBulkAdvanceMethod === 'card') {
    const num = (document.getElementById('bulkCardNumber')?.value || '').replace(/\s/g, '');
    const exp = (document.getElementById('bulkCardExpiry')?.value || '').trim();
    if (num.length < 16 || exp.length < 5) {
      showToast('⚠️ Please enter valid corporate card details.', 'error');
      return;
    }
  }

  const newBulkOrder = {
    id: "B2B-" + (900 + bulkOrders.length + 1),
    cropName: `${crop.nameEn} (Grade A Lot)`,
    volume: `${volume} kg (${(volume/1000).toFixed(1)} MT)`,
    farmerName: crop.farmerName,
    farmerPayout: `₹${totalValue.toLocaleString('en-IN')}`,
    advancePaid: `₹${advanceToken.toLocaleString('en-IN')} (20% Advance Token Settled)`,
    balanceDue: `₹${balanceDelivery.toLocaleString('en-IN')} (80% Payable at Mandi)`,
    carrierName: "Direct Agri Transport Reefer (Eicher Pro)",
    vehicleNumber: "TN-38-BZ-7819",
    driverName: "Kandasamy R.",
    driverPhone: "+91 98421-55012",
    origin: crop.farmLocation || "Farm Gate",
    destination: "Koyambedu Mandi Wholesale Terminal, Chennai",
    departureTime: "Tomorrow 06:00 AM",
    eta: "Tomorrow 04:30 PM",
    reeferTemp: "7.8°C (Optimal Cold Chain)",
    status: "Confirmed & Scheduled for Loading",
    gpsSteps: [
      { location: crop.farmLocation || "Farm Gate", time: "Tomorrow 06:00 AM", done: true, desc: "20% advance verified. Crates being loaded." },
      { location: "Regional Hub Mandi Corridor", time: "Tomorrow 10:00 AM", done: false, desc: "Consolidation & digital e-Way bill generate" },
      { location: "Wholesale Delivery Mandi Gate", time: "Tomorrow 04:30 PM", done: false, desc: "Weighbridge sign-off & balance payment release" }
    ]
  };

  bulkOrders.unshift(newBulkOrder);
  closeModal('bulkProcureModal');

  // Also post order to database.json /api/orders
  try {
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bulkOrderId: newBulkOrder.id,
        cropId: crop.id,
        cropName: crop.nameEn,
        farmerName: crop.farmerName,
        volume: newBulkOrder.volume,
        totalAmount: totalValue,
        advanceAmount: advanceToken,
        balanceAmount: balanceDelivery,
        paymentMethod: activeBulkAdvanceMethod.toUpperCase(),
        status: 'Advance Paid & Scheduled'
      })
    });
  } catch (e) {
    console.log("DB sync fallback", e);
  }

  showToast(`🎉 20% Advance (₹${advanceToken.toLocaleString('en-IN')}) successfully paid to Farmer ${crop.farmerName}! Wholesale truckload order confirmed.`);
  switchBulkTab('orders');
}

// ================= 3-SECOND SPLASH SCREEN LOGO CONTROLLER (REQ #1) =================
function triggerSplashScreen(callback) {
  const splash = document.getElementById('appSplashScreen');
  if (!splash) {
    if (callback) callback();
    return;
  }

  // Reset animations and display
  splash.style.display = 'flex';
  splash.classList.remove('fade-out');

  const bar = splash.querySelector('.splash-timer-bar');
  if (bar) {
    bar.style.animation = 'none';
    // Trigger reflow to restart CSS animation
    void bar.offsetWidth;
    bar.style.animation = 'splashTimerFill 3s linear forwards';
  }

  setTimeout(() => {
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.style.display = 'none';
      if (callback) callback();
    }, 600);
  }, 3000);
}

function initializeSplashScreen() {
  triggerSplashScreen();
}

// Attach lifecycle events
window.addEventListener('DOMContentLoaded', () => {
  initializeSplashScreen();
  initLucide();
});


