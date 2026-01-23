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

  // Find name and message
  const nameField = submissionData.find(
    (item) => item.field === 'full-name' || item.field === 'name',
  )
  const emailField = submissionData.find((item) => item.field === 'email')
  const messageField = submissionData.find((item) => item.field === 'message')

  const name = nameField?.value || '未知'
  const email = emailField?.value || ''
  const message = messageField?.value || ''
  const truncatedMessage = message.length > 40 ? message.substring(0, 40) + '...' : message

  return (
    <Link
      href={`/admin/collections/form-submissions/${docId}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <div>
        <strong>{name}</strong>
        {email && <span style={{ color: '#666', fontSize: '0.85em', marginLeft: '8px' }}>{email}</span>}
      </div>
      {truncatedMessage && (
        <div style={{ color: '#888', fontSize: '0.9em' }}>{truncatedMessage}</div>
      )}
    </Link>
  )
}
