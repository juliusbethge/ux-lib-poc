import { DBBadge } from "@db-ux/react-core-components"

export function Badges() {
  return (
    <div>
      <DBBadge>(Default) Adaptive</DBBadge>
      <DBBadge semantic="critical">Critical</DBBadge>
      <DBBadge semantic="informational">Informational</DBBadge>
      <DBBadge semantic="warning">Warning</DBBadge>
      <DBBadge semantic="successful">Successful</DBBadge>
      <DBBadge semantic="neutral">Neutral</DBBadge>
    </div>
  )
}
