# DATA_PRIME_Test_Task
Тестовое задание для компании "Data Prime". Компонент задачи для "туду-листа", в котором пользователь может ввести текст задачи, а затем двойной слэш и комментарий. Двойной слэш как маркер комментария автоматически стилизуется, а значения задачи и комментария распознаются для записи в соответствующие поля хранилища. Ширина полей для ввода автотически меняется.

A test task for a job at Data Prime. A task component for a Todo List app, where the user can enter task text, then a double slash and comment text. The double slash automatically gets highlighted. Task and comment text values get parsed to be properly stored. The width of the input fields is dynamical.

[GitHub Pages](https://vitalytikhonov.github.io/DATA_PRIME_Test_Task/)

[Техническое задание // Customer's Task](https://everythink.ru/frontend-test.mp4)

#### Используемые технологии // Technologies Used
- React.js (CRA)
- HTML
- SCSS

#### Реализация и перспективы // Implementation Details and Possible Improvement
Реализован парсинг вводимого текста, на основе которого происходит подмена фрагмента "//" на span и перенос фокуса во второй input (или textarea), а также возврат фокуса в первое поле, если пользователь удаляет значение во втором клавишей Backspace.
Реализована анимация распознавания "//".
Доработка проекта предполагает
- Реализацию расширения поля комментария, если пользователь вводит текста более чем на одну строку. (Подобное расширение было бы несложно сделать просто с помощью textarea, но ТЗ предполагает, что вторая строка комментария должна начинаться непосредственно от левого края карточки задачи. То есть, необходимо сделать разделение textarea на два элемента с динамическим отслеживанием ширины первой строки.)
- Приближение анимированных эффектов к ТЗ.

I implemented parsing of the entered text enabling the substitution of "//" with a span and shift of focus to the second input/textarea, as well as return of focus to the first input if the user deletes the value in the second one by pressing Backspace.
I also animated the // recognition.
Possible improvement of the project implies:
- Expansion of the comment field onto more than one line if the user enters enough text. (It could be more easily achieved with a textarea, but for the fact that the customer's task requires the second line to start right at the left edge of the task card. It means, the textarea should be again separated into two elements with dynamical detection of the width of the first line of text.)
- A more accurate implementation of the animations as per the task.
