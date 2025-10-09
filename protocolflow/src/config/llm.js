const STORAGE_KEY = 'protocolflow_llm_config'

const defaultConfig = {
  backendApiBase: 'http://localhost:5001',
  provider: 'openai', // 'openai' | 'gemini'
  oaiBase: 'https://api.openai.com/v1',
  oaiModel: 'gpt-4o-mini',
  oaiApiKey: '', // optional: not recommended to store in browser in production
  geminiModel: 'gemini-1.5-pro-latest',
  geminiApiKey: '' // optional
}

export function getLlmConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultConfig }
    const parsed = JSON.parse(raw)
    return { ...defaultConfig, ...parsed }
  } catch (_) {
    return { ...defaultConfig }
  }
}

export function saveLlmConfig(cfg) {
  const merged = { ...defaultConfig, ...(cfg || {}) }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  return merged
}

export function buildProviderFormFields(cfg) {
  const form = new FormData()
  form.append('provider', cfg.provider)
  if (cfg.provider === 'openai') {
    if (cfg.oaiBase) form.append('oai_base', cfg.oaiBase)
    if (cfg.oaiModel) form.append('oai_model', cfg.oaiModel)
    if (cfg.oaiApiKey) form.append('oai_api_key', cfg.oaiApiKey)
  } else {
    if (cfg.geminiModel) form.append('gemini_model', cfg.geminiModel)
    if (cfg.geminiApiKey) form.append('gemini_api_key', cfg.geminiApiKey)
  }
  return form
}
