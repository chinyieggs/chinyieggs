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
            <div style={{ padding: '2rem', background: '#F5F3EE', borderLeft: '2px solid #E8380D' }}>
              <RichText data={confirmationMessage} />
            </div>
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div style={{ color: '#E8380D' }}>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)} className="contact-form" style={{ marginTop: '2rem' }}>
              {formFromProps &&
                formFromProps.fields &&
                formFromProps.fields?.map((field, index, arr) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                  if (Field) {
                    // Check if this field and next field both have width 50 (form-row)
                    const currentWidth = (field as { width?: number }).width
                    const nextField = arr[index + 1] as { width?: number } | undefined
                    const prevField = arr[index - 1] as { width?: number } | undefined
                    const isRowStart = currentWidth === 50 && (!prevField || prevField.width !== 50)
                    const isRowEnd = currentWidth === 50 && (!nextField || nextField.width !== 50)
                    const isInRow = currentWidth === 50

                    // Skip if this is second item in a row (already rendered)
                    if (isInRow && prevField?.width === 50 && index > 0) {
                      return null
                    }

                    // Render row with two fields
                    if (isRowStart && nextField?.width === 50) {
                      const NextField: React.FC<any> = fields?.[arr[index + 1]?.blockType as keyof typeof fields]
                      return (
                        <div key={index} className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
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
                                {...arr[index + 1]}
                                {...formMethods}
                                control={control}
                                errors={errors}
                                register={register}
                              />
                            </div>
                          )}
                        </div>
                      )
                    }

                    // Single full-width field
                    return (
                      <div className="form-group" style={{ marginBottom: '2rem' }} key={index}>
                        <Field
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                        />
                      </div>
                    )
                  }
                  return null
                })}

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
