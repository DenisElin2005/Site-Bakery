document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    const productSelect = document.getElementById('product');
    const quantityInput = document.getElementById('quantity');
    
    // Динамическое обновление информации о заказе
    function updateOrderSummary() {
        const product = productSelect.options[productSelect.selectedIndex].text;
        const quantity = quantityInput.value;
        console.log(`Выбрано: ${product} (${quantity} шт.)`);
    }
    
    // Обработчик изменения товара или количества
    productSelect.addEventListener('change', updateOrderSummary);
    quantityInput.addEventListener('input', updateOrderSummary);
    
    // Валидация формы перед отправкой
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Проверка валидности формы
        if (!orderForm.checkValidity()) {
            alert('Пожалуйста, заполните все обязательные поля корректно!');
            return;
        }
        
        // Сбор данных формы
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            product: productSelect.value,
            productName: productSelect.options[productSelect.selectedIndex].text,
            quantity: quantityInput.value,
            comments: document.getElementById('comments').value.trim(),
            date: new Date().toLocaleString()
        };
        
        // Сохранение заказа в localStorage
        saveOrderToLocalStorage(formData);
        
        // Вывод подтверждения
        showOrderConfirmation(formData);
        
        // Очистка формы (опционально)
        orderForm.reset();
    });
    
    // Сохранение заказа в localStorage
    function saveOrderToLocalStorage(orderData) {
        let orders = JSON.parse(localStorage.getItem('caramelFantasyOrders')) || [];
        orders.push(orderData);
        localStorage.setItem('caramelFantasyOrders', JSON.stringify(orders));
    }
    
    // Показ подтверждения заказа
    function showOrderConfirmation(orderData) {
        const confirmation = `
            <div class="confirmation">
                <h3>Спасибо за заказ, ${orderData.name}!</h3>
                <p>Вы заказали: ${orderData.productName} (${orderData.quantity} шт.)</p>
                <p>Мы свяжемся с вами по email: ${orderData.email}</p>
                <p>Ваш комментарий: ${orderData.comments || '—'}</p>
                <button onclick="this.parentElement.remove()">OK</button>
            </div>
        `;
        
        const confirmationDiv = document.createElement('div');
        confirmationDiv.innerHTML = confirmation;
        confirmationDiv.style.position = 'fixed';
        confirmationDiv.style.top = '50%';
        confirmationDiv.style.left = '50%';
        confirmationDiv.style.transform = 'translate(-50%, -50%)';
        confirmationDiv.style.padding = '20px';
        confirmationDiv.style.background = 'white';
        confirmationDiv.style.border = '2px solid #ffaa00';
        confirmationDiv.style.borderRadius = '10px';
        confirmationDiv.style.zIndex = '1000';
        
        document.body.appendChild(confirmationDiv);
    }
    
    // Инициализация при загрузке
    updateOrderSummary();
});