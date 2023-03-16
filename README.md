# HomeWork 
## Проекты из домашней работы по программированию
### Преподаватель: _Игорь Сергеевич Коровченко_
### Ученик: _Волкодавов Владислав Владимирович_

## 1. - Консольный интерфейс для вывода графика функции (pseudographics)
### Задача
> Необходимо сформировать адекватный пользовательский интерфейс, в котором графики функций можно будет смотреть удобно:
>- Показать минимумы и максимумы по осям;
>- Нарисовать рамку с метками для вывода графика с осями координат (двумерный график).

### Что получилось
[![pseudo](https://raw.githubusercontent.com/erida34/HomeWork/main/assets/pseudo.jpg "pseudo")](https://raw.githubusercontent.com/erida34/HomeWork/main/assets/pseudo.jpg "pseudo")
### 🐳 Docker
Через локальную сеть:
* Переходим в папку с проектом `cd pseudographics/`
* Создаём образ `sudo docker build -t pseudo .`
* Запускаем `sudo docker run -it pseudo`

Через DockerHub:
* Получаем образ `sudo docker pull erida34/pseudographics`
* Запускаем `sudo docker run -it erida34/pseudographics`


## 2. - Форматированный вывод (format_output)
### Задача
> В рамках задания необходимо разобраться с форматированным выводом строк в консоль. В качестве ответа на задание нужно вывести на экран таблицу умножения в виде таблицы, как на картинке.
>[![format](https://raw.githubusercontent.com/erida34/HomeWork/main/assets/multiplication-table.jpg "format")](https://raw.githubusercontent.com/erida34/HomeWork/main/assets/multiplication-table.jpg "format")

### Что получилось
[![format](https://raw.githubusercontent.com/erida34/HomeWork/main/assets/format.jpg "format")](https://raw.githubusercontent.com/erida34/HomeWork/main/assets/format.jpg "format")
### 🐳 Docker
Через локальную сеть:
* Переходим в папку с проектом `cd format_output/`
* Создаём образ `sudo docker build -t format .`
* Запускаем `sudo docker run -it format`

Через DockerHub:
* Получаем образ `sudo docker pull erida34/format_output`
* Запускаем `sudo docker run -it erida34/format_output`

## 2.5 - Улучшение консольного интерфейса
### Задача
> А что если объеденить форматированный вывод и консольный интерфейс?

### Что получилось
[![plotter](https://raw.githubusercontent.com/erida34/HomeWork/main/assets/plotter.jpg "plotter")](https://raw.githubusercontent.com/erida34/HomeWork/main/assets/plotter.jpg "plotter")
### 🐳 Docker
Через локальную сеть:
* Переходим в папку с проектом `cd plotter/`
* Создаём образ `sudo docker build -t plotter .`
* Запускаем `sudo docker run -it plotter`

Через DockerHub:
* Получаем образ `sudo docker pull erida34/plotter`
* Запускаем `sudo docker run -it erida34/plotter`
