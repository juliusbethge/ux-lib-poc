"use client"

import { NumberInput } from "@/registry/new-york/number-input/components/number-input"
import { useState } from "react"

export function BasicNumberInput() {
  const [value, setValue] = useState<number | null>(null)
  return <NumberInput placeholder="Age" value={value} onChange={setValue} />
}
