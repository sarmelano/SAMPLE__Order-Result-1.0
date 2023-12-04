let isHidden = false;

showCategories();

document.getElementById('left').addEventListener('click', event => {

  if (event.target.nodeName === 'DIV') {
    hide(['customerForm', 'resultTable']);
    document.forms['myForm'].reset();
    clearErrorMessages();
    deleteThisZone('right');

    const categoryKey = event.target.getAttribute('data-category');
    const categoryProducts = categories[categoryKey].products;
    showProducts(categoryProducts, categoryKey);
  }
});

document.getElementById('center').addEventListener('click', event => {
  if (event.target.nodeName === 'DIV') {
    hide(['customerForm', 'resultTable']);
    document.forms['myForm'].reset();
    clearErrorMessages();

    const productId = event.target.getAttribute('data-product');
    const categoryKey = event.target.getAttribute('data-category');
    const product = categories[categoryKey].products.find(product => product.id == productId);
    let productTobuy = document.getElementById('productChoosed');
    productTobuy.textContent = 'Ваш выбор: ' + product.name + ' ' + product.price + ' ($)';
    showProductDetails(product);
  }
});

document.getElementById('btn').addEventListener('click', function () {
  let form = document.forms['myForm'];
  document.getElementById('resultTable').classList.remove('hidden');//только щас покажи таблицу
  let formData = {
    fullName: form.elements['customer'].value,
    city: form.elements['city'].value,
    postal: form.elements['postal'].value,
    paymentMethod: form.elements['payment'].value,
    amount: form.elements['amount'].value,
    comment: form.elements['comment'].value,
  };
  let fullName = formData.fullName; 
let names = fullName.split(' '); 
if (names.length !== 3 || /^\s*$/.test(names[0]) || /^\s*$/.test(names[1]) || /^\s*$/.test(names[2]) || !/^[\u0400-\u04FF\s]+$/.test(fullName)) {
  names=true;
  validateForm(names); // Передача переменной names в функцию validateForm
  return;
} else {
  names = false;
}

if (Object.values(formData).some(value => value === '')) {
  validateForm(false); // Передача false в случае ошибок в форме
  return;
} else {
  validateForm(false); // Передача false в случае успешной проверки формы
}
  createTable(formData);
});