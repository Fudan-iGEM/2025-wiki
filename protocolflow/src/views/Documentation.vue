<template>
  <div class="docs">
    <div class="header">
      <h2>Documentation</h2>
      <p class="subtitle">Learn how to create and use interactive lab protocols</p>
    </div>

    <div class="content">
      <div class="intro-section">
        <div class="section-header">
          <span class="section-icon">📖</span>
          <h3>Getting Started</h3>
        </div>
        <p class="intro-text">
          ProtocolFlow is a comprehensive lab workflow assistant created by the <a href="https://2025.igem.wiki/fudan" target="_blank" rel="noopener">Fudan iGEM 2025</a> team. 
          It transforms your notes into interactive protocols, and each <code>## Heading</code> becomes a separate step with navigation controls and embedded tools.
        </p>
      </div>

      <div class="features-section">
        <div class="section-header">
          <span class="section-icon">✨</span>
          <h3>Key Features</h3>
        </div>
        
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-header">
              <span class="feature-icon">🤖</span>
              <h4>AI Protocol Creation</h4>
            </div>
            <p>Convert your experimental notes or audio recordings into structured protocols using AI. Simply paste text or upload files, and let the LLM generate step-by-step procedures.</p>
          </div>

          <div class="feature-card">
            <div class="feature-header">
              <span class="feature-icon">🧠</span>
              <h4>Mental Health Assessment</h4>
            </div>
            <p>Built-in PSS-10 based stress assessment tool adapted for laboratory environments. Monitor your well-being and get personalized recommendations.</p>
          </div>

          <div class="feature-card">
            <div class="feature-header">
              <span class="feature-icon">📅</span>
              <h4>Emotion Calendar</h4>
            </div>
            <p>Track your daily lab experiences and emotions. View monthly patterns, identify stress trends, and maintain a record of your experimental journey.</p>
          </div>

          <div class="feature-card">
            <div class="feature-header">
              <span class="feature-icon">📄</span>
              <h4>PDF Export</h4>
            </div>
            <p>Generate comprehensive PDF reports of your completed protocols, including all plugin data, timestamps, and experimental results for documentation.</p>
          </div>
        </div>
      </div>

      <div class="plugins-section">
        <div class="section-header">
          <span class="section-icon">🔧</span>
          <h3>Available Plugins</h3>
        </div>
        <p class="section-description">
          Embed interactive tools directly in your protocols using these plugin placeholders:
        </p>
        
        <div class="plugin-grid">
          <div class="plugin-card">
            <div class="plugin-header">
              <span class="plugin-icon">⏱️</span>
              <h4>Timer</h4>
            </div>
            <div class="plugin-code">
              <code>{{'{'+'{'}}timer: 30s{{'}'+'}'}}</code>
            </div>
            <p class="plugin-description">Countdown timer (supports ms/s/m/h)</p>
          </div>

          <div class="plugin-card">
            <div class="plugin-header">
              <span class="plugin-icon">🧮</span>
              <h4>Calculator</h4>
            </div>
            <div class="plugin-code">
              <code>{{'{'+'{'}}calculator{{'}'+'}'}}</code>
            </div>
            <p class="plugin-description">Simple calculator for quick calculations</p>
          </div>

          <div class="plugin-card">
            <div class="plugin-header">
              <span class="plugin-icon">📈</span>
              <h4>Regression</h4>
            </div>
            <div class="plugin-code">
              <code>{{'{'+'{'}}regression{{'}'+'}'}}</code>
            </div>
            <p class="plugin-description">Linear regression with data visualization</p>
            <div class="plugin-example">
              <strong>With data:</strong>
              <code>{{'{'+'{'}}regression: 1,2\n2,4\n3,6{{'}'+'}'}}</code>
            </div>
          </div>

          <div class="plugin-card">
            <div class="plugin-header">
              <span class="plugin-icon">📊</span>
              <h4>Statistics</h4>
            </div>
            <div class="plugin-code">
              <code>{{'{'+'{'}}statistics{{'}'+'}'}}</code>
            </div>
            <p class="plugin-description">Statistical analysis with confidence intervals</p>
            <div class="plugin-example">
              <strong>With data:</strong>
              <code>{{'{'+'{'}}statistics: 1.2\n2.5\n3.1{{'}'+'}'}}</code>
            </div>
          </div>

          <div class="plugin-card">
            <div class="plugin-header">
              <span class="plugin-icon">⚠️</span>
              <h4>Critical</h4>
            </div>
            <div class="plugin-code">
              <code>{{'{'+'{'}}critical: Safety reminder{{'}'+'}'}}</code>
            </div>
            <p class="plugin-description">Critical safety/quality checkpoints</p>
          </div>

          <div class="plugin-card">
            <div class="plugin-header">
              <span class="plugin-icon">✅</span>
              <h4>Todo</h4>
            </div>
            <div class="plugin-code">
              <code>{{'{'+'{'}}todo: items=Sample A,Sample B{{'}'+'}'}}</code>
            </div>
            <p class="plugin-description">Checklists for multiple items</p>
            <div class="plugin-example">
              <strong>Repeated:</strong>
              <code>{{'{'+'{'}}todo: repeat=8 label="Tube #"{{'}'+'}'}}</code>
            </div>
          </div>

          <div class="coming-soon-card">
            <div class="coming-soon-content">
              <span class="coming-soon-icon">🚀</span>
              <h4>More Tools Coming</h4>
              <p>Additional plugins and features are in development</p>
            </div>
          </div>
        </div>
      </div>

      <div class="example-section">
        <div class="section-header">
          <span class="section-icon">📄</span>
          <h3>Example</h3>
        </div>
        <p class="section-description">
          See a complete example protocol to understand the format and capabilities.
        </p>
        <div class="example-link">
          <a href="/example.md" target="_blank" rel="noopener" class="example-btn">
            <span class="link-icon">🔗</span>
            View Example Protocol
          </a>
        </div>
      </div>

      <div class="workflow-section">
        <div class="section-header">
          <span class="section-icon">🔄</span>
          <h3>Complete Workflow</h3>
        </div>
        <div class="workflow-steps">
          <div class="workflow-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Create Protocol</h4>
              <p>Use AI to convert your notes/audio into structured protocols, or open existing Markdown files.</p>
            </div>
          </div>
          <div class="workflow-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Execute Steps</h4>
              <p>Navigate through protocol steps using Next/Previous buttons. Use embedded plugins for calculations and data collection.</p>
            </div>
          </div>
          <div class="workflow-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Record Emotions</h4>
              <p>After completing the protocol, record your feelings and experience. This data is saved to your emotion calendar.</p>
            </div>
          </div>
          <div class="workflow-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>Export & Review</h4>
              <p>Generate PDF reports with all data and results. Use the mental health assessment tool to monitor your well-being.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: 'DocumentationView' }
