import { getLlmConfig } from '../config/llm'

const SYSTEM_PROMPT = (
  'You are a helpful assistant that converts unstructured lab notes (text or transcribed audio) into detailed Markdown protocols for ProtocolFlow. ' +
  'Generate comprehensive, step-by-step laboratory protocols with specific details, quantities, temperatures, times, and safety considerations. ' +
  'The output MUST follow this format strictly:\n\n' +
  '# Protocol Title (H1 for main title)\n' +
  '## Step Name (H2 for each step - creates navigation steps)\n' +
  'Detailed instructions with specific parameters, quantities, temperatures, etc.\n\n' +
  'SUPPORTED PLUGIN PLACEHOLDERS (embed inline where appropriate):\n' +
  '- {{timer: 30s}} - countdown timer (units: ms/s/m/h) for incubations, reactions\n' +
  '- {{calculator}} - calculator for dilutions, concentrations, volumes\n' +
  '- {{regression}} - linear regression fitter with data visualization for calibration curves, standard curves\n' +
  '- {{regression: 1,2\\n2,4\\n3,6}} - linear regression with initial data (X,Y pairs)\n' +
  '- {{statistics}} - statistical analyzer for mean, standard deviation, confidence intervals, normality tests\n' +
  '- {{statistics: 1.2\\n2.5\\n3.1}} - statistics with initial data values\n' +
  '- {{critical: Safety reminder}} - critical safety/quality checkpoints (highlighted warnings)\n' +
  '- {{todo: items=Sample A,Sample B,Sample C}} - checklist for multiple items\n' +
  '- {{todo: repeat=8 label="Tube #"}} - repeated checklist (Tube #1, #2, etc.)\n\n' +
  'REQUIREMENTS:\n' +
  '1. Be extremely detailed - include specific volumes, concentrations, temperatures, times\n' +
  '2. Add critical safety reminders using {{critical: }} for important warnings\n' +
  '3. Use timers for all incubation/waiting steps\n' +
  '4. Use calculators for dilution/calculation steps\n' +
  '5. Use regression fitters for calibration curves, standard curves, and data analysis\n' +
  '6. Use statistics analyzers for data quality assessment, outlier detection, and statistical validation\n' +
  '7. Use todo lists for repetitive tasks or multiple samples\n' +
  '8. Include troubleshooting tips and quality control steps\n' +
  '9. Specify equipment, reagents, and environmental conditions\n\n' +
  'Only return the final Markdown content. Do not include explanations or meta-commentary.'
)

const FORMAT_GUIDE = (
  '# RNA Extraction Protocol\n\n' +
  '## Step 1: Sample Preparation\n\n' +
  '{{critical: Ensure all work is performed on ice}}\n' +
  '{{critical: Use RNase-free equipment and reagents}}\n\n' +
  'Prepare samples in 1.5 mL RNase-free microcentrifuge tubes. Add 500 μL of TRIzol reagent per 50-100 mg tissue.\n\n' +
  '{{todo: repeat=6 label="Sample #"}}\n\n' +
  '## Step 2: Homogenization\n\n' +
  'Homogenize samples using a tissue homogenizer for 30 seconds. Incubate at room temperature.\n\n' +
  '{{timer: 5m}}\n\n' +
  '## Step 3: Phase Separation\n\n' +
  'Add 200 μL chloroform per 1 mL TRIzol. Calculate volumes if using different amounts:\n\n' +
  '{{calculator}}\n\n' +
  'Vortex vigorously for 15 seconds, then incubate at room temperature.\n\n' +
  '{{timer: 3m}}\n\n' +
  '## Step 4: Quantification and Quality Control\n\n' +
  'Measure RNA concentration using spectrophotometer. Create a standard curve for accurate quantification:\n\n' +
  '{{regression: 0,0\\n10,0.25\\n20,0.5\\n30,0.75\\n40,1.0}}\n\n' +
  'Use the regression analysis to determine sample concentrations from absorbance readings.\n\n' +
  '## Step 5: Statistical Quality Assessment\n\n' +
  'Analyze the concentration measurements for quality control. Input your replicate measurements:\n\n' +
  '{{statistics: 45.2\\n47.1\\n46.8\\n44.9\\n46.3}}\n\n' +
  'Review the statistical analysis to ensure data quality and identify any outliers before proceeding.\n'
)

