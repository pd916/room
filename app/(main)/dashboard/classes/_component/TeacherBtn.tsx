import { Button } from '@/components/ui/button'
import React from 'react'

interface TeacherBtnProps {
    disabled: boolean;
    variant: "secondary" | "ghost";
    onClick:() => void;
    label: string
}

const TeacherBtn = ({
    disabled,
    variant,
    onClick,
    label
}:TeacherBtnProps) => {
  return (
    <Button size="sm" disabled={disabled} variant={variant} onClick={onClick}>
      {label}
    </Button>
  )
}

export default TeacherBtn
