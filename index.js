const data = {
  India: {
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Gujarat: ["Ahmedabad", "Surat"]
  },
  USA: {
    California: ["Los Angeles", "San Francisco"],
    Texas: ["Houston", "Dallas"]
  }
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
