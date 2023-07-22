// Получаем дом элементы
const createBtn = document.querySelector('#create');
const listContainer = document.querySelector('.list-container');
const chekBtn = document.querySelectorAll('.psevdochek');
const delBtn = document.querySelectorAll('.del');
const mainInput = document.querySelector('#mainInput');
// Массив из задач
let tasks = [];

if(localStorage.getItem('Tasks')) {
	// Если есть локальные данные, то загружаем их
	tasks = JSON.parse( localStorage.getItem("Tasks"));
}

tasks.forEach(task => {
	listContainer.insertAdjacentHTML('beforeend', `
	<div id="${task.id}" class="list-element">
		<span>${task.text}</span>
		<div class="controls">
			<div id="${task.id + 1}" class="psevdochek"></div>
			<button class="del">Удалить</button>
		</div>
	</div>
	`)
	if(task.done == true) {
		document.getElementById(`${task.id}`).classList.add('complited-span')
		document.getElementById(`${task.id + 1}`).classList.add('complited')
	}
});
// При клике на чекбокс появляется галочка
listContainer.addEventListener('click', (e)=> {
	if(e.target.classList.contains('psevdochek')) {
		e.target.classList.toggle('complited')
		const parentNode = e.target.closest('.list-element')
// Определяем ID
		const id = Number(parentNode.id);
//
		const task = tasks.find(function(task) {
			if(task.id==id){
				return true
		}})
		task.done = !task.done
		localSave(tasks);
		parentNode.classList.toggle('complited-span')
	} 
})
// Обработчик удаление элемента списка
listContainer.addEventListener('click', (e)=> {
	if(e.target.classList.contains('del')) {
		const parentNode = e.target.closest('.list-element')
		// Определяем ID
		const id = Number(parentNode.id);
		// Находим индек задачи в массиве;
		tasks = tasks.filter(tasks => tasks.id !== id);

		
		localSave(tasks);
		parentNode.remove();
	}
})
// Создание элемента списка при клике на кнопку
createBtn.addEventListener('click', printlistElements);

// Функция создающая элемент списка
function printlistElements() {
	let taskText = mainInput.value;

	const newTask = {
		id: Date.now(),
		text: taskText,
		done: false
	};

	tasks.push(newTask); 
// Код list элемента
	listContainer.insertAdjacentHTML('beforeend', `
	<div id="${newTask.id}" class="list-element">
		<span>${newTask.text}</span>
		<div class="controls">
			<div id="${newTask.id + 1}" class="psevdochek"></div>
			<button class="del">Удалить</button>
		</div>
	</div>
	`)
// Фокус на поле ввода
	document.getElementById('mainInput').focus();
// Сохранение в локальное хранилище
	localSave(tasks);
// Очистка поля ввода 
	mainInput.value='';
}

function localSave(task) {
	localStorage.setItem(`Tasks`, `${JSON.stringify(tasks)}`)
	console.log(task)
}