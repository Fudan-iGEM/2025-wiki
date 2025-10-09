<template>
  <div class="mh">
    <div class="header">
      <h2>Lab Stress Assessment</h2>
      <p class="subtitle">Rate how you've felt during the past week in your lab work</p>
    </div>

    <div v-if="!showResults" class="assessment-form">
      <div class="scale-guide">
        <div class="scale-item">
          <span class="scale-number">0</span>
          <span class="scale-label">Never</span>
        </div>
        <div class="scale-item">
          <span class="scale-number">1</span>
          <span class="scale-label">Rarely</span>
        </div>
        <div class="scale-item">
          <span class="scale-number">2</span>
          <span class="scale-label">Sometimes</span>
        </div>
        <div class="scale-item">
          <span class="scale-number">3</span>
          <span class="scale-label">Often</span>
        </div>
        <div class="scale-item">
          <span class="scale-number">4</span>
          <span class="scale-label">Always</span>
        </div>
      </div>

      <div class="questions">
        <div 
          v-for="(question, index) in questions" 
          :key="index"
          class="question-item"
        >
          <p class="question-text">{{ question.text }}</p>
          
          <div class="rating-scale">
            <label 
              v-for="score in [0, 1, 2, 3, 4]" 
              :key="score"
              class="rating-option"
              :class="{ selected: answers[index] === score }"
            >
              <input 
                type="radio" 
                :name="`question-${index}`"
                :value="score"
                v-model.number="answers[index]"
              >
              <span class="rating-circle">{{ score }}</span>
            </label>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button 
          @click="calculateResults" 
          :disabled="!isFormComplete"
          class="submit-btn"
        >
          Calculate Results
        </button>
        <div v-if="!isFormComplete" class="completion-hint">
          Please answer all questions to see your results
        </div>
      </div>
    </div>

    <div v-if="showResults" class="results-section">
      <div class="results-header">
        <h3>Your Assessment Results</h3>
        <p class="assessment-date">Completed on {{ formatDate(assessmentDate) }}</p>
      </div>

      <div class="score-display">
        <div class="total-score">
          <span class="score-number">{{ totalScore }}</span>
          <span class="score-label">Total Score</span>
        </div>
        <div class="score-range">
          <span class="range-label">{{ getStressLevel().label }}</span>
          <div class="range-bar">
            <div 
              class="range-fill" 
              :style="{ 
                width: (totalScore / 28 * 100) + '%',
                backgroundColor: getStressLevel().color 
              }"
            ></div>
          </div>
          <span class="range-description">{{ getStressLevel().description }}</span>
        </div>
      </div>

      <div class="simple-recommendations">
         <div v-for="rec in getSimpleRecommendations()" :key="rec" class="recommendation">
           {{ rec }}
         </div>
       </div>

      <div class="results-actions">
         <button @click="retakeAssessment" class="retake-btn">Retake Assessment</button>
       </div>

       <div v-if="savedMessage" class="save-message">
         <p>✅ Assessment automatically saved to your feeling calendar!</p>
       </div>
    </div>


  </div>
</template>

<script>
import { saveFeelingRecord } from '../utils/feelingTracker'

