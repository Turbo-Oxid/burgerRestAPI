# burgerRestAPI

## Install

burgerRestAPI для работы использует Node.js и Mongodb

Установка burgerRestAPI в Ubuntu 20.04:
```
# apt install nodejs mongodb 
git clone https://github.com/Turbo-Oxid/burgerRestAPI.git
cd burgerRestAPI
npm i
```

## Documentation

/api/orders принимает POST-запросы для создания заказа.
запрос должен выглядеть в JSON формате:
```
{
'id': 1, 
'menuCat': [3], 
'food': [5], 
'client': 'name', 
'phone': '3553535'
}
```
