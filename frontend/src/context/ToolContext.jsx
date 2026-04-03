import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '@/lib/api'

const ToolContext = createContext(null)

export function ToolProvider({ children }) {
  const [tools, setTools]       = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading]   = useState(true)
  const [total, setTotal]       = useState(0)

  const fetchTools = useCallback(async (params = {}) => {
    setLoading(true)
    try {
      const { data } = await api.get('/tools', { params: { limit: 100, ...params } })
      setTools(data.tools)
      setTotal(data.total)
    } catch (e) {
      console.error('Failed to load tools', e)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
    } catch (e) {
      console.error('Failed to load categories', e)
    }
  }, [])

  useEffect(() => {
    fetchTools()
    fetchCategories()
  }, [])

  const getToolBySlug = (slug) => tools.find((t) => t.slug === slug)

  return (
    <ToolContext.Provider value={{ tools, categories, loading, total, fetchTools, fetchCategories, getToolBySlug }}>
      {children}
    </ToolContext.Provider>
  )
}

export function useTools() {
  return useContext(ToolContext)
}
