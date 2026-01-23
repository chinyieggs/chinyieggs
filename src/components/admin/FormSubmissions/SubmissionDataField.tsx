'use client'

import React from 'react'
import { useDocumentInfo } from '@payloadcms/ui'

const fieldLabels: Record<string, string> = {
  'full-name': '姓名',
  name: '姓名',
  email: 'Email',
  phone: '電話',
  message: '訊息',
  company: '公司',
  subject: '主旨',
}

type SubmissionDataItem = {
  field: string
  value: string
  id?: string | null
}

type DocData = {
  submissionData?: SubmissionDataItem[]
}

export const SubmissionDataField: React.FC = () => {
  const { initialData } = useDocumentInfo()
  const docData = initialData as DocData | undefined

  const submissionData = Array.isArray(docData?.submissionData) ? docData.submissionData : []

  if (submissionData.length === 0) {
    return (
      <div style={{ padding: '16px', color: '#999', fontStyle: 'italic' }}>
        沒有提交資料
      </div>
    )
  }

  return (
    <div style={{ padding: '16px 0' }}>
      {submissionData.map((item, index) => {
        const label = fieldLabels[item.field] || item.field
        const isMessage = item.field === 'message'

        return (
          <div
            key={item.id || index}
            style={{
              marginBottom: isMessage ? '0' : '16px',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontWeight: 500,
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '4px',
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontSize: isMessage ? '14px' : '15px',
                color: '#333',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                ...(isMessage && {
                  padding: '12px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '6px',
                  border: '1px solid #eee',
                }),
              }}
            >
              {item.value || '—'}
            </div>
          </div>
        )
      })}
    </div>
  )
}
