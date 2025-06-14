document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    const successMessage = document.getElementById('successMessage');
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Сброс предыдущих ошибок
        clearErrors();
        
        // Валидация формы
        if (validateForm()) {
            // Получение данных формы
            const formData = getFormData();
            
            // Здесь можно отправить данные на сервер
            // Например, с помощью fetch или AJAX
            
            // В данном примере просто показываем сообщение об успехе
            orderForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Вывод данных в консоль для демонстрации
            console.log('Данные заказа:', formData);
        }
    });
    
    function validateForm() {
        let isValid = true;
        
        // Проверка имени
        const name = document.getElementById('name').value.trim();
        if (name === '') {
            showError('nameError', 'Пожалуйста, введите ваше имя');
            isValid = false;
        }
        
        // Проверка телефона
        const phone = document.getElementById('phone').value.trim();
        if (phone === '') {
            showError('phoneError', 'Пожалуйста, введите ваш телефон');
            isValid = false;
        } else if (!/^[\d\s\-\+\(\)]+$/.test(phone)) {
            showError('phoneError', 'Введите корректный номер телефона');
            isValid = false;
        }
        
        // Проверка email (необязательное поле)
        const email = document.getElementById('email').value.trim();
        if (email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('emailError', 'Введите корректный email');
            isValid = false;
        }
        
        // Проверка товара
        const product = document.getElementById('product').value;
        if (product === '') {
            showError('productError', 'Пожалуйста, выберите товар');
            isValid = false;
        }
        
        // Проверка количества
        const quantity = document.getElementById('quantity').value;
        if (quantity === '' || parseInt(quantity) < 1) {
            showError('quantityError', 'Введите корректное количество');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }
    
    function getFormData() {
        return {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            product: document.getElementById('product').value,
            productText: document.getElementById('product').options[document.getElementById('product').selectedIndex].text,
            quantity: document.getElementById('quantity').value,
            address: document.getElementById('address').value.trim(),
            comments: document.getElementById('comments').value.trim(),
            orderDate: new Date().toISOString()
        };
    }
});