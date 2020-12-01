// // синтаксис 1
// let regexp = new RegExp('само регулярное выражение', флаги)

// // синтаксис 2
// let regexp = /рег. выражение/флаги

// // флаги
// i - поиск без учета регистра
// g - множественный поиск
// m - многострочный поиск

let str = "Язык JavaScript называется из-за популярносты языка Java"
let regexp = new RegExp('java', 'i')
    // console.log(regexp.test(str))

// string methods
// search
// 1- вхождение не найдено
// Возвращает индекс первого вхождения
// не учитывает флаг g
// console.log(str.search(regexp))

//match - возвращает массив объект с подробной информацией
// console.log(str.match(/java/ig))

// замены в строках
// console.log('+7 (000)000-00-00'.replace('-', ':')) одна замена
// console.log('+7 (000)000-00-00'.replace(/-/g, ':')) замена везде

// let str2 = "Petrov Иван"
// console.log(str2.replace(/([a-z]+) ([a-zа-яё]+)/i, 'Привет $1 $2'))

// Классы в регулярных выражениях
// \d, [0123456789], [0-9] - одно и то же
// \w - [a-z0-9]  \W -дает все символы кроме этих
// \s - space, tab, \n
// [а-яА-яЁё] - кириллица
// \D - все кроме цифр

// console.log('+7 (000)000-00-00'.match(/\d+/g))
// console.log('+7 (000)000-00-00'.match(/\d+/g).join(' '))

// console.log('colr colour'.match(/colo[u]r/g))

// Граница слова
// console.log('Язык Java Script'.match(/\bjava\b/i))

// console.log('язык Java'.match(/^java/i))

// test@mail.ru

console.log("test@mail.ru".match(/[a-zа-яё0-9._-]+@[a-z0-9-_]+\.[a-zа-я]{2,4}$/iu))