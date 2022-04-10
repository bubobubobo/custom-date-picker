import DatePicker from './DatePicker.js';

// datepicker component
class CustomDatePicker extends HTMLElement {
  connectedCallback() {
    let title = document.createElement('h1')
    title.textContent = 'Date Picker'
    this.appendChild(title)
    let datePicker = document.createElement('div')
    datePicker.classList.add('date-picker')
    let selectedDate = document.createElement('div')
    selectedDate.classList.add('selected-date')
    selectedDate.textContent = 'Select Date'
    let calendar = document.createElement('div')
    calendar.classList.add('calendar')
    let calendarNav = document.createElement('div')
    calendarNav.classList.add('calendar-nav')
    let arrowPrev = document.createElement('div')
    arrowPrev.classList.add('arrow')
    arrowPrev.classList.add('prev-month')
    let arrowNext = document.createElement('div')
    arrowNext.classList.add('arrow')
    arrowNext.classList.add('next-month')
    let ym = document.createElement('div')
    ym.classList.add('ym')
    let month = document.createElement('div')
    month.classList.add('month')
    let year = document.createElement('div')
    year.classList.add('year')
    let calendarGrid = document.createElement('div')
    calendarGrid.classList.add('calendar-grid')
    ym.appendChild(month)
    ym.appendChild(year)
    calendarNav.appendChild(arrowPrev)
    calendarNav.appendChild(ym)
    calendarNav.appendChild(arrowNext)
    calendar.appendChild(calendarNav)
    calendar.appendChild(calendarGrid)
    datePicker.appendChild(selectedDate)
    datePicker.appendChild(calendar)
    this.appendChild(datePicker)

    // size attribute로 선언
    const calSize = this.getAttribute('size')
    calendar.style.setProperty('--calendar-size', calSize)
  }
}

customElements.define('date-picker', CustomDatePicker)


document.querySelectorAll('.date-picker').forEach(DatePicker);