export default {
  name: 'MentalHealth',
  data() {
    return {
      answers: new Array(7).fill(null),
      showResults: false,
      totalScore: 0,
      assessmentDate: null,
      savedMessage: false,
      questions: [
         {
           text: "In the past week, I have felt that experimental tasks put me under a lot of stress.",
           reverse: false
         },
         {
           text: "I tend to blame myself when I make mistakes in experiments.",
           reverse: false
         },
         {
           text: "I feel that I can control most situations in my experiments.",
           reverse: true
         },
         {
           text: "I feel anxious about conflicts between experiments and other life matters.",
           reverse: false
         },
         {
           text: "I can feel a sense of achievement or joy in my experiments.",
           reverse: true
         },
         {
           text: "I feel that my body or mind is experiencing fatigue.",
           reverse: false
         },
         {
           text: "I am willing to share/discuss my feelings about experiments with colleagues.",
           reverse: true
         }
       ]
    }
  },
  computed: {
    isFormComplete() {
      return this.answers.every(answer => answer !== null && answer !== undefined)
    }
  },
  methods: {
    getRatingLabel(score) {
      const labels = ['Never', 'Almost Never', 'Sometimes', 'Fairly Often', 'Very Often']
      return labels[score]
    },
    
    async calculateResults() {
       if (!this.isFormComplete) return
       
       this.totalScore = this.answers.reduce((total, answer, index) => {
         const question = this.questions[index]
         const score = question.reverse ? (4 - answer) : answer
         return total + score
       }, 0)
       
       this.assessmentDate = new Date()
       this.showResults = true
       
       // Auto-save to calendar
       await this.saveAssessment()
     },
    
    getStressLevel() {
      if (this.totalScore <= 7) {
        return {
          label: 'Low Stress',
          color: '#10b981',
          description: 'You appear to be managing lab stress well. Keep up the good work!'
        }
      } else if (this.totalScore <= 14) {
        return {
          label: 'Moderate Stress',
          color: '#f59e0b',
          description: 'You may be experiencing some stress. Consider implementing stress management strategies.'
        }
      } else {
        return {
          label: 'High Stress',
          color: '#ef4444',
          description: 'You may be experiencing significant stress. Consider seeking support and implementing coping strategies.'
        }
      }
    },
    
    getSimpleRecommendations() {
       const level = this.getStressLevel()
       
       if (level.label === 'Low Stress') {
         return ['Keep up the good work! 🎯', 'Consider supporting stressed colleagues 🤝']
       } else if (level.label === 'Moderate Stress') {
         return ['Take regular breaks ⏰', 'Talk to your supervisor 💬', 'Practice stress management 🧘']
       } else {
         return ['Consider seeking professional support 🆘', 'Review your workload urgently 🔄', 'Practice relaxation techniques 🧘']
       }
     },
    
    async saveAssessment() {
      const stressLevel = this.getStressLevel()
      
      // Map stress level to feeling type
      let feelingId = 'neutral'
      if (stressLevel.label === 'Low Stress') {
        feelingId = 'good'
      } else if (stressLevel.label === 'High Stress') {
        feelingId = 'stressed'
      }
      
      const assessmentData = {
        id: feelingId,
        protocolTitle: 'Mental Health Self-Assessment',
        note: `Stress Level: ${stressLevel.label} (Score: ${this.totalScore}/28)`,
        duration: 5, // Approximate time to complete assessment
        stepsCompleted: 1,
        assessmentScore: this.totalScore,
        stressLevel: stressLevel.label
      }
      
      try {
        await saveFeelingRecord(assessmentData)
        this.savedMessage = true
        setTimeout(() => {
          this.savedMessage = false
        }, 3000)
      } catch (error) {
        console.error('Failed to save assessment:', error)
        alert('Failed to save assessment. Please try again.')
      }
    },
    
    retakeAssessment() {
      this.answers = new Array(7).fill(null)
      this.showResults = false
      this.totalScore = 0
      this.savedMessage = false
    },
    

    
    formatDate(date) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.mh {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 16px;
  font-family: system-ui, -apple-system, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 32px;
}

.header h2 {
  color: #1f2937;
  margin-bottom: 8px;
}

.subtitle {
  color: #6b7280;
  font-size: 16px;
  margin-bottom: 16px;
}

.scale-guide {
   display: flex;
   gap: 12px;
   justify-content: center;
   margin-bottom: 32px;
   padding: 16px;
   background: #f8fafc;
   border-radius: 8px;
   flex-wrap: wrap;
 }

.scale-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.scale-number {
  background: #3b82f6;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.scale-label {
  font-size: 14px;
  color: #374151;
}

.questions {
  margin-bottom: 32px;
}

.question-item {
   background: white;
   border: 1px solid #e5e7eb;
   border-radius: 8px;
   padding: 20px;
   margin-bottom: 12px;
 }
 
 .question-text {
   margin: 0 0 16px 0;
   color: #374151;
   line-height: 1.5;
   font-weight: 500;
 }

.rating-scale {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.rating-option {
   cursor: pointer;
   padding: 4px;
   border-radius: 6px;
   transition: all 0.2s ease;
 }
 
 .rating-option:hover .rating-circle {
   transform: scale(1.1);
 }
 
 .rating-option input {
   display: none;
 }
 
 .rating-circle {
   background: #e5e7eb;
   color: #374151;
   width: 40px;
   height: 40px;
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   font-weight: bold;
   transition: all 0.2s ease;
   border: 2px solid transparent;
 }
 
 .rating-option.selected .rating-circle {
   background: #3b82f6;
   color: white;
   border-color: #1d4ed8;
   transform: scale(1.05);
 }

.form-actions {
  text-align: center;
  margin-bottom: 32px;
}

.submit-btn {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #2563eb;
}

.submit-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.completion-hint {
  margin-top: 8px;
  color: #6b7280;
  font-size: 14px;
}

.results-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
}

.results-header {
  text-align: center;
  margin-bottom: 24px;
}

.results-header h3 {
  margin: 0 0 8px 0;
  color: #1f2937;
}

.assessment-date {
  color: #6b7280;
  margin: 0;
}

.score-display {
  text-align: center;
  margin-bottom: 32px;
}

.total-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

.score-number {
  font-size: 48px;
  font-weight: bold;
  color: #1f2937;
}

.score-label {
  color: #6b7280;
  font-size: 14px;
}

.score-range {
  max-width: 400px;
  margin: 0 auto;
}

.range-label {
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  display: block;
  margin-bottom: 8px;
}

.range-bar {
  background: #e5e7eb;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.range-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.range-description {
  color: #6b7280;
  font-size: 14px;
}

.simple-recommendations {
   margin-bottom: 24px;
 }
 
 .recommendation {
   background: #f0f9ff;
   border: 1px solid #bae6fd;
   border-radius: 6px;
   padding: 12px 16px;
   margin-bottom: 8px;
   color: #0369a1;
   font-weight: 500;
 }

.results-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.retake-btn {
   padding: 10px 20px;
   border-radius: 6px;
   font-weight: 500;
   cursor: pointer;
   transition: all 0.2s ease;
   background: #f3f4f6;
   color: #374151;
   border: 1px solid #d1d5db;
 }
 
 .retake-btn:hover {
   background: #e5e7eb;
 }

.save-message {
  text-align: center;
  margin-top: 16px;
  padding: 12px;
  background: #d1fae5;
  border: 1px solid #a7f3d0;
  border-radius: 6px;
  color: #065f46;
}

@media (max-width: 768px) {
  .mh {
    padding: 16px 12px;
  }
  
  .scale-guide {
     flex-direction: column;
     gap: 8px;
   }
   
   .rating-scale {
     gap: 6px;
   }
   
   .rating-circle {
     width: 36px;
     height: 36px;
   }
  
  .results-actions {
    flex-direction: column;
  }
}
</style>
