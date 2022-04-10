const DatePicker = $container => {
  const date_picker_element = document.querySelector('.date-picker')
  const selected_date_element = document.querySelector('.date-picker .selected-date')
  const calendar = document.querySelector('.calendar')
  const month_element = document.querySelector('.date-picker .calendar .calendar-nav .ym .month')
  const year_element = document.querySelector('.date-picker .calendar .calendar-nav .ym .year')
  const prev_month_element = document.querySelector('.date-picker .calendar .calendar-nav .prev-month')
  const next_month_element = document.querySelector('.date-picker .calendar .calendar-nav .next-month')
  const calendar_grid_element = document.querySelector('.date-picker .calendar .calendar-grid')

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const dates = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  
  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()
  
  const today = date

  let selectedDate = date
  let selectedDay = day
  let selectedMonth = month
  let selectedYear = year


  // 오늘의 월, 년도 표시
  month_element.textContent = months[month]
  year_element.textContent = year


  // selected_date_element.textContent = formatDate(date)
  populateDates()

  // Event Listeners
  date_picker_element.addEventListener('click', toggleDatePicker);
  prev_month_element.addEventListener('click', goToPrevMonth)
  next_month_element.addEventListener('click', goToNextMonth)


  // Functions
  function toggleDatePicker (e) {
    if (!checkEventPathForClass(e.path, 'calendar')) {
      calendar.classList.toggle('active');
    }
  }

  function goToPrevMonth (e) {
    month--
    if(month < 0) {
      month = 11
      year--
    }
    month_element.textContent = months[month]
    year_element.textContent = year
    // refresh
    populateDates()
  }

  function goToNextMonth (e) {
    month++
    if(month > 11) {
      month = 0
      year++
    }
    month_element.textContent = months[month]
    year_element.textContent = year
    // refresh
    populateDates()
  }


  // 날짜 생성 함수
  function populateDates(e) {
    calendar_grid_element.innerHTML = ''
    let total_days = month == 1 ? 28 : 31 // 이번 달 수
    let total_prev_days = month == 2 ? 28 : 31 // 이전 달 수
    
    // 첫 날의 요일 및 시작 날짜 찾기
    const firstDate = new Date(year + '-' + (month + 1) + '-' + (1))
    const firstDay = firstDate.getDay()
    
    let startingDate = firstDay > 0 ? total_prev_days - (firstDay - 1) : 1
    
    // 마지막 날의 요일 찾기(0 ~ 6 : Sun ~ Sat)
    const lastDate = new Date(year + '-' + (month + 1) + '-' + (total_days))
    const lastDay = lastDate.getDay()
    
    // 전체 표시할 day_element 개수 계산
    let total_elements = total_days
    let prev_cnt = 0
    let curr_cnt = total_days
    let next_cnt = 0

    if (startingDate !== 1){
      total_elements += firstDay
      prev_cnt = firstDay
    }
    if (lastDay !== 6){
      total_elements += (6 - lastDay)    
      next_cnt = (6 - lastDay)
    }

    // 요일 채우기
    for (let i = 0; i < 7; i++) {
      const date_element = document.createElement('div')
      date_element.classList.add('date')
      date_element.textContent = dates[i]

      calendar_grid_element.appendChild(date_element)
    }
    
    // 모든 날짜 채우기(저번달, 이번달, 다음달)
    for (let i = 0; i < total_elements; i++) {
      const day_element = document.createElement('div')
      day_element.classList.add('day')

      if (prev_cnt > 0) {
        day_element.textContent = startingDate + i
        day_element.classList.add('prev-day')
        prev_cnt--
      }
      else if (curr_cnt > 0) {
        day_element.textContent = i - firstDay + 1
        day_element.classList.add('curr-day')
        curr_cnt--
      }
      else if (next_cnt > 0) {
        day_element.textContent = i - firstDay - total_days + 1
        day_element.classList.add('next-day')
        next_cnt--
      }

      // 현재 day_element에 들어있는 날짜
      const day_element_text = day_element.textContent

      // 일요일인 경우 sunday 클래스 추가
      if (day_element.classList.contains('curr-day')) {
        let tmp_date = new Date(year + '-' + (month + 1) + '-' + (day_element_text))
        if (tmp_date.getDay() == 0) {
          day_element.classList.add('sunday')
        }
      }
      
      // 오늘인 경우 today 클래스 추가, 선택한 경우 selected 클래스 추가
      if (day_element.classList.contains('prev-day')) {
        let tmp_month = month > 0 ? month - 1 : 11
        let tmp_year = tmp_month == 11 ? year - 1 : year
        if (day_element_text == today.getDate() && tmp_year == today.getFullYear() && tmp_month == today.getMonth()) {
          day_element.classList.add('today')
        }
        if (selectedDay == day_element_text && selectedYear == tmp_year && selectedMonth == tmp_month) {
          day_element.classList.add('selected')
        }
      }
      else if (day_element.classList.contains('curr-day')) {
        if (day_element_text == today.getDate() && year == today.getFullYear() && month == today.getMonth()) {
          day_element.classList.add('today')
        }
        if (selectedDay == day_element_text && selectedYear == year && selectedMonth == month) {
          day_element.classList.add('selected')
        }
      }
      else if (day_element.classList.contains('next-day')) {
        let tmp_month = (month + 1) % 12
        let tmp_year = tmp_month == 0 ? year + 1 : year
        if (day_element_text == today.getDate() && tmp_year == today.getFullYear() && tmp_month == today.getMonth()) {
          day_element.classList.add('today')
        }
        if (selectedDay == day_element_text && selectedYear == tmp_year && selectedMonth == tmp_month) {
          day_element.classList.add('selected')
        }
      }

      
      // 해당 날짜에 click이벤트 발생하면 변수 바꿔주고 refresh
      day_element.addEventListener('click', function () {
        if (day_element.classList.contains('prev-day')) {
          let tmp_month = month > 0 ? month - 1 : 11
          let tmp_year = tmp_month == 11 ? year - 1 : year
          selectedDate = new Date(tmp_year + '-' + tmp_month + '-' + day_element_text)
          selectedDay = day_element_text
          selectedMonth = tmp_month
          selectedYear = tmp_year
        }
        else if (day_element.classList.contains('curr-day')) {
          selectedDate = new Date(year + '-' + (month + 1) + '-' + day_element_text)
          selectedDay = day_element_text
          selectedMonth = month
          selectedYear = year  
        }
        else if (day_element.classList.contains('next-day')) {
          let tmp_month = (month + 1) % 12
          let tmp_year = tmp_month == 0 ? year + 1 : year
          selectedDate = new Date(tmp_year + '-' + tmp_month + '-' + day_element_text)
          selectedDay = day_element_text
          selectedMonth = tmp_month
          selectedYear = tmp_year
        }

        selected_date_element.classList.add('date-selected')
        selected_date_element.textContent = formatDate(selectedDate)
        selected_date_element.dataset.value = selectedDate
        
        console.log(formatDate(selectedDate))
        populateDates()
      })
      
      // div를 grid에 추가
      calendar_grid_element.appendChild(day_element)
    }
  }
  
  
  // 달력 눌렀을 때 다시 토글되지 않도록 체크 함수
  function checkEventPathForClass (path, selector) {
    for (let i = 0; i < path.length; i++) {
      if (path[i].classList && path[i].classList.contains(selector)) {
        return true;
      }
    }
    return false;
  }

  // 날짜 formatting 함수 : selected-date에 표시할 때 사용
  function formatDate (date) {
    let day = date.getDate()/10 < 1 ? '0' + date.getDate() : date.getDate()
    let month = (date.getMonth() + 1)/10 < 1 ? '0' + (date.getMonth() + 1).toString() : date.getMonth() + 1
    let year = date.getFullYear()
    if (year < 1000 && year >= 100) {
      year = '0' + year.toString()
    }
    else if (year < 100 && year >= 10) {
      year = '0' + '0' + year.toString()
    }
    else if (year < 10 && year >= 0){
      year = '000' + year.toString()
    }

    return year + '-' + month + '-' + day
  }
};

export default DatePicker;