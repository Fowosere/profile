
// Profile data storage
const profiles = {
  'default': {
    name: 'John Doe',
    title: 'Product Manager',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    address: '123 Tech Street, San Francisco, CA',
    website: 'example.com',
    initials: 'JD',
    avatarUrl: ''
  },
  // Example additional profiles that would be loaded when specific NFC tags are detected
  'nfc-id-1': {
    name: 'Jane Smith',
    title: 'UX Designer',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    location: 'Seattle, WA',
    address: '456 Design Avenue, Seattle, WA',
    website: 'janesmith.design',
    initials: 'JS',
    avatarUrl: ''
  },
  'nfc-id-2': {
    name: 'Mark Johnson',
    title: 'Software Engineer',
    email: 'mark.johnson@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Boston, MA',
    address: '789 Code Road, Boston, MA',
    website: 'markjohnson.dev',
    initials: 'MJ',
    avatarUrl: ''
  }
  ,
  'nfc-id-3': {
    name: 'Craig King',
    title: '',
    email: 'craig.king@Traffordcentre.com',
    phone: '+447974039529',
    location: 'Manchester, United Kingdom',
    address: 'Business Management Suite, Barton Dock Road, M17 8AA',
    website: '',
    initials: 'CK',
    avatarUrl: ''
  }

  ,
  'nfc-id-4': {
    name: 'Joseph Popoola',
    title: 'Security Officer/Tech Enthusiast',
    email: 'popcyquote@gmail.com',
    phone: '+447882225280',
    location: 'Manchester, United Kingdom',
    address: 'Business Management Suite, Barton Dock Road, M17 8AA',
    website: 'N/A',
    initials: 'JP',
    avatarUrl: 'me.JPEG'
  }
};

// Event tracking storage
let nfcEvents = [];

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');


// Load events from localStorage if available
document.addEventListener('DOMContentLoaded', function () {
  // Load the user profile
  if (userId) {
    loadProfile(userId);
  } else {
    loadProfile('nfc-id-4');
  }

  // loadProfile('nfc-id-2');
  // loadEventsFromStorage();
});

// Handle profile image upload
// document.getElementById('profile-image-upload').addEventListener('change', function (event) {
//   const file = event.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       const avatarImage = document.getElementById('avatar-image');
//       avatarImage.src = e.target.result;
//       avatarImage.classList.remove('hidden');
//       document.getElementById('avatar-initials').classList.add('hidden');

//       // Store avatar URL in current profile
//       const currentProfileId = localStorage.getItem('currentProfile') || 'default';
//       if (profiles[currentProfileId]) {
//         profiles[currentProfileId].avatarUrl = e.target.result;
//         saveProfilesToStorage();
//       }
//     };
//     reader.readAsDataURL(file);
//   }
// });

// Toast notification function
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}


// update email
function updateEmailLink(emailAddress) {
  const emailAction = document.getElementById('email');
  emailAction.href = `mailto:${emailAddress}`;
  emailAction.onclick = function () {
    window.location.href = `mailto:${emailAddress}`;
  };
}

//update tel 
function updatePhoneLink(phone) {
  const phoneAction = document.getElementById('phone');
  phoneAction.href = `tel:${phone}`;
  phoneAction.onclick = function () {
    window.location.href = `tel:${phone}`;
  };
}

//update sms
function updateSmsLink(phone) {
  const smsAction = document.getElementById('sms');
  smsAction.href = `sms:${phone}`;
  smsAction.onclick = function () {
    window.location.href = `sms:${phone}?body=Hello%20There!`;
  };
}

//video
// function updateVideoLink(phone) {
//   const videoAction = document.getElementById('video');
//   videoAction.href = `sms:${phone}`;
//   videoAction.onclick = function () {
//     window.location.href = `tel:${phone}`;
//   };
// }