</script>

<style scoped>
.docs {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px 16px;
}

.header {
  text-align: center;
  margin-bottom: 48px;
}

.header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.subtitle {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.section-icon {
  font-size: 24px;
}

.section-header h3 {
  margin: 0;
  color: #374151;
  font-size: 1.5rem;
  font-weight: 600;
}

.intro-section,
.features-section,
.example-section,
.workflow-section {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.intro-text,
.section-description {
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}

.plugins-section {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.plugin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.plugin-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.2s ease;
}

.plugin-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.plugin-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.plugin-icon {
  font-size: 20px;
}

.plugin-header h4 {
  margin: 0;
  color: #374151;
  font-size: 1.125rem;
  font-weight: 600;
}

.plugin-code {
  margin-bottom: 8px;
}

.plugin-code code {
  background: #1f2937;
  color: #f9fafb;
  padding: 6px 8px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  display: inline-block;
  word-break: break-all;
}

.plugin-description {
  color: #6b7280;
  font-size: 14px;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.plugin-example {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #e5e7eb;
}

.plugin-example strong {
  color: #374151;
  font-size: 12px;
  display: block;
  margin-bottom: 4px;
}

.plugin-example code {
  background: #374151;
  color: #d1d5db;
  padding: 4px 6px;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 11px;
  word-break: break-all;
}

.example-link {
  text-align: center;
  margin-top: 16px;
}

.example-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.example-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.link-icon {
  font-size: 16px;
}

code {
  background: #f3f4f6;
  color: #374151;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.feature-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.feature-icon {
  font-size: 24px;
}

.feature-header h4 {
  margin: 0;
  color: #1e293b;
  font-size: 1.125rem;
  font-weight: 600;
}

.feature-card p {
  color: #475569;
  line-height: 1.5;
  margin: 0;
  font-size: 14px;
}

.workflow-steps {
  margin-top: 24px;
}

.workflow-step {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: flex-start;
}

.workflow-step:last-child {
  margin-bottom: 0;
}

.step-number {
  background: #3b82f6;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}

.step-content h4 {
  margin: 0 0 6px 0;
  color: #1e293b;
  font-size: 1rem;
  font-weight: 600;
}

.step-content p {
  margin: 0;
  color: #475569;
  line-height: 1.5;
  font-size: 14px;
}

.coming-soon-card {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: all 0.2s ease;
}

.coming-soon-card:hover {
  transform: translateY(-2px);
  border-color: #94a3b8;
}

.coming-soon-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.coming-soon-icon {
  font-size: 32px;
}

.coming-soon-content h4 {
  margin: 0;
  color: #475569;
  font-size: 1.125rem;
  font-weight: 600;
}

.coming-soon-content p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .docs {
    padding: 20px 16px;
  }
  
  .header h2 {
    font-size: 1.75rem;
  }
  
  .content {
    gap: 32px;
  }
  
  .intro-section,
  .features-section,
  .plugins-section,
  .example-section,
  .workflow-section {
    padding: 20px;
  }
  
  .feature-grid,
  .plugin-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .plugin-card {
    padding: 16px;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
