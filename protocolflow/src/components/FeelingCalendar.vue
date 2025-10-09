<template>
  <div class="feeling-calendar">
    <div class="calendar-header">
      <div class="calendar-controls">
        <button @click="previousMonth" class="nav-btn">‹</button>
        <span class="month-year">{{ currentMonthName }} {{ currentYear }}</span>
        <button @click="nextMonth" class="nav-btn">›</button>
      </div>
      <div class="month-summary" v-if="monthStats.total > 0">
        <span class="summary-text">{{ monthStats.total }} sessions</span>
        <span class="summary-feeling">{{ getMostCommonFeeling()?.emoji || '😐' }}</span>
      </div>
    </div>

    <div class="calendar-grid">
      <div class="weekday-header">
        <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
      </div>
      
      <div class="calendar-body">
        <div 
          v-for="day in calendarDays" 
          :key="day.date"
          class="calendar-day"
          :class="{ 
            'other-month': !day.isCurrentMonth,
            'today': day.isToday,
            'has-feeling': day.feelings.length > 0
          }"
          @click="showDayDetails(day)"
        >
          <span class="day-number">{{ day.day }}</span>
          <div v-if="day.feelings.length > 0" class="day-feelings">
            <span 
              v-for="(feeling, index) in day.feelings.slice(0, 3)" 
              :key="index"
              class="feeling-dot"
              :style="{ backgroundColor: getFeelingColor(feeling.feelingId) }"
              :title="getFeelingLabel(feeling.feelingId)"
            ></span>
            <span v-if="day.feelings.length > 3" class="more-feelings">+{{ day.feelings.length - 3 }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="feeling-legend">
      <div class="legend-items">
        <div 
          v-for="feeling in visibleFeelingTypes" 
          :key="feeling?.id || 'unknown'"
          class="legend-item"
        >
          <span class="legend-emoji">{{ feeling.emoji }}</span>
          <span class="legend-count">{{ getFeelingCount(feeling.id) }}</span>
        </div>
      </div>
    </div>

    <!-- Day Details Modal -->
    <div v-if="selectedDay" class="day-modal-overlay" @click="closeDayDetails">
      <div class="day-modal" @click.stop>
        <div class="modal-header">
          <h4>{{ formatDate(selectedDay.date) }}</h4>
          <button @click="closeDayDetails" class="close-btn">×</button>
        </div>
        <div class="modal-content">
          <div v-if="selectedDay.feelings.length === 0" class="no-feelings">
            <p>No lab sessions recorded on this day</p>
          </div>
          <div v-else class="day-feelings-list">
            <div 
              v-for="feeling in selectedDay.feelings" 
              :key="feeling.id"
              class="feeling-record"
            >
              <div class="feeling-header">
                <span class="feeling-emoji">{{ getFeelingEmoji(feeling.feelingId) }}</span>
                <span class="feeling-label">{{ getFeelingLabel(feeling.feelingId) }}</span>
                <span class="feeling-time">{{ formatTime(feeling.timestamp) }}</span>
              </div>
              <div class="feeling-details">
                <p class="protocol-title">{{ feeling.protocolTitle }}</p>
                <div class="feeling-meta">
                  <span>Duration: {{ feeling.duration }}min</span>
                  <span>Steps: {{ feeling.stepsCompleted }}</span>
                  <span v-if="feeling.assessmentScore !== undefined">
                    Assessment Score: {{ feeling.assessmentScore }}/28
                  </span>
                </div>
                <div v-if="feeling.stressLevel" class="stress-level-indicator">
                  <span class="stress-badge" :class="getStressBadgeClass(feeling.stressLevel)">
                    {{ feeling.stressLevel }}
                  </span>
                </div>
                <p v-if="feeling.note" class="feeling-note">{{ feeling.note }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FEELING_TYPES, getCalendarData, getRecentFeelings } from '../utils/feelingTracker'

export default {
  name: 'FeelingCalendar',
  data() {
    return {
      currentDate: new Date(),
      selectedDay: null,
      feelingTypes: Object.values(FEELING_TYPES),
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
  },
  computed: {
    currentYear() {
      return this.currentDate.getFullYear()
    },
    
    currentMonth() {
      return this.currentDate.getMonth()
    },
    
    currentMonthName() {
      return this.currentDate.toLocaleDateString('en-US', { month: 'long' })
    },
    
    calendarData() {
      return getCalendarData(this.currentYear, this.currentMonth)
    },
    
    monthStats() {
      const startOfMonth = new Date(this.currentYear, this.currentMonth, 1)
      const endOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0)
      const monthFeelings = getRecentFeelings(365).filter(feeling => {
        const feelingDate = new Date(feeling.timestamp)
        return feelingDate >= startOfMonth && feelingDate <= endOfMonth
      })
      
      const total = monthFeelings.length
      const averageDuration = total > 0 
        ? Math.round(monthFeelings.reduce((sum, f) => sum + f.duration, 0) / total)
        : 0
      
      return { total, averageDuration, feelings: monthFeelings }
    },
    
    calendarDays() {
      const year = this.currentYear
      const month = this.currentMonth
      const firstDay = new Date(year, month, 1)
      const startDate = new Date(firstDay)
      startDate.setDate(startDate.getDate() - firstDay.getDay())
      
      const days = []
      const today = new Date()
      
      for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)
        
        const dayKey = date.getDate()
        const isCurrentMonth = date.getMonth() === month
        const feelings = isCurrentMonth ? (this.calendarData[dayKey] || []) : []
        
        days.push({
          date: date.toISOString().split('T')[0],
          day: date.getDate(),
          isCurrentMonth,
          isToday: date.toDateString() === today.toDateString(),
          feelings
        })
      }
      
      return days
    },
    
    visibleFeelingTypes() {
      return this.feelingTypes.filter(feeling => 
        feeling && feeling.id && this.getFeelingCount(feeling.id) > 0
      )
    }
  },
  
  methods: {
    previousMonth() {
      this.currentDate = new Date(this.currentYear, this.currentMonth - 1, 1)
    },
    
    nextMonth() {
      this.currentDate = new Date(this.currentYear, this.currentMonth + 1, 1)
    },
    
    showDayDetails(day) {
      if (day.feelings.length > 0) {
        this.selectedDay = day
      }
    },
    
    closeDayDetails() {
      this.selectedDay = null
    },
    
    getFeelingColor(feelingId) {
      const feeling = this.feelingTypes.find(f => f.id === feelingId)
      return feeling ? feeling.color : '#6b7280'
    },
    
    getFeelingLabel(feelingId) {
      const feeling = this.feelingTypes.find(f => f.id === feelingId)
      return feeling ? feeling.label : 'Unknown'
    },
    
    getFeelingEmoji(feelingId) {
      const feeling = this.feelingTypes.find(f => f.id === feelingId)
      return feeling ? feeling.emoji : '❓'
    },
    
    getFeelingCount(feelingId) {
      return this.monthStats.feelings.filter(f => f.feelingId === feelingId).length
    },
    
    getMostCommonFeeling() {
      if (this.monthStats.feelings.length === 0) {
        return this.feelingTypes.find(f => f.id === 'neutral') || this.feelingTypes[0]
      }
      
      const counts = {}
      this.monthStats.feelings.forEach(f => {
        counts[f.feelingId] = (counts[f.feelingId] || 0) + 1
      })
      
      if (Object.keys(counts).length === 0) {
        return this.feelingTypes.find(f => f.id === 'neutral') || this.feelingTypes[0]
      }
      
      const mostCommon = Object.entries(counts).reduce((a, b) => 
        counts[a[0]] > counts[b[0]] ? a : b, ['neutral', 0]
      )[0]
      
      return this.feelingTypes.find(f => f.id === mostCommon) || this.feelingTypes[0]
    },
    
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    },
    
    formatTime(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    },
    
    getStressBadgeClass(stressLevel) {
      switch (stressLevel) {
        case 'Low Stress':
          return 'stress-low'
        case 'Moderate Stress':
          return 'stress-moderate'
        case 'High Stress':
          return 'stress-high'
        default:
          return 'stress-unknown'
      }
    }
  }
}
</script>

