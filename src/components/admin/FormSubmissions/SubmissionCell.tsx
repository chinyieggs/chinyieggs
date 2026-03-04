'use client'

import React from 'react'
import Link from 'next/link'
import type { DefaultCellComponentProps } from 'payload'

type SubmissionData = {
  field: string
  value: string
  id?: string | null
}[]

export const NameCell: React.FC<DefaultCellComponentProps> = ({ rowData }) => {
  const submissionData = rowData?.submissionData as SubmissionData | undefined
  const docId = rowData?.id

  if (!submissionData || submissionData.length === 0) {
    return (
      <Link href={`/admin/collections/form-submissions/${docId}`} style={{ color: '#999' }}>
        —
      </Link>
    )
  }

  // Find name, company and message
  const firstName = submissionData.find((item) => item.field === 'firstName')?.value || ''
  const lastName = submissionData.find((item) => item.field === 'lastName')?.value || ''
  const company = submissionData.find((item) => item.field === 'company')?.value || ''
  const messageField = submissionData.find((item) => item.field === 'message')
  const message = messageField?.value || ''
  const truncatedMessage = message.length > 40 ? message.substring(0, 40) + '...' : message

  const name = [firstName, lastName].filter(Boolean).join(' ')

  return (
    <Link
      href={`/admin/collections/form-submissions/${docId}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <div>
        <strong>{name || '—'}</strong>
        {company && <span style={{ color: '#666', fontSize: '0.85em', marginLeft: '8px' }}>{company}</span>}
      </div>
      {truncatedMessage && (
        <div style={{ color: '#888', fontSize: '0.9em' }}>{truncatedMessage}</div>
      )}
    </Link>
  )
}
