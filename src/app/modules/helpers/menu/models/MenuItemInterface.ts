

export interface MenuItem {
  title: string
  url?: string
  icon?: string
  src?: string
  function?: () => void
  onClick?: () => void /** @deprecated;
  **/
}