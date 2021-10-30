# burgerRestAPI

## Install

burgerRestAPI для работы использует `Node.js` и `Mongodb`

Установка burgerRestAPI в Ubuntu 20.04:
```
# apt install nodejs mongodb 
git clone https://github.com/Turbo-Oxid/burgerRestAPI.git
cd burgerRestAPI
npm i
```

## Documentation

`/api/orders` принимает POST-запросы для создания заказа.
Запрос должен выглядеть в JSON формате:
```
{
'id': 1, 
'menuCat': [3], 
'food': [5], 
'client': 'name', 
'phone': '3553535'
}
```
`/api/companies` - GET-запрос для получения списка заведений

`/api/companies/COMPANY_ID` - GET-запрос для получения информации по конкретному заведению

`/api/categories` - GET-запро для получения категорий

`/api/categories/CATEGORY_ID` - GET-запрос для получения информации о категории

`/api/dishes` - GET-запрос для получения списка блюд по категории

`/api/dishes/DISH_ID` - GET-запрос для получения информации о конкретном блюде

`/api/orders/ORDER_ID` - GET-запрос для получения информации о заказе
