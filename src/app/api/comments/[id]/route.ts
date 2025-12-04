import { NextRequest, NextResponse } from 'next/server'
import Comment from '@/models/comment'
import { connectDB } from '@/lib/mongodb'

// GET /comments/:id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await connectDB()
    const comment = await Comment.findById(id)

    if (!comment)
      return NextResponse.json(
        { message: '댓글을 찾을 수 없습니다.' },
        { status: 404 }
      )

    return NextResponse.json(comment)
  } catch (error) {
    return NextResponse.json({ message: '서버 오류', error }, { status: 500 })
  }
}

// PATCH /comments/:id
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await connectDB()

    const { comment } = await req.json()
    const updated = await Comment.findByIdAndUpdate(
      id,
      { comment },
      { new: true }
    )

    if (!updated)
      return NextResponse.json({ message: '댓글 없음' }, { status: 404 })

    return NextResponse.json({ message: '댓글 수정 완료', comment: updated })
  } catch (error) {
    return NextResponse.json({ message: '서버 오류', error }, { status: 500 })
  }
}

// DELETE /comments/:id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await connectDB()

    const deleted = await Comment.findByIdAndDelete(id)
    if (!deleted)
      return NextResponse.json({ message: '댓글 없음' }, { status: 404 })

    return NextResponse.json({ message: '댓글 삭제 완료' })
  } catch (error) {
    return NextResponse.json({ message: '서버 오류', error }, { status: 500 })
  }
}
