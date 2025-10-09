// Feeling Tracker - 情感追踪系统
const STORAGE_KEY = 'protocolflow_feelings'

// 情感类型定义
export const FEELING_TYPES = {
  EXCELLENT: { 
    id: 'excellent', 
    label: 'Excellent', 
    emoji: '😄', 
    color: '#10b981',
    description: 'Feeling great and energetic!'
  },
  GOOD: { 
    id: 'good', 
    label: 'Good', 
    emoji: '😊', 
    color: '#3b82f6',
    description: 'Feeling positive and focused'
  },
  NEUTRAL: { 
    id: 'neutral', 
    label: 'Neutral', 
    emoji: '😐', 
    color: '#6b7280',
    description: 'Feeling okay, nothing special'
  },
  TIRED: { 
    id: 'tired', 
    label: 'Tired', 
    emoji: '😴', 
    color: '#f59e0b',
    description: 'Feeling a bit tired or drained'
  },
  STRESSED: { 
    id: 'stressed', 
    label: 'Stressed', 
    emoji: '😰', 
    color: '#ef4444',
    description: 'Feeling stressed or overwhelmed'
  },
  FRUSTRATED: { 
    id: 'frustrated', 
    label: 'Frustrated', 
    emoji: '😤', 
    color: '#dc2626',
    description: 'Feeling frustrated with the work'
  }
}

// 获取所有情感记录
export function getAllFeelings() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error loading feelings:', error)
    return []
  }
}

// 保存情感记录
export function saveFeelingRecord(feeling) {
  try {
    const feelings = getAllFeelings()
    const newRecord = {
      id: Date.now().toString(),
      feelingId: feeling.id,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      timestamp: new Date().toISOString(),
      protocolTitle: feeling.protocolTitle || 'Unknown Protocol',
      note: feeling.note || '',
      duration: feeling.duration || 0, // 实验持续时间（分钟）
      stepsCompleted: feeling.stepsCompleted || 0
    }
    
    feelings.push(newRecord)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feelings))
    return newRecord
  } catch (error) {
    console.error('Error saving feeling:', error)
    return null
  }
}

// 获取指定日期的情感记录
export function getFeelingsByDate(date) {
  const feelings = getAllFeelings()
  return feelings.filter(feeling => feeling.date === date)
}

// 获取最近N天的情感记录
export function getRecentFeelings(days = 30) {
  const feelings = getAllFeelings()
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)
  
  return feelings.filter(feeling => {
    const feelingDate = new Date(feeling.timestamp)
    return feelingDate >= cutoffDate
  })
}

// 获取情感统计数据
export function getFeelingStats(days = 30) {
  const recentFeelings = getRecentFeelings(days)
  const stats = {}
  
  // 统计各种情感的次数
  Object.values(FEELING_TYPES).forEach(type => {
    stats[type.id] = recentFeelings.filter(f => f.feelingId === type.id).length
  })
  
  // 计算总数和平均值
  const total = recentFeelings.length
  const averageDuration = total > 0 
    ? recentFeelings.reduce((sum, f) => sum + f.duration, 0) / total 
    : 0
  
  return {
    total,
    averageDuration: Math.round(averageDuration),
    distribution: stats,
    mostCommon: Object.entries(stats).reduce((a, b) => stats[a[0]] > stats[b[0]] ? a : b, ['neutral', 0])[0]
  }
}

// 获取日历数据（按月）
export function getCalendarData(year, month) {
  const feelings = getAllFeelings()
  const calendarData = {}
  
  feelings.forEach(feeling => {
    const date = new Date(feeling.timestamp)
    if (date.getFullYear() === year && date.getMonth() === month) {
      const day = date.getDate()
      if (!calendarData[day]) {
        calendarData[day] = []
      }
      calendarData[day].push(feeling)
    }
  })
  
  return calendarData
}

// 删除情感记录
export function deleteFeelingRecord(id) {
  try {
    const feelings = getAllFeelings()
    const filteredFeelings = feelings.filter(feeling => feeling.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredFeelings))
    return true
  } catch (error) {
    console.error('Error deleting feeling:', error)
    return false
  }
}

// 清空所有记录
export function clearAllFeelings() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Error clearing feelings:', error)
    return false
  }
}

// 导出数据
export function exportFeelings() {
  const feelings = getAllFeelings()
  const dataStr = JSON.stringify(feelings, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  
  const link = document.createElement('a')
  link.href = URL.createObjectURL(dataBlob)
  link.download = `protocolflow_feelings_${new Date().toISOString().split('T')[0]}.json`
  link.click()
}

// 导入数据
export function importFeelings(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result)
        if (Array.isArray(importedData)) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(importedData))
          resolve(importedData.length)
        } else {
          reject(new Error('Invalid data format'))
        }
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = () => reject(new Error('File reading failed'))
    reader.readAsText(file)
  })
}