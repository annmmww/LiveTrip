'use client'

import { getSession } from 'next-auth/react'
import { type ChangeEvent, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import type { FormValues, UploadedImage } from '@/domains/registration/type'

export function useIntroImageUpload(maxCount: number) {
  const { setValue, watch, getValues } = useFormContext<FormValues>()
  const [images, setImages] = useState<UploadedImage[]>([])
  const formFieldName = 'subImageUrls'

  const formFieldUrls = watch(formFieldName)

  useEffect(() => {
    const urls = Array.isArray(formFieldUrls) ? formFieldUrls : []

    setImages((prev) => {
      const blobImages = prev.filter((image) => image.src.startsWith('blob:'))
      const persistedImages = urls.map((url) => ({ id: url, src: url }))

      return [...persistedImages, ...blobImages]
    })
  }, [formFieldUrls])

  // ✅ 업로드 mutation
  const uploadMutation = useMutation({
    mutationFn: async ({
      file,
    }: {
      file: File;
      previewId: string;
    }): Promise<{ activityImageUrl: string }> => {
      const session = await getSession()
      const token = session?.accessToken

      if (!token) {throw new Error('로그인이 필요합니다.')}

      const formData = new FormData()

      formData.append('image', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (!res.ok) {throw new Error(`이미지 업로드 실패: ${res.status}`)}
      const data: { activityImageUrl: string } = await res.json()

      return data
    },

    onSuccess: (uploadRes, variables) => {
      setImages((prev) => {
        const updated = prev.map((image) =>
          image.id === variables.previewId
            ? { id: uploadRes.activityImageUrl, src: uploadRes.activityImageUrl }
            : image
        )

        return updated
      })

      setValue(
        formFieldName,
        updatedUrls(
          getValues(formFieldName),
          variables.previewId,
          uploadRes.activityImageUrl
        ),
        { shouldValidate: true }
      )

      URL.revokeObjectURL(variables.previewId)
    },
  })

  /**
   * ✅ 파일 업로드 핸들러
   */
  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (!files || files.length === 0) {return}

    const filesToUpload = [...files]
    const current = Array.isArray(formFieldUrls) ? formFieldUrls : []

    if (current.length + filesToUpload.length > maxCount) {
      console.error(`최대 ${maxCount}장까지만 업로드할 수 있습니다.`)
      event.target.value = ''

      return
    }

    const previewImages = filesToUpload.map((file) => {
      const previewId = URL.createObjectURL(file)

      return {
        file,
        preview: {
          id: previewId,
          src: previewId,
        },
      }
    })

    const nextImages = [...images, ...previewImages.map(({ preview }) => preview)]

    setImages(nextImages)
    setValue(
      formFieldName,
      nextImages.map((img) => img.src),
      { shouldValidate: true }
    )

    for (const { file, preview } of previewImages) {
      try {
        await uploadMutation.mutateAsync({
          file,
          previewId: preview.id,
        })
      } catch (error) {
        URL.revokeObjectURL(preview.id)
        setImages((prev) => prev.filter((image) => image.id !== preview.id))
        setValue(
          formFieldName,
          updatedUrls(getValues(formFieldName), preview.id),
          { shouldValidate: true }
        )
        console.error('업로드 실패:', error)
      }
    }

    event.target.value = ''
  }

  /**
   * ✅ 이미지 삭제 핸들러
   */
  const removeImage = (idToRemove: string) => {
    setImages((prev) => prev.filter((image) => image.id !== idToRemove))
    setValue(formFieldName, updatedUrls(getValues(formFieldName), idToRemove), {
      shouldValidate: true,
    })

    if (idToRemove.startsWith('blob:')) {
      URL.revokeObjectURL(idToRemove)
    }
  }

  return {
    images,
    handleUpload,
    removeImage,
    isUploading: uploadMutation.isPending,
    uploadError: uploadMutation.error,
  }
}

function updatedUrls(
  currentRaw: FormValues['subImageUrls'],
  from: string,
  to?: string
) {
  const current = Array.isArray(currentRaw) ? currentRaw : []

  return current.flatMap((url) => {
    if (url !== from) {
      return [url]
    }

    return to ? [to] : []
  })
}
