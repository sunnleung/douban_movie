export default class WeekDate {
  constructor () {
    let now = new Date()
    this.nowYear = now.getFullYear()
    this.nowMonth = now.getMonth()
    this.nowDay = now.getDate()
    this.nowDayWeek = now.getDay()
    this.nowDayWeek = this.nowDayWeek === 0 ? 7 : this.nowDayWeek
  }

  formatDate (date) {
    let month = date.getMonth() + 1
    let dayWeek = date.getDate()
    return month + '月' + dayWeek + '日'
  }

  getWeekStartDate () {
    let weekStartDate = new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayWeek + 1)
    return this.formatDate(weekStartDate)
  }

  getWeekEndDate () {
    let weekEndDate = new Date(this.nowYear, this.nowMonth, this.nowDay + (6 - this.nowDayWeek + 1))
    return this.formatDate(weekEndDate)
  }
}
