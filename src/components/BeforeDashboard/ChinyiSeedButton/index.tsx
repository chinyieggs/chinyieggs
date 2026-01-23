'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'

import './index.scss'

type SeedType = 'page' | 'all' | 'all-clear' | 'globals'

export const ChinyiSeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const handleSeed = useCallback(
    async (type: SeedType, pageName?: string) => {
      if (loading) {
        toast.info('Seeding in progress...')
        return
      }

      setLoading(true)

      let url = '/api/seed-chinyi'
      let message = ''

      switch (type) {
        case 'page':
          url += `?page=${pageName}`
          message = `Creating ${pageName} page...`
          break
        case 'all':
          url += '?all=true'
          message = 'Creating all pages...'
          break
        case 'all-clear':
          url += '?all=true&clear=true'
          message = 'Clearing and creating all pages...'
          break
        case 'globals':
          url += '?globals=true'
          message = 'Updating Header/Footer...'
          break
      }

      try {
        toast.promise(
          fetch(url, { method: 'GET', credentials: 'include' })
            .then(async (res) => {
              const data = await res.json()
              if (res.ok) {
                return data.message
              } else {
                throw new Error(data.error || 'Unknown error')
              }
            }),
          {
            loading: message,
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

  return (
    <div className="chinyi-seed-buttons">
      <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Chinyi Pages:</p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          className="seedButton"
          onClick={() => handleSeed('page', 'home')}
          disabled={loading}
        >
          Seed Home Page
        </button>
        <button
          className="seedButton"
          onClick={() => handleSeed('globals')}
          disabled={loading}
        >
          Update Header/Footer
        </button>
        <button
          className="seedButton seedButton--warning"
          onClick={() => handleSeed('all-clear')}
          disabled={loading}
        >
          Reset All Pages
        </button>
      </div>
    </div>
  )
}
