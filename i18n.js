// Mann Mithra (மண் மித்ரா) - Multilingual Localization Engine
// 100% Pure Language Separation (Zero mixed text)

const officialLanguages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्' },
  { code: 'kok', name: 'Konkani', native: 'कोंकणी' },
  { code: 'mai', name: 'Maithili', native: 'मैथिली' },
  { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'doi', name: 'Dogri', native: 'डोगरी' },
  { code: 'ne', name: 'Nepali', native: 'नेपाली' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي' },
  { code: 'brx', name: 'Bodo', native: 'बड़ो' },
  { code: 'ks', name: 'Kashmiri', native: 'کٲشُر' },
  { code: 'mni', name: 'Manipuri', native: 'মৈতৈলোন্' }
];

const translations = {
  // PURE ENGLISH DICTIONARY (ZERO TAMIL WORDS)
  en: {
    brandName: "Mann Mithra",
    brandSubtitle: "Farmers-to-Market Direct Platform - SI H26033",
    farmerFPO: "Farmers / FPOs",
    
    // Farmer Nav
    navHome: "Home",
    navProduce: "My Produce",
    navForecast: "AI Forecast",
    navOrders: "Orders",
    navAccount: "Farmer Profile",

    // Consumer Nav
    navMarket: "Fresh Market",
    navMyOrders: "My Orders & Tracking",
    navConsumerProfile: "My Profile & Address",

    // Bulk Buyer Nav
    navLots: "Wholesale Lots",
    navBids: "My RFQs & Tenders",
    navBulkOrders: "B2B Orders",
    navCompanyProfile: "Company Profile",

    // Farmer Home
    dashboardTitle: "Farmer Direct Command Center",
    dashboardSubtitle: "Live Harvest Inventory, AI Market Demand & Direct Consumer Orders",
    myProduce: "My Produce",
    aiDemandForecast: "AI Demand Forecast",
    tomatoDemand: "Tomato Demand",
    futureDemand: "Future Demand",
    forecastHigh: "Forecast: High Demand",
    activeOrders: "Active Orders",
    prepareBtn: "Prepare",
    preparedBadge: "Ready for Dispatch",
    earningsPayments: "Earnings & Payments",
    lastPayoutDetail: "Last Payout: 5/2, 2026 - ₹13,05,400",
    viewDetails: "View Details >",
    totalEarnings: "Total: ₹15,400",

    // Produce Screen
    produceTitle: "Harvest Catalog & Inventory Control",
    addNewProduce: "Add New Crop Listing",
    cropName: "Crop Name",
    category: "Category",
    quantityAvailable: "Stock Available",
    retailPrice: "Retail Rate (₹/kg)",
    bulkPrice: "Wholesale Rate (₹/kg)",
    harvestDate: "Harvest Date",
    organicTag: "100% Organic Certified",

    // Forecast Screen
    forecastTitle: "AI Market Demand & Price Forecasting",
    forecastDesc: "Predictive AI intelligence across Koyambedu, Madurai, Azadpur & Nashik Mandis",
    currentMandiRate: "Current Mandi Rate",
    predictedNextWeek: "Predicted Rate (Next 7 Days)",
    demandStatus: "Market Demand Status",
    advisoryText: "AI Crop Advisory: Tomato and Onion demand is forecasted to surge by 28% due to upcoming festive season. Optimal selling window starts in 3 days.",

    // Nearest Farm & Geolocation
    nearestFarmsTitle: "Discover Fresh Produce from Nearest Farmers",
    locationSelectorLabel: "Your Delivery City / Area:",
    useGPSBtn: "Use My Current Location",
    closestFirst: "Closest Farms First ⚡",
    allFarms: "All Verified Farms",
    organicOnly: "Organic Only 🌿",
    kmAway: "km away",
    harvestedOn: "Harvested on",
    directToFarmer: "Direct Payment to Farmer",

    // Direct Payment to Farmer
    directPayNotice: "100% of your payment is transferred directly to the farmer's bank account with zero middlemen commission.",
    payToFarmerBtn: "Pay Directly to Farmer",
    paymentSuccessTitle: "Payment Received by Farmer!",
    directCreditMsg: "Funds have been transferred directly to Farmer Ramesh Kumar's State Bank of India account.",
    transactionId: "Transaction ID",

    // Live Order Tracking
    orderTrackingTitle: "Live Farm-to-Door Order Tracking",
    orderStatus_Placed: "Order Placed & Paid to Farmer",
    orderStatus_Packed: "Harvested & Packed by Farmer",
    orderStatus_Out: "Out for Direct Farm Delivery",
    orderStatus_Delivered: "Delivered Fresh to Consumer",
    estimatedArrival: "Estimated Arrival",
    callFarmer: "Call Farmer",
    hubDeliveryDistance: "Delivery Distance",

    // Farmer Bank Registration
    farmerBankTitle: "Farmer Bank & Payout Information",
    bankNameLabel: "Bank Name *",
    bankNamePlaceholder: "e.g., State Bank of India / Canara Bank",
    accountNumberLabel: "Bank Account Number *",
    accountNumberPlaceholder: "Enter 11-16 digit account number",
    ifscLabel: "IFSC Code *",
    ifscPlaceholder: "e.g., SBIN0001234",
    upiIdLabel: "UPI ID *",
    upiIdPlaceholder: "e.g., ramesh.farmer@sbi",
    farmVillageLabel: "Farm Location / Village *",
    farmVillagePlaceholder: "e.g., Pollachi, Coimbatore",

    // Chatbox & Voice Assistant
    chatbotTitle: "Mann Mithra AI & Chat",
    voiceAssistantBtn: "Voice Assistant",
    voiceListening: "Listening... Speak your agricultural question in English or Tamil",
    voiceReplyAudio: "Voice answer enabled",

    login: "Login",
    register: "Register",
    logout: "Logout",
    privacyProtected: "Privacy Protected"
  },

  // PURE TAMIL DICTIONARY (ZERO ENGLISH/TANGLISH WORDS)
  ta: {
    brandName: "மண் மித்ரா",
    brandSubtitle: "விவசாயிகள் சந்தைக்கு நேரடியாக இணைக்கும் தளம் - SI H26033",
    farmerFPO: "விவசாயிகள் / உழவர் உற்பத்தியாளர் குழு",
    
    // Farmer Nav
    navHome: "முகப்பு",
    navProduce: "எனது விளைபொருட்கள்",
    navForecast: "AI தேவைக் கணிப்பு",
    navOrders: "ஆர்டர்கள்",
    navAccount: "விவசாயி சுயவிவரம்",

    // Consumer Nav
    navMarket: "புதிய பண்ணை சந்தை",
    navMyOrders: "எனது ஆர்டர்கள் & நேரலை கண்காணிப்பு",
    navConsumerProfile: "எனது முகவரி & சுயவிவரம்",

    // Bulk Buyer Nav
    navLots: "மொத்த அறுவடை தொகுப்புகள்",
    navBids: "எனது ஏலங்கள் & கோரிக்கைகள்",
    navBulkOrders: "மொத்த கொள்முதல் ஆர்டர்கள்",
    navCompanyProfile: "நிறுவன விவரங்கள்",

    // Farmer Home
    dashboardTitle: "விவசாயி நேரடி கட்டுப்பாட்டு மையம்",
    dashboardSubtitle: "நேரலை பயிர் இருப்பு, சந்தை தேவைக் கணிப்பு மற்றும் நுகர்வோர் ஆர்டர்கள்",
    myProduce: "எனது விளைபொருட்கள்",
    aiDemandForecast: "AI தேவைக் கணிப்பு",
    tomatoDemand: "தக்காளி தேவை",
    futureDemand: "எதிர்கால தேவை",
    forecastHigh: "கணிப்பு: மிக அதிக தேவை",
    activeOrders: "செயலில் உள்ள ஆர்டர்கள்",
    prepareBtn: "தயார் செய்",
    preparedBadge: "விநியோகத்திற்கு தயார்",
    earningsPayments: "வருவாய் & செலுத்துதல்",
    lastPayoutDetail: "கடைசி செலுத்துதல்: 5/2, 2026 - ₹13,05,400",
    viewDetails: "விவரங்களை பார்க்க >",
    totalEarnings: "மொத்தம்: ₹15,400",

    // Produce Screen
    produceTitle: "விளைபொருள் களஞ்சியம் & இருப்பு கட்டுப்பாடு",
    addNewProduce: "புதிய பயிரை சேர்க்கவும்",
    cropName: "பயிர் பெயர்",
    category: "வகை",
    quantityAvailable: "இருப்பு அளவு",
    retailPrice: "சில்லறை விலை (₹/கிலோ)",
    bulkPrice: "மொத்த விலை (₹/கிலோ)",
    harvestDate: "அறுவடை நாள்",
    organicTag: "100% இயற்கை உரம் சான்றளிக்கப்பட்டது",

    // Forecast Screen
    forecastTitle: "AI சந்தை தேவைக் கணிப்பு & விலை முன்னறிவிப்பு",
    forecastDesc: "கோயம்பேடு, ஒட்டன்சத்திரம், மதுரை மற்றும் நாசிக் மண்டிகளின் செயற்கை நுண்ணறிவு மதிப்பீடு",
    currentMandiRate: "தற்போதைய மண்டி விலை",
    predictedNextWeek: "அடுத்த வார கணிப்பு (7 நாட்கள்)",
    demandStatus: "சந்தை தேவை நிலை",
    advisoryText: "வேளாண் ஆலோசனை: வரவிருக்கும் பண்டிகை நாட்களால் தக்காளி மற்றும் வெங்காயத்தின் தேவை 28% உயரும் என்று கணிக்கப்பட்டுள்ளது. அறுவடைக்கு தயாராகுங்கள்.",

    // Nearest Farm & Geolocation
    nearestFarmsTitle: "உங்களுக்கு அருகிலுள்ள விவசாயிகளிடமிருந்து புதிய விளைபொருட்கள்",
    locationSelectorLabel: "உங்கள் நகரம் / இருப்பிடம்:",
    useGPSBtn: "எனது தற்போதைய இருப்பிடத்தைப் பயன்படுத்து",
    closestFirst: "மிக அருகிலுள்ள பண்ணைகள் ⚡",
    allFarms: "அனைத்து பண்ணைகள்",
    organicOnly: "இயற்கை விளைபொருட்கள் மட்டும் 🌿",
    kmAway: "கி.மீ தூரத்தில்",
    harvestedOn: "அறுவடை செய்யப்பட்ட நாள்",
    directToFarmer: "விவசாயிக்கு நேரடி பணப்பரிமாற்றம்",

    // Direct Payment to Farmer
    directPayNotice: "இடைத்தரகர் கமிஷன் இல்லாமல், நீங்கள் செலுத்தும் 100% தொகையும் நேரடியாக விவசாயியின் வங்கிக் கணக்கிற்கு செல்கிறது.",
    payToFarmerBtn: "விவசாயிக்கு நேரடியாக செலுத்தவும்",
    paymentSuccessTitle: "பணம் விவசாயியை சென்றடைந்தது!",
    directCreditMsg: "தொகை நேரடியாக விவசாயி ரமேஷ் குமாரின் பாரத ஸ்டேட் வங்கி கணக்கில் செலுத்தப்பட்டது.",
    transactionId: "பரிவர்த்தனை எண்",

    // Live Order Tracking
    orderTrackingTitle: "நேரலை பண்ணை-வீட்டு விநியோக கண்காணிப்பு",
    orderStatus_Placed: "ஆர்டர் செய்யப்பட்டு விவசாயிக்கு பணம் செலுத்தப்பட்டது",
    orderStatus_Packed: "பண்ணையில் அறுவடை செய்யப்பட்டு பேக் செய்யப்பட்டது",
    orderStatus_Out: "நேரடி பண்ணை டெலிவரிக்கு புறப்பட்டது",
    orderStatus_Delivered: "புதியதாக வாடிக்கையாளரிடம் ஒப்படைக்கப்பட்டது",
    estimatedArrival: "வந்து சேரும் நேரம்",
    callFarmer: "விவசாயியை அழைக்க",
    hubDeliveryDistance: "விநியோக தூரம்",

    // Farmer Bank Registration
    farmerBankTitle: "விவசாயியின் வங்கி & செலுத்துதல் விவரங்கள்",
    bankNameLabel: "வங்கி பெயர் *",
    bankNamePlaceholder: "எ.கா: பாரத ஸ்டேட் வங்கி / இந்தியன் வங்கி",
    accountNumberLabel: "வங்கி கணக்கு எண் *",
    accountNumberPlaceholder: "11-16 இலக்க கணக்கு எண்",
    ifscLabel: "IFSC குறியீடு *",
    ifscPlaceholder: "எ.கா: SBIN0001234",
    upiIdLabel: "UPI ஐடி *",
    upiIdPlaceholder: "எ.கா: ramesh.farmer@sbi",
    farmVillageLabel: "பண்ணை அமைவிடம் / கிராமம் *",
    farmVillagePlaceholder: "எ.கா: பொள்ளாச்சி, கோயம்புத்தூர்",

    // Chatbox & Voice Assistant
    chatbotTitle: "மண் மித்ரா AI & நேரடி அரட்டை",
    voiceAssistantBtn: "குரல் வழி உதவியாளர்",
    voiceListening: "கேட்கிறது... உங்கள் விவசாய கேள்வியை தமிழில் அல்லது ஆங்கிலத்தில் பேசுங்கள்",
    voiceReplyAudio: "குரல் பதில் இயக்கப்பட்டது",

    login: "உள்நுழைய",
    register: "பதிவு செய்க",
    logout: "வெளியேறு",
    privacyProtected: "தனிநபர் தகவல் பாதுகாக்கப்பட்டது"
  },

  // PURE HINDI DICTIONARY
  hi: {
    brandName: "मन्न मित्रा",
    brandSubtitle: "सीधा किसान से बाज़ार मंच - SI H26033",
    farmerFPO: "किसान / एफपीओ",
    navHome: "होम",
    navProduce: "मेरी फसलें",
    navForecast: "एआई पूर्वानुमान",
    navOrders: "ऑर्डर",
    navAccount: "किसान प्रोफाइल",
    navMarket: "ताज़ा बाज़ार",
    navMyOrders: "मेरे ऑर्डर और ट्रैकिंग",
    navConsumerProfile: "मेरा पता और प्रोफाइल",
    navLots: "थोक लॉट",
    navBids: "मेरी निविदाएं",
    navBulkOrders: "बी2बी ऑर्डर",
    navCompanyProfile: "कंपनी प्रोफाइल",
    dashboardTitle: "किसान डायरेक्ट कमांड सेंटर",
    dashboardSubtitle: "लाइव फसल स्टॉक, एआई मांग पूर्वानुमान और प्रत्यक्ष उपभोक्ता ऑर्डर",
    myProduce: "मेरी फसलें",
    aiDemandForecast: "एआई मांग पूर्वानुमान",
    tomatoDemand: "टमाटर मांग",
    futureDemand: "भविष्य की मांग",
    forecastHigh: "पूर्वानुमान: उच्च मांग",
    activeOrders: "सक्रिय ऑर्डर",
    prepareBtn: "तैयार करें",
    preparedBadge: "डिस्पैच के लिए तैयार",
    earningsPayments: "आय और भुगतान",
    lastPayoutDetail: "अंतिम भुगतान: 5/2, 2026 - ₹13,05,400",
    viewDetails: "विवरण देखें >",
    totalEarnings: "कुल: ₹15,400",
    produceTitle: "फसल सूची और स्टॉक नियंत्रण",
    addNewProduce: "नई फसल जोड़ें",
    nearestFarmsTitle: "निकटतम किसानों से ताज़ी उपज",
    locationSelectorLabel: "आपका डिलीवरी शहर / क्षेत्र:",
    useGPSBtn: "मेरे वर्तमान स्थान का उपयोग करें",
    closestFirst: "सबसे नज़दीकी खेत पहले ⚡",
    allFarms: "सभी खेत",
    organicOnly: "केवल जैविक 🌿",
    kmAway: "किमी दूर",
    harvestedOn: "कटाई तिथि",
    directToFarmer: "सीधे किसान को भुगतान",
    directPayNotice: "बिना किसी दलाल कमीशन के 100% भुगतान सीधे किसान के बैंक खाते में जाता है।",
    payToFarmerBtn: "सीधे किसान को भुगतान करें",
    paymentSuccessTitle: "किसान को भुगतान प्राप्त हुआ!",
    directCreditMsg: "राशि सीधे किसान रमेश कुमार के स्टेट बैंक ऑफ इंडिया खाते में जमा कर दी गई है।",
    transactionId: "लेन-देन संख्या",
    orderTrackingTitle: "खेत से घर तक लाइव ऑर्डर ट्रैकिंग",
    orderStatus_Placed: "ऑर्डर दिया गया और किसान को भुगतान हुआ",
    orderStatus_Packed: "किसान द्वारा कटाई और पैकिंग पूर्ण",
    orderStatus_Out: "खेत से डिलीवरी के लिए रवाना",
    orderStatus_Delivered: "उपभोक्ता को ताज़ा डिलीवर",
    estimatedArrival: "अनुमानित समय",
    callFarmer: "किसान को कॉल करें",
    farmerBankTitle: "किसान बैंक और भुगतान विवरण",
    bankNameLabel: "बैंक का नाम *",
    accountNumberLabel: "खाता संख्या *",
    ifscLabel: "आईएफएससी कोड *",
    upiIdLabel: "यूपीआई आईडी *",
    farmVillageLabel: "खेत का स्थान / गाँव *",
    chatbotTitle: "मन्न मित्रा एआई और चैट",
    voiceAssistantBtn: "वॉयस असिस्टेंट",
    voiceListening: "सुन रहा हूँ... अपना कृषि प्रश्न बोलें",
    login: "लॉग इन",
    register: "पंजीकरण",
    logout: "लॉग आउट",
    privacyProtected: "गोपनीयता सुरक्षित"
  }
};

// Fallbacks for remaining official languages mapped cleanly
officialLanguages.forEach(lang => {
  if (!translations[lang.code]) {
    translations[lang.code] = {
      ...translations['en'],
      brandName: `${lang.native} - Mann Mithra`,
      navHome: "Home",
      navProduce: "Produce",
      navForecast: "AI Forecast",
      navOrders: "Orders",
      navAccount: "Account",
      navMarket: "Market",
      navMyOrders: "My Orders"
    };
  }
});

let currentLang = 'en';

function t(key) {
  if (translations[currentLang] && translations[currentLang][key]) {
    return translations[currentLang][key];
  }
  if (translations['en'] && translations['en'][key]) {
    return translations['en'][key];
  }
  return key;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('kisan_lang', lang);
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', t(key));
  });

  const langSelect = document.getElementById('langSelect');
  if (langSelect && langSelect.value !== currentLang) {
    langSelect.value = currentLang;
  }

  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
}

const savedLang = localStorage.getItem('kisan_lang');
if (savedLang) {
  currentLang = savedLang;
}
