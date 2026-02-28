'use client'

import React, { useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'

import './index.scss'

export const ChinyiSeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const callApi = useCallback(
    async (params: string, toastMessage: string) => {
      if (loading) {
        toast.info('Operation in progress...')
        return
      }
      setLoading(true)
      try {
        toast.promise(
          fetch(`/api/seed-chinyi?${params}`, { method: 'GET', credentials: 'include' }).then(
            async (res) => {
              const data = await res.json()
              if (res.ok) return data.message
              throw new Error(data.error || 'Unknown error')
            },
          ),
          {
            loading: toastMessage,
            success: (msg) => msg,
            error: (err) => `Error: ${err.message}`,
          },
        )
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    },
    [loading],
  )

  const handleUpsert = useCallback(() => {
    callApi('upsert=true', 'Syncing all data...')
  }, [callApi])

  const handleClear = useCallback(() => {
    if (!window.confirm('確定要清除所有頁面和表單嗎？此操作無法復原。')) return
    callApi('clear=true', 'Clearing all data...')
  }, [callApi])

  return (
    <div className="chinyi-seed-buttons">
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button className="seedButton" onClick={handleUpsert} disabled={loading}>
          同步所有資料
        </button>
        <button className="seedButton seedButton--warning" onClick={handleClear} disabled={loading}>
          清除所有資料
        </button>
      </div>
    </div>
  )
}