//Address
function updateMapLink(address) {
  const videoAction = document.getElementById('address');
  // videoAction.href = `sms:${phone}`;
  videoAction.onclick = function () {
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`);
  };
}


// Load profile data into the UI
function loadProfile(profileId) {
  const profile = profiles[profileId] || profiles['default'];

  // Update profile UI elements
  document.querySelector('.profile-name').textContent = profile.name;
  document.querySelector('.profile-title').textContent = profile.title;
  document.querySelector('.profile-email').textContent = profile.email;
  document.querySelector('.profile-location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${profile.location}`;

  // update contact-actions
 
  updateEmailLink(profile.email);
  updatePhoneLink(profile.phone);
  updateSmsLink(profile.phone);
  // updateVideoLink(profile.phone);
  updateMapLink(profile.address);



  // Update contact details
  const detailItems = document.querySelectorAll('.detail-item');
  detailItems[0].querySelector('span').textContent = profile.phone;
  detailItems[1].querySelector('span').textContent = profile.email;
  detailItems[2].querySelector('span').textContent = profile.address;
  detailItems[3].querySelector('a').textContent = profile.website;
  detailItems[3].querySelector('a').href = `https://${profile.website}` ;
  // detailItems[3].querySelector('a').href = `mailto:${profile.email}`;



  // Update avatar
  const avatarInitials = document.getElementById('avatar-initials');
  const avatarImage = document.getElementById('avatar-image');

  avatarInitials.textContent = profile.initials;

  if (profile.avatarUrl) {
    avatarImage.src = profile.avatarUrl;
    avatarImage.classList.remove('hidden');
    avatarInitials.classList.add('hidden');
  } else {
    avatarImage.classList.add('hidden');
    avatarInitials.classList.remove('hidden');
  }

  // Store current profile
  localStorage.setItem('currentProfile', profileId);

  // Add event for profile load
  trackEvent('profile_loaded', { profileId });
}

// Event tracking function
function trackEvent(eventType, eventData = {}) {
  const event = {
    type: eventType,
    timestamp: new Date().toISOString(),
    data: eventData
  };

  // Add to events array
  nfcEvents.push(event);

  // Save to localStorage
  saveEventsToStorage();

  console.log('Event tracked:', event);
  return event;
}

// Save events to localStorage
function saveEventsToStorage() {
  try {
    localStorage.setItem('nfcEvents', JSON.stringify(nfcEvents));
  } catch (error) {
    console.error('Failed to save events to storage:', error);
  }
}

// Load events from localStorage
function loadEventsFromStorage() {
  try {
    const storedEvents = localStorage.getItem('nfcEvents');
    if (storedEvents) {
      nfcEvents = JSON.parse(storedEvents);
      console.log('Loaded events from storage:', nfcEvents.length);
    }

    // Load profiles from storage if available
    const storedProfiles = localStorage.getItem('profiles');
    if (storedProfiles) {
      const loadedProfiles = JSON.parse(storedProfiles);
      // Merge with default profiles to ensure we have all required properties
      Object.keys(loadedProfiles).forEach(key => {
        profiles[key] = { ...profiles[key], ...loadedProfiles[key] };
      });
    }

    // Load current profile
    const currentProfileId = localStorage.getItem('currentProfile') || 'default';
    loadProfile(currentProfileId);

  } catch (error) {
    console.error('Failed to load from storage:', error);
  }
}

// Save profiles to localStorage
function saveProfilesToStorage() {
  try {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  } catch (error) {
    console.error('Failed to save profiles to storage:', error);
  }
}

// Optional: NFC detection if browser supports it
// document.addEventListener('DOMContentLoaded', function () {
//   // Check if Web NFC API is available (Chrome on Android with flag enabled)
//   if ('NDEFReader' in window) {
//     console.log('Web NFC API is supported.');

//     // Create a history section for events
//     createEventHistoryUI();

//     // Add a button or mechanism to activate NFC reading (required by browsers)
//     const scanButton = document.createElement('button');
//     scanButton.textContent = 'Scan NFC';
//     scanButton.className = 'nfc-scan-button';
//     scanButton.style.position = 'fixed';
//     scanButton.style.bottom = '20px';
//     scanButton.style.right = '20px';
//     scanButton.style.padding = '10px 15px';
//     scanButton.style.backgroundColor = '#9b87f5';
//     scanButton.style.color = 'white';
//     scanButton.style.border = 'none';
//     scanButton.style.borderRadius = '5px';
//     scanButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
//     document.body.appendChild(scanButton);

//     scanButton.addEventListener('click', async () => {
//       try {
//         const ndef = new NDEFReader();
//         await ndef.scan();
//         console.log("Scan started successfully.");
//         showToast("NFC scanning activated. Tap an NFC card.");

//         ndef.addEventListener("reading", ({ message, serialNumber }) => {
//           console.log(`> Serial Number: ${serialNumber}`);
//           console.log(`> Records: (${message.records.length})`);

//           // Track the NFC scan event
//           trackEvent('nfc_scan', { serialNumber, recordCount: message.records.length });

//           // Profile switching based on NFC serial number
//           if (profiles[serialNumber]) {
//             loadProfile(serialNumber);
//             showToast(`Loaded profile: ${profiles[serialNumber].name}`);
//           } else {
//             // If we don't have a profile for this NFC, create one
//             profiles[serialNumber] = { ...profiles['default'] };
//             saveProfilesToStorage();
//             loadProfile('default');
//             showToast("Unknown NFC card detected. Using default profile.");
//           }
//         });

//       } catch (error) {
//         console.log("Scanning failed: ", error);
//         trackEvent('nfc_error', { error: error.toString() });
//         showToast("NFC scanning failed. Try again.");
//       }
//     });
//   } else {
//     console.log('Web NFC API is not supported in this browser.');
//     // NFC not supported, add a notice in the UI
//     const notice = document.createElement('div');
//     notice.textContent = 'NFC not supported in this browser. For full functionality, please use Chrome on Android.';
//     notice.style.padding = '10px';
//     notice.style.backgroundColor = '#ffe0e0';
//     notice.style.color = '#d00';
//     notice.style.textAlign = 'center';
//     notice.style.fontSize = '12px';
//     document.body.prepend(notice);

//     // Add a button to simulate NFC scans for testing
//     const simulateButton = document.createElement('button');
//     simulateButton.textContent = 'Simulate NFC';
//     simulateButton.className = 'nfc-scan-button';
//     simulateButton.style.position = 'fixed';
//     simulateButton.style.bottom = '20px';
//     simulateButton.style.right = '20px';
//     simulateButton.style.padding = '10px 15px';
//     simulateButton.style.backgroundColor = '#9b87f5';
//     simulateButton.style.color = 'white';
//     simulateButton.style.border = 'none';
//     simulateButton.style.borderRadius = '5px';
//     simulateButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
//     document.body.appendChild(simulateButton);

//     simulateButton.addEventListener('click', () => {
//       // Create a dropdown to select which profile to load
//       const profileSelect = document.createElement('select');
//       profileSelect.style.position = 'fixed';
//       profileSelect.style.bottom = '60px';
//       profileSelect.style.right = '20px';
//       profileSelect.style.padding = '8px';
//       profileSelect.style.borderRadius = '4px';
//       profileSelect.style.border = '1px solid #ccc';

//       Object.keys(profiles).forEach(key => {
//         const option = document.createElement('option');
//         option.value = key;
//         option.textContent = profiles[key].name;
//         profileSelect.appendChild(option);
//       });

//       document.body.appendChild(profileSelect);

//       profileSelect.addEventListener('change', () => {
//         const selectedProfileId = profileSelect.value;
//         loadProfile(selectedProfileId);
//         trackEvent('simulated_nfc_scan', { profileId: selectedProfileId });
//         showToast(`Simulated NFC: Loaded profile for ${profiles[selectedProfileId].name}`);
//       });

//       // Remove the select after 5 seconds
//       setTimeout(() => {
//         if (document.body.contains(profileSelect)) {
//           document.body.removeChild(profileSelect);
//         }
//       }, 5000);
//     });
//   }
// });

// Create an event history UI section
function createEventHistoryUI() {
  const container = document.querySelector('.container');

  // Create event history section
  const historySection = document.createElement('div');
  historySection.className = 'event-history';
  historySection.style.marginTop = '30px';
  historySection.style.padding = '15px';
  historySection.style.backgroundColor = '#f5f5f5';
  historySection.style.borderRadius = '8px';

  const historyTitle = document.createElement('h2');
  historyTitle.textContent = 'NFC Event History';
  historyTitle.style.fontSize = '18px';
  historyTitle.style.marginBottom = '10px';

  const historyList = document.createElement('div');
  historyList.id = 'event-list';
  historyList.style.maxHeight = '200px';
  historyList.style.overflowY = 'auto';

  // Add clear button
  const clearButton = document.createElement('button');
  clearButton.textContent = 'Clear History';
  clearButton.style.padding = '5px 10px';
  clearButton.style.fontSize = '12px';
  clearButton.style.backgroundColor = '#e0e0e0';
  clearButton.style.border = 'none';
  clearButton.style.borderRadius = '4px';
  clearButton.style.cursor = 'pointer';
  clearButton.style.marginTop = '10px';

  clearButton.addEventListener('click', () => {
    nfcEvents = [];
    saveEventsToStorage();
    updateEventHistoryUI();
    showToast('Event history cleared');
  });

  historySection.appendChild(historyTitle);
  historySection.appendChild(historyList);
  historySection.appendChild(clearButton);

  container.appendChild(historySection);

  // Update the UI with any existing events
  updateEventHistoryUI();

  // Set interval to periodically update the UI (in case events are added from other sources)
  setInterval(updateEventHistoryUI, 30000);
}

// Update the event history UI with current events
function updateEventHistoryUI() {
  const eventList = document.getElementById('event-list');
  if (!eventList) return;

  eventList.innerHTML = '';

  if (nfcEvents.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No events recorded yet.';
    emptyMessage.style.fontStyle = 'italic';
    emptyMessage.style.color = '#888';
    eventList.appendChild(emptyMessage);
    return;
  }

  // Display the most recent 10 events
  const recentEvents = [...nfcEvents].reverse().slice(0, 10);

  recentEvents.forEach(event => {
    const eventItem = document.createElement('div');
    eventItem.className = 'event-item';
    eventItem.style.padding = '8px';
    eventItem.style.borderBottom = '1px solid #ddd';
    eventItem.style.fontSize = '14px';

    const eventTime = new Date(event.timestamp).toLocaleTimeString();
    const eventDate = new Date(event.timestamp).toLocaleDateString();

    let eventText = `[${eventDate} ${eventTime}] ${event.type}`;

    if (event.data.profileId) {
      const profile = profiles[event.data.profileId];
      if (profile) {
        eventText += `: ${profile.name}`;
      } else {
        eventText += `: ${event.data.profileId}`;
      }
    } else if (event.data.serialNumber) {
      eventText += `: ${event.data.serialNumber}`;
    }

    eventItem.textContent = eventText;
    eventList.appendChild(eventItem);
  });
}
