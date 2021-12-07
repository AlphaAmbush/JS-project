const main = document.getElementById('main');
const addUser = document.getElementById('add_user');
const double = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionairs');
const sort = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const resetBtn = document.getElementById('reset');

let data = [];
let anotherData =[];
let countOfMillioner = 1;

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}


function showMillionaires() {
  if(countOfMillioner%2!=0){
    anotherData = data;
    data = data.filter((user) => user.money > 1000000);
    showMillionairesBtn.innerHTML ="Show everyone"
  }else{
    data = anotherData;
    showMillionairesBtn.innerHTML ="Show only Millionairs &#x20B9"
  }
  countOfMillioner++;
  updateDOM();
}


function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  var wealthEl = document.getElementById('wealthEl');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}


function updateDOM(providedData = data) {

  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}


function formatMoney(number) {
  return '₹' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // 12,345.67
}

function reset(){
  data = [];
  anotherData =[];
  countOfMillioner = 1;
  updateDOM();
}

addUser.addEventListener('click', getRandomUser);
double.addEventListener('click', doubleMoney);
sort.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
resetBtn.addEventListener('click', reset);


