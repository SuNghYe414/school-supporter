'use client'

import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function ContentBox() {
  const { data: session } = useSession()

  const params = useParams()
  const rawId = params?.id
  const id = Array.isArray(rawId) ? rawId[0] : rawId // 안전하게 처리

  if (!id) return null // id 없으면 렌더링 중단

  return (
    <section className="mt-10">
      {/* 댓글 입력폼, API 호출 등에서 id를 안전하게 사용 가능 */}
      <p>게시물 ID: {id}</p>
    </section>
  )
}
