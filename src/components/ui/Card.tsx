import { cn } from '../../lib/cn'
import { HTMLAttributes } from 'react'

export function Card(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn('card', props.className)} />
}
export function CardHeader(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn('card-header', props.className)} />
}
export function CardTitle(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn('card-title', props.className)} />
}
export function CardBody(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn('card-body', props.className)} />
}
