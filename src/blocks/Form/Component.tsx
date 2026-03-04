'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    introContent,
  } = props

  const formID = formFromProps?.id
  const confirmationMessage = formFromProps?.confirmationMessage
  const confirmationType = formFromProps?.confirmationType
  const redirect = formFromProps?.redirect
  const submitButtonLabel = formFromProps?.submitButtonLabel

  const formMethods = useForm({
    defaultValues: formFromProps?.fields,
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  // 如果沒有表單資料，不渲染
  if (!formFromProps) {
    return null
  }

  return (
    // Match static HTML: container > content-narrow > contact-form
    <div className="max-w-[1200px] mx-auto px-8">
      <div className="max-w-[800px] mx-auto">
        {enableIntro && introContent && !hasSubmitted && (
          <RichText className="mb-8" data={introContent} enableGutter={false} />
        )}
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <div style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              background: '#FAFAF8',
              border: '1px solid #E5E2DB',
            }}>
              {/* Checkmark icon */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#E8380D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <RichText data={confirmationMessage} />
              <div style={{
                width: '40px',
                height: '1px',
                background: '#E8380D',
                margin: '1.5rem auto 0',
              }} />
            </div>
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div style={{ color: '#E8380D' }}>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)} className="contact-form" style={{ marginTop: '2rem' }}>
              {formFromProps &&
                formFromProps.fields &&
                (() => {
                  const rendered: React.ReactNode[] = []
                  const allFields = formFromProps.fields
                  let i = 0
                  while (i < allFields.length) {
                    const field = allFields[i]!
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (!Field) { i++; continue }

                    const currentWidth = (field as { width?: number }).width
                    const nextField = allFields[i + 1] as { width?: number; blockType?: string } | undefined

                    // 連續兩個 50% 寬度欄位配成一列
                    if (currentWidth === 50 && nextField?.width === 50) {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const NextField: React.FC<any> = fields?.[nextField.blockType as keyof typeof fields]
                      rendered.push(
                        <div key={i} className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                          <div className="form-group">
                            <Field
                              form={formFromProps}
                              {...field}
                              {...formMethods}
                              control={control}
                              errors={errors}
                              register={register}
                            />
                          </div>
                          {NextField && (
                            <div className="form-group">
                              <NextField
                                form={formFromProps}
                                {...allFields[i + 1]}
                                {...formMethods}
                                control={control}
                                errors={errors}
                                register={register}
                              />
                            </div>
                          )}
                        </div>,
                      )
                      i += 2
                      continue
                    }

                    // 單欄全寬欄位
                    rendered.push(
                      <div className="form-group" style={{ marginBottom: '2rem' }} key={i}>
                        <Field
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                        />
                      </div>,
                    )
                    i++
                  }
                  return rendered
                })()}

              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button
                  type="submit"
                  style={{
                    background: '#E8380D',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 3rem',
                    fontSize: '0.875rem',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    transition: 'background 0.3s',
                  }}
                >
                  {submitButtonLabel}
                </button>
              </div>
            </form>
          )}
        </FormProvider>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .contact-form .form-group label {
          display: block;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #6B6B6B;
          margin-bottom: 0.5rem;
        }
        .contact-form .form-group input,
        .contact-form .form-group select,
        .contact-form .form-group textarea {
          width: 100%;
          padding: 1rem;
          font-family: 'Noto Sans JP', 'Noto Sans TC', sans-serif;
          font-size: 1rem;
          border: 1px solid #E5E2DB;
          background: #FAFAF8;
          transition: border-color 0.3s;
        }
        .contact-form .form-group input:focus,
        .contact-form .form-group select:focus,
        .contact-form .form-group textarea:focus {
          outline: none;
          border-color: #E8380D;
        }
        .contact-form .form-group textarea {
          resize: vertical;
          min-height: 150px;
        }
        .contact-form button[type="submit"]:hover {
          background: #C42F0B;
        }
        @media (max-width: 768px) {
          .contact-form .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      ` }} />
    </div>
  )
}
