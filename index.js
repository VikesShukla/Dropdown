const data = {
  India: {
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Akola"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Ajmer"],
    Karnataka: ["Bengaluru", "Mysuru", "Hubli", "Mangalore"]
  },
  USA: {
    California: ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
    Texas: ["Houston", "Dallas", "Austin", "San Antonio"],
    Florida: ["Miami", "Orlando", "Tampa", "Tallahassee"],
    NewYork: ["New York City", "Buffalo", "Rochester", "Albany"]
  },
  Canada: {
    Ontario: ["Toronto", "Ottawa", "Mississauga", "Brampton"],
    Alberta: ["Calgary", "Edmonton", "Red Deer", "Lethbridge"],
    BritishColumbia: ["Vancouver", "Victoria", "Richmond", "Kelowna"],
    Quebec: ["Montreal", "Quebec City", "Laval", "Gatineau"]
  },
  Australia: {
    NewSouthWales: ["Sydney", "Newcastle", "Wollongong", "Dubbo"],
    Victoria: ["Melbourne", "Geelong", "Ballarat", "Bendigo"],
    Queensland: ["Brisbane", "Gold Coast", "Cairns", "Toowoomba"],
    WesternAustralia: ["Perth", "Fremantle", "Bunbury", "Broome"]
  },
  UK: {
    England: ["London", "Manchester", "Birmingham", "Liverpool"],
    Scotland: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee"],
    Wales: ["Cardiff", "Swansea", "Newport", "Wrexham"],
    NorthernIreland: ["Belfast", "Derry", "Lisburn", "Newtownabbey"]
  },
  Bangladesh: {
    Dhaka: ["Dhaka", "Chittagong", "Khulna", "Rajshahi"],
    Chittagong: ["Cox's Bazar", "Bandarban", "Rangamati", "Fatikchhari"],
    Khulna: ["Jessore", "Satkhira", "Bagerhat", "Magura"],
    Rajshahi: ["Bogura", "Naogaon", "Joypurhat", "Natore"]
  },
};


const countrySelect = document.getElementById('country');
const stateSelect = document.getElementById('state');
const citySelect = document.getElementById('city');

window.onload = function() {
  Object.keys(data).forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    option.text = country;
    countrySelect.add(option);
  });
};

countrySelect.onchange = function() {
  stateSelect.innerHTML = '<option value="">--Select State--</option>';
  citySelect.innerHTML = '<option value="">--Select City--</option>';
  citySelect.disabled = true;

  if (this.value === '') {
    stateSelect.disabled = true;
    return;
  }

  stateSelect.disabled = false;
  const states = Object.keys(data[this.value]);
  states.forEach(state => {
    const option = document.createElement('option');
    option.value = state;
    option.text = state;
    stateSelect.add(option);
  });
};

stateSelect.onchange = function() {
  citySelect.innerHTML = '<option value="">--Select City--</option>';

  if (this.value === '') {
    citySelect.disabled = true;
    return;
  }

  citySelect.disabled = false;
  const cities = data[countrySelect.value][this.value];
  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.text = city;
    citySelect.add(option);
  });
};

document.getElementById('locationForm').onsubmit = function(e) {
  e.preventDefault();
  if (!countrySelect.value || !stateSelect.value || !citySelect.value) {
    alert("Please select country, state, and city.");
  } else {
    alert(`Selected: ${countrySelect.value} > ${stateSelect.value} > ${citySelect.value}`);
  }
};
// ...existing code...

document.getElementById('locationForm').onsubmit = function(e) {
  e.preventDefault();
  if (!countrySelect.value || !stateSelect.value || !citySelect.value) {
    alert("Please select country, state, and city.");
    return;
  }

  // Show modal
  const modal = document.getElementById('locationModal');
  const modalLocation = document.getElementById('modalLocation');
  const modalMap = document.getElementById('modalMap');
  modalLocation.textContent = `${countrySelect.value} > ${stateSelect.value} > ${citySelect.value}`;

  // Embed Google Maps for the selected city
  const mapQuery = encodeURIComponent(`${citySelect.value}, ${stateSelect.value}, ${countrySelect.value}`);
  modalMap.innerHTML = `<iframe width="300" height="200" style="border:0" loading="lazy"
    src="https://www.google.com/maps?q=${mapQuery}&output=embed"></iframe>`;

  modal.style.display = "flex";
};

// Close modal on click
document.getElementById('closeModal').onclick = function() {
  document.getElementById('locationModal').style.display = "none";
};

// Optional: Close modal when clicking outside the modal content
document.getElementById('locationModal').onclick = function(e) {
  if (e.target === this) {
    this.style.display = "none";
  }
};
// ...existing code...