async function openaiChatCompletion({ base, apiKey, model, userContent }) {
  const url = `${base.replace(/\/$/, '')}/chat/completions`
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` }
  const body = {
    model,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Convert the following content into ProtocolFlow markdown. Ensure it adheres to the format.\n\nExample format:\n\n${FORMAT_GUIDE}\n\nContent to convert:\n\n${userContent}` }
    ],
    temperature: 0.2
  }
  const resp = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) })
  const data = await resp.json()
  if (!resp.ok) throw new Error(data.error?.message || 'OpenAI convert failed')
  const text = data?.choices?.[0]?.message?.content?.trim()
  if (!text) throw new Error('Empty response from OpenAI')
  return text
}

async function geminiGenerateContent({ apiKey, model, parts }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`
  const payload = {
    contents: [ { parts } ],
    generationConfig: { temperature: 0.2 }
  }
  const resp = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  const data = await resp.json()
  if (!resp.ok) throw new Error(data.error?.message || 'Gemini convert failed')
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
  if (!text) throw new Error('Empty response from Gemini')
  return text
}

export async function convertTextFrontEnd(rawText) {
  const cfg = getLlmConfig()
  if (cfg.provider === 'gemini') {
    if (!cfg.geminiApiKey) throw new Error('Gemini API key is required in front-end mode')
    const parts = [
      { text: SYSTEM_PROMPT },
      { text: `Convert the following content into ProtocolFlow markdown. Ensure it adheres to the format.\n\nExample format:\n\n${FORMAT_GUIDE}\n\nContent to convert:\n\n${rawText}` }
    ]
    return await geminiGenerateContent({ apiKey: cfg.geminiApiKey, model: cfg.geminiModel, parts })
  }
  // OpenAI-compatible
  if (!cfg.oaiApiKey) throw new Error('OpenAI API key is required in front-end mode')
  return await openaiChatCompletion({ base: cfg.oaiBase, apiKey: cfg.oaiApiKey, model: cfg.oaiModel, userContent: rawText })
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '')
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

export async function convertFileFrontEnd(file) {
  const cfg = getLlmConfig()
  const isAudio = /\.(wav|mp3|m4a|aac|flac|ogg)$/i.test(file.name)

  if (cfg.provider === 'gemini') {
    if (!cfg.geminiApiKey) throw new Error('Gemini API key is required in front-end mode')
    if (isAudio) {
      const b64 = await fileToBase64(file)
      const mime = file.type || 'audio/mpeg'
      const parts = [
        { text: SYSTEM_PROMPT },
        { text: 'Transcribe the following audio to plain text, then convert to ProtocolFlow markdown following the format strictly. Return only the final markdown.' },
        { inline_data: { mime_type: mime, data: b64 } }
      ]
      return await geminiGenerateContent({ apiKey: cfg.geminiApiKey, model: cfg.geminiModel, parts })
    }
    // Non-audio: read as text and convert
    const text = await file.text()
    const parts = [
      { text: SYSTEM_PROMPT },
      { text: `Convert the following content into ProtocolFlow markdown. Ensure it adheres to the format.\n\nExample format:\n\n${FORMAT_GUIDE}\n\nContent to convert:\n\n${text}` }
    ]
    return await geminiGenerateContent({ apiKey: cfg.geminiApiKey, model: cfg.geminiModel, parts })
  }

  // OpenAI-compatible: audio transcription from browser is typically blocked by CORS; handle non-audio only
  if (!cfg.oaiApiKey) throw new Error('OpenAI API key is required in front-end mode')
  if (isAudio) throw new Error('Audio conversion is not supported in-browser for OpenAI; switch provider to Gemini or use a backend')
  const text = await file.text()
  return await openaiChatCompletion({ base: cfg.oaiBase, apiKey: cfg.oaiApiKey, model: cfg.oaiModel, userContent: text })
}