<style scoped>
.feeling-calendar {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.calendar-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-btn {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #374151;
}

.nav-btn:hover {
  background: #e5e7eb;
}

.month-year {
  font-weight: 600;
  color: #374151;
  min-width: 140px;
  text-align: center;
}

.month-summary {
  display: flex;
  align-items: center;
  gap: 8px;
}

.summary-text {
  font-size: 14px;
  color: #6b7280;
}

.summary-feeling {
  font-size: 18px;
}

.calendar-grid {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.weekday-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #f9fafb;
}

.weekday {
  padding: 12px 8px;
  text-align: center;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
  border-right: 1px solid #e5e7eb;
}

.weekday:last-child {
  border-right: none;
}

.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-day {
  min-height: 80px;
  padding: 8px;
  border-right: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  transition: background-color 0.2s ease;
  position: relative;
}

.calendar-day:nth-child(7n) {
  border-right: none;
}

.calendar-day:hover {
  background: #f9fafb;
}

.calendar-day.other-month {
  color: #9ca3af;
  background: #f9fafb;
}

.calendar-day.today {
  background: #eff6ff;
  border: 2px solid #3b82f6;
}

.calendar-day.has-feeling {
  cursor: pointer;
}

.calendar-day.has-feeling:hover {
  background: #f0f9ff;
}

.day-number {
  font-weight: 600;
  color: #374151;
}

.calendar-day.other-month .day-number {
  color: #9ca3af;
}

.day-feelings {
  display: flex;
  gap: 4px;
  margin-top: 4px;
  flex-wrap: wrap;
}

.feeling-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.more-feelings {
  font-size: 10px;
  color: #6b7280;
  font-weight: 500;
}

.feeling-legend {
  margin-top: 16px;
  text-align: center;
}

.legend-items {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
}

.legend-emoji {
  font-size: 16px;
}

.legend-count {
  font-size: 12px;
  color: #6b7280;
  font-weight: 600;
}

/* Modal styles */
.day-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.day-modal {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h4 {
  margin: 0;
  color: #1f2937;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.close-btn:hover {
  background: #f3f4f6;
}

.modal-content {
  padding: 20px;
  max-height: 60vh;
  overflow-y: auto;
}

.no-feelings {
  text-align: center;
  color: #6b7280;
  padding: 40px 20px;
}

.day-feelings-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feeling-record {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  background: #f9fafb;
}

.feeling-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.feeling-header .feeling-emoji {
  font-size: 20px;
}

.feeling-header .feeling-label {
  font-weight: 600;
  color: #374151;
}

.feeling-time {
  margin-left: auto;
  font-size: 12px;
  color: #6b7280;
}

.protocol-title {
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.feeling-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
}

.feeling-note {
  font-style: italic;
  color: #4b5563;
  margin: 0;
  font-size: 14px;
}

.stress-level-indicator {
  margin: 8px 0;
}

.stress-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stress-badge.stress-low {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.stress-badge.stress-moderate {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fbbf24;
}

.stress-badge.stress-high {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

.stress-badge.stress-unknown {
  background: #f3f4f6;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

@media (max-width: 768px) {
  .feeling-calendar {
    padding: 16px;
  }
  
  .calendar-header {
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }
  
  .calendar-day {
    min-height: 60px;
    padding: 4px;
  }
  
  .legend-items {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .day-modal {
    width: 95%;
    margin: 20px;
  }
}
</style>